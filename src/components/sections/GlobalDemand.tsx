import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CountUp } from "@/components/ui/CountUp";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { GLOBAL_DEMAND } from "@/content/site";

export function GlobalDemand() {
  return (
    <section className="relative bg-ink-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          kicker={GLOBAL_DEMAND.kicker}
          title={GLOBAL_DEMAND.title}
          description={GLOBAL_DEMAND.description}
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 sm:mt-16 lg:grid-cols-4">
          {GLOBAL_DEMAND.stats.map((stat) => (
            <StaggerItem key={stat.region} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-ink-900/5">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">
                  {stat.region}
                </span>
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  className="mt-4 text-3xl font-bold tracking-tight text-primary-700 tabular-nums sm:text-4xl"
                />
                <p className="mt-4 text-sm leading-relaxed text-ink-600">
                  {stat.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
