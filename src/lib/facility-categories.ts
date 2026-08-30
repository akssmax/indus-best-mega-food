import type { ComponentType } from "react"
import {
  ArchiveBoxIcon,
  ArrowPathRoundedSquareIcon,
  BeakerIcon,
  BoltIcon,
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
  CubeIcon,
  MapIcon,
  ScaleIcon,
  ShareIcon,
  ShieldCheckIcon,
  SunIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline"
import { SnowflakeIcon, ThermometerSnowflakeIcon } from "lucide-react"

import {
  coldChain,
  infrastructure as infraItems,
  qualityLabs,
} from "@/content/facilities"

export type FacilityIcon = ComponentType<{ className?: string }>

export function inferFacilityItemIcon(label: string): FacilityIcon {
  const key = label.toLowerCase()

  if (key.includes("aseptic")) return BeakerIcon
  if (key.includes("pulping")) return ArrowPathRoundedSquareIcon
  if (key.includes("iqf")) return SnowflakeIcon
  if (key.includes("freeze") || key.includes("blast")) return ThermometerSnowflakeIcon
  if (key.includes("shared") || key.includes("line")) return ShareIcon
  if (key.includes("cold storage")) return SnowflakeIcon
  if (key.includes("ripening")) return SunIcon
  if (key.includes("warehouse")) return ArchiveBoxIcon
  if (key.includes("pack house")) return CubeIcon
  if (key.includes("microbiological")) return BeakerIcon
  if (key.includes("pesticide")) return ShieldCheckIcon
  if (key.includes("product development")) return WrenchScrewdriverIcon
  if (key.includes("se & qal")) return ClipboardDocumentCheckIcon
  if (key.includes("water")) return BeakerIcon
  if (key.includes("weighbridge")) return ScaleIcon
  if (key.includes("etp") || key.includes("stp")) return ArrowPathRoundedSquareIcon
  if (key.includes("right of way")) return MapIcon
  if (key.includes("secured")) return BuildingOffice2Icon

  return BoltIcon
}

export const facilityCategoryStyles = {
  processing: {
    well: "bg-primary/10 text-primary dark:bg-primary/15",
    item: "bg-primary/8 text-primary dark:bg-primary/12",
  },
  cold: {
    well: "bg-aqua/15 text-forest dark:bg-aqua/20 dark:text-aqua",
    item: "bg-aqua/12 text-forest dark:bg-aqua/16 dark:text-aqua",
  },
  packaging: {
    well: "bg-cta/12 text-cta dark:bg-cta/18",
    item: "bg-cta/10 text-cta dark:bg-cta/14",
  },
  quality: {
    well: "bg-secondary text-foreground dark:bg-secondary/90",
    item: "bg-secondary text-foreground/85 dark:bg-secondary/80 dark:text-foreground/90",
  },
  utilities: {
    well: "bg-muted text-foreground/85 dark:text-foreground/90",
    item: "bg-muted text-foreground/80 dark:text-foreground/85",
  },
} as const

export type FacilityCategoryStyle = keyof typeof facilityCategoryStyles

export type FacilityCategoryItem = {
  label: string
  icon: FacilityIcon
}

export type FacilityCategory = {
  title: string
  icon: FacilityIcon
  style: FacilityCategoryStyle
  items: FacilityCategoryItem[]
}

export const facilityCategories: FacilityCategory[] = [
  {
    title: "Processing",
    icon: BeakerIcon,
    style: "processing",
    items: [
      { label: "Aseptic processing", icon: BeakerIcon },
      { label: "Pulping", icon: ArrowPathRoundedSquareIcon },
      { label: "IQF (2 MT/H)", icon: SnowflakeIcon },
      { label: "Deep freeze / blast freezing", icon: ThermometerSnowflakeIcon },
      { label: "Shared processing lines", icon: ShareIcon },
    ],
  },
  {
    title: "Cold Chain",
    icon: SnowflakeIcon,
    style: "cold",
    items: coldChain
      .filter((item) =>
        [
          "Cold storage",
          "Ripening chambers",
          "Blast freezer",
          "IQF line with packaging hall",
        ].includes(item.name)
      )
      .map((item) => ({
        label: `${item.name} · ${item.capacity} (${item.detail})`,
        icon: inferFacilityItemIcon(item.name),
      })),
  },
  {
    title: "Packaging & Warehousing",
    icon: ArchiveBoxIcon,
    style: "packaging",
    items: coldChain
      .filter((item) => ["Dry warehouse", "Pack house"].includes(item.name))
      .map((item) => ({
        label: `${item.name} · ${item.capacity}`,
        icon: inferFacilityItemIcon(item.name),
      })),
  },
  {
    title: "Quality & Testing",
    icon: ClipboardDocumentCheckIcon,
    style: "quality",
    items: qualityLabs.map((lab) => ({
      label: `${lab} testing`,
      icon: inferFacilityItemIcon(`${lab} testing`),
    })),
  },
  {
    title: "Utilities & Infrastructure",
    icon: BoltIcon,
    style: "utilities",
    items: infraItems.map((item) => ({
      label: `${item.name} · ${item.spec}`,
      icon: inferFacilityItemIcon(item.name),
    })),
  },
]
