"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Clock,
  Users,
  Trophy,
  BookOpen,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Kicker } from "@/components/ui/SectionHeading";
import { CheckList } from "@/components/ui/CheckList";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal, Stagger, StaggerItem, motion } from "@/components/ui/motion";
import { ModuleAccordion } from "./ModuleAccordion";
import { PricingCards } from "./PricingCards";
import { CTABand } from "./CTABand";
import { GET_CERTIFIED, type Program } from "@/content/site";
import { cn } from "@/lib/utils";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function ProgramLanding({ program }: { program: Program }) {
  const isAdult = program.slug === "adult-care";
  const accentText = isAdult ? "text-primary-400" : "text-accent-400";
  const enrollHref = `/enroll/${program.slug}?plan=full`;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 text-white sm:pt-40 sm:pb-28">
        {/* <div className="absolute inset-0 -z-10 bg-mesh" /> */}
        {program.heroImage && (
          <>
            <Image
              src={program.heroImage.src}
              alt={program.heroImage.alt}
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 -z-10 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-ink-950/70" />
          </>
        )}
       
        <Container className="relative">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Kicker dark>{program.kicker}</Kicker>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: easeOutExpo, delay: 0.06 }}
              className="mt-6 text-4xl font-black leading-[1.06] tracking-tight sm:text-5xl md:text-6xl"
            >
              {program.heroHeadline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.16 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200"
            >
              {program.heroBody}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href={enrollHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent-500/30 transition-all hover:-translate-y-0.5 hover:bg-accent-600"
              >
                Enroll Now
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="#curriculum"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-8 py-4 text-base font-semibold text-white ring-1 ring-white/20 backdrop-blur transition-all hover:bg-white/20"
              >
                <BookOpen className="size-5" />
                View Curriculum
              </Link>
            </motion.div>
          </div>
        </Container> 
      </section>

      {/* PROGRAM BENEFITS */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            kicker="Program Benefits"
            title="Skills and certification that open doors"
            description={program.benefitsIntro}
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            <BenefitColumn
              Icon={Users}
              title="Who Is This For?"
              items={program.whoIsThisFor}
            />
            <BenefitColumn
              Icon={Trophy}
              title="What You Will Gain"
              items={program.whatYouWillGain}
            />
            <BenefitColumn
              Icon={GraduationCap}
              title="How You Will Learn"
              items={program.howYouWillLearn}
            />
          </div>
        </Container>
      </section>

      {/* CURRICULUM / MODULES */}
      <section id="curriculum" className="bg-ink-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            kicker="Program Outline"
            title="Your curriculum, module by module"
            description={program.outlineIntro}
          />
          <div className="mx-auto mt-14 max-w-4xl">
            <ModuleAccordion modules={program.modules} accent={program.accent} />
          </div>
        </Container>
      </section>

      {/* PROGRAM DETAILS */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <SectionHeading
                align="left"
                kicker="Program Details"
                title="Everything you need to know"
              />
              <p className="mt-5 text-[15px] leading-relaxed text-ink-600">
                A structured, hybrid programme combining self-paced learning with
                live sessions, mentorship, and hands-on practice — designed to
                take you from where you are to a recognised, job-ready
                professional.
              </p>
              <Link
                href={enrollHref}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
              >
                Enroll Now
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>

            <Stagger className="grid gap-4 sm:grid-cols-2">
              {program.details.map((d) => (
                <StaggerItem key={d.label}>
                  <div className="h-full rounded-3xl border border-ink-100 bg-white p-6">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-500">
                      <Clock className="size-3.5" />
                      {d.label}
                    </div>
                    <div className="mt-2 text-lg font-bold text-ink-900">
                      {d.value}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-ink-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            kicker="Choose Your Payment Plan"
            title="Secure your seat in Cohort 2 today"
            description="Select the payment option that works best for you and lock in your place in the upcoming cohort."
          />
          <div className="mx-auto mt-14 max-w-4xl">
            <PricingCards program={program} />
          </div>
        </Container>
      </section>

      {/* GET CERTIFIED */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-4xl border border-ink-100 bg-white p-8 shadow-sm sm:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <Kicker>{GET_CERTIFIED.headline}</Kicker>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                  {GET_CERTIFIED.subheadline}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
                  {GET_CERTIFIED.body}
                </p>
                <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-accent-100 bg-accent-50 px-5 py-4">
                  <p className="text-sm font-medium text-accent-800">
                    {program.details.find((d) => d.label === "Credential")?.value}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <CheckList items={GET_CERTIFIED.items} />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CTABand
        title={`Ready to start your ${program.shortName} journey?`}
        description="Spots in Cohort 2 are issued on a first-served basis. Secure yours today."
        primaryHref={enrollHref}
        primaryLabel="Enroll Now"
      />
    </>
  );
}

function BenefitColumn({
  Icon,
  title,
  items,
}: {
  Icon: React.ElementType;
  title: string;
  items: string[];
}) {
  return (
    <Reveal className="h-full">
      <div className="h-full rounded-4xl border border-ink-100 bg-white p-8">
        <span className="grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-600">
          <Icon className="size-6" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-ink-900">{title}</h3>
        <div className="mt-5">
          <CheckList items={items} />
        </div>
      </div>
    </Reveal>
  );
}
