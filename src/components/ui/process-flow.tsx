import type { ReactNode } from "react"
import {
  FactoryIcon,
  PackageIcon,
  SnowflakeIcon,
  SproutIcon,
  ThermometerSnowflakeIcon,
  WarehouseIcon,
} from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

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

const tones = {
  primary: {
    well: "bg-primary/12 text-primary ring-primary/25",
    wash: "bg-primary/[0.04]",
    selected: "ring-primary/35 bg-primary/[0.07]",
  },
  cta: {
    well: "bg-cta/15 text-cta ring-cta/30",
    wash: "bg-cta/[0.05]",
    selected: "ring-cta/35 bg-cta/[0.07]",
  },
  aqua: {
    well: "bg-aqua/20 text-forest ring-aqua/35",
    wash: "bg-aqua/[0.08]",
    selected: "ring-aqua/40 bg-aqua/[0.1]",
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.04 },
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
  tone,
  large,
}: {
  kind: ProcessFlowIcon
  tone: keyof typeof tones
  large: boolean
}) {
  const Icon = icons[kind]
  const palette = tones[tone]

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-xl ring-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]",
        large ? "size-10" : "size-9",
        palette.well
      )}
    >
      <Icon
        className={cn(
          "block shrink-0",
          large ? "size-5" : "size-4"
        )}
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
}: {
  steps: readonly ProcessStep[]
  className?: string
  activeIndex?: number
  onSelect?: (index: number) => void
  size?: "sm" | "lg"
}) {
  const reduce = useReducedMotion()
  const large = size === "lg"
  const interactive = Boolean(onSelect)

  const List = reduce ? "ol" : motion.ol
  const listProps = reduce
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.35 },
        variants: listVariants,
      }

  return (
    <List
      className={cn("relative flex flex-col gap-2.5", className)}
      {...listProps}
    >
      {steps.map((step, index) => {
        const tone = step.tone ?? "primary"
        const palette = tones[tone]
        const kind = inferIcon(step.title, step.icon)
        const selected = activeIndex === index
        const Row = interactive ? "button" : "div"
        const Item = reduce ? "li" : motion.li

        return (
          <Item
            key={step.title}
            {...(reduce ? {} : { variants: rowVariants })}
          >
            <Row
              type={interactive ? "button" : undefined}
              onClick={interactive ? () => onSelect?.(index) : undefined}
              aria-current={selected ? "step" : undefined}
              className={cn(
                "group/step relative flex w-full items-center gap-3 text-left outline-none",
                large ? "gap-4 rounded-2xl px-3.5 py-3.5" : "rounded-2xl px-3 py-3",
                "ring-1 ring-foreground/8 shadow-[0_4px_16px_rgba(15,43,29,0.06)] transition-all",
                palette.wash,
                interactive &&
                  "min-h-11 touch-target hover-fine:-translate-y-0.5 hover-fine:shadow-[0_10px_24px_rgba(15,43,29,0.1)] hover-fine:ring-primary/20 focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.99]",
                selected && palette.selected
              )}
            >
              <StepIcon kind={kind} tone={tone} large={large} />

              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "block font-semibold text-foreground",
                    large ? "text-sm" : "text-xs"
                  )}
                >
                  {step.title}
                </span>
                <span
                  className={cn(
                    "mt-0.5 block text-muted-foreground",
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
                    "size-2 shrink-0 rounded-full transition-all",
                    selected
                      ? "bg-primary shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_18%,transparent)]"
                      : "bg-foreground/15 group-hover/step:bg-primary/40"
                  )}
                />
              ) : null}
            </Row>
          </Item>
        )
      })}
    </List>
  )
}
