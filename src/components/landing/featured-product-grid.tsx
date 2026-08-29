import { ArrowUpRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { MotionItem, Stagger } from "@/components/landing/motion"
import { pickFeaturedProducts, type NouryaProduct } from "@/lib/nourya"
import { landingImageSizes, sizedImageUrl } from "@/lib/media"
import { cn } from "@/lib/utils"

export function FeaturedProductGrid({
  products,
  limit = 4,
  className,
}: {
  products: readonly NouryaProduct[]
  limit?: number
  className?: string
}) {
  const featured = pickFeaturedProducts(products, limit)

  return (
    <Stagger
      className={cn("grid grid-cols-2 gap-4 lg:grid-cols-4", className)}
    >
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
                    src={sizedImageUrl(product.image, 640)}
                    alt={product.title}
                    sizes={landingImageSizes.product}
                    loading="lazy"
                    decoding="async"
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
  )
}
