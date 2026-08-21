import {
  MapPinIcon,
  CubeTransparentIcon,
  BoltIcon,
  ArrowPathIcon,
  UserGroupIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline"

import { landing } from "@/content/landing"
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
    <Section id={why.id} className="bg-secondary/30">
      <Reveal className="max-w-2xl">
        <Eyebrow>{why.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{why.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{why.body}</p>
      </Reveal>

      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {why.advantages.map((advantage, index) => {
          const Icon = iconMap[index] ?? MapPinIcon
          return (
            <MotionItem key={advantage.title}>
              <div className="group rounded-2xl border border-border/40 bg-card p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                  {advantage.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {advantage.body}
                </p>
              </div>
            </MotionItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
