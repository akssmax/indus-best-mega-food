import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import { ArrowLeftIcon } from "lucide-react"

import { PostBody } from "@/components/blog/post-body"
import { Eyebrow, Section } from "@/components/landing/section"
import { Badge } from "@/components/ui/badge"
import { site } from "@/content/site"
import { contentGutterClass } from "@/lib/layout"
import { absoluteUrl, seoHead } from "@/lib/seo"
import { cn } from "@/lib/utils"
import { getPostBySlug } from "@/server/posts"

function formatDate(iso: string | Date | null) {
  if (!iso) return null
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso))
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPostBySlug({ data: { slug: params.slug } })
    if (!post) throw notFound()
    return post
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const title = loaderData.seoTitle || `${loaderData.title} | ${site.name}`
    const description =
      loaderData.seoDescription || loaderData.excerpt || site.home.description
    const seo = seoHead({
      title,
      description,
      path: `/blog/${loaderData.slug}`,
    })
    const ogImage = loaderData.featuredImage?.url
    return {
      meta: [
        ...seo.meta.map((tag) =>
          ogImage && "property" in tag && tag.property === "og:image"
            ? { ...tag, content: ogImage }
            : tag,
        ),
        { property: "og:type", content: "article" },
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.title,
            description,
            url: absoluteUrl(`/blog/${loaderData.slug}`),
            datePublished: loaderData.publishedAt ?? undefined,
            dateModified: loaderData.updatedAt,
            image: ogImage ?? absoluteUrl("/images/og.png"),
            author: loaderData.author
              ? { "@type": "Person", name: loaderData.author.name }
              : { "@type": "Organization", name: site.name },
            publisher: {
              "@type": "Organization",
              name: site.name,
              logo: {
                "@type": "ImageObject",
                url: absoluteUrl(site.logo.src),
              },
            },
          },
        } as never,
      ],
      links: seo.links,
    }
  },
  component: BlogPostPage,
})

function BlogPostPage() {
  const post = Route.useLoaderData()
  const date = formatDate(post.publishedAt)

  return (
    <main>
      <section
        className={cn(
          "relative z-10 -mt-14 bg-forest pt-28 text-forest-foreground sm:-mt-16 sm:pt-[7.5rem] lg:pt-36",
          contentGutterClass,
        )}
      >
        <div
          className={cn(
            "relative z-10 mx-auto max-w-3xl",
            post.featuredImage ? "pb-8 lg:pb-10" : "pb-14 lg:pb-20",
          )}
        >
          <Link
            to="/blog"
            search={{ category: undefined }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-foreground/70 transition-colors hover:text-forest-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            All posts
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {post.category ? (
              <Badge
                variant="secondary"
                className="bg-forest-foreground/10 text-forest-foreground"
              >
                {post.category.name}
              </Badge>
            ) : null}
            {date ? (
              <span className="text-sm text-forest-foreground/70">{date}</span>
            ) : null}
          </div>
          <h1 className="mt-4 font-heading text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>
          {post.author ? (
            <p className="mt-5 text-sm text-forest-foreground/80">
              By <span className="font-medium">{post.author.name}</span>
              {post.author.role ? ` · ${post.author.role}` : ""}
            </p>
          ) : null}
        </div>
      </section>

      {post.featuredImage ? (
        <div className={contentGutterClass}>
          <figure className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border/60 bg-muted/30 p-2 shadow-md sm:p-3">
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              className="block h-auto w-full rounded-xl"
            />
          </figure>
        </div>
      ) : null}

      <Section
        className={
          post.featuredImage
            ? "pt-8 pb-16 lg:pt-10 lg:pb-24"
            : "pt-12 pb-16 lg:pt-16 lg:pb-24"
        }
        innerClassName="max-w-3xl"
      >
        <Eyebrow className="sr-only">Article</Eyebrow>
        <PostBody html={post.contentHtml} />
      </Section>
    </main>
  )
}
