import { createFileRoute } from "@tanstack/react-router"

import { privateLabel } from "@/content/private-label"
import { site } from "@/content/site"
import { PageHero } from "@/components/layout/page-hero"
import { PrivateLabelPageContent } from "@/components/private-label/private-label-page"
import { seoHead } from "@/lib/seo"

export const Route = createFileRoute("/private-label")({
  head: () =>
    seoHead({
      title: `Private label | ${site.name}`,
      description: privateLabel.meta.description,
      path: "/private-label",
    }),
  component: PrivateLabelRoute,
})

function PrivateLabelRoute() {
  const { hero } = privateLabel

  return (
    <main>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
        cta={hero.cta}
      />
      <PrivateLabelPageContent />
    </main>
  )
}
