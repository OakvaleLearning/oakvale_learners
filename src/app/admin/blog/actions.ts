"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { blogPostSchema } from "@/lib/validation";

export type BlogActionState = { error?: string } | undefined;

function parseForm(formData: FormData) {
  return blogPostSchema.safeParse({
    title: formData.get("title") ?? "",
    slug: formData.get("slug") ?? "",
    excerpt: formData.get("excerpt") ?? "",
    content: formData.get("content") ?? "",
    category: formData.get("category") ?? "Guide",
    coverImage: formData.get("coverImage") ?? "",
    published: formData.get("published") === "on",
  });
}

export async function createBlogPost(
  _prev: BlogActionState,
  formData: FormData
): Promise<BlogActionState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const { published, coverImage, ...rest } = parsed.data;

  try {
    await prisma.blogPost.create({
      data: {
        ...rest,
        coverImage: coverImage || null,
        published,
        publishedAt: published ? new Date() : null,
      },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return { error: "A post with that slug already exists." };
    }
    return { error: "Could not create the post. Please try again." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(
  id: string,
  _prev: BlogActionState,
  formData: FormData
): Promise<BlogActionState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const { published, coverImage, ...rest } = parsed.data;

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return { error: "Post not found." };

  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        ...rest,
        coverImage: coverImage || null,
        published,
        // Set publishedAt the first time it goes live; keep it once set.
        publishedAt: published ? existing.publishedAt ?? new Date() : null,
      },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return { error: "A post with that slug already exists." };
    }
    return { error: "Could not update the post. Please try again." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath(`/blog/${rest.slug}`);
  redirect("/admin/blog");
}

export async function togglePublish(id: string) {
  await requireAdmin();
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return { error: "Post not found" };

  const nextPublished = !post.published;
  await prisma.blogPost.update({
    where: { id },
    data: {
      published: nextPublished,
      publishedAt: nextPublished ? post.publishedAt ?? new Date() : null,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  return { ok: true };
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return { error: "Post not found" };

  await prisma.blogPost.delete({ where: { id } });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  return { ok: true };
}
