export const site = {
  name: "Indus Best Mega Food Park",
  shortName: "IBMFP",
  legalName: "Indus Best Mega Food Park Private Limited",
  tagline: "A Complete Ecosystem for Food Processing & Growth",
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
    { label: "About", href: "/#about" },
    { label: "Infrastructure", href: "/#infrastructure" },
    { label: "Facilities", href: "/#facilities" },
    { label: "Why Us", href: "/#why" },
    { label: "Opportunities", href: "/#opportunities" },
    { label: "Contact", href: "/#contact" },
  ],
} as const

export type Site = typeof site
