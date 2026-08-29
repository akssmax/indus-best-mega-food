import { ArrowUpRight } from "lucide-react"

import { landing } from "@/content/landing"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionIntro } from "@/components/landing/feature-card"
import { Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { PatternBand } from "@/components/ui/brand-pattern"
import { pickFeaturedProducts, type NouryaProduct } from "@/lib/nourya"

export function Products({ products }: { products: NouryaProduct[] }) {
  const { products: data } = landing
  const featured = pickFeaturedProducts(products)

  return (
    <Section id={data.id} className="relative overflow-hidden">
      <PatternBand
        variant="rain"
        className="pointer-events-none absolute inset-0 text-primary/20"
        patternClassName="opacity-[0.08]"
      />
      <div className="relative z-10">
        <Reveal>
          <SectionIntro
            eyebrow={data.eyebrow}
            title={data.title}
            body={data.body}
          />
        </Reveal>

      <Stagger className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {featured.map((product) => (
          <MotionItem key={product.handle}>
            <a
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full touch-target"
            >
              <Card className="h-full gap-0 overflow-hidden p-0 transition-shadow duration-300 hover-fine:shadow-[0_12px_32px_rgba(15,43,29,0.1)] active:shadow-[0_8px_24px_rgba(15,43,29,0.08)]">
                <div className="relative aspect-[4/5] bg-muted/40">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="absolute inset-0 size-full object-cover transition-transform duration-500 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                        {product.category}
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="flex flex-1 flex-col gap-1 p-4">
                  <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                    {product.category}
                  </p>
                  <p className="font-heading text-sm leading-snug font-semibold sm:text-base">
                    {product.title}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <span className="text-sm font-medium text-foreground">
                      {product.priceLabel ?? "\u00a0"}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-xs font-medium text-primary">
                      Shop
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </a>
          </MotionItem>
        ))}
      </Stagger>

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
