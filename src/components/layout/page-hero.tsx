import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"

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
      className="relative overflow-hidden bg-forest text-forest-foreground"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24 xl:px-8">
        <Reveal>
          <Eyebrow className="text-cta">{eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-forest-foreground/85 sm:text-lg">
            {body}
          </p>
          {cta ? (
            <div className="mt-8">
              <Button variant="cta" className="h-12 px-6 text-base" asChild>
                <a href={cta.href}>{cta.label}</a>
              </Button>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}
