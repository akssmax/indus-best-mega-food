import {
  ArrowsRightLeftIcon,
  ClockIcon,
  ScaleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"

import { landing } from "@/content/landing"
import { Section } from "@/components/landing/section"
import {
  FeatureCard,
  SectionIntro,
  featureGridClass,
} from "@/components/landing/feature-card"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

const iconMap = {
  clock: ClockIcon,
  share: ArrowsRightLeftIcon,
  crop: SparklesIcon,
  scale: ScaleIcon,
} as const

export function WhyIndusBest() {
  const { benefits } = landing

  return (
    <Section id={benefits.id}>
      <Reveal>
        <SectionIntro
          eyebrow={benefits.eyebrow}
          title={benefits.title}
          body={benefits.body}
        />
      </Reveal>

      <Stagger className={featureGridClass}>
        {benefits.items.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <MotionItem key={item.title}>
              <FeatureCard icon={Icon} title={item.title}>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </FeatureCard>
            </MotionItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
