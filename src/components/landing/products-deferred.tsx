import { useEffect, useState } from "react"
import { useServerFn } from "@tanstack/react-start"

import { Products } from "@/components/landing/products"
import {
  getNouryaProducts,
  nouryaFallback,
  type NouryaProduct,
} from "@/lib/nourya"

export function ProductsDeferred() {
  const fetchProducts = useServerFn(getNouryaProducts)
  const [products, setProducts] = useState<NouryaProduct[]>(nouryaFallback)

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

  return <Products products={products} />
}
