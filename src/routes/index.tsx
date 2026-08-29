import { lazy, Suspense } from "react"
import { createFileRoute } from "@tanstack/react-router"

import { landing } from "@/content/landing"
import { Hero } from "@/components/landing/hero"
import { LogoStrip } from "@/components/landing/logo-strip"
import { HomeSectionFallback } from "@/components/landing/home-section-fallback"
import { ProductsDeferred } from "@/components/landing/products-deferred"

const Why = lazy(() =>
  import("@/components/landing/purpose").then((module) => ({
    default: module.Why,
  }))
)
const Campus = lazy(() =>
  import("@/components/landing/campus").then((module) => ({
    default: module.Campus,
  }))
)
const Opportunities = lazy(() =>
  import("@/components/landing/opportunities").then((module) => ({
    default: module.Opportunities,
  }))
)
const Location = lazy(() =>
  import("@/components/landing/location").then((module) => ({
    default: module.Location,
  }))
)
const FinalCta = lazy(() =>
  import("@/components/landing/final-cta").then((module) => ({
    default: module.FinalCta,
  }))
)

const lcpHeroImage = landing.hero.slides[0]?.image.src ?? landing.hero.image.src

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      {
        rel: "preload",
        href: lcpHeroImage,
        as: "image",
        fetchPriority: "high",
      },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  return (
    <main>
      <Hero />
      <LogoStrip />
      <Suspense fallback={<HomeSectionFallback />}>
        <Why />
      </Suspense>
      <Suspense fallback={<HomeSectionFallback />}>
        <Campus />
      </Suspense>
      <ProductsDeferred />
      <Suspense fallback={<HomeSectionFallback />}>
        <Opportunities />
      </Suspense>
      <Suspense fallback={<HomeSectionFallback />}>
        <Location />
      </Suspense>
      <Suspense fallback={<HomeSectionFallback />}>
        <FinalCta bridgeFrom="bg-secondary/25" />
      </Suspense>
    </main>
  )
}
