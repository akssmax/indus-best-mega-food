import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { getNouryaProducts } from "@/lib/nourya"
import { PageHero } from "@/components/layout/page-hero"
import { Products } from "@/components/landing/products"
import { FinalCta } from "@/components/landing/final-cta"
import { seoHead } from "@/lib/seo"

const page = site.innerPages.products

export const Route = createFileRoute("/products")({
  loader: () => getNouryaProducts(),
  head: () =>
    seoHead({
      title: `Products | ${site.name}`,
      description: page.description,
      path: "/products",
    }),
  component: ProductsPage,
})

function ProductsPage() {
  const products = Route.useLoaderData()

  return (
    <main>
      <PageHero eyebrow={page.eyebrow} title={page.title} body={page.body} />
      <Products products={products} intro={false} />
      <FinalCta bridge={false} />
    </main>
  )
}
