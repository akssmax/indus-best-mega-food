import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { landings } from "@/content/landings"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/landing/section"
import { motionEase } from "@/components/landing/motion"

const SHOWCASE_MS = 5000

export function PlatformHeroShowcase() {
  const { hero, showcase } = landings.platform
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const tab = showcase.tabs[active]

  useEffect(() => {
    if (reduce) return

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % showcase.tabs.length)
    }, SHOWCASE_MS)

    return () => window.clearInterval(timer)
  }, [reduce, showcase.tabs.length])

  return (
    <section className="bg-background px-4 pt-10 pb-14 sm:px-6 sm:pt-12 lg:px-8 lg:pt-16 lg:pb-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end lg:gap-14">
          <div>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 max-w-xl font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.35rem] lg:leading-[1.06]">
              {hero.headline}
            </h1>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                variant="cta"
                className="h-12 rounded-full px-7 text-base"
                asChild
              >
                <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-full border-foreground/15 px-7 text-base"
                asChild
              >
                <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
              </Button>
            </div>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg lg:pb-1">
            {hero.body}
          </p>
        </div>

        <div
          id="campus"
          className="relative mt-10 aspect-[16/10] overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(15,43,29,0.08)] ring-1 ring-foreground/8 sm:mt-12 sm:aspect-[2/1] lg:aspect-[21/9]"
        >
          {reduce ? (
            <img
              src={tab.image.src}
              alt={tab.image.alt}
              className="absolute inset-0 size-full object-cover"
              loading="eager"
              decoding="async"
            />
          ) : (
            <AnimatePresence mode="wait">
              <motion.img
                key={tab.id}
                src={tab.image.src}
                alt={tab.image.alt}
                className="absolute inset-0 size-full object-cover"
                loading={active === 0 ? "eager" : "lazy"}
                decoding="async"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.38, ease: motionEase }}
              />
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  )
}
