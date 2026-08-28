import { ArrowRightIcon } from "lucide-react"

import { landing } from "@/content/landing"
import { Button } from "@/components/ui/button"
import { OceanBackground } from "@/components/landing/ocean-background"
import { Eyebrow } from "@/components/landing/section"
import { WaveEdge } from "@/components/ui/brand-pattern"
import { cn } from "@/lib/utils"

const DROP_D =
  "M50 2C78 2 97 28 97 57C97 82 74 107 50 123C26 107 3 82 3 57C3 28 22 2 50 2Z"

const dropMask = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125"><path fill="black" d="${DROP_D}"/></svg>`
)}")`

const dropMaskStyle = {
  WebkitMaskImage: dropMask,
  maskImage: dropMask,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskPosition: "center",
  maskPosition: "center",
} as const

const floatCards = [
  {
    value: "16",
    label: "Plug-and-play sheds",
    detail: "Install equipment, not the building",
    side: "left" as const,
  },
  {
    value: "5,000 MT",
    label: "Cold on campus",
    detail: "Frozen and chilled, ready to book",
    side: "right" as const,
  },
]

export function Hero() {
  const { hero } = landing

  return (
    <>
      <section
        data-hero
        className="relative -mt-14 overflow-hidden bg-forest pt-28 text-forest-foreground sm:-mt-16 sm:pt-[7.5rem] lg:pt-36"
      >
        <OceanBackground tone="forest" />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[-6%] size-72 rounded-full bg-cta/15 blur-3xl"
        />

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 lg:pb-20 xl:px-8">
          <div className="relative z-10 mx-auto w-full max-w-xl lg:mx-0">
            <Eyebrow className="text-cta">{hero.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.35rem]">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-forest-foreground/85 sm:text-lg">
              {hero.body}
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button variant="cta" className="h-12 px-6 text-base" asChild>
                <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
              </Button>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex min-h-11 touch-target items-center gap-1.5 text-sm font-medium text-forest-foreground underline-offset-4 hover:underline active:text-forest-foreground/80"
              >
                {hero.secondaryCta.label}
                <ArrowRightIcon className="size-4" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] lg:max-w-[28rem]">
            <svg
              aria-hidden
              viewBox="0 0 100 125"
              className="absolute top-4 left-5 h-full w-full text-aqua/40"
            >
              <path d={DROP_D} fill="currentColor" />
            </svg>

            <div
              className="absolute inset-0"
              style={{
                filter: "drop-shadow(0 28px 44px rgba(15, 43, 29, 0.22))",
              }}
            >
              <div className="absolute inset-0" style={dropMaskStyle}>
                <img
                  src={hero.image.src}
                  alt={hero.image.alt}
                  className="absolute inset-0 size-full object-cover object-[center_40%]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-forest/50 via-transparent to-forest/10" />
              </div>
            </div>

            {floatCards.map((card) => (
              <div
                key={card.label}
                className={cn(
                  "absolute z-10 w-[min(100%,15.5rem)]",
                  card.side === "left"
                    ? "top-[48%] -left-1 sm:-left-8 lg:-left-12"
                    : "top-[16%] -right-1 sm:-right-6 lg:-right-10"
                )}
              >
                <div className="rounded-2xl bg-background/92 px-4 py-3 shadow-[0_12px_32px_rgba(15,43,29,0.12)] ring-1 ring-foreground/10 backdrop-blur-md">
                  <p className="font-heading text-lg font-semibold text-cta">
                    {card.value}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {card.label}
                  </p>
                  <p className="text-sm text-muted-foreground">{card.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WaveEdge
        position="bottom"
        className="relative z-10 -mt-px -mb-px bg-card text-forest"
      />
    </>
  )
}
