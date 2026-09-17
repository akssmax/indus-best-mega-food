import { useState } from "react"
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline"
import { createFileRoute } from "@tanstack/react-router"

import { PageHero } from "@/components/layout/page-hero"
import { seoHead } from "@/lib/seo"

const galleryImages = [
  {
    src: "/images/gallery/campus-overview.webp",
    alt: "Wide aerial view of the Indus Best campus",
    title: "Campus overview",
    type: "Aerial",
  },
  {
    src: "/images/gallery/warehouse-aerial.webp",
    alt: "Aerial view of the warehouse complex",
    title: "Warehouse complex",
    type: "Aerial",
  },
  {
    src: "/images/gallery/processing-campus.webp",
    alt: "Central food processing campus from above",
    title: "Central processing campus",
    type: "Aerial",
  },
  {
    src: "/images/gallery/green-roof-warehouse.webp",
    alt: "Green-roof warehouse viewed from the air",
    title: "Warehouse infrastructure",
    type: "Aerial",
  },
  {
    src: "/images/gallery/warehouse-roof.webp",
    alt: "Warehouse sheds surrounded by greenery",
    title: "Warehouse sheds",
    type: "Aerial",
  },
  {
    src: "/images/gallery/tank-facility-aerial.webp",
    alt: "Aerial view of tank facility and campus road",
    title: "Tank facility overview",
    type: "Aerial",
  },
  {
    src: "/images/gallery/utility-sunset.webp",
    alt: "Utility building at sunset",
    title: "Campus at sunset",
    type: "Aerial",
  },
  {
    src: "/images/gallery/entry-gate.webp",
    alt: "Indus Best entry gate and security cabin at Bemta–Sarora",
    title: "Entry gate",
    type: "Infrastructure",
  },
  {
    src: "/images/gallery/weighbridge.webp",
    alt: "Weighbridge lane at campus entry",
    title: "Weighbridge",
    type: "Infrastructure",
  },
  {
    src: "/images/gallery/etp-plant.webp",
    alt: "ETP plant and chimney on the campus utilities block",
    title: "ETP plant",
    type: "Infrastructure",
  },
  {
    src: "/images/gallery/cooling-towers.webp",
    alt: "Process-water cooling towers on the utilities block",
    title: "Cooling towers",
    type: "Infrastructure",
  },
  {
    src: "/images/gallery/msme-sheds.webp",
    alt: "Blue MSME plug-and-play sheds on campus",
    title: "MSME sheds",
    type: "Infrastructure",
  },
  {
    src: "/images/gallery/admin-building.webp",
    alt: "Administration building lined with palm trees",
    title: "Admin building",
    type: "Infrastructure",
  },
  {
    src: "/images/gallery/warehouse-dock.webp",
    alt: "Reefer truck at the green warehouse dispatch dock",
    title: "Warehouse dock",
    type: "Infrastructure",
  },
  {
    src: "/images/gallery/dispatch-sunset.webp",
    alt: "Dispatch bay and campus sheds at sunset",
    title: "Dispatch at sunset",
    type: "Infrastructure",
  },
  {
    src: "/images/gallery/process-hall.webp",
    alt: "Live processing hall with stainless equipment and steam",
    title: "Processing hall",
    type: "Factory",
  },
  {
    src: "/images/gallery/vegetable-intake.webp",
    alt: "Staff sorting chillies at the vegetable intake line",
    title: "Vegetable intake",
    type: "Factory",
  },
  {
    src: "/images/gallery/rotary-washer.webp",
    alt: "Rotary drum washers and inspection belts on the intake line",
    title: "Rotary washers",
    type: "Factory",
  },
  {
    src: "/images/gallery/wash-line.webp",
    alt: "Wash line inside the processing plant",
    title: "Wash line",
    type: "Factory",
  },
  {
    src: "/images/gallery/packing-line.webp",
    alt: "Long packing and filling line in the processing hall",
    title: "Packing line",
    type: "Factory",
  },
  {
    src: "/images/gallery/filling-skid.webp",
    alt: "Filling and dosing skid on the production floor",
    title: "Filling skid",
    type: "Factory",
  },
  {
    src: "/images/gallery/cip-hall.webp",
    alt: "CIP hall with stainless process piping",
    title: "CIP hall",
    type: "Factory",
  },
  {
    src: "/images/gallery/process-vessels.webp",
    alt: "Stainless process vessels in the tank farm hall",
    title: "Process vessels",
    type: "Factory",
  },
  {
    src: "/images/gallery/warehouse-racking.webp",
    alt: "Pallet racking aisle in the dry warehouse",
    title: "Dry warehouse",
    type: "Infrastructure",
  },
  {
    src: "/images/gallery/storage-corridor.webp",
    alt: "Storage Section corridor with insulated chamber doors",
    title: "Storage corridor",
    type: "Infrastructure",
  },
  {
    src: "/images/gallery/cold-storage.webp",
    alt: "Cold storage corridor with insulated chamber doors",
    title: "Cold storage",
    type: "Infrastructure",
  },
  {
    src: "/images/gallery/blast-freezer.webp",
    alt: "Blast freezer chamber doors on the cold-chain floor",
    title: "Blast freezer",
    type: "Infrastructure",
  },
  {
    src: "/images/gallery/quality-lab.webp",
    alt: "Central Quality Assurance laboratory",
    title: "Quality lab",
    type: "Lab",
  },
  {
    src: "/images/gallery/lab-corridor.webp",
    alt: "Blue-panel corridor through the quality assurance wing",
    title: "Lab corridor",
    type: "Lab",
  },
  {
    src: "/images/gallery/lab-instruments.webp",
    alt: "Analytical instruments on the quality laboratory benches",
    title: "Lab instruments",
    type: "Lab",
  },
  {
    src: "/images/gallery/lab-benches.webp",
    alt: "Quality laboratory benches and glassware on campus",
    title: "Lab benches",
    type: "Lab",
  },
  {
    src: "/images/gallery/utility-skid.webp",
    alt: "Stainless utility skid beside the CIP-adjacent plant",
    title: "Utility skid",
    type: "Factory",
  },
  {
    src: "/images/gallery/process-tanks.webp",
    alt: "Stainless steel process tanks outside the plant",
    title: "Process tanks",
    type: "Infrastructure",
  },
  {
    src: "/images/gallery/tank-facility.webp",
    alt: "Tank facility beside a blue and white building",
    title: "Tank facility",
    type: "Infrastructure",
  },
] as const

export const Route = createFileRoute("/gallery")({
  head: () =>
    seoHead({
      title: "Campus Gallery | Indus Best Mega Food Park",
      description:
        "See the Indus Best Mega Food Park campus, warehouses, processing lines and shared infrastructure near Raipur.",
      path: "/gallery",
    }),
  component: GalleryPage,
})

function GalleryPage() {
  const [activeImage, setActiveImage] = useState<
    (typeof galleryImages)[number] | null
  >(null)

  return (
    <main>
      <PageHero
        eyebrow="Campus gallery"
        title="A closer look at the park."
        body="Aerial views, processing lines, cold rooms, labs, and campus buildings at Indus Best Mega Food Park near Raipur."
        cta={{ label: "Explore the campus", href: "/campus" }}
        secondaryCta={{ label: "View facilities", href: "/facilities" }}
      />

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-7">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              {galleryImages.length} campus views
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              From the air to the line.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Select any image to view it in detail. All images are optimized WebP
            files for quicker loading.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveImage(image)}
              className={`group relative overflow-hidden rounded-2xl bg-muted text-left focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 ${index % 5 === 0 ? "sm:col-span-2" : ""}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index < 4 ? "eager" : "lazy"}
                className="aspect-[16/10] size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pt-14 pb-5 text-white">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-white/70 uppercase">
                      {image.type}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">
                      {image.title}
                    </h3>
                  </div>
                  <ArrowTopRightOnSquareIcon className="size-5 shrink-0" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {activeImage ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={() => setActiveImage(null)}
            aria-label="Close image viewer"
          />
          <div className="relative z-10 max-h-full max-w-6xl overflow-auto rounded-xl bg-black shadow-2xl">
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[82vh] w-full object-contain"
            />
            <div className="flex items-center justify-between gap-4 bg-[#153d2d] px-5 py-4 text-white">
              <div>
                <p className="text-xs text-white/60 uppercase">
                  {activeImage.type}
                </p>
                <p className="font-semibold">{activeImage.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="rounded-full p-2 hover:bg-white/10"
                aria-label="Close image viewer"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
