import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

const slides = [
  {
    src: "/images/warehouse.jpg",
    alt: "Cold storage warehouse at Indus Best Mega Food Park",
    caption: "Cold chain & dry warehouse",
  },
  {
    src: "/images/admin-building.jpg",
    alt: "Admin building and developed industrial plots",
    caption: "Industrial plots & campus",
  },
  {
    src: "/images/aseptic-line.jpg",
    alt: "Aseptic tomato processing line",
    caption: "Aseptic processing lines",
  },
  {
    src: "/images/evaporator.jpg",
    alt: "Evaporator and pack-house equipment",
    caption: "Pack house & evaporator",
  },
  {
    src: "/images/cpc-building.jpg",
    alt: "Primary processing centre building",
    caption: "Primary processing centre",
  },
  {
    src: "/images/weigh-bridge.jpg",
    alt: "Weighbridge at campus gate",
    caption: "Weighbridge & logistics",
  },
  {
    src: "/images/admin-lab.jpg",
    alt: "Quality control laboratory",
    caption: "Quality labs",
  },
] as const

const fadeEase = [0.22, 1, 0.36, 1] as const

export function AtelierHeroGallery({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      5200
    )
    return () => window.clearInterval(id)
  }, [reduce])

  const active = slides[index]

  return (
    <div className={cn("relative overflow-hidden bg-forest", className)}>
      {slides.map((slide, slideIndex) => (
        <motion.img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          aria-hidden={slideIndex !== index}
          className="absolute inset-0 size-full object-cover"
          initial={false}
          animate={{
            opacity: slideIndex === index ? 1 : 0,
            scale: slideIndex === index ? 1 : 1.06,
          }}
          transition={{
            opacity: { duration: reduce ? 0 : 1.1, ease: fadeEase },
            scale: { duration: reduce ? 0 : 6, ease: "linear" },
          }}
        />
      ))}

      <div
        aria-live="polite"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/15 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
        <motion.p
          key={active.caption}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: fadeEase }}
          className="font-heading text-sm font-medium tracking-wide text-forest-foreground sm:text-base"
        >
          {active.caption}
        </motion.p>

        <div className="mt-4 flex gap-1.5">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show ${slide.caption}`}
              aria-current={slideIndex === index ? "true" : undefined}
              onClick={() => setIndex(slideIndex)}
              className={cn(
                "h-1 min-w-0 flex-1 touch-manipulation transition-colors",
                slideIndex === index ? "bg-cta" : "bg-forest-foreground/35 hover:bg-forest-foreground/55"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
