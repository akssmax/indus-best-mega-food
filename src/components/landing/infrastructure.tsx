import {
  MapIcon,
  BuildingStorefrontIcon,
  CubeIcon,
  ArchiveBoxIcon,
  BoltIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"

import { landing } from "@/content/landing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  map: MapIcon,
  factory: BuildingStorefrontIcon,
  snowflake: CubeIcon,
  warehouse: ArchiveBoxIcon,
  zap: BoltIcon,
  truck: TruckIcon,
}

export function Infrastructure() {
  const { infrastructure: data } = landing

  return (
    <Section id={data.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{data.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{data.body}</p>
      </Reveal>

      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.zones.map((zone) => {
          const Icon = iconMap[zone.icon] ?? MapIcon
          return (
            <MotionItem key={zone.title}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-lg">
                    {zone.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {zone.body}
                  </p>
                </CardContent>
              </Card>
            </MotionItem>
          )
        })}
      </Stagger>

      <Reveal className="mt-12">
        <h3 className="font-heading text-xl font-semibold">Connectivity</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.connectivity.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-4 py-3"
            >
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="font-heading text-sm font-semibold text-primary">
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{data.mofpi}</p>
      </Reveal>
    </Section>
  )
}
