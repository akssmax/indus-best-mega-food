import type { ComponentType } from "react"
import {
  ArchiveBoxIcon,
  ArrowPathRoundedSquareIcon,
  BeakerIcon,
  BoltIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  MapIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline"
import { ArrowRightIcon, SnowflakeIcon, ThermometerSnowflakeIcon } from "lucide-react"

"use client"

import { landing as landingDefaults } from "@/content/landing"
import { useLandingContent } from "@/lib/landing-content-context"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { facilityCategoryStyles } from "@/lib/facility-categories"
import { landingImageSizes } from "@/lib/media"
import { cn } from "@/lib/utils"

type CampusOverviewItem = (typeof landingDefaults.campusOverview.items)[number]
type CampusIcon = ComponentType<{ className?: string }>

const tonePalette = {
  primary: facilityCategoryStyles.processing,
  cta: facilityCategoryStyles.packaging,
  aqua: facilityCategoryStyles.cold,
} as const

const rowIcons: Record<
  CampusOverviewItem["title"],
  { icon: CampusIcon; details: readonly CampusIcon[] }
> = {
  "Serviced plots": {
    icon: MapIcon,
    details: [BoltIcon, BuildingStorefrontIcon, MapIcon],
  },
  "Plug-and-play sheds": {
    icon: BuildingOffice2Icon,
    details: [WrenchScrewdriverIcon, UserGroupIcon, BoltIcon],
  },
  "Shared processing": {
    icon: BeakerIcon,
    details: [BeakerIcon, ArrowPathRoundedSquareIcon, SnowflakeIcon],
  },
  "Cold and dry storage": {
    icon: ArchiveBoxIcon,
    details: [SnowflakeIcon, ArchiveBoxIcon, ThermometerSnowflakeIcon],
  },
}

export function CampusOverviewRow({
  item,
  index,
}: {
  item: CampusOverviewItem
  index: number
}) {
  const imageFirst = index % 2 === 0
  const palette = tonePalette[item.tone]
  const icons = rowIcons[item.title]
  const RowIcon = icons.icon

  return (
    <a
      href={item.cta.href}
      className={cn(
        "group/card block overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/8",
        "transition-[background-color,box-shadow,ring-color] duration-300",
        "hover:ring-foreground/14 hover:shadow-[0_20px_48px_rgba(15,43,29,0.14)]",
        "dark:hover:bg-band/70 dark:hover:ring-foreground/12",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      )}
      aria-label={`${item.cta.label} — ${item.title}`}
    >
      <article>
        <div
          className={cn(
            "grid lg:grid-cols-2 lg:items-stretch",
            !imageFirst && "lg:[&>*:first-child]:order-2"
          )}
        >
          <div className="relative aspect-[16/10] min-h-[14rem] overflow-hidden sm:aspect-[5/3] lg:aspect-auto lg:h-full lg:min-h-[22rem]">
            <img
              src={item.image.src}
              alt={item.image.alt}
              sizes={landingImageSizes.split}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 size-full object-cover object-center transition-transform duration-500 hover-fine:group-hover/card:scale-[1.03]"
            />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent lg:hidden"
            aria-hidden
          />
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl",
                palette.well
              )}
            >
              <RowIcon className="size-5" aria-hidden />
            </div>
            <h3 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              {item.title}
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {item.body}
          </p>
          <ul className="mt-6 space-y-2.5">
            {item.details.map((detail, detailIndex) => {
              const DetailIcon = icons.details[detailIndex]

              return (
                <li key={detail} className="flex gap-3 text-sm text-foreground/90">
                  {DetailIcon ? (
                    <span
                      className={cn(
                        "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg",
                        palette.item
                      )}
                    >
                      <DetailIcon className="size-3.5" aria-hidden />
                    </span>
                  ) : null}
                  <span className="min-w-0 pt-0.5">{detail}</span>
                </li>
              )
            })}
          </ul>
          <p className="mt-6 text-sm font-medium text-primary">{item.proof}</p>
          <span className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 group-hover/card:underline">
            {item.cta.label}
            <ArrowRightIcon
              className="size-4 transition-transform duration-300 group-hover/card:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
      </div>
      </article>
    </a>
  )
}

export function CampusOverviewList() {
  const landing = useLandingContent()
  const { campusOverview } = landing

  return (
    <div className="mt-12 space-y-6 lg:space-y-8">
      {campusOverview.items.map((item, index) => (
        <Reveal key={item.title} delay={index * 0.04}>
          <CampusOverviewRow item={item} index={index} />
        </Reveal>
      ))}
    </div>
  )
}

export function CampusOverview() {
  const landing = useLandingContent()
  const { campusOverview } = landing

  return (
    <Section id={campusOverview.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{campusOverview.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{campusOverview.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {campusOverview.body}
        </p>
      </Reveal>

      <CampusOverviewList />
    </Section>
  )
}
