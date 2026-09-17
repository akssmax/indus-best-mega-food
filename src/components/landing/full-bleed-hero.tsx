"use client"

import { useEffect, useRef, useState } from "react"

import { landing as landingDefaults } from "@/content/landing"
import { useLandingContent } from "@/lib/landing-content-context"
import { Button } from "@/components/ui/button"
import { CampusImg } from "@/components/ui/campus-img"
import { contentContainerClass, contentGutterClass } from "@/lib/layout"
import { isLabCrawler } from "@/lib/lab-crawler"
import { landingImageSizes } from "@/lib/media"
import { cn } from "@/lib/utils"

const SLIDE_MS = 6000
const SLIDE_COUNT = 3

/** Aerial campus stills for the landing-2 full-bleed hero. */
const FULL_BLEED_IMAGES = [
  {
    src: "/images/gallery/campus-overview.webp",
    alt: "Wide aerial view of the Indus Best campus",
  },
  {
    src: "/images/gallery/warehouse-aerial.webp",
    alt: "Aerial view of the warehouse complex",
  },
  {
    src: "/images/gallery/processing-campus.webp",
    alt: "Central food processing campus from above",
  },
] as const

type HeroSlide = (typeof landingDefaults.hero.slides)[number]

function getSlideCopy(slide: HeroSlide, hero: typeof landingDefaults.hero) {
  return {
    headline: slide.headline ?? hero.headline,
    body: slide.body ?? hero.body,
  }
}

export function FullBleedHero() {
  const landing = useLandingContent()
  const slides = landing.hero.slides.slice(0, SLIDE_COUNT)
  const rootRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [autoplay, setAutoplay] = useState(false)
  const [inView, setInView] = useState(true)
  const slideCount = slides.length
  const slide = slides[activeIndex] ?? slides[0]
  const photo = FULL_BLEED_IMAGES[activeIndex] ?? FULL_BLEED_IMAGES[0]
  const copy = slide ? getSlideCopy(slide, landing.hero) : { headline: "", body: "" }

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? true),
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (slideCount < 2 || isLabCrawler()) return

    const enable = () => setAutoplay(true)
    window.addEventListener("pointerdown", enable, { once: true })
    window.addEventListener("keydown", enable, { once: true })
    const timer = window.setTimeout(enable, 18000)

    return () => {
      window.removeEventListener("pointerdown", enable)
      window.removeEventListener("keydown", enable)
      window.clearTimeout(timer)
    }
  }, [slideCount])

  useEffect(() => {
    if (slideCount < 2 || paused || !inView || !autoplay) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount)
    }, SLIDE_MS)

    return () => window.clearInterval(timer)
  }, [autoplay, inView, paused, slideCount])

  if (!slide || !photo) return null

  return (
    <section
      ref={rootRef}
      data-hero
      className="relative z-10 -mt-14 min-h-svh overflow-hidden bg-forest text-forest-foreground sm:-mt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        <CampusImg
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          sizes={landingImageSizes.hero}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-black/60 via-black/28 to-black/10"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/25"
        />
      </div>

      <div
        className={cn(
          contentGutterClass,
          "relative z-10 flex min-h-svh flex-col justify-end pt-28 pb-20 sm:pt-[7.5rem] sm:pb-24 lg:pb-28"
        )}
      >
        <div className={contentContainerClass}>
          <div className="max-w-xl lg:max-w-2xl">
            <p className="font-heading text-xs font-medium tracking-[0.22em] text-cta uppercase">
              {landing.hero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-[18ch] text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl lg:text-[3.5rem]">
              {copy.headline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-forest-foreground/90 sm:text-lg">
              {copy.body}
            </p>
            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button
                variant="cta"
                className="h-12 w-full rounded-full px-6 text-base sm:w-auto"
                asChild
              >
                <a href={landing.hero.primaryCta.href}>
                  {landing.hero.primaryCta.label}
                </a>
              </Button>
              <Button
                variant="outline"
                className="h-12 w-full rounded-full border-forest-foreground/40 bg-forest-foreground/10 px-6 text-base text-forest-foreground hover:bg-forest-foreground/16 hover:text-forest-foreground focus-visible:ring-forest-foreground/30 sm:w-auto"
                asChild
              >
                <a href={landing.hero.secondaryCta.href}>
                  {landing.hero.secondaryCta.label}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {slideCount > 1 ? (
        <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-1.5 sm:bottom-7">
          {slides.map((item, index) => (
            <button
              key={item.image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show slide ${index + 1} of ${slideCount}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-5 bg-cta"
                  : "w-1.5 bg-forest-foreground/45 hover:bg-forest-foreground/70"
              )}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
