import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "./motion";

export function CheckList({
  items,
  columns = 1,
  dark = false,
  className,
}: {
  items: string[];
  columns?: 1 | 2;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Stagger
      className={cn(
        "grid gap-3",
        columns === 2 && "sm:grid-cols-2 sm:gap-x-8",
        className
      )}
    >
      {items.map((item) => (
        <StaggerItem key={item}>
          <div className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full",
                dark ? "bg-accent-500/20 text-accent-300" : "bg-primary-50 text-primary-600"
              )}
            >
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <span
              className={cn(
                "text-[15px] leading-relaxed",
                dark ? "text-ink-200" : "text-ink-700"
              )}
            >
              {item}
            </span>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
