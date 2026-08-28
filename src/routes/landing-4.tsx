import { createFileRoute } from "@tanstack/react-router"

import { BroadsheetLanding } from "@/components/landings/broadsheet/page"
import { getNouryaProducts } from "@/lib/nourya"

export const Route = createFileRoute("/landing-4")({
  loader: () => getNouryaProducts(),
  component: LandingFour,
})

function LandingFour() {
  const products = Route.useLoaderData()
  return <BroadsheetLanding products={products} />
}
