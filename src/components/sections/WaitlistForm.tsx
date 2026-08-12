"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function WaitlistForm({
  variant = "footer",
  track,
}: {
  variant?: "footer" | "section";
  track?: "ADULT_CARE" | "CHILD_CARE";
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          track: track ?? null,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong");
      setStatus("done");
      setMessage("You're on the list! We'll be in touch.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const dark = variant === "footer";

  if (status === "done") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl px-5 py-4",
          dark ? "bg-white/10 text-white" : "bg-primary-50 text-primary-800"
        )}
      >
        <CheckCircle2 className="size-6 text-accent-400" />
        <p className="font-medium">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className={cn(
          "flex flex-col gap-3 sm:flex-row",
          variant === "section" && "sm:gap-2"
        )}
      >
        <input
          type="text"
          name="name"
          required
          placeholder="Full name"
          className={cn(
            "w-full rounded-full border px-5 py-3.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-accent-500",
            dark
              ? "border-white/15 bg-white/10 text-white placeholder:text-ink-400"
              : "border-ink-200 bg-white text-ink-900 placeholder:text-ink-400"
          )}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email address"
          className={cn(
            "w-full rounded-full border px-5 py-3.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-accent-500",
            dark
              ? "border-white/15 bg-white/10 text-white placeholder:text-ink-400"
              : "border-ink-200 bg-white text-ink-900 placeholder:text-ink-400"
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/30 transition-all hover:bg-accent-600 hover:-translate-y-0.5 disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Join the Waitlist
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-accent-300">{message}</p>
      )}
    </form>
  );
}
