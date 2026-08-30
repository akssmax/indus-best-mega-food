import type { ReactNode } from "react"
import {
  DropletsIcon,
  RecycleIcon,
  ScaleIcon,
  SnowflakeIcon,
  WarehouseIcon,
} from "lucide-react"

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

const lightTones = {
  primary: {
    well: "bg-primary/12 text-primary ring-primary/25",
    wash: "bg-primary/[0.04]",
    fill: "bg-primary",
  },
  cta: {
    well: "bg-cta/15 text-cta ring-cta/30",
    wash: "bg-cta/[0.05]",
    fill: "bg-cta",
  },
  aqua: {
    well: "bg-aqua/20 text-forest ring-aqua/35 dark:bg-aqua/35 dark:text-aqua dark:ring-aqua/50",
    wash: "bg-aqua/[0.08]",
    fill: "bg-aqua",
  },
} as const

const darkTones = {
  primary: {
    well: "bg-forest-foreground/20 text-forest-foreground ring-forest-foreground/40",
    wash: "bg-forest-foreground/[0.06]",
    fill: "bg-forest-foreground/85",
  },
  cta: {
    well: "bg-cta/35 text-cta-foreground ring-cta/50",
    wash: "bg-cta/[0.08]",
    fill: "bg-cta",
  },
  aqua: {
    well: "bg-aqua/35 text-aqua ring-aqua/50",
    wash: "bg-aqua/[0.08]",
    fill: "bg-aqua",
  },
} as const

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

export function UtilityMeters({
  items,
  className,
  surface = "light",
}: {
  items: readonly UtilityMeter[]
  className?: string
  surface?: "light" | "dark"
}) {
  const onDark = surface === "dark"
  const toneMap = onDark ? darkTones : lightTones

  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item) => {
        const tone = item.tone ?? "primary"
        const palette = toneMap[tone]
        const kind = inferIcon(item.label, item.icon)
        const Icon = icons[kind]
        const width = `${Math.min(100, Math.max(8, item.fill))}%`

        return (
          <li key={item.label}>
            <button
              type="button"
              className={cn(
                "group/meter touch-target flex min-h-12 w-full items-center gap-3 rounded-2xl px-3 py-3 text-left outline-none",
                "ring-1 shadow-[0_4px_16px_rgba(15,43,29,0.05)]",
                onDark ? "ring-forest-foreground/15" : "ring-foreground/8",
                palette.wash,
                "hover-fine:ring-primary/20 focus-visible:ring-3 focus-visible:ring-ring/50",
                onDark && "hover-fine:ring-forest-foreground/25"
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-xl ring-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
                  palette.well
                )}
              >
                <Icon className="size-4" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span
                    className={cn(
                      "text-xs font-medium",
                      onDark ? "text-forest-foreground/80" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "font-heading text-sm font-semibold",
                      onDark ? "text-forest-foreground" : "text-foreground"
                    )}
                  >
                    {item.value}
                  </span>
                </span>
                <span
                  className={cn(
                    "mt-2 block h-1.5 overflow-hidden rounded-full",
                    onDark ? "bg-forest-foreground/15" : "bg-muted/80"
                  )}
                >
                  <span
                    className={cn("block h-full rounded-full", palette.fill)}
                    style={{ width }}
                  />
                </span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
