import { useEffect, useState } from "react"
import { useServerFn } from "@tanstack/react-start"

import { Products } from "@/components/landing/products"
import { HomeSectionFallback } from "@/components/landing/home-section-fallback"
import {
  getNouryaProducts,
  nouryaFallback,
  type NouryaProduct,
} from "@/lib/nourya"

export function ProductsDeferred() {
  const fetchProducts = useServerFn(getNouryaProducts)
  const [products, setProducts] = useState<NouryaProduct[] | null>(null)

  useEffect(() => {
    let cancelled = false

    void fetchProducts()
      .then((catalog) => {
        if (!cancelled) setProducts(catalog)
      })
      .catch(() => {
        if (!cancelled) setProducts(nouryaFallback)
      })

    return () => {
      cancelled = true
    }
  }, [fetchProducts])

  if (!products) return <HomeSectionFallback />

  return <Products products={products} />
}
