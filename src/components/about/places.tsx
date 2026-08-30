import { aboutPage } from "@/content/about"
import { site } from "@/content/site"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

export function AboutPlaces() {
  const { places } = aboutPage
  const addresses = [
    site.addresses.works,
    site.addresses.corporate,
    site.addresses.registered,
  ]

  return (
    <Section id={places.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{places.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{places.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{places.body}</p>
      </Reveal>

      <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
        {addresses.map((address) => (
          <MotionItem key={address.label}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="font-heading text-lg">
                  {address.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {address.lines.map((line) => (
                  <p
                    key={line}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {line}
                  </p>
                ))}
              </CardContent>
            </Card>
          </MotionItem>
        ))}
      </Stagger>

      <Reveal className="mt-8" delay={0.06}>
        <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
          <iframe
            src={places.mapEmbed}
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Indus Best Mega Food Park works"
          />
        </div>
      </Reveal>

      <Reveal className="mt-8 text-sm" delay={0.08}>
        <p>
          <span className="text-muted-foreground">{site.emails[0].label}: </span>
          <a
            href={site.emails[0].href}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {site.emails[0].address}
          </a>
        </p>
      </Reveal>
    </Section>
  )
}
