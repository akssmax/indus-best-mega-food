import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { PageHero } from "@/components/layout/page-hero"
import { Opportunities } from "@/components/landing/opportunities"
import { FinalCta } from "@/components/landing/final-cta"

const page = site.innerPages.opportunities

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: `Why invest | ${site.name}` },
      { name: "description", content: page.description },
    ],
  }),
  component: OpportunitiesPage,
})

function OpportunitiesPage() {
  return (
    <main>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        body={page.body}
        cta={page.cta}
      />
      <Opportunities />
      <FinalCta />
    </main>
  )
}
