"use client"

import { useCallback, useEffect, useRef, useState, type RefObject } from "react"

import type { VirtualTourZone } from "@/content/virtual-tour"
import { CampusHotspots } from "@/components/ui/campus-hotspots"
import { BorderBeam } from "@/components/ui/border-beam"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const timelineDotClass = {
  active:
    "scale-110 bg-cta text-cta-foreground shadow-[0_0_0_5px_color-mix(in_oklch,var(--cta)_28%,transparent)] ring-2 ring-cta/50",
  passed: "bg-cta/15 text-foreground ring-1 ring-cta/30",
  upcoming: "bg-muted text-muted-foreground ring-1 ring-border",
} as const

function resolveActiveFromScroll(sections: HTMLElement[]) {
  const vh = window.innerHeight
  const focusLine = vh * 0.33
  const lastIndex = sections.length - 1
  const lastSection = sections[lastIndex]

  let activeIndex = 0
  let containsFocus = false

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect()
    if (rect.top <= focusLine && rect.bottom > focusLine) {
      activeIndex = index
      containsFocus = true
    }
  })

  if (!containsFocus) {
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= focusLine) {
        activeIndex = Math.max(activeIndex, index)
      }
    })
  }

  const lastRect = lastSection?.getBoundingClientRect()
  const pastTourEnd = lastRect != null && lastRect.bottom < focusLine
  if (pastTourEnd) {
    activeIndex = lastIndex
  }

  const activeId = sections[activeIndex]?.dataset.tourZone ?? null
  let segmentProgress = 0

  const current = sections[activeIndex]
  const next = sections[activeIndex + 1]
  if (current && next) {
    const currentTop = current.getBoundingClientRect().top
    const nextTop = next.getBoundingClientRect().top
    const span = nextTop - currentTop
    if (span > 0) {
      segmentProgress = Math.min(1, Math.max(0, (focusLine - currentTop) / span))
    }
  } else if (current && !next) {
    segmentProgress = 1
  }

  return { activeId, activeIndex, segmentProgress, focusLine, pastTourEnd }
}

function computeRailFillHeight(
  rail: HTMLElement,
  dots: HTMLDivElement[],
  focusLine: number
) {
  if (dots.length === 0) return 0

  const railTop = rail.getBoundingClientRect().top
  const centers = dots.map(
    (dot) => dot.getBoundingClientRect().top + dot.offsetHeight / 2
  )
  const firstCenter = centers[0]! - railTop
  const lastCenter = centers[centers.length - 1]! - railTop

  if (focusLine <= centers[0]!) {
    return 0
  }

  if (focusLine >= centers[centers.length - 1]!) {
    return Math.max(0, lastCenter - firstCenter)
  }

  return Math.max(0, focusLine - railTop - firstCenter)
}

function TimelineZone({
  zone,
  index,
  zoneCount,
  active,
  passed,
  dotRef,
}: {
  zone: VirtualTourZone
  index: number
  zoneCount: number
  active: boolean
  passed: boolean
  dotRef: (el: HTMLDivElement | null) => void
}) {
  const hasPins = zone.pins && zone.pins.length > 0

  return (
    <article
      id={zone.id}
      data-tour-zone={zone.id}
      className="relative scroll-mt-28 pb-14 last:pb-0 sm:pb-16 lg:scroll-mt-32"
      aria-labelledby={`tour-heading-${zone.id}`}
    >
      <div
        ref={dotRef}
        aria-current={active ? "step" : undefined}
        className={cn(
          "absolute top-2 left-0 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300",
          active
            ? timelineDotClass.active
            : passed
              ? timelineDotClass.passed
              : timelineDotClass.upcoming
        )}
      >
        {index + 1}
      </div>

      <div className="min-w-0 pl-8 sm:pl-10">
        <p
          className={cn(
            "text-xs font-medium tracking-[0.18em] uppercase transition-colors",
            active ? "text-cta" : "text-muted-foreground"
          )}
        >
          Stop {index + 1} of {zoneCount}
        </p>
        <h3
          id={`tour-heading-${zone.id}`}
          className={cn(
            "mt-2 font-heading text-2xl font-semibold transition-colors sm:text-3xl",
            active ? "text-foreground" : "text-foreground/85"
          )}
        >
          {zone.label}
        </h3>
        <p className="mt-1 text-lg font-medium text-foreground/90">{zone.title}</p>
        <p className="mt-3 leading-relaxed text-muted-foreground">{zone.body}</p>

        <div
          className={cn(
            "relative mt-6 min-w-0 overflow-hidden rounded-2xl",
            active && "ring-1 ring-cta/25"
          )}
        >
          {active ? (
            <BorderBeam
              duration={8}
              borderWidth={1}
              colorFrom="var(--cta)"
              colorTo="color-mix(in oklch, var(--primary) 55%, transparent)"
            />
          ) : null}
          {zone.image.placeholder ? (
            <Badge
              variant="secondary"
              className="absolute top-3 left-3 z-20 bg-background/90 backdrop-blur-sm"
            >
              Photo updating
            </Badge>
          ) : null}
          {hasPins ? (
            <CampusHotspots
              src={zone.image.src}
              alt={zone.image.alt}
              pins={zone.pins!}
              pinsAlwaysVisible
              className="aspect-[16/10] min-h-[12rem] w-full rounded-2xl sm:min-h-[16rem]"
            />
          ) : (
            <div className="relative aspect-[16/10] min-h-[12rem] overflow-hidden bg-muted sm:min-h-[16rem]">
              <img
                src={zone.image.src}
                alt={zone.image.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-forest/40 via-transparent to-transparent" />
            </div>
          )}
        </div>

        {zone.specs.length > 0 ? (
          <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {zone.specs.map((spec) => (
              <div
                key={`${spec.label}-${spec.value}`}
                className="rounded-xl border border-border/60 bg-card px-4 py-3"
              >
                <dt className="text-xs font-medium text-muted-foreground">{spec.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{spec.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {zone.centres && zone.centres.length > 0 ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {zone.centres.map((centre) => (
              <div
                key={centre.name}
                className="rounded-xl border border-border/60 bg-card px-4 py-3"
              >
                <p className="font-semibold text-foreground">{centre.name}</p>
                {centre.subtitle ? (
                  <p className="text-xs text-muted-foreground">{centre.subtitle}</p>
                ) : null}
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {centre.specs.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export function TourTimeline({
  zones,
  activeId,
  onActiveChange,
  scrollLockRef,
}: {
  zones: readonly VirtualTourZone[]
  activeId: string
  onActiveChange: (id: string) => void
  scrollLockRef: RefObject<boolean>
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  const rafRef = useRef<number | null>(null)
  const currentActiveIdRef = useRef(activeId)
  const [currentActiveId, setCurrentActiveId] = useState(activeId)
  const [fillHeight, setFillHeight] = useState(0)

  const activeIndex = zones.findIndex((z) => z.id === currentActiveId)

  const measureTimeline = useCallback(() => {
    const root = rootRef.current
    const rail = railRef.current
    const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!root || !rail || dots.length === 0) return

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-tour-zone]")
    )
    if (sections.length === 0) return

    const { activeId: scrollActiveId, focusLine } =
      resolveActiveFromScroll(sections)

    setFillHeight(computeRailFillHeight(rail, dots, focusLine))

    if (scrollLockRef.current || !scrollActiveId) return

    if (scrollActiveId !== currentActiveIdRef.current) {
      currentActiveIdRef.current = scrollActiveId
      setCurrentActiveId(scrollActiveId)
      onActiveChange(scrollActiveId)
    }
  }, [onActiveChange, scrollLockRef])

  const scheduleMeasure = useCallback(() => {
    if (rafRef.current != null) return
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null
      measureTimeline()
    })
  }, [measureTimeline])

  useEffect(() => {
    currentActiveIdRef.current = activeId
    setCurrentActiveId(activeId)
    scheduleMeasure()
  }, [activeId, scheduleMeasure])

  useEffect(() => {
    scheduleMeasure()
    window.addEventListener("scroll", scheduleMeasure, { passive: true })
    window.addEventListener("resize", scheduleMeasure)
    window.addEventListener("virtual-tour:scroll-unlock", scheduleMeasure)

    const root = rootRef.current
    const resizeObserver =
      root && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => scheduleMeasure())
        : null
    if (root && resizeObserver) {
      resizeObserver.observe(root)
    }

    return () => {
      window.removeEventListener("scroll", scheduleMeasure)
      window.removeEventListener("resize", scheduleMeasure)
      window.removeEventListener("virtual-tour:scroll-unlock", scheduleMeasure)
      resizeObserver?.disconnect()
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [scheduleMeasure])

  return (
    <div ref={rootRef} className="relative mt-10 pl-4 sm:pl-5">
      <div
        ref={railRef}
        aria-hidden
        className="absolute top-6 bottom-6 left-4 w-0.5 -translate-x-1/2 rounded-full bg-border sm:left-5"
      >
        <div
          className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-cta via-cta/90 to-primary will-change-[height]"
          style={{ height: fillHeight }}
        />
      </div>

      <nav aria-label="Tour timeline" className="relative flex flex-col">
        {zones.map((zone, index) => (
          <TimelineZone
            key={zone.id}
            zone={zone}
            index={index}
            zoneCount={zones.length}
            active={activeIndex === index}
            passed={activeIndex > index}
            dotRef={(el) => {
              dotRefs.current[index] = el
            }}
          />
        ))}
      </nav>
    </div>
  )
}

export { timelineDotClass }
