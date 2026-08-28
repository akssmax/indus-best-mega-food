import { createFileRoute } from "@tanstack/react-router"

import { Hero } from "@/components/landing/hero"
import { LogoStrip } from "@/components/landing/logo-strip"
import { Why } from "@/components/landing/purpose"
import { Campus } from "@/components/landing/campus"
import { Products } from "@/components/landing/products"
import { Opportunities } from "@/components/landing/opportunities"
import { Location } from "@/components/landing/location"
import { FinalCta } from "@/components/landing/final-cta"
import { getNouryaProducts } from "@/lib/nourya"

export const Route = createFileRoute("/")({
  loader: () => getNouryaProducts(),
  component: HomePage,
})

function HomePage() {
  const products = Route.useLoaderData()

  return (
    <main>
      <Hero />
      <LogoStrip />
      <Why />
      <Campus />
      <Products products={products} />
      <Opportunities />
      <Location />
      <FinalCta bridgeFrom="bg-secondary/25" />
    </main>
  )
}
