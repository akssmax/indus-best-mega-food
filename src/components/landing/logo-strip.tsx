import { motion, useReducedMotion } from "framer-motion"

import { landing } from "@/content/landing"
import { Reveal } from "@/components/landing/motion"
import { PatternBand } from "@/components/ui/brand-pattern"
import { SectionBand } from "@/lib/section-band"
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

function ClientMark({ name, logo }: { name: string; logo?: string }) {
  const reduce = useReducedMotion()

  const content = logo ? (
    <img
      src={logo}
      alt={name}
      className="h-12 w-auto max-w-[13rem] object-contain object-left sm:h-[3.25rem] sm:max-w-[14rem]"
    />
  ) : (
    <>
      <span className="flex size-10 items-center justify-center rounded-lg bg-primary/12 font-heading text-xs font-semibold tracking-wide text-primary">
        {initials(name)}
      </span>
      <span className="whitespace-nowrap font-heading text-sm font-semibold tracking-tight text-foreground/70">
        {name}
      </span>
    </>
  )

  if (reduce) {
    return (
      <span className="flex h-16 shrink-0 items-center gap-3 px-2">
        {content}
      </span>
    )
  }

  return (
    <motion.span
      className="flex h-16 shrink-0 cursor-default items-center gap-3 px-2"
      whileHover={{ scale: 1.06, y: -3 }}
      transition={{ duration: 0.28, ease: markEase }}
    >
      {content}
    </motion.span>
  )
}

export function ClientMarquee({
  label,
  showPattern = false,
  className,
}: {
  label: string
  showPattern?: boolean
  className?: string
}) {
  const { clients } = landing

  if (clients.items.length === 0) return null

  const loop = [...clients.items, ...clients.items]

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {showPattern ? (
        <PatternBand
          variant="flow"
          className="pointer-events-none absolute inset-0 text-primary/15"
          patternClassName="opacity-[0.06]"
        />
      ) : null}
      <div className="relative z-10 w-full py-5">
        <Reveal when="mount" delay={0.42}>
          <p className="mb-4 text-center text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
            {label}
          </p>
        </Reveal>
        <Reveal when="mount" delay={0.5}>
          <div
            className={cn(
              "relative w-full overflow-hidden",
              "[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
            )}
          >
            <div className="flex w-max items-center gap-10 py-1 motion-safe:animate-logo-marquee motion-safe:hover-fine:[animation-play-state:paused] sm:gap-12 lg:gap-16">
              {loop.map((client, index) => (
                <ClientMark
                  key={`${client.name}-${index}`}
                  name={client.name}
                  logo={client.logo}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export function LogoStrip({ variant = "home" }: { variant?: "home" | "plain" }) {
  const { clients } = landing
  const isHome = variant === "home"

  if (clients.items.length === 0) return null

  if (isHome) {
    return (
      <SectionBand tone="card" to="background">
        <section aria-label={clients.label} className="relative overflow-hidden">
          <ClientMarquee label={clients.label} showPattern />
        </section>
      </SectionBand>
    )
  }

  return (
    <section
      aria-label={clients.label}
      className="relative overflow-hidden border-y border-border bg-card"
    >
      <ClientMarquee label={clients.label} />
    </section>
  )
}
