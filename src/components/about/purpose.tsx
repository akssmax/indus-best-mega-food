import { Building2Icon, LeafIcon, ShieldCheckIcon } from "lucide-react"

import { aboutPage } from "@/content/about"
import { Eyebrow, Section } from "@/components/landing/section"
import { FeatureCard } from "@/components/landing/feature-card"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { cn } from "@/lib/utils"

const valueIcons = {
  "Food safety": ShieldCheckIcon,
  "Environmental practice": LeafIcon,
  "Commission a unit": Building2Icon,
} as const

function PurposeStatement({
  kind,
  title,
  body,
}: {
  kind: "vision" | "mission"
  title: string
  body: string
}) {
  const isVision = kind === "vision"

  return (
    <article
      className={cn(
        "relative h-full overflow-hidden rounded-2xl p-6 sm:p-8",
        isVision
          ? "bg-forest text-forest-foreground ring-1 ring-forest/20"
          : "bg-cta/12 ring-1 ring-cta/30"
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-8 -right-6 size-32 rounded-full blur-3xl",
          isVision ? "bg-cta/20" : "bg-primary/10"
        )}
      />
      <div className="relative">
        <p
          className={cn(
            "text-xs font-medium tracking-[0.2em] uppercase",
            isVision ? "text-cta" : "text-primary"
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "mt-4 font-heading text-xl leading-snug font-semibold sm:text-2xl",
            isVision ? "text-forest-foreground" : "text-foreground"
          )}
        >
          {body}
        </p>
      </div>
    </article>
  )
}

export function AboutPurpose() {
  const { purpose } = aboutPage

  return (
    <Section id={purpose.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{purpose.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{purpose.title}</h2>
      </Reveal>

      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
        <MotionItem>
          <PurposeStatement
            kind="vision"
            title={purpose.vision.title}
            body={purpose.vision.body}
          />
        </MotionItem>
        <MotionItem>
          <PurposeStatement
            kind="mission"
            title={purpose.mission.title}
            body={purpose.mission.body}
          />
        </MotionItem>
      </Stagger>

      <Reveal className="mt-12 max-w-2xl">
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
          In practice
        </p>
      </Reveal>

      <Stagger className="mt-5 grid gap-4 sm:grid-cols-3">
        {purpose.values.map((value) => {
          const Icon = valueIcons[value.title as keyof typeof valueIcons]

          return (
            <MotionItem key={value.title}>
              <FeatureCard icon={Icon} title={value.title}>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </FeatureCard>
            </MotionItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
