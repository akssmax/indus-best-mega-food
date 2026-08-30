import { createFileRoute } from "@tanstack/react-router"

import { NightLanding } from "@/components/landings/night/page"
import { getNouryaProducts } from "@/lib/nourya"
import { site } from "@/content/site"
import { seoHead } from "@/lib/seo"

export const Route = createFileRoute("/landing-3")({
  loader: () => getNouryaProducts(),
  head: () =>
    seoHead({
      title: `Night preview | ${site.name}`,
      description: site.home.description,
      path: "/landing-3",
      noindex: true,
    }),
  component: LandingThree,
})

function LandingThree() {
  const products = Route.useLoaderData()
  return <NightLanding products={products} />
}
