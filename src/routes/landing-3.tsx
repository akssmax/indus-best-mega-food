import { createFileRoute } from "@tanstack/react-router"

import { NightLanding } from "@/components/landings/night/page"
import { getNouryaProducts } from "@/lib/nourya"

export const Route = createFileRoute("/landing-3")({
  loader: () => getNouryaProducts(),
  component: LandingThree,
})

function LandingThree() {
  const products = Route.useLoaderData()
  return <NightLanding products={products} />
}
