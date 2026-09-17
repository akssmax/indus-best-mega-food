/** Responsive sizes for landing photos so the browser can pick a smaller decode. */
export const landingImageSizes = {
  hero: "(min-width: 1024px) 72rem, 100vw",
  card: "(min-width: 1024px) 28rem, (min-width: 640px) 50vw, 100vw",
  split: "(min-width: 1024px) 36rem, 100vw",
  product: "(min-width: 1024px) 16rem, 50vw",
  logo: "12rem",
  thumb: "4.5rem",
} as const

const GALLERY_PREFIX = "/images/gallery/"
const GALLERY_VARIANT = /-(800|1600)$/

/** 1600px default so mobile never downloads the 2560 master unless srcset picks it. */
export function gallerySrcAttrs(src: string): { src: string; srcSet?: string } {
  if (!src.startsWith(GALLERY_PREFIX) || !src.endsWith(".webp")) {
    return { src }
  }

  const stem = src.slice(0, -".webp".length)
  if (GALLERY_VARIANT.test(stem)) return { src }

  return {
    src: `${stem}-1600.webp`,
    srcSet: `${stem}-800.webp 800w, ${stem}-1600.webp 1600w, ${src} 2560w`,
  }
}

export function galleryPreloadSrc(src: string) {
  return gallerySrcAttrs(src).src
}

export function galleryPreloadAttrs(src: string) {
  const attrs = gallerySrcAttrs(src)
  return {
    href: attrs.src,
    imageSrcSet: attrs.srcSet,
    imageSizes: landingImageSizes.hero,
  }
}

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
