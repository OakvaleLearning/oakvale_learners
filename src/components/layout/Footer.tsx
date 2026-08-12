import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
  XIcon,
} from "@/components/ui/BrandIcons";
import { SITE } from "@/content/site";
import { Logo } from "./Logo";
import { WaitlistForm } from "@/components/sections/WaitlistForm";

const programLinks = [
  { label: "Adult & Elderly Care", href: "/programs/adult-care" },
  { label: "Child Care & Early Years", href: "/programs/child-care" },
  { label: "For Employers", href: "/employers" },
  { label: "Blog", href: "/blog" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Log in", href: "/login" },
  { label: "Create account", href: "/signup" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-40" />
      <div className="relative">
        {/* Waitlist / Stay in the loop */}
        <div className="border-b border-white/10">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Stay in the Loop
              </h3>
              <p className="mt-3 max-w-md text-ink-300">
                Join our waiting list and we will keep you updated on upcoming
                cohorts, scholarships, and learning events. Learning spots are
                issued on a cohort basis. We accept applicants on a first served
                basis.
              </p>
            </div>
            <WaitlistForm variant="footer" />
          </div>
        </div>

        {/* Main footer */}
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              Transforming aspiring caregivers into verified healthcare
              professionals through globally aligned, hands-on certification.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: InstagramIcon, href: SITE.socials.instagram, label: "Instagram" },
                { Icon: LinkedinIcon, href: SITE.socials.linkedin, label: "LinkedIn" },
                { Icon: FacebookIcon, href: SITE.socials.facebook, label: "Facebook" },
                { Icon: XIcon, href: SITE.socials.twitter, label: "X" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-lg bg-white/5 text-ink-300 transition-colors hover:bg-accent-500 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Programs" links={programLinks} />
          <FooterCol title="Company" links={companyLinks} />

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 text-accent-400" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 text-accent-400" />
                <span>{SITE.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 text-accent-400" />
                <span>{SITE.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-ink-400 sm:flex-row sm:px-8">
            <p>
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
            <p className="flex gap-4">
              <Link href="/contact" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-white">
                Terms
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-ink-400 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
