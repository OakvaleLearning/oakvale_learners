import type { Metadata } from "next";
import { ProgramLanding } from "@/components/sections/ProgramLanding";
import { CHILD_CARE } from "@/content/site";

export const metadata: Metadata = {
  title: "Childcare & Early Years Programme",
  description: CHILD_CARE.heroBody,
};

export default function ChildCarePage() {
  return <ProgramLanding program={CHILD_CARE} />;
}
