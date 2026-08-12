import "server-only";
import { prisma } from "./prisma";
import { getProgramByTrack, type TrackSlug } from "@/content/site";
import type { Track, PaymentPlan } from "@prisma/client";

const slugToTrack: Record<TrackSlug, Track> = {
  "adult-care": "ADULT_CARE",
  "child-care": "CHILD_CARE",
};

export function trackFromSlug(slug: string): Track | null {
  return slug in slugToTrack ? slugToTrack[slug as TrackSlug] : null;
}

/** Full course price (Naira) for a track. */
export function fullPriceNaira(track: Track): number {
  const program = getProgramByTrack(track);
  return program.pricing.find((p) => p.plan === "FULL")!.price;
}

/** Amount (Naira) due now for a given plan. */
export function payNowNaira(track: Track, plan: PaymentPlan): number {
  const program = getProgramByTrack(track);
  return program.pricing.find((p) => p.plan === plan)!.price;
}

/**
 * Apply a verified successful payment to its enrollment, idempotently.
 * Returns the updated enrollment, or null if the reference is unknown.
 */
export async function applySuccessfulPayment(
  reference: string,
  info: { channel?: string; paidAt?: Date }
) {
  const payment = await prisma.payment.findUnique({
    where: { reference },
    include: { enrollment: true },
  });
  if (!payment) return null;

  // Already processed — no double-crediting.
  if (payment.status === "SUCCESS") {
    return payment.enrollment;
  }

  const enrollment = payment.enrollment;
  const newAmountPaid = enrollment.amountPaid + payment.amount;
  const fullyPaid = newAmountPaid >= enrollment.totalAmount;

  const [, updatedEnrollment] = await prisma.$transaction([
    prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "SUCCESS",
        channel: info.channel ?? null,
        paidAt: info.paidAt ?? new Date(),
      },
    }),
    prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        amountPaid: newAmountPaid,
        status: fullyPaid ? "ACTIVE" : "PARTIAL",
      },
    }),
  ]);

  return updatedEnrollment;
}

export async function markPaymentFailed(reference: string) {
  await prisma.payment.updateMany({
    where: { reference, status: "PENDING" },
    data: { status: "FAILED" },
  });
}
