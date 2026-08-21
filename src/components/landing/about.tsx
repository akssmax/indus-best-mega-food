import { landing } from "@/content/landing"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"

export function About() {
  const { about } = landing

  return (
    <Section id={about.id} className="bg-secondary/30">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{about.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {about.body}
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {about.whatIs}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg">
                  {about.vision.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {about.vision.body}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg">
                  {about.mission.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {about.mission.body}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8">
            <Button variant="cta" className="h-11 px-5 text-base" asChild>
              <a href={about.cta.href}>{about.cta.label}</a>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-xl ring-1 ring-foreground/10">
            <img
              src={about.image.src}
              alt={about.image.alt}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
