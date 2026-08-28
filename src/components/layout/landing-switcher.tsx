import { Link, useRouterState } from "@tanstack/react-router"

import { landingSkins, showLandingSwitcher } from "@/lib/skins"
import { cn } from "@/lib/utils"

const options = [
  { href: "/", label: "Live" },
  ...landingSkins.map((skin) => ({ href: skin.href, label: skin.label })),
] as const

export function LandingSwitcher() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  if (!showLandingSwitcher(pathname)) return null

  return (
    <nav
      aria-label="Landing variations"
      className="pointer-events-none fixed inset-x-0 z-[60] flex justify-end px-3 bottom-[max(5.25rem,calc(env(safe-area-inset-bottom)+4.25rem))] lg:bottom-6 lg:px-5"
    >
      <ul className="pointer-events-auto flex touch-manipulation items-center gap-0.5 rounded-full border border-border bg-background/90 p-1 shadow-[0_8px_28px_rgba(0,0,0,0.12)] backdrop-blur-md">
        {options.map((option) => {
          const active = pathname === option.href
          return (
            <li key={option.href}>
              <Link
                to={option.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 min-w-11 items-center justify-center rounded-full px-3 text-xs font-medium transition-colors outline-none",
                  "focus-visible:ring-3 focus-visible:ring-ring/50",
                  active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {option.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
