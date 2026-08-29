import {
  BeakerIcon,
  BuildingOffice2Icon,
  SparklesIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"

import { throughputHeadlineStats } from "@/content/facilities"
import { landings } from "@/content/landings"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { PlatformSection } from "@/components/landings/platform/section-shell"

const stepIcons = [SparklesIcon, BuildingOffice2Icon, BeakerIcon, TruckIcon] as const

export function PlatformFlowStrip() {
  const { flow } = landings.platform

  return (
    <PlatformSection
      eyebrow={flow.eyebrow}
      title={flow.title}
      body={flow.body}
      className="bg-secondary/25"
    >
      <Reveal className="mt-10" delay={0.04}>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {flow.steps.map((step, index) => {
            const Icon = stepIcons[index] ?? SparklesIcon
            return (
              <li
                key={step.label}
                className="rounded-2xl bg-card p-5 ring-1 ring-foreground/8 sm:p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <p className="mt-4 font-heading text-xs font-medium tracking-[0.16em] text-primary uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-heading text-lg font-semibold">{step.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </li>
            )
          })}
        </ol>
      </Reveal>

      <Stagger className="mt-6 grid gap-4 sm:grid-cols-3">
        {throughputHeadlineStats.map((stat) => (
          <MotionItem key={stat.label}>
            <div className="rounded-2xl bg-card px-5 py-4 text-center ring-1 ring-foreground/8">
              <p className="font-heading text-2xl font-semibold tabular-nums text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </MotionItem>
        ))}
      </Stagger>
    </PlatformSection>
  )
}
