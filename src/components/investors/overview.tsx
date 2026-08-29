import { UserGroupIcon } from "@heroicons/react/24/outline"

import { landing } from "@/content/landing"
import { Button } from "@/components/ui/button"
import { Eyebrow, Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { BrandPattern, PatternCorner } from "@/components/ui/brand-pattern"

export function InvestorOverview() {
  const { opportunities, infrastructure, why } = landing
  const investor = opportunities.items.find((item) => item.featured)
  const scheme = why.advantages.find((item) => "badge" in item && item.badge)

  if (!investor) return null

  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-forest p-6 text-forest-foreground sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 bottom-0 z-0 size-44 sm:size-52 [mask-image:linear-gradient(225deg,#000_18%,transparent_60%)]"
            >
              <BrandPattern variant="bloom" className="text-cta opacity-[0.38]" />
            </div>
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-forest-foreground/10">
                <UserGroupIcon className="size-5 text-cta" />
              </div>
              <Eyebrow className="text-cta">Partnership</Eyebrow>
              <h2 className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">
                {investor.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-forest-foreground/85 sm:text-base">
                {investor.body} {opportunities.body}
              </p>
              <div className="mt-8">
                <Button variant="cta" className="h-11 px-5" asChild>
                  <a href={opportunities.cta.href}>{opportunities.cta.label}</a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {scheme ? (
          <Reveal delay={0.08}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-card p-6 ring-1 ring-foreground/8 sm:p-8">
              <PatternCorner
                variant="bloom"
                position="bottom-right"
                size="lg"
                className="text-cta opacity-[0.16]"
              />
              <div className="relative z-10 flex h-full flex-col">
                <Eyebrow>Scheme</Eyebrow>
                <h2 className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">
                  {scheme.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {scheme.body}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  {infrastructure.mofpi}
                </p>
                {"badge" in scheme && scheme.badge ? (
                  <p className="mt-6 text-xs font-medium tracking-[0.18em] text-cta uppercase">
                    {scheme.badge}
                  </p>
                ) : null}
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </Section>
  )
}
