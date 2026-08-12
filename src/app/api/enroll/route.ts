import { NextResponse } from "next/server";
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

    // Create enrollment + pending payment together.
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: session.userId,
        track,
        plan,
        cohort: SITE.cohort,
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
