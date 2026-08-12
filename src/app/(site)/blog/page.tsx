import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { formatDay, readingTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, guides, and stories on caregiving, child development, and building a career in the care sector — from the Oakvale Learning team.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <PageHero
        bgImage={{
          src: "/why-oakvale-bg1.png",
          alt: "Blog",
        }}
        kicker="Oakvale Blog"
        title="Insights and guides for the care sector"
        description="Practical articles on caregiving, child development, safeguarding, and building a career you're proud of."
      />

      <section className="py-20 sm:py-24">
        <Container>
          {posts.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-dashed border-ink-200 bg-white p-12 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary-600">
                <Newspaper className="size-7" />
              </span>
              <h2 className="mt-5 text-lg font-bold text-ink-900">
                No articles yet
              </h2>
              <p className="mt-2 text-sm text-ink-500">
                We&apos;re working on our first posts — check back soon.
              </p>
            </div>
          ) : (
            <>
              <SectionHeading
                kicker="Latest Articles"
                title="From the Oakvale team"
                description="Fresh perspectives and practical know-how for learners and care professionals."
              />
              <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => (
                  <StaggerItem key={p.id}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink-900/5"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden bg-ink-100">
                        {p.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.coverImage}
                            alt={p.title}
                            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="grid h-full place-items-center bg-primary-600 text-white">
                            <Newspaper className="size-10 opacity-80" />
                          </div>
                        )}
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary-700 backdrop-blur">
                          {p.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center gap-2 text-xs font-medium text-ink-400">
                          {p.publishedAt && (
                            <span>{formatDay(p.publishedAt)}</span>
                          )}
                          <span className="size-1 rounded-full bg-ink-300" />
                          <span>{readingTime(p.content)} min read</span>
                        </div>
                        <h3 className="mt-3 text-lg font-bold leading-snug text-ink-900">
                          {p.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                          {p.excerpt}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-all group-hover:gap-2.5">
                          Read article
                          <ArrowRight className="size-4" />
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
