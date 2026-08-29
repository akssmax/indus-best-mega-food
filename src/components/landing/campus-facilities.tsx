import { landing } from "@/content/landing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionIntro } from "@/components/landing/feature-card"
import { Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { ProcessingCapacityTable } from "@/components/landing/processing-capabilities"
import { SectionBand } from "@/lib/section-band"
import {
  facilityCategories,
  facilityCategoryStyles,
} from "@/lib/facility-categories"
import { cn } from "@/lib/utils"

export function CampusFacilities({ flat = false }: { flat?: boolean }) {
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

        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2">
          {campusOverview.items.map((item) => (
            <MotionItem key={item.title}>
              <Card className="h-full gap-0 overflow-hidden p-0">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    className="absolute inset-0 size-full rounded-none object-cover transition-transform duration-500 hover-fine:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-md bg-cta px-2.5 py-1 text-xs font-semibold text-white">
                      {item.metric}
                      <span className="font-normal text-white/90">
                        {" "}
                        · {item.metricLabel}
                      </span>
                    </span>
                  </div>
                </div>
                <CardHeader className="pt-4">
                  <CardTitle className="font-heading text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </CardContent>
              </Card>
            </MotionItem>
          ))}
        </Stagger>

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
            {facilityCategories.map((category) => {
              const CategoryIcon = category.icon
              const palette = facilityCategoryStyles[category.style]

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
                          <li key={item.label} className="flex gap-3">
                            <span
                              className={cn(
                                "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg",
                                palette.item
                              )}
                            >
                              <ItemIcon className="size-3.5" aria-hidden />
                            </span>
                            <span className="min-w-0 pt-0.5">{item.label}</span>
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
