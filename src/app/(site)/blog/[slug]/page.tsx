import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Newspaper } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { CTABand } from "@/components/sections/CTABand";
import { formatDay, readingTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  return prisma.blogPost.findFirst({
    where: { slug, published: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await prisma.blogPost.findMany({
    where: { published: true, id: { not: post.id } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  const paragraphs = post.content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <article>
        {/* Header */}
        <header className="relative isolate overflow-hidden bg-mesh pt-32 pb-16 text-white sm:pt-40 sm:pb-20">
          <Container className="relative max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              All articles
            </Link>
            <div className="mt-6 flex items-center gap-3 text-sm text-ink-200">
              <span className="rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white">
                {post.category}
              </span>
              {post.publishedAt && <span>{formatDay(post.publishedAt)}</span>}
              <span className="size-1 rounded-full bg-white/40" />
              <span>{readingTime(post.content)} min read</span>
            </div>
            <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-200">
              {post.excerpt}
            </p>
          </Container>
        </header>

        {/* Body */}
        <Container className="max-w-3xl py-16 sm:py-20">
          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt={post.title}
              className="mb-12 aspect-[16/9] w-full rounded-4xl object-cover ring-1 ring-ink-100"
            />
          )}
          <div className="space-y-6">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="whitespace-pre-wrap text-[17px] leading-relaxed text-ink-700"
              >
                {para}
              </p>
            ))}
          </div>
        </Container>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-ink-100 bg-ink-50 py-16 sm:py-20">
          <Container>
            <h2 className="text-2xl font-bold text-ink-900">More articles</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink-900/5"
                >
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-600">
                    <Newspaper className="size-3.5" />
                    {r.category}
                  </span>
                  <h3 className="mt-4 text-lg font-bold leading-snug text-ink-900">
                    {r.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                    {r.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-all group-hover:gap-2.5">
                    Read article
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTABand
        title="Ready to turn knowledge into a career?"
        description="Join a certified Oakvale program and get job-ready with hands-on training and support."
        primaryHref="/programs"
        primaryLabel="Explore programs"
        secondaryHref="/resources"
        secondaryLabel="Browse resources"
      />
    </>
  );
}
