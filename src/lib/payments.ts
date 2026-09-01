import "server-only";
import { prisma } from "./prisma";
import { getProgramByTrack, SITE, type TrackSlug } from "@/content/site";
import { sendDepositEmail, sendEnrolledEmail } from "./emails";
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

  // On the deposit (first partial payment), stamp the balance due date so the
  // reminder cron and the confirmation email have a concrete deadline.
  const balanceDueDate =
    !fullyPaid && !enrollment.balanceDueDate
      ? new Date(SITE.balanceDueDate)
      : enrollment.balanceDueDate;

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
        balanceDueDate,
      },
    }),
  ]);

  // Fire the SOP email for this milestone, exactly once (see notifyPayment).
  await notifyPayment(updatedEnrollment, fullyPaid);

  return updatedEnrollment;
}

/**
 * Send the deposit (Email 1) or enrolment (Email 3) email for a milestone,
 * guaranteeing at-most-once delivery even though this runs from both the
 * webhook and the callback-verify paths. We atomically "claim" the send by
 * setting the sent timestamp only when it's still null; a losing/duplicate
 * call sees count === 0 and skips. If the send fails we clear the stamp so a
 * later reconciliation can retry.
 */
async function notifyPayment(
  enrollment: { id: string; userId: string },
  fullyPaid: boolean
): Promise<void> {
  const field = fullyPaid ? "enrolledEmailSentAt" : "depositEmailSentAt";

  const claim = await prisma.enrollment.updateMany({
    where: { id: enrollment.id, [field]: null },
    data: { [field]: new Date() },
  });
  if (claim.count === 0) return; // already sent (or being sent) elsewhere

  const [user, fresh] = await Promise.all([
    prisma.user.findUnique({ where: { id: enrollment.userId } }),
    prisma.enrollment.findUnique({ where: { id: enrollment.id } }),
  ]);
  if (!user || !fresh) return;

  const sent = fullyPaid
    ? await sendEnrolledEmail(user, fresh)
    : await sendDepositEmail(user, fresh);

  if (!sent) {
    // Release the claim so the next webhook/verify (or manual retry) resends.
    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { [field]: null },
    });
  }
}

export async function markPaymentFailed(reference: string) {
  await prisma.payment.updateMany({
    where: { reference, status: "PENDING" },
    data: { status: "FAILED" },
  });
}
