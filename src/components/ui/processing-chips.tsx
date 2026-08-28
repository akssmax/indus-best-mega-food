import { useState, type ReactNode } from "react"
import { PackageIcon, SnowflakeIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type ProcessingChipIcon = "tomato" | "mango" | "iqf" | "pack"

export type ProcessingChip = {
  label: string
  hint: string
  tone?: "primary" | "cta" | "aqua"
  icon?: ProcessingChipIcon
}

const tones = {
  primary: {
    well: "bg-primary/12 text-primary",
    ring: "ring-primary/30",
    wash: "bg-primary/8",
  },
  cta: {
    well: "bg-cta/15 text-cta",
    ring: "ring-cta/30",
    wash: "bg-cta/10",
  },
  aqua: {
    well: "bg-aqua/20 text-forest",
    ring: "ring-aqua/40",
    wash: "bg-secondary",
  },
} as const

function TomatoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <ellipse cx="12" cy="14.2" rx="7.4" ry="6.6" fill="#C45C26" />
      <path
        d="M12 8.6c.4-2.6 2.2-4.2 4.4-4.8-2.2.2-4 .9-5.2 2.4C10 4.7 8.1 4 5.9 3.8 8.2 4.4 10 6 10.4 8.6"
        fill="#1F4D32"
      />
      <path
        d="M12 9.2c1.8-1.8 3.8-2.4 5.4-2.2"
        stroke="#1F4D32"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MangoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M9.2 20.6c-2.6-1.2-4.2-4-3.6-7.2.8-4.2 4.2-7.8 8.4-8.2 2.8-.3 5.2 1.2 5.8 3.8.9 3.6-1 7.4-4.2 9.4-2.2 1.4-4.6 1.8-6.4 2.2Z"
        fill="#D97706"
      />
      <path
        d="M14.4 5.2c.5-1.6 1.8-2.6 3.4-3"
        stroke="#1F4D32"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M16.6 3.4c.8.2 1.6 1.2 1.6 2.2"
        stroke="#1F4D32"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

const icons: Record<
  ProcessingChipIcon,
  (props: { className?: string }) => ReactNode
> = {
  tomato: TomatoIcon,
  mango: MangoIcon,
  iqf: SnowflakeIcon,
  pack: PackageIcon,
}

function iconFromLabel(label: string): ProcessingChipIcon {
  const key = label.toLowerCase()
  if (key.includes("tomato")) return "tomato"
  if (key.includes("mango")) return "mango"
  if (key.includes("iqf") || key.includes("freeze")) return "iqf"
  return "pack"
}

export function ProcessingChips({
  items,
  className,
}: {
  items: readonly ProcessingChip[]
  className?: string
}) {
  const [active, setActive] = useState(0)
  const current = items[active] ?? items[0]
  const tone = tones[current?.tone ?? "primary"]
  const CurrentIcon = current
    ? icons[current.icon ?? iconFromLabel(current.label)]
    : PackageIcon

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {current ? (
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl px-3 py-2.5 ring-1 transition-colors",
            tone.wash,
            tone.ring
          )}
        >
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-xl",
              tone.well
            )}
          >
            <CurrentIcon className="size-5" />
          </span>
          <span>
            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Active line
            </p>
            <p className="font-heading text-sm font-semibold">{current.label}</p>
            <p className="text-xs text-muted-foreground">{current.hint}</p>
          </span>
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-2">
        {items.map((item, index) => {
          const selected = index === active
          const itemTone = tones[item.tone ?? "primary"]
          const Icon = icons[item.icon ?? iconFromLabel(item.label)]
          return (
            <button
              key={item.label}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(index)}
              className={cn(
                "flex min-h-11 touch-target items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium ring-1 transition-all outline-none",
                "focus-visible:ring-3 focus-visible:ring-ring/50",
                selected
                  ? cn("bg-card shadow-sm ring-2", itemTone.ring)
                  : "bg-muted/50 ring-transparent hover:bg-muted active:bg-muted/80"
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-lg",
                  itemTone.well
                )}
              >
                <Icon className="size-3.5" />
              </span>
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
