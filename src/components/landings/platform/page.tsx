import type { NouryaProduct } from "@/lib/nourya"
import { OverlayNav } from "@/components/layout/headers/overlay-nav"
import { SiteFooter } from "@/components/layout/site-footer"
import { SkinFrame } from "@/components/landings/skin-frame"
import { PlatformHeroShowcase } from "@/components/landings/platform/hero-showcase"
import { PlatformTrustBand } from "@/components/landings/platform/trust-band"
import { PlatformPillars } from "@/components/landings/platform/pillars"
import { PlatformFlowStrip } from "@/components/landings/platform/flow-strip"
import { PlatformCapabilities } from "@/components/landings/platform/capabilities"
import { PlatformWays } from "@/components/landings/platform/ways"
import { PlatformLocationFaq } from "@/components/landings/platform/location-faq"
import { WhoIsItFor } from "@/components/landing/who-is-it-for"
import { FinalCta } from "@/components/landing/final-cta"

export function PlatformLanding({ products: _products }: { products: NouryaProduct[] }) {
  return (
    <SkinFrame skin="platform" className="pb-24 lg:pb-0">
      <OverlayNav />
      <main>
        <PlatformHeroShowcase />
        <PlatformTrustBand />
        <PlatformPillars />
        <WhoIsItFor flat />
        <PlatformFlowStrip />
        <PlatformCapabilities />
        <PlatformWays />
        <PlatformLocationFaq />
        <FinalCta bridge={false} />
      </main>
      <SiteFooter tone="light" />
    </SkinFrame>
  )
}
