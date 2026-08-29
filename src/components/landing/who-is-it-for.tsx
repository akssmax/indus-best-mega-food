import {
  ArrowTrendingUpIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"
import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

import { landing } from "@/content/landing"
import { SectionIntro } from "@/components/landing/feature-card"
import { SecondaryCtaLink } from "@/components/landing/secondary-cta"
import { Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger, motionEase } from "@/components/landing/motion"
import {
  PatternCorner,
  type PatternVariant,
} from "@/components/ui/brand-pattern"
import { SectionBand } from "@/lib/section-band"
import { cn } from "@/lib/utils"

const iconMap = {
  factory: BuildingStorefrontIcon,
  building: BuildingOffice2Icon,
  expand: ArrowTrendingUpIcon,
  sprout: SparklesIcon,
} as const

const cardPatterns: Record<keyof typeof iconMap, PatternVariant> = {
  factory: "vein",
  building: "ripple",
  expand: "scatter",
  sprout: "rain",
}

const cardHoverTransition = { duration: 0.45, ease: motionEase }

const cardMotionClass =
  "transition-[box-shadow,ring-color,opacity,background-color,color,transform,gap] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)]"

function AudienceCard({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-foreground/8 lg:p-8",
        cardMotionClass,
        "[@media(hover:hover)_and_(pointer:fine)]:hover:ring-primary/25"
      )}
      initial={false}
      whileHover={
        reduce
          ? undefined
          : {
              y: -4,
              boxShadow:
                "0 14px 32px -10px color-mix(in oklch, var(--primary) 16%, transparent), 0 6px 14px -6px color-mix(in oklch, var(--primary) 10%, transparent)",
            }
      }
      transition={cardHoverTransition}
    >
      {children}
    </motion.article>
  )
}

export function WhoIsItFor({ flat = false }: { flat?: boolean }) {
  const { audience } = landing

  return (
    <SectionBand tone="secondary-25" from="background" flat={flat}>
      <Section id={audience.id} className="bg-transparent">
        <Reveal>
          <SectionIntro
            eyebrow={audience.eyebrow}
            title={audience.title}
            body={audience.body}
          />
        </Reveal>

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {audience.items.map((item) => {
            const Icon = iconMap[item.icon]
            const pattern = cardPatterns[item.icon]

            return (
              <MotionItem key={item.title}>
                <AudienceCard>
                  <PatternCorner
                    variant={pattern}
                    position="top-right"
                    className={cn(
                      "text-aqua opacity-[0.09]",
                      cardMotionClass,
                      "[@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-[0.16]"
                    )}
                  />

                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-primary/45 to-transparent opacity-0",
                      cardMotionClass,
                      "[@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
                    )}
                  />

                  <div
                    className={cn(
                      "relative z-10 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10",
                      cardMotionClass,
                      "[@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-primary/15 [@media(hover:hover)_and_(pointer:fine)]:group-hover:ring-primary/25 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </div>

                  <p className="relative z-10 mt-5 font-heading text-xs font-medium tracking-[0.18em] text-primary uppercase">
                    {item.title}
                  </p>
                  <h3
                    className={cn(
                      "relative z-10 mt-2 font-heading text-xl font-semibold",
                      cardMotionClass,
                      "[@media(hover:hover)_and_(pointer:fine)]:group-hover:text-primary"
                    )}
                  >
                    {item.subtitle}
                  </h3>
                  <p className="relative z-10 mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                  <SecondaryCtaLink
                    href={item.cta.href}
                    className={cn(
                      "relative z-10 mt-5",
                      cardMotionClass,
                      "[@media(hover:hover)_and_(pointer:fine)]:group-hover:gap-2.5 [&_svg]:transition-transform [&_svg]:duration-450 [&_svg]:ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:[&_svg]:translate-x-0.5"
                    )}
                  >
                    {item.cta.label}
                  </SecondaryCtaLink>
                </AudienceCard>
              </MotionItem>
            )
          })}
        </Stagger>
      </Section>
    </SectionBand>
  )
}
