"use client"

import type {
  CSSProperties,
  Dispatch,
  ReactNode,
  SetStateAction,
  TouchEvent,
} from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"

import { landing as landingDefaults } from "@/content/landing"
import { useLandingContent } from "@/lib/landing-content-context"
import { Button } from "@/components/ui/button"
import { OceanBackground } from "@/components/landing/ocean-background"
import { Eyebrow } from "@/components/landing/section"
import {
  MotionItem,
  Reveal,
  RevealText,
  Stagger,
  motionEase,
} from "@/components/landing/motion"
import { WaveEdge } from "@/components/ui/brand-pattern"
import { contentContainerClass, contentGutterClass } from "@/lib/layout"
import { landingImageSizes } from "@/lib/media"
import { cn } from "@/lib/utils"

export const heroVariants = ["campus", "drop", "mark", "frame", "band"] as const

export type HeroVariant = (typeof heroVariants)[number]

export const heroVariantMeta: Record<
  HeroVariant,
  { name: string; note: string }
> = {
  campus: {
    name: "Campus",
    note: "Full campus photo, hover stat cards, and copy that rotates with each slide. Live homepage.",
  },
  drop: {
    name: "Drop",
    note: "Brand drop mask, ghost silhouette, and floating stat cards. Backup variant.",
  },
  mark: {
    name: "Mark",
    note: "IBMFP logo badge as the photo mask with the same rotating stat cards.",
  },
  frame: {
    name: "Frame",
    note: "Rounded campus photo with stat pills under the CTAs. No drop shape.",
  },
  band: {
    name: "Band",
    note: "Copy and stats first, wide panoramic image band below. Magazine lead.",
  },
}

// Water droplet: soft tip at top, rounded body at bottom (matches brand Drop flourish).
const DROP_D =
  "M50 7C50 7 18 54 18 84C18 104 32 120 50 120C68 120 82 104 82 84C82 54 50 7 50 7Z"

const dropMask = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 0 80 124"><path fill="black" d="${DROP_D}"/></svg>`
)}")`

const dropMaskStyle = {
  WebkitMaskImage: dropMask,
  maskImage: dropMask,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "108% 106%",
  maskSize: "108% 106%",
  WebkitMaskPosition: "center",
  maskPosition: "center",
} as const

// Logo badge silhouette — arch top, rounded base (matches /images/logo.png proportions).
const MARK_D =
  "M12 88H112Q124 88 124 76V58C124 24 97 0 62 0C27 0 0 24 0 58V76Q0 88 12 88Z"

const markMask = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 88"><path fill="black" d="${MARK_D}"/></svg>`
)}")`

const markMaskStyle = {
  WebkitMaskImage: markMask,
  maskImage: markMask,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskPosition: "center",
  maskPosition: "center",
} as const

export const heroShellClass =
  "relative z-10 -mt-14 overflow-hidden bg-forest pt-28 text-forest-foreground sm:-mt-16 sm:pt-[7.5rem] lg:pt-36"

const HERO_SLIDE_MS = 6000
const CAMPUS_HERO_SLIDE_COUNT = 3
const heroImageTransition = { duration: 0.92, delay: 0.1, ease: motionEase }

type HeroSlide = (typeof landingDefaults.hero.slides)[number]

type HeroSlideCard = {
  value: string
  label: string
  detail: string
  side: "left" | "right"
}

function useHeroCarousel(
  slides: readonly HeroSlide[],
  inView = true
) {
  const reduce = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const slideCount = slides.length

  useEffect(() => {
    if (reduce || slideCount < 2 || paused || !inView) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount)
    }, HERO_SLIDE_MS)

    return () => window.clearInterval(timer)
  }, [paused, reduce, slideCount, inView])

  useEffect(() => {
    if (reduce || slideCount < 2 || !inView) return

    const nextIndex = (activeIndex + 1) % slideCount
    const nextSrc = slides[nextIndex]?.image.src
    if (!nextSrc) return

    let cancelled = false
    let link: HTMLLinkElement | null = null
    let idleId = 0
    let delayId = 0

    const attach = () => {
      if (cancelled || document.querySelector(`link[rel="preload"][href="${nextSrc}"]`)) {
        return
      }
      link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = nextSrc
      document.head.appendChild(link)
    }

    const wait = activeIndex === 0 ? 1200 : 80
    delayId = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(attach, { timeout: 800 })
        return
      }
      attach()
    }, wait)

    return () => {
      cancelled = true
      window.clearTimeout(delayId)
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId)
      }
      if (link?.isConnected) document.head.removeChild(link)
    }
  }, [activeIndex, inView, reduce, slideCount, slides])

  return {
    activeIndex,
    setActiveIndex,
    paused,
    setPaused,
    reduce,
  }
}

function useHorizontalSwipe(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  enabled = true,
  threshold = 48,
) {
  const start = useRef<{ x: number; y: number } | null>(null)

  function resetStart() {
    start.current = null
  }

  return {
    onTouchStart(event: TouchEvent) {
      if (!enabled || event.touches.length !== 1) return
      start.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      }
    },
    onTouchEnd(event: TouchEvent) {
      if (!enabled || !start.current) return
      const touch = event.changedTouches[0]
      const dx = touch.clientX - start.current.x
      const dy = touch.clientY - start.current.y
      resetStart()
      if (Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy)) return
      if (dx < 0) onSwipeLeft()
      else onSwipeRight()
    },
    onTouchCancel: resetStart,
  }
}

function getSlideCopy(
  slide: HeroSlide,
  hero: typeof landingDefaults.hero,
) {
  return {
    headline: slide.headline ?? hero.headline,
    body: slide.body ?? hero.body,
  }
}

function FloatStatCard({ card }: { card: HeroSlideCard }) {
  return (
    <div className="rounded-2xl bg-background/92 px-4 py-3 shadow-[0_12px_32px_rgba(15,43,29,0.12)] ring-1 ring-foreground/10 backdrop-blur-md">
      <p className="font-heading text-lg font-semibold text-cta">{card.value}</p>
      <p className="text-sm font-medium text-foreground">{card.label}</p>
      <p className="text-sm text-muted-foreground">{card.detail}</p>
    </div>
  )
}

function cardPositionClass(side: HeroSlideCard["side"]) {
  return cn(
    "absolute z-10 w-[min(100%,15.5rem)]",
    side === "left"
      ? "top-[48%] -left-1 sm:-left-8 lg:-left-12"
      : "top-[16%] -right-1 sm:-right-6 lg:-right-10"
  )
}

function MaskedRotatingHeroVisual({
  maskStyle,
  frameClassName,
  imageObjectPosition = "center 40%",
}: {
  maskStyle: CSSProperties
  frameClassName: string
  imageObjectPosition?: string
}) {
  const { hero } = useLandingContent()
  const slides = hero.slides
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { margin: "0px 0px -12% 0px" })
  const [activeIndex, setActiveIndex] = useState(0)
  const slide = slides[activeIndex] ?? slides[0]

  useEffect(() => {
    if (reduce || slides.length < 2 || !inView) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, HERO_SLIDE_MS)

    return () => window.clearInterval(timer)
  }, [inView, reduce, slides.length])

  useEffect(() => {
    if (reduce || slides.length < 2 || !inView) return

    const nextIndex = (activeIndex + 1) % slides.length
    const nextSrc = slides[nextIndex]?.image.src
    if (!nextSrc) return

    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = nextSrc
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [activeIndex, inView, reduce, slides])

  const imageFetchPriority = activeIndex === 0 ? "high" : "auto"

  const imageLayer = (
    <>
      <div
        aria-hidden
        className="absolute inset-0 translate-x-2.5 translate-y-5 scale-[0.97] opacity-45 blur-2xl sm:translate-x-3 sm:translate-y-6"
        style={maskStyle}
      >
        <div className="size-full bg-forest/90" />
      </div>

      <div
        className="absolute inset-0"
        style={{
          filter:
            "drop-shadow(0 10px 20px rgba(15, 43, 29, 0.16)) drop-shadow(0 28px 48px rgba(15, 43, 29, 0.14))",
        }}
      >
        <div className="absolute inset-0 overflow-hidden" style={maskStyle}>
          {reduce ? (
            <img
              src={slide.image.src}
              alt={slide.image.alt}
              className="absolute inset-0 size-full object-cover"
              style={{ objectPosition: imageObjectPosition }}
              fetchPriority={imageFetchPriority}
              loading="eager"
              decoding="async"
            />
          ) : (
            <AnimatePresence mode="sync">
              <motion.img
                key={slide.image.src}
                src={slide.image.src}
                alt={slide.image.alt}
                className="absolute inset-0 size-full object-cover"
                style={{ objectPosition: imageObjectPosition }}
                fetchPriority={imageFetchPriority}
                loading="eager"
                decoding="async"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.75, ease: motionEase }}
              />
            </AnimatePresence>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-white/25 via-white/5 to-transparent" />
        </div>
      </div>
    </>
  )

  const cardLayer =
    reduce ? (
      slide.cards.map((card) => (
        <div key={`${card.side}-${card.label}`} className={cardPositionClass(card.side)}>
          <FloatStatCard card={card} />
        </div>
      ))
    ) : (
      <AnimatePresence mode="popLayout">
        {slide.cards.map((card) => (
          <motion.div
            key={`${activeIndex}-${card.side}-${card.label}`}
            className={cardPositionClass(card.side)}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.45, ease: motionEase }}
          >
            <FloatStatCard card={card} />
          </motion.div>
        ))}
      </AnimatePresence>
    )

  if (reduce) {
    return (
      <div ref={rootRef} className={cn("relative mx-auto w-full", frameClassName)}>
        {imageLayer}
        {cardLayer}
      </div>
    )
  }

  return (
    <motion.div
      ref={rootRef}
      className={cn("relative mx-auto w-full", frameClassName)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.12, ease: motionEase }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, delay: 0.16, ease: motionEase }}
      >
        {imageLayer}
      </motion.div>
      {cardLayer}
    </motion.div>
  )
}

function DropHeroVisual() {
  return (
    <MaskedRotatingHeroVisual
      maskStyle={dropMaskStyle}
      frameClassName="aspect-[4/5] max-w-[26rem] lg:max-w-[28rem]"
    />
  )
}

function MarkHeroVisual() {
  return (
    <MaskedRotatingHeroVisual
      maskStyle={markMaskStyle}
      frameClassName="aspect-[124/88] max-w-[22rem] lg:max-w-[26rem]"
      imageObjectPosition="center 45%"
    />
  )
}

function HeroShell({
  children,
  markHero = false,
}: {
  children: ReactNode
  markHero?: boolean
}) {
  return (
    <>
      <section
        {...(markHero ? { "data-hero": true } : {})}
        className={cn(heroShellClass, contentGutterClass)}
      >
        <OceanBackground tone="forest" interaction="static" />
        <div className="relative z-10">{children}</div>
      </section>
      <WaveEdge
        position="bottom"
        className="relative z-[1] -mt-px block bg-card text-forest dark:bg-background dark:text-forest"
      />
    </>
  )
}

function HeroCopy({ className }: { className?: string }) {
  const { hero } = useLandingContent()

  return (
    <Stagger
      when="mount"
      className={cn("relative z-10 mx-auto w-full max-w-xl lg:mx-0", className)}
    >
      <MotionItem>
        <Eyebrow className="text-cta">{hero.eyebrow}</Eyebrow>
      </MotionItem>
      <MotionItem>
        <h1 className="mt-5 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.35rem]">
          {hero.headline}
        </h1>
      </MotionItem>
      <MotionItem>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-forest-foreground/85 sm:text-lg">
          {hero.body}
        </p>
      </MotionItem>
      <MotionItem>
        <HeroCtaRow />
      </MotionItem>
    </Stagger>
  )
}

function HeroCtaRow({ className }: { className?: string }) {
  const { hero } = useLandingContent()

  return (
    <div
      className={cn(
        "flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4",
        className
      )}
    >
      <Button
        variant="cta"
        className="h-12 w-full px-6 text-base sm:w-auto"
        asChild
      >
        <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
      </Button>
      <a
        href={hero.secondaryCta.href}
        className="inline-flex min-h-11 w-full touch-target items-center justify-center gap-1.5 text-sm font-medium text-forest-foreground underline-offset-4 hover:underline active:text-forest-foreground/80 sm:w-auto sm:justify-start"
      >
        {hero.secondaryCta.label}
        <ArrowRightIcon className="size-4" />
      </a>
    </div>
  )
}

function HeroCopySlide({
  slides,
  activeIndex,
  reduce,
  className,
}: {
  slides: readonly HeroSlide[]
  activeIndex: number
  reduce: boolean | null
  className?: string
}) {
  const { hero } = useLandingContent()

  return (
    <div
      className={cn(
        "relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center sm:gap-7 lg:gap-8",
        className
      )}
    >
      <div className="grid w-full">
        {slides.map((slide, index) => {
          const copy = getSlideCopy(slide, hero)
          const isActive = index === activeIndex

          return (
            <div
              key={slide.image.src}
              className="col-start-1 row-start-1 flex flex-col items-center gap-6 sm:gap-7 lg:gap-8"
              style={{
                visibility: isActive ? "visible" : "hidden",
                pointerEvents: isActive ? "auto" : "none",
              }}
              aria-hidden={!isActive}
            >
              {reduce || !isActive ? (
                <>
                  <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.35rem]">
                    {copy.headline}
                  </h1>
                  <p className="max-w-2xl text-base leading-relaxed text-forest-foreground/85 sm:text-lg">
                    {copy.body}
                  </p>
                </>
              ) : (
                <>
                  <RevealText
                    key={`headline-${activeIndex}`}
                    as="h1"
                    text={copy.headline}
                    className="max-w-3xl text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.35rem]"
                    stagger={0.065}
                    duration={0.58}
                  />
                  <RevealText
                    key={`body-${activeIndex}`}
                    as="p"
                    text={copy.body}
                    className="max-w-2xl text-base leading-relaxed text-forest-foreground/85 sm:text-lg"
                    stagger={0.032}
                    duration={0.46}
                    startDelay={0.12}
                  />
                </>
              )}
            </div>
          )
        })}
      </div>
      <HeroCtaRow className="justify-center" />
    </div>
  )
}

function HeroCopyAnimated({
  activeIndex,
  className,
}: {
  activeIndex: number
  className?: string
}) {
  const { hero } = useLandingContent()
  const { slides } = hero
  const slide = slides[activeIndex] ?? slides[0]
  const copy = getSlideCopy(slide, hero)
  const reduce = useReducedMotion()

  return (
    <div className={cn("relative z-10 mx-auto w-full max-w-xl lg:mx-0", className)}>
      <Reveal when="mount">
        <Eyebrow className="text-cta">{hero.eyebrow}</Eyebrow>
      </Reveal>

      <div className="mt-5 min-h-[9.5rem] sm:min-h-[10.5rem] lg:min-h-[11.5rem]">
        {reduce ? (
          <>
            <h1 className="text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.35rem]">
              {copy.headline}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-forest-foreground/85 sm:text-lg">
              {copy.body}
            </p>
          </>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: motionEase }}
            >
              <h1 className="text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.35rem]">
                {copy.headline}
              </h1>
              <motion.p
                className="mt-6 max-w-lg text-base leading-relaxed text-forest-foreground/85 sm:text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06, ease: motionEase }}
              >
                {copy.body}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <Reveal when="mount" delay={0.12} className="mt-8">
        <HeroCtaRow />
      </Reveal>
    </div>
  )
}

function campusCardPosition(side: HeroSlideCard["side"]) {
  return cn(
    "absolute z-10 w-[min(100%,16rem)]",
    side === "left"
      ? "bottom-5 left-4 sm:bottom-7 sm:left-6"
      : "top-5 right-4 sm:top-7 sm:right-6"
  )
}

function CampusHeroVisual({
  slides,
  activeIndex,
  reduce,
  setPaused,
  setActiveIndex,
}: {
  slides: readonly HeroSlide[]
  activeIndex: number
  reduce: boolean | null
  setPaused: (paused: boolean) => void
  setActiveIndex: Dispatch<SetStateAction<number>>
}) {
  const slide = slides[activeIndex] ?? slides[0]
  const slideCount = slides.length

  function goToPrev() {
    setActiveIndex((current) => (current - 1 + slideCount) % slideCount)
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % slideCount)
  }

  const swipeHandlers = useHorizontalSwipe(goToNext, goToPrev, slideCount > 1)

  const navButtonClass = cn(
    "absolute top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full",
    "bg-background/92 text-foreground shadow-md ring-1 ring-foreground/10 backdrop-blur-sm",
    "pointer-events-none opacity-0 transition-[opacity,transform,background-color] duration-200",
    "group-hover:pointer-events-auto group-hover:opacity-100",
    "hover:bg-background hover:scale-105",
    "focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  )
  return (
    <div className="relative mt-10 w-full lg:mt-12">
      <div
        className="group relative overflow-hidden rounded-3xl shadow-[0_24px_56px_rgba(15,43,29,0.28)] ring-1 ring-forest-foreground/15"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setPaused(false)
          }
        }}
      >
        <div
          className="relative aspect-[16/10] touch-pan-y sm:aspect-[16/9] lg:aspect-[2/1]"
          {...swipeHandlers}
        >
          {slides.map((item, index) => {
            const isActive = index === activeIndex

            return (
              <motion.img
                key={item.image.src}
                src={item.image.src}
                alt={isActive ? item.image.alt : ""}
                className="absolute inset-0 size-full object-cover object-center"
                sizes={landingImageSizes.hero}
                fetchPriority={index === 0 ? "high" : "low"}
                loading={index === 0 ? "eager" : "lazy"}
                decoding={index === 0 ? "sync" : "async"}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: reduce ? 1 : isActive ? 1 : 1.02,
                }}
                transition={reduce ? { duration: 0 } : heroImageTransition}
                aria-hidden={!isActive}
              />
            )
          })}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-forest/55 via-forest/10 to-transparent" />

          {slideCount > 1 ? (
            <>
              <button
                type="button"
                className={cn(navButtonClass, "left-3 sm:left-4")}
                onClick={(event) => {
                  goToPrev()
                  event.currentTarget.blur()
                }}
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                className={cn(navButtonClass, "right-3 sm:right-4")}
                onClick={(event) => {
                  goToNext()
                  event.currentTarget.blur()
                }}
                aria-label="Next slide"
              >
                <ChevronRightIcon className="size-5" aria-hidden />
              </button>
            </>
          ) : null}

          {slide.cards.map((card) => (
            <div
              key={`${activeIndex}-${card.side}-${card.label}`}
              className={cn(
                campusCardPosition(card.side),
                "pointer-events-none opacity-0 translate-y-2 scale-[0.98] transition-all duration-300 ease-out",
                "group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100",
                "group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100"
              )}
            >
              <FloatStatCard card={card} />
            </div>
          ))}

          <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-1.5 px-4 py-3 sm:px-5 sm:py-4">
            {slides.map((item, index) => (
              <button
                key={item.image.src}
                type="button"
                onClick={(event) => {
                  setActiveIndex(index)
                  event.currentTarget.blur()
                }}
                aria-label={`Show slide ${index + 1} of ${slideCount}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-5 bg-cta"
                    : "w-1.5 bg-forest-foreground/35 hover:bg-forest-foreground/55"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function CampusHero({ markHero = true }: { markHero?: boolean }) {
  const landing = useLandingContent()
  const slides = landing.hero.slides.slice(0, CAMPUS_HERO_SLIDE_COUNT)
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { margin: "0px 0px -12% 0px" })
  const { activeIndex, setActiveIndex, setPaused, reduce } = useHeroCarousel(slides, inView)

  return (
    <HeroShell markHero={markHero}>
      <div ref={rootRef} className={cn(contentContainerClass, "relative pb-12 lg:pb-16")}>
        <HeroCopySlide
          slides={slides}
          activeIndex={activeIndex}
          reduce={reduce}
        />
        <CampusHeroVisual
          slides={slides}
          activeIndex={activeIndex}
          reduce={reduce}
          setPaused={setPaused}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </HeroShell>
  )
}

function HeroStatPills({ className }: { className?: string }) {
  const { stats } = useLandingContent().hero

  return (
    <Stagger
      when="mount"
      delay={0.22}
      className={cn("mt-8 flex flex-wrap gap-2 sm:gap-2.5", className)}
    >
      {stats.map((stat) => (
        <MotionItem key={stat.label}>
          <span className="inline-flex rounded-full bg-forest-foreground/10 px-3.5 py-2 ring-1 ring-forest-foreground/15 backdrop-blur-sm">
            <span className="font-heading text-sm font-semibold text-cta">
              {stat.value}
            </span>
            <span className="ml-2 text-xs text-forest-foreground/75">
              {stat.label}
            </span>
          </span>
        </MotionItem>
      ))}
    </Stagger>
  )
}

function HeroStatRow({ className }: { className?: string }) {
  const { stats } = useLandingContent().hero

  return (
    <Stagger
      when="mount"
      delay={0.22}
      className={cn(
        "mt-10 grid max-w-2xl grid-cols-2 gap-4 border-t border-forest-foreground/15 pt-8 sm:grid-cols-4",
        className
      )}
    >
      {stats.map((stat) => (
        <MotionItem key={stat.label}>
          <div>
            <p className="font-heading text-2xl font-semibold text-cta sm:text-[1.65rem]">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-forest-foreground/75 sm:text-sm">
              {stat.label}
            </p>
          </div>
        </MotionItem>
      ))}
    </Stagger>
  )
}

function FrameHeroVisual() {
  const { hero } = useLandingContent()

  return (
    <Reveal
      when="mount"
      delay={0.14}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      <div className="overflow-hidden rounded-3xl ring-1 ring-forest-foreground/15 shadow-[0_24px_48px_rgba(15,43,29,0.28)]">
        <div className="relative aspect-[4/5] sm:aspect-[5/6]">
          <img
            src={hero.image.src}
            alt={hero.image.alt}
            className="absolute inset-0 size-full object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-forest/55 via-forest/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="text-xs font-medium tracking-[0.16em] text-forest-foreground/70 uppercase">
              Village Bemta–Sarora
            </p>
            <p className="mt-1 font-heading text-lg font-semibold text-forest-foreground">
              Campus already on the ground
            </p>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-3 -right-3 size-24 rounded-full bg-aqua/20 blur-2xl"
      />
    </Reveal>
  )
}

function BandHeroVisual() {
  const { hero } = useLandingContent()

  return (
    <Reveal when="mount" delay={0.18}>
      <div className="relative mt-10 overflow-hidden rounded-2xl ring-1 ring-forest-foreground/15 shadow-[0_20px_40px_rgba(15,43,29,0.22)] sm:mt-12 sm:rounded-3xl">
        <div className="relative aspect-[16/7] min-h-[12rem] sm:min-h-[14rem]">
          <img
            src={hero.image.src}
            alt={hero.image.alt}
            className="absolute inset-0 size-full object-cover object-[center_42%]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-forest/70 via-forest/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-forest/80 to-transparent p-5 sm:p-6">
            <p className="max-w-md text-sm text-forest-foreground/85 sm:text-base">
              Plots, sheds, lines, and cold rooms — live at Bemta–Sarora.
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

const heroGridClass = cn(
  contentContainerClass,
  "grid items-center gap-10 pb-14 lg:pb-20"
)

export function DropHero({ markHero = true }: { markHero?: boolean }) {
  return (
    <HeroShell markHero={markHero}>
      <div
        className={cn(
          heroGridClass,
          "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6"
        )}
      >
        <HeroCopy />
        <DropHeroVisual />
      </div>
    </HeroShell>
  )
}

export function MarkHero({ markHero = false }: { markHero?: boolean }) {
  return (
    <HeroShell markHero={markHero}>
      <div
        className={cn(
          heroGridClass,
          "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6"
        )}
      >
        <HeroCopy />
        <MarkHeroVisual />
      </div>
    </HeroShell>
  )
}

export function FrameHero({ markHero = false }: { markHero?: boolean }) {
  return (
    <HeroShell markHero={markHero}>
      <div
        className={cn(
          heroGridClass,
          "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10"
        )}
      >
        <div>
          <HeroCopy className="max-w-xl" />
          <HeroStatPills />
        </div>
        <FrameHeroVisual />
      </div>
    </HeroShell>
  )
}

export function BandHero({ markHero = false }: { markHero?: boolean }) {
  return (
    <HeroShell markHero={markHero}>
      <div className={heroGridClass}>
        <div className="max-w-3xl">
          <HeroCopy className="max-w-2xl" />
          <HeroStatRow className="max-w-2xl" />
        </div>
        <BandHeroVisual />
      </div>
    </HeroShell>
  )
}

const heroByVariant = {
  campus: CampusHero,
  drop: DropHero,
  mark: MarkHero,
  frame: FrameHero,
  band: BandHero,
} as const

export function Hero({
  variant = "campus",
  markHero,
}: {
  variant?: HeroVariant
  markHero?: boolean
}) {
  const Component = heroByVariant[variant]
  return <Component markHero={markHero ?? variant === "campus"} />
}
