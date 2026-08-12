"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { AlertCircle, Loader2, Save } from "lucide-react";
import type { BlogActionState } from "@/app/admin/blog/actions";
import { BLOG_CATEGORIES } from "@/lib/validation";
import { slugify } from "@/lib/utils";

export interface BlogPostDraft {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string | null;
  published: boolean;
}

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-primary-400";
const labelClass = "block text-sm font-semibold text-ink-800";

export function BlogPostForm({
  action,
  initial,
  submitLabel,
}: {
  action: (
    prev: BlogActionState,
    formData: FormData
  ) => Promise<BlogActionState>;
  initial?: BlogPostDraft;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<
    BlogActionState,
    FormData
  >(action, undefined);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  // Only auto-fill the slug from the title until the user edits it directly.
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="flex items-center gap-2 rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm font-medium text-accent-700">
          <AlertCircle className="size-4 shrink-0" />
          {state.error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Main column */}
        <div className="space-y-5">
          <div>
            <label htmlFor="title" className={labelClass}>
              Title
            </label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              required
              maxLength={160}
              className={`mt-1.5 ${inputClass}`}
              placeholder="The Caregiver's Duty of Care"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className={labelClass}>
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              defaultValue={initial?.excerpt ?? ""}
              required
              rows={2}
              maxLength={300}
              className={`mt-1.5 ${inputClass} resize-y`}
              placeholder="A short summary shown on cards and previews."
            />
          </div>

          <div>
            <label htmlFor="content" className={labelClass}>
              Content
            </label>
            <textarea
              id="content"
              name="content"
              defaultValue={initial?.content ?? ""}
              required
              rows={16}
              className={`mt-1.5 ${inputClass} resize-y font-mono text-[13px] leading-relaxed`}
              placeholder={"Write the article here.\n\nLeave a blank line between paragraphs."}
            />
            <p className="mt-1.5 text-xs text-ink-400">
              Plain text. Separate paragraphs with a blank line.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-ink-100 bg-white p-5 space-y-5">
            <div>
              <label htmlFor="slug" className={labelClass}>
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
                required
                maxLength={80}
                className={`mt-1.5 ${inputClass}`}
                placeholder="caregivers-duty-of-care"
              />
              <p className="mt-1.5 text-xs text-ink-400">/blog/{slug || "…"}</p>
            </div>

            <div>
              <label htmlFor="category" className={labelClass}>
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={initial?.category ?? "Guide"}
                className={`mt-1.5 ${inputClass}`}
              >
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="coverImage" className={labelClass}>
                Cover image URL
              </label>
              <input
                id="coverImage"
                name="coverImage"
                type="url"
                defaultValue={initial?.coverImage ?? ""}
                maxLength={500}
                className={`mt-1.5 ${inputClass}`}
                placeholder="https://…"
              />
              <p className="mt-1.5 text-xs text-ink-400">Optional.</p>
            </div>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="published"
                defaultChecked={initial?.published ?? false}
                className="size-4 rounded border-ink-300 text-primary-600 focus:ring-primary-400"
              />
              <span className="text-sm font-medium text-ink-800">
                Published (visible on the site)
              </span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-700 disabled:opacity-60"
            >
              {pending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {submitLabel}
            </button>
            <Link
              href="/admin/blog"
              className="rounded-full border border-ink-200 px-5 py-3 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
