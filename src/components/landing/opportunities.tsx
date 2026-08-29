import { ArrowRightIcon } from "lucide-react"

import { landing } from "@/content/landing"
import { Button } from "@/components/ui/button"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { BrandPattern, DropFlourish } from "@/components/ui/brand-pattern"
import { PullQuote } from "@/components/ui/pull-quote"
import { SectionBand } from "@/lib/section-band"

export function Opportunities({ flat = false }: { flat?: boolean }) {
  const { opportunities: data } = landing
  const ways = data.items.filter((item) => !item.featured)

  return (
    <SectionBand tone="card" from="background" to="secondary-25" flat={flat}>
      <Section id={data.id} deferPaint className="relative overflow-hidden bg-transparent">
      <div className="relative z-10 grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
        <Reveal className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-forest p-7 text-forest-foreground sm:p-9 lg:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 bottom-0 z-0 size-44 sm:size-52 lg:size-60 [mask-image:linear-gradient(225deg,#000_18%,transparent_60%)]"
          >
            <BrandPattern variant="bloom" className="text-cta opacity-[0.38]" />
          </div>
          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center gap-3">
              <DropFlourish className="hidden text-cta/70 sm:block" />
              <Eyebrow className="text-cta">{data.eyebrow}</Eyebrow>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl">{data.title}</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-forest-foreground/85 sm:text-base">
              {data.body}
            </p>
            <PullQuote className="mt-8 border-cta/70 text-forest-foreground [&_p]:text-2xl [&_p]:sm:text-3xl">
              {data.quote}
            </PullQuote>
            <ul className="mt-8 space-y-2.5 text-sm text-forest-foreground/80">
              {data.proofs.map((proof) => (
                <li key={proof} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-cta"
                  />
                  <span>{proof}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex w-full flex-col items-stretch pt-8 xl:items-start">
              <Button
                variant="cta"
                className="h-12 w-full px-6 text-base xl:w-auto"
                asChild
              >
                <a href={data.cta.href}>
                  {data.cta.label}
                  <ArrowRightIcon />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        <Stagger className="overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/8">
          {ways.map((item, index) => (
            <MotionItem
              key={item.title}
              className="border-b border-border/70 last:border-b-0"
            >
              <article className="flex gap-4 px-5 py-5 sm:gap-6 sm:px-7 sm:py-6">
                <span
                  aria-hidden
                  className="font-heading w-10 shrink-0 text-2xl font-semibold text-cta sm:w-12 sm:text-3xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                    {item.kicker}
                  </p>
                  <h3 className="mt-1 font-heading text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
                <div className="hidden w-24 shrink-0 text-right sm:block">
                  <p className="font-heading text-xl font-semibold text-primary">
                    {item.metric}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                    {item.metricLabel}
                  </p>
                </div>
              </article>
            </MotionItem>
          ))}
        </Stagger>
      </div>
      </Section>
    </SectionBand>
  )
}
