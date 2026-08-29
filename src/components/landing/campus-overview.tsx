import { landing } from "@/content/landing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

type CampusOverviewItem = (typeof landing.campusOverview.items)[number]

export function CampusOverviewCard({ item }: { item: CampusOverviewItem }) {
  return (
    <Card className="group/card h-full gap-0 overflow-hidden p-0">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={item.image.src}
          alt={item.image.alt}
          className="absolute inset-0 size-full rounded-none object-cover transition-transform duration-500 hover-fine:group-hover/card:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="rounded-md bg-cta px-2.5 py-1 text-xs font-semibold text-white">
            {item.metric}
            <span className="font-normal text-white/90"> · {item.metricLabel}</span>
          </span>
        </div>
      </div>
      <CardHeader className="pt-4">
        <CardTitle className="font-heading text-lg">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
      </CardContent>
    </Card>
  )
}

export function CampusOverview() {
  const { campusOverview } = landing

  return (
    <Section id={campusOverview.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{campusOverview.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{campusOverview.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {campusOverview.body}
        </p>
      </Reveal>

      <Stagger className="mt-10 grid gap-6 sm:grid-cols-2">
        {campusOverview.items.map((item) => (
          <MotionItem key={item.title}>
            <CampusOverviewCard item={item} />
          </MotionItem>
        ))}
      </Stagger>
    </Section>
  )
}
