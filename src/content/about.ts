import { landing } from "@/content/landing"
import { site } from "@/content/site"
import { primaryProcessingCentres, qualityLabs } from "@/content/facilities"

export const aboutPage = {
  hero: {
    eyebrow: "About the park",
    headline: "An operational Mega Food Park, built for processors near Raipur.",
    body: `${site.legalName} sits at Village Bemta–Sarora, in Chhattisgarh's growing belt. The campus is approved under the Ministry of Food Processing Industries Mega Food Park Scheme and listed as operational.`,
    image: {
      src: "/images/gallery/processing-campus-ground.webp",
      alt: "Warehouse and campus at Indus Best Mega Food Park, Raipur",
    },
    primaryCta: { label: "Talk to the project team", href: "/contact" },
    secondaryCta: { label: "See the campus", href: "/campus" },
    jumps: [
      { label: "The cluster", href: "#cluster" },
      { label: "Leadership", href: "#team" },
      { label: "Purpose", href: "#purpose" },
      { label: "Nourya", href: "#nourya" },
      { label: "Locations", href: "#locations" },
    ],
  },
  who: {
    id: "who",
    eyebrow: "Who we are",
    title: landing.about.title,
    body: landing.about.body,
    whatIs: landing.about.whatIs,
    scheme:
      "Approved under the Ministry of Food Processing Industries Mega Food Park Scheme (2014) and listed as operational.",
    seal: { kicker: "MOFPI", title: "2014 · Operational" },
    image: landing.about.image,
  },
  team: {
    id: "team",
    eyebrow: "Leadership",
    title: "The people steering the park.",
    body: "Indus Best Mega Food Park is led by a board and management team with deep experience across agro-processing, infrastructure, and multi-sector industry.",
    members: [
      {
        role: "Chairman & Managing Director",
        name: "Maj. Satyapal Sindhu",
        bio: "Chairman of the board with vast, cross-sector experience guiding the park's long-term direction and stakeholder relationships.",
        image: {
          src: "/images/team/satyapal-sindhu.png",
          alt: "Maj. Satyapal Sindhu",
        },
        linkedin: "https://www.linkedin.com/in/satyapal-sindhu-39aa719/",
      },
      {
        role: "Chief Executive Officer",
        name: "Dr S K Mishra",
        credentials: "PhD",
        bio: "Techno-commercial leader with extensive experience across agro-based industry verticals — from collection and processing to campus operations.",
        image: {
          src: "/images/team/sk-mishra.jpg",
          alt: "Dr S K Mishra",
        },
        linkedin:
          "https://www.linkedin.com/in/dr-sk-mishra-a-kaizeneer-ceo-at-indus-best-mega-food-park-raipur-cg-47317844/",
      },
    ],
  },
  cluster: {
    id: "cluster",
    eyebrow: "The cluster",
    title: "From the growing belt to the central campus.",
    body: "Collection and primary processing sit in the production belt. Manufacturing, cold chain, and dispatch sit at Bemta–Sarora. Produce moves in without a separate greenfield build.",
    steps: [
      {
        title: "Growing belt",
        detail: "Agri and horticulture around Raipur and the Chhattisgarh production belt.",
        tone: "primary" as const,
      },
      {
        title: "Primary processing",
        detail: "Intake and grading at three Primary Processing Centres.",
        tone: "cta" as const,
      },
      {
        title: "Central campus",
        detail: "Lines, cold rooms, labs, and plots at Village Bemta–Sarora.",
        tone: "aqua" as const,
      },
    ],
    gauge: {
      value: "3",
      unit: "centres",
      sites: primaryProcessingCentres.map((centre) => centre.name),
    },
  },
  purpose: {
    id: "purpose",
    eyebrow: "Purpose",
    title: "Why the campus exists.",
    vision: landing.about.vision,
    mission: landing.about.mission,
    values: [
      {
        title: "Food safety",
        body: "A campus that stays current on technology and food safety — quality labs on site so processors can run to spec.",
      },
      {
        title: "Environmental practice",
        body: "Centralised ETP and STP, campus-wide water, and a secured site. Capex you do not duplicate on your plot.",
      },
      {
        title: "Commission a unit",
        body: "Shared infrastructure, quality systems, and a collection network so you install a plant — not an industrial estate.",
      },
    ],
  },
  snapshot: {
    id: "snapshot",
    eyebrow: "Campus at a glance",
    title: "Capacities on the ground.",
    body: "The numbers sit on this campus. Facilities and infrastructure carry the spec sheet.",
    items: [
      { value: "67", label: "Acres", href: "/facilities" },
      { value: "16", label: "Plug-and-play sheds", href: "/facilities" },
      { value: "30–35", label: "Developed plots", href: "/facilities" },
      { value: "5,000 MT", label: "Cold storage", href: "/facilities" },
      { value: "12,000 MT", label: "Dry warehouse", href: "/facilities" },
      { value: "3", label: "Primary processing centres", href: "/campus" },
    ],
  },
  nourya: {
    id: "nourya",
    eyebrow: "Packed here",
    title: "Nourya — the brand on these lines.",
    body: "UHT milk and curd, chemical-free jaggery, desi ghee, and tomato puree are packed at Bemta–Sarora. The park is the plant; Nourya is what leaves it.",
    lines: [
      "UHT milk",
      "Probiotic curd",
      "Jaggery",
      "Desi ghee",
      "Tomato puree",
      "Fresh paneer",
    ],
    primaryCta: {
      label: "See products from this campus",
      href: "/products",
    },
    shopCta: {
      label: "Shop Nourya",
      href: "https://nourya-in.myshopify.com/",
    },
  },
  quality: {
    id: "quality",
    eyebrow: "Quality and stewardship",
    title: "Labs on campus. Utilities shared.",
    body: "Microbiology, residue testing, and product development sit next to the lines. Process water and effluent treatment are campus services — not a second project for each unit.",
    labs: qualityLabs,
    utilities: [
      { label: "Process water", value: "2.7 MLD" },
      { label: "ETP & STP", value: "Centralised" },
      { label: "Weighbridge", value: "100 MT" },
    ],
    image: {
      src: "/images/gallery/quality-lab.webp",
      alt: "Quality control laboratory at Indus Best Mega Food Park",
    },
  },
  places: {
    id: "locations",
    eyebrow: "Where we work",
    title: "Works, corporate, and registered.",
    body: "The campus is at Bemta–Sarora. The project team is also in Gurugram and New Delhi.",
    mapEmbed: landing.location.mapEmbed,
  },
} as const

export type AboutPage = typeof aboutPage
