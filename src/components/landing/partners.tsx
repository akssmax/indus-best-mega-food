import { landing } from "@/content/landing"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

export function Partners() {
  const { partners: data } = landing

  return (
    <Section id={data.id} className="bg-secondary/30">
      <Reveal className="max-w-2xl">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{data.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{data.body}</p>
      </Reveal>

      <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {data.companies.map((company) => (
          <MotionItem key={company.name}>
            <Card className="flex h-24 items-center justify-center">
              <CardContent className="flex items-center justify-center p-4">
                <span className="text-center text-xs font-medium text-muted-foreground">
                  {company.name}
                </span>
              </CardContent>
            </Card>
          </MotionItem>
        ))}
      </Stagger>

      <Reveal className="mt-12" delay={0.06}>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 sm:p-8">
            <blockquote className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              "{data.testimonial.quote}"
            </blockquote>
            <div className="mt-4">
              <p className="font-heading text-sm font-semibold text-primary">
                {data.testimonial.author}
              </p>
              <p className="text-xs text-muted-foreground">
                {data.testimonial.company}
              </p>
            </div>
          </CardContent>
        </Card>
      </Reveal>

      <Reveal className="mt-8" delay={0.1}>
        <Button variant="cta" className="h-11 px-5 text-base" asChild>
          <a href={data.cta.href}>{data.cta.label}</a>
        </Button>
      </Reveal>
    </Section>
  )
}
