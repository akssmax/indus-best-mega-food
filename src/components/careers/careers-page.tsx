import {
  BeakerIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline"

import { careers as data } from "@/content/careers"
import { SectionIntro, featureGridClass } from "@/components/landing/feature-card"
import { ForestOceanCta } from "@/components/landing/forest-ocean-cta"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { PatternCorner } from "@/components/ui/brand-pattern"
import { cn } from "@/lib/utils"

const pillarIcons = [
  BeakerIcon,
  BuildingOffice2Icon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
] as const

export function CareersPageContent() {
  return (
    <>
      <Section className="relative overflow-hidden">
        <PatternCorner
          variant="bloom"
          position="top-right"
          size="lg"
          className="text-primary opacity-[0.1] dark:text-cta dark:opacity-[0.14]"
        />
        <PatternCorner
          variant="bloom"
          position="bottom-left"
          size="lg"
          className="text-primary opacity-[0.1] dark:text-cta dark:opacity-[0.14]"
        />
        <Reveal className="relative z-10">
          <SectionIntro
            eyebrow={data.intro.eyebrow}
            title={data.intro.title}
            body={data.intro.body}
          />
        </Reveal>
      </Section>

      <Section className="bg-muted/30">
        <Reveal>
          <SectionIntro
            eyebrow={data.pillars.eyebrow}
            title={data.pillars.title}
          />
        </Reveal>
        <Stagger className={cn(featureGridClass, "mt-10 lg:grid-cols-2")}>
          {data.pillars.items.map((item, index) => {
            const Icon = pillarIcons[index] ?? BriefcaseIcon
            return (
              <MotionItem key={item.title}>
                <article className="h-full rounded-2xl bg-card p-6 ring-1 ring-foreground/8 dark:bg-band">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </article>
              </MotionItem>
            )
          })}
        </Stagger>
      </Section>

      <ForestOceanCta
        eyebrow={<Eyebrow className="text-cta">{data.linkedIn.eyebrow}</Eyebrow>}
        title={data.linkedIn.title}
        body={data.linkedIn.body}
        footnote={data.linkedIn.note}
        primary={{ ...data.linkedIn.cta, morph: "factory", external: true }}
        secondary={{ ...data.linkedIn.contactCta, morph: "campus" }}
      />
    </>
  )
}
