import { landing } from "@/content/landing"
import { SectionIntro } from "@/components/landing/feature-card"
import { Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { SectionBand } from "@/lib/section-band"

export function SocialProof() {
  const { socialProof } = landing

  return (
    <SectionBand tone="secondary-25" from="background">
      <Section id={socialProof.id} className="bg-transparent">
        <Reveal>
          <SectionIntro
            eyebrow={socialProof.eyebrow}
            title={socialProof.title}
            body={socialProof.body}
          />
        </Reveal>

        <Reveal className="mt-8" delay={0.04}>
          <dl className="grid grid-cols-2 divide-x divide-y divide-border/70 overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8 sm:grid-cols-4 sm:divide-y-0">
            {socialProof.credibility.map((stat) => (
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
      </Section>
    </SectionBand>
  )
}
