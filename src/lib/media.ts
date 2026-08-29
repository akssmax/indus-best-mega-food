/** Responsive sizes for landing photos so the browser can pick a smaller decode. */
export const landingImageSizes = {
  hero: "(min-width: 1024px) 72rem, 100vw",
  card: "(min-width: 1024px) 28rem, (min-width: 640px) 50vw, 100vw",
  product: "(min-width: 1024px) 16rem, 50vw",
  logo: "12rem",
} as const

/** Ask Shopify's CDN for a width-capped file. Local /images paths are unchanged. */
export function sizedImageUrl(src: string, width: number) {
  if (!src.includes("cdn.shopify.com")) return src

  try {
    const url = new URL(src.startsWith("//") ? `https:${src}` : src)
    url.searchParams.set("width", String(width))
    return url.toString()
  } catch {
    return src
  }
}
