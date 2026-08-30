import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  /** @deprecated Path beam size — kept for API compatibility. */
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  className?: string
  style?: CSSProperties
  reverse?: boolean
  /** @deprecated Path offset — kept for API compatibility. */
  initialOffset?: number
  borderWidth?: number
  /** @deprecated Path radius — host `rounded-*` is inherited instead. */
  borderRadius?: number
}

export const BorderBeam = ({
  className,
  duration = 6,
  delay = 0,
  colorFrom = "var(--cta)",
  colorTo = "transparent",
  style,
  reverse = false,
  borderWidth = 1,
}: BorderBeamProps) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"
      style={
        {
          "--border-beam-width": `${borderWidth}px`,
        } as CSSProperties
      }
    >
      <div
        className={cn(
          "absolute top-1/2 left-1/2 aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2 motion-safe:animate-spin",
          className
        )}
        style={{
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          animationDirection: reverse ? "reverse" : "normal",
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 318deg, ${colorTo} 336deg, ${colorFrom} 360deg)`,
          ...style,
        }}
      />
    </div>
  )
}
