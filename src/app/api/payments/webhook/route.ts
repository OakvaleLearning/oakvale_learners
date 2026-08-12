import { NextResponse } from "next/server";
import crypto from "crypto";
import { applySuccessfulPayment, markPaymentFailed } from "@/lib/payments";

/**
 * Paystack webhook. Verifies the signature, then reconciles the payment
 * server-to-server (independent of the user returning to the callback page).
 */
export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY ?? "";
  const raw = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  // Only enforce signature when a real secret is configured.
  if (secret.startsWith("sk_") && !secret.includes("replace_me")) {
    const expected = crypto
      .createHmac("sha512", secret)
      .update(raw)
      .digest("hex");
    if (signature !== expected) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let event: { event?: string; data?: { reference?: string; channel?: string; paid_at?: string } };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const reference = event.data?.reference;
  if (!reference) {
    return NextResponse.json({ ok: true });
  }

  if (event.event === "charge.success") {
    await applySuccessfulPayment(reference, {
      channel: event.data?.channel,
      paidAt: event.data?.paid_at ? new Date(event.data.paid_at) : new Date(),
    });
  } else if (event.event === "charge.failed") {
    await markPaymentFailed(reference);
  }

  return NextResponse.json({ ok: true });
}
