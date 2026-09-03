"use client"

import { useLandingContent } from "@/lib/landing-content-context"
import { SectionIntro } from "@/components/landing/feature-card"
import { Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { ProcessingCapacityTable } from "@/components/landing/processing-capabilities"
import { CampusOverviewList } from "@/components/landing/campus-overview"
import { SectionBand } from "@/lib/section-band"
import {
  facilityCategories,
  facilityCategoryStyles,
} from "@/lib/facility-categories"
import { cn } from "@/lib/utils"

/** Alternate white (primary) and gold (aqua) icon wells across facility cards. */
const facilityCardPalettes = [
  facilityCategoryStyles.processing,
  facilityCategoryStyles.cold,
] as const

export function CampusFacilities({ flat = false }: { flat?: boolean }) {
  const landing = useLandingContent()
  const { campusOverview, facilityCategories: facilityCopy, processingCapabilities } =
    landing

  return (
    <SectionBand tone="secondary-30" to="background" flat={flat}>
      <Section id={campusOverview.id} className="bg-transparent">
        <Reveal>
          <SectionIntro
            eyebrow={campusOverview.eyebrow}
            title={campusOverview.title}
            body={campusOverview.body}
          />
        </Reveal>

        <CampusOverviewList />

        <div id={facilityCopy.id} className="mt-16 scroll-mt-24 lg:mt-20">
          <Reveal>
            <SectionIntro
              eyebrow={facilityCopy.eyebrow}
              title={facilityCopy.title}
              body={facilityCopy.body}
              heading="h3"
            />
          </Reveal>

          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilityCategories.map((category, index) => {
              const CategoryIcon = category.icon
              const palette = facilityCardPalettes[index % facilityCardPalettes.length]

              return (
                <MotionItem key={category.title}>
                  <article className="h-full rounded-2xl bg-card p-6 ring-1 ring-foreground/8">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-xl",
                          palette.well
                        )}
                      >
                        <CategoryIcon className="size-5" aria-hidden />
                      </div>
                      <h4 className="font-heading text-lg font-semibold">
                        {category.title}
                      </h4>
                    </div>
                    <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                      {category.items.map((item) => {
                        const ItemIcon = item.icon

                        return (
                          <li key={item.label} className="flex items-center gap-3">
                            <span
                              className={cn(
                                "flex size-7 shrink-0 items-center justify-center rounded-lg",
                                palette.item
                              )}
                            >
                              <ItemIcon className="size-3.5" aria-hidden />
                            </span>
                            <span className="min-w-0">{item.label}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </article>
                </MotionItem>
              )
            })}
          </Stagger>
        </div>

        <Reveal className="mt-16 lg:mt-20" delay={0.04}>
          <div id={processingCapabilities.id} className="scroll-mt-24">
            <ProcessingCapacityTable heading="h3" />
          </div>
        </Reveal>
      </Section>
    </SectionBand>
  )
}
