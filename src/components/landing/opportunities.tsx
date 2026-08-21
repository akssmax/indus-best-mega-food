import {
  MapIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
  CubeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"

import { landing } from "@/content/landing"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "land-plot": MapIcon,
  building: BuildingOffice2Icon,
  cog: Cog6ToothIcon,
  package: CubeIcon,
  handshake: UserGroupIcon,
}

export function Opportunities() {
  const { opportunities: data } = landing

  return (
    <Section id={data.id} className="bg-secondary/30">
      <Reveal className="max-w-2xl">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{data.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{data.body}</p>
      </Reveal>

      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((item) => {
          const Icon = iconMap[item.icon] ?? BuildingOffice2Icon
          return (
            <MotionItem key={item.title}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-cta/10">
                    <Icon className="size-5 text-cta" />
                  </div>
                  <CardTitle className="font-heading text-lg">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </CardContent>
              </Card>
            </MotionItem>
          )
        })}
      </Stagger>

      <Reveal className="mt-8">
        <Button variant="cta" className="h-11 px-5 text-base" asChild>
          <a href={data.cta.href}>{data.cta.label}</a>
        </Button>
      </Reveal>
    </Section>
  )
}
