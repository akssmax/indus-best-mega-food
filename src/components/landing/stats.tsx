import { useEffect, useMemo, useRef, useState } from "react"
import {
  MapPinIcon,
  BuildingOffice2Icon,
  MapIcon,
  CubeIcon,
  ArchiveBoxIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline"
import { animate, motion, useInView, useReducedMotion } from "framer-motion"

import { landing } from "@/content/landing"
import { Eyebrow, Section } from "@/components/landing/section"
import { motionEase, Reveal, Stagger, MotionItem } from "@/components/landing/motion"
import { cn } from "@/lib/utils"

const icons = [
  MapPinIcon,
  BuildingOffice2Icon,
  MapIcon,
  CubeIcon,
  ArchiveBoxIcon,
  BuildingLibraryIcon,
] as const

const ease = motionEase

type ParsedValue =
  | { kind: "animate"; numeric: number; suffix: string; formatCommas: boolean }
  | { kind: "static"; display: string }

function parseStatValue(value: string): ParsedValue {
  if (/[–-]/.test(value)) {
    return { kind: "static", display: value }
  }

  const plusMatch = value.match(/^([\d,]+)\+$/)
  if (plusMatch) {
    return {
      kind: "animate",
      numeric: Number.parseInt(plusMatch[1].replace(/,/g, ""), 10),
      suffix: "+",
      formatCommas: false,
    }
  }

  const unitMatch = value.match(/^([\d,]+)\s+(.+)$/)
  if (unitMatch) {
    return {
      kind: "animate",
      numeric: Number.parseInt(unitMatch[1].replace(/,/g, ""), 10),
      suffix: ` ${unitMatch[2]}`,
      formatCommas: unitMatch[1].includes(","),
    }
  }

  const numeric = Number.parseFloat(value.replace(/,/g, ""))
  if (!Number.isNaN(numeric)) {
    return {
      kind: "animate",
      numeric,
      suffix: "",
      formatCommas: value.includes(","),
    }
  }

  return { kind: "static", display: value }
}

function formatCount(n: number, withCommas: boolean) {
  const rounded = Math.round(n)
  return withCommas ? rounded.toLocaleString("en-IN") : String(rounded)
}

function AnimatedStatValue({
  value,
  className,
  delay = 0,
}: {
  value: string
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const parsed = useMemo(() => parseStatValue(value), [value])
  const [display, setDisplay] = useState(() =>
    parsed.kind === "static"
      ? parsed.display
      : formatCount(0, parsed.formatCommas) + parsed.suffix
  )

  useEffect(() => {
    if (parsed.kind === "static") {
      setDisplay(parsed.display)
      return
    }

    if (!inView || reduce) {
      setDisplay(formatCount(parsed.numeric, parsed.formatCommas) + parsed.suffix)
      return
    }

    setDisplay(formatCount(0, parsed.formatCommas) + parsed.suffix)

    const controls = animate(0, parsed.numeric, {
      duration: 1.1,
      ease,
      delay,
      onUpdate: (current) => {
        setDisplay(formatCount(current, parsed.formatCommas) + parsed.suffix)
      },
    })

    return () => controls.stop()
  }, [delay, inView, parsed, reduce])

  return (
    <p ref={ref} className={className}>
      {display}
    </p>
  )
}

function StatCard({
  value,
  label,
  index,
}: {
  value: string
  label: string
  index: number
}) {
  const Icon = icons[index] ?? MapPinIcon
  const reduce = useReducedMotion()

  const card = (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 sm:p-6",
        "bg-white/[0.07] ring-1 ring-white/12",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
        "transition-colors hover:bg-white/[0.11] hover:ring-white/20"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cta/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
      />

      <span
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-xl",
          "bg-cta/15 text-cta ring-1 ring-cta/25",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        )}
      >
        <Icon className="size-5" strokeWidth={1.75} aria-hidden />
      </span>

      <AnimatedStatValue
        value={value}
        delay={index * 0.06}
        className="mt-5 font-heading text-3xl font-bold tracking-tight text-forest-foreground sm:text-4xl"
      />

      <p className="mt-2 text-sm leading-snug text-forest-foreground/72">{label}</p>
    </article>
  )

  if (reduce) return card

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease }}
      className="h-full"
    >
      {card}
    </motion.div>
  )
}

export function Stats() {
  const { numbers } = landing

  return (
    <Section id={numbers.id} className="relative overflow-hidden bg-forest text-forest-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(255,255,255,0.08),transparent_55%)]"
      />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <Eyebrow className="text-cta">{numbers.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{numbers.title}</h2>
      </Reveal>

      <Stagger className="relative mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3 xl:grid-cols-6">
        {numbers.items.map((stat, index) => (
          <MotionItem key={stat.label}>
            <StatCard value={stat.value} label={stat.label} index={index} />
          </MotionItem>
        ))}
      </Stagger>
    </Section>
  )
}
