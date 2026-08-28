import { ArrowRightIcon } from "lucide-react"

import { aboutPage } from "@/content/about"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"

export function AboutHero() {
  const { hero } = aboutPage

  return (
    <section
      data-hero
      className="relative z-10 -mt-14 overflow-hidden bg-forest pt-28 text-forest-foreground sm:-mt-16 sm:pt-[7.5rem] lg:pt-36"
    >
      <div className="mx-auto grid max-w-6xl items-end gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 xl:px-8">
        <Reveal>
          <Eyebrow className="text-cta">{hero.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-[3.25rem]">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-forest-foreground/85 sm:text-lg">
            {hero.body}
          </p>
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
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
