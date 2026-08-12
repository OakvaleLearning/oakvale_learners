"use client";

import { motion } from "motion/react";
import { ArrowRight, Play, ShieldCheck, Globe, Award } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import Image from "next/image";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: "2", label: "Certified Tracks" },
  { value: "0–5", label: "Early Years Focus" },
  { value: "100%", label: "Hybrid Learning" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background: mesh base + video + dark overlay */}
      <div className="absolute inset-0 -z-10 bg-mesh" />
      <video
        className="absolute inset-0 -z-10 size-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/media/hero-poster.jpg"
      >
        <source src="/media/hero.webm" type="video/webm" />
        <source src="/home-bg.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 -z-10 bg-ink-950/30" />
      {/* <div className="absolute inset-0 -z-10 bg-grid opacity-40" /> */}

      <div className="mx-auto w-full max-w-7xl px-5 pt-28 pb-16 sm:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur"
          >
            <span className="size-1.5 rounded-full bg-accent-400" />
            Certified Caregiving Training
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easeOutExpo, delay: 0.08 }}
            className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            Step into a{" "}
            <span className="relative whitespace-nowrap">
              <span className="text-accent-400">verified</span>
            </span>{" "}
            healthcare career
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.18 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200"
          >
            Oakvale Learning transforms aspiring caregivers into globally
            recognised professionals — with hands-on placement, mentorship, and
            real career pathways in Adult and Child Care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.28 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink href="/programs" variant="accent" size="lg">
              Explore Programs
              <ArrowRight className="size-5" />
            </ButtonLink>
            <ButtonLink
              href="/about"
              variant="white"
              size="lg"
              className="bg-white/10 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20"
            >
              <Play className="size-4" />
              How Oakvale works
            </ButtonLink>
          </motion.div>

          {/* Trust row 
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-300"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-accent-400" /> Certified
            </span>
            <span className="inline-flex items-center gap-2">
              <Globe className="size-4 text-accent-400" /> Globally Aligned
            </span>
            <span className="inline-flex items-center gap-2">
              <Award className="size-4 text-accent-400" /> Job-Ready
            </span>
          </motion.div> */}
        </div>

       
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5"
        >
          <span className="size-1.5 rounded-full bg-white/70" />
        </motion.div>
      </div>
    </section>
  );
}
