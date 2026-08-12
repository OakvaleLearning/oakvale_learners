import { z } from "zod";

export const waitlistSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  track: z.enum(["ADULT_CARE", "CHILD_CARE"]).nullable().optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  subject: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message is too short").max(4000),
});

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  password: z.string().min(8, "Password must be at least 8 characters").max(200),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(200),
  password: z.string().min(1, "Enter your password").max(200),
});

export const enrollSchema = z.object({
  track: z.enum(["ADULT_CARE", "CHILD_CARE"]),
  plan: z.enum(["FULL", "SPLIT"]),
});

export const BLOG_CATEGORIES = [
  "Guide",
  "Video",
  "Toolkit",
  "Community",
  "News",
  "Download",
] as const;

export const blogPostSchema = z.object({
  title: z.string().trim().min(3, "Title is too short").max(160),
  slug: z
    .string()
    .trim()
    .min(3, "Slug is too short")
    .max(80)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and hyphens only"
    ),
  excerpt: z.string().trim().min(10, "Add a short summary").max(300),
  content: z.string().trim().min(20, "Content is too short").max(50000),
  category: z.enum(BLOG_CATEGORIES),
  coverImage: z.string().trim().url("Enter a valid URL").max(500).optional().or(z.literal("")),
  published: z.boolean().optional().default(false),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type EnrollInput = z.infer<typeof enrollSchema>;
