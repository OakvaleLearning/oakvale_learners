"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { applySuccessfulPayment } from "@/lib/payments";
import type { EnrollmentStatus } from "@prisma/client";

const VALID_STATUSES: EnrollmentStatus[] = [
  "PENDING",
  "PARTIAL",
  "ACTIVE",
  "CANCELLED",
];

export async function updateEnrollmentStatus(
  enrollmentId: string,
  status: EnrollmentStatus
) {
  await requireAdmin();
  if (!VALID_STATUSES.includes(status)) {
    return { error: "Invalid status" };
  }
  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: { status },
  });
  revalidatePath("/admin/enrollments");
  revalidatePath("/admin");
  return { ok: true };
}

/** Manually reconcile a pending payment as received (e.g. offline/bank transfer). */
export async function markPaymentReceived(paymentId: string) {
  await requireAdmin();
  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment) return { error: "Payment not found" };
  if (payment.status === "SUCCESS") return { ok: true };

  await applySuccessfulPayment(payment.reference, {
    channel: "manual",
    paidAt: new Date(),
  });
  revalidatePath("/admin/payments");
  revalidatePath("/admin/enrollments");
  revalidatePath("/admin");
  return { ok: true };
}

export async function markPaymentFailed(paymentId: string) {
  await requireAdmin();
  await prisma.payment.updateMany({
    where: { id: paymentId, status: "PENDING" },
    data: { status: "FAILED" },
  });
  revalidatePath("/admin/payments");
  return { ok: true };
}
