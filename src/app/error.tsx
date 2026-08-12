"use client";

import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-50 px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-ink-900 sm:text-3xl">
          Something went wrong
        </h1>
        <p className="mt-3 text-ink-500">
          An unexpected error occurred. Please try again, or return home.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-700"
          >
            <RefreshCw className="size-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 px-7 py-3.5 text-sm font-semibold text-ink-700 hover:border-primary-300"
          >
            <Home className="size-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
