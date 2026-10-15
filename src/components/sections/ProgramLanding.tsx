"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Smartphone,
  PlayCircle,
  ClipboardCheck,
  Award,
  MessagesSquare,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Kicker } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem, motion } from "@/components/ui/motion";
import { PricingCards } from "./PricingCards";
import { CTABand } from "./CTABand";
import type { Program } from "@/content/site";
import { cn } from "@/lib/utils";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const EXPERIENCE_STEPS = [
  { Icon: Smartphone, title: "Enrol and download the Oakvale app" },
  { Icon: PlayCircle, title: "Watch practical, pre-recorded masterclasses" },
  { Icon: ClipboardCheck, title: "Take your assessments when you are ready" },
  { Icon: Award, title: "Graduate with a UK CPD Certificate and Jobs Board access" },
];

export function ProgramLanding({ program }: { program: Program }) {
  const isAdult = program.slug === "adult-care";

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
              {program.heroHeadline}{" "}
              <span className={isAdult ? "text-primary-300" : "text-accent-400"}>
                {program.heroHeadlineAccent}
              </span>
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
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent-500/30 transition-all hover:-translate-y-0.5 hover:bg-accent-600"
              >
                View Your Options
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

      {/* THE EXPERIENCE */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <SectionHeading
                align="left"
                kicker="The Experience"
                title="How you will actually learn."
              />
              <p className="mt-5 text-[15px] leading-relaxed text-ink-600">
                {program.experienceBody}
              </p>
              <p className="mt-6 text-lg font-semibold text-ink-900">
                Oakvale does the teaching. The app just makes it fit your life.
              </p>
            </Reveal>

            <Stagger className="grid gap-4 sm:grid-cols-2">
              {EXPERIENCE_STEPS.map((step, i) => (
                <StaggerItem key={step.title}>
                  <div className="h-full rounded-3xl border border-ink-100 bg-white p-6">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-2xl bg-primary-50 text-primary-600">
                        <step.Icon className="size-5" />
                      </span>
                      <span className="text-xs font-semibold text-ink-400">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="mt-4 font-bold text-ink-900">{step.title}</div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* CURRICULUM LADDER */}
      <section id="curriculum" className="bg-ink-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            kicker="The Curriculum"
            title="From absolute beginner to job-ready."
            description="We don't just throw information at you. We build your competence in stages."
          />
          <Stagger className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
            {program.phases.map((phase, i) => (
              <StaggerItem key={phase.title}>
                <div className="h-full rounded-4xl border border-ink-100 bg-white p-8">
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-2xl text-lg font-black text-white",
                      isAdult ? "bg-primary-600" : "bg-accent-500"
                    )}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-ink-900">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                    {phase.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* COMMUNITY */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-4xl border border-ink-100 bg-white p-8 shadow-sm sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
              <span className="grid size-16 place-items-center rounded-3xl bg-accent-50 text-accent-600">
                <MessagesSquare className="size-8" />
              </span>
              <Reveal>
                <Kicker>You Are Not Alone</Kicker>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                  Self-paced does not mean learning alone.
                </h2>
                <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-600">
                  We know learning by yourself can feel isolating. That is why
                  every Oakvale learner gets exclusive access to our Oakvale
                  Student WhatsApp Community. Connect with other participants
                  taking the same course, share your progress, ask questions
                  directly to our coordinators, and build a network of driven
                  professionals just like you.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ENTRY POINTS */}
      <section id="pricing" className="bg-ink-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            kicker="Pricing"
            title="Choose your entry point"
            description="Every journey is different. Pick the entry point that matches your current budget and career goals. You can always upgrade as your skills grow."
          />
          <div className="mt-14">
            <PricingCards program={program} />
          </div>
        </Container>
      </section>

      <CTABand
        title={`Ready to start your ${program.shortName} journey?`}
        description="Start learning the moment you are ready. Pick your entry point and go at your own pace."
        primaryHref="#pricing"
        primaryLabel="Choose Your Entry Point"
      />
    </>
  );
}
