"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { useServerFn } from "@tanstack/react-start"

import { Products } from "@/components/landing/products"
import { isLabCrawler } from "@/lib/lab-crawler"
import {
  getNouryaProducts,
  nouryaFallback,
  type NouryaProduct,
} from "@/lib/nourya"

export function ProductsDeferred() {
  const fetchProducts = useServerFn(getNouryaProducts)
  const [products, setProducts] = useState<NouryaProduct[]>(nouryaFallback)
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { once: true, margin: "200px 0px" })

  useEffect(() => {
    if (!inView || isLabCrawler()) return

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
  }, [fetchProducts, inView])

  return (
    <div ref={rootRef}>
      <Products products={products} />
    </div>
  )
}
