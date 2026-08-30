import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { PageHero } from "@/components/layout/page-hero"
import { Why } from "@/components/landing/purpose"
import { Stats } from "@/components/landing/stats"
import { FinalCta } from "@/components/landing/final-cta"
import { ForestBandBridge } from "@/lib/section-band"
import { seoHead } from "@/lib/seo"

const page = site.innerPages.why

export const Route = createFileRoute("/why")({
  head: () =>
    seoHead({
      title: `Why Us | ${site.name}`,
      description: page.description,
      path: "/why",
    }),
  component: WhyPage,
})

function WhyPage() {
  return (
    <main>
      <PageHero eyebrow={page.eyebrow} title={page.title} body={page.body} />
      <Why />
      <ForestBandBridge from="background" />
      <Stats />
      <FinalCta bridge="bottom" />
    </main>
  )
}
