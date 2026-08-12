import type { Metadata } from "next";
import {
  BookOpen,
  FileText,
  Video,
  Users,
  Download,
  Compass,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaitlistForm } from "@/components/sections/WaitlistForm";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides, clinical resources, interactive scenarios, and learning support from Oakvale Learning.",
};

const resources = [
  {
    Icon: FileText,
    tag: "Guide",
    title: "The Caregiver's Duty of Care",
    body: "Understand the professional and ethical foundations of quality care work.",
  },
  {
    Icon: Video,
    tag: "Video",
    title: "Safe Lifting & Mobility Support",
    body: "Watch practical demonstrations of core physical caregiving techniques.",
  },
  {
    Icon: BookOpen,
    tag: "Guide",
    title: "Early Years Milestones 0–5",
    body: "A reference on child development milestones from birth to five years.",
  },
  {
    Icon: Compass,
    tag: "Toolkit",
    title: "Starting a Home-Based Care Service",
    body: "A step-by-step toolkit for launching your own micro care enterprise.",
  },
  {
    Icon: Users,
    tag: "Community",
    title: "Interview & CV Preparation",
    body: "Templates and tips to land your first role in the care sector.",
  },
  {
    Icon: Download,
    tag: "Download",
    title: "Safeguarding Quick Reference",
    body: "A downloadable checklist for protecting vulnerable adults and children.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        kicker="Learning Resources"
        title="Guides, tools, and support for your care journey"
        description="Explore downloadable guides, clinical resources, and interactive scenarios. Full libraries unlock when you enrol — join the waitlist to be notified as new resources drop."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            kicker="Featured Resources"
            title="A taste of what's inside Oakvale"
            description="Every enrolled learner gets full access to our resource library, clinical scenarios, and downloadable guides."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <StaggerItem key={r.title}>
                <div className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink-900/5">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                      <r.Icon className="size-6" />
                    </span>
                    <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-600">
                      {r.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink-900">
                    {r.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                    {r.body}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-all group-hover:gap-2.5">
                    Unlock with enrolment
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
