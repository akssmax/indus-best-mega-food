import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { PageHero } from "@/components/layout/page-hero"
import { Campus } from "@/components/landing/campus"
import { FinalCta } from "@/components/landing/final-cta"
import { seoHead } from "@/lib/seo"

const page = site.innerPages.facilities

export const Route = createFileRoute("/facilities")({
  head: () =>
    seoHead({
      title: `Facilities | ${site.name}`,
      description: page.description,
      path: "/facilities",
    }),
  component: FacilitiesPage,
})

function FacilitiesPage() {
  return (
    <main>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        body={page.body}
        cta={page.cta}
      />
      <Campus />
      <FinalCta bridge={false} />
    </main>
  )
}
