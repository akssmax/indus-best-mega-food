import { createFileRoute } from "@tanstack/react-router"

import { landing } from "@/content/landing"
import { site } from "@/content/site"
import { Hero } from "@/components/landing/hero"
import { LogoStrip } from "@/components/landing/logo-strip"
// import { SocialProof } from "@/components/landing/social-proof"
import { Why } from "@/components/landing/purpose"
import { WhoIsItFor } from "@/components/landing/who-is-it-for"
import { EcosystemFlow } from "@/components/landing/ecosystem-flow"
import { CampusFacilities } from "@/components/landing/campus-facilities"
import { ProductsDeferred } from "@/components/landing/products-deferred"
import { Opportunities } from "@/components/landing/opportunities"
import { Location } from "@/components/landing/location"
import { Faq } from "@/components/landing/faq"
import { FinalCta } from "@/components/landing/final-cta"
import { SectionBand } from "@/lib/section-band"
import { faqJsonLd, seoHead } from "@/lib/seo"

const lcpHeroImage = landing.hero.slides[0]?.image.src ?? landing.hero.image.src

export const Route = createFileRoute("/")({
  head: () => {
    const seo = seoHead({
      title: site.home.title,
      description: site.home.description,
      path: "/",
    })
    return {
      meta: [...seo.meta, faqJsonLd(landing.faq.items)],
      links: [
        ...seo.links,
        { rel: "preconnect", href: "https://cdn.shopify.com" },
        { rel: "dns-prefetch", href: "https://maps.google.com" },
        {
          rel: "preload",
          href: lcpHeroImage,
          as: "image",
          fetchPriority: "high",
        },
      ],
    }
  },
  component: HomePage,
})

function HomePage() {
  return (
    <main>
      <Hero />
      <LogoStrip variant="home" />
      {/* <SocialProof /> */}
      <Why />
      <WhoIsItFor />
      <EcosystemFlow />
      <CampusFacilities />
      <ProductsDeferred />
      <Opportunities />
      <SectionBand tone="secondary-25">
        <Location bandFrom={null} />
        <Faq />
      </SectionBand>
      <FinalCta bridgeFrom="secondary-25" />
    </main>
  )
}
