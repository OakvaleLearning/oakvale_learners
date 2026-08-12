import type { Metadata } from "next";
import Link from "next/link";
// import Image from "next/image";
import {
  Globe2,
  FlaskConical,
  MonitorSmartphone,
  Compass,
  Users,
  Wrench,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { TeamAvatar } from "@/components/ui/TeamAvatar";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Oakvale Learning is investing in healthcare talent where the world needs it most — creating scalable, career-focused learning to unlock 100,000 healthcare jobs across Africa, Asia, and the Global South.",
};

const pillars = [
  {
    Icon: Globe2,
    title: "Globally Relevant, Locally Recognized",
    body: "We create courses that balance global standards with local needs. Our programs follow international healthcare guidelines while adapting to regional challenges and cultures. Whether aiming for local roles or global careers, learners gain credentials that boost employability and open doors worldwide. We believe talent shouldn't be limited by geography — our mission is to make world-class healthcare education accessible to all.",
  },
  {
    Icon: FlaskConical,
    title: "Built with Experts, Backed by Evidence",
    body: "Each Oakvale course is built by top healthcare educators, clinicians, and instructional designers to ensure academic rigor and real-world relevance. Grounded in the latest research and adult learning best practices, our programs equip learners with the skills and confidence needed for caregiving and allied health roles. At Oakvale, learners don't just study — they're prepared to make an impact.",
  },
  {
    Icon: MonitorSmartphone,
    title: "Learn Anywhere, Impact Everywhere",
    body: "We believe education should meet learners where they are. Our digitally accessible courses work across devices and locations — from busy cities to remote communities. With flexible, self-paced learning and consistently high quality, we bring vital healthcare skills to those who need them most, empowering individuals, boosting employability, and improving care worldwide.",
  },
];

const team = [
  {
    name: "Funke Onamusi",
    role: "CEO & Founder",
    image: "/media/team/funke-onamusi.jpg",
  },
  {
    name: "Sitasri De",
    role: "Head of Operations",
    image: "/media/team/sitasri-de.jpg",
  },
  {
    name: "Godwin Ekpo",
    role: "Head of Product",
    image: "/media/team/godwin-ekpo.jpg",
  },
  {
    name: "Daniel Abayomi",
    role: "Marketing Lead",
    image: "/media/team/daniel-abayomi.jpg",
  },
  {
    name: "Prince Davis",
    role: "Graphics Designer",
    image: "/media/team/prince-davis.jpg",
  },
  {
    name: "Victor Paul",
    role: "Learning Community Manager",
    image: "/media/team/victor-paul.jpg",
  },
];

const values = [
  {
    Icon: Compass,
    title: "Purpose-Driven",
    body: "We lead with intention. Every lesson and decision is grounded in equity, dignity, and impact. Our goal is to create meaningful change, one learner and one step at a time.",
  },
  {
    Icon: Users,
    title: "Culturally Attuned",
    body: "We build learning experiences around the realities of underrepresented healthcare workers, equipping them with clinical skills, cultural fluency, and the confidence to succeed.",
  },
  {
    Icon: Wrench,
    title: "Practical & Grounded",
    body: "We focus on real-world skills that open real-world doors, built in collaboration with experts and frontline professionals who know what it takes to thrive in today's care settings.",
  },
  {
    Icon: TrendingUp,
    title: "Growth that Multiplies",
    body: "We don't just train individuals. We empower changemakers. Our graduates uplift families, strengthen communities, and help transform health systems from the ground up.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Oakvale Learning"
        title="Investing in Healthcare Talent Where the World Needs It Most"
        description="Creating scalable, career-focused learning solutions to unlock 100,000 healthcare jobs across Africa, Asia, and the Global South."
        image={{
          src: "/about-hero.jpg",
          alt: "A confident healthcare assistant caring for a patient",
        }}
      />

      {/* Vision */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <SectionHeading
                align="left"
                kicker="Our Vision"
                title="Shaping the Future of Healthcare"
                description="We are creating healthcare career opportunities for 100,000 people from Africa and Asia over the next decade."
              />
              <div className="mt-6">
                <ButtonLink href="/programs" variant="primary" size="lg">
                  View Program
                  <ArrowRight className="size-5" />
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5 rounded-4xl border border-ink-100 bg-ink-50 p-8 sm:p-10">
                <p className="text-[15px] leading-relaxed text-ink-700 sm:text-base">
                  Oakvale Learning exists to bridge the global healthcare talent
                  gap by empowering aspiring healthcare assistants and allied
                  health professionals from Africa and Asia.
                </p>
                <p className="text-[15px] leading-relaxed text-ink-700 sm:text-base">
                  We create accessible, high-quality, and culturally aware
                  learning pathways to help learners not only succeed but thrive
                  in global healthcare systems.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How we build world-class learning */}
      <section className="bg-ink-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            kicker="Our Approach"
            title="How We Build World-Class Learning"
          />
          <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {pillars.map((p) => (
              <StaggerItem key={p.title} className="h-full">
                <div className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-ink-900/5">
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                    <p.Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-ink-900">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">
                    {p.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Team */}
      {/* <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            kicker="Our People"
            title="Meet Our Team of Professionals"
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <StaggerItem key={member.name} className="h-full">
                <div className="flex h-full items-center gap-5 rounded-3xl border border-ink-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-ink-900/5">
                  <TeamAvatar
                    name={member.name}
                    image={member.image}
                    accent={i % 2 !== 0}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-ink-900">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-500">{member.role}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section> */}

      {/* Values */}
      <section className="bg-ink-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            kicker="What We Stand For"
            title="Our Values"
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <StaggerItem key={v.title} className="h-full">
                <div className="group h-full rounded-3xl border border-ink-100 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink-900/5">
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                    <v.Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink-900">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {v.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Come work with us */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="rounded-4xl bg-primary-700 px-6 py-14 text-center sm:px-16 sm:py-20">
              <div className="mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Come Work With Us
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
                  If you're passionate about healthcare and education, we want
                  you in the room.
                </p>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <ButtonLink href="/contact" variant="white" size="lg">
                    Join Our SME Network
                    <ArrowRight className="size-5" />
                  </ButtonLink>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-8 py-4 text-base font-medium text-white ring-1 ring-white/25 transition-colors hover:bg-primary-500"
                  >
                    Explore Open Roles
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
