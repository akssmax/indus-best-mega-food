import { landing } from "@/content/landing"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

export function News() {
  const { news: data } = landing

  return (
    <Section id="news">
      <Reveal className="max-w-2xl">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{data.title}</h2>
      </Reveal>

      <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
        {data.items.map((item) => (
          <MotionItem key={item.title}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.tag}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold">
                  {item.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </CardContent>
            </Card>
          </MotionItem>
        ))}
      </Stagger>
    </Section>
  )
}
