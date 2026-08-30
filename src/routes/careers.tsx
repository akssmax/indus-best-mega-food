import { createFileRoute } from "@tanstack/react-router"

import { careers } from "@/content/careers"
import { site } from "@/content/site"
import { PageHero } from "@/components/layout/page-hero"
import { CareersPageContent } from "@/components/careers/careers-page"
import { seoHead } from "@/lib/seo"

export const Route = createFileRoute("/careers")({
  head: () =>
    seoHead({
      title: `Careers | ${site.name}`,
      description: careers.meta.description,
      path: "/careers",
    }),
  component: CareersRoute,
})

function CareersRoute() {
  const { hero } = careers

  return (
    <main>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        body={hero.body}
      />
      <CareersPageContent />
    </main>
  )
}
