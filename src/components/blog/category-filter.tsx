import { Link } from "@tanstack/react-router"

import type { Category } from "@/server/schema"
import { cn } from "@/lib/utils"

export function CategoryFilter({
  categories,
  active,
}: {
  categories: Category[]
  active: string | undefined
}) {
  if (categories.length === 0) return null

  const chipClass = (isActive: boolean) =>
    cn(
      "inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors",
      isActive
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border/60 bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
    )

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        to="/blog"
        search={{ category: undefined }}
        activeOptions={{ includeSearch: true, exact: true }}
        className={chipClass(!active)}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          to="/blog"
          search={{ category: category.slug }}
          activeOptions={{ includeSearch: true, exact: true }}
          className={chipClass(active === category.slug)}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
