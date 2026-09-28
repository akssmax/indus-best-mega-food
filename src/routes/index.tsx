import { createFileRoute } from "@tanstack/react-router"

import { getHomePageContent, getSiteContent } from "@/server/content"
import { LandingContentProvider } from "@/lib/landing-content-context"
import { renderHomeSections } from "@/components/landing/home-section-renderer"
import { FullBleedHero, fullBleedHeroLeadImage } from "@/components/landing/full-bleed-hero"
import { galleryPreloadAttrs } from "@/lib/media"
import { faqJsonLd, seoHead } from "@/lib/seo"

export const Route = createFileRoute("/")({
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
    const preload = galleryPreloadAttrs(fullBleedHeroLeadImage)
    const seo = seoHead({
      title: siteContent?.home.title ?? "Indus Best Mega Food Park",
      description:
        siteContent?.home.description ??
        "Developed plots, MSME sheds, and shared food processing at Bemta–Sarora, near Raipur.",
      path: "/",
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
  component: HomePage,
})

function HomePage() {
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
