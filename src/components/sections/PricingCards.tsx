import Link from "next/link";
import { Check, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNairaPlain } from "@/lib/utils";
import { Reveal } from "@/components/ui/motion";
import type { Program } from "@/content/site";

export function PricingCards({ program }: { program: Program }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {program.pricing.map((card, i) => {
        const featured = card.featured;
        return (
          <Reveal key={card.plan} delay={i * 0.1} className="h-full">
            <div
              className={cn(
                "relative flex h-full flex-col overflow-hidden rounded-4xl p-8 transition-all duration-500 sm:p-10",
                featured
                  ? "bg-brand-gradient text-white shadow-2xl shadow-primary-900/30"
                  : "border border-ink-200 bg-white text-ink-900 hover:border-primary-300 hover:shadow-xl"
              )}
            >
              {featured && (
                <>
                  <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
                  <div className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-accent-500/30 blur-3xl" />
                  <span className="relative mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
                    <Star className="size-3.5 fill-current" />
                    Most popular
                  </span>
                </>
              )}

              <h3
                className={cn(
                  "relative text-lg font-semibold",
                  featured ? "text-white/90" : "text-ink-500"
                )}
              >
                {card.header}
              </h3>

              <div className="relative mt-3 flex items-end gap-1">
                <span className="text-4xl font-black tracking-tight sm:text-5xl">
                  {formatNairaPlain(card.price)}
                </span>
                {card.plan === "SPLIT" && (
                  <span
                    className={cn(
                      "mb-1.5 text-sm",
                      featured ? "text-white/70" : "text-ink-500"
                    )}
                  >
                    deposit
                  </span>
                )}
              </div>

              <p
                className={cn(
                  "relative mt-4 text-[15px] leading-relaxed",
                  featured ? "text-white/85" : "text-ink-600"
                )}
              >
                {card.description}
              </p>

              <div
                className={cn(
                  "relative mt-6 flex items-start gap-2.5 rounded-2xl px-4 py-3 text-sm font-medium",
                  featured ? "bg-white/10" : "bg-primary-50 text-primary-800"
                )}
              >
                <Check
                  className={cn(
                    "mt-0.5 size-4 shrink-0",
                    featured ? "text-accent-300" : "text-primary-600"
                  )}
                  strokeWidth={3}
                />
                {card.bullet}
              </div>

              <div className="relative mt-auto pt-8">
                <Link
                  href={`/enroll/${program.slug}?plan=${card.plan.toLowerCase()}`}
                  className={cn(
                    "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold transition-all hover:gap-3",
                    featured
                      ? "bg-white text-primary-700 shadow-lg hover:-translate-y-0.5"
                      : "bg-primary-600 text-white shadow-lg shadow-primary-600/30 hover:bg-primary-700 hover:-translate-y-0.5"
                  )}
                >
                  {card.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
