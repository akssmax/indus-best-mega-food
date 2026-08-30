import { Link } from "@tanstack/react-router"
import { ArrowRightIcon } from "lucide-react"

import type { PostListItem } from "@/server/posts"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

function formatDate(iso: string | null) {
  if (!iso) return null
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso))
}

export function PostCard({
  post,
  featured = false,
  className,
}: {
  post: PostListItem
  featured?: boolean
  className?: string
}) {
  const date = formatDate(post.publishedAt)

  return (
    <article
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-1 hover:ring-primary/20",
        className,
      )}
    >
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        {post.featuredImage ? (
          <div className="relative overflow-hidden">
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              loading={featured ? "eager" : "lazy"}
              className={cn(
                "w-full object-cover transition-transform duration-500 motion-safe:group-hover/card:scale-[1.03]",
                featured ? "aspect-[2/1]" : "aspect-[16/9]",
              )}
            />
          </div>
        ) : null}

        <div className={cn("flex flex-1 flex-col", featured ? "p-6 lg:p-8" : "p-5")}>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {post.category ? (
              <Badge variant="secondary">{post.category.name}</Badge>
            ) : null}
            {date ? <span>{date}</span> : null}
          </div>

          <h3
            className={cn(
              "mt-3 font-heading font-semibold leading-snug tracking-tight",
              featured ? "text-2xl lg:text-3xl" : "text-lg",
            )}
          >
            {post.title}
          </h3>

          {post.excerpt ? (
            <p
              className={cn(
                "mt-2 text-sm leading-relaxed text-muted-foreground",
                featured ? "line-clamp-3" : "line-clamp-2",
              )}
            >
              {post.excerpt}
            </p>
          ) : null}

          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
            {post.author ? (
              <span className="text-xs font-medium text-muted-foreground">
                {post.author.name}
              </span>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover/card:underline">
              Read
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover/card:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
