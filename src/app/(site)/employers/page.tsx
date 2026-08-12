import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  BadgeCheck,
  Building2,
  TrendingUp,
  ClipboardCheck,
  HeartHandshake,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckList } from "@/components/ui/CheckList";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "For Employers",
  description:
    "Hire job-ready, certified caregivers or train your frontline healthcare staff with Oakvale Learning.",
};

const benefits = [
  {
    Icon: BadgeCheck,
    title: "Verified & Job-Ready",
    body: "Every graduate is assessed against globally aligned standards and ready to contribute from day one.",
  },
  {
    Icon: ClipboardCheck,
    title: "Standardised Training",
    body: "Upskill your existing frontline staff with a consistent, certified curriculum across your whole team.",
  },
  {
    Icon: TrendingUp,
    title: "Lower Turnover",
    body: "Confident, competent staff stay longer. Invest in structured growth that retains your best people.",
  },
  {
    Icon: HeartHandshake,
    title: "Safeguarding Built In",
    body: "Infection prevention, duty of care, and safeguarding are embedded in every learner's training.",
  },
];

const hireList = [
  "Access a pipeline of certified adult and child care professionals.",
  "Verified competencies in clinical care, safeguarding, and daily routines.",
  "Candidates prepared for interviews and workplace expectations.",
  "Support for local employment and international relocation pathways.",
];

const trainList = [
  "Enrol frontline staff into structured, hybrid certification tracks.",
  "Flexible, self-paced modules that fit around shift patterns.",
  "Progress tracking and recognised certificates on completion.",
  "Custom cohort scheduling for teams and organisations.",
];

export default function EmployersPage() {
  return (
    <>
      <PageHero
        kicker="For Employers & Organisations"
        title="Build a workforce of verified care professionals"
        description="Whether you are hiring job-ready caregivers or training your existing frontline staff, Oakvale gives you certified, competent, and confident professionals aligned to global standards."
        bgImage={{
          src: "/employer-hero.jpg",
          alt: "A care team leader working alongside confident frontline healthcare staff",
        }}
      >
        <Link
          href="https://jobs.oakvaleltd.com/"
          className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/30 transition-all hover:-translate-y-0.5 hover:bg-accent-600"
        >
          Partner with Oakvale
          <ArrowRight className="size-4" />
        </Link>
      </PageHero>

      {/* Benefits */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            kicker="Why Partner With Us"
            title="Talent you can trust, trained to standard"
            description="We take the risk out of hiring and developing care staff by standardising quality, safeguarding, and competence."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <StaggerItem key={b.title}>
                <div className="group h-full rounded-3xl border border-ink-100 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink-900/5">
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                    <b.Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink-900">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {b.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Two paths: Hire / Train */}
      <section className="bg-ink-50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <Reveal>
              <div className="h-full rounded-4xl border border-ink-100 bg-white p-8 sm:p-10">
                <span className="grid size-13 place-items-center rounded-2xl bg-primary-600 text-white [width:3.25rem] [height:3.25rem]">
                  <Users className="size-6" />
                </span>
                <h3 className="mt-6 text-2xl font-bold text-ink-900">
                  Hire certified graduates
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                  Connect with a growing pool of verified caregivers ready to
                  join your team through our Jobs Board.
                </p>
                <div className="mt-6">
                  <CheckList items={hireList} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-4xl border border-ink-100 bg-white p-8 sm:p-10">
                <span className="grid size-13 place-items-center rounded-2xl bg-accent-500 text-white [width:3.25rem] [height:3.25rem]">
                  <Building2 className="size-6" />
                </span>
                <h3 className="mt-6 text-2xl font-bold text-ink-900">
                  Train your frontline staff
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                  Upskill your existing team with structured, certified training
                  designed to fit around real shift patterns.
                </p>
                <div className="mt-6">
                  <CheckList items={trainList} />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABand
        title="Let's build your care workforce together"
        description="Tell us about your hiring or training needs and we'll design a partnership that works."
        primaryHref="https://jobs.oakvaleltd.com/"
        primaryLabel="Get in touch"
        secondaryHref="https://jobs.oakvaleltd.com/"
        secondaryLabel="View programs"
      />
    </>
  );
}
