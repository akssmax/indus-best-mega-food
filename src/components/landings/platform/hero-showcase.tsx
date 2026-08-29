import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { landings } from "@/content/landings"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/landing/section"
import { motionEase } from "@/components/landing/motion"
import { cn } from "@/lib/utils"

const SHOWCASE_MS = 5000

const toneDot = {
  primary: "bg-primary",
  cta: "bg-cta",
  aqua: "bg-aqua",
} as const

export function PlatformHeroShowcase() {
  const { hero, showcase } = landings.platform
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const tab = showcase.tabs[active]

  const prev = useCallback(
    () =>
      setActive(
        (current) => (current - 1 + showcase.tabs.length) % showcase.tabs.length
      ),
    [showcase.tabs.length]
  )
  const next = useCallback(
    () => setActive((current) => (current + 1) % showcase.tabs.length),
    [showcase.tabs.length]
  )

  const selectTab = useCallback((index: number) => {
    setActive(index)
    setPaused(true)
  }, [])

  useEffect(() => {
    if (!paused) return
    const resume = window.setTimeout(() => setPaused(false), 9000)
    return () => window.clearTimeout(resume)
  }, [paused, active])

  useEffect(() => {
    if (reduce || paused) return

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % showcase.tabs.length)
    }, SHOWCASE_MS)

    return () => window.clearInterval(timer)
  }, [reduce, paused, showcase.tabs.length])

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
          ref={rootRef}
          className="mt-10 scroll-mt-24 overflow-hidden rounded-3xl bg-card shadow-[0_24px_64px_rgba(15,43,29,0.08)] ring-1 ring-foreground/8 sm:mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!rootRef.current?.contains(event.relatedTarget as Node)) {
              setPaused(false)
            }
          }}
        >
          <div
            className="flex flex-wrap gap-1 border-b border-border/70 p-2 sm:p-2.5"
            role="tablist"
            aria-label="Campus capabilities"
          >
            {showcase.tabs.map((item, index) => {
              const selected = index === active
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectTab(index)}
                  className={cn(
                    "inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-[background-color,box-shadow,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none sm:px-4",
                    "focus-visible:ring-3 focus-visible:ring-ring/50",
                    selected
                      ? "bg-background text-foreground shadow-sm ring-1 ring-foreground/8"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "size-2.5 shrink-0 rounded-full",
                      toneDot[item.tone]
                    )}
                  />
                  {item.label}
                </button>
              )
            })}
          </div>

          <div className="relative min-h-[20rem] sm:min-h-[26rem] lg:min-h-[30rem]">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous capability"
              className="absolute top-1/2 left-3 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition-colors outline-none hover:bg-black/50 focus-visible:ring-3 focus-visible:ring-ring/50 sm:size-11 lg:left-5"
            >
              <ChevronLeftIcon className="size-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.38, ease: motionEase }}
                className="absolute inset-0"
              >
                <img
                  src={tab.image.src}
                  alt={tab.image.alt}
                  className="size-full object-cover"
                  loading={active === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/35 to-black/10"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"
                  aria-hidden
                />

                <div className="absolute inset-x-0 bottom-0 z-10 p-5 pb-16 sm:p-8 sm:pb-8 lg:p-10">
                  <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
                    <p className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                      {tab.title}
                      <ArrowRightIcon
                        className="mb-1 ml-1.5 inline size-5 text-cta sm:size-6"
                        aria-hidden
                      />
                    </p>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/88 sm:text-base lg:mx-0">
                      {tab.body}
                    </p>
                    <ul className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                      {tab.chips.map((chip) => (
                        <li
                          key={chip}
                          className="rounded-full bg-white/12 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-sm"
                        >
                          {chip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={next}
              aria-label="Next capability"
              className="absolute top-1/2 right-3 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition-colors outline-none hover:bg-black/50 focus-visible:ring-3 focus-visible:ring-ring/50 sm:size-11 lg:right-5"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </div>

          <div className="flex flex-col gap-3 border-t border-border/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-3.5">
            <div className="flex flex-wrap gap-2">
              {showcase.quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "inline-flex min-h-9 items-center rounded-full px-3.5 text-xs font-medium transition-colors",
                    "text-muted-foreground ring-1 ring-transparent hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <Button variant="cta" className="h-9 rounded-full px-5 text-sm" asChild>
              <a href="/contact">
                Enquire now
                <ArrowRightIcon className="size-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
