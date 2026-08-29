import { createFileRoute } from "@tanstack/react-router"

import { landing } from "@/content/landing"
import { Hero } from "@/components/landing/hero"
import { LogoStrip } from "@/components/landing/logo-strip"
// import { SocialProof } from "@/components/landing/social-proof"
import { Why } from "@/components/landing/purpose"
import { WhoIsItFor } from "@/components/landing/who-is-it-for"
import { EcosystemFlow } from "@/components/landing/ecosystem-flow"
import { CampusFacilities } from "@/components/landing/campus-facilities"
import { Products } from "@/components/landing/products"
import { Opportunities } from "@/components/landing/opportunities"
import { getNouryaProducts } from "@/lib/nourya"
import { Location } from "@/components/landing/location"
import { Faq } from "@/components/landing/faq"
import { FinalCta } from "@/components/landing/final-cta"
import { SectionBand } from "@/lib/section-band"

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
  loader: () => getNouryaProducts(),
  component: HomePage,
})

function HomePage() {
  const products = Route.useLoaderData()
  return (
    <main>
      <Hero />
      <LogoStrip variant="home" />
      {/* <SocialProof /> */}
      <Why />
      <WhoIsItFor />
      <EcosystemFlow />
      <CampusFacilities />
      <Products products={products} />
      <Opportunities />
      <SectionBand tone="secondary-25">
        <Location bandFrom={null} />
        <Faq />
      </SectionBand>
      <FinalCta bridgeFrom="secondary-25" />
    </main>
  )
}
