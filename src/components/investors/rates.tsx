import { investorsPage } from "@/content/investors"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SpecTable } from "@/components/ui/spec-table"
import { Button } from "@/components/ui/button"

export function InvestorRates() {
  const { plotRates, facilityRates, disclaimer } = investorsPage

  return (
    <Section id={plotRates.id} className="bg-secondary/20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <Reveal>
          <Eyebrow>{plotRates.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{plotRates.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {plotRates.body}
          </p>
          <div className="mt-8 rounded-2xl bg-forest p-6 text-forest-foreground sm:p-8">
            <p className="text-xs font-medium tracking-[0.18em] text-cta uppercase">
              Published terms
            </p>
            <p className="mt-3 font-heading text-2xl font-semibold leading-snug sm:text-3xl">
              {plotRates.summary}
            </p>
          </div>
          <div className="mt-6">
            <Button variant="outline" className="h-11 px-5" asChild>
              <a href="/contact">Confirm current terms</a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Card id={facilityRates.id} className="gap-0 overflow-hidden p-0">
            <CardHeader className="border-b border-border/60 px-6 pt-6">
              <Eyebrow>{facilityRates.eyebrow}</Eyebrow>
              <CardTitle className="mt-2 text-2xl font-semibold sm:text-3xl">
                {facilityRates.title}
              </CardTitle>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {facilityRates.body}
              </p>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <SpecTable rows={facilityRates.rows} />
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <Reveal className="mt-10" delay={0.1}>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {disclaimer}
        </p>
      </Reveal>
    </Section>
  )
}
