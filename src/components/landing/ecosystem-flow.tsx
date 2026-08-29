import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  BeakerIcon,
  BuildingOffice2Icon,
  SparklesIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion"

import { primaryProcessingCentres } from "@/content/facilities"
import { landing } from "@/content/landing"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal, motionEase } from "@/components/landing/motion"
import { DropFlourish, PatternBand } from "@/components/ui/brand-pattern"
import { SectionBand } from "@/lib/section-band"
import { cn } from "@/lib/utils"

const STAGE_DURATION_MS = 4800
const layoutTransition = { duration: 0.55, ease: motionEase }
const PANEL_HEIGHT = "h-[32rem]"
const DETAIL_SLOT_HEIGHT = "h-[13.5rem]"

function parseStageStatValue(value: string) {
  if (/[–-]/.test(value) || /[A-Za-z]/.test(value.replace(/MT|MT\/H|MTPH/g, ""))) {
    return { kind: "static" as const, display: value }
  }

  const plusMatch = value.match(/^([\d,]+)\+$/)
  if (plusMatch) {
    return {
      kind: "animate" as const,
      numeric: Number.parseInt(plusMatch[1].replace(/,/g, ""), 10),
      suffix: "+",
      formatCommas: false,
    }
  }

  const unitMatch = value.match(/^([\d,]+(?:\.\d+)?)\s+(.+)$/)
  if (unitMatch) {
    return {
      kind: "animate" as const,
      numeric: Number.parseFloat(unitMatch[1].replace(/,/g, "")),
      suffix: ` ${unitMatch[2]}`,
      formatCommas: unitMatch[1].includes(","),
    }
  }

  const numeric = Number.parseFloat(value.replace(/,/g, ""))
  if (!Number.isNaN(numeric)) {
    return {
      kind: "animate" as const,
      numeric,
      suffix: "",
      formatCommas: value.includes(","),
    }
  }

  return { kind: "static" as const, display: value }
}

function formatStageCount(n: number, withCommas: boolean) {
  const rounded = Math.round(n)
  return withCommas ? rounded.toLocaleString("en-IN") : String(rounded)
}

function StageStatValue({
  value,
  stageKey,
  delay = 0,
  className,
}: {
  value: string
  stageKey: string
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const parsed = useMemo(() => parseStageStatValue(value), [value])
  const [display, setDisplay] = useState(() =>
    parsed.kind === "static"
      ? parsed.display
      : formatStageCount(0, parsed.formatCommas) + parsed.suffix
  )

  useEffect(() => {
    if (parsed.kind === "static") {
      setDisplay(parsed.display)
      return
    }

    if (reduce) {
      setDisplay(formatStageCount(parsed.numeric, parsed.formatCommas) + parsed.suffix)
      return
    }

    setDisplay(formatStageCount(0, parsed.formatCommas) + parsed.suffix)

    const controls = animate(0, parsed.numeric, {
      duration: 0.85,
      ease: motionEase,
      delay,
      onUpdate: (current) => {
        setDisplay(formatStageCount(current, parsed.formatCommas) + parsed.suffix)
      },
    })

    return () => controls.stop()
  }, [delay, parsed, reduce, stageKey])

  return (
    <p className={className}>
      {display}
    </p>
  )
}

function StageStatsRow({ active }: { active: number }) {
  const reduce = useReducedMotion()
  const stage = flowStages[active]

  return (
    <div className="mt-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.step}
          role="group"
          aria-label={`${stage.label} metrics`}
          aria-live="polite"
          className="grid gap-4 sm:grid-cols-3"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.22, ease: motionEase }}
        >
          {stage.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: index * 0.07, ease: motionEase }}
              className={cn(
                "relative overflow-hidden rounded-2xl px-5 py-4 text-center",
                "bg-forest-foreground/8"
              )}
            >
              <StageStatValue
                value={stat.value}
                stageKey={stage.step}
                delay={0.12 + index * 0.08}
                className={cn(
                  "font-heading font-semibold tabular-nums text-white",
                  stat.value.length > 8 ? "text-xl sm:text-2xl" : "text-2xl"
                )}
              />
              <p className="mt-1 text-xs leading-snug text-white/75">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const flowStages = [
  {
    step: "01",
    label: "Source",
    title: "Growing belt & PPC intake",
    summary:
      "Agri and horticulture across the production belt, collected and graded before it reaches the central campus.",
    highlights: [
      "Farmers in the Chhattisgarh growing belt",
      `Intake at ${primaryProcessingCentres.length} Primary Processing Centres`,
    ],
    image: {
      src: "/images/admin-building.jpg",
      alt: "Primary processing centre building",
      position: "center 35%",
    },
    tint: "from-cta/30",
    icon: SparklesIcon,
    stats: [
      { value: String(primaryProcessingCentres.length), label: "Primary processing centres" },
      { value: "3 districts", label: "Durg · Bilaspur · Abhanpur" },
      { value: "Growing belt", label: "Agri & horticulture catchment" },
    ],
  },
  {
    step: "02",
    label: "Central campus",
    title: "Indus Best Mega Food Park",
    summary:
      "Central campus at Village Bemta–Sarora — serviced plots, plug-and-play sheds, and shared processing infrastructure.",
    highlights: [
      "30–35 serviced industrial plots",
      "16 MSME sheds with utilities in place",
    ],
    image: {
      src: "/images/cpc-building.jpg",
      alt: "Central processing campus at Bemta–Sarora",
      position: "center 55%",
    },
    tint: "from-primary/25",
    icon: BuildingOffice2Icon,
    stats: [
      { value: "30–35", label: "Serviced industrial plots" },
      { value: "16", label: "MSME plug-and-play sheds" },
      { value: "50+", label: "Acres on campus" },
    ],
  },
  {
    step: "03",
    label: "Manufacture",
    title: "Processing & cold chain",
    summary:
      "Aseptic concentrate, IQF, pack house, and frozen/chilled storage on shared lines already running on campus.",
    highlights: [
      "Tomato 12 MTPH · Mango 6 MTPH",
      "5,000 MT cold · IQF 2 MT/H · Pack house 10 MT/H",
    ],
    image: {
      src: "/images/aseptic-line.jpg",
      alt: "Aseptic processing line on campus",
      position: "center center",
    },
    tint: "from-primary/20",
    icon: BeakerIcon,
    stats: [
      { value: "12 MTPH", label: "Tomato concentrate line" },
      { value: "6 MTPH", label: "Mango puree line" },
      { value: "2 MT/H", label: "IQF freeze capacity" },
    ],
  },
  {
    step: "04",
    label: "Market",
    title: "Storage & dispatch",
    summary:
      "Dry bulk warehousing beside production, with highway and rail connectivity for dispatch-ready logistics.",
    highlights: [
      "12,000 MT dry bulk warehouse",
      "NH-53 access · rail at Tilda",
    ],
    image: {
      src: "/images/weigh-bridge.jpg",
      alt: "Weighbridge and campus dispatch gate",
      position: "center 65%",
    },
    tint: "from-cta/25",
    icon: TruckIcon,
    stats: [
      { value: "12,000 MT", label: "Dry bulk warehouse" },
      { value: "5,000 MT", label: "Cold storage capacity" },
      { value: "NH-53", label: "Highway at the gate" },
    ],
  },
] as const

const STEP_ICON_SIZE = "2.75rem"

function ProcessConnector({
  index,
  active,
  vertical = false,
  className,
}: {
  index: number
  active: number
  vertical?: boolean
  className?: string
}) {
  const reduce = useReducedMotion()
  const completed = active > index
  const current = active === index

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-forest-foreground/25",
        vertical ? "mx-auto h-8 w-1.5" : "h-1.5 min-w-[1.25rem] flex-1",
        className
      )}
      aria-hidden
    >
      <motion.div
        className={cn(
          "absolute rounded-full bg-gradient-to-r from-primary via-primary to-cta",
          vertical ? "inset-x-0 top-0 w-full" : "inset-y-0 left-0 h-full"
        )}
        initial={false}
        animate={
          vertical
            ? { height: completed ? "100%" : current ? "55%" : "0%" }
            : { width: completed ? "100%" : current ? "55%" : "0%" }
        }
        transition={{ duration: 0.75, ease: motionEase }}
      />
      {current && !reduce ? (
        <motion.span
          className={cn(
            "absolute size-2.5 rounded-full bg-cta shadow-[0_0_10px_var(--cta)]",
            vertical
              ? "left-1/2 top-0 -translate-x-1/2"
              : "top-1/2 left-0 -translate-y-1/2"
          )}
          animate={
            vertical ? { top: ["0%", "100%"] } : { left: ["0%", "100%"] }
          }
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
    </div>
  )
}

function ProcessStepNode({
  stage,
  index,
  active,
  onSelect,
  vertical = false,
}: {
  stage: (typeof flowStages)[number]
  index: number
  active: number
  onSelect: (index: number) => void
  vertical?: boolean
}) {
  const Icon = stage.icon
  const selected = active === index

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-current={selected ? "step" : undefined}
      className={cn(
        "group/node flex shrink-0 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        vertical
          ? "flex-row items-center gap-3 text-left"
          : "min-w-[4.5rem] flex-col items-center gap-2"
      )}
    >
      <motion.span
        className={cn(
          "relative flex items-center justify-center rounded-full transition-shadow",
          vertical ? "size-10" : "size-11",
          selected
            ? "bg-primary text-primary-foreground shadow-[0_0_0_6px_color-mix(in_oklch,var(--primary)_18%,transparent)]"
            : "bg-forest-foreground/10 text-forest-foreground/75 group-hover/node:bg-forest-foreground/14"
        )}
        animate={{ scale: selected ? 1.06 : 1 }}
        transition={{ duration: 0.35, ease: motionEase }}
      >
        <Icon className={cn(vertical ? "size-4" : "size-5")} aria-hidden />
      </motion.span>
      <span
        className={cn(
          "font-medium tracking-[0.16em] uppercase transition-colors",
          vertical ? "text-xs" : "text-[0.625rem]",
          selected ? "text-cta" : "text-forest-foreground/55"
        )}
      >
        {stage.label}
      </span>
    </button>
  )
}

function ProcessTrack({
  active,
  onSelect,
  vertical = false,
}: {
  active: number
  onSelect: (index: number) => void
  vertical?: boolean
}) {
  if (vertical) {
    return (
      <div className="flex flex-col items-start gap-1 pl-1">
        {flowStages.map((stage, index) => (
          <div key={stage.step} className="flex flex-col items-start">
            <ProcessStepNode
              stage={stage}
              index={index}
              active={active}
              onSelect={onSelect}
              vertical
            />
            {index < flowStages.length - 1 ? (
              <ProcessConnector index={index} active={active} vertical />
            ) : null}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="mb-8 hidden lg:block">
      <div className="flex items-start gap-1 xl:gap-2">
        {flowStages.map((stage, index) => (
          <Fragment key={stage.step}>
            {index > 0 ? (
              <div
                className="flex min-w-[1.25rem] flex-1 items-center self-start"
                style={{ height: STEP_ICON_SIZE }}
                aria-hidden
              >
                <ProcessConnector
                  index={index - 1}
                  active={active}
                  className="w-full flex-none"
                />
              </div>
            ) : null}
            <ProcessStepNode
              stage={stage}
              index={index}
              active={active}
              onSelect={onSelect}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function StageImageOverlays({
  stage,
  compact = false,
}: {
  stage: (typeof flowStages)[number]
  compact?: boolean
}) {
  return (
    <>
      <div
        className="absolute inset-x-0 top-0 h-[24%] bg-gradient-to-b from-black/35 via-black/10 to-transparent"
        aria-hidden
      />
      {compact ? (
        <div
          className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/55 via-black/20 to-transparent"
          aria-hidden
        />
      ) : (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t to-transparent opacity-55",
            stage.tint
          )}
          aria-hidden
        />
      )}
    </>
  )
}

function StageDetailCard({
  stage,
  animated = false,
}: {
  stage: (typeof flowStages)[number]
  animated?: boolean
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-white/12 bg-black/35 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.22)] backdrop-blur-md supports-backdrop-filter:bg-black/25 sm:backdrop-blur-lg">
      <h3 className="font-heading text-xl font-semibold leading-snug text-white line-clamp-2">
        {stage.title}
      </h3>
      <p className="mt-2 min-h-[4.25rem] text-sm leading-relaxed text-white/90 line-clamp-4">
        {stage.summary}
      </p>
      <ul className="mt-auto space-y-2 pt-4">
        {stage.highlights.map((item, itemIndex) => {
          const content = (
            <>
              <span
                className="mt-1.5 size-1 shrink-0 rounded-full bg-cta"
                aria-hidden
              />
              <span>{item}</span>
            </>
          )

          if (!animated) {
            return (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-relaxed text-white/85"
              >
                {content}
              </li>
            )
          }

          return (
            <motion.li
              key={item}
              className="flex items-start gap-2 text-sm leading-relaxed text-white/85"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: itemIndex * 0.07,
                duration: 0.3,
                ease: motionEase,
              }}
            >
              {content}
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

function StagePanel({
  stage,
  index,
  active,
  onSelect,
}: {
  stage: (typeof flowStages)[number]
  index: number
  active: number
  onSelect: (index: number) => void
}) {
  const reduce = useReducedMotion()
  const isActive = active === index

  return (
    <motion.button
      type="button"
      layout
      onClick={() => onSelect(index)}
      aria-current={isActive ? "step" : undefined}
      aria-label={`${stage.label}: ${stage.title}`}
      className={cn(
        "relative overflow-hidden rounded-2xl text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        PANEL_HEIGHT,
        isActive
          ? "flex-[4_1_0%] shadow-[0_20px_48px_rgba(15,43,29,0.14)]"
          : "flex-[1_1_0%]"
      )}
      transition={{ layout: layoutTransition }}
      animate={{ opacity: isActive ? 1 : 0.82 }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.img
          layoutId={`ecosystem-stage-image-${index}`}
          src={stage.image.src}
          alt=""
          className={cn(
            "size-full object-cover",
            !isActive && "brightness-[0.92] saturate-[0.95]"
          )}
          style={{ objectPosition: stage.image.position }}
          loading="lazy"
          decoding="async"
          animate={
            reduce || !isActive
              ? { scale: 1.05 }
              : { scale: [1.05, 1.12] }
          }
          transition={
            reduce || !isActive
              ? { layout: layoutTransition, duration: 0 }
              : {
                  layout: layoutTransition,
                  scale: {
                    duration: STAGE_DURATION_MS / 1000,
                    ease: "linear",
                  },
                }
          }
        />
        <StageImageOverlays stage={stage} compact={!isActive} />
      </div>

      <div className="relative z-10 flex h-full flex-col p-4 sm:p-5">
        <div className="flex h-7 shrink-0 items-start justify-between gap-2">
          <span className="font-mono text-[0.6875rem] font-medium tracking-[0.22em] text-white/75 drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">
            {stage.step}
          </span>
          <span
            className={cn(
              "rounded-full bg-black/45 px-2.5 py-1 text-[0.625rem] font-medium tracking-[0.18em] text-white uppercase backdrop-blur-sm",
              !isActive && "invisible"
            )}
          >
            {stage.label}
          </span>
        </div>

        <div className={cn("mt-auto shrink-0", DETAIL_SLOT_HEIGHT)}>
          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.32, ease: motionEase }}
                className="h-full"
              >
                <StageDetailCard stage={stage} animated />
              </motion.div>
            ) : (
              <motion.div
                key="compact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full items-end pb-0.5"
              >
                <p className="truncate text-sm font-medium tracking-[0.12em] text-white uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]">
                  {stage.label}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.button>
  )
}

function MobileStageHero({ stage }: { stage: (typeof flowStages)[number] }) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      key={stage.step}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: motionEase }}
      className={cn(
        "relative overflow-hidden rounded-2xl shadow-[0_20px_48px_rgba(15,43,29,0.14)]",
        PANEL_HEIGHT
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.img
          src={stage.image.src}
          alt=""
          className="size-full object-cover"
          style={{ objectPosition: stage.image.position }}
          loading="lazy"
          decoding="async"
          animate={
            reduce ? { scale: 1.05 } : { scale: [1.05, 1.12] }
          }
          transition={
            reduce
              ? { duration: 0 }
              : { duration: STAGE_DURATION_MS / 1000, ease: "linear" }
          }
        />
        <StageImageOverlays stage={stage} />
      </div>

      <div className="relative z-10 flex h-full flex-col p-5">
        <div className="flex h-7 shrink-0 items-start justify-between gap-3">
          <span className="font-mono text-[0.6875rem] font-medium tracking-[0.22em] text-white/75">
            {stage.step}
          </span>
          <span className="rounded-full bg-black/45 px-2.5 py-1 text-[0.625rem] font-medium tracking-[0.18em] text-white uppercase backdrop-blur-sm">
            {stage.label}
          </span>
        </div>

        <div className={cn("mt-auto shrink-0", DETAIL_SLOT_HEIGHT)}>
          <StageDetailCard stage={stage} />
        </div>
      </div>
    </motion.article>
  )
}

function StageThumb({
  stage,
  index,
  active,
  onSelect,
}: {
  stage: (typeof flowStages)[number]
  index: number
  active: number
  onSelect: (index: number) => void
}) {
  const selected = active === index

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-current={selected ? "step" : undefined}
      aria-label={stage.label}
      className={cn(
        "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:h-[4.5rem] sm:w-[4.5rem]",
        selected
          ? "shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_22%,transparent)]"
          : "opacity-70 hover-fine:opacity-100"
      )}
    >
      <img
        src={stage.image.src}
        alt=""
        className="size-full object-cover"
        style={{ objectPosition: stage.image.position }}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
      <span className="absolute inset-x-0 bottom-1 text-center text-[0.5625rem] font-medium tracking-[0.12em] text-white uppercase">
        {stage.step}
      </span>
    </button>
  )
}

function AnimatedProcessFlow() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { amount: 0.25, margin: "-10% 0px" })
  const reduce = useReducedMotion()

  const selectStage = useCallback((index: number) => {
    setActive(index)
    setPaused(true)
  }, [])

  useEffect(() => {
    if (!paused) return
    const resume = window.setTimeout(() => setPaused(false), 9000)
    return () => window.clearTimeout(resume)
  }, [paused, active])

  useEffect(() => {
    if (reduce || !inView || paused) return

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % flowStages.length)
    }, STAGE_DURATION_MS)

    return () => window.clearInterval(timer)
  }, [reduce, inView, paused])

  const currentStage = flowStages[active]

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) {
          setPaused(false)
        }
      }}
    >
      <ProcessTrack active={active} onSelect={selectStage} />

      <motion.div
        layout
        className={cn("hidden items-stretch gap-1.5 lg:flex xl:gap-2", PANEL_HEIGHT)}
        transition={{ layout: layoutTransition }}
      >
        {flowStages.map((stage, index) => (
          <StagePanel
            key={stage.step}
            stage={stage}
            index={index}
            active={active}
            onSelect={selectStage}
          />
        ))}
      </motion.div>

      <div className="lg:hidden">
        <AnimatePresence mode="wait">
          <MobileStageHero key={currentStage.step} stage={currentStage} />
        </AnimatePresence>
        <div className="mt-4 flex justify-center gap-2">
          {flowStages.map((stage, index) => (
            <StageThumb
              key={stage.step}
              stage={stage}
              index={index}
              active={active}
              onSelect={selectStage}
            />
          ))}
        </div>
      </div>

      <StageStatsRow active={active} />
    </div>
  )
}

export function EcosystemFlow({ flat = false }: { flat?: boolean }) {
  const { ecosystem } = landing

  return (
    <SectionBand tone="forest" from="secondary-25" to="secondary-30" flat={flat}>
      <div className="relative text-forest-foreground">
        <PatternBand
          variant="hatch"
          className="pointer-events-none absolute inset-0 overflow-hidden text-cta/30"
          patternClassName="opacity-[0.1]"
        />

        <Section id={ecosystem.id} deferPaint className="relative z-10 bg-transparent">
          <Reveal className="mx-auto max-w-2xl text-center lg:max-w-3xl">
            <div className="flex flex-col items-center gap-2">
              <DropFlourish className="hidden text-cta/45 sm:block" />
              <Eyebrow className="text-cta">{ecosystem.eyebrow}</Eyebrow>
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl">{ecosystem.title}</h2>
            <p className="mt-4 leading-relaxed text-forest-foreground/80">
              {ecosystem.body}
            </p>
          </Reveal>

          <Reveal className="mt-10" delay={0.06}>
            <AnimatedProcessFlow />
          </Reveal>
        </Section>
      </div>
    </SectionBand>
  )
}
