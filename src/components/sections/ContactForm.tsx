"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

const inputClass =
  "w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-200";

export function ContactForm() {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong");
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-primary-100 bg-primary-50 px-6 py-14 text-center">
        <CheckCircle2 className="size-12 text-accent-500" />
        <div>
          <h3 className="text-xl font-bold text-ink-900">Message sent!</h3>
          <p className="mt-1 text-sm text-ink-600">
            Thanks for reaching out. We&apos;ll get back to you shortly.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">
            Full name
          </label>
          <input name="name" required placeholder="Jane Doe" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="jane@email.com"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">
          Subject
        </label>
        <input
          name="subject"
          placeholder="How can we help?"
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us a little about what you need..."
          className={inputClass + " resize-none"}
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-accent-600">{message}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:-translate-y-0.5 hover:bg-primary-700 disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            Send message
            <Send className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}
