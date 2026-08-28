import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { PageHero } from "@/components/layout/page-hero"
import { InvestorOverview } from "@/components/investors/overview"
import { InvestorPlatform } from "@/components/investors/platform"
import { InvestorResources } from "@/components/investors/resources"
import { InvestorRates } from "@/components/investors/rates"
import { Stats } from "@/components/landing/stats"
import { FinalCta } from "@/components/landing/final-cta"

const page = site.innerPages.investors

export const Route = createFileRoute("/investors")({
  head: () => ({
    meta: [
      { title: `Investor Corner | ${site.name}` },
      { name: "description", content: page.description },
    ],
  }),
  component: InvestorsPage,
})

function InvestorsPage() {
  return (
    <main>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        body={page.body}
        cta={page.cta}
      />
      <InvestorOverview />
      <InvestorPlatform />
      <InvestorResources />
      <InvestorRates />
      <Stats />
      <FinalCta bridge="bottom" />
    </main>
  )
}
