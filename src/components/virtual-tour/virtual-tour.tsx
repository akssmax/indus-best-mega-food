"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import {
  getVirtualTourZoneIndex,
  virtualTour,
  type VirtualTourZoneId,
} from "@/content/virtual-tour"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { TourMiniMap } from "@/components/virtual-tour/tour-mini-map"
import { TourTimeline } from "@/components/virtual-tour/tour-timeline"

const zones = virtualTour.zones
const defaultZoneId = zones[0]?.id ?? "overview"

function readHashZoneId(): VirtualTourZoneId {
  if (typeof window === "undefined") return defaultZoneId as VirtualTourZoneId
  const hash = window.location.hash.replace(/^#/, "")
  const index = getVirtualTourZoneIndex(hash)
  if (index >= 0) return hash as VirtualTourZoneId
  return defaultZoneId as VirtualTourZoneId
}

function replaceTourHash(id: string) {
  const url = `${window.location.pathname}${window.location.search}#${id}`
  window.history.replaceState(
    { ...window.history.state, __hashScrollIntoViewOptions: false },
    "",
    url
  )
}

function scrollToZone(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior, block: "start" })
}

export function VirtualTourSection() {
  const [activeId, setActiveId] = useState<VirtualTourZoneId>(
    defaultZoneId as VirtualTourZoneId
  )
  const scrollLockRef = useRef(false)
  const scrollLockTimerRef = useRef<number | null>(null)

  const lockScrollSpy = useCallback((ms = 900) => {
    scrollLockRef.current = true
    if (scrollLockTimerRef.current != null) {
      window.clearTimeout(scrollLockTimerRef.current)
    }
    scrollLockTimerRef.current = window.setTimeout(() => {
      scrollLockRef.current = false
      scrollLockTimerRef.current = null
      window.dispatchEvent(new CustomEvent("virtual-tour:scroll-unlock"))
    }, ms)
  }, [])

  const selectZone = useCallback(
    (id: string, scroll = true) => {
      const index = getVirtualTourZoneIndex(id)
      if (index < 0) return
      setActiveId(id as VirtualTourZoneId)
      if (typeof window !== "undefined") {
        replaceTourHash(id)
        if (scroll) {
          lockScrollSpy()
          scrollToZone(id)
        }
      }
    },
    [lockScrollSpy]
  )

  const onActiveChange = useCallback((id: string) => {
    setActiveId((current) => (current === id ? current : (id as VirtualTourZoneId)))
  }, [])

  useEffect(() => {
    const id = readHashZoneId()
    setActiveId(id)
    if (id !== defaultZoneId) {
      requestAnimationFrame(() => scrollToZone(id, "instant"))
    }
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      const id = readHashZoneId()
      setActiveId(id)
      lockScrollSpy()
      scrollToZone(id)
    }
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [lockScrollSpy])

  useEffect(
    () => () => {
      if (scrollLockTimerRef.current != null) {
        window.clearTimeout(scrollLockTimerRef.current)
      }
    },
    []
  )

  return (
    <Section id="tour" className="bg-background pb-8 lg:pb-12">
      <Reveal className="max-w-2xl">
        <Eyebrow>{virtualTour.section.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{virtualTour.section.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {virtualTour.section.body}
        </p>
      </Reveal>

      <div className="relative lg:pr-48">
        <TourMiniMap
          zones={zones}
          activeId={activeId}
          onSelect={(id) => selectZone(id, true)}
          variant="floating"
        />
        <TourTimeline
          zones={zones}
          activeId={activeId}
          onActiveChange={onActiveChange}
          scrollLockRef={scrollLockRef}
        />
      </div>
    </Section>
  )
}
