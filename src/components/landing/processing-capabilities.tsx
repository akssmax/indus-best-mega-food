import { peakAsepticMtph, parseMtph, processingLines } from "@/content/facilities"
"use client"

import { useLandingContent } from "@/lib/landing-content-context"
import { SectionIntro } from "@/components/landing/feature-card"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { cn } from "@/lib/utils"

const PEAK_MTPH = peakAsepticMtph

function ProcessingLineCard({
  line,
}: {
  line: (typeof processingLines)[number]
}) {
  const mtph = parseMtph(line.capacity)
  const isPeak = mtph >= PEAK_MTPH

  return (
    <article className="flex h-full flex-col rounded-2xl bg-card p-4 ring-1 ring-foreground/8 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10 sm:size-12">
          <img
            src={line.image.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="font-heading text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase">
              {line.crop}
            </p>
            {isPeak ? (
              <span className="shrink-0 rounded-full bg-cta/12 px-2 py-0.5 text-[0.6875rem] font-medium tracking-[0.08em] text-cta uppercase ring-1 ring-cta/25">
                Peak
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm leading-snug text-foreground/85">{line.output}</p>
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span
          className={cn(
            "font-heading text-4xl font-semibold tabular-nums leading-none tracking-tight",
            isPeak ? "text-cta" : "text-primary"
          )}
        >
          {mtph}
        </span>
        <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
          MTPH
        </span>
      </div>

      <p className="mt-auto pt-4 text-sm leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground/80">Brix / spec · </span>
        {line.spec}
      </p>
    </article>
  )
}

export function ProcessingCapacityTable({
  className,
  showHeader = true,
  heading = "h2",
}: {
  className?: string
  showHeader?: boolean
  heading?: "h2" | "h3"
}) {
  const landing = useLandingContent()
  const { infrastructure, processingCapabilities } = landing

  return (
    <div className={className}>
      {showHeader ? (
        <Reveal>
          <SectionIntro
            eyebrow={processingCapabilities.eyebrow}
            title={processingCapabilities.title}
            body={processingCapabilities.body}
            heading={heading}
          />
        </Reveal>
      ) : null}

      <Stagger
        className={cn(
          "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5",
          showHeader ? "mt-8" : "mt-0"
        )}
      >
        {processingLines.map((line) => (
          <MotionItem key={line.crop}>
            <ProcessingLineCard line={line} />
          </MotionItem>
        ))}
      </Stagger>

      <p className="mt-6 text-sm text-muted-foreground">{infrastructure.mofpi}</p>
    </div>
  )
}
