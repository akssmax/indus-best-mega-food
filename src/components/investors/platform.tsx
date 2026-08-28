import { investorsPage } from "@/content/investors"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"

export function InvestorPlatform() {
  const { platform } = investorsPage

  return (
    <Section id={platform.id}>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
        <Reveal>
          <Eyebrow>{platform.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{platform.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {platform.body}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <figure className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/8">
            <img
              src={platform.image.src}
              alt={platform.image.alt}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <figcaption className="px-4 py-3 text-sm text-muted-foreground">
              Master plan — Village Bemta–Sarora
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}
