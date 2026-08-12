import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-mesh px-6 text-center text-white">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative">
        <div className="mb-8 flex justify-center">
          <Logo dark />
        </div>
        <p className="text-[7rem] font-black leading-none tracking-tight text-white/90 sm:text-[9rem]">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Page not found</h1>
        <p className="mx-auto mt-3 max-w-sm text-ink-200">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:-translate-y-0.5"
          >
            <Home className="size-4" />
            Back to home
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur transition-all hover:bg-white/20"
          >
            <ArrowLeft className="size-4" />
            View programs
          </Link>
        </div>
      </div>
    </div>
  );
}
