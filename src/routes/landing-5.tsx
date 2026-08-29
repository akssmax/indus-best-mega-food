import { createFileRoute } from "@tanstack/react-router"

import { PlatformLanding } from "@/components/landings/platform/page"
import { getNouryaProducts } from "@/lib/nourya"

export const Route = createFileRoute("/landing-5")({
  loader: () => getNouryaProducts(),
  component: LandingFive,
})

function LandingFive() {
  const products = Route.useLoaderData()
  return <PlatformLanding products={products} />
}
