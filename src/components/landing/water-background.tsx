"use client"

import { useCallback, useRef, useState } from "react"
import { Water, waterPresets } from "@paper-design/shaders-react"
import type { WaterProps } from "@paper-design/shaders-react"

const abstractPreset = waterPresets.find((p) => p.name === "Abstract")!

interface WaterBackgroundProps {
  colorBack?: string
  colorHighlight?: string
  opacity?: number
  className?: string
}

export function WaterBackground({
  colorBack = "#1a3a2a",
  colorHighlight = "#c8a84e",
  opacity = 0.35,
  className,
}: WaterBackgroundProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const animate = useCallback(() => {
    currentRef.current = {
      x: lerp(currentRef.current.x, targetRef.current.x, 0.05),
      y: lerp(currentRef.current.y, targetRef.current.y, 0.05),
    }
    setOffset({ x: currentRef.current.x, y: currentRef.current.y })
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      targetRef.current = { x: x * 0.15, y: y * 0.15 }
      if (rafRef.current === 0) {
        rafRef.current = requestAnimationFrame(animate)
      }
    },
    [animate]
  )

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 }
  }, [])

  const waterProps: WaterProps = {
    ...abstractPreset.params,
    colorBack,
    colorHighlight,
    highlights: 0.15,
    layering: 0.4,
    edges: 1,
    waves: 1,
    caustic: 0.5,
    size: 0.2,
    speed: 0.6,
    scale: 2.5,
    fit: "cover",
    offsetX: offset.x,
    offsetY: offset.y,
  }

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ opacity }}
    >
      <Water
        width="100%"
        height="100%"
        {...waterProps}
      />
    </div>
  )
}
