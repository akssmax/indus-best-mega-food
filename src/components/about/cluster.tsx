import { aboutPage } from "@/content/about"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { ProcessFlow } from "@/components/ui/process-flow"
import { CollectionGauge } from "@/components/ui/collection-gauge"

export function AboutCluster() {
  const { cluster } = aboutPage

  return (
    <Section id={cluster.id} className="bg-secondary/30">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <Reveal>
          <Eyebrow>{cluster.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{cluster.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {cluster.body}
          </p>
          <ProcessFlow steps={cluster.steps} className="mt-8" />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="rounded-3xl bg-card px-6 py-10 ring-1 ring-foreground/10 sm:px-10">
            <CollectionGauge
              value={cluster.gauge.value}
              unit={cluster.gauge.unit}
              sites={cluster.gauge.sites}
            />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
