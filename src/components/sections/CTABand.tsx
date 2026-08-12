import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/motion";

export function CTABand({
  title = "Ready to step into your future?",
  description = "Secure your seat in Cohort 2. Choose the track that fits your goals and start your journey to a verified caregiving career.",
  primaryHref = "/programs",
  primaryLabel = "Enroll Now",
  secondaryHref = "/contact",
  secondaryLabel = "Talk to us",
}: {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-brand-gradient px-6 py-14 text-center shadow-2xl shadow-primary-900/30 sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
            <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-accent-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 size-72 rounded-full bg-primary-400/30 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
                {description}
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href={primaryHref} variant="white" size="lg">
                  {primaryLabel}
                  <ArrowRight className="size-5" />
                </ButtonLink>
                <ButtonLink
                  href={secondaryHref}
                  variant="white"
                  size="lg"
                  className="bg-white/10 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/20"
                >
                  {secondaryLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
