import { createFileRoute } from "@tanstack/react-router"

import { Hero } from "@/components/landing/hero"
import { HeroBgControls } from "@/components/design-system/hero-bg-controls"
import { landing } from "@/content/landing"
import { seoHead } from "@/lib/seo"

const lcpHeroImage = landing.hero.slides[0]?.image.src ?? landing.hero.image.src

export const Route = createFileRoute("/hero-1")({
  head: () => {
    const seo = seoHead({
      title: "Hero BG tuner",
      description: "Internal hero background tuner.",
      path: "/hero-1",
      noindex: true,
    })
    return {
      ...seo,
      links: [
        ...seo.links,
        {
          rel: "preload",
          href: lcpHeroImage,
          as: "image",
          fetchPriority: "high",
        },
      ],
    }
  },
  component: HeroTunerPage,
})

function HeroTunerPage() {
  return (
    <div className="flex min-h-svh bg-background">
      <HeroBgControls
        className="sticky top-0 z-20 h-svh w-[min(100vw,22rem)] shrink-0 border-r shadow-lg"
        description="Drop morph is parked. Preview is the live campus hero — default particle field, no hover."
      />
      <main className="min-w-0 flex-1">
        <Hero />
      </main>
    </div>
  )
}
