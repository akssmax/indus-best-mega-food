import { landing } from "@/content/landing"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { CampusImg } from "@/components/ui/campus-img"
import { landingImageSizes } from "@/lib/media"

export function Gallery() {
  const { gallery: data } = landing

  return (
    <Section id="gallery" className="bg-secondary/30">
      <Reveal className="max-w-2xl">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{data.title}</h2>
      </Reveal>

      <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {data.items.map((item, index) => (
          <MotionItem
            key={item.caption}
            className={`min-w-0 ${index < 4 ? "lg:col-span-3" : "lg:col-span-4"}`}
          >
            <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-foreground/10">
              <CampusImg
                src={item.src}
                alt={item.alt}
                sizes={landingImageSizes.card}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
                aria-hidden
              />
              <figcaption className="absolute inset-x-0 bottom-0 px-4 pb-4 font-heading text-sm font-semibold text-white drop-shadow-md">
                {item.caption}
              </figcaption>
            </figure>
          </MotionItem>
        ))}
      </Stagger>
    </Section>
  )
}
