"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type OceanTone = "paper" | "forest"

interface OceanBackgroundProps {
  className?: string
  tone?: OceanTone
}

const canvasOpacity: Record<OceanTone, string> = {
  paper: "opacity-90",
  forest: "opacity-75",
}

const overlayClass: Record<OceanTone, string> = {
  paper: "bg-linear-to-b from-transparent from-40% to-background",
  forest: "bg-linear-to-b from-forest/50 via-forest/30 to-forest/70",
}

export function OceanBackground({
  className,
  tone = "paper",
}: OceanBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    if (typeof navigator === "undefined" || !("gpu" in navigator)) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let generation = 0
    let setPointer: ((x: number, y: number) => void) | undefined
    let disposeRenderer: (() => void) | undefined

    const stop = () => {
      generation += 1
      setPointer = undefined
      disposeRenderer?.()
      disposeRenderer = undefined
      setReady(false)
    }

    const start = () => {
      if (disposeRenderer) return
      const token = ++generation
      void import("@/lib/vgpu/fft-ocean/renderer").then(({ createRenderer }) => {
        if (token !== generation || !canvas.isConnected) return
        const renderer = createRenderer({
          canvas,
          dpr: [1, 1.25],
          onError: () => {
            if (token === generation) setReady(false)
          },
        })
        setPointer = renderer.setPointer
        disposeRenderer = () => renderer.dispose()
        void renderer.ready
          .then(() => {
            if (token === generation) setReady(true)
          })
          .catch(() => {
            if (token === generation) setReady(false)
          })
      })
    }

    const host = wrap.closest("section") ?? wrap

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      if (rect.width < 1 || rect.height < 1) return
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      if (!inside) {
        setPointer?.(0, 0)
        return
      }
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      setPointer?.(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)))
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) start()
        else stop()
      },
      { rootMargin: "160px" }
    )
    observer.observe(wrap)

    const hostRect = host.getBoundingClientRect()
    if (hostRect.bottom > -160 && hostRect.top < window.innerHeight + 160) {
      start()
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      observer.disconnect()
      stop()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 size-full transition-opacity duration-700",
          ready ? canvasOpacity[tone] : "opacity-0"
        )}
      />
      <div className={cn("absolute inset-0", overlayClass[tone])} />
    </div>
  )
}
