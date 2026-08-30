import { investorsPage } from "@/content/investors"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SpecTable } from "@/components/ui/spec-table"
import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/components/ui/border-beam"
import { cn } from "@/lib/utils"

/** Header clearance + stagger so stacked rate cards peek below the previous. */
const STACK_TOP_BASE_REM = 5.5
const STACK_TOP_STEP_REM = 0.75

export function InvestorRates() {
  const { plotRates, rateSections, disclaimer } = investorsPage

  return (
    <Section id={plotRates.id} className="bg-secondary/20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Eyebrow>{plotRates.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{plotRates.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {plotRates.body}
          </p>
          <div className="relative mt-8 rounded-2xl bg-forest p-6 text-forest-foreground sm:p-8">
            <p className="text-xs font-medium tracking-[0.18em] text-cta uppercase">
              Free-hold plots
            </p>
            <p className="mt-3 font-heading text-2xl font-semibold leading-snug sm:text-3xl">
              {plotRates.summary}
            </p>
            <ul className="mt-5 space-y-2 text-sm leading-relaxed text-forest-foreground/85">
              {plotRates.highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-cta" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="hidden dark:contents">
              <BorderBeam
                duration={8}
                borderWidth={1}
                colorFrom="var(--cta)"
                colorTo="color-mix(in oklch, var(--primary) 60%, transparent)"
              />
            </div>
          </div>
          <div className="mt-6">
            <Button variant="outline" className="h-11 px-5" asChild>
              <a href="/contact">Confirm current terms</a>
            </Button>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-0 lg:pb-[min(42vh,22rem)]">
          {rateSections.map((section, index) => (
            <div
              key={section.id}
              className={cn(
                "lg:sticky lg:mb-6 lg:last:mb-0",
                index > 0 && "lg:-mt-1"
              )}
              style={{
                top: `calc(${STACK_TOP_BASE_REM}rem + ${index * STACK_TOP_STEP_REM}rem)`,
                zIndex: index + 1,
              }}
            >
              <Card
                id={section.id}
                className="gap-0 overflow-hidden bg-card p-0 shadow-[0_12px_40px_rgba(15,43,29,0.08)] ring-1 ring-foreground/10 dark:shadow-none dark:ring-foreground/15"
              >
                <CardHeader className="border-b border-border/60 px-6 pt-6">
                  <Eyebrow>{section.eyebrow}</Eyebrow>
                  <CardTitle className="mt-2 text-xl font-semibold sm:text-2xl">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <SpecTable rows={section.rows} />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Reveal className="mt-10" delay={0.1}>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {disclaimer}
        </p>
      </Reveal>
    </Section>
  )
}
