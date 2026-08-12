"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Formats a whole number with thousands separators (e.g. 6000000 → "6,000,000"). */
function format(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

/**
 * Counts up to `value` once it scrolls into view.
 * Falls back to the final value immediately if reduced motion is preferred.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1.8,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: easeOutExpo,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {format(display)}
      {suffix}
    </span>
  );
}
