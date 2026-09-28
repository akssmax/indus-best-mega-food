import { createFileRoute } from "@tanstack/react-router"
import { desc, eq } from "drizzle-orm"

import { absoluteUrl, marketingPaths } from "@/lib/seo"
import { db } from "@/server/db"
import { posts } from "@/server/schema"

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

type SitemapEntry = { loc: string; lastmod?: string }

async function postEntries(): Promise<SitemapEntry[]> {
  try {
    const rows = await db
      .select({
        slug: posts.slug,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt))

    return rows.map((row) => ({
      loc: absoluteUrl(`/blog/${row.slug}`),
      lastmod: row.updatedAt.toISOString(),
    }))
  } catch {
    return []
  }
}

function renderSitemap(entries: SitemapEntry[]) {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod
        ? `\n    <lastmod>${entry.lastmod}</lastmod>`
        : ""
      return `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>${lastmod}\n  </url>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const pageEntries: SitemapEntry[] = marketingPaths.map((path) => ({
          loc: absoluteUrl(path),
        }))
        const entries = [...pageEntries, ...(await postEntries())]

        return new Response(renderSitemap(entries), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control":
              "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        })
      },
    },
  },
})
