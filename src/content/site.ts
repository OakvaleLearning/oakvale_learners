/**
 * Central content + program data for Oakvale Learning.
 * Prices are in Naira (whole units). Kobo (x100) is derived where Paystack needs it.
 */

export const SITE = {
  name: "Oakvale Learning",
  tagline: "Certified Caregiving Training",
  email: "hello@oakvaleltd.com",
  phone: "+234 810 818 9514",
  address: "Lagos, Nigeria",
  cohort: "Cohort 2",
  // Cohort Day 1 — LMS access unlocks once both instalments clear before this date.
  cohortStartDate: "2026-10-06",
  // Deadline for the 2nd (final) instalment on SPLIT plans.
  balanceDueDate: "2026-09-29",
  // Free community / LMS platform learners get on full payment.
  communityUrl: "https://community.oakvaleltd.com",
  // The Oakvale LMS app — handles enrolment, payment and self-paced learning.
  // Until NEXT_PUBLIC_LMS_URL is set, enrol CTAs fall back to the contact page.
  lmsUrl: process.env.NEXT_PUBLIC_LMS_URL || "/contact",
  socials: {
    instagram: "#",
    linkedin: "#",
    facebook: "#",
    twitter: "#",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Adult & Elderly Care", href: "/programs/adult-care" },
      { label: "Child Care & Early Years", href: "/programs/child-care" },
    ],
  },
  { label: "Employers", href: "/employers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export type TrackSlug = "adult-care" | "child-care";

/**
 * Legacy cohort checkout (Pay in Full / Instalments). No longer linked from the
 * marketing pages — new enrolments go to the LMS app (SITE.lmsUrl). Kept so
 * existing learners can still clear balances from their dashboard until they
 * are migrated.
 */
export interface PricingCard {
  header: string;
  price: number; // Naira
  description: string;
  bullet: string;
  cta: string;
  featured?: boolean;
  plan: "FULL" | "SPLIT";
}

export type TierId = "foundation" | "professional" | "full";

export interface ProgramTier {
  id: TierId;
  name: string;
  price: number; // Naira
  note?: string;
  taglineLabel: string;
  tagline: string;
  learn: { title?: string; body: string }[];
  roles: string;
  deliverablesTitle: string;
  deliverables: string[];
  exclusions?: string[];
  cta: string;
  featured?: boolean;
}

export interface ProgramPhase {
  title: string;
  body: string;
}

export interface Program {
  slug: TrackSlug;
  track: "ADULT_CARE" | "CHILD_CARE";
  kicker: string;
  name: string;
  shortName: string;
  homeHeadline: string;
  homeBody: string;
  homeCta: string;
  heroHeadline: string;
  heroHeadlineAccent: string;
  heroBody: string;
  experienceBody: string;
  phases: ProgramPhase[];
  tiers: ProgramTier[];
  /** Legacy cohort details — still shown on the checkout and learner dashboard. */
  details: { label: string; value: string }[];
  pricing: PricingCard[];
  accent: "primary" | "accent";
  heroImage?: { src: string; alt: string };
}

/** Where a tier's CTA sends the learner: the LMS app handles payment and learning. */
export function tierHref(program: Program, tier: TierId): string {
  if (!SITE.lmsUrl.startsWith("http")) return SITE.lmsUrl;
  const url = new URL(SITE.lmsUrl);
  url.searchParams.set("track", program.slug);
  url.searchParams.set("tier", tier);
  return url.toString();
}

const COMMUNITY_DELIVERABLE = "Access to the Oakvale Student WhatsApp Community.";
const FULL_PROGRESSION = [
  "Instant access to all Foundation and Professional modules combined.",
  "Seamless, uninterrupted progression through all learning stages and assessments.",
];
const UPGRADE_PREREQ = "You must complete the Foundation tier before starting this phase.";

export const ADULT_CARE: Program = {
  slug: "adult-care",
  track: "ADULT_CARE",
  kicker: "Certified Adult Care Training",
  heroImage: {
    src: "/adult-care-hero.jpg",
    alt: "A caregiver supporting an elderly patient with warmth and dignity",
  },
  name: "Adult & Elderly Care",
  shortName: "Adult Care",
  homeHeadline: "Adult & Elderly Care",
  homeBody:
    "Turn empathy into a recognised profession. Learn how to deliver safe, dignified, and clinical care for aging adults and recovering patients.",
  homeCta: "Explore Adult Care",
  heroHeadline: "Become a Certified Adult Care Professional.",
  heroHeadlineAccent: "On your terms.",
  heroBody:
    "Get the practical skills, the clinical knowledge, and the professional certification you need to step into the healthcare sector with confidence. Oakvale trains you entirely at your own pace, so you can start learning the moment you are ready.",
  experienceBody:
    "You enrol and download the Oakvale app. You watch highly practical, pre-recorded masterclasses taught by healthcare experts. You take your assessments when you are ready. When you finish, you walk away with the competence to handle real-world caregiving, backed by a UK CPD Certificate and direct access to our Jobs Board.",
  phases: [
    {
      title: "Phase 1: The Foundation",
      body: "We start with the absolute basics. You will learn the core principles of duty of care, ethical communication, and how to protect a patient's dignity. This is where you build your confidence and learn what it actually means to be a professional caregiver.",
    },
    {
      title: "Phase 2: Professional Mastery",
      body: "Once you have the basics, we move to clinical realities. You will master infection prevention, complex daily routines, safe lifting, and the exact standards required by premium clinics, private clients, and top-tier care agencies. Finally, we train you on how to turn these skills into a profitable career.",
    },
  ],
  tiers: [
    {
      id: "foundation",
      name: "Foundation",
      price: 35000,
      taglineLabel: "The entry point",
      tagline:
        "Step confidently into the care sector. Master the essential skills to expertly care for loved ones or secure your first professional role.",
      learn: [
        {
          title: "Fundamental Principles & Standards",
          body: "Explore the professional and ethical principles that define excellent care. Master empathy-driven communication, recordkeeping, data protection, and the critical importance of privacy and dignity.",
        },
        {
          title: "Best Practices in Care Delivery",
          body: "Learn how to properly protect vulnerable adults, master infection control, and provide vital mental support for the elderly.",
        },
      ],
      roles:
        "Basic, entry-level caregiving roles requiring minimal technical intervention.",
      deliverablesTitle: "What you get",
      deliverables: [
        "Self-paced access to comprehensive foundation modules.",
        "Exclusive masterclasses led by healthcare professionals.",
        "Oakvale Learning Certificate of Completion (Foundation level).",
        "An employer-facing letter of recommendation validating your core training hours.",
        "Direct onboarding to the Oakvale Jobs Board for entry-level roles.",
        COMMUNITY_DELIVERABLE,
      ],
      exclusions: [
        "This tier is limited to basic care and does not qualify you for highly technical clinical care.",
        "It restricts access to higher-paying senior roles.",
        "It provides no business setup training.",
        "The UK CPD Certificate is reserved for the full pathway.",
      ],
      cta: "Start Foundation",
    },
    {
      id: "professional",
      name: "Professional",
      price: 70000,
      note: "Prerequisite: Foundation Stage",
      taglineLabel: "The mastery step",
      tagline:
        "You have the basics. Now elevate your expertise. Master advanced practical skills, increase your earning potential, and step into senior roles or entrepreneurship.",
      learn: [
        {
          title: "Core Skills & Competencies",
          body: "Master the practical, daily routines of adult caregiving. Fully prepare for the physical and clinical demands of the job, including safe lifting and mobility support.",
        },
        {
          title: "Employability & Micro-Entrepreneurship in Care",
          body: "Turn your training into a recognised, highly profitable career, complete with interview preparation and business structuring.",
        },
      ],
      roles:
        "Advanced, highly technical caregiving roles, senior placements, and the framework to launch an independent care business.",
      deliverablesTitle: "What you get",
      deliverables: [
        "Self-paced access to advanced professional modules and real-world assessments.",
        "Premium onboarding to the Oakvale Jobs Board to unlock higher-paying roles.",
        "Career accelerator training (expert CV optimisation and interview coaching).",
        "The Business Toolkit: Step-by-step training on how to launch your own caregiving agency.",
        "UK CPD Certificate (awarded upon successful completion of this final stage).",
        COMMUNITY_DELIVERABLE,
      ],
      exclusions: [UPGRADE_PREREQ],
      cta: "Start Professional",
    },
    {
      id: "full",
      name: "Full Programme",
      price: 100000,
      note: "Save ₦5,000",
      taglineLabel: "The ultimate pathway",
      tagline:
        "No interruptions. No upgrade friction. Get instant access to the entire pathway from absolute beginner to a fully equipped care professional.",
      learn: [
        {
          body: "The complete syllabus. Combines all foundational ethics with advanced clinical competencies and business structuring.",
        },
      ],
      roles:
        "Immediate, unrestricted pathway to premium technical roles, global standard compliance, and micro-entrepreneurship.",
      deliverablesTitle: "Everything you get",
      deliverables: [
        ...FULL_PROGRESSION,
        "The complete suite of practical training, career prep, and agency setup resources.",
        "Oakvale Learning Certificate of Completion.",
        "UK CPD Certificate (awarded upon successful completion).",
        COMMUNITY_DELIVERABLE,
      ],
      cta: "Enrol in Full Programme",
      featured: true,
    },
  ],
  details: [
    { label: "Format", value: "Hybrid (Online + Weekly Recaps)" },
    { label: "Duration", value: "10 Weeks" },
    { label: "Credential", value: "Certificate in Adult & Elderly Care" },
  ],
  pricing: [
    {
      header: "Pay in Full",
      price: 100000,
      description:
        "Make a single, one-time payment to instantly guarantee your spot. Skip the stress of tracking installments and focus entirely on your upcoming training.",
      bullet: "Instant seat confirmation.",
      cta: "Pay in Full",
      featured: true,
      plan: "FULL",
    },
    {
      header: "Pay in Installments",
      price: 50000,
      description:
        "Lock your seat right now with a 50% deposit. You will have the flexibility to clear your remaining balance anytime before the first day of class.",
      bullet: "Balance due before Day 1.",
      cta: "Pay First Installment",
      plan: "SPLIT",
    },
  ],
  accent: "primary",
};

export const CHILD_CARE: Program = {
  slug: "child-care",
  track: "CHILD_CARE",
  kicker: "Certified Early Years Training",
  heroImage: {
    src: "/chilcare-hero.jpg",
    alt: "An early years caregiver nurturing a happy young child",
  },
  name: "Childcare & Early Years",
  shortName: "Childcare",
  homeHeadline: "Childcare & Early Years",
  homeBody:
    "From birth to five years. Master the developmental milestones and safety standards required to secure premium nursery roles, work for families, care for your own kids, or build your own childcare service.",
  homeCta: "Explore Childcare",
  heroHeadline: "Become a Certified Early Years Professional.",
  heroHeadlineAccent: "On your terms.",
  heroBody:
    "Get the practical skills, the developmental knowledge, and the professional certification you need to care for children safely and confidently. Oakvale trains you entirely at your own pace, so you can start learning the moment you are ready.",
  experienceBody:
    "You enrol and download the Oakvale app. You watch highly practical, pre-recorded masterclasses taught by childcare experts. You take your assessments when you are ready. When you finish, you walk away with the competence to handle real-world childcare, backed by a UK CPD Certificate and direct access to our Jobs Board.",
  phases: [
    {
      title: "Phase 1: Infant & Toddler Foundation (0–2 Years)",
      body: "Become the kind of childcare professional families trust. We start with role boundaries and global frameworks, then move deeply into the brain growth, developmental milestones, and daily routines for infants and toddlers.",
    },
    {
      title: "Phase 2: Preschool Mastery (3–5 Years)",
      body: "Once you have the basics, we build confidence in supporting preschoolers. You will master school readiness, spotting developmental red flags, fire and food safety, strict safeguarding protocols, and how to structure your own childcare business.",
    },
  ],
  tiers: [
    {
      id: "foundation",
      name: "Foundation",
      price: 30000,
      taglineLabel: "The entry point",
      tagline:
        "Build a rock-solid foundation in infant and toddler care. Perfect for starting your career journey or mastering the basics for your own family.",
      learn: [
        {
          title: "Professional Identity, Values & Responsibilities",
          body: "Be clear on your role, your boundaries, your duty of care, and the global frameworks that protect children and your career.",
        },
        {
          title: "Foundations of Early Childhood Development (0 to 2 Years)",
          body: "Learn how babies and toddlers grow so your care becomes intentional. Master brain growth, infant/toddler developmental milestones, and daily care routines for the first 24 months.",
        },
      ],
      roles:
        "Basic childcare roles and early-growth nanny positions specifically limited to infants and toddlers (0–2 years).",
      deliverablesTitle: "What you get",
      deliverables: [
        "Self-paced access to comprehensive early years foundation modules.",
        "Exclusive masterclasses led by childcare professionals.",
        "Oakvale Learning Certificate of Completion (Foundation level).",
        "An employer-facing letter of recommendation validating your core training hours.",
        "Direct onboarding to the Oakvale Jobs Board for entry-level childcare roles.",
        COMMUNITY_DELIVERABLE,
      ],
      exclusions: [
        "This tier does not cover preschool development (3–5 years).",
        "It does not qualify you for advanced nursery roles or school readiness programmes.",
        "It provides no independent business setup training.",
        "The UK CPD Certificate is reserved for the full pathway.",
      ],
      cta: "Start Foundation",
    },
    {
      id: "professional",
      name: "Professional",
      price: 55000,
      note: "Prerequisite: Foundation Stage",
      taglineLabel: "The mastery step",
      tagline:
        "You have the basics. Now unlock advanced opportunities. Master the complete birth-to-five spectrum and position yourself for premium childcare roles.",
      learn: [
        {
          title: "Development, Safety & Child Protection (3 to 5 Years)",
          body: "Build confidence supporting preschoolers. Master school readiness, spotting developmental delays early, fire safety, food hygiene, and strict safeguarding against harm and neglect.",
        },
        {
          title: "Career Pathways & Professional Growth",
          body: "Finish with a clear plan for interviews, an extended capstone project, and pathways for employment or launching your own home-based micro childcare service.",
        },
      ],
      roles:
        "Advanced nursery roles, premium placements across the full 0–5 spectrum, and the framework to launch an independent home-based childcare service.",
      deliverablesTitle: "What you get",
      deliverables: [
        "Self-paced access to advanced professional modules and the final childcare capstone.",
        "Premium onboarding to the Oakvale Jobs Board to unlock higher-paying professional childcare roles.",
        "Career accelerator training (expert CV optimisation and interview coaching).",
        "The Business Toolkit: Step-by-step training on how to launch your own home-based micro childcare service.",
        "UK CPD Certificate (awarded upon successful completion of this final stage).",
        COMMUNITY_DELIVERABLE,
      ],
      exclusions: [UPGRADE_PREREQ],
      cta: "Start Professional",
    },
    {
      id: "full",
      name: "Full Programme",
      price: 80000,
      note: "Save ₦5,000",
      taglineLabel: "The ultimate pathway",
      tagline:
        "The complete birth-to-five mastery pathway. Go from beginner to a fully equipped, confident early years professional without any upgrade friction.",
      learn: [
        {
          body: "The complete birth-to-five mastery syllabus, merging infant care basics with preschool safeguarding, capstone projects, and business planning.",
        },
      ],
      roles:
        "The complete suite of opportunities across all early years age groups and micro-entrepreneurship.",
      deliverablesTitle: "Everything you get",
      deliverables: [
        ...FULL_PROGRESSION,
        "The complete suite of practical training, capstone projects, career prep, and agency setup resources.",
        "Oakvale Learning Certificate of Completion.",
        "UK CPD Certificate (awarded upon successful completion).",
        COMMUNITY_DELIVERABLE,
      ],
      cta: "Enrol in Full Programme",
      featured: true,
    },
  ],
  details: [
    { label: "Format", value: "Hybrid (Online + Community)" },
    { label: "Duration", value: "15 Weeks (55 hours of active learning)" },
    { label: "Credential", value: "Certificate in Early Years Childcare 0 to 5 Years" },
    { label: "Alignment", value: "EYFS (UK), CDA (USA), ECE (Canada), UNCRC" },
  ],
  pricing: [
    {
      header: "Pay in Full",
      price: 80000,
      description:
        "Make a single, one-time payment to instantly guarantee your spot. Skip the stress of tracking installments and focus entirely on your upcoming training.",
      bullet: "Instant seat confirmation.",
      cta: "Pay in Full",
      featured: true,
      plan: "FULL",
    },
    {
      header: "Pay in Installments",
      price: 40000,
      description:
        "Lock your seat right now with a 50% deposit. You will have the flexibility to clear your remaining balance anytime before the first day of class.",
      bullet: "Balance due before Day 1.",
      cta: "Pay First Installment",
      plan: "SPLIT",
    },
  ],
  accent: "accent",
};

export const PROGRAMS: Record<TrackSlug, Program> = {
  "adult-care": ADULT_CARE,
  "child-care": CHILD_CARE,
};

export function getProgramByTrack(track: "ADULT_CARE" | "CHILD_CARE"): Program {
  return track === "ADULT_CARE" ? ADULT_CARE : CHILD_CARE;
}

export const WHY_OAKVALE = [
  {
    title: "Classes That Fit Your Life",
    body: "Learn on the Oakvale app at your own pace. Watch practical masterclasses and complete your modules whenever you have the time.",
  },
  {
    title: "Supportive Community",
    body: "Self-paced does not mean learning alone. Every learner joins the Oakvale Student WhatsApp Community to share progress and ask our coordinators questions.",
  },
  {
    title: "Career Ready From Day One",
    body: "Every module builds toward practical competence, so your certificate reflects skills you can use immediately.",
  },
];

export interface CareerPath {
  slug: string;
  kicker: string;
  title: string;
  body: string;
  points: string[];
  image: string;
  cta: { label: string; href: string };
  accent: "primary" | "accent";
}

export const CAREER_PATHS: CareerPath[] = [
  {
    slug: "careers-at-home",
    kicker: "Careers at Home",
    title: "Build a stable caregiving career close to home",
    body: "Step into high-demand roles in your own community — from private home care to clinics, crèches, and family support. Our certification gives local employers the confidence to hire you, and gives you the skills to deliver care with pride.",
    points: [
      "Job-ready certification recognised by local employers",
      "Placement support via the Oakvale Jobs Board",
      "Guidance to launch your own micro care service",
    ],
    image: "/careers-at-home.jpg",
    cta: { label: "Explore local pathways", href: "/programs/adult-care" },
    accent: "primary",
  },
  {
    slug: "careers-abroad",
    kicker: "Careers Abroad",
    title: "Take your skills to the global care economy",
    body: "The world needs caregivers, and our curriculum is aligned to international frameworks. We prepare you for relocation pathways with CV support, interview coaching, and globally recognised competencies that travel with you.",
    points: [
      "Globally aligned curriculum (EYFS, CDA, ECE, UNCRC)",
      "CV, interview, and relocation-readiness support",
      "Access to international care opportunities",
    ],
    image: "/careers_abroad.jpg",
    cta: { label: "See global opportunities", href: "/programs" },
    accent: "accent",
  },
  {
    slug: "career-reset",
    kicker: "Career Reset",
    title: "Switch into a career that actually holds a future",
    body: "Changing direction is not starting over. With self-paced learning that fits around your life, you can move from an uncertain job into a stable, in-demand clinical career — no prior healthcare experience required.",
    points: [
      "Beginner-friendly, no prior experience needed",
      "Self-paced learning built around busy schedules",
      "A clear path from where you are to where you want to be",
    ],
    image: "/career_reset.jpg",
    cta: { label: "Start your reset", href: "/programs" },
    accent: "primary",
  },
  {
    slug: "healthcare-providers",
    kicker: "For Healthcare Providers",
    title: "Train and upskill your frontline care teams",
    body: "Partner with Oakvale to certify your staff and raise the standard of care across your organisation. We deliver structured, competency-based training that turns your frontline workers into verified, confident professionals.",
    points: [
      "Structured, competency-based staff training",
      "Consistent, verifiable care standards across your team",
      "Flexible cohorts that fit around shifts and rosters",
    ],
    image: "/healthcare_providers.png",
    cta: { label: "Partner with us", href: "/employers" },
    accent: "accent",
  },
];

export interface DemandStat {
  region: string;
  value: number;
  suffix: string;
  body: string;
}

export const GLOBAL_DEMAND = {
  kicker: "Across the Globe",
  title: "Health systems need skilled talent",
  description:
    "The world is facing a caregiving shortage of historic scale — and trained, certified professionals are the answer.",
  stats: [
    {
      region: "Africa",
      value: 6_000_000,
      suffix: "+",
      body: "Over 6 million more health workers are needed in Africa by 2030, but most people can't access affordable, quality training.",
    },
    {
      region: "Asia",
      value: 7_000_000,
      suffix: "+",
      body: "Asia's care sector faces a huge skills gap, with over 7 million roles remaining unfilled in countries like India and Indonesia.",
    },
    {
      region: "UK & Canada",
      value: 10_000_000,
      suffix: "+",
      body: "To meet demand, developed nations like the UK and Canada are importing caregivers to fill 10 million roles by 2035.",
    },
    {
      region: "Worldwide",
      value: 15_000_000,
      suffix: "+",
      body: "Worldwide, the WHO predicts a shortage of 15 million trained care workers in just a few years, especially in underserved regions.",
    },
  ] satisfies DemandStat[],
};
