import { aboutPage } from "@/content/about"
import { Card, CardContent } from "@/components/ui/card"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { StatusSeal } from "@/components/ui/status-seal"

export function AboutWho() {
  const { who } = aboutPage

  return (
    <Section id={who.id}>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal>
          <Eyebrow>{who.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{who.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{who.body}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {who.whatIs}
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{who.scheme}</p>
          <div className="mt-8">
            <StatusSeal kicker={who.seal.kicker} title={who.seal.title} />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <Card className="overflow-hidden p-0">
            <img
              src={who.image.src}
              alt={who.image.alt}
              className="aspect-[4/3] w-full rounded-none object-cover"
            />
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{who.image.alt}</p>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
