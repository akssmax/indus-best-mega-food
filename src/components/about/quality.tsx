import { aboutPage } from "@/content/about"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { CampusImg } from "@/components/ui/campus-img"
import { landingImageSizes } from "@/lib/media"

export function AboutQuality() {
  const { quality } = aboutPage

  return (
    <Section id={quality.id} className="bg-secondary/30">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <Reveal>
          <Eyebrow>{quality.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{quality.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {quality.body}
          </p>

          <Stagger className="mt-8 grid gap-3 sm:grid-cols-2">
            {quality.labs.map((lab) => (
              <MotionItem key={lab}>
                <Card size="sm">
                  <CardHeader>
                    <CardTitle className="text-base">{lab}</CardTitle>
                  </CardHeader>
                </Card>
              </MotionItem>
            ))}
          </Stagger>

          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            {quality.utilities.map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10"
              >
                <dt className="text-xs text-muted-foreground">{item.label}</dt>
                <dd className="mt-1 font-heading text-sm font-semibold">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
            <CampusImg
              src={quality.image.src}
              alt={quality.image.alt}
              sizes={landingImageSizes.split}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
