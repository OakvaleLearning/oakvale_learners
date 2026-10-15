import { Hero } from "@/components/sections/Hero";
import { TrackBlocks } from "@/components/sections/TrackBlocks";
import { WhyOakvale } from "@/components/sections/WhyOakvale";
import { CareerPaths } from "@/components/sections/CareerPaths";
import { GlobalDemand } from "@/components/sections/GlobalDemand";
// import { CTABand } from "@/components/sections/CTABand";
import { Marquee } from "@/components/ui/Marquee";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Smartphone, Route, CalendarClock } from "lucide-react";

const alignment = [
  "EYFS (UK)",
  "CDA (USA)",
  "ECE (Canada)",
  "UNCRC",
  "Globally Aligned",
  "Job-Ready Certification",
];

const realityPoints = [
  {
    Icon: CalendarClock,
    title: "Your schedule, not ours",
    body: "We teach you everything you need to know, but we let you choose when to learn it.",
  },
  {
    Icon: Smartphone,
    title: "Learn on the Oakvale app",
    body: "Watch practical masterclasses and complete your modules whenever you have the time.",
  },
  {
    Icon: Route,
    title: "You set the pace",
    body: "Oakvale gives you the roadmap, the mentorship, and the certification.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Alignment marquee */}
      <section className="border-y border-ink-100 bg-ink-50 py-6">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
          Globally aligned standards
        </p>
        <Marquee items={alignment} />
      </section>

      {/* The Reality Check */}
      <section className="relative py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <SectionHeading
                align="left"
                kicker="Built For Busy People"
                title="Training built around your actual life."
                description="You're busy. We know. At Oakvale, we believe your education should fit into your schedule, not the other way around."
              />
            </Reveal>

            <Stagger className="grid gap-5">
              {realityPoints.map((o) => (
                <StaggerItem key={o.title}>
                  <div className="group flex h-full gap-5 rounded-3xl border border-ink-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-ink-900/5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                      <o.Icon className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-ink-900">
                        {o.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                        {o.body}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      <TrackBlocks />

      <GlobalDemand />

      <CareerPaths />

      <WhyOakvale />

      {/* <CTABand /> */}
    </>
  );
}
