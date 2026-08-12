import type { Metadata } from "next";
import { ProgramLanding } from "@/components/sections/ProgramLanding";
import { ADULT_CARE } from "@/content/site";

export const metadata: Metadata = {
  title: "Adult & Elderly Care Programme",
  description: ADULT_CARE.heroBody,
};

export default function AdultCarePage() {
  return <ProgramLanding program={ADULT_CARE} />;
}
