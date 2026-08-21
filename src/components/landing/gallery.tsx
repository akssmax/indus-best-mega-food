import { landing } from "@/content/landing"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

export function Gallery() {
  const { gallery: data } = landing

  return (
    <Section id="gallery" className="bg-secondary/30">
      <Reveal className="max-w-2xl">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{data.title}</h2>
      </Reveal>

      <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {data.items.map((item) => (
          <MotionItem key={item.caption}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-foreground/10">
              <img
                src={item.src}
                alt={item.alt}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm font-medium text-white">
                  {item.caption}
                </span>
              </div>
            </div>
          </MotionItem>
        ))}
      </Stagger>
    </Section>
  )
}
