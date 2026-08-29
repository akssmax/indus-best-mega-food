import { createFileRoute } from "@tanstack/react-router"

import { PlatformLanding } from "@/components/landings/platform/page"
import { nouryaFallback } from "@/lib/nourya"

export const Route = createFileRoute("/landing-5")({
  component: LandingFive,
})

function LandingFive() {
  return <PlatformLanding products={nouryaFallback} />
}
