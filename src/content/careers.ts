import { site } from "@/content/site"

const linkedIn =
  site.socials.find((social) => social.label === "LinkedIn")?.href ??
  "https://www.linkedin.com/in/indus-best-mega-food-park-pvt-ltd-raipur-cg-8404b0141/"

export const careers = {
  hero: {
    eyebrow: "Careers",
    title: "Build food processing with us at Bemta–Sarora.",
    body: "Indus Best Mega Food Park runs as an operating campus — collection, processing, cold chain, and dispatch. We hire for plant operations, quality, engineering, logistics, and corporate roles as the park scales.",
  },
  meta: {
    description:
      "Careers at Indus Best Mega Food Park near Raipur. Open roles are posted on our LinkedIn company profile — an operational MOFPI campus at Bemta–Sarora.",
  },
  intro: {
    eyebrow: "Work on a live campus",
    title: "Operations, not a blueprint.",
    body: "You would join a Ministry of Food Processing Industries listed Mega Food Park where lines, cold storage, and utilities are already running. Teams work across intake, manufacturing, QA, maintenance, and site administration — with Nourya and partner volumes moving through the same infrastructure.",
  },
  pillars: {
    eyebrow: "What we look for",
    title: "People who can run and improve a food park.",
    items: [
      {
        title: "Plant & production",
        body: "Aseptic, dairy, IQF, pack house, and warehouse teams — experience in FMCG, agri-processing, or cold chain operations.",
      },
      {
        title: "Quality & compliance",
        body: "Microbiology, food safety, and process documentation on a campus with on-site labs and MOFPI standards.",
      },
      {
        title: "Engineering & utilities",
        body: "Maintenance, ETP/STP, boilers, refrigeration, and utility management across a multi-tenant industrial site.",
      },
      {
        title: "Commercial & corporate",
        body: "Projects, investor relations, procurement, and administration from Raipur, Gurugram, and New Delhi offices.",
      },
    ],
  },
  linkedIn: {
    eyebrow: "Open roles",
    title: "Vacancies are posted on LinkedIn.",
    body: "We do not list individual job openings on this website. When a role opens, it is published on our LinkedIn company profile — follow the page or check back there for current postings.",
    cta: { label: "View LinkedIn profile", href: linkedIn },
    note: "For a general introduction without a live posting, you may still write to the project team via the contact page.",
    contactCta: { label: "Contact the project team", href: "/contact" },
  },
} as const

export type Careers = typeof careers
