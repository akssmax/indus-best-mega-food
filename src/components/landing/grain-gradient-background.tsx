"use client"

import { useCallback, useRef, useState } from "react"
import { GrainGradient, grainGradientPresets } from "@paper-design/shaders-react"
import type { GrainGradientProps } from "@paper-design/shaders-react"

const wavePreset = grainGradientPresets.find((p) => p.name === "Wave")!

interface GrainGradientBackgroundProps {
  colors?: string[]
  colorBack?: string
  opacity?: number
  className?: string
  shape?: GrainGradientProps["shape"]
  speed?: number
}

export function GrainGradientBackground({
  colors = ["#1a3a2a", "#c8a84e", "#2d6a5a", "#0f2b1d"],
  colorBack = "#0f2b1d",
  opacity = 0.5,
  className,
  shape = "wave",
  speed = 0.4,
}: GrainGradientBackgroundProps) {
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

  const gradientProps: GrainGradientProps = {
    ...wavePreset.params,
    colors,
    colorBack,
    softness: 0.7,
    intensity: 0.15,
    noise: 0.5,
    shape,
    speed,
    scale: 0.8,
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
      <GrainGradient
        width="100%"
        height="100%"
        {...gradientProps}
      />
    </div>
  )
}
