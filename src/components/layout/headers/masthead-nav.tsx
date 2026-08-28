import { useRouterState } from "@tanstack/react-router"

import { site } from "@/content/site"
import { landings } from "@/content/landings"
import { LandingBrand } from "@/components/layout/headers/brand"
import { cn } from "@/lib/utils"

export function MastheadNav() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const { dateline } = landings.broadsheet.hero

  return (
    <header className="border-b border-foreground/20 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 py-4 sm:py-5">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {dateline}
            </p>
            <LandingBrand
              stacked
              className="mt-2"
              wordmarkClassName="font-heading text-lg leading-tight sm:text-xl"
            />
          </div>
          <a
            href="/contact"
            className="hidden h-11 min-w-11 touch-manipulation items-center justify-center border border-cta bg-cta px-4 text-sm font-medium text-cta-foreground sm:inline-flex"
          >
            Enquire
          </a>
        </div>
        <nav
          aria-label="Main"
          className="hidden border-t border-foreground/15 lg:block"
        >
          <ul className="flex flex-wrap">
            {site.nav.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex h-12 touch-manipulation items-center px-4 text-sm outline-none",
                      "focus-visible:ring-3 focus-visible:ring-ring/50",
                      active
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
