import { ArrowUpRight } from "lucide-react"

import { aboutPage } from "@/content/about"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { BrandPattern } from "@/components/ui/brand-pattern"

export function AboutSnapshot() {
  const { snapshot } = aboutPage

  return (
    <Section
      id={snapshot.id}
      className="overflow-hidden bg-forest text-forest-foreground"
      innerClassName="relative"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-full hidden w-40 [mask-image:linear-gradient(to_right,#000_12%,transparent_88%)] lg:block xl:w-48"
      >
        <BrandPattern variant="bloom" className="text-cta opacity-[0.32]" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-full hidden w-40 [mask-image:linear-gradient(to_left,#000_12%,transparent_88%)] lg:block xl:w-48"
      >
        <BrandPattern variant="bloom" className="text-cta opacity-[0.32]" />
      </div>

      <div className="relative z-10">
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-cta">{snapshot.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{snapshot.title}</h2>
          <p className="mt-4 leading-relaxed text-forest-foreground/80">
            {snapshot.body}
          </p>
        </Reveal>

        <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {snapshot.items.map((item) => (
            <MotionItem key={item.label}>
              <a
                href={item.href}
                className="group flex h-full flex-col rounded-2xl bg-white/8 px-4 py-5 ring-1 ring-white/10 transition-colors hover:bg-white/12"
              >
                <p className="font-heading text-2xl font-semibold sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1.5 flex items-center justify-between gap-2 text-sm text-forest-foreground/75">
                  {item.label}
                  <ArrowUpRight className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </p>
              </a>
            </MotionItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
