import { ArrowRightIcon } from "lucide-react"

import { aboutPage } from "@/content/about"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/landing/section"
import { OceanBackground } from "@/components/landing/ocean-background"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

export function AboutHero() {
  const { hero } = aboutPage

  return (
    <section
      data-hero
      className="relative z-10 -mt-14 overflow-hidden bg-forest pt-28 text-forest-foreground sm:-mt-16 sm:pt-[7.5rem] lg:pt-36"
    >
      <OceanBackground
        tone="forest"
        placement="fill"
        scale={1.75}
        hoverZoom={1.12}
        interaction="morph"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-6%] size-72 rounded-full bg-cta/15 blur-3xl"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24 xl:px-8">
        <Stagger when="mount" stagger={0.1} className="max-w-3xl">
            <MotionItem>
              <Eyebrow className="text-cta">{hero.eyebrow}</Eyebrow>
            </MotionItem>
            <MotionItem>
              <h1 className="mt-4 text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-[3.25rem]">
                {hero.headline}
              </h1>
            </MotionItem>
            <MotionItem>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-forest-foreground/85 sm:text-lg">
                {hero.body}
              </p>
            </MotionItem>
            <MotionItem>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button variant="cta" className="h-12 px-6 text-base" asChild>
                  <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
                </Button>
                <a
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-foreground underline-offset-4 hover:underline"
                >
                  {hero.secondaryCta.label}
                  <ArrowRightIcon className="size-4" />
                </a>
              </div>
            </MotionItem>
            <MotionItem>
              <nav
                aria-label="On this page"
                className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-6"
              >
                {hero.jumps.map((jump) => (
                  <a
                    key={jump.href}
                    href={jump.href}
                    className="text-xs font-medium tracking-[0.14em] text-forest-foreground/70 uppercase underline-offset-4 hover:text-cta hover:underline"
                  >
                    {jump.label}
                  </a>
                ))}
              </nav>
            </MotionItem>
        </Stagger>
        <Reveal delay={0.08} className="mt-10 lg:mt-12">
          <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              className="aspect-[16/10] w-full object-cover sm:aspect-[2/1] lg:aspect-[21/9]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
