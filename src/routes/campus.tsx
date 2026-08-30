import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { PageHero } from "@/components/layout/page-hero"
import { Campus } from "@/components/landing/campus"
import { Location } from "@/components/landing/location"
import { FinalCta } from "@/components/landing/final-cta"
import { seoHead } from "@/lib/seo"

const page = site.innerPages.campus

export const Route = createFileRoute("/campus")({
  head: () =>
    seoHead({
      title: `Campus | ${site.name}`,
      description: page.description,
      path: "/campus",
    }),
  component: CampusPage,
})

function CampusPage() {
  return (
    <main>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        body={page.body}
        cta={page.cta}
      />
      <Campus />
      <Location />
      <FinalCta bridgeFrom="secondary-25" showSecondary={false} />
    </main>
  )
}
