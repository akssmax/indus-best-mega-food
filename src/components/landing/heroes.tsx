import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { ArrowRightIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { landing } from "@/content/landing"
import { Button } from "@/components/ui/button"
import { OceanBackground } from "@/components/landing/ocean-background"
import { Eyebrow } from "@/components/landing/section"
import {
  MotionItem,
  Reveal,
  Stagger,
  motionEase,
} from "@/components/landing/motion"
import { WaveEdge } from "@/components/ui/brand-pattern"
import { cn } from "@/lib/utils"

export const heroVariants = ["drop", "frame", "band"] as const

export type HeroVariant = (typeof heroVariants)[number]

export const heroVariantMeta: Record<
  HeroVariant,
  { name: string; note: string }
> = {
  drop: {
    name: "Drop",
    note: "Brand drop mask, ghost silhouette, and floating stat cards. Live homepage.",
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

export const heroShellClass =
  "relative z-10 -mt-14 overflow-hidden bg-forest pt-28 text-forest-foreground sm:-mt-16 sm:pt-[7.5rem] lg:pt-36"

const HERO_SLIDE_MS = 6000

type HeroSlideCard = {
  value: string
  label: string
  detail: string
  side: "left" | "right"
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

function DropHeroVisual() {
  const { hero } = landing
  const slides = hero.slides
  const reduce = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const slide = slides[activeIndex] ?? slides[0]

  useEffect(() => {
    if (reduce || slides.length < 2) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, HERO_SLIDE_MS)

    return () => window.clearInterval(timer)
  }, [reduce, slides.length])

  const imageLayer = (
    <>
      <div
        aria-hidden
        className="absolute inset-0 translate-x-2.5 translate-y-5 scale-[0.97] opacity-45 blur-2xl sm:translate-x-3 sm:translate-y-6"
        style={dropMaskStyle}
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
        <div className="absolute inset-0 overflow-hidden" style={dropMaskStyle}>
          {reduce ? (
            <img
              src={slide.image.src}
              alt={slide.image.alt}
              className="absolute inset-0 size-full object-cover object-[center_40%]"
            />
          ) : (
            <AnimatePresence mode="sync">
              <motion.img
                key={slide.image.src}
                src={slide.image.src}
                alt={slide.image.alt}
                className="absolute inset-0 size-full object-cover object-[center_40%]"
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
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] lg:max-w-[28rem]">
        {imageLayer}
        {cardLayer}
      </div>
    )
  }

  return (
    <motion.div
      className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] lg:max-w-[28rem]"
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
        className={heroShellClass}
      >
        <OceanBackground tone="forest" />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[-6%] size-72 rounded-full bg-cta/15 blur-3xl"
        />
        {children}
      </section>
      <WaveEdge
        position="bottom"
        className="relative z-[1] -mt-1 -mb-px bg-card text-forest"
      />
    </>
  )
}

function HeroCopy({ className }: { className?: string }) {
  const { hero } = landing

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
      </MotionItem>
    </Stagger>
  )
}

function HeroStatPills({ className }: { className?: string }) {
  const { stats } = landing.hero

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
  const { stats } = landing.hero

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
  const { hero } = landing

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
  const { hero } = landing

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

export function DropHero({ markHero = true }: { markHero?: boolean }) {
  return (
    <HeroShell markHero={markHero}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 lg:pb-20 xl:px-8">
        <HeroCopy />
        <DropHeroVisual />
      </div>
    </HeroShell>
  )
}

export function FrameHero({ markHero = false }: { markHero?: boolean }) {
  return (
    <HeroShell markHero={markHero}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 lg:pb-20 xl:px-8">
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
      <div className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:pb-20 xl:px-8">
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
  drop: DropHero,
  frame: FrameHero,
  band: BandHero,
} as const

export function Hero({
  variant = "drop",
  markHero,
}: {
  variant?: HeroVariant
  markHero?: boolean
}) {
  const Component = heroByVariant[variant]
  return <Component markHero={markHero ?? variant === "drop"} />
}
