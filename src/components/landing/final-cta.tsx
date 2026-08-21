import { landing } from "@/content/landing"
import { Button } from "@/components/ui/button"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"

export function FinalCta() {
  const { finalCta: data } = landing

  return (
    <Section id="final-cta" className="bg-forest text-forest-foreground">
      <Reveal className="mx-auto max-w-3xl text-center">
        <Eyebrow className="text-cta">{data.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">
          {data.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-forest-foreground/85 sm:text-lg">
          {data.body}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="cta" className="h-12 px-6 text-base" asChild>
            <a href={data.primaryCta.href}>{data.primaryCta.label}</a>
          </Button>
          <Button
            variant="outline"
            className="h-12 border-forest-foreground/30 bg-transparent px-6 text-base text-forest-foreground hover:bg-forest-foreground/10 hover:text-forest-foreground"
            asChild
          >
            <a href={data.secondaryCta.href} download={data.secondaryCta.download}>
              {data.secondaryCta.label}
            </a>
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
