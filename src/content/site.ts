export const site = {
  name: "Indus Best Mega Food Park",
  shortName: "IBMFP",
  legalName: "Indus Best Mega Food Park Private Limited",
  tagline: "A ready campus for food processing in Chhattisgarh.",
  location: "Village Bemta–Sarora, near Raipur, Chhattisgarh",
  pincode: "493101",
  logo: {
    src: "/images/logo.png",
    alt: "Indus Best Mega Food Park",
  },
  phones: [
    { label: "CEO", number: "+91 81960 11116", href: "tel:+918196011116" },
    {
      label: "Project Manager",
      number: "+91 85954 11612",
      href: "tel:+918595411612",
    },
  ],
  emails: [
    {
      label: "Projects",
      address: "projects@indusbestmegafoodpark.com",
      href: "mailto:projects@indusbestmegafoodpark.com",
    },
    {
      label: "CEO",
      address: "ceo@indusbestmegafoodpark.com",
      href: "mailto:ceo@indusbestmegafoodpark.com",
    },
  ],
  addresses: {
    works: {
      label: "Works",
      lines: [
        "Indus Best Mega Food Park",
        "Village Bemta–Sarora, Near Raipur",
        "Chhattisgarh 493101",
      ],
    },
    corporate: {
      label: "Corporate",
      lines: [
        "701, 7th Floor, Signature Tower",
        "Sector 30, Gurugram",
        "Haryana 122001",
      ],
    },
    registered: {
      label: "Registered",
      lines: [
        "129, Transport Centre, Rohtak Road",
        "Punjabi Bagh, New Delhi 110035",
      ],
    },
  },
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/IBMFPPL/" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/indus-best-mega-food-park-pvt-ltd-raipur-cg-8404b0141/",
    },
  ],
  nav: [
    { label: "About us", href: "/about" },
    { label: "Facilities", href: "/facilities" },
    { label: "Investor Corner", href: "/investors" },
    { label: "Contact", href: "/contact" },
  ],
  explore: [
    { label: "Why Us", href: "/why" },
    { label: "Campus", href: "/campus" },
    { label: "Why invest", href: "/opportunities" },
    { label: "Products", href: "/#products" },
  ],
  innerPages: {
    facilities: {
      eyebrow: "Facilities",
      title: "Plots, lines, cold chain, and utilities — ready to book.",
      body: "Processors book shared plant on this campus: developed plots, 16 MSME sheds, fruit and vegetable lines, 5,000 MT cold storage, 12,000 MT dry warehouse, pack house, quality labs, and common utilities.",
      description:
        "Book plots, MSME sheds, fruit and vegetable lines, 5,000 MT cold storage, 12,000 MT dry warehouse, pack house, labs, and utilities at Indus Best Mega Food Park.",
      cta: { label: "Enquire about capacity", href: "/contact" },
    },
    investors: {
      eyebrow: "Investor Corner",
      title: "JV and investment on an operating MOFPI campus.",
      body: "Master plan, state policies, brochure, plot terms, and shared-facility tariffs — plus co-processing and campus-level partnership on enquiry.",
      description:
        "Investor Corner for Indus Best Mega Food Park: master plan, Chhattisgarh policies, brochure, plot rates, facility tariffs, and JV on an operational MOFPI campus near Raipur.",
      cta: { label: "Talk to the project team", href: "/contact" },
    },
    contact: {
      eyebrow: "Contact us",
      title: "Tell us the unit you want to set up.",
      body: "Plot, MSME shed, shared line, or a partnership conversation. Use the form below — the project team replies with availability and a current rate card.",
      replyStat: {
        value: "1–2 business days",
        label: "Typical project team reply",
      },
      description:
        "Enquire about a plot, MSME shed, shared facility capacity, or joint venture at Indus Best Mega Food Park, Bemta–Sarora.",
    },
    why: {
      eyebrow: "Why Us",
      title: "Start operations. Skip the greenfield.",
      body: "The park is for processors who want land, utilities, collection, and shared capacity in one place — and for partners who want to put capital into that model.",
      description:
        "Plug-and-play sheds, shared processing, collection in the growing belt, and cold chain on campus at Indus Best Mega Food Park.",
    },
    campus: {
      eyebrow: "The campus",
      title: "The physical campus at Bemta–Sarora.",
      body: "Works at Village Bemta–Sarora, near Raipur, Chhattisgarh 493101 — plots, lines, cold chain, and utilities on one site, next to NH-53 and the growing belt.",
      description:
        "The Indus Best Mega Food Park campus at Village Bemta–Sarora near Raipur: plots, processing lines, cold storage, utilities, and how to reach the site.",
    },
    opportunities: {
      eyebrow: "Why invest",
      title: "Set up on a campus that's already running.",
      body: "Plots, sheds, shared lines, and cold rooms are live at Bemta–Sarora. Enquire for availability and a current rate card — allocation is a conversation, not a walk-up tariff.",
      description:
        "Set up at Indus Best Mega Food Park: serviced plots, 16 plug-and-play sheds, shared processing, cold chain, and joint venture on an operational MOFPI campus near Raipur.",
      cta: { label: "Request a rate card", href: "/contact" },
    },
  },
} as const

export type Site = typeof site
