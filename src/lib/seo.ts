import { site } from "@/content/site"

export const OG_IMAGE_PATH = "/images/og.png"
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const THEME_COLOR = "#1c3328"

export const marketingPaths = [
  "/",
  "/about",
  "/facilities",
  "/investors",
  "/contact",
  "/why",
  "/campus",
  "/virtual-tour",
  "/opportunities",
  "/private-label",
  "/products",
  "/careers",
  "/blog",
] as const

export function absoluteUrl(path = "/") {
  const origin = site.url.replace(/\/$/, "")
  if (path === "/" || path === "") return `${origin}/`
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`
}

type SeoHeadOptions = {
  title: string
  description: string
  path: string
  noindex?: boolean
}

export function seoHead({ title, description, path, noindex }: SeoHeadOptions) {
  const url = absoluteUrl(path)
  const image = absoluteUrl(OG_IMAGE_PATH)
  const imageAlt = `${site.name} — ${site.location}`

  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: image },
      { property: "og:image:width", content: String(OG_IMAGE_WIDTH) },
      { property: "og:image:height", content: String(OG_IMAGE_HEIGHT) },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: noindex ? [] : [{ rel: "canonical", href: url }],
  }
}

function ldJson(data: Record<string, unknown>) {
  return { "script:ld+json": data } as never
}

export function organizationJsonLd() {
  const works = site.addresses.works.lines
  return ldJson({
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl(site.logo.src),
    image: absoluteUrl(OG_IMAGE_PATH),
    description: site.home.description,
    telephone: site.phones[0].number,
    email: site.emails[0].address,
    address: {
      "@type": "PostalAddress",
      streetAddress: works.slice(0, 2).join(", "),
      addressLocality: "Raipur",
      addressRegion: "Chhattisgarh",
      postalCode: site.pincode,
      addressCountry: "IN",
    },
    sameAs: site.socials.map((social) => social.href),
  })
}

export function faqJsonLd(
  items: ReadonlyArray<{ question: string; answer: string }>,
) {
  return ldJson({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  })
}
