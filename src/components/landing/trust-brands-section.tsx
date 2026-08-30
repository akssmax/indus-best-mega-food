import { SectionIntro } from "@/components/landing/feature-card"
import { Section } from "@/components/landing/section"
import { LogoStrip } from "@/components/landing/logo-strip"
import { Reveal } from "@/components/landing/motion"

export function TrustBrandsSection({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <Section className="bg-secondary/25">
      <Reveal className="max-w-2xl">
        <SectionIntro eyebrow={eyebrow} title={title} body={body} />
      </Reveal>
      <Reveal className="mt-10" delay={0.06}>
        <LogoStrip variant="plain" />
      </Reveal>
    </Section>
  )
}
