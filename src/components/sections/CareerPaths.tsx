import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading, Kicker } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { CAREER_PATHS, type CareerPath } from "@/content/site";

function PathRow({ path, index }: { path: CareerPath; index: number }) {
  const reversed = index % 2 === 1;
  const isPrimary = path.accent === "primary";
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Image */}
      <Reveal
        y={40}
        className={cn("lg:order-1", reversed && "lg:order-2")}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-ink-100 shadow-xl shadow-ink-900/5">
          <Image
            src={path.image}
            alt={path.title}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
         
        </div>
      </Reveal>

      {/* Text */}
      <Reveal
        delay={0.1}
        className={cn("lg:order-2", reversed && "lg:order-1")}
      >
        <div>
          <Kicker>{path.kicker}</Kicker>
          <h3 className="mt-5 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            {path.title}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-600 sm:text-base">
            {path.body}
          </p>
          <ul className="mt-6 space-y-3">
            {path.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-white",
                    isPrimary ? "bg-primary-600" : "bg-accent-500"
                  )}
                >
                  <Check className="size-3.5" />
                </span>
                <span className="text-sm leading-relaxed text-ink-700">
                  {point}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href={path.cta.href}
            className={cn(
              "group mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors",
              isPrimary
                ? "text-primary-700 hover:text-primary-800"
                : "text-accent-600 hover:text-accent-700"
            )}
          >
            {path.cta.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

export function CareerPaths() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <SectionHeading
          kicker="Where Oakvale Takes You"
          title="One certification, many career paths"
          description="Whatever your starting point, Oakvale opens a door — at home, abroad, or into a whole new direction."
        />
        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
          {CAREER_PATHS.map((path, i) => (
            <PathRow key={path.slug} path={path} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
