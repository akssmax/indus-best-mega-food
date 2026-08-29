import { landing } from "@/content/landing"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { CampusHotspots } from "@/components/ui/campus-hotspots"
import { ProcessingChips } from "@/components/ui/processing-chips"
import { CollectionGauge } from "@/components/ui/collection-gauge"
import { ProcessFlow } from "@/components/ui/process-flow"
import { StatusSeal } from "@/components/ui/status-seal"
import { UtilityMeters } from "@/components/ui/utility-meters"
import { LiveIndicator } from "@/components/ui/live-indicator"
import { DropFlourish, PatternBand } from "@/components/ui/brand-pattern"
import { cn } from "@/lib/utils"

const cardChrome =
  "flex h-full flex-col rounded-3xl bg-card p-6 ring-1 ring-foreground/8 lg:p-8"

const processingLines = [
  { label: "Tomato", hint: "12 MTPH paste / concentrate", tone: "cta" as const, icon: "tomato" as const },
  { label: "Mango", hint: "6 MTPH puree", tone: "primary" as const, icon: "mango" as const },
  { label: "IQF", hint: "2 MT/H freeze line", tone: "aqua" as const, icon: "iqf" as const },
  { label: "Pack house", hint: "10 MT/H sort & pack", tone: "primary" as const, icon: "pack" as const },
]

const coldSteps = [
  { title: "Frozen", detail: "−20°C · 1,500 MT", tone: "aqua" as const, icon: "frozen" as const },
  { title: "Chilled", detail: "0–10°C · 3,500 MT", tone: "primary" as const, icon: "chilled" as const },
  { title: "IQF", detail: "2 MT/H packaging hall", tone: "cta" as const, icon: "iqf" as const },
]

const utilityItems = [
  { label: "Process water", value: "2.7 MLD", fill: 86, tone: "aqua" as const, icon: "water" as const },
  { label: "ETP & STP", value: "Centralised", fill: 72, tone: "primary" as const, icon: "effluent" as const },
  { label: "Weighbridge", value: "100 MT", fill: 64, tone: "cta" as const, icon: "weighbridge" as const },
]

export function Why() {
  const { why } = landing
  const [featured, compact, metric, stack, scheme, utilities] = why.advantages

  return (
    <Section id={why.id} className="relative overflow-hidden">
      <PatternBand
        variant="vein"
        className="pointer-events-none absolute inset-0 text-primary/25"
        patternClassName="opacity-[0.09]"
      />

      <div className="relative z-10">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <DropFlourish className="hidden text-primary/35 sm:block" />
            <Eyebrow>{why.eyebrow}</Eyebrow>
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl">{why.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{why.body}</p>
        </Reveal>

        <Stagger className="mt-10 grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <MotionItem className="h-full md:col-span-2 lg:row-span-2">
            <article
              className={cn(
                cardChrome,
                "group/card h-full overflow-hidden p-0 lg:p-0"
              )}
            >
              {"image" in featured && featured.image ? (
                <CampusHotspots
                  src={featured.image.src}
                  alt={featured.image.alt}
                  className="min-h-64 w-full flex-1 rounded-none lg:min-h-0"
                  pins={[
                    {
                      label: "16 sheds",
                      detail: "Plug-and-play",
                      x: "22%",
                      y: "28%",
                      tone: "cta",
                      icon: "sheds",
                    },
                    {
                      label: "Roads, water, power",
                      detail: "Ready to commission",
                      x: "72%",
                      y: "68%",
                      tone: "primary",
                      icon: "utilities",
                    },
                  ]}
                />
              ) : null}
              <div className="shrink-0 border-t border-foreground/6 px-6 py-5 lg:px-8 lg:py-6">
                <h3 className="font-heading text-xl font-semibold lg:text-2xl">
                  {featured.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {featured.body}
                </p>
              </div>
            </article>
          </MotionItem>

          <MotionItem className="h-full">
            <article className={cardChrome}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-heading text-lg font-semibold">
                  {compact.title}
                </h3>
                <LiveIndicator label="Shared" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {compact.body}
              </p>
              <ProcessingChips className="mt-auto pt-5" items={processingLines} />
            </article>
          </MotionItem>

          <MotionItem className="h-full">
            <article className={cardChrome}>
              <h3 className="font-heading text-lg font-semibold">
                {metric.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {metric.body}
              </p>
              {"metric" in metric && metric.metric ? (
                <CollectionGauge
                  className="mt-auto pt-4"
                  value={metric.metric}
                  unit="centres"
                  sites={"labels" in metric && metric.labels ? metric.labels : []}
                />
              ) : null}
            </article>
          </MotionItem>

          <MotionItem className="h-full">
            <article className={cardChrome}>
              <h3 className="font-heading text-lg font-semibold">
                {stack.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stack.body}
              </p>
              <ProcessFlow className="mt-auto pt-5" steps={coldSteps} />
            </article>
          </MotionItem>

          <MotionItem className="h-full">
            <article className={cardChrome}>
              <h3 className="font-heading text-lg font-semibold">
                {scheme.title}
              </h3>
              <p className="mt-2 mb-4 text-sm leading-relaxed text-muted-foreground sm:mb-5">
                {scheme.body}
              </p>
              <StatusSeal
                className="mt-auto min-h-0 flex-1 pt-5"
                kicker="MOFPI"
                title="2014 · Operational"
              />
            </article>
          </MotionItem>

          <MotionItem className="h-full">
            <article className={cardChrome}>
              <h3 className="font-heading text-lg font-semibold">
                {utilities.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {utilities.body}
              </p>
              <UtilityMeters className="mt-auto pt-5" items={utilityItems} />
            </article>
          </MotionItem>
        </Stagger>
      </div>
    </Section>
  )
}
