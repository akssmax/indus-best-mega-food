import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { PageHero } from "@/components/layout/page-hero"
import { Campus } from "@/components/landing/campus"
import { FinalCta } from "@/components/landing/final-cta"

const page = site.innerPages.facilities

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: `Facilities | ${site.name}` },
      { name: "description", content: page.description },
    ],
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
      <FinalCta bridgeFrom="bg-secondary/30" />
    </main>
  )
}
