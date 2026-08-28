import { aboutPage } from "@/content/about"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

export function AboutPurpose() {
  const { purpose } = aboutPage

  return (
    <Section id={purpose.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{purpose.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{purpose.title}</h2>
      </Reveal>

      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
        <MotionItem>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-heading text-lg">
                {purpose.vision.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {purpose.vision.body}
              </p>
            </CardContent>
          </Card>
        </MotionItem>
        <MotionItem>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-heading text-lg">
                {purpose.mission.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {purpose.mission.body}
              </p>
            </CardContent>
          </Card>
        </MotionItem>
      </Stagger>

      <Stagger className="mt-4 grid gap-4 sm:grid-cols-3">
        {purpose.values.map((value) => (
          <MotionItem key={value.title}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="font-heading text-lg">
                  {value.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </CardContent>
            </Card>
          </MotionItem>
        ))}
      </Stagger>
    </Section>
  )
}
