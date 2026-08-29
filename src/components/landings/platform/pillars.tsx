import { ArrowRightIcon } from "lucide-react"

import { landing } from "@/content/landing"
import { landings } from "@/content/landings"
import { Reveal } from "@/components/landing/motion"
import { PlatformSection } from "@/components/landings/platform/section-shell"
import { cn } from "@/lib/utils"

const toneDot = {
  primary: "bg-primary",
  cta: "bg-cta",
  aqua: "bg-aqua",
} as const

const pillarBullets: Record<string, string[]> = {
  plots: [
    `${landing.campusOverview.items[0].metric} serviced plots ready to commission`,
    `${landing.campusOverview.items[1].metric} MSME sheds with utilities in place`,
    "Roads, water, power, and effluent treatment on site",
  ],
  processing: [
    "Tomato concentrate line · 12 MTPH",
    "Mango puree line · 6 MTPH",
    "IQF freeze line · 2 MT/H",
  ],
  cold: [
    "5,000 MT cold storage beside production",
    "12,000 MT dry bulk warehouse",
    "NH-53 access · rail at Tilda",
  ],
}

export function PlatformPillars() {
  const { pillars } = landings.platform

  return (
    <PlatformSection
      eyebrow={pillars.eyebrow}
      title={pillars.title}
      className="bg-background"
    >
      <div className="mt-12 space-y-6 lg:space-y-8">
        {pillars.items.map((pillar, index) => {
          const bullets = pillarBullets[pillar.id] ?? []
          const imageFirst = index % 2 === 0

          return (
            <Reveal key={pillar.id} delay={index * 0.04}>
              <article className="overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/8">
                <div
                  className={cn(
                    "grid items-center lg:grid-cols-2",
                    !imageFirst && "lg:[&>*:first-child]:order-2"
                  )}
                >
                  <div className="relative aspect-[16/10] min-h-[14rem] overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
                    <img
                      src={pillar.image.src}
                      alt={pillar.image.alt}
                      className="size-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent lg:hidden"
                      aria-hidden
                    />
                  </div>

                  <div className="p-6 sm:p-8 lg:p-10">
                    <span
                      aria-hidden
                      className={cn(
                        "inline-block size-2.5 rounded-full",
                        toneDot[pillar.tone]
                      )}
                    />
                    <h3 className="mt-4 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {pillar.body}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-sm text-foreground/90"
                        >
                          <span
                            aria-hidden
                            className={cn(
                              "mt-1.5 size-1.5 shrink-0 rounded-full",
                              toneDot[pillar.tone]
                            )}
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-sm font-medium text-primary">
                      {pillar.proof}
                    </p>
                    <a
                      href={pillar.cta.href}
                      className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {pillar.cta.label}
                      <ArrowRightIcon className="size-4" aria-hidden />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </PlatformSection>
  )
}
