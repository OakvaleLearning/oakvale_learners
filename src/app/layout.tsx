import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

// The main site's fonts: Cormorant Garamond for headings, DM Sans for everything else.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Oakvale Learning — Certified Caregiving Training",
    template: "%s | Oakvale Learning",
  },
  description:
    "Become a verified healthcare professional. Oakvale Learning offers globally aligned Adult Care and Child Care certification tracks with hands-on placement and real career pathways.",
  keywords: [
    "caregiving training",
    "adult care certification",
    "child care certification",
    "healthcare training Nigeria",
    "early years training",
    "care assistant course",
  ],
  openGraph: {
    title: "Oakvale Learning — Certified Caregiving Training",
    description:
      "Globally aligned Adult Care and Child Care certification tracks with hands-on placement and real career pathways.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
