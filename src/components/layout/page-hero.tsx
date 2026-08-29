import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/landing/section"
import { OceanBackground } from "@/components/landing/ocean-background"
import { MotionItem, Stagger } from "@/components/landing/motion"

export function PageHero({
  eyebrow,
  title,
  body,
  cta,
}: {
  eyebrow: string
  title: string
  body: string
  cta?: { label: string; href: string }
}) {
  return (
    <section
      data-hero
      className="relative z-10 -mt-14 overflow-hidden bg-forest pt-28 text-forest-foreground sm:-mt-16 sm:pt-[7.5rem] lg:pt-36"
    >
      <OceanBackground
        tone="forest"
        placement="fill"
        scale={1.75}
        hoverZoom={1.12}
        interaction="morph"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-6%] size-72 rounded-full bg-cta/15 blur-3xl"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24 xl:px-8">
        <Stagger when="mount" stagger={0.1} className="max-w-3xl">
          <MotionItem>
            <Eyebrow className="text-cta">{eyebrow}</Eyebrow>
          </MotionItem>
          <MotionItem>
            <h1 className="mt-4 text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-[3.25rem]">
              {title}
            </h1>
          </MotionItem>
          <MotionItem>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-forest-foreground/85 sm:text-lg">
              {body}
            </p>
          </MotionItem>
          {cta ? (
            <MotionItem>
              <div className="mt-8">
                <Button variant="cta" className="h-12 px-6 text-base" asChild>
                  <a href={cta.href}>{cta.label}</a>
                </Button>
              </div>
            </MotionItem>
          ) : null}
        </Stagger>
      </div>
    </section>
  )
}
