import { createFileRoute } from "@tanstack/react-router"

import { Hero } from "@/components/landing/hero"
import { About } from "@/components/landing/about"
import { Why } from "@/components/landing/purpose"
import { Infrastructure } from "@/components/landing/infrastructure"
import { Campus } from "@/components/landing/campus"
import { Opportunities } from "@/components/landing/opportunities"
import { Stats } from "@/components/landing/stats"
import { Location } from "@/components/landing/location"
import { Partners } from "@/components/landing/partners"
import { Gallery } from "@/components/landing/gallery"
import { News } from "@/components/landing/news"
import { FinalCta } from "@/components/landing/final-cta"
import { Enquire } from "@/components/landing/enquire"

export const Route = createFileRoute("/")({ component: HomePage })

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Why />
      <Infrastructure />
      <Campus />
      <Opportunities />
      <Stats />
      <Location />
      <Partners />
      <Gallery />
      <News />
      <FinalCta />
      <Enquire />
    </main>
  )
}
