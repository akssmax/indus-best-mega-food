import { createFileRoute } from "@tanstack/react-router"

import { getHomePageContent, getSiteContent } from "@/server/content"
import { LandingContentProvider } from "@/lib/landing-content-context"
import { renderHomeSections } from "@/components/landing/home-section-renderer"
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
        { rel: "preconnect", href: "https://cdn.shopify.com" },
        { rel: "dns-prefetch", href: "https://maps.google.com" },
        {
          rel: "preload",
          href:
            landingContent?.hero.slides[0]?.image.src ??
            landingContent?.hero.image.src ??
            "/images/gallery/campus-overview.webp",
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
      <main>{renderHomeSections(homeContent.sections)}</main>
    </LandingContentProvider>
  )
}
