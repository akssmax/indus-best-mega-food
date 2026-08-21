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
        {data.items.map((item, index) => (
          <MotionItem key={item.caption}>
            <div
              className={`group relative overflow-hidden rounded-xl ring-1 ring-foreground/10 ${
                index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className={`size-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  index === 0 ? "aspect-square sm:aspect-auto sm:h-full" : "aspect-[4/3]"
                }`}
                loading={index > 4 ? "lazy" : "eager"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-all duration-400 group-hover:opacity-100">
                <span className="text-sm font-semibold text-white drop-shadow-md">
                  {item.caption}
                </span>
                <span className="mt-0.5 text-xs text-white/70 line-clamp-2">
                  {item.alt}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <div className="size-8 rounded-full bg-white/20 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
              </div>
            </div>
          </MotionItem>
        ))}
      </Stagger>
    </Section>
  )
}
