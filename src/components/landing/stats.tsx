import {
  MapPinIcon,
  CurrencyRupeeIcon,
  BuildingOffice2Icon,
  ArchiveBoxIcon,
  UserGroupIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline"

import { landing } from "@/content/landing"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

const icons = [
  MapPinIcon,
  CurrencyRupeeIcon,
  BuildingOffice2Icon,
  ArchiveBoxIcon,
  UserGroupIcon,
  CalendarDaysIcon,
]

export function Stats() {
  const { numbers } = landing

  return (
    <Section id={numbers.id} className="bg-forest text-white">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow className="text-cta">{numbers.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{numbers.title}</h2>
      </Reveal>

      <Stagger className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
        {numbers.items.map((stat, index) => {
          const Icon = icons[index] ?? MapPinIcon
          return (
            <MotionItem key={stat.label}>
              <div className="flex flex-col items-center text-center">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white/10">
                  <Icon className="size-6 text-cta" />
                </div>
                <p className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm text-white/70">{stat.label}</p>
              </div>
            </MotionItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
