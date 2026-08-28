import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { PageHero } from "@/components/layout/page-hero"
import { Campus } from "@/components/landing/campus"
import { Location } from "@/components/landing/location"

const page = site.innerPages.campus

export const Route = createFileRoute("/campus")({
  head: () => ({
    meta: [
      { title: `Campus | ${site.name}` },
      { name: "description", content: page.description },
    ],
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
