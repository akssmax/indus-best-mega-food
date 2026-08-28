import { createFileRoute } from "@tanstack/react-router"

import { AtelierLanding } from "@/components/landings/atelier/page"
import { getNouryaProducts } from "@/lib/nourya"

export const Route = createFileRoute("/landing-2")({
  loader: () => getNouryaProducts(),
  component: LandingTwo,
})

function LandingTwo() {
  const products = Route.useLoaderData()
  return <AtelierLanding products={products} />
}
