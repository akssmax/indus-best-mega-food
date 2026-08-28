import { useEffect, useState } from "react"
import { useRouterState } from "@tanstack/react-router"
import { MenuIcon } from "lucide-react"

import { site } from "@/content/site"
import { Button } from "@/components/ui/button"
import { LandingBrand } from "@/components/layout/headers/brand"
import { LandingNavSheet } from "@/components/layout/headers/nav-sheet"
import { cn } from "@/lib/utils"

export function OverlayNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "sticky top-0 z-40 transition-colors duration-200",
        scrolled
          ? "bg-foreground text-background"
          : "bg-background/80 text-foreground backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        <LandingBrand
          stacked
          wordmarkClassName={scrolled ? "text-background" : "text-foreground"}
        />

        <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex h-11 touch-manipulation items-center px-3 text-xs font-medium tracking-[0.18em] uppercase outline-none",
                      "focus-visible:ring-3 focus-visible:ring-ring/50",
                      scrolled
                        ? active
                          ? "text-background"
                          : "text-background/70 hover:text-background"
                        : active
                          ? "text-foreground"
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

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="cta"
            className="hidden h-11 touch-manipulation px-5 text-sm lg:inline-flex"
            asChild
          >
            <a href="/contact">Enquire</a>
          </Button>
          <Button
            variant={scrolled ? "secondary" : "outline"}
            size="icon"
            className="size-11 touch-manipulation lg:hidden"
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
