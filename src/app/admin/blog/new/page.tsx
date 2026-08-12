import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { BlogPostForm } from "@/components/dashboard/BlogPostForm";
import { createBlogPost } from "../actions";

export default async function NewBlogPostPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-primary-600"
        >
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>
        <h2 className="mt-3 text-2xl font-bold text-ink-900">New post</h2>
      </div>

      <BlogPostForm action={createBlogPost} submitLabel="Create post" />
    </div>
  );
}
