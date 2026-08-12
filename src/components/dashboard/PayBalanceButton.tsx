"use client";

import { useState } from "react";
import { Loader2, CreditCard } from "lucide-react";

export function PayBalanceButton({
  enrollmentId,
  label = "Pay balance",
}: {
  enrollmentId: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function pay() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/payments/balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId }),
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
        className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-600/30 transition-all hover:bg-primary-700 disabled:opacity-70"
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <CreditCard className="size-4" />
        )}
        {label}
      </button>
      {error && <p className="mt-1.5 text-xs text-accent-600">{error}</p>}
    </div>
  );
}
