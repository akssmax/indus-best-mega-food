import type { ReactNode } from "react"
import {
  FactoryIcon,
  PackageIcon,
  SnowflakeIcon,
  SproutIcon,
  ThermometerSnowflakeIcon,
  WarehouseIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

export type ProcessFlowIcon =
  | "frozen"
  | "chilled"
  | "iqf"
  | "belt"
  | "processing"
  | "campus"

export type ProcessStep = {
  title: string
  detail: string
  tone?: "primary" | "cta" | "aqua"
  icon?: ProcessFlowIcon
}

const lightTones = {
  primary: {
    well: "bg-primary/12 text-primary ring-primary/25",
    wash: "bg-card",
    selected: "ring-primary/35 bg-card",
    dot: "bg-primary",
    dotIdle: "bg-foreground/15 group-hover/step:bg-primary/40",
  },
  cta: {
    well: "bg-cta/15 text-cta ring-cta/30",
    wash: "bg-card",
    selected: "ring-cta/35 bg-card",
    dot: "bg-cta",
    dotIdle: "bg-foreground/15 group-hover/step:bg-cta/40",
  },
  aqua: {
    well: "bg-aqua/20 text-forest ring-aqua/35 dark:bg-aqua/35 dark:text-aqua dark:ring-aqua/50",
    wash: "bg-card",
    selected: "ring-aqua/40 bg-card dark:ring-aqua/45",
    dot: "bg-aqua",
    dotIdle: "bg-foreground/15 group-hover/step:bg-aqua/40 dark:group-hover/step:bg-aqua/50",
  },
} as const

const darkTones = {
  primary: {
    well: "bg-forest-foreground/35 text-forest-foreground ring-forest-foreground/55",
    wash: "bg-white/[0.04]",
    selected: "ring-forest-foreground/40 bg-white/[0.08]",
    dot: "bg-forest-foreground",
    dotIdle: "bg-forest-foreground/20 group-hover/step:bg-forest-foreground/45",
  },
  cta: {
    well: "bg-cta/35 text-cta-foreground ring-cta/50",
    wash: "bg-cta/[0.08]",
    selected: "ring-cta/45 bg-cta/[0.12]",
    dot: "bg-cta",
    dotIdle: "bg-forest-foreground/20 group-hover/step:bg-cta/50",
  },
  aqua: {
    well: "bg-aqua/35 text-aqua ring-aqua/50",
    wash: "bg-aqua/[0.08]",
    selected: "ring-aqua/45 bg-aqua/[0.12]",
    dot: "bg-aqua",
    dotIdle: "bg-forest-foreground/20 group-hover/step:bg-aqua/50",
  },
} as const

type ToneMap = typeof lightTones

function inferIcon(title: string, icon?: ProcessFlowIcon): ProcessFlowIcon {
  if (icon) return icon
  const t = title.toLowerCase()
  if (t.includes("frozen")) return "frozen"
  if (t.includes("chill")) return "chilled"
  if (t.includes("iqf")) return "iqf"
  if (t.includes("growing") || t.includes("belt")) return "belt"
  if (t.includes("primary") || t.includes("processing")) return "processing"
  if (t.includes("campus") || t.includes("central")) return "campus"
  return "belt"
}

const icons: Record<
  ProcessFlowIcon,
  (props: { className?: string }) => ReactNode
> = {
  frozen: (p) => <SnowflakeIcon {...p} strokeWidth={2.25} />,
  chilled: (p) => <ThermometerSnowflakeIcon {...p} strokeWidth={2.25} />,
  iqf: (p) => <PackageIcon {...p} strokeWidth={2.25} />,
  belt: (p) => <SproutIcon {...p} strokeWidth={2.25} />,
  processing: (p) => <FactoryIcon {...p} strokeWidth={2.25} />,
  campus: (p) => <WarehouseIcon {...p} strokeWidth={2.25} />,
}

function StepIcon({
  kind,
  palette,
  large,
  onDark,
}: {
  kind: ProcessFlowIcon
  palette: ToneMap[keyof ToneMap]
  large: boolean
  onDark: boolean
}) {
  const Icon = icons[kind]

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-xl ring-1",
        onDark
          ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]"
          : "shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        large ? "size-10" : "size-9",
        palette.well
      )}
    >
      <Icon
        className={cn("block shrink-0", large ? "size-5" : "size-4")}
        strokeWidth={onDark ? 2.5 : 2.25}
        aria-hidden
      />
    </span>
  )
}

export function ProcessFlow({
  steps,
  className,
  activeIndex,
  onSelect,
  size = "sm",
  surface = "light",
}: {
  steps: readonly ProcessStep[]
  className?: string
  activeIndex?: number
  onSelect?: (index: number) => void
  size?: "sm" | "lg"
  surface?: "light" | "dark"
}) {
  const large = size === "lg"
  const interactive = Boolean(onSelect)
  const onDark = surface === "dark"
  const toneMap = onDark ? darkTones : lightTones

  return (
    <ol className={cn("relative flex flex-col gap-2.5", className)}>
      {steps.map((step, index) => {
        const tone = step.tone ?? "primary"
        const palette = toneMap[tone]
        const kind = inferIcon(step.title, step.icon)
        const selected = activeIndex === index
        const Row = interactive ? "button" : "div"

        return (
          <li key={step.title}>
            <Row
              type={interactive ? "button" : undefined}
              onClick={interactive ? () => onSelect?.(index) : undefined}
              aria-current={selected ? "step" : undefined}
              className={cn(
                "group/step relative flex w-full items-center gap-3 text-left outline-none",
                large ? "gap-4 rounded-2xl px-3.5 py-3.5" : "rounded-2xl px-3 py-3",
                "ring-1 shadow-[0_4px_16px_rgba(15,43,29,0.06)]",
                onDark ? "ring-forest-foreground/15" : "ring-foreground/8",
                palette.wash,
                interactive &&
                  "min-h-11 touch-target hover-fine:ring-primary/20 focus-visible:ring-3 focus-visible:ring-ring/50",
                onDark && interactive && "hover-fine:ring-forest-foreground/25",
                selected && palette.selected
              )}
            >
              <StepIcon kind={kind} palette={palette} large={large} onDark={onDark} />

              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "block font-semibold",
                    onDark ? "text-forest-foreground" : "text-foreground",
                    large ? "text-sm" : "text-xs"
                  )}
                >
                  {step.title}
                </span>
                <span
                  className={cn(
                    "mt-0.5 block",
                    onDark ? "text-forest-foreground/80" : "text-muted-foreground",
                    large ? "text-sm leading-relaxed" : "text-sm leading-snug"
                  )}
                >
                  {step.detail}
                </span>
              </span>

              {interactive ? (
                <span
                  aria-hidden
                  className={cn(
                    "size-2 shrink-0 rounded-full",
                    selected ? palette.dot : palette.dotIdle
                  )}
                />
              ) : null}
            </Row>
          </li>
        )
      })}
    </ol>
  )
}
