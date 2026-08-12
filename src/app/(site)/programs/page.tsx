import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Heart, Baby, Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/motion";
import { ADULT_CARE, CHILD_CARE, type Program } from "@/content/site";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore Oakvale Learning's certified caregiving tracks: Professional Adult & Elderly Care and Professional Childcare & Early Years.",
};

const cardMeta = {
  "adult-care": {
    Icon: Heart,
    duration: "10 Weeks",
    iconBg: "bg-primary-600",
    accentText: "text-primary-700",
    btn: "bg-primary-600 hover:bg-primary-700 shadow-primary-600/30",
    border: "hover:border-primary-300",
  },
  "child-care": {
    Icon: Baby,
    duration: "15 Weeks",
    iconBg: "bg-accent-500",
    accentText: "text-accent-600",
    btn: "bg-accent-500 hover:bg-accent-600 shadow-accent-500/30",
    border: "hover:border-accent-300",
  },
} as const;

function ProgramCard({ program, delay }: { program: Program; delay: number }) {
  const m = cardMeta[program.slug];
  const Icon = m.Icon;
  const highlights = program.whatYouWillGain.slice(0, 4);
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className={`group flex h-full flex-col overflow-hidden rounded-4xl border border-ink-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink-900/10 ${m.border}`}
      >
        <div className="flex items-start justify-between gap-4 p-8 pb-0">
          <span className={`grid size-14 place-items-center rounded-2xl ${m.iconBg} text-white shadow-lg`}>
            <Icon className="size-7" />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-3 py-1.5 text-xs font-semibold text-ink-600">
            <Clock className="size-3.5" />
            {m.duration} · Hybrid
          </span>
        </div>
        <div className="flex flex-1 flex-col p-8 pt-6">
          <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${m.accentText}`}>
            {program.kicker}
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink-900">
            {program.name}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            {program.heroBody}
          </p>

          <ul className="mt-6 space-y-2.5">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-ink-700">
                <Check className={`mt-0.5 size-4 shrink-0 ${m.accentText}`} strokeWidth={3} />
                {h}
              </li>
            ))}
          </ul>

          <Link
            href={`/programs/${program.slug}`}
            className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all group-hover:gap-3 ${m.btn}`}
          >
            Explore {program.shortName}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        bgImage={{
          src: "/why-oakvale-bg1.png",
          alt: "About us"
        }}
        kicker="Certified Caregiving Tracks"
        title="Two paths. One verified future in care."
        description="Whether your calling is caring for aging adults or nurturing the next generation, Oakvale gives you globally aligned skills, hands-on placement, and real career pathways."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <ProgramCard program={ADULT_CARE} delay={0} />
            <ProgramCard program={CHILD_CARE} delay={0.12} />
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
