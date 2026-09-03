"use client"

import { useState, type FocusEvent, type PointerEvent } from "react"

import { useLandingContent } from "@/lib/landing-content-context"
import { Button } from "@/components/ui/button"
import { OceanBackground } from "@/components/landing/ocean-background"
import { Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { WaveEdge } from "@/components/ui/brand-pattern"
import {
  ForestBandBridge,
  type BandSurface,
  bandBg,
  bandWave,
} from "@/lib/section-band"
import { cn } from "@/lib/utils"

export type CtaBridge = boolean | "top" | "bottom" | "both"

type CtaMorph = "idle" | "factory" | "campus"

export function FinalCta({
  bridge = "both",
  bridgeFrom = "secondary-25",
  showSecondary = true,
}: {
  /** Forest waves at the joins. Pass `"top"`, `"bottom"`, or `"both"`. */
  bridge?: CtaBridge
  /** Surface colour of the section above the forest band. */
  bridgeFrom?: BandSurface
  /** Hide the secondary link — e.g. on /campus, where it would point here. */
  showSecondary?: boolean
}) {
  const landing = useLandingContent()
  const { finalCta: data } = landing
  const showTop = bridge === true || bridge === "both" || bridge === "top"
  const showBottom = bridge === true || bridge === "both" || bridge === "bottom"
  const [ctaMorph, setCtaMorph] = useState<CtaMorph>("idle")

  const dissolve = () => setCtaMorph("idle")

  const onCtaBlur = (event: FocusEvent<HTMLAnchorElement>) => {
    const next = event.relatedTarget
    if (next instanceof Element && next.closest("[data-cta-morph]")) return
    dissolve()
  }

  const onSectionPointerOver = (event: PointerEvent<HTMLElement>) => {
    const target = event.target
    if (!(target instanceof Element)) return
    if (!target.closest("[data-cta-morph]")) dissolve()
  }

  return (
    <>
      {showTop ? <ForestBandBridge from={bridgeFrom} /> : null}
      <Section
        id="final-cta"
        className="relative z-10 flex min-h-[32rem] items-center overflow-hidden bg-forest py-24 text-forest-foreground sm:min-h-[36rem] lg:min-h-[40rem] lg:py-36"
        innerClassName="contents"
        onPointerOver={onSectionPointerOver}
        onPointerLeave={dissolve}
      >
        <OceanBackground
          tone="forest"
          interaction="factory"
          dropEngaged={ctaMorph !== "idle"}
          morphTarget={ctaMorph === "campus" ? 1 : 0}
        />

        <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">{data.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-forest-foreground/90 sm:text-lg">
            {data.body}
          </p>
          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button
              variant="cta"
              className="h-12 w-full px-6 text-base sm:w-auto"
              asChild
            >
              <a
                href={data.primaryCta.href}
                data-cta-morph="factory"
                onPointerEnter={() => setCtaMorph("factory")}
                onFocus={() => setCtaMorph("factory")}
                onBlur={onCtaBlur}
              >
                {data.primaryCta.label}
              </a>
            </Button>
            {showSecondary ? (
              <Button
                variant="outline"
                className="h-12 w-full border-forest-foreground/30 bg-transparent px-6 text-base text-forest-foreground hover:bg-forest-foreground/10 hover:text-forest-foreground focus-visible:ring-forest-foreground/30 sm:w-auto"
                asChild
              >
                <a
                  href={data.secondaryCta.href}
                  data-cta-morph="campus"
                  onPointerEnter={() => setCtaMorph("campus")}
                  onFocus={() => setCtaMorph("campus")}
                  onBlur={onCtaBlur}
                >
                  {data.secondaryCta.label}
                </a>
              </Button>
            ) : null}
          </div>
        </Reveal>
      </Section>
      {showBottom ? (
        <WaveEdge
          position="bottom"
          className={cn(
            "relative z-[1] -mt-px block",
            bandBg.card,
            bandWave.forest,
            "dark:bg-background"
          )}
        />
      ) : null}
    </>
  )
}
