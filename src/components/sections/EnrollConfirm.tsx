"use client";

import { useState } from "react";
import { Loader2, ShieldCheck, ArrowRight } from "lucide-react";
import type { Track, PaymentPlan } from "@prisma/client";

export function EnrollConfirm({
  track,
  plan,
}: {
  track: Track;
  plan: PaymentPlan;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleEnroll() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track, plan }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong");
      // Redirect to Paystack (or the local simulation callback).
      window.location.href = json.authorizationUrl;
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div>
      {error && (
        <p className="mb-4 rounded-2xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-700">
          {error}
        </p>
      )}
      <button
        onClick={handleEnroll}
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:-translate-y-0.5 hover:bg-primary-700 disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Redirecting to payment…
          </>
        ) : (
          <>
            Proceed to payment
            <ArrowRight className="size-4" />
          </>
        )}
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-400">
        <ShieldCheck className="size-3.5" />
        You&apos;ll be redirected to Paystack to complete payment securely.
      </p>
    </div>
  );
}
