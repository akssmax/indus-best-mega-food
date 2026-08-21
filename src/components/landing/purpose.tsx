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

      <Stagger className="mt-10 space-y-4">
        {why.advantages.map((advantage, index) => {
          const Icon = iconMap[index] ?? MapPinIcon
          return (
            <MotionItem key={advantage.title}>
              <div className="group relative flex items-start gap-6 rounded-2xl border border-border/40 bg-card p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:items-center">
                <div className="flex shrink-0 items-center gap-4">
                  <span className="font-heading text-4xl font-bold text-primary/20 transition-colors duration-300 group-hover:text-primary/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <Icon className="size-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                    {advantage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {advantage.body}
                  </p>
                </div>
                <div className="hidden shrink-0 sm:block">
                  <svg
                    className="size-5 text-muted-foreground/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </MotionItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
