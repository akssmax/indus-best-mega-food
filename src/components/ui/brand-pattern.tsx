import { useId, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export const patternVariants = [
  "rain",
  "bloom",
  "vein",
  "flow",
  "lattice",
  "hatch",
  "ripple",
  "scatter",
] as const

export type PatternVariant = (typeof patternVariants)[number]

const DROP =
  "M12 1.6C12 1.6 4.2 12.4 4.2 18.8c0 4.4 3.5 8 7.8 8s7.8-3.6 7.8-8C19.8 12.4 12 1.6 12 1.6Z"

function VeinLines() {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1"
      opacity="0.5"
    >
      <path d="M12 9.2v14" />
      <path d="M12 14 8.2 18" />
      <path d="M12 14 15.8 18" />
      <path d="M12 18.4 9 22" />
      <path d="M12 18.4 15 22" />
    </g>
  )
}

function Drop({
  x = 0,
  y = 0,
  scale = 1,
  rotate = 0,
}: {
  x?: number
  y?: number
  scale?: number
  rotate?: number
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) rotate(${rotate} 12 16)`}>
      <path d={DROP} />
    </g>
  )
}

function RippleSource({
  x,
  y,
  rings,
  coreScale,
}: {
  x: number
  y: number
  rings: readonly { scale: number; opacity: number }[]
  coreScale?: number
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {rings.map((ring) => (
        <g
          key={ring.scale}
          transform={`translate(-12 -16) scale(${ring.scale})`}
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth={1.1 / ring.scale}
          opacity={ring.opacity}
        >
          <path d={DROP} />
        </g>
      ))}
      {coreScale ? (
        <g transform={`translate(-12 -16) scale(${coreScale})`} opacity="0.95">
          <path d={DROP} />
        </g>
      ) : null}
    </g>
  )
}

function PatternTile({
  variant,
}: {
  variant: PatternVariant
}) {
  switch (variant) {
    case "rain":
      return (
        <>
          <Drop x={6} y={4} scale={0.72} rotate={-8} />
          <Drop x={32} y={38} scale={0.62} rotate={10} />
        </>
      )
    case "bloom":
      return (
        <>
          <circle cx="48" cy="48" r="5.5" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 48 48)`}>
              <Drop x={36} y={8} scale={0.85} />
            </g>
          ))}
        </>
      )
    case "vein":
      return (
        <>
          <g transform="translate(4 2) scale(0.72)">
            <path d={DROP} />
            <VeinLines />
          </g>
          <g transform="translate(36 2) scale(0.72) scale(-1 1) translate(-24 0)">
            <path d={DROP} />
            <VeinLines />
          </g>
          <g transform="translate(20 46) scale(0.58) rotate(180 12 16)">
            <path d={DROP} />
            <VeinLines />
          </g>
        </>
      )
    case "flow":
      return (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          opacity="0.55"
        >
          <path d="M-8 22 C8 14 24 30 40 22 S72 14 88 22" />
          <path d="M-8 38 C10 30 26 46 42 38 S74 30 88 38" />
          <path d="M-8 54 C12 46 28 62 44 54 S76 46 88 54" />
        </g>
      )
    case "lattice":
      return (
        <>
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="0.85"
            strokeLinejoin="round"
            opacity="0.38"
          >
            <path d="M32 4 L52 18 L52 50 L32 64 L12 50 L12 18 Z" />
            <path d="M32 4 L32 64" />
            <path d="M12 18 L52 50" />
            <path d="M52 18 L12 50" />
          </g>
          <Drop x={26} y={0} scale={0.48} />
          <Drop x={6} y={26} scale={0.44} rotate={180} />
          <Drop x={46} y={26} scale={0.44} rotate={180} />
          <Drop x={26} y={52} scale={0.48} />
        </>
      )
    case "hatch":
      return (
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="12"
          stroke="currentColor"
          strokeWidth="1.15"
        />
      )
    case "ripple":
      return (
        <RippleSource
          x={40}
          y={46}
          coreScale={0.48}
          rings={[
            { scale: 1.9, opacity: 0.26 },
            { scale: 1.48, opacity: 0.36 },
            { scale: 1.06, opacity: 0.48 },
          ]}
        />
      )
    case "scatter":
      return (
        <>
          <Drop x={2} y={6} scale={0.36} rotate={-18} />
          <Drop x={26} y={0} scale={0.3} rotate={24} />
          <Drop x={46} y={14} scale={0.38} rotate={-6} />
          <Drop x={10} y={38} scale={0.34} rotate={14} />
          <Drop x={34} y={32} scale={0.32} rotate={-22} />
          <Drop x={48} y={50} scale={0.36} rotate={8} />
        </>
      )
  }
}

const TILE = {
  rain: { width: 56, height: 72 },
  bloom: { width: 96, height: 96 },
  vein: { width: 64, height: 88 },
  flow: { width: 80, height: 48 },
  lattice: { width: 64, height: 72 },
  hatch: { width: 12, height: 12, patternTransform: "rotate(45)" },
  ripple: { width: 80, height: 88 },
  scatter: { width: 56, height: 64 },
} as const

export function BrandPattern({
  variant,
  className,
}: {
  variant: PatternVariant
  className?: string
}) {
  const rawId = useId()
  const id = `ibmfp-${variant}-${rawId.replace(/:/g, "")}`
  const tile = TILE[variant]

  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-current",
        className
      )}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={id}
          width={tile.width}
          height={tile.height}
          patternUnits="userSpaceOnUse"
          patternTransform={
            "patternTransform" in tile ? tile.patternTransform : undefined
          }
        >
          <g fill="currentColor">
            <PatternTile variant={variant} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

export function PatternBand({
  variant,
  className,
  patternClassName,
  children,
}: {
  variant: PatternVariant
  className?: string
  patternClassName?: string
  children?: ReactNode
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <BrandPattern
        variant={variant}
        className={cn("opacity-[0.14]", patternClassName)}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

const cornerMask = {
  "top-left": "linear-gradient(to bottom right, #000 14%, transparent 58%)",
  "top-right": "linear-gradient(to bottom left, #000 14%, transparent 58%)",
  "bottom-left": "linear-gradient(to top right, #000 14%, transparent 58%)",
  "bottom-right": "linear-gradient(to top left, #000 14%, transparent 58%)",
} as const

const cornerPosition = {
  "top-left": "left-0 top-0",
  "top-right": "right-0 top-0",
  "bottom-left": "left-0 bottom-0",
  "bottom-right": "right-0 bottom-0",
} as const

export type PatternCornerPosition = keyof typeof cornerMask

export function PatternCorner({
  variant,
  position = "top-right",
  size = "md",
  className,
}: {
  variant: PatternVariant
  position?: PatternCornerPosition
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const sizeClass = {
    sm: "size-28",
    md: "size-36 sm:size-40",
    lg: "size-44 sm:size-52",
  }[size]

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-0 overflow-hidden",
        cornerPosition[position],
        sizeClass,
        className
      )}
      style={{
        maskImage: cornerMask[position],
        WebkitMaskImage: cornerMask[position],
      }}
    >
      <BrandPattern variant={variant} />
    </div>
  )
}

export const waveEdgePath =
  "M0 32C120 10 200 58 320 42c108-15 152-44 284-30 126 13 166 50 298 34 120-13 174-52 316-32 84 11 138 36 222 20V72H0V32Z"

/** Mask that clips the bottom of hero photos to the WaveEdge silhouette. */
export function heroWaveImageMaskStyle() {
  const maskHeight = 500
  const waveBand = 72
  const waveOffset = maskHeight - waveBand
  const mask = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 ${maskHeight}" preserveAspectRatio="none">
      <defs>
        <mask id="m">
          <rect width="1440" height="${maskHeight}" fill="white"/>
          <g transform="translate(0,${waveOffset})">
            <path d="${waveEdgePath}" fill="black"/>
          </g>
        </mask>
      </defs>
      <rect width="1440" height="${maskHeight}" fill="white" mask="url(#m)"/>
    </svg>`
  )}")`

  return {
    WebkitMaskImage: mask,
    maskImage: mask,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  } as const
}

export function WaveEdge({
  position = "top",
  className,
}: {
  position?: "top" | "bottom"
  className?: string
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none block h-[clamp(1.75rem,3.5vw,4rem)] w-full shrink-0 leading-[0] [shape-rendering:geometricPrecision]",
        position === "bottom" && "rotate-180",
        className
      )}
    >
      <path fill="currentColor" d={waveEdgePath} />
    </svg>
  )
}

export function DropFlourish({
  className,
}: {
  className?: string
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 72 28"
      className={cn("h-7 w-[4.5rem] text-current", className)}
    >
      <g fill="currentColor">
        <g transform="translate(4 2) scale(0.42) rotate(-28 12 16)">
          <path d={DROP} />
        </g>
        <g transform="translate(24 0) scale(0.52)">
          <path d={DROP} />
        </g>
        <g transform="translate(46 3) scale(0.4) rotate(26 12 16)">
          <path d={DROP} />
        </g>
      </g>
    </svg>
  )
}

const GRAIN =
  "url(\"data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.9"/></svg>`
  ) +
  "\")"

export function FilmGrain({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay",
        className
      )}
      style={{ backgroundImage: GRAIN }}
    />
  )
}
