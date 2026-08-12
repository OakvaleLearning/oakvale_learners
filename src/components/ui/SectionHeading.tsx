import { cn } from "@/lib/utils";
import { Reveal } from "./motion";

export function Kicker({
  children,
  className,
  dark,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
        dark
          ? "bg-white/10 text-accent-200 ring-1 ring-white/15"
          : "bg-primary-50 text-primary-700 ring-1 ring-primary-100",
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", dark ? "bg-accent-400" : "bg-accent-500")} />
      {children}
    </span>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
  dark = false,
  className,
}: {
  kicker?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {kicker && <Kicker dark={dark}>{kicker}</Kicker>}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]",
          dark ? "text-white" : "text-ink-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            dark ? "text-ink-200" : "text-ink-600"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
