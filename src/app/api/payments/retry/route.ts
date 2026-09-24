import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { initializeTransaction, generateReference } from "@/lib/paystack";
import { SITE } from "@/content/site";

const schema = z.object({ paymentId: z.string().min(1) });

/**
 * Re-initiate a payment the learner started but never completed.
 *
 * Paystack rejects a reference it has already seen, so a retry cannot reuse
 * the old one: the stale attempt is marked ABANDONED and a fresh PENDING
 * payment takes its place. The old reference stays on record, so if the
 * learner does eventually pay from a checkout page they left open, the
 * webhook still credits it.
 */
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please log in." }, { status: 401 });
    }

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const payment = await prisma.payment.findUnique({
      where: { id: parsed.data.paymentId },
      include: { enrollment: true },
    });
    if (!payment || payment.userId !== session.userId) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }
    if (payment.status === "SUCCESS") {
      return NextResponse.json(
        { error: "This payment has already been completed." },
        { status: 400 }
      );
    }

    const enrollment = payment.enrollment;
    if (enrollment.status === "CANCELLED") {
      return NextResponse.json(
        {
          error: `This enrolment was cancelled. Please contact ${SITE.email} so we can restore it.`,
        },
        { status: 409 }
      );
    }

    // Never let a retry take more than is actually outstanding — the balance
    // may have moved since this attempt was created.
    const balanceKobo = enrollment.totalAmount - enrollment.amountPaid;
    if (balanceKobo <= 0) {
      return NextResponse.json(
        { error: "This enrolment is already fully paid." },
        { status: 400 }
      );
    }
    const amountKobo = Math.min(payment.amount, balanceKobo);

    const reference = generateReference();
    await prisma.$transaction([
      // Guarded on PENDING so two simultaneous retries can't both supersede it.
      prisma.payment.updateMany({
        where: { id: payment.id, status: "PENDING" },
        data: { status: "ABANDONED" },
      }),
      prisma.payment.create({
        data: {
          enrollmentId: enrollment.id,
          userId: session.userId,
          reference,
          amount: amountKobo,
          status: "PENDING",
        },
      }),
    ]);

    const origin = new URL(req.url).origin;
    const { authorizationUrl } = await initializeTransaction({
      email: session.email,
      amountKobo,
      reference,
      callbackUrl: `${origin}/payment/callback`,
      metadata: {
        enrollmentId: enrollment.id,
        kind: "retry",
        retryOf: payment.reference,
      },
    });

    return NextResponse.json({ ok: true, authorizationUrl });
  } catch (err) {
    console.error("retry payment error:", err);
    return NextResponse.json(
      { error: "Could not restart payment. Please try again." },
      { status: 500 }
    );
  }
}
