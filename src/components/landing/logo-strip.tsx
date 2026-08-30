import { motion, useReducedMotion } from "framer-motion"

import { landing } from "@/content/landing"
import { Reveal } from "@/components/landing/motion"
import { PatternBand, WaveEdge } from "@/components/ui/brand-pattern"
import { bandBg, bandWave } from "@/lib/section-band"
import { landingImageSizes } from "@/lib/media"
import { cn } from "@/lib/utils"

const markEase = [0.22, 1, 0.36, 1] as const

function initials(name: string) {
  return name
    .split(/[\s&/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function ClientMark({
  name,
  logo,
  tone = "default",
  compact = false,
}: {
  name: string
  logo?: string
  tone?: "default" | "forest"
  compact?: boolean
}) {
  const reduce = useReducedMotion()

  const content = logo ? (
    <img
      src={logo}
      alt={name}
      width={184}
      height={40}
      sizes={landingImageSizes.logo}
      loading="lazy"
      decoding="async"
      className={cn(
        "w-auto object-contain object-left",
        compact
          ? "h-7 max-w-[8.5rem] sm:h-8 sm:max-w-[9.5rem]"
          : "h-9 max-w-[10.5rem] sm:h-10 sm:max-w-[11.5rem]",
        tone === "forest"
          ? "brightness-0 invert opacity-80"
          : "dark:brightness-[1.14] dark:contrast-[1.06]"
      )}
    />
  ) : (
    <>
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 font-heading text-xs font-semibold tracking-wide text-primary">
        {initials(name)}
      </span>
      <span className="whitespace-nowrap font-heading text-sm font-semibold tracking-tight text-foreground/70">
        {name}
      </span>
    </>
  )

  if (reduce) {
    return (
      <span
        className={cn(
          "flex shrink-0 items-center gap-3 px-2",
          compact ? "h-10" : "h-14"
        )}
      >
        {content}
      </span>
    )
  }

  return (
    <motion.span
      className={cn(
        "flex shrink-0 cursor-default items-center gap-3 px-2",
        compact ? "h-10" : "h-14"
      )}
      whileHover={{ scale: 1.06, y: -3 }}
      transition={{ duration: 0.28, ease: markEase }}
    >
      {content}
    </motion.span>
  )
}

export function ClientMarquee({
  label,
  items,
  showPattern = false,
  showLabel = true,
  tone = "default",
  compact = false,
  className,
}: {
  label: string
  items?: readonly { name: string; logo?: string }[]
  showPattern?: boolean
  showLabel?: boolean
  tone?: "default" | "forest"
  compact?: boolean
  className?: string
}) {
  const { clients } = landing
  const marks = items ?? clients.items

  if (marks.length === 0) return null

  const loop = [...marks, ...marks]

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {showPattern ? (
        <PatternBand
          variant="flow"
          className="pointer-events-none absolute inset-0 text-primary/15"
          patternClassName="opacity-[0.06]"
        />
      ) : null}
      <div className={cn("relative z-10 w-full", compact ? "py-2" : "py-5")}>
        {showLabel ? (
          <Reveal when="mount" delay={0.42}>
            <p
              className={cn(
                "text-center text-xs font-medium tracking-[0.22em] uppercase",
                compact ? "mb-3" : "mb-4",
                tone === "forest"
                  ? "text-forest-foreground/50"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </p>
          </Reveal>
        ) : null}
        <Reveal when="mount" delay={0.5}>
          <div
            className={cn(
              "relative w-full overflow-hidden",
              "[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
            )}
          >
            <div
              className={cn(
                "flex w-max items-center py-1 motion-safe:animate-logo-marquee motion-safe:hover-fine:[animation-play-state:paused]",
                compact ? "gap-8 sm:gap-10 lg:gap-12" : "gap-10 sm:gap-12 lg:gap-16"
              )}
            >
              {loop.map((client, index) => (
                <ClientMark
                  key={`${client.name}-${index}`}
                  name={client.name}
                  logo={client.logo}
                  tone={tone}
                  compact={compact}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export function LogoStrip({
  variant = "home",
  tone = "default",
}: {
  variant?: "home" | "plain" | "minimal"
  tone?: "default" | "forest"
}) {
  const { clients } = landing
  const isHome = variant === "home"
  const isMinimal = variant === "minimal"

  if (clients.items.length === 0) return null

  if (isMinimal) {
    const marks = tone === "forest" ? clients.forestItems : clients.items

    return (
      <section aria-label={clients.label} className="relative overflow-hidden">
        <ClientMarquee
          label={clients.label}
          items={marks}
          tone={tone}
          compact
        />
      </section>
    )
  }

  if (isHome) {
    return (
      <>
        <section
          aria-label={clients.label}
          className="relative overflow-hidden bg-card dark:bg-background"
        >
          <ClientMarquee label={clients.label} showPattern />
        </section>
        <WaveEdge
          position="bottom"
          className={cn(
            "relative z-[1] -mt-px block",
            bandBg.background,
            bandWave.card
          )}
        />
      </>
    )
  }

  return (
    <section
      aria-label={clients.label}
      className="relative overflow-hidden rounded-full border border-border bg-card dark:bg-background"
    >
      <ClientMarquee label={clients.label} />
    </section>
  )
}
