import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Video,
  Users,
  Download,
  Compass,
  ArrowRight,
  Newspaper,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { formatDay, readingTime } from "@/lib/utils";

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

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <>
      <PageHero
        kicker="Learning Resources"
        title="Guides, tools, and support for your care journey."
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

      {/* From the blog */}
      {posts.length > 0 && (
        <section className="bg-ink-50 py-20 sm:py-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                align="left"
                kicker="From the Blog"
                title="Latest reads for care professionals"
                description="Practical articles and insights, free to read — no enrolment required."
              />
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-primary-300 hover:text-primary-700"
              >
                View all articles
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <StaggerItem key={p.id}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink-900/5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                        <Newspaper className="size-6" />
                      </span>
                      <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-600">
                        {p.category}
                      </span>
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-xs font-medium text-ink-400">
                      {p.publishedAt && <span>{formatDay(p.publishedAt)}</span>}
                      <span className="size-1 rounded-full bg-ink-300" />
                      <span>{readingTime(p.content)} min read</span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-ink-900">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                      {p.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-all group-hover:gap-2.5">
                      Read article
                      <ArrowRight className="size-4" />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      )}
    </>
  );
}
