import {
  MapIcon,
  BuildingStorefrontIcon,
  CubeIcon,
  ArchiveBoxIcon,
  BoltIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"

import { landing } from "@/content/landing"
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

const zoneImages: Record<string, string> = {
  map: "/images/admin-building.jpg",
  factory: "/images/aseptic-line.jpg",
  snowflake: "/images/warehouse.jpg",
  warehouse: "/images/warehouse.jpg",
  zap: "/images/weigh-bridge.jpg",
  truck: "/images/admin-building.jpg",
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

      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.zones.map((zone, index) => {
          const Icon = iconMap[zone.icon] ?? MapIcon
          const imgSrc = zoneImages[zone.icon] ?? "/images/warehouse.jpg"
          const isFeature = index === 0
          return (
            <MotionItem key={zone.title}>
              <div
                className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${
                  isFeature ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
                }`}
              >
                <div className={`relative overflow-hidden ${isFeature ? "aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-[16/10]"}`}>
                  <img
                    src={imgSrc}
                    alt={zone.title}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/30">
                      <Icon className="size-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h3 className="font-heading text-lg font-semibold text-white">
                      {zone.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80 line-clamp-3">
                      {zone.body}
                    </p>
                  </div>
                </div>
              </div>
            </MotionItem>
          )
        })}
      </Stagger>

      <Reveal className="mt-12">
        <div className="rounded-2xl border border-border/40 bg-card p-6">
          <h3 className="font-heading text-xl font-semibold">Connectivity</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.connectivity.map((item) => (
              <div
                key={item.label}
                className="group flex items-center justify-between rounded-xl border border-border/40 bg-background/50 px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
              >
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="font-heading text-sm font-semibold text-primary">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{data.mofpi}</p>
        </div>
      </Reveal>
    </Section>
  )
}
