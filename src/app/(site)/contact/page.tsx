import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/motion";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Oakvale Learning team about programs, enrolment, partnerships, or support.",
};

const contactDetails = [
  { Icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { Icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone}` },
  { Icon: MapPin, label: "Location", value: SITE.address },
  { Icon: Clock, label: "Hours", value: "Mon – Fri, 9am – 6pm WAT" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        bgImage={{
          src: "/why-oakvale-bg1.png",
          alt: "About us",
        }}
        kicker="Contact Us"
        title="We'd love to hear from you"
        description="Questions about a program, enrolment, or partnering with Oakvale? Send us a message and our team will get back to you."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            {/* Details */}
            <Reveal>
              <div className="flex items-center gap-2 text-accent-500">
                <MessageSquare className="size-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Get in touch
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-bold text-ink-900">
                Reach out any time
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                Whether you&apos;re an aspiring learner, an employer, or a
                partner, we&apos;re here to help you take the next step.
              </p>

              <div className="mt-8 space-y-4">
                {contactDetails.map((d) => {
                  const content = (
                    <div className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-4 transition-colors hover:border-primary-200">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
                        <d.Icon className="size-5" />
                      </span>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                          {d.label}
                        </div>
                        <div className="mt-0.5 font-medium text-ink-900">
                          {d.value}
                        </div>
                      </div>
                    </div>
                  );
                  return d.href ? (
                    <a key={d.label} href={d.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={d.label}>{content}</div>
                  );
                })}
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1}>
              <div className="rounded-4xl border border-ink-100 bg-white p-6 shadow-sm sm:p-10">
                <h2 className="text-xl font-bold text-ink-900">
                  Send us a message
                </h2>
                <p className="mt-1.5 text-sm text-ink-500">
                  We typically respond within one business day.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
