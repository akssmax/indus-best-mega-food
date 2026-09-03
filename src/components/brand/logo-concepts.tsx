import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

export type LogoTone = "paper" | "forest"
export type LogoLayout = "horizontal" | "stacked"

export type LogoConcept = {
  id: string
  number: string
  name: string
  primaryText: string
  descriptor: string
  rationale: string
  cues: readonly string[]
  typography: "heritage" | "modern" | "industrial"
}

export const logoConcepts = [
  {
    id: "confluence",
    number: "01",
    name: "Indus Drop",
    primaryText: "Indus Best",
    descriptor: "Mega Food Park",
    rationale:
      "A distilled version of the original water drop, framed by two leaf-like currents that form a compact, ownable crest.",
    cues: ["Heritage", "Water", "Integrated"],
    typography: "modern",
  },
  {
    id: "fieldworks",
    number: "02",
    name: "Canopy",
    primaryText: "INDUS BEST",
    descriptor: "Mega Food Park",
    rationale:
      "The original green canopy becomes three precise leaves sheltering a single blue drop—a cleaner expression of agriculture and care.",
    cues: ["Leaf", "Protection", "Agriculture"],
    typography: "industrial",
  },
  {
    id: "gateway",
    number: "03",
    name: "Source",
    primaryText: "INDUS",
    descriptor: "Best Mega Food Park",
    rationale:
      "A leaf split by a river-like channel, ending in a golden seed. It modernises the old crop-and-water story without an enclosing badge.",
    cues: ["River", "Seed", "Origin"],
    typography: "industrial",
  },
  {
    id: "campus",
    number: "04",
    name: "Cultivate",
    primaryText: "Indus Best",
    descriptor: "MEGA FOOD PARK",
    rationale:
      "Four geometric leaves create a precise central drop in negative space—natural at first glance, engineered on closer inspection.",
    cues: ["Precision", "Leaf", "Processing"],
    typography: "modern",
  },
  {
    id: "grainhouse",
    number: "05",
    name: "Harvest Drop",
    primaryText: "Indus Best",
    descriptor: "Mega Food Park",
    rationale:
      "A generous water drop carries a minimal sprout and field line, preserving the most memorable element of the existing identity.",
    cues: ["Drop", "Growth", "Familiar"],
    typography: "heritage",
  },
  {
    id: "orbit",
    number: "06",
    name: "Indus Cycle",
    primaryText: "INDUS BEST",
    descriptor: "MEGA FOOD PARK · RAIPUR",
    rationale:
      "Two leaves and a water drop rotate around a golden centre, expressing a complete farm-to-processing cycle with minimal forms.",
    cues: ["Circular", "Balanced", "Supply chain"],
    typography: "modern",
  },
  {
    id: "flowline",
    number: "07",
    name: "Riverleaf",
    primaryText: "Indus Best",
    descriptor: "Food infrastructure, connected.",
    rationale:
      "Three flowing lanes bend into a leaf silhouette. It recalls the old blue field and green canopy while feeling faster and more technical.",
    cues: ["Flow", "Technical", "Progress"],
    typography: "modern",
  },
  {
    id: "indus-i",
    number: "08",
    name: "Drop I",
    primaryText: "INDUS",
    descriptor: "INDUS BEST MEGA FOOD PARK",
    rationale:
      "A minimal I monogram built around the original white drop and capped by a single leaf. Direct, recognisable, and strong on signage.",
    cues: ["Monogram", "Drop", "Architectural"],
    typography: "industrial",
  },
] as const satisfies readonly LogoConcept[]

function logoStyle(tone: LogoTone): CSSProperties {
  return {
    "--logo-main":
      tone === "forest" ? "var(--forest-foreground)" : "var(--primary)",
    "--logo-accent": "var(--cta)",
    "--logo-third": tone === "forest" ? "var(--aqua)" : "var(--aqua)",
    "--logo-cutout":
      tone === "forest" ? "var(--forest)" : "var(--background)",
  } as CSSProperties
}

function ConfluenceMark() {
  return (
    <>
      <path
        fill="var(--logo-main)"
        d="M32 5C24.2 16.7 13 29.2 13 41.2 13 52 21.5 59 32 59s19-7 19-17.8C51 29.2 39.8 16.7 32 5Z"
      />
      <path
        fill="var(--logo-third)"
        d="M32 13c7.4 5.1 13 11 16.7 17.7C41.5 30 35.9 27.1 32 22v-9Z"
      />
      <path
        fill="var(--logo-accent)"
        d="M31.5 22.5c-7.8 3.6-12.6 9-14.4 16.2 6.4-1.1 11.2-4.5 14.4-10.2v-6Z"
      />
      <path
        fill="var(--logo-cutout)"
        d="M32 30c-3.8 5.3-7.2 9.4-7.2 14.1a7.2 7.2 0 0 0 14.4 0C39.2 39.4 35.8 35.3 32 30Z"
      />
    </>
  )
}

function FieldworksMark() {
  return (
    <>
      <path
        fill="var(--logo-main)"
        d="M7 28C11.2 13.8 23.3 7.2 39.8 8c-3.6 10.7-12.2 17.4-25.9 20H7Z"
      />
      <path
        fill="var(--logo-accent)"
        d="M24.2 29.3C32.6 15.1 44.4 11 58 16.8 51.5 27.1 41.4 31.2 27.8 29.9l-3.6-.6Z"
      />
      <path
        fill="var(--logo-third)"
        d="M31.5 27C24.8 36.6 20 42.8 20 49.4 20 57 25.4 61 31.5 61S43 57 43 49.4C43 42.8 38.2 36.6 31.5 27Z"
      />
      <path fill="var(--logo-cutout)" d="M30 38h3v14h-3z" />
    </>
  )
}

function GatewayMark() {
  return (
    <>
      <path
        fill="var(--logo-main)"
        d="M7 36C10.5 18.2 22.6 8.8 43.4 7c-2.2 20.1-13.2 31.8-33 35L7 36Z"
      />
      <path
        fill="var(--logo-cutout)"
        d="M12.5 33.8c10.4-7.8 19.4-12.7 27-14.8-8.7 4.7-16.4 11.9-23.2 21.6l-3.8-6.8Z"
      />
      <path
        fill="var(--logo-third)"
        d="M38 23c6.3 8.8 10.5 14.5 10.5 20.6C48.5 51 43.5 56 37 56s-11.5-5-11.5-12.4C25.5 37.5 29.7 31.8 36 23l1-1.4 1 1.4Z"
      />
      <circle cx="37" cy="44" r="4.5" fill="var(--logo-accent)" />
    </>
  )
}

function CampusMark() {
  return (
    <>
      <path
        fill="var(--logo-main)"
        d="M30 30C15.6 29.4 8.3 22.1 8 8c14.1.3 21.4 7.6 22 22Z"
      />
      <path
        fill="var(--logo-third)"
        d="M34 30C34.6 15.6 41.9 8.3 56 8c-.3 14.1-7.6 21.4-22 22Z"
      />
      <path
        fill="var(--logo-third)"
        d="M30 34C29.4 48.4 22.1 55.7 8 56c.3-14.1 7.6-21.4 22-22Z"
      />
      <path
        fill="var(--logo-main)"
        d="M34 34c14.4.6 21.7 7.9 22 22-14.1-.3-21.4-7.6-22-22Z"
      />
      <path
        fill="var(--logo-accent)"
        d="M32 20.5c-6.8 8.7-10.2 14.7-10.2 20.1A10.2 10.2 0 0 0 42.2 40.6C42.2 35.2 38.8 29.2 32 20.5Z"
      />
      <path
        fill="var(--logo-cutout)"
        d="M32 30c-2.8 4.1-4.2 7-4.2 9.3a4.2 4.2 0 0 0 8.4 0c0-2.3-1.4-5.2-4.2-9.3Z"
      />
    </>
  )
}

function GrainhouseMark() {
  return (
    <>
      <path
        fill="var(--logo-third)"
        d="M32 5C23.4 17.8 11 31.5 11 44.6 11 56.5 20.4 62 32 62s21-5.5 21-17.4C53 31.5 40.6 17.8 32 5Z"
      />
      <path
        fill="var(--logo-accent)"
        d="M15 45h34v7H15z"
      />
      <path
        fill="var(--logo-main)"
        d="M30.5 24h3v22h-3zM18 30c6.7-.2 11.5 3 14.5 9.5-6.7.2-11.5-3-14.5-9.5ZM46 23c-6.7-.2-11.5 3-14.5 9.5 6.7.2 11.5-3 14.5-9.5Z"
      />
    </>
  )
}

function OrbitMark() {
  return (
    <>
      <path
        fill="none"
        stroke="var(--logo-main)"
        strokeWidth="6"
        strokeLinecap="round"
        d="M48.5 50A24 24 0 0 1 11 35"
      />
      <path
        fill="var(--logo-main)"
        d="M31 31C16.5 30.5 9.2 23.1 9 9c14.2.2 21.5 7.5 22 22Z"
      />
      <path
        fill="var(--logo-accent)"
        d="M35 30c.5-13.3 7.3-20.1 20.5-20.5C55.1 22.7 48.3 29.5 35 30Z"
      />
      <path
        fill="var(--logo-third)"
        d="M34 28c-6.4 8.8-9.6 14.5-9.6 19.4a9.6 9.6 0 1 0 19.2 0C43.6 42.5 40.4 36.8 34 28Z"
      />
    </>
  )
}

function FlowlineMark() {
  return (
    <>
      <path
        fill="none"
        stroke="var(--logo-main)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 50h13c14 0 24-8 30-24"
      />
      <path
        fill="none"
        stroke="var(--logo-third)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 36h12c12 0 21-7 28-21"
      />
      <path
        fill="none"
        stroke="var(--logo-accent)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 22h11c8 0 15-4 21-12"
      />
      <path
        fill="var(--logo-main)"
        d="M35 34c14 .7 21.2 7.9 21.5 21.5C42.9 55.2 35.7 48 35 34Z"
      />
    </>
  )
}

function IndusIMark() {
  return (
    <>
      <path fill="var(--logo-main)" d="M12 9h40v10H12zM12 46h40v10H12z" />
      <path fill="var(--logo-main)" d="M24 19h16v27H24z" />
      <path
        fill="var(--logo-cutout)"
        d="M32 23c-4.3 6-6.5 10.1-6.5 13.5a6.5 6.5 0 0 0 13 0C38.5 33.1 36.3 29 32 23Z"
      />
      <path
        fill="var(--logo-accent)"
        d="M34 18C36.2 9.6 42.2 5.3 52 5c-.3 8.8-5.3 13.3-15 13.5L34 18Z"
      />
    </>
  )
}

export const dropIAlternates = [
  {
    id: "leaf-cap",
    label: "Leaf Cap",
    note: "A softer architectural I with the leaf acting as its upper serif.",
  },
  {
    id: "split-drop",
    label: "Split Drop",
    note: "Two structural halves hold the original drop in negative space.",
  },
  {
    id: "waterline",
    label: "Waterline",
    note: "A compact I crossed by an aqua current and a golden harvest point.",
  },
  {
    id: "canopy-i",
    label: "Canopy I",
    note: "Twin leaves form a protective canopy over a minimal water stem.",
  },
  {
    id: "indus-pillar",
    label: "Indus Pillar",
    note: "The most reduced option: one pillar, one drop, one rising leaf.",
  },
] as const

function DropIAlternatePaths({
  variant,
}: {
  variant: (typeof dropIAlternates)[number]["id"]
}) {
  switch (variant) {
    case "leaf-cap":
      return (
        <>
          <path
            fill="var(--logo-main)"
            d="M13 11h31v9H13zM20 20h17v27H20zM13 47h38v9H13z"
          />
          <path
            fill="var(--logo-cutout)"
            d="M28.5 25c-3.7 5.1-5.5 8.7-5.5 11.6a5.5 5.5 0 1 0 11 0c0-2.9-1.8-6.5-5.5-11.6Z"
          />
          <path
            fill="var(--logo-accent)"
            d="M38 19C40.2 10.5 46.2 6.2 56 6c-.3 8.8-5.3 13.2-15 13.5L38 19Z"
          />
        </>
      )
    case "split-drop":
      return (
        <>
          <path
            fill="var(--logo-main)"
            d="M10 8h20v11H10zM10 45h20v11H10zM18 19h12v26H18z"
          />
          <path
            fill="var(--logo-third)"
            d="M34 8h20v11H34zM34 45h20v11H34zM34 19h12v26H34z"
          />
          <path
            fill="var(--logo-cutout)"
            d="M32 20.5c-6.2 8.1-9.3 13.7-9.3 18.3a9.3 9.3 0 1 0 18.6 0c0-4.6-3.1-10.2-9.3-18.3Z"
          />
          <circle cx="32" cy="39" r="3.8" fill="var(--logo-accent)" />
        </>
      )
    case "waterline":
      return (
        <>
          <path fill="var(--logo-main)" d="M14 8h36v9H14zM14 47h36v9H14z" />
          <path fill="var(--logo-main)" d="M25 17h14v30H25z" />
          <path
            fill="var(--logo-third)"
            d="M8 29c8.5-4.2 16.8-4.2 25 0s16.7 4.2 25 0v8c-8.3 4.2-16.7 4.2-25 0s-16.5-4.2-25 0v-8Z"
          />
          <circle cx="32" cy="33" r="4.5" fill="var(--logo-accent)" />
        </>
      )
    case "canopy-i":
      return (
        <>
          <path
            fill="var(--logo-main)"
            d="M30 25C17.1 24.5 10.6 18 10.3 5.5 22.9 5.8 29.4 12.3 30 25Z"
          />
          <path
            fill="var(--logo-accent)"
            d="M34 25c.6-12.7 7.1-19.2 19.7-19.5C53.4 18 46.9 24.5 34 25Z"
          />
          <path fill="var(--logo-main)" d="M27 25h10v24H27zM16 49h32v9H16z" />
          <path
            fill="var(--logo-third)"
            d="M32 27c-4.5 6.1-6.7 10.2-6.7 13.5a6.7 6.7 0 1 0 13.4 0c0-3.3-2.2-7.4-6.7-13.5Z"
          />
        </>
      )
    case "indus-pillar":
      return (
        <>
          <rect
            x="23"
            y="8"
            width="18"
            height="48"
            rx="6"
            fill="var(--logo-main)"
          />
          <path
            fill="var(--logo-cutout)"
            d="M32 19c-4.8 6.7-7.2 11.2-7.2 14.8a7.2 7.2 0 0 0 14.4 0c0-3.6-2.4-8.1-7.2-14.8Z"
          />
          <path
            fill="var(--logo-accent)"
            d="M36 18C38.1 9.7 44 5.5 53.5 5.2 53.2 13.8 48.4 18 39 18.5L36 18Z"
          />
          <path fill="var(--logo-third)" d="M27 46h10v4H27z" />
        </>
      )
  }
}

export function DropIAlternateSymbol({
  variant,
  tone = "paper",
  className,
  title,
}: {
  variant: (typeof dropIAlternates)[number]["id"]
  tone?: LogoTone
  className?: string
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("shrink-0 overflow-visible", className)}
      style={logoStyle(tone)}
    >
      <DropIAlternatePaths variant={variant} />
    </svg>
  )
}

export function LogoSymbol({
  conceptId,
  tone = "paper",
  className,
  title,
}: {
  conceptId: string
  tone?: LogoTone
  className?: string
  title?: string
}) {
  const mark = (() => {
    switch (conceptId) {
      case "confluence":
        return <ConfluenceMark />
      case "fieldworks":
        return <FieldworksMark />
      case "gateway":
        return <GatewayMark />
      case "campus":
        return <CampusMark />
      case "grainhouse":
        return <GrainhouseMark />
      case "orbit":
        return <OrbitMark />
      case "flowline":
        return <FlowlineMark />
      case "indus-i":
        return <IndusIMark />
      default:
        return null
    }
  })()

  return (
    <svg
      viewBox="0 0 64 64"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("shrink-0 overflow-visible", className)}
      style={logoStyle(tone)}
    >
      {mark}
    </svg>
  )
}

function typographyClass(concept: LogoConcept) {
  if (concept.typography === "heritage") {
    return "font-heading font-semibold tracking-[-0.035em]"
  }
  if (concept.typography === "industrial") {
    return "font-sans font-bold tracking-[0.055em]"
  }
  return "font-sans font-semibold tracking-[-0.035em]"
}

export function LogoLockup({
  concept,
  tone = "paper",
  layout = "horizontal",
  className,
  symbolClassName,
  compact = false,
}: {
  concept: LogoConcept
  tone?: LogoTone
  layout?: LogoLayout
  className?: string
  symbolClassName?: string
  compact?: boolean
}) {
  const forest = tone === "forest"

  return (
    <div
      className={cn(
        "flex min-w-0",
        layout === "stacked"
          ? "flex-col items-center text-center"
          : "items-center text-left",
        compact ? "gap-2" : layout === "stacked" ? "gap-3" : "gap-3.5",
        className
      )}
    >
      <LogoSymbol
        conceptId={concept.id}
        tone={tone}
        className={cn(compact ? "size-9" : "size-14", symbolClassName)}
        title={`${concept.name} logo symbol`}
      />
      <div className="min-w-0">
        <div
          className={cn(
            "leading-none whitespace-nowrap",
            typographyClass(concept),
            compact ? "text-[0.8rem]" : "text-xl",
            forest ? "text-forest-foreground" : "text-foreground"
          )}
        >
          {concept.primaryText}
        </div>
        <div
          className={cn(
            "mt-1 truncate font-sans font-medium uppercase",
            compact
              ? "text-[0.48rem] tracking-[0.12em]"
              : "text-[0.62rem] tracking-[0.17em]",
            forest
              ? "text-forest-foreground/65"
              : "text-muted-foreground"
          )}
        >
          {concept.descriptor}
        </div>
      </div>
    </div>
  )
}
