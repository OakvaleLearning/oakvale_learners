"use client";

import { useState, useTransition } from "react";
import { Loader2, Check, X, ChevronDown } from "lucide-react";
import {
  updateEnrollmentStatus,
  markPaymentReceived,
  markPaymentFailed,
} from "@/app/admin/actions";
import type { EnrollmentStatus } from "@prisma/client";

const STATUS_OPTIONS: EnrollmentStatus[] = [
  "PENDING",
  "PARTIAL",
  "ACTIVE",
  "CANCELLED",
];

export function EnrollmentStatusSelect({
  enrollmentId,
  current,
}: {
  enrollmentId: string;
  current: EnrollmentStatus;
}) {
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useState<EnrollmentStatus>(current);

  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value as EnrollmentStatus;
          setValue(next);
          startTransition(async () => {
            await updateEnrollmentStatus(enrollmentId, next);
          });
        }}
        className="appearance-none rounded-lg border border-ink-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-ink-700 outline-none focus:border-primary-400 disabled:opacity-60"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
      {pending ? (
        <Loader2 className="pointer-events-none absolute right-2 size-3.5 animate-spin text-ink-400" />
      ) : (
        <ChevronDown className="pointer-events-none absolute right-2 size-3.5 text-ink-400" />
      )}
    </div>
  );
}

export function PaymentActions({
  paymentId,
  status,
}: {
  paymentId: string;
  status: string;
}) {
  const [pending, startTransition] = useTransition();

  if (status !== "PENDING") {
    return <span className="text-xs text-ink-300">—</span>;
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await markPaymentReceived(paymentId);
          })
        }
        className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-60"
        title="Mark as received"
      >
        {pending ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
        Mark paid
      </button>
      <button
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await markPaymentFailed(paymentId);
          })
        }
        className="inline-flex items-center gap-1 rounded-lg bg-ink-50 px-2.5 py-1.5 text-xs font-semibold text-ink-600 transition-colors hover:bg-accent-50 hover:text-accent-700 disabled:opacity-60"
        title="Mark as failed"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
