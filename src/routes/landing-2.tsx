import { createFileRoute } from "@tanstack/react-router"

import { getHomePageContent, getSiteContent } from "@/server/content"
import { LandingContentProvider } from "@/lib/landing-content-context"
import { renderHomeSections } from "@/components/landing/home-section-renderer"
import { FullBleedHero } from "@/components/landing/full-bleed-hero"
import { galleryPreloadAttrs } from "@/lib/media"
import { faqJsonLd, seoHead } from "@/lib/seo"

export const Route = createFileRoute("/landing-2")({
  loader: async () => {
    const [siteContent, homeContent] = await Promise.all([
      getSiteContent(),
      getHomePageContent(),
    ])
    return { siteContent, homeContent }
  },
  head: ({ loaderData }) => {
    const siteContent = loaderData?.siteContent
    const landingContent = loaderData?.homeContent?.landing
    const heroSrc =
      landingContent?.hero.slides[0]?.image.src ??
      landingContent?.hero.image.src ??
      "/images/gallery/campus-overview.webp"
    const preload = galleryPreloadAttrs(heroSrc)
    const seo = seoHead({
      title: siteContent?.home.title ?? "Indus Best Mega Food Park",
      description:
        siteContent?.home.description ??
        "Developed plots, MSME sheds, and shared food processing at Bemta–Sarora, near Raipur.",
      path: "/landing-2",
      noindex: true,
    })
    return {
      meta: [
        ...seo.meta,
        ...(landingContent ? faqJsonLd(landingContent.faq.items) : []),
      ],
      links: [
        ...seo.links,
        {
          rel: "preload",
          href: preload.href,
          as: "image",
          fetchPriority: "high",
        },
      ],
    }
  },
  component: Landing2Page,
})

function Landing2Page() {
  const { homeContent } = Route.useLoaderData()

  return (
    <LandingContentProvider value={homeContent.landing}>
      <main>
        {renderHomeSections(homeContent.sections, {
          hero: () => <FullBleedHero />,
        })}
      </main>
    </LandingContentProvider>
  )
}
