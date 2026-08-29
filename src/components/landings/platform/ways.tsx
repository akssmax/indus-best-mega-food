import { landing } from "@/content/landing"
import { landings } from "@/content/landings"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/landing/motion"
import { PlatformSection } from "@/components/landings/platform/section-shell"

export function PlatformWays() {
  const { ways } = landings.platform
  const { opportunities: data } = landing
  const items = data.items.filter((item) => !item.featured)

  return (
    <PlatformSection
      eyebrow={ways.eyebrow}
      title={ways.title}
      body={ways.body}
      className="bg-secondary/25"
    >
      <Reveal className="mt-10" delay={0.04}>
        <div className="overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/8">
          {items.map((item, index) => (
            <article
              key={item.title}
              className="flex flex-col gap-3 border-b border-border/70 px-5 py-5 last:border-b-0 sm:flex-row sm:items-start sm:gap-6 sm:px-8 sm:py-6"
            >
              <span
                aria-hidden
                className="font-heading w-10 shrink-0 text-2xl font-semibold text-cta sm:w-12"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  {item.kicker}
                </p>
                <h3 className="mt-1 font-heading text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
              <div className="shrink-0 sm:text-right">
                <p className="font-heading text-xl font-semibold text-primary">
                  {item.metric}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">{item.metricLabel}</p>
              </div>
            </article>
          ))}
          <div className="border-t border-border/70 px-5 py-5 sm:px-8">
            <Button variant="cta" className="h-12 rounded-full px-7 text-base" asChild>
              <a href={data.cta.href}>{data.cta.label}</a>
            </Button>
          </div>
        </div>
      </Reveal>
    </PlatformSection>
  )
}
