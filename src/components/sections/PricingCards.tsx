import Link from "next/link";
import { Check, Minus, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNairaPlain } from "@/lib/utils";
import { Reveal } from "@/components/ui/motion";
import { tierHref, type Program } from "@/content/site";

export function PricingCards({ program }: { program: Program }) {
  const external = tierHref(program, "full").startsWith("http");
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
      {program.tiers.map((tier, i) => {
        const featured = tier.featured;
        const sub = featured ? "text-white/70" : "text-ink-500";
        const body = featured ? "text-white/85" : "text-ink-600";
        return (
          <Reveal key={tier.id} delay={i * 0.1} className="h-full">
            <div
              className={cn(
                "relative flex h-full flex-col overflow-hidden rounded-4xl p-8 transition-all duration-500",
                featured
                  ? "bg-brand-gradient text-white shadow-2xl shadow-primary-900/30"
                  : "border border-ink-200 bg-white text-ink-900 hover:border-primary-300 hover:shadow-xl"
              )}
            >
              {featured && (
                <>
                  {/* <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
                  <div className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-accent-500/30 blur-3xl" /> */}
                  <span className="relative mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
                    <Star className="size-3.5 fill-current" />
                    Best value
                  </span>
                </>
              )}

              <h3 className={cn("relative text-lg font-semibold", featured ? "text-white/90" : "text-ink-500")}>
                {tier.name}
              </h3>
              <div className="relative mt-3 text-4xl font-black tracking-tight">
                {formatNairaPlain(tier.price)}
              </div>
              {tier.note && (
                <p className={cn("relative mt-1 text-sm font-medium", featured ? "text-accent-200" : "text-primary-700")}>
                  {tier.note}
                </p>
              )}

              <p className={cn("relative mt-4 text-[15px] leading-relaxed", body)}>
                <span className={cn("font-semibold", featured ? "text-white" : "text-ink-900")}>
                  {tier.taglineLabel}:
                </span>{" "}
                {tier.tagline}
              </p>

              <TierSection title="What you will learn" featured={featured}>
                <div className="space-y-3">
                  {tier.learn.map((l) => (
                    <p key={l.body} className={cn("text-sm leading-relaxed", body)}>
                      {l.title && (
                        <span className={cn("font-semibold", featured ? "text-white" : "text-ink-900")}>
                          {l.title}:{" "}
                        </span>
                      )}
                      {l.body}
                    </p>
                  ))}
                </div>
              </TierSection>

              <TierSection title="Roles you can secure" featured={featured}>
                <p className={cn("text-sm leading-relaxed", body)}>{tier.roles}</p>
              </TierSection>

              <TierSection title={tier.deliverablesTitle} featured={featured}>
                <ul className="space-y-2.5">
                  {tier.deliverables.map((d) => (
                    <li key={d} className={cn("flex items-start gap-2.5 text-sm", body)}>
                      <Check
                        className={cn("mt-0.5 size-4 shrink-0", featured ? "text-accent-300" : "text-primary-600")}
                        strokeWidth={3}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </TierSection>

              {tier.exclusions && (
                <TierSection title="What's not included" featured={featured}>
                  <ul className="space-y-2.5">
                    {tier.exclusions.map((x) => (
                      <li key={x} className={cn("flex items-start gap-2.5 text-sm", sub)}>
                        <Minus className="mt-0.5 size-4 shrink-0" strokeWidth={3} />
                        {x}
                      </li>
                    ))}
                  </ul>
                </TierSection>
              )}

              <div className="relative mt-auto pt-8">
                <Link
                  href={tierHref(program, tier.id)}
                  {...(external && { target: "_blank", rel: "noopener" })}
                  className={cn(
                    "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold transition-all hover:gap-3",
                    featured
                      ? "bg-white text-primary-700 shadow-lg hover:-translate-y-0.5"
                      : "bg-primary-600 text-white shadow-lg shadow-primary-600/30 hover:bg-primary-700 hover:-translate-y-0.5"
                  )}
                >
                  {tier.cta}
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

function TierSection({
  title,
  featured,
  children,
}: {
  title: string;
  featured?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative mt-6 border-t pt-6", featured ? "border-white/15" : "border-ink-100")}>
      <h4
        className={cn(
          "mb-3 text-xs font-semibold uppercase tracking-[0.14em]",
          featured ? "text-white/70" : "text-ink-400"
        )}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}
