"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Pencil, Trash2 } from "lucide-react";
import { togglePublish, deleteBlogPost } from "@/app/admin/blog/actions";

export function BlogRowActions({
  id,
  published,
  title,
}: {
  id: string;
  published: boolean;
  title: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await togglePublish(id);
          })
        }
        className="inline-flex items-center gap-1 rounded-lg bg-ink-50 px-2.5 py-1.5 text-xs font-semibold text-ink-600 transition-colors hover:bg-primary-50 hover:text-primary-700 disabled:opacity-60"
        title={published ? "Unpublish" : "Publish"}
      >
        {pending ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : published ? (
          <EyeOff className="size-3.5" />
        ) : (
          <Eye className="size-3.5" />
        )}
        {published ? "Unpublish" : "Publish"}
      </button>

      <Link
        href={`/admin/blog/${id}/edit`}
        className="inline-flex items-center gap-1 rounded-lg bg-ink-50 px-2.5 py-1.5 text-xs font-semibold text-ink-600 transition-colors hover:bg-ink-100"
        title="Edit"
      >
        <Pencil className="size-3.5" />
        Edit
      </Link>

      <button
        disabled={pending}
        onClick={() => {
          if (
            !confirm(`Delete "${title}"? This cannot be undone.`)
          )
            return;
          startTransition(async () => {
            await deleteBlogPost(id);
          });
        }}
        className="inline-flex items-center gap-1 rounded-lg bg-ink-50 px-2.5 py-1.5 text-xs font-semibold text-ink-600 transition-colors hover:bg-accent-50 hover:text-accent-700 disabled:opacity-60"
        title="Delete"
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  );
}
