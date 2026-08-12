"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/SectionHeading";
import { motion } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function PageHero({
  kicker,
  title,
  description,
  children,
  image,
  bgImage,
}: {
  kicker?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  image?: { src: string; alt: string };
  bgImage?: { src: string; alt: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-mesh pt-32 pb-16 text-white sm:pt-40 sm:pb-20">
      {bgImage && (
        <>
          <Image
            src={bgImage.src}
            alt={bgImage.alt}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-ink-950/70" />
        </>
      )}
      <div className="absolute inset-0 bg-grid opacity-40" />
      {/* <div className="pointer-events-none absolute -right-24 top-10 size-80 rounded-full bg-accent-500/20 blur-3xl" /> */}
      <Container className="relative">
        <div
          className={cn(
            image &&
              "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
          )}
        >
          <div className={cn(image ? "max-w-2xl" : "max-w-3xl")}>
            {kicker && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Kicker dark>{kicker}</Kicker>
              </motion.div>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.06 }}
              className="mt-5 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-[3.5rem]"
            >
              {title}
            </motion.h1>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.16 }}
                className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-200"
              >
                {description}
              </motion.p>
            )}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.26 }}
                className="mt-8"
              >
                {children}
              </motion.div>
            )}
          </div>

          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-4xl ring-1 ring-white/15 sm:aspect-[5/4] lg:aspect-[4/5]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-ink-950/10" />
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
