import { createFileRoute } from "@tanstack/react-router"

import { site } from "@/content/site"
import { getNouryaProducts } from "@/lib/nourya"
import { AboutHero } from "@/components/about/hero"
import { AboutWho } from "@/components/about/who"
import { AboutTeam } from "@/components/about/team"
import { AboutCluster } from "@/components/about/cluster"
import { AboutPurpose } from "@/components/about/purpose"
import { AboutSnapshot } from "@/components/about/snapshot"
import { AboutNourya } from "@/components/about/nourya"
import { AboutQuality } from "@/components/about/quality"
import { AboutPlaces } from "@/components/about/places"
import { FinalCta } from "@/components/landing/final-cta"

export const Route = createFileRoute("/about")({
  loader: () => getNouryaProducts(),
  head: () => ({
    meta: [
      { title: `About us | ${site.name}` },
      {
        name: "description",
        content:
          "Indus Best Mega Food Park Private Limited — an operational MOFPI Mega Food Park at Village Bemta–Sarora, near Raipur, with collection, processing, and cold chain on one campus.",
      },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  const products = Route.useLoaderData()

  return (
    <main>
      <AboutHero />
      <AboutWho />
      <AboutTeam />
      <AboutCluster />
      <AboutPurpose />
      <AboutSnapshot />
      <AboutNourya products={products} />
      <AboutQuality />
      <AboutPlaces />
      <FinalCta bridgeFrom="background" />
    </main>
  )
}
