import { landing } from "@/content/landing"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"

export function Location() {
  const { location: data } = landing

  return (
    <Section id={data.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{data.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{data.body}</p>
      </Reveal>

      <Reveal className="mt-10" delay={0.06}>
        <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
          <iframe
            src={data.mapEmbed}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Indus Best Mega Food Park Location"
          />
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Reveal delay={0.08}>
          <h3 className="font-heading text-xl font-semibold">
            Key Distances
          </h3>
          <div className="mt-4 space-y-2">
            {data.connections.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-4 py-3"
              >
                <span className="text-sm text-muted-foreground">
                  {item.label}
                </span>
                <span className="font-heading text-sm font-semibold text-primary">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="font-heading text-xl font-semibold">
            Nearby Markets
          </h3>
          <div className="mt-4 space-y-2">
            {data.markets.map((market) => (
              <div
                key={market}
                className="flex items-center gap-3 rounded-lg border border-border/60 bg-card px-4 py-3"
              >
                <div className="size-2 shrink-0 rounded-full bg-cta" />
                <span className="text-sm text-muted-foreground">{market}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
