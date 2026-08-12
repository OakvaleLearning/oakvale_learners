/**
 * Central content + program data for Oakvale Learning.
 * Prices are in Naira (whole units). Kobo (x100) is derived where Paystack needs it.
 */

export const SITE = {
  name: "Oakvale Learning",
  tagline: "Certified Caregiving Training",
  email: "hello@oakvalelearning.com",
  phone: "+234 800 000 0000",
  address: "Lagos, Nigeria",
  cohort: "Cohort 2",
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

export interface ProgramModule {
  title: string;
  description: string;
  bullets?: string[];
}

export interface PricingCard {
  header: string;
  price: number; // Naira
  description: string;
  bullet: string;
  cta: string;
  featured?: boolean;
  plan: "FULL" | "SPLIT";
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
  heroBody: string;
  badges: string[];
  secondaryBody: string;
  benefitsIntro: string;
  whoIsThisFor: string[];
  whatYouWillGain: string[];
  howYouWillLearn: string[];
  outlineIntro: string;
  modules: ProgramModule[];
  details: { label: string; value: string }[];
  pricing: PricingCard[];
  accent: "primary" | "accent";
  heroImage?: { src: string; alt: string };
}

export const ADULT_CARE: Program = {
  slug: "adult-care",
  track: "ADULT_CARE",
  kicker: "Certified Adult Care Training",
  heroImage: {
    src: "/adult-care-hero.jpg",
    alt: "A caregiver supporting an elderly patient with warmth and dignity",
  },
  name: "Professional Adult & Elderly Care Programme",
  shortName: "Adult Care",
  homeHeadline: "Step Into Your Future with Our Adult Care Program",
  homeBody:
    "Whether you are starting out, switching to a stable career, or ready for the next step, Oakvale's Adult Care program equips you with globally relevant clinical skills, hands on experience, and the confidence to succeed anywhere. Our immersive 10 week hybrid curriculum covers core principles, ethical communication, and best practices in adult care delivery, bridging the gap between where you are and where the healthcare world needs you. Join the next generation of verified professionals shaping the future of adult and elderly care.",
  homeCta: "Explore Adult Care",
  heroHeadline: "Professional Adult & Elderly Care Programme",
  heroBody:
    "A 10 week, globally aligned course that trains you to deliver safe, dignified, and clinical care for aging adults and recovering patients. This program gives you a real pathway into premium employment or international care opportunities.",
  badges: ["Accessible", "Future Proof", "Certified", "Affordable"],
  secondaryBody:
    "A structured 10 week programme that equips you with both the theoretical foundation and hands on competencies you need to deliver quality adult care at home, in the community, or abroad.",
  benefitsIntro:
    "Whether you are starting out, switching careers, or upskilling, this program gives you the specialized skills and certification to succeed in the rapidly growing adult care sector.",
  whoIsThisFor: [
    "New entrants to the health sector looking for a job ready pathway as care assistants or support workers.",
    "People seeking global care work opportunities and relocation pathways.",
    "Individuals switching into stable, high demand clinical careers.",
    "Community based micro care entrepreneurs.",
    "Employers training frontline healthcare staff.",
  ],
  whatYouWillGain: [
    "Certified, job ready clinical skills in adult and elderly care.",
    "Support with CVs, interviews, and global employment pathways.",
    "Access to the Oakvale learning community and ongoing mentorship.",
    "Real career opportunities in care at home or abroad via our Jobs Board.",
    "The confidence and structural knowledge to start your own micro care business.",
  ],
  howYouWillLearn: [
    "Flexible, person centered learning designed for busy schedules.",
    "Self paced video modules on a mobile accessible learning platform.",
    "Weekly live lessons and direct mentor support.",
    "Peer discussion forums to grow alongside driven professionals.",
    "Downloadable guides, clinical resources, and interactive scenarios.",
  ],
  outlineIntro:
    "Over 10 weeks of engaging hybrid learning, you will gain both the theoretical foundation and hands on competencies you need to deliver high quality adult care, whether at home, in the community, or abroad.",
  modules: [
    {
      title: "Fundamental Principles & Standards",
      description:
        "Learn the heart of quality caregiving. Explore the professional and ethical principles that define excellent care, building your understanding of empathy driven communication and the critical importance of privacy and dignity.",
      bullets: [
        "Duty of Care",
        "Communication Skills",
        "Recordkeeping & Documentation",
        "Confidentiality & Data Protection",
        "Ethical Standards & Professional Conduct in Care",
      ],
    },
    {
      title: "Best Practices in Care Delivery",
      description:
        "Learn how to properly protect vulnerable adults. Master infection control and the mental support needed for the elderly.",
    },
    {
      title: "Core Skills & Competencies",
      description:
        "Master the practical, daily routines of adult caregiving so you are fully prepared for the physical and clinical demands of the job, including safe lifting and mobility support.",
    },
    {
      title: "Employability & Micro Entrepreneurship in Care",
      description:
        "We show you how to turn your training into a recognized, highly profitable career, complete with interview preparation and business structuring.",
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
  name: "Professional Childcare & Early Years Programme",
  shortName: "Child Care",
  homeHeadline: "Step Into Your Future with Our Child Care Program",
  homeBody:
    "Whether you are starting out, transitioning from informal care, or building a home based enterprise, Oakvale's Child Care program equips you with globally aligned early years skills, hands on placement experience, and the confidence to succeed anywhere. Our immersive 15 week hybrid curriculum covers early childhood development for ages 0 to 5, strict child safeguarding, and professional daily routines, bridging the gap between where you are and where the childcare world needs you. Join the next generation of verified professionals shaping the future of early childhood care.",
  homeCta: "Explore Child Care",
  heroHeadline: "Professional Childcare & Early Years Programme",
  heroBody:
    "A 15 week, globally aligned course that trains you to deliver safe, nurturing, developmentally sound care for children aged 0 to 5. This program gives you a real pathway into employment or your own home based childcare service.",
  badges: ["Professional", "Values Driven", "Competence", "Global"],
  secondaryBody:
    "A structured 15 week programme that equips you to deliver safe, nurturing, developmentally appropriate childcare for ages 0 to 5, and confidently transition into employment or home based childcare services.",
  benefitsIntro:
    "Whether you are starting out, switching careers, or moving from informal to professional care, this program gives you the skills and certification to succeed in early childhood care.",
  whoIsThisFor: [
    "Aspiring childcare workers and school leavers seeking a job ready pathway.",
    "Nannies, nursery assistants, crèche staff, and home childcare providers.",
    "Parents and family caregivers moving from informal to professional care.",
    "Community caregivers, especially women and youth, seeking income growth.",
  ],
  whatYouWillGain: [
    "A clear professional identity, role, boundaries, and duty of care.",
    "Deep understanding of child development and milestones for ages 0 to 5.",
    "Confidence in daily routines including feeding, hygiene, sleep, play, and communication.",
    "Safety first practice including safeguarding, infection prevention, and food hygiene.",
    "A clear pathway into employment or home based enterprise.",
  ],
  howYouWillLearn: [
    "Blended delivery featuring interactive lessons, video demos, and guided placement.",
    "Real life case studies grounded in African caregiving settings.",
    "Role plays, scenarios, and reflective practice throughout.",
    "Continuous assessment paired with a hands on capstone project.",
  ],
  outlineIntro:
    "We start with who you are as a professional, moving through how children grow from birth to five, into keeping them safe, and finishing with your own career plan. Over 15 weeks of engaging hybrid learning, you will gain both the theoretical foundation and practical competencies you need to deliver high quality early years care.",
  modules: [
    {
      title: "Professional Identity, Values & Responsibilities (Weeks 1 to 2)",
      description:
        "Become the kind of childcare professional families trust. Be clear on your role, your boundaries, and the standards that protect children and your career.",
      bullets: [
        "Childcare as a Profession: Identity, Principles & Standards",
        "The Role of the Childcare Worker",
        "Duty of Care",
        "Global Frameworks in Early Years Childcare",
      ],
    },
    {
      title: "Foundations of Early Childhood Development 0 to 2 Years (Weeks 3 to 6)",
      description:
        "Learn how babies and toddlers grow so your care becomes intentional, not accidental, and every routine supports healthy development.",
      bullets: [
        "Holistic Child Development & Brain Growth",
        "Caregiver Role in Child Development",
        "Infant Development Milestones 0 to 12 Months",
        "Daily Care Routines for 0 to 12 Months",
        "Toddler Development Milestones 1 to 2 Years",
        "Daily Care Routines for Toddlers 1 to 2 Years",
      ],
    },
    {
      title: "Development, Safety & Child Protection 3 to 5 Years (Weeks 7 to 10)",
      description:
        "Build confidence supporting preschoolers. Master school readiness, spotting red flags early, and keeping every child safe through professional daily practice.",
      bullets: [
        "Developmental Growth from 3 to 5 Years",
        "Recognising Developmental Delays & When to Act",
        "Health, Safety & Infection Prevention",
        "Fire Safety & Food Hygiene",
        "Professional Communication Skills",
        "Safeguarding Children from Harm, Neglect & Abuse",
        "Recordkeeping & Information Governance",
      ],
    },
    {
      title: "Career Pathways & Professional Growth (Weeks 11 to 15)",
      description:
        "Finish with a clear plan and real confidence for interviews and workplace expectations, plus an extended capstone and placement period proving you can apply everything you have learned.",
      bullets: [
        "Reflective Practice & Continuous Professional Development",
        "Employment & Self Employment Pathways",
        "Capstone Project including supervised placement",
        "Career Planning & Transition to Practice",
      ],
    },
  ],
  details: [
    { label: "Format", value: "Hybrid (Online + Community)" },
    { label: "Duration", value: "15 Weeks (approximately 180 hours)" },
    { label: "Credential", value: "Certificate in Early Years Childcare 0 to 5 Years" },
    { label: "Alignment", value: "EYFS (UK), CDA (USA), ECE (Canada), UNCRC" },
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
    body: "Learn remotely on your phone or computer, at your own pace, with weekly live recaps to keep you on track.",
  },
  {
    title: "Supportive Community",
    body: "Your instructor, mentor, and peers are with you every step, from your first lesson to your capstone project.",
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
    body: "Changing direction is not starting over. In as little as 10 weeks of flexible, hybrid learning, you can move from an uncertain job into a stable, in-demand clinical career — no prior healthcare experience required.",
    points: [
      "Beginner-friendly, no prior experience needed",
      "Flexible hybrid learning built around busy schedules",
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

export const GET_CERTIFIED = {
  headline: "Get Certified",
  subheadline: "Turn Caregiving Experience Into a Recognised Career",
  body: "Whether you are new to childcare or have years of informal experience, this programme gives you the certificate, the confidence, and the community to take your next step.",
  items: [
    "Certificate in Early Years Childcare 0 to 5 Years",
    "Support with CVs, interviews, and job placement",
    "Guidance to start your own home based micro childcare service",
    "Access to the Oakvale Learning community and mentor support",
    "Access to placement via our Jobs Board platform",
  ],
};
