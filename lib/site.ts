/**
 * All site copy and contact details live here so the sections stay pure layout.
 * Edit this file to change wording, projects or links.
 */

export const site = {
  name: "Due Label Technologies",
  tagline: "From Due to Done.",
  promise: "We commit. We build. We deliver.",
  location: "Lagos, Nigeria",
  url: "https://www.duelabel.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "duelabeltech@gmail.com",
  /** International format, digits only (what wa.me expects). */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2340000000000",
  rc: "RC 9736643",
  social: {
    linkedin: "https://www.linkedin.com/",
    x: "https://x.com/",
    github: "https://github.com/",
  },
};

/** "+234 000 000 0000" from "2340000000000" — used for display and copy-to-clipboard. */
export function formatPhone(digits: string) {
  const m = digits.match(/^(\d{3})(\d{3})(\d{3})(\d{4})$/);
  return m ? `+${m[1]} ${m[2]} ${m[3]} ${m[4]}` : `+${digits}`;
}

export const nav = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Engineering-led software studio · Lagos, Nigeria",
  title: ["From Due to ", "Done."] as const,
  lead:
    "Websites, mobile apps and digital platforms, built by engineers who commit to a date and deliver on it. Tested, launched and ready to use.",
  typed: ["web apps", "mobile apps", "digital platforms", "UI/UX design", "product engineering"],
};

export const stack = [
  "TypeScript",
  "Go",
  "React",
  "Next.js",
  "Angular",
  "Vue",
  "NestJS",
  "Node.js",
  "React Native",
  "Flutter",
  "PostgreSQL",
  "Redis",
  "Docker",
];

export const positioning = {
  line: ["We commit. We build. ", "We deliver."] as const,
  traits: ["Engineering-led", "Accountable", "Direct", "Modern", "Dependable"],
};

export const services = [
  {
    n: "01",
    title: "Web applications",
    body: "Portals, dashboards and internal tools, frontend to database.",
    chips: ["React / Next.js", "NestJS / Go"],
  },
  {
    n: "02",
    title: "Mobile applications",
    body: "iOS and Android from one codebase, through to store release.",
    chips: ["React Native", "Flutter"],
  },
  {
    n: "03",
    title: "Digital platforms",
    body: "Multi-sided products with real architecture behind them.",
    chips: ["Fintech", "Identity", "Logistics"],
  },
  {
    n: "04",
    title: "UI/UX design",
    body: "Designed by the people who build it, so what's signed off ships.",
    chips: ["Flows", "Screens", "Design systems"],
  },
  {
    n: "05",
    title: "Product engineering",
    body: "Senior hands on an existing product: stabilise, scale, ship the next phase.",
    chips: ["Tech lead", "Refactoring", "Retainers"],
  },
];

export const servicesCta = {
  eyebrow: "Not sure which?",
  title: "Tell us what's due. We'll tell you what it takes.",
  button: "Book a scoping call",
};

export const why = {
  eyebrow: "Why Due Label",
  title: "The space between a freelancer and a large agency.",
  lead:
    "The technical depth, dedication and direct communication of a focused engineering team, with a working process that stays practical and straightforward.",
  cards: [
    {
      icon: "code",
      title: "Engineering-led",
      body: "Technology is at the heart of the work. We understand what needs to be built and pick the right technical approach before writing code, then build it to be functional, scalable and maintainable.",
    },
    {
      icon: "shield",
      title: "Accountable",
      body: "Commitments are responsibilities, not suggestions. We don't position ourselves around starting projects. We position ourselves around seeing them through.",
    },
    {
      icon: "chat",
      title: "Direct",
      body: "Clear, honest, straightforward communication. You talk to the engineers doing the work, you see progress every week, and you hear about problems before they become delays.",
    },
  ] as const,
};

export const processSteps = {
  eyebrow: "How we work",
  title: "Four steps from due to done.",
  lead: "The same process on every engagement, so you always know where the project is and what happens next.",
  steps: [
    {
      n: "01",
      title: "Understand",
      body: "We start with what you're trying to achieve, not with a tech stack. Users, constraints, what “done” looks like to you.",
    },
    {
      n: "02",
      title: "Scope",
      body: "A written scope, a technical approach, a timeline and a cost. Agreed before any commitment is made, by either side.",
    },
    {
      n: "03",
      title: "Build & test",
      body: "Organised execution in short cycles, with working software you can see and test as it comes together.",
    },
    {
      n: "04",
      title: "Launch & support",
      body: "Deployed, documented and handed over properly. We stay around after launch, because the work isn't done when the code is.",
    },
  ],
};

export const work = {
  eyebrow: "Selected work",
  title: "Done, not just started.",
  lead: "Products we've taken from commitment to delivery, across fintech, healthcare, commerce, SaaS and community.",
  projects: [
    {
      name: "Podo",
      url: "https://usepodo.com/",
      display: "usepodo.com",
      tag: "Fintech · Digital platform",
      body: "Pay, save and move money: wallet, QR checkout, bill-splitting, group savings and AI spending insights, for everyday life.",
      image: "/images/work/podo.jpg",
    },
    {
      name: "CareNestPro",
      url: "https://carenestpro.com/ng/",
      display: "carenestpro.com",
      tag: "Healthcare · Web platform",
      body: "Multi-country care services platform: childcare and homecare bookings, provider standards and client accounts.",
      image: "/images/work/carenestpro.jpg",
    },
    {
      name: "The Advertiser",
      url: "https://the-advertisers.com/",
      display: "the-advertisers.com",
      tag: "E-commerce · Marketplace",
      body: "Multi-vendor marketplace with seller onboarding, category browsing, promotions, wishlist and secure checkout.",
      image: "/images/work/advertiser.jpg",
    },
    {
      name: "Harp",
      url: "https://www.getharp.io/",
      display: "getharp.io",
      tag: "SaaS · Web application",
      body: "Customer engagement workspace: contacts, campaigns and automated follow-up across email, SMS and push.",
      image: "/images/work/harp.jpg",
    },
    {
      name: "Pulo",
      url: "https://www.pulohq.com/",
      display: "pulohq.com",
      tag: "Travel · Mobile + web",
      body: "Personal travel companion: rides, local guides and stays booked from one app, with an AI assistant.",
      image: "/images/work/pulo.jpg",
    },
    {
      name: "Christ's Bride Tabernacle",
      url: "https://christbridetabernacle.com/",
      display: "christbridetabernacle.com",
      tag: "Community · Website",
      body: "Church website with live service streaming, sermon archive, recordings and testimonies.",
      image: "/images/work/cbt.jpg",
    },
  ],
};

export const values = {
  eyebrow: "What we stand for",
  title: "Due is the commitment. Done is the proof.",
  lead: "Due Label exists in the space between the two: taking what is committed and turning it into something complete.",
  items: [
    { title: "Accountability", body: "We take ownership of what we commit to." },
    { title: "Reliability", body: "We build relationships and products people can depend on." },
    { title: "Clarity", body: "We communicate directly, honestly and without unnecessary complexity." },
    { title: "Responsibility", body: "We care about the work from the first conversation through delivery and beyond." },
    {
      title: "Engineering excellence",
      body: "Technical depth, thoughtful architecture, and products that are functional, scalable and maintainable.",
    },
  ],
};

export const contact = {
  title: "Have something due?",
  lead: "Tell us what you're building. We'll come back within one working day with a straight answer on whether we're the right fit, and what it would take.",
  form: {
    title: "Start a project",
    note: "Goes to our inbox, and opens WhatsApp with your brief ready to send.",
    button: "Send brief",
  },
};

export const footer = {
  blurb: "Engineering reliable digital products. From Due to Done.",
};
