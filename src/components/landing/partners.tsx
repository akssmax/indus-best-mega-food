import {
  ArchiveBoxIcon,
  BeakerIcon,
  BuildingOffice2Icon,
  CubeIcon,
  Square3Stack3DIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"

import { landing } from "@/content/landing"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  produce: Square3Stack3DIcon,
  frozen: CubeIcon,
  aseptic: BeakerIcon,
  pack: ArchiveBoxIcon,
  msme: BuildingOffice2Icon,
  logistics: TruckIcon,
}

export function Partners() {
  const { partners: data } = landing

  return (
    <Section id={data.id} className="bg-secondary/30">
      <Reveal className="max-w-2xl">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{data.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{data.body}</p>
      </Reveal>

      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.companies.map((company) => {
          const Icon = iconMap[company.icon] ?? Square3Stack3DIcon
          return (
            <MotionItem key={company.name} className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-cta/10">
                    <Icon className="size-5 text-cta" />
                  </div>
                  <p className="text-[10px] font-medium tracking-[0.16em] text-cta uppercase">
                    {company.kicker}
                  </p>
                  <CardTitle className="font-heading text-lg">
                    {company.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {company.body}
                  </p>
                </CardContent>
              </Card>
            </MotionItem>
          )
        })}
      </Stagger>

      <Reveal className="mt-12" delay={0.06}>
        <div className="rounded-3xl bg-forest p-6 text-forest-foreground sm:p-10">
          <blockquote className="font-heading text-xl leading-relaxed sm:text-2xl">
            "{data.testimonial.quote}"
          </blockquote>
          <p className="mt-5 text-sm font-medium text-cta">
            {data.testimonial.author}
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-8" delay={0.1}>
        <Button variant="cta" className="h-11 px-5 text-base" asChild>
          <a href={data.cta.href}>{data.cta.label}</a>
        </Button>
      </Reveal>
    </Section>
  )
}
