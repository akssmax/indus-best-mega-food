"use client"

import { useEffect, useRef, useState, type RefObject } from "react"

import { cn } from "@/lib/utils"
import { getHeroDropAnchor } from "@/lib/vgpu/fft-ocean/tuning-runtime"

type OceanTone = "paper" | "forest"
type OceanPlacement = "fill" | "right"
type OceanInteraction = "camera" | "morph" | "drop" | "factory" | "handshake" | "static"

interface OceanBackgroundProps {
  className?: string
  tone?: OceanTone
  placement?: OceanPlacement
  /** Visual scale multiplier for the WebGL canvas (e.g. 2 = 200%). */
  scale?: number
  /** Extra scale while the pointer is over the host section (e.g. 1.12). */
  hoverZoom?: number
  /** Pointer response: morph reshapes the field; camera pans the view. */
  interaction?: OceanInteraction
  /** When interaction is drop, anchors the morph to this element's top-right corner. */
  dropAnchorRef?: RefObject<HTMLElement | null>
  /** Click-to-engage drop on the campus hero; pointer mode keeps hover engage for tuners. */
  dropTrigger?: "pointer" | "click"
  /** Controlled engage strength for click-triggered drop (0 = idle ocean field). */
  dropEngaged?: boolean
  /** CTA dual morph: 0 = factory, 1 = campus grounds. */
  morphTarget?: number
}

const canvasReadyClass: Record<OceanTone, string> = {
  paper: "opacity-90",
  forest: "opacity-75 dark:opacity-90",
}

const overlayClass: Record<
  OceanTone,
  Record<OceanPlacement, string>
> = {
  paper: {
    fill: "bg-linear-to-b from-transparent from-40% to-background",
    right: "bg-linear-to-b from-transparent from-40% to-background",
  },
  forest: {
    fill:
      "bg-linear-to-b from-forest/50 via-forest/30 to-forest/70 dark:from-forest/20 dark:via-forest/10 dark:to-forest/35",
    right:
      "bg-linear-to-l from-forest from-15% via-forest/75 via-45% to-transparent dark:via-forest/55",
  },
}

function needsPointerTracking(
  interaction: OceanInteraction,
  dropTrigger: "pointer" | "click",
  hoverZoom: number
) {
  return (
    interaction === "morph" ||
    interaction === "camera" ||
    (interaction === "drop" && dropTrigger === "pointer") ||
    hoverZoom !== 1
  )
}

export function OceanBackground({
  className,
  tone = "paper",
  placement = "fill",
  scale = 1,
  hoverZoom = 1,
  interaction = "morph",
  dropAnchorRef,
  dropTrigger = "pointer",
  dropEngaged = false,
  morphTarget = 0,
}: OceanBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const anchorUVRef = useRef({ nx: 0.72, ny: 0.44 })
  const dropEngagedRef = useRef(dropEngaged)
  const dropTriggerRef = useRef(dropTrigger)
  const morphTargetRef = useRef(morphTarget)
  const setPointerRef = useRef<
    ((x: number, y: number, engage?: number) => void) | undefined
  >(undefined)
  const setMorphTargetRef = useRef<((target: number) => void) | undefined>(
    undefined
  )
  const [ready, setReady] = useState(false)
  const [pointerInside, setPointerInside] = useState(false)

  dropEngagedRef.current = dropEngaged
  dropTriggerRef.current = dropTrigger
  morphTargetRef.current = morphTarget

  const trackPointer = needsPointerTracking(interaction, dropTrigger, hoverZoom)
  const trackDropAnchor = interaction === "drop"

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    if (typeof navigator === "undefined" || !("gpu" in navigator)) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let generation = 0
    let active = false
    let setPointer: ((x: number, y: number, engage?: number) => void) | undefined
    let setDropAnchor: ((nx: number, ny: number) => void) | undefined
    let disposeRenderer: (() => void) | undefined

    const stop = () => {
      generation += 1
      active = false
      setPointer = undefined
      setPointerRef.current = undefined
      setMorphTargetRef.current = undefined
      setDropAnchor = undefined
      disposeRenderer?.()
      disposeRenderer = undefined
      setReady(false)
      if (trackPointer) setPointerInside(false)
    }

    const section = wrap.closest("section") ?? wrap

    const updateDropAnchor = () => {
      if (!trackDropAnchor || !setDropAnchor) return
      const anchor = dropAnchorRef?.current
      if (!anchor) return

      const sectionRect = section.getBoundingClientRect()
      const anchorRect = anchor.getBoundingClientRect()
      if (sectionRect.width < 1 || sectionRect.height < 1) return

      const drop = getHeroDropAnchor()
      const px =
        anchorRect.left +
        anchorRect.width * Math.max(0, Math.min(1, drop.anchorOffsetX))
      const py =
        anchorRect.top +
        anchorRect.height * Math.max(0, Math.min(1, drop.anchorOffsetY))
      const visualNx = (px - sectionRect.left) / sectionRect.width
      const visualNy = (py - sectionRect.top) / sectionRect.height
      const nx = Math.max(
        0,
        Math.min(1, 0.5 + (visualNx - 0.5) / Math.max(scale, 0.01))
      )
      const ny = Math.max(
        0,
        Math.min(1, 0.5 + (visualNy - 0.5) / Math.max(scale, 0.01))
      )
      anchorUVRef.current = { nx, ny }
      setDropAnchor(nx, ny)
    }

    const start = () => {
      if (disposeRenderer) return
      const token = ++generation
      void import("@/lib/vgpu/fft-ocean/renderer").then(({ createRenderer }) => {
        if (token !== generation || !canvas.isConnected) return
        const startEngaged =
          ((interaction === "factory" || interaction === "handshake") &&
            dropEngagedRef.current) ||
          (interaction === "drop" &&
            dropTriggerRef.current === "click" &&
            dropEngagedRef.current)
        const renderer = createRenderer({
          canvas,
          dpr: [1, 1.25],
          interaction,
          initialEngage: startEngaged ? 1 : 0,
          initialMorphTarget: morphTargetRef.current,
          onError: () => {
            if (token === generation) setReady(false)
          },
        })
        setPointer = renderer.setPointer
        setPointerRef.current = renderer.setPointer
        setMorphTargetRef.current = renderer.setMorphTarget
        setDropAnchor = renderer.setDropAnchor
        disposeRenderer = () => renderer.dispose()
        if (startEngaged) setPointer(0, 0, 1)
        void renderer.ready
          .then(() => {
            if (token === generation) {
              setReady(true)
              updateDropAnchor()
              if (
                dropEngagedRef.current &&
                (interaction === "factory" ||
                  interaction === "handshake" ||
                  dropTriggerRef.current === "click")
              ) {
                setPointer?.(0, 0, 1)
              }
            }
          })
          .catch(() => {
            if (token === generation) setReady(false)
          })
      })
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!active || !setPointer) return

      const rect = section.getBoundingClientRect()
      if (rect.width < 1 || rect.height < 1) return
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom

      if (hoverZoom !== 1) setPointerInside(inside)
      if (interaction === "static") return
      if (!inside) {
        setPointer(0, 0, 0)
        return
      }

      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      const engage =
        interaction === "drop" && dropTriggerRef.current === "click"
          ? dropEngagedRef.current
            ? 1
            : 0
          : 1
      setPointer(
        Math.max(-1, Math.min(1, x)),
        Math.max(-1, Math.min(1, y)),
        engage
      )
      updateDropAnchor()
    }

    if (trackPointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true })
    }

    if (trackDropAnchor) {
      window.addEventListener("resize", updateDropAnchor)
      window.addEventListener("scroll", updateDropAnchor, { passive: true })
    }

    const resizeObserver = trackDropAnchor
      ? new ResizeObserver(() => updateDropAnchor())
      : undefined
    if (resizeObserver) resizeObserver.observe(section)

    const anchorWatch = trackDropAnchor
      ? window.setInterval(() => {
          const anchor = dropAnchorRef?.current
          if (!anchor) return
          resizeObserver?.observe(anchor)
          updateDropAnchor()
          window.clearInterval(anchorWatch)
        }, 32)
      : undefined

    let idleId = 0
    let idleTimeout = 0

    const cancelIdleStart = () => {
      window.cancelIdleCallback?.(idleId)
      window.clearTimeout(idleTimeout)
      idleId = 0
      idleTimeout = 0
    }

    const scheduleStart = () => {
      if (disposeRenderer || idleId || idleTimeout) return
      const run = () => {
        idleId = 0
        idleTimeout = 0
        start()
      }
      const requestIdle = window.requestIdleCallback
      if (requestIdle) {
        idleId = requestIdle.call(window, run, { timeout: 1600 })
        return
      }
      idleTimeout = window.setTimeout(run, 280)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          active = true
          scheduleStart()
        } else {
          active = false
          cancelIdleStart()
          stop()
        }
      },
      { rootMargin: "48px" }
    )
    observer.observe(wrap)

    const hostRect = section.getBoundingClientRect()
    if (hostRect.bottom > -48 && hostRect.top < window.innerHeight + 48) {
      active = true
      scheduleStart()
    }

    return () => {
      cancelIdleStart()
      if (anchorWatch) window.clearInterval(anchorWatch)
      if (trackPointer) {
        window.removeEventListener("pointermove", onPointerMove)
      }
      if (trackDropAnchor) {
        window.removeEventListener("resize", updateDropAnchor)
        window.removeEventListener("scroll", updateDropAnchor)
      }
      resizeObserver?.disconnect()
      observer.disconnect()
      stop()
    }
  }, [
    interaction,
    dropAnchorRef,
    dropTrigger,
    scale,
    hoverZoom,
    trackPointer,
    trackDropAnchor,
  ])

  useEffect(() => {
    if (!ready) return
    if (interaction === "factory" || interaction === "handshake") {
      setPointerRef.current?.(0, 0, dropEngaged ? 1 : 0)
      setMorphTargetRef.current?.(morphTarget)
      return
    }
    if (interaction !== "drop" || dropTrigger !== "click") return
    setPointerRef.current?.(0, 0, dropEngaged ? 1 : 0)
  }, [dropEngaged, ready, interaction, dropTrigger, morphTarget])

  const liveScale = scale * (pointerInside && hoverZoom !== 1 ? hoverZoom : 1)
  const scaled = liveScale !== 1
  const transformOrigin = placement === "right" ? "right center" : "center center"

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute overflow-hidden",
        placement === "fill" && "inset-0",
        placement === "right" &&
          "right-0 top-1/2 h-[140%] w-[62%] -translate-y-1/2 sm:w-[56%] lg:w-[52%]",
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={
          scaled
            ? {
                transform: `scale(${liveScale})`,
                transformOrigin,
                transition: "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
              }
            : undefined
        }
      >
        <canvas
          ref={canvasRef}
          className={cn(
            "absolute inset-0 size-full transition-opacity duration-700",
            ready ? canvasReadyClass[tone] : "opacity-0"
          )}
        />
        <div className={cn("absolute inset-0", overlayClass[tone][placement])} />
      </div>
    </div>
  )
}
