import { landing } from "@/content/landing"
import { Button } from "@/components/ui/button"
import { OceanBackground } from "@/components/landing/ocean-background"
import { Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { WaveEdge } from "@/components/ui/brand-pattern"
import { cn } from "@/lib/utils"

export type CtaBridge = boolean | "top" | "bottom" | "both"

export function FinalCta({
  bridge = "both",
  bridgeFrom = "bg-background",
}: {
  /** Forest waves at the joins. Pass `"top"`, `"bottom"`, or `"both"`. */
  bridge?: CtaBridge
  /** Fill behind the top wave so it matches the section above. */
  bridgeFrom?: string
}) {
  const { finalCta: data } = landing
  const showTop = bridge === true || bridge === "both" || bridge === "top"
  const showBottom = bridge === true || bridge === "both" || bridge === "bottom"

  return (
    <>
      {showTop ? (
        <WaveEdge className={cn("-mb-px text-forest", bridgeFrom)} />
      ) : null}
      <Section
        id="final-cta"
        className="relative flex min-h-[32rem] items-center overflow-hidden bg-forest py-24 text-forest-foreground sm:min-h-[36rem] lg:min-h-[40rem] lg:py-36"
        innerClassName="contents"
      >
        <OceanBackground tone="forest" />

        <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">{data.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-forest-foreground/85 sm:text-lg">
            {data.body}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="cta" className="h-12 px-6 text-base" asChild>
              <a href={data.primaryCta.href}>{data.primaryCta.label}</a>
            </Button>
            <Button
              variant="outline"
              className="h-12 border-forest-foreground/30 bg-transparent px-6 text-base text-forest-foreground hover:bg-forest-foreground/10 hover:text-forest-foreground focus-visible:ring-forest-foreground/30"
              asChild
            >
              <a href={data.secondaryCta.href}>{data.secondaryCta.label}</a>
            </Button>
          </div>
        </Reveal>
      </Section>
      {showBottom ? (
        <WaveEdge
          position="bottom"
          className="relative z-10 -mt-px -mb-px bg-card text-forest"
        />
      ) : null}
    </>
  )
}
