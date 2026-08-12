import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
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
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
