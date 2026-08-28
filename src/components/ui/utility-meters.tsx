import type { ReactNode } from "react"
import {
  DropletsIcon,
  RecycleIcon,
  ScaleIcon,
  SnowflakeIcon,
  WarehouseIcon,
} from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

export type UtilityMeterIcon =
  | "water"
  | "effluent"
  | "weighbridge"
  | "cold"
  | "warehouse"

export type UtilityMeter = {
  label: string
  value: string
  fill: number
  tone?: "primary" | "cta" | "aqua"
  icon?: UtilityMeterIcon
}

const tones = {
  primary: {
    well: "bg-primary/12 text-primary ring-primary/25",
    wash: "bg-primary/[0.04]",
    fill: "bg-primary",
    glow: "shadow-[0_0_12px_color-mix(in_oklch,var(--primary)_35%,transparent)]",
  },
  cta: {
    well: "bg-cta/15 text-cta ring-cta/30",
    wash: "bg-cta/[0.05]",
    fill: "bg-cta",
    glow: "shadow-[0_0_12px_color-mix(in_oklch,var(--cta)_35%,transparent)]",
  },
  aqua: {
    well: "bg-aqua/20 text-forest ring-aqua/35",
    wash: "bg-aqua/[0.08]",
    fill: "bg-aqua",
    glow: "shadow-[0_0_12px_color-mix(in_oklch,var(--aqua)_40%,transparent)]",
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease },
  },
}

const barVariants = {
  hidden: { scaleX: 0, opacity: 0.4 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.85, ease, delay: 0.12 },
  },
}

const iconLoops = {
  water: {
    y: [0, -2, 0],
    transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" as const },
  },
  effluent: {
    rotate: [0, 8, 0, -8, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
  },
  weighbridge: {
    scale: [1, 1.06, 1],
    transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const },
  },
  cold: {
    rotate: [0, -6, 6, 0],
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const },
  },
  warehouse: {
    y: [0, -1.5, 0],
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const },
  },
}

function inferIcon(label: string, icon?: UtilityMeterIcon): UtilityMeterIcon {
  if (icon) return icon
  const t = label.toLowerCase()
  if (t.includes("water")) return "water"
  if (t.includes("etp") || t.includes("stp") || t.includes("effluent")) return "effluent"
  if (t.includes("weigh")) return "weighbridge"
  if (t.includes("cold")) return "cold"
  if (t.includes("warehouse") || t.includes("dry")) return "warehouse"
  return "water"
}

const icons: Record<
  UtilityMeterIcon,
  (props: { className?: string }) => ReactNode
> = {
  water: (p) => <DropletsIcon {...p} strokeWidth={2.25} />,
  effluent: (p) => <RecycleIcon {...p} strokeWidth={2.25} />,
  weighbridge: (p) => <ScaleIcon {...p} strokeWidth={2.25} />,
  cold: (p) => <SnowflakeIcon {...p} strokeWidth={2.25} />,
  warehouse: (p) => <WarehouseIcon {...p} strokeWidth={2.25} />,
}

function MeterIcon({
  kind,
  tone,
  reduced,
}: {
  kind: UtilityMeterIcon
  tone: keyof typeof tones
  reduced: boolean | null
}) {
  const Icon = icons[kind]
  const palette = tones[tone]

  const content = (
    <span
      className={cn(
        "relative flex size-9 shrink-0 items-center justify-center rounded-xl ring-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]",
        palette.well
      )}
    >
      <Icon className="size-4" />
    </span>
  )

  if (reduced) return content

  return (
    <motion.span
      className="relative flex shrink-0"
      animate={iconLoops[kind]}
      style={{ transformOrigin: "center" }}
    >
      {content}
    </motion.span>
  )
}

function MeterBar({
  fill,
  tone,
  reduced,
}: {
  fill: number
  tone: keyof typeof tones
  reduced: boolean | null
}) {
  const palette = tones[tone]
  const width = `${Math.min(100, Math.max(8, fill))}%`

  if (reduced) {
    return (
      <span
        className={cn("block h-full rounded-full", palette.fill)}
        style={{ width }}
      />
    )
  }

  return (
    <motion.span
      className={cn(
        "block h-full origin-left rounded-full",
        palette.fill,
        palette.glow
      )}
      custom={fill}
      variants={barVariants}
      style={{ width }}
    />
  )
}

export function UtilityMeters({
  items,
  className,
}: {
  items: readonly UtilityMeter[]
  className?: string
}) {
  const reduce = useReducedMotion()

  const List = reduce ? "ul" : motion.ul
  const listProps = reduce
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.35 },
        variants: listVariants,
      }

  return (
    <List className={cn("flex flex-col gap-2.5", className)} {...listProps}>
      {items.map((item) => {
        const tone = item.tone ?? "primary"
        const palette = tones[tone]
        const kind = inferIcon(item.label, item.icon)
        const Item = reduce ? "li" : motion.li

        return (
          <Item
            key={item.label}
            {...(reduce ? {} : { variants: rowVariants })}
          >
            <button
              type="button"
              className={cn(
                "group/meter touch-target flex min-h-12 w-full items-center gap-3 rounded-2xl px-3 py-3 text-left outline-none",
                "ring-1 ring-foreground/8 shadow-[0_4px_16px_rgba(15,43,29,0.05)] transition-all",
                palette.wash,
                "hover-fine:-translate-y-0.5 hover-fine:shadow-[0_10px_24px_rgba(15,43,29,0.09)] hover-fine:ring-primary/20 focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.99]"
              )}
            >
              <MeterIcon kind={kind} tone={tone} reduced={reduce} />

              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="font-heading text-sm font-semibold text-foreground">
                    {item.value}
                  </span>
                </span>
                <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-muted/80">
                  <MeterBar fill={item.fill} tone={tone} reduced={reduce} />
                </span>
              </span>
            </button>
          </Item>
        )
      })}
    </List>
  )
}
