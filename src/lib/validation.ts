import { z } from "zod";

/**
 * WhatsApp / phone number. Deliberately lenient about formatting (spaces,
 * dashes, brackets, leading +) and strict only about digit count, so we accept
 * both local "0810 818 9514" and international "+44 7700 900123" numbers.
 */
export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Please enter your WhatsApp number")
  .max(25)
  .regex(
    /^\+?[\d\s()\-.]{7,24}$/,
    "Enter a valid WhatsApp number, e.g. 0810 818 9514"
  )
  .refine(
    (v) => {
      const digits = v.replace(/\D/g, "").length;
      return digits >= 7 && digits <= 15;
    },
    "Enter a valid WhatsApp number, e.g. 0810 818 9514"
  );

export const waitlistSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: phoneSchema,
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

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(200),
});

export const resetPasswordSchema = z.object({
  token: z.string().trim().min(1, "This reset link is invalid.").max(500),
  password: z.string().min(8, "Password must be at least 8 characters").max(200),
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
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
