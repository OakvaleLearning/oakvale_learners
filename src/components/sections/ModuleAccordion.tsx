"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProgramModule } from "@/content/site";

export function ModuleAccordion({
  modules,
  accent = "primary",
}: {
  modules: ProgramModule[];
  accent?: "primary" | "accent";
}) {
  const [open, setOpen] = useState(0);
  const ring = accent === "accent" ? "border-accent-200" : "border-primary-200";
  const numBg = accent === "accent" ? "bg-accent-500" : "bg-primary-600";
  const checkColor = accent === "accent" ? "text-accent-500" : "text-primary-600";

  return (
    <div className="space-y-4">
      {modules.map((mod, i) => {
        const isOpen = open === i;
        return (
          <div
            key={mod.title}
            className={cn(
              "overflow-hidden rounded-3xl border bg-white transition-colors",
              isOpen ? ring : "border-ink-100"
            )}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center gap-4 p-6 text-left"
            >
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-xl text-sm font-bold text-white",
                  numBg
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-base font-bold text-ink-900 sm:text-lg">
                {mod.title}
              </span>
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full bg-ink-50 text-ink-500 transition-transform duration-300",
                  isOpen && "rotate-45"
                )}
              >
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pl-20">
                    <p className="text-[15px] leading-relaxed text-ink-600">
                      {mod.description}
                    </p>
                    {mod.bullets && (
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {mod.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-sm text-ink-700"
                          >
                            <Check
                              className={cn("mt-0.5 size-4 shrink-0", checkColor)}
                              strokeWidth={3}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
