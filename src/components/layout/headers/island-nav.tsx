import { useState } from "react"
import { useRouterState } from "@tanstack/react-router"
import { MenuIcon } from "lucide-react"

import { site } from "@/content/site"
import { Button } from "@/components/ui/button"
import { LandingBrand } from "@/components/layout/headers/brand"
import { LandingNavSheet } from "@/components/layout/headers/nav-sheet"
import { cn } from "@/lib/utils"

export function IslandNav() {
  const [open, setOpen] = useState(false)
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <header className="pointer-events-none sticky top-0 z-40 flex justify-center px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4">
      <div className="pointer-events-auto flex h-14 w-full max-w-4xl items-center gap-2 rounded-full border border-border/60 bg-background/45 px-2 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:h-16 sm:px-3">
        <LandingBrand wordmarkClassName="text-foreground" />

        <nav aria-label="Main" className="hidden flex-1 justify-center md:flex">
          <ul className="flex items-center gap-0.5">
            {site.nav.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex h-11 touch-manipulation items-center rounded-full px-3 text-sm font-medium outline-none",
                      "focus-visible:ring-3 focus-visible:ring-ring/50",
                      active
                        ? "bg-foreground/10 text-foreground"
                        : "text-muted-foreground hover:bg-foreground/8 hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <Button
            variant="cta"
            className="hidden h-11 touch-manipulation rounded-full px-5 text-sm md:inline-flex"
            asChild
          >
            <a href="/contact">Enquire</a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-11 touch-manipulation rounded-full md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </Button>
        </div>
      </div>
      <LandingNavSheet open={open} onOpenChange={setOpen} pathname={pathname} />
    </header>
  )
}
