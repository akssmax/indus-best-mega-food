"use client"

import { useLandingContent } from "@/lib/landing-content-context"
import { Button } from "@/components/ui/button"
import { FeaturedProductGrid } from "@/components/landing/featured-product-grid"
import { SectionIntro } from "@/components/landing/feature-card"
import { Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { PatternBand } from "@/components/ui/brand-pattern"
import type { NouryaProduct } from "@/lib/nourya"

export function Products({
  products,
  intro = true,
}: {
  products: NouryaProduct[]
  intro?: boolean
}) {
  const landing = useLandingContent()
  const { products: data } = landing

  return (
    <Section id={data.id} className="relative overflow-hidden">
      <PatternBand
        variant="rain"
        className="pointer-events-none absolute inset-0 text-primary/20"
        patternClassName="opacity-[0.08]"
      />
      <div className="relative z-10">
        {intro ? (
          <Reveal>
            <SectionIntro
              eyebrow={data.eyebrow}
              title={data.title}
              body={data.body}
            />
          </Reveal>
        ) : null}

      <FeaturedProductGrid products={products} className={intro ? "mt-10" : undefined} />

      <Reveal className="mt-10" delay={0.08}>
        <Button variant="secondary" className="h-11 px-5 text-base" asChild>
          <a href={data.cta.href} target="_blank" rel="noopener noreferrer">
            {data.cta.label}
          </a>
        </Button>
      </Reveal>
      </div>
    </Section>
  )
}
