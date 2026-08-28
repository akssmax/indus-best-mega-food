import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { PageHero } from "@/components/layout/page-hero"
import { Why } from "@/components/landing/purpose"
import { FinalCta } from "@/components/landing/final-cta"

const page = site.innerPages.why

export const Route = createFileRoute("/why")({
  head: () => ({
    meta: [
      { title: `Why Us | ${site.name}` },
      { name: "description", content: page.description },
    ],
  }),
  component: WhyPage,
})

function WhyPage() {
  return (
    <main>
      <PageHero eyebrow={page.eyebrow} title={page.title} body={page.body} />
      <Why />
      <FinalCta />
    </main>
  )
}
