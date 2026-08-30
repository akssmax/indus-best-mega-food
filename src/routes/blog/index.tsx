import { createFileRoute } from "@tanstack/react-router"

import { CategoryFilter } from "@/components/blog/category-filter"
import { PostCard } from "@/components/blog/post-card"
import { PageHero } from "@/components/layout/page-hero"
import { Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { site } from "@/content/site"
import { absoluteUrl, seoHead } from "@/lib/seo"
import { listCategories, listPublishedPosts } from "@/server/posts"

const description =
  "Updates from the Indus Best Mega Food Park campus — facilities, food processing, and what we're building in Raipur, Chhattisgarh."

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>) => ({
    category:
      typeof search.category === "string" && search.category
        ? search.category
        : undefined,
  }),
  loaderDeps: ({ search }) => ({ category: search.category }),
  loader: async ({ deps }) => {
    const [posts, categories] = await Promise.all([
      listPublishedPosts({ data: { category: deps.category } }),
      listCategories(),
    ])
    return { posts, categories }
  },
  head: ({ loaderData }) => {
    const seo = seoHead({
      title: `Blog | ${site.name}`,
      description,
      path: "/blog",
    })
    return {
      meta: [
        ...seo.meta,
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${site.name} Blog`,
            description,
            url: absoluteUrl("/blog"),
            blogPost: (loaderData?.posts ?? []).map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: absoluteUrl(`/blog/${post.slug}`),
              datePublished: post.publishedAt ?? undefined,
            })),
          },
        } as never,
      ],
      links: seo.links,
    }
  },
  component: BlogIndexPage,
})

function BlogIndexPage() {
  const { posts, categories } = Route.useLoaderData()
  const { category } = Route.useSearch()
  const featured = posts.at(0)
  const rest = posts.slice(1)

  return (
    <main>
      <PageHero eyebrow="Blog" title="News & updates" body={description} />

      <Section className="pt-12 lg:pt-16">
        <div className="space-y-8">
          <Reveal>
            <CategoryFilter categories={categories} active={category} />
          </Reveal>

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
              <p className="font-heading text-lg font-medium">
                No posts here yet
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {category
                  ? "Try a different category, or check back soon."
                  : "We're working on our first update — check back soon."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {featured && !category ? (
                <Reveal>
                  <PostCard post={featured} featured />
                </Reveal>
              ) : null}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(category ? posts : rest).map((post, index) => (
                  <Reveal key={post.id} delay={Math.min(index * 0.05, 0.3)}>
                    <PostCard post={post} className="h-full" />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
    </main>
  )
}
