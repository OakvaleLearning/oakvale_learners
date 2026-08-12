import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { initializeTransaction, generateReference } from "@/lib/paystack";

const schema = z.object({ enrollmentId: z.string().min(1) });

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

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: parsed.data.enrollmentId },
    });
    if (!enrollment || enrollment.userId !== session.userId) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
    }

    const balanceKobo = enrollment.totalAmount - enrollment.amountPaid;
    if (balanceKobo <= 0) {
      return NextResponse.json(
        { error: "This enrolment is already fully paid." },
        { status: 400 }
      );
    }

    const reference = generateReference();
    await prisma.payment.create({
      data: {
        enrollmentId: enrollment.id,
        userId: session.userId,
        reference,
        amount: balanceKobo,
        status: "PENDING",
      },
    });

    const origin = new URL(req.url).origin;
    const { authorizationUrl } = await initializeTransaction({
      email: session.email,
      amountKobo: balanceKobo,
      reference,
      callbackUrl: `${origin}/payment/callback`,
      metadata: { enrollmentId: enrollment.id, kind: "balance" },
    });

    return NextResponse.json({ ok: true, authorizationUrl });
  } catch (err) {
    console.error("balance payment error:", err);
    return NextResponse.json(
      { error: "Could not start payment. Please try again." },
      { status: 500 }
    );
  }
}
