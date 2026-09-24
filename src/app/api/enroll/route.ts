import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { enrollSchema } from "@/lib/validation";
import {
  fullPriceNaira,
  payNowNaira,
} from "@/lib/payments";
import {
  initializeTransaction,
  generateReference,
} from "@/lib/paystack";
import { SITE } from "@/content/site";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please log in to enroll." }, { status: 401 });
    }

    const body = await req.json();
    const parsed = enrollSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    const { track, plan } = parsed.data;

    const totalKobo = fullPriceNaira(track) * 100;
    const payNowKobo = payNowNaira(track, plan) * 100;
    const reference = generateReference();

    // A learner has at most one enrolment per track per cohort. Starting
    // checkout again (double click, abandoned payment, changed plan) must reuse
    // that record instead of creating another one.
    const identity = {
      userId: session.userId,
      track,
      cohort: SITE.cohort,
    };
    const existing = await prisma.enrollment.findUnique({
      where: { userId_track_cohort: identity },
    });

    if (existing) {
      if (existing.status === "ACTIVE") {
        return NextResponse.json(
          { error: "You are already enrolled on this programme." },
          { status: 409 }
        );
      }
      if (existing.status === "PARTIAL") {
        return NextResponse.json(
          {
            error:
              "You already have an enrolment on this programme with a balance outstanding. Please complete it from your dashboard.",
          },
          { status: 409 }
        );
      }
      // A cancelled enrolment that took money needs a human to sort out before
      // it can be restarted — don't silently reopen it.
      if (existing.status === "CANCELLED" && existing.amountPaid > 0) {
        return NextResponse.json(
          {
            error: `This enrolment was cancelled after payment. Please contact ${SITE.email} so we can restore it.`,
          },
          { status: 409 }
        );
      }
    }

    // PENDING or unpaid CANCELLED: reopen the same row with the chosen plan.
    // The upsert is keyed on the unique constraint, so two simultaneous
    // submissions can't both create a record.
    let enrollment;
    try {
      enrollment = await prisma.enrollment.upsert({
        where: { userId_track_cohort: identity },
        update: {
          plan,
          totalAmount: totalKobo,
          status: "PENDING",
          payments: {
            create: {
              userId: session.userId,
              reference,
              amount: payNowKobo,
              status: "PENDING",
            },
          },
        },
        create: {
          ...identity,
          plan,
          totalAmount: totalKobo,
          amountPaid: 0,
          status: "PENDING",
          payments: {
            create: {
              userId: session.userId,
              reference,
              amount: payNowKobo,
              status: "PENDING",
            },
          },
        },
      });
    } catch (err) {
      // Lost a race against a concurrent request for the same enrolment.
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        return NextResponse.json(
          { error: "This enrolment is already being processed. Please try again." },
          { status: 409 }
        );
      }
      throw err;
    }

    const origin = new URL(req.url).origin;
    const { authorizationUrl, simulated } = await initializeTransaction({
      email: session.email,
      amountKobo: payNowKobo,
      reference,
      callbackUrl: `${origin}/payment/callback`,
      metadata: {
        enrollmentId: enrollment.id,
        userId: session.userId,
        track,
        plan,
      },
    });

    return NextResponse.json({ ok: true, authorizationUrl, reference, simulated });
  } catch (err) {
    console.error("enroll error:", err);
    return NextResponse.json(
      { error: "Could not start enrollment. Please try again." },
      { status: 500 }
    );
  }
}
