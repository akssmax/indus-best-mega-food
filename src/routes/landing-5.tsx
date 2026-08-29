import { createFileRoute } from "@tanstack/react-router"

import { MintLanding } from "@/components/landings/mint/page"
import { getNouryaProducts } from "@/lib/nourya"

export const Route = createFileRoute("/landing-5")({
  loader: () => getNouryaProducts(),
  component: LandingFive,
})

function LandingFive() {
  const products = Route.useLoaderData()
  return <MintLanding products={products} />
}
