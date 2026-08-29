import { useState, type ReactNode } from "react"
import { PlugZapIcon, WarehouseIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type CampusPinIcon = "sheds" | "utilities"

export type CampusPin = {
  label: string
  detail?: string
  x: string
  y: string
  tone?: "primary" | "cta" | "aqua"
  icon?: CampusPinIcon
}

const toneWell = {
  primary: "bg-primary/12 text-primary",
  cta: "bg-cta/15 text-cta",
  aqua: "bg-aqua/20 text-forest",
} as const

const toneDot = {
  primary: "bg-primary",
  cta: "bg-cta",
  aqua: "bg-aqua",
} as const

const pinIcons: Record<
  CampusPinIcon,
  (props: { className?: string }) => ReactNode
> = {
  sheds: WarehouseIcon,
  utilities: PlugZapIcon,
}

export function CampusHotspots({
  src,
  alt,
  pins,
  className,
}: {
  src: string
  alt: string
  pins: readonly CampusPin[]
  className?: string
}) {
  const [selected, setSelected] = useState<string | null>(pins[0]?.label ?? null)

  return (
    <div
      className={cn(
        "group/campus relative min-h-48 overflow-hidden rounded-2xl bg-muted",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        sizes="(min-width: 1024px) 42rem, 100vw"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover object-[center_40%]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-forest/50 via-transparent to-forest/10" />
      {pins.map((pin) => {
        const Icon = pin.icon ? pinIcons[pin.icon] : null
        const active = selected === pin.label
        return (
          <button
            key={pin.label}
            type="button"
            aria-pressed={active}
            onClick={() => setSelected(pin.label)}
            className={cn(
              "absolute z-10 min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation text-left outline-none transition-opacity duration-200 focus-visible:ring-3 focus-visible:ring-ring/50",
              "lg:opacity-0 lg:pointer-events-none",
              "lg:group-hover/campus:opacity-100 lg:group-hover/campus:pointer-events-auto",
              "lg:group-hover/card:opacity-100 lg:group-hover/card:pointer-events-auto",
              "lg:focus-visible:opacity-100 lg:focus-visible:pointer-events-auto"
            )}
            style={{ left: pin.x, top: pin.y }}
          >
            <span
              className={cn(
                "flex items-center gap-2 rounded-full bg-background/95 py-1.5 pr-3 pl-1.5 shadow-[0_8px_24px_rgba(15,43,29,0.18)] ring-1 ring-foreground/10 backdrop-blur-sm",
                active && "ring-2 ring-cta"
              )}
            >
              {Icon ? (
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full",
                    toneWell[pin.tone ?? "cta"]
                  )}
                >
                  <Icon className="size-3.5" />
                </span>
              ) : (
                <span
                  className={cn(
                    "ml-1 size-2.5 shrink-0 rounded-full",
                    toneDot[pin.tone ?? "cta"]
                  )}
                />
              )}
              <span>
                <span className="block text-xs font-semibold text-foreground">
                  {pin.label}
                </span>
                {pin.detail && active ? (
                  <span className="block text-xs text-muted-foreground">
                    {pin.detail}
                  </span>
                ) : null}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
