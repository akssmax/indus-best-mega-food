import { useEffect, useRef, useState } from "react"
import { animate, motion, useInView, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

const ARC_PATH = "M20 108 A80 80 0 0 1 180 108"
const ARC_LENGTH = 220
const ARC_OFFSET = 40
const ease = [0.22, 1, 0.36, 1] as const

const chipListVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.55 },
  },
}

const chipVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease },
  },
}

function AnimatedValue({
  value,
  reduced,
}: {
  value: string
  reduced: boolean | null
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.45 })
  const numeric = Number.parseFloat(value.replace(/[^\d.]/g, ""))
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!inView || reduced || Number.isNaN(numeric)) {
      setDisplay(value)
      return
    }

    const controls = animate(0, numeric, {
      duration: 0.85,
      ease,
      onUpdate: (current) => {
        setDisplay(String(Math.round(current)))
      },
    })

    return () => controls.stop()
  }, [inView, reduced, numeric, value])

  return (
    <p
      ref={ref}
      className="font-heading text-4xl font-semibold tracking-tight text-primary"
    >
      {display}
    </p>
  )
}

export function CollectionGauge({
  value,
  unit,
  sites,
  className,
}: {
  value: string
  unit: string
  sites: readonly string[]
  className?: string
}) {
  const [active, setActive] = useState<number | null>(null)
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { once: true, amount: 0.45 })

  const ChipList = reduce ? "div" : motion.div
  const chipListProps = reduce
    ? {}
    : {
        initial: "hidden" as const,
        animate: inView ? ("show" as const) : ("hidden" as const),
        variants: chipListVariants,
      }

  return (
    <div ref={rootRef} className={cn("flex flex-col items-center", className)}>
      <div className="relative w-full max-w-[260px]">
        <svg viewBox="0 0 200 120" className="w-full" aria-hidden="true">
          <path
            d={ARC_PATH}
            fill="none"
            stroke="currentColor"
            className="text-muted"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {reduce ? (
            <path
              d={ARC_PATH}
              fill="none"
              stroke="currentColor"
              className="text-primary"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={ARC_LENGTH}
              strokeDashoffset={ARC_OFFSET}
            />
          ) : (
            <motion.path
              d={ARC_PATH}
              fill="none"
              stroke="currentColor"
              className="text-primary drop-shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_28%,transparent)]"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={ARC_LENGTH}
              initial={{ strokeDashoffset: ARC_LENGTH }}
              animate={
                inView ? { strokeDashoffset: ARC_OFFSET } : { strokeDashoffset: ARC_LENGTH }
              }
              transition={{ duration: 1.05, ease, delay: 0.06 }}
            />
          )}
        </svg>

        <div className="absolute inset-x-0 top-[42%] text-center">
          <AnimatedValue value={value} reduced={reduce} />
          {reduce ? (
            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              {unit}
            </p>
          ) : (
            <motion.p
              className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase"
              initial={{ opacity: 0, y: 4 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={{ duration: 0.45, ease, delay: 0.35 }}
            >
              {unit}
            </motion.p>
          )}
        </div>
      </div>

      <ChipList
        className="mt-5 flex w-full max-w-[260px] flex-wrap justify-center gap-2"
        {...chipListProps}
      >
        {sites.map((site, index) => {
          const Chip = reduce ? "button" : motion.button

          return (
            <Chip
              key={site}
              type="button"
              onClick={() => setActive(index === active ? null : index)}
              {...(reduce ? {} : { variants: chipVariants })}
              className={cn(
                "min-h-11 touch-target rounded-full px-4 py-2 text-sm font-medium ring-1 transition-colors outline-none",
                "focus-visible:ring-3 focus-visible:ring-ring/50",
                active === index
                  ? "bg-primary text-primary-foreground ring-primary"
                  : "bg-muted/60 text-muted-foreground ring-transparent hover:bg-muted active:bg-muted/80"
              )}
            >
              {site}
            </Chip>
          )
        })}
      </ChipList>
    </div>
  )
}
