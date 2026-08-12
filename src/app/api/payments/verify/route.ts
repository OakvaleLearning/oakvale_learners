import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { verifyTransaction } from "@/lib/paystack";
import { applySuccessfulPayment, markPaymentFailed } from "@/lib/payments";

/**
 * Verifies a Paystack transaction by reference and reconciles the DB.
 * Called from the payment callback page.
 */
export async function GET(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");
  const simulated = searchParams.get("simulated") === "1";

  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  const payment = await prisma.payment.findUnique({ where: { reference } });
  if (!payment || payment.userId !== session.userId) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  const result = await verifyTransaction(reference, simulated);

  if (result.success) {
    const enrollment = await applySuccessfulPayment(reference, {
      channel: result.channel,
      paidAt: result.paidAt,
    });
    return NextResponse.json({
      status: "success",
      enrollmentStatus: enrollment?.status ?? "ACTIVE",
    });
  }

  await markPaymentFailed(reference);
  return NextResponse.json({ status: "failed" });
}
