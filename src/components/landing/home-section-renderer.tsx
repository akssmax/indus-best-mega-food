import type { ReactNode } from "react"

import type { HomeSectionKey } from "@/content/home-sections.registry"
import { Hero } from "@/components/landing/hero"
import { LogoStrip } from "@/components/landing/logo-strip"
import { SocialProof } from "@/components/landing/social-proof"
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

const SECTION_COMPONENTS: Record<
  HomeSectionKey,
  () => ReactNode
> = {
  hero: () => <Hero />,
  logoStrip: () => <LogoStrip variant="home" />,
  socialProof: () => <SocialProof />,
  why: () => <Why />,
  whoIsItFor: () => <WhoIsItFor />,
  ecosystemFlow: () => <EcosystemFlow />,
  campusFacilities: () => <CampusFacilities />,
  products: () => <ProductsDeferred />,
  opportunities: () => <Opportunities />,
  location: () => <Location bandFrom={null} />,
  faq: () => <Faq />,
  finalCta: () => <FinalCta bridgeFrom="secondary-25" />,
}

export function renderSingleHomeSection(sectionKey: HomeSectionKey) {
  const render = SECTION_COMPONENTS[sectionKey]
  if (sectionKey === "location") {
    return (
      <SectionBand tone="secondary-25">
        {render()}
      </SectionBand>
    )
  }
  return render()
}

export function renderHomeSections(
  sections: { sectionKey: HomeSectionKey; enabled: boolean }[],
  options?: { hero?: () => ReactNode },
) {
  const enabled = sections.filter((section) => section.enabled)
  const nodes: ReactNode[] = []

  for (let index = 0; index < enabled.length; index += 1) {
    const section = enabled[index]!
    const next = enabled[index + 1]
    const render =
      section.sectionKey === "hero" && options?.hero
        ? options.hero
        : SECTION_COMPONENTS[section.sectionKey]

    if (
      section.sectionKey === "location" &&
      next?.sectionKey === "faq"
    ) {
      nodes.push(
        <SectionBand key="location-faq-band" tone="secondary-25">
          {render()}
          {SECTION_COMPONENTS.faq()}
        </SectionBand>,
      )
      index += 1
      continue
    }

    if (section.sectionKey === "faq" && enabled[index - 1]?.sectionKey === "location") {
      continue
    }

    nodes.push(<div key={section.sectionKey}>{render()}</div>)
  }

  return nodes
}
