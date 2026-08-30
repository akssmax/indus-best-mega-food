import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { PageHero } from "@/components/layout/page-hero"
import { Campus } from "@/components/landing/campus"
import { Location } from "@/components/landing/location"
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
      <PageHero eyebrow={page.eyebrow} title={page.title} body={page.body} />
      <Campus />
      <Location />
    </main>
  )
}
