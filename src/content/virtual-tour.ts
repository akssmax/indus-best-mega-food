import type { CampusPin } from "@/components/ui/campus-hotspots"
import { campusDetail } from "@/content/campus"

const masterPlanSrc =
  "https://www.indusbestmegafoodpark.com/wp-content/uploads/2018/03/investor-corner-Indus-Best-Mega-Food-Park-Raipur-.jpg"

export type VirtualTourSpec = {
  label: string
  value: string
}

export type VirtualTourCentre = {
  name: string
  subtitle?: string
  specs: readonly string[]
}

export type VirtualTourMapPosition = {
  x: string
  y: string
}

export type VirtualTourZone = {
  id: string
  label: string
  title: string
  body: string
  mapPosition: VirtualTourMapPosition
  image: {
    src: string
    alt: string
    placeholder?: boolean
  }
  /** Reserved for future walkthrough / 360 embeds. */
  embedUrl?: string
  specs: readonly VirtualTourSpec[]
  pins?: readonly CampusPin[]
  centres?: readonly VirtualTourCentre[]
}

export const virtualTour = {
  miniMap: {
    src: masterPlanSrc,
    alt: "Campus master plan — tour stop locations",
  },
  section: {
    eyebrow: "Virtual tour",
    title: "Step through the campus.",
    body: "Seven stops from master plan to collection network — plots, lines, cold chain, labs, and PPCs on one operational site.",
  },
  zones: [
    {
      id: "overview",
      label: "Overview",
      mapPosition: { x: "50%", y: "45%" },
      title: "67 acres. One integrated campus.",
      body: "Developed land, plug-and-play sheds, processing lines, multi-temperature storage, labs, and utilities — on the Raipur–Bilaspur corridor at Village Bemta–Sarora.",
      image: {
        src: masterPlanSrc,
        alt: "Indus Best Mega Food Park master plan overview",
        placeholder: true,
      },
      specs: campusDetail.scale.stats.map((stat) => ({
        label: stat.label,
        value: stat.value,
      })),
      pins: [
        {
          label: "Plots",
          detail: "32 acres plotted · 15 available",
          x: "28%",
          y: "58%",
          tone: "primary",
        },
        {
          label: "MSME sheds",
          detail: "16 plug-and-play units",
          x: "62%",
          y: "48%",
          tone: "cta",
          icon: "sheds",
        },
        {
          label: "Processing",
          detail: "Central campus blocks",
          x: "48%",
          y: "38%",
          tone: "aqua",
        },
      ],
    },
    {
      id: "entry",
      label: "Entry",
      mapPosition: { x: "50%", y: "78%" },
      title: "Entry, weighbridge, and dispatch.",
      body: "Controlled site access with a 100 MT electronic modular weighbridge at entry — batch-level traceability from the gate through storage and processing.",
      image: {
        src: "/images/weigh-bridge.jpg",
        alt: "Weighbridge and site entry at Indus Best Mega Food Park",
        placeholder: true,
      },
      specs: [
        { label: "Weighbridge", value: "100 MT electronic" },
        { label: "Security", value: "Round-the-clock" },
        { label: "Roads", value: "3.6 km internal network" },
      ],
      pins: [
        {
          label: "Weighbridge",
          detail: "Modular electronic scale",
          x: "52%",
          y: "55%",
          tone: "cta",
        },
        {
          label: "Dispatch",
          detail: "Outbound logistics lane",
          x: "72%",
          y: "42%",
          tone: "primary",
        },
      ],
    },
    {
      id: "central-processing",
      label: "Central campus",
      mapPosition: { x: "48%", y: "42%" },
      title: "Central Processing Campus.",
      body: "The core processing blocks where shared plant, pack house, and co-pack lines operate — processors book capacity without building the estate.",
      image: {
        src: "/images/cpc-building.jpg",
        alt: "Central processing campus building at Bemta–Sarora",
        placeholder: true,
      },
      specs: [
        { label: "Status", value: "Operational MOFPI campus" },
        { label: "Shared plant", value: "Bookable line capacity" },
        { label: "Pack house", value: "On-site finishing" },
      ],
      pins: [
        {
          label: "CPC block",
          detail: "Central processing campus",
          x: "50%",
          y: "45%",
          tone: "cta",
        },
        {
          label: "Utilities",
          detail: "Power and water at boundary",
          x: "24%",
          y: "62%",
          tone: "aqua",
          icon: "utilities",
        },
      ],
    },
    {
      id: "processing",
      label: "Processing",
      mapPosition: { x: "62%", y: "38%" },
      title: "Aseptic and concentrate lines.",
      body: "Fruit and vegetable processing rated in MT per hour — tomato concentrate at 12 MTPH, IQF at 2 MT/H, plus lines for mango, blueberry, papaya, guava, amla, and vegetable juices.",
      image: {
        src: "/images/aseptic-line.jpg",
        alt: "Aseptic processing line on campus",
        placeholder: true,
      },
      specs: [
        { label: "Tomato concentrate", value: "12 MTPH" },
        { label: "IQF", value: "2 MT/H" },
        { label: "Pack formats", value: "Aseptic · bulk · retail" },
      ],
      pins: [
        {
          label: "Aseptic line",
          detail: "Tomato · fruit · vegetable",
          x: "58%",
          y: "50%",
          tone: "cta",
        },
        {
          label: "Evaporator",
          detail: "Concentrate production",
          x: "34%",
          y: "44%",
          tone: "primary",
        },
      ],
    },
    {
      id: "cold-chain",
      label: "Cold chain",
      mapPosition: { x: "30%", y: "52%" },
      title: "Multi-temperature cold storage.",
      body: "5,000 MT across −20°C and 0–10°C chambers, plus ripening, blast freeze, and IQF — hold inventory beside your line without off-site cold rooms.",
      image: {
        src: "/images/warehouse.jpg",
        alt: "Cold storage warehouse at Indus Best Mega Food Park",
        placeholder: true,
      },
      specs: [
        { label: "Deep freeze", value: "1,500 MT (−20°C)" },
        { label: "Chilled", value: "3,500 MT (0–10°C)" },
        { label: "Dry warehouse", value: "12,000 MT ambient" },
      ],
      pins: [
        {
          label: "Cold chambers",
          detail: "−20°C and 0–10°C",
          x: "48%",
          y: "48%",
          tone: "aqua",
          icon: "sheds",
        },
        {
          label: "Blast freeze",
          detail: "Rapid chill capacity",
          x: "68%",
          y: "56%",
          tone: "cta",
        },
      ],
    },
    {
      id: "admin-quality",
      label: "Admin & QA",
      mapPosition: { x: "68%", y: "55%" },
      title: "Administration and quality labs.",
      body: "An on-site 12,917 sq ft laboratory supports batch release at the campus — microbiological, product development, and pesticide residue labs under one roof.",
      image: {
        src: "/images/admin-lab.jpg",
        alt: "Administration and laboratory buildings",
        placeholder: true,
      },
      specs: campusDetail.assurance.labs.slice(0, 4).map((lab) => ({
        label: "Lab",
        value: lab,
      })),
      pins: [
        {
          label: "QC lab",
          detail: "On-line quality control",
          x: "42%",
          y: "52%",
          tone: "primary",
        },
        {
          label: "Admin",
          detail: "Project and operations",
          x: "62%",
          y: "40%",
          tone: "cta",
        },
      ],
    },
    {
      id: "ppc-network",
      label: "PPC network",
      mapPosition: { x: "50%", y: "16%" },
      title: "Three Primary Processing Centres.",
      body: "PPCs at Raipur, Durg, and Bilaspur aggregate, grade, and pre-cool produce before it reaches the central campus — shortening farm-to-line time across the belt.",
      image: {
        src: "/images/admin-building.jpg",
        alt: "Primary processing centre — placeholder photo",
        placeholder: true,
      },
      specs: [
        { label: "PPC Raipur", value: "8,000 MT warehouse" },
        { label: "PPC Durg", value: "1,000 MT warehouse" },
        { label: "PPC Bilaspur", value: "Leased multi-temp facility" },
      ],
      centres: campusDetail.collection.centres,
    },
  ] as const satisfies readonly VirtualTourZone[],
} as const

export type VirtualTourZoneId = (typeof virtualTour.zones)[number]["id"]

export function getVirtualTourZone(id: string) {
  return virtualTour.zones.find((zone) => zone.id === id)
}

export function getVirtualTourZoneIndex(id: string) {
  return virtualTour.zones.findIndex((zone) => zone.id === id)
}
