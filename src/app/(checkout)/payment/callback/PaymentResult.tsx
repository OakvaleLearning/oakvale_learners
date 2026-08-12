"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { CheckCircle2, XCircle, Loader2, ArrowRight, RefreshCw } from "lucide-react";

type State = "verifying" | "success" | "partial" | "failed" | "error";

export function PaymentResult() {
  const params = useSearchParams();
  const reference = params.get("reference");
  const simulated = params.get("simulated");
  const [state, setState] = useState<State>("verifying");

  useEffect(() => {
    let cancelled = false;
    async function verify() {
      if (!reference) {
        if (!cancelled) setState("error");
        return;
      }
      const url = `/api/payments/verify?reference=${encodeURIComponent(reference)}${
        simulated ? "&simulated=1" : ""
      }`;
      try {
        const res = await fetch(url);
        const json = await res.json();
        if (cancelled) return;
        if (json.status === "success") {
          setState(json.enrollmentStatus === "PARTIAL" ? "partial" : "success");
        } else {
          setState("failed");
        }
      } catch {
        if (!cancelled) setState("error");
      }
    }
    verify();
    return () => {
      cancelled = true;
    };
  }, [reference, simulated]);

  if (state === "verifying") {
    return (
      <Card>
        <Loader2 className="size-14 animate-spin text-primary-600" />
        <h1 className="mt-6 text-2xl font-bold text-ink-900">
          Verifying your payment…
        </h1>
        <p className="mt-2 text-ink-500">
          Please wait while we confirm your transaction. Don&apos;t close this
          window.
        </p>
      </Card>
    );
  }

  if (state === "success" || state === "partial") {
    return (
      <Card>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <CheckCircle2 className="size-16 text-emerald-500" />
        </motion.div>
        <h1 className="mt-6 text-2xl font-bold text-ink-900">
          Payment successful!
        </h1>
        <p className="mt-2 max-w-sm text-ink-500">
          {state === "partial"
            ? "Your deposit is confirmed and your seat is secured. Your remaining balance is due before Day 1."
            : "Your enrolment is confirmed and your seat is secured. Welcome to Oakvale Learning!"}
        </p>
        <Link
          href="/dashboard"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
        >
          Go to your dashboard
          <ArrowRight className="size-4" />
        </Link>
      </Card>
    );
  }

  return (
    <Card>
      <XCircle className="size-16 text-accent-500" />
      <h1 className="mt-6 text-2xl font-bold text-ink-900">
        {state === "error" ? "Something went wrong" : "Payment not completed"}
      </h1>
      <p className="mt-2 max-w-sm text-ink-500">
        {state === "error"
          ? "We couldn't verify your payment. If you were charged, please contact support."
          : "Your payment wasn't completed. You can try again — you won't be charged twice."}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/programs"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-700"
        >
          <RefreshCw className="size-4" />
          Try again
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 px-7 py-3.5 text-sm font-semibold text-ink-700 hover:border-primary-300"
        >
          Contact support
        </Link>
      </div>
    </Card>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center rounded-4xl border border-ink-100 bg-white px-8 py-16 text-center shadow-sm">
      {children}
    </div>
  );
}
