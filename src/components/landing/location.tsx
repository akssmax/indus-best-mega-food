"use client"

import { useState } from "react"
import {
  ArrowUpRight,
  PlaneIcon,
  RouteIcon,
  SproutIcon,
  TrainFrontIcon,
  type LucideIcon,
} from "lucide-react"

import { landing as landingDefaults } from "@/content/landing"
import { useLandingContent } from "@/lib/landing-content-context"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { googleMapsEmbed, googleMapsSearch } from "@/lib/maps"
import { SectionBand, type BandSurface } from "@/lib/section-band"
import { cn } from "@/lib/utils"

const benefitIcons: Record<
  (typeof landingDefaults.location.benefits)[number]["icon"],
  LucideIcon
> = {
  crop: SproutIcon,
  road: RouteIcon,
  rail: TrainFrontIcon,
  air: PlaneIcon,
}

export function Location({
  bandFrom = "background",
  embedded = false,
}: {
  bandFrom?: BandSurface | null
  embedded?: boolean
}) {
  const landing = useLandingContent()
  const { location: data } = landing
  const embedSrc = googleMapsEmbed(data.campusQuery, 14)
  const [mapEnabled, setMapEnabled] = useState(false)

  const content = (
    <Section
      id={data.id}
      className={cn("bg-transparent", embedded && "py-8 lg:py-10")}
    >
        <Reveal className="max-w-2xl">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{data.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{data.body}</p>
        </Reveal>

        <Reveal className="mt-8" delay={0.04}>
          <dl className="grid grid-cols-2 divide-x divide-y divide-border/70 overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8 sm:grid-cols-4 sm:divide-y-0">
            {data.facts.map((stat) => (
              <div key={stat.label} className="px-4 py-4 sm:px-5">
                <dt className="font-heading text-xl font-semibold text-primary sm:text-2xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {data.benefits.map((benefit) => {
              const Icon = benefitIcons[benefit.icon]
              return (
                <MotionItem key={benefit.title}>
                  <article className="flex h-full flex-col rounded-2xl bg-card p-5 ring-1 ring-foreground/8 sm:p-6">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-semibold">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {benefit.body}
                    </p>
                    {"tags" in benefit && benefit.tags ? (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {benefit.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full bg-secondary/80 px-3 py-1 text-xs font-medium text-foreground"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                </MotionItem>
              )
            })}
          </Stagger>

          <Reveal className="lg:sticky lg:top-24" delay={0.08}>
            <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10">
              {mapEnabled ? (
                <iframe
                  src={embedSrc}
                  width="100%"
                  height="520"
                  className="h-[min(70vh,36rem)] w-full border-0 lg:h-[36rem]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Indus Best Mega Food Park, Village Bemta–Sarora"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setMapEnabled(true)}
                  className="flex h-[min(70vh,36rem)] w-full flex-col items-center justify-center gap-2 bg-muted px-6 text-center lg:h-[36rem]"
                >
                  <span className="font-heading text-lg font-semibold">
                    View campus on Google Maps
                  </span>
                  <span className="max-w-sm text-sm text-muted-foreground">
                    Load the map for Village Bemta–Sarora, near Raipur.
                  </span>
                </button>
              )}
              <div className="flex items-center justify-between gap-3 border-t border-border/60 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                    The plant
                  </p>
                  <p className="truncate text-sm font-medium text-foreground">
                    {data.campusLabel}
                  </p>
                </div>
                <a
                  href={googleMapsSearch(data.campusQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 touch-target shrink-0 items-center gap-1 rounded-md px-2 text-sm font-medium text-primary underline-offset-4 hover:underline active:text-primary/80"
                >
                  Open
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
  )

  if (bandFrom == null) return content

  return (
    <SectionBand tone="secondary-25" from={bandFrom}>
      {content}
    </SectionBand>
  )
}
