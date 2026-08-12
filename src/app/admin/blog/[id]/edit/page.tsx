import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "@/components/dashboard/BlogPostForm";
import { updateBlogPost } from "../../actions";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const action = updateBlogPost.bind(null, post.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-primary-600"
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>
          <h2 className="mt-3 text-2xl font-bold text-ink-900">Edit post</h2>
        </div>
        {post.published && (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View live
            <ExternalLink className="size-3.5" />
          </Link>
        )}
      </div>

      <BlogPostForm
        action={action}
        submitLabel="Save changes"
        initial={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          coverImage: post.coverImage,
          published: post.published,
        }}
      />
    </div>
  );
}
