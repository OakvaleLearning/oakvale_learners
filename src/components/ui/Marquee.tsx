import { cn } from "@/lib/utils";

/** Infinite horizontal marquee of trust badges / words. */
export function Marquee({
  items,
  className,
  dark = false,
}: {
  items: string[];
  className?: string;
  dark?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        className
      )}
    >
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={cn(
              "flex items-center gap-10 text-lg font-semibold tracking-wide",
              dark ? "text-white/80" : "text-ink-500"
            )}
          >
            {item}
            <span className={cn("size-1.5 rounded-full", dark ? "bg-accent-400" : "bg-accent-500")} />
          </span>
        ))}
      </div>
    </div>
  );
}
