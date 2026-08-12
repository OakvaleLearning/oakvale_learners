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
import {
  GraduationCap,
  BriefcaseBusiness,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const alignment = [
  "EYFS (UK)",
  "CDA (USA)",
  "ECE (Canada)",
  "UNCRC",
  "Globally Aligned",
  "Job-Ready Certification",
];

const outcomes = [
  {
    Icon: GraduationCap,
    title: "Recognised Certification",
    body: "Earn a certificate that reflects real, job-ready clinical and early-years competencies.",
  },
  {
    Icon: BriefcaseBusiness,
    title: "Real Career Pathways",
    body: "CV support, interview prep, and access to placement via our Jobs Board — at home or abroad.",
  },
  {
    Icon: HeartHandshake,
    title: "Mentorship & Community",
    body: "Weekly live lessons, direct mentor support, and a community of driven professionals.",
  },
  {
    Icon: ShieldCheck,
    title: "Safety-First Practice",
    body: "Safeguarding, infection prevention, and ethical care embedded in every module.",
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

      <GlobalDemand />

      <TrackBlocks />

      {/* Outcomes */}
      <section className="relative py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <div>
                <SectionHeading
                  align="left"
                  kicker="What You Gain"
                  title="More than a course — a launchpad into care work"
                  description="Every Oakvale track is engineered around outcomes: certification, employability, and the confidence to practice anywhere in the world."
                />
                <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-primary-100 bg-primary-50 px-5 py-4">
                  <Sparkles className="size-5 text-accent-500" />
                  <p className="text-sm font-medium text-primary-800">
                    Cohort 2 is now enrolling — spots issued on a first-served
                    basis.
                  </p>
                </div>
              </div>
            </Reveal>

            <Stagger className="grid gap-5 sm:grid-cols-2">
              {outcomes.map((o) => (
                <StaggerItem key={o.title}>
                  <div className="group h-full rounded-3xl border border-ink-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-ink-900/5">
                    <span className="grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                      <o.Icon className="size-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-ink-900">
                      {o.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      {o.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      <CareerPaths />

      <WhyOakvale />

      {/* <CTABand /> */}
    </>
  );
}
