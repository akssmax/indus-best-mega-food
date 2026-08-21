import { landing } from "@/content/landing"
import { Button } from "@/components/ui/button"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { GrainGradientBackground } from "@/components/landing/grain-gradient-background"

export function FinalCta() {
  const { finalCta: data } = landing

  return (
    <Section id="final-cta" className="relative overflow-hidden bg-forest text-forest-foreground">
      <GrainGradientBackground
        colors={["#1a3a2a", "#c8a84e", "#2d6a5a", "#0f2b1d", "#4a9a7a"]}
        colorBack="#0f2b1d"
        opacity={0.6}
        shape="wave"
        speed={0.4}
        className="pointer-events-auto absolute inset-0"
      />

      {/* Decorative grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative diagonal lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`,
        }}
      />

      {/* Decorative dots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
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
