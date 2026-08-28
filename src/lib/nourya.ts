import { createServerFn } from "@tanstack/react-start"

const SHOP_ORIGIN = "https://nourya-in.myshopify.com"
const PRODUCTS_URL = `${SHOP_ORIGIN}/products.json?limit=250`

export const nouryaCategories = [
  "Jaggery",
  "Ghee",
  "Milk",
  "Curd",
  "Paste",
  "Other",
] as const

export type NouryaCategory = (typeof nouryaCategories)[number]

export type NouryaProduct = {
  title: string
  handle: string
  href: string
  image: string | null
  priceLabel: string | null
  category: NouryaCategory
}

type ShopifyVariant = {
  price: string
}

type ShopifyProduct = {
  title: string
  handle: string
  images?: { src: string }[]
  variants?: ShopifyVariant[]
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

export function categoryFrom(title: string, handle: string): NouryaCategory {
  const hay = `${title} ${handle}`.toLowerCase()
  if (hay.includes("jaggery")) return "Jaggery"
  if (hay.includes("ghee")) return "Ghee"
  if (/(puree|paste|tomato)/.test(hay)) return "Paste"
  if (/(curd|lassi|buttermilk)/.test(hay)) return "Curd"
  if (hay.includes("milk")) return "Milk"
  return "Other"
}

export function priceLabelFrom(variants: ShopifyVariant[] | undefined): string | null {
  const amounts = (variants ?? [])
    .map((variant) => Number(variant.price))
    .filter((amount) => Number.isFinite(amount) && amount > 0)

  if (amounts.length === 0) return null

  const min = Math.min(...amounts)
  const max = Math.max(...amounts)
  const formatted = inr.format(min)
  return min !== max ? `From ${formatted}` : formatted
}

function toProduct(raw: ShopifyProduct): NouryaProduct {
  return {
    title: raw.title,
    handle: raw.handle,
    href: `${SHOP_ORIGIN}/products/${raw.handle}`,
    image: raw.images?.[0]?.src ?? null,
    priceLabel: priceLabelFrom(raw.variants),
    category: categoryFrom(raw.title, raw.handle),
  }
}

/** Lines called out on the landing page — one from each core range, with pack shots. */
export const featuredHandles = [
  "tomato-puree",
  "desi-ghee",
  "liquid-jaggery",
  "natural-jaggery-cubes",
] as const

export function pickFeaturedProducts(
  products: readonly NouryaProduct[],
  limit = 4
): NouryaProduct[] {
  const byHandle = new Map(products.map((product) => [product.handle, product]))
  const picked: NouryaProduct[] = []
  const used = new Set<string>()

  for (const handle of featuredHandles) {
    const product = byHandle.get(handle)
    if (!product) continue
    picked.push(product)
    used.add(product.handle)
    if (picked.length >= limit) return picked
  }

  const extras = [
    ...products.filter((product) => product.image && !used.has(product.handle)),
    ...products.filter((product) => !used.has(product.handle)),
  ]

  for (const product of extras) {
    if (used.has(product.handle)) continue
    picked.push(product)
    used.add(product.handle)
    if (picked.length >= limit) break
  }

  return picked
}

/** Snapshot of the live Nourya catalog — used if Shopify is unreachable. */
export const nouryaFallback: NouryaProduct[] = [
  {
    title: "Tomato Puree",
    handle: "tomato-puree",
    href: `${SHOP_ORIGIN}/products/tomato-puree`,
    image:
      "https://cdn.shopify.com/s/files/1/0662/9552/9606/files/1-TomatoPuree-FrontIllustration.jpg?v=1787490287",
    priceLabel: inr.format(35),
    category: "Paste",
  },
  {
    title: "Whipping Cream",
    handle: "whipping-cream",
    href: `${SHOP_ORIGIN}/products/whipping-cream`,
    image: null,
    priceLabel: inr.format(90),
    category: "Other",
  },
  {
    title: "High Protein Milk",
    handle: "high-protein-milk",
    href: `${SHOP_ORIGIN}/products/high-protein-milk`,
    image: null,
    priceLabel: inr.format(200),
    category: "Milk",
  },
  {
    title: "Buttermilk",
    handle: "buttermilk",
    href: `${SHOP_ORIGIN}/products/buttermilk`,
    image: null,
    priceLabel: inr.format(100),
    category: "Curd",
  },
  {
    title: "Sweet Lassi",
    handle: "sweet-lassi",
    href: `${SHOP_ORIGIN}/products/sweet-lassi`,
    image: null,
    priceLabel: null,
    category: "Curd",
  },
  {
    title: "Fresh Paneer",
    handle: "fresh-paneer",
    href: `${SHOP_ORIGIN}/products/fresh-paneer`,
    image: null,
    priceLabel: `From ${inr.format(150)}`,
    category: "Other",
  },
  {
    title: "Sattu Drink",
    handle: "sattu-drink",
    href: `${SHOP_ORIGIN}/products/sattu-drink`,
    image: null,
    priceLabel: inr.format(300),
    category: "Other",
  },
  {
    title: "Liquid Jaggery",
    handle: "liquid-jaggery",
    href: `${SHOP_ORIGIN}/products/liquid-jaggery`,
    image:
      "https://cdn.shopify.com/s/files/1/0662/9552/9606/files/1-LiquidJaggery-FrontIllustration.jpg?v=1787490020",
    priceLabel: `From ${inr.format(129)}`,
    category: "Jaggery",
  },
  {
    title: "Jaggery Powder",
    handle: "jaggery-powder",
    href: `${SHOP_ORIGIN}/products/jaggery-powder`,
    image:
      "https://cdn.shopify.com/s/files/1/0662/9552/9606/files/1-JaggeryPowder-FrontIllustration.jpg?v=1787553839",
    priceLabel: `From ${inr.format(210)}`,
    category: "Jaggery",
  },
  {
    title: "Jaggery Brick",
    handle: "jaggery-brick",
    href: `${SHOP_ORIGIN}/products/jaggery-brick`,
    image:
      "https://cdn.shopify.com/s/files/1/0662/9552/9606/files/2-JaggeryBrick-Front.jpg?v=1787498898",
    priceLabel: inr.format(250),
    category: "Jaggery",
  },
  {
    title: "Flavoured Milk",
    handle: "flavoured-milk",
    href: `${SHOP_ORIGIN}/products/flavoured-milk`,
    image: null,
    priceLabel: null,
    category: "Milk",
  },
  {
    title: "Fresh Cream",
    handle: "fresh-cream",
    href: `${SHOP_ORIGIN}/products/fresh-cream`,
    image: null,
    priceLabel: inr.format(70),
    category: "Other",
  },
  {
    title: "Probiotic Curd",
    handle: "probiotic-curd",
    href: `${SHOP_ORIGIN}/products/probiotic-curd`,
    image: null,
    priceLabel: null,
    category: "Curd",
  },
  {
    title: "UHT Homogenised Standardized Double Toned Milk",
    handle: "uht-homogenised-standardized-double-toned-milk",
    href: `${SHOP_ORIGIN}/products/uht-homogenised-standardized-double-toned-milk`,
    image: null,
    priceLabel: null,
    category: "Milk",
  },
  {
    title: "UHT Homogenised Standardized Toned Milk",
    handle: "uht-homogenised-standardized-toned-milk",
    href: `${SHOP_ORIGIN}/products/uht-homogenised-standardized-toned-milk`,
    image: null,
    priceLabel: null,
    category: "Milk",
  },
  {
    title: "UHT Homogenized Standardized Milk",
    handle: "uht-homogenized-standardized-milk",
    href: `${SHOP_ORIGIN}/products/uht-homogenized-standardized-milk`,
    image: null,
    priceLabel: inr.format(20),
    category: "Milk",
  },
  {
    title: "Cow Ghee",
    handle: "cow-ghee",
    href: `${SHOP_ORIGIN}/products/cow-ghee`,
    image:
      "https://cdn.shopify.com/s/files/1/0662/9552/9606/files/1-CowGhee-FrontIllustration.jpg?v=1787490067",
    priceLabel: `From ${inr.format(550)}`,
    category: "Ghee",
  },
  {
    title: "Desi Ghee",
    handle: "desi-ghee",
    href: `${SHOP_ORIGIN}/products/desi-ghee`,
    image:
      "https://cdn.shopify.com/s/files/1/0662/9552/9606/files/1-DesiGhee-FrontIllustration.jpg?v=1787490119",
    priceLabel: `From ${inr.format(499)}`,
    category: "Ghee",
  },
  {
    title: "Natural Jaggery Cubes",
    handle: "natural-jaggery-cubes",
    href: `${SHOP_ORIGIN}/products/natural-jaggery-cubes`,
    image:
      "https://cdn.shopify.com/s/files/1/0662/9552/9606/files/1-JaggeryCubes-FrontIllustration.jpg?v=1787489400",
    priceLabel: inr.format(100),
    category: "Jaggery",
  },
]

function mapProducts(payload: unknown): NouryaProduct[] | null {
  if (!payload || typeof payload !== "object" || !("products" in payload)) {
    return null
  }

  const products = (payload as { products: unknown }).products
  if (!Array.isArray(products) || products.length === 0) return null

  return products
    .filter(
      (item): item is ShopifyProduct =>
        Boolean(item) &&
        typeof item === "object" &&
        typeof (item as ShopifyProduct).title === "string" &&
        typeof (item as ShopifyProduct).handle === "string"
    )
    .map(toProduct)
}

export const getNouryaProducts = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const response = await fetch(PRODUCTS_URL, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8000),
      })

      if (!response.ok) return nouryaFallback

      const mapped = mapProducts(await response.json())
      return mapped ?? nouryaFallback
    } catch {
      return nouryaFallback
    }
  }
)
