import Link from "next/link";
import { ArrowRight, Clock, Heart, Baby } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/motion";
import { ADULT_CARE, CHILD_CARE, type Program } from "@/content/site";

const meta = {
  "adult-care": {
    Icon: Heart,
    duration: "10 Weeks",
    ring: "hover:border-primary-300",
    glow: "bg-primary-500/15",
    iconBg: "bg-primary-600",
    btn: "bg-primary-600 hover:bg-primary-700 shadow-primary-600/30",
    tag: "text-primary-700 bg-primary-50 ring-primary-100",
  },
  "child-care": {
    Icon: Baby,
    duration: "15 Weeks",
    ring: "hover:border-accent-300",
    glow: "bg-accent-500/15",
    iconBg: "bg-accent-500",
    btn: "bg-accent-500 hover:bg-accent-600 shadow-accent-500/30",
    tag: "text-accent-700 bg-accent-50 ring-accent-100",
  },
} as const;

function TrackCard({ program, delay }: { program: Program; delay: number }) {
  const m = meta[program.slug];
  const Icon = m.Icon;
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className={`group relative flex h-full flex-col overflow-hidden rounded-4xl border border-ink-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink-900/10 ${m.ring} sm:p-10`}
      >
        <div
          className={`pointer-events-none absolute -right-16 -top-16 size-56 rounded-full ${m.glow} blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60`}
        />
        <div className="relative flex items-center justify-between">
          <span
            className={`grid size-14 place-items-center rounded-2xl ${m.iconBg} text-white shadow-lg`}
          >
            <Icon className="size-7" />
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${m.tag}`}
          >
            <Clock className="size-3.5" />
            {m.duration} · Hybrid
          </span>
        </div>

        <h3 className="relative mt-7 text-2xl font-bold tracking-tight text-ink-900">
          {program.homeHeadline}
        </h3>
        <p className="relative mt-4 flex-1 text-[15px] leading-relaxed text-ink-600">
          {program.homeBody}
        </p>

        <Link
          href={`/programs/${program.slug}`}
          className={`relative mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all group-hover:gap-3 ${m.btn}`}
        >
          {program.homeCta}
          <ArrowRight className="size-4 transition-transform" />
        </Link>
      </div>
    </Reveal>
  );
}

export function TrackBlocks() {
  return (
    <section id="tracks" className="relative py-20 sm:py-28">
      <Container>
        <SectionHeading
          kicker="Choose Your Path"
          title="Our Certified Caregiving Tracks"
          description="We offer two specialized training tracks designed to transform you into a verified healthcare professional. Choose the path that aligns with your career goals and step into a high demand clinical role."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <TrackCard program={ADULT_CARE} delay={0} />
          <TrackCard program={CHILD_CARE} delay={0.12} />
        </div>
      </Container>
    </section>
  );
}
