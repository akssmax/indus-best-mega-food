import type { ReactNode } from "react"

import { WaveEdge } from "@/components/ui/brand-pattern"
import { cn } from "@/lib/utils"

/** Surface tokens used for band backgrounds and wave fills. */
export type BandSurface =
  | "background"
  | "card"
  | "secondary-25"
  | "secondary-30"
  | "forest"

export const bandBg: Record<BandSurface, string> = {
  background: "bg-background",
  card: "bg-card",
  "secondary-25": "bg-secondary/25",
  "secondary-30": "bg-secondary/30",
  forest: "bg-forest",
}

export const bandWave: Record<BandSurface, string> = {
  background: "text-background",
  card: "text-card",
  "secondary-25": "text-secondary/25",
  "secondary-30": "text-secondary/30",
  forest: "text-forest",
}

type SectionBandProps = {
  /** Background colour of this band. */
  tone: BandSurface
  /** Surface above — omit when identical to `tone` or when the prior section already matches. */
  from?: BandSurface
  /** Surface below — omit when identical to `tone` or when the next section handles its own entry wave. */
  to?: BandSurface
  /** Skip wave edges — flat band join for alternate landing skins. */
  flat?: boolean
  children: ReactNode
  className?: string
}

function topWaveClasses(from: BandSurface, tone: BandSurface) {
  // Leaving forest into a lighter band — forest bridge, destination tone in the scallops.
  if (from === "forest" && tone !== "forest") {
    return cn(bandBg.forest, bandWave[tone])
  }

  // Entering forest — previous surface on the wrapper, forest in the fill.
  if (tone === "forest") {
    return cn(bandBg[from], bandWave.forest)
  }

  // Entering a tinted band: previous surface on the wrapper, destination tone in the scallops.
  if (tone === "secondary-25" || tone === "secondary-30") {
    return cn(bandBg[from], bandWave[tone])
  }

  return cn(bandBg[from], bandWave[tone])
}

function bottomWaveClasses(to: BandSurface, tone: BandSurface) {
  // Leaving forest into a lighter band — next surface on the wrapper, forest in the fill.
  if (tone === "forest" && to !== "forest") {
    return cn(bandBg[to], bandWave.forest)
  }

  // Hand off to the next section's top wave — avoid a flat double bridge.
  if (to === "forest" || to === "secondary-30") {
    return cn(bandBg[tone], bandWave[tone])
  }

  if (tone === "forest") {
    return cn(bandBg.forest, bandWave.forest)
  }

  return cn(bandBg[to], bandWave[tone])
}

/**
 * Wraps a tinted section with at most one wave at each edge.
 * Prefer a single `from` OR `to` — not both to the same surface (that doubles the scallops).
 * Let the next section supply `from` when it starts a different tone.
 */
export function SectionBand({
  tone,
  from,
  to,
  flat = false,
  children,
  className,
}: SectionBandProps) {
  const showTop = !flat && from != null && from !== tone
  const showBottom = !flat && to != null && to !== tone

  return (
    <>
      {showTop ? (
        <WaveEdge
          className={cn(
            "relative z-[1] -mt-px -mb-px block",
            topWaveClasses(from!, tone)
          )}
        />
      ) : null}
      <div className={cn(bandBg[tone], className)}>{children}</div>
      {showBottom ? (
        <WaveEdge
          position="bottom"
          className={cn(
            "relative z-[1] -mt-px block",
            bottomWaveClasses(to!, tone)
          )}
        />
      ) : null}
    </>
  )
}

/** Top wave into a forest band (e.g. final CTA) — previous surface below, forest scallops in the fill. */
export function ForestBandBridge({ from }: { from: BandSurface }) {
  return (
    <WaveEdge
      className={cn(
        "relative z-[1] -mt-px -mb-px block",
        bandBg[from],
        bandWave.forest
      )}
    />
  )
}
