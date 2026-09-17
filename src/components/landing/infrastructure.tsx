import {
  MapIcon,
  BuildingStorefrontIcon,
  CubeIcon,
  ArchiveBoxIcon,
  BoltIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"

import { landingImageSizes } from "@/lib/media"
import { CampusImg } from "@/components/ui/campus-img"
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

const zoneImages: Record<string, { src: string; alt: string }> = {
  map: {
    src: "/images/gallery/campus-overview.webp",
    alt: "Aerial overview of the 67-acre Indus Best campus",
  },
  factory: {
    src: "/images/gallery/process-hall.webp",
    alt: "Live processing hall with stainless equipment and steam",
  },
  snowflake: {
    src: "/images/gallery/green-roof-warehouse.webp",
    alt: "Green-roof warehouse viewed from the air",
  },
  warehouse: {
    src: "/images/gallery/warehouse-racking.webp",
    alt: "Pallet racking aisle in the dry warehouse",
  },
  zap: {
    src: "/images/gallery/etp-plant.webp",
    alt: "ETP plant and chimney on the campus utilities block",
  },
  truck: {
    src: "/images/gallery/warehouse-dock.webp",
    alt: "Reefer truck at the green warehouse dispatch dock",
  },
}

export function Infrastructure() {
  const { infrastructure: data } = landing

  return (
    <Section id={data.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{data.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {data.body}
        </p>
      </Reveal>

      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.zones.map((zone) => {
          const Icon = iconMap[zone.icon] ?? MapIcon
          const img =
            zoneImages[zone.icon] ?? {
              src: "/images/gallery/warehouse-aerial.webp",
              alt: "Aerial view of warehouse sheds at Indus Best Mega Food Park",
            }
          return (
            <MotionItem key={zone.title}>
              <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <CampusImg
                    src={img.src}
                    alt={img.alt}
                    sizes={landingImageSizes.card}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="absolute top-3 left-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/30">
                      <Icon className="size-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <div className="rounded-xl bg-black/40 p-3 backdrop-blur-sm">
                      <h3
                        className="font-heading text-lg font-semibold text-white"
                        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                      >
                        {zone.title}
                      </h3>
                      <p
                        className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/90"
                        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                      >
                        {zone.body}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionItem>
          )
        })}
      </Stagger>

      <Reveal className="mt-12">
        <p className="max-w-3xl text-sm text-muted-foreground">{data.mofpi}</p>
      </Reveal>
    </Section>
  )
}
