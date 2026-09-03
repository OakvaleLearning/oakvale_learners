import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared long-form styling for legal pages (Privacy Policy, Terms & Conditions).
 * Styles headings, paragraphs, lists and links via descendant selectors so the
 * page files can stay as plain semantic markup.
 */
export function LegalBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-none text-[15px] leading-relaxed text-ink-700 sm:text-base",
        "[&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-ink-900 [&_h2]:first:mt-0",
        "[&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink-900",
        "[&_p]:mt-4",
        "[&_ul]:mt-4 [&_ul]:space-y-2.5 [&_ul]:pl-5 [&_li]:list-disc [&_li]:marker:text-primary-400",
        "[&_strong]:font-semibold [&_strong]:text-ink-900",
        "[&_a]:font-medium [&_a]:text-primary-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary-700",
      )}
    >
      {children}
    </div>
  );
}
