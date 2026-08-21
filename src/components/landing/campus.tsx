import { landing } from "@/content/landing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

export function Campus() {
  const { facilities: data } = landing

  return (
    <Section id={data.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{data.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{data.body}</p>
      </Reveal>

      <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((facility) => (
          <MotionItem key={facility.title}>
            <Card className="h-full overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={facility.image.src}
                  alt={facility.image.alt}
                  className="size-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="rounded-md bg-cta px-2.5 py-1 text-xs font-semibold text-white">
                    {facility.spec}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="font-heading text-lg">
                  {facility.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {facility.body}
                </p>
              </CardContent>
            </Card>
          </MotionItem>
        ))}
      </Stagger>
    </Section>
  )
}
