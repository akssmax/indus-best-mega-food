import { peakAsepticMtph, parseMtph, processingLines } from "@/content/facilities"
import { landing } from "@/content/landing"
import { SectionIntro } from "@/components/landing/feature-card"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { cn } from "@/lib/utils"

const PEAK_MTPH = peakAsepticMtph

function ThroughputBar({ mtph, peak }: { mtph: number; peak: number }) {
  const fill = peak > 0 ? Math.round((mtph / peak) * 100) : 0

  return (
    <div className="mt-2.5">
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="text-[0.5625rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Line throughput
        </span>
        <span className="text-[0.5625rem] tabular-nums text-muted-foreground">
          {fill}% of peak
        </span>
      </div>
      <div
        className="relative h-1.5 overflow-hidden rounded-full bg-muted/80"
        role="img"
        aria-label={`${mtph} MTPH, ${fill} percent of peak line capacity`}
      >
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-primary to-cta transition-[width] duration-500",
            fill >= 90 && "from-cta to-cta"
          )}
          style={{ width: `${fill}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[0.5625rem] tabular-nums text-muted-foreground/80">
        <span>0</span>
        <span>{peak} MTPH peak</span>
      </div>
    </div>
  )
}

function ProcessingLineCard({
  line,
  peakMtph,
}: {
  line: (typeof processingLines)[number]
  peakMtph: number
}) {
  const mtph = parseMtph(line.capacity)
  const isPeak = mtph >= peakMtph

  return (
    <article className="flex h-full flex-col rounded-xl bg-card p-3.5 ring-1 ring-foreground/8 sm:p-4">
      <div className="flex items-start gap-2.5">
        <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/10 sm:size-10">
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
            <p className="font-heading text-[0.6875rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
              {line.crop}
            </p>
            {isPeak ? (
              <span className="shrink-0 rounded-full bg-cta/12 px-1.5 py-0.5 text-[0.5625rem] font-medium tracking-[0.1em] text-cta uppercase ring-1 ring-cta/25">
                Peak
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 text-xs leading-snug text-foreground/80">{line.output}</p>
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-heading text-3xl font-semibold tabular-nums leading-none tracking-tight",
            isPeak ? "text-cta" : "text-primary"
          )}
        >
          {mtph}
        </span>
        <span className="text-[0.625rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          MTPH
        </span>
      </div>

      <ThroughputBar mtph={mtph} peak={peakMtph} />

      <p className="mt-3 border-t border-border/50 pt-2.5 text-[0.6875rem] leading-snug text-muted-foreground">
        <span className="font-medium text-foreground/75">Brix / spec · </span>
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
          "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4",
          showHeader ? "mt-8" : "mt-0"
        )}
      >
        {processingLines.map((line) => (
          <MotionItem key={line.crop}>
            <ProcessingLineCard line={line} peakMtph={PEAK_MTPH} />
          </MotionItem>
        ))}
      </Stagger>

      <p className="mt-6 text-sm text-muted-foreground">{infrastructure.mofpi}</p>
    </div>
  )
}
