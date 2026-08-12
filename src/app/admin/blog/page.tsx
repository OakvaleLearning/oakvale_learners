import Link from "next/link";
import { Newspaper, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDay } from "@/lib/utils";
import { BlogRowActions } from "@/components/dashboard/BlogRowActions";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  const publishedCount = posts.filter((p) => p.published).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink-900">Blog</h2>
          <p className="mt-1 text-ink-500">
            {posts.length} post{posts.length === 1 ? "" : "s"} ·{" "}
            {publishedCount} published.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
        >
          <Plus className="size-4" />
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink-200 bg-white p-10 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary-600">
            <Newspaper className="size-7" />
          </span>
          <p className="mt-4 text-ink-500">No posts yet.</p>
          <Link
            href="/admin/blog/new"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white"
          >
            <Plus className="size-4" />
            Write your first post
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-ink-100 bg-white">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Updated</th>
                <th className="px-5 py-3 text-right font-semibold">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {posts.map((p) => (
                <tr key={p.id} className="text-ink-700">
                  <td className="px-5 py-3">
                    <div className="font-medium text-ink-900">{p.title}</div>
                    <div className="text-xs text-ink-400">/blog/{p.slug}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-accent-50 px-2.5 py-1 text-xs font-semibold text-accent-600">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {p.published ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                        <span className="size-1.5 rounded-full bg-current" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-2.5 py-1 text-xs font-semibold text-ink-500 ring-1 ring-inset ring-ink-200">
                        <span className="size-1.5 rounded-full bg-current" />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-ink-500">
                    {formatDay(p.updatedAt)}
                  </td>
                  <td className="px-5 py-3">
                    <BlogRowActions
                      id={p.id}
                      published={p.published}
                      title={p.title}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
