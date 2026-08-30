import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { PageHero } from "@/components/layout/page-hero"
import { Opportunities } from "@/components/landing/opportunities"
import { FinalCta } from "@/components/landing/final-cta"
import { seoHead } from "@/lib/seo"

const page = site.innerPages.opportunities

export const Route = createFileRoute("/opportunities")({
  head: () =>
    seoHead({
      title: `Why invest | ${site.name}`,
      description: page.description,
      path: "/opportunities",
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
