"use client";

import { useState } from "react";
import { Loader2, CreditCard } from "lucide-react";

/**
 * Restarts an unfinished payment. The old Paystack reference can't be reused,
 * so the API supersedes it with a fresh one and hands back a checkout URL.
 */
export function CompletePaymentButton({
  paymentId,
  label = "Complete payment",
}: {
  paymentId: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function pay() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/payments/retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong");
      window.location.href = json.authorizationUrl;
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div>
      <button
        onClick={pay}
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-primary-600/30 transition-all hover:bg-primary-700 disabled:opacity-70"
      >
        {loading ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <CreditCard className="size-3.5" />
        )}
        {label}
      </button>
      {error && <p className="mt-1.5 text-xs text-accent-600">{error}</p>}
    </div>
  );
}
