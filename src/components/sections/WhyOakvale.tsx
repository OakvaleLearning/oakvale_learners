import Image from "next/image";
import { MonitorSmartphone, Users, Rocket } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { WHY_OAKVALE } from "@/content/site";

const icons = [MonitorSmartphone, Users, Rocket];

export function WhyOakvale() {
  return (
    <section className="relative overflow-hidden bg-mesh py-20 text-white sm:py-28">
      {/* Background image */}
      <Image
        src="/media/why-oakvale-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover opacity-20 mix-blend-luminosity"
      />
      {/* Solid tint so the image reads as texture and text stays legible */}
      <div className="absolute inset-0 bg-primary-950/70" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <Container className="relative">
        <SectionHeading
          dark
          kicker="Why Oakvale Learning"
          title="Learning built around your real life"
          description="Everything about the Oakvale experience is designed to fit busy schedules and turn learning into a career you can use immediately."
        />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {WHY_OAKVALE.map((feature, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem key={feature.title}>
                <div className="group h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-400/40 hover:bg-white/10">
                  <span className="grid size-13 place-items-center rounded-2xl bg-accent-500 text-white shadow-lg shadow-accent-500/30 [width:3.25rem] [height:3.25rem]">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-200">
                    {feature.body}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
