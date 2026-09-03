import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { PageHero } from "@/components/layout/page-hero"
import { FinalCta } from "@/components/landing/final-cta"
import { Location } from "@/components/landing/location"
import { Section } from "@/components/landing/section"
import { VirtualTourSection } from "@/components/virtual-tour/virtual-tour"
import { seoHead } from "@/lib/seo"

const page = site.innerPages.virtualTour

export const Route = createFileRoute("/virtual-tour")({
  head: () =>
    seoHead({
      title: `Virtual tour | ${site.name}`,
      description: page.description,
      path: "/virtual-tour",
    }),
  component: VirtualTourPage,
})

function VirtualTourPage() {
  return (
    <main>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        body={page.body}
        cta={page.cta}
      />
      <VirtualTourSection />
      <Section className="bg-muted/30">
        <Location bandFrom={null} embedded />
      </Section>
      <FinalCta bridge={false} showSecondary={false} />
    </main>
  )
}
