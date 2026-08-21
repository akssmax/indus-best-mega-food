import {
  MapPinIcon,
  CubeTransparentIcon,
  BoltIcon,
  ArrowPathIcon,
  UserGroupIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline"

import { landing } from "@/content/landing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

const iconMap = [
  MapPinIcon,
  CubeTransparentIcon,
  BoltIcon,
  ArrowPathIcon,
  UserGroupIcon,
  BanknotesIcon,
]

export function Why() {
  const { why } = landing

  return (
    <Section id={why.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{why.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{why.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{why.body}</p>
      </Reveal>

      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {why.advantages.map((advantage, index) => {
          const Icon = iconMap[index] ?? MapPinIcon
          return (
            <MotionItem key={advantage.title}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-lg">
                    {advantage.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {advantage.body}
                  </p>
                </CardContent>
              </Card>
            </MotionItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
