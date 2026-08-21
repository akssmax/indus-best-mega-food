import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { MenuIcon } from "lucide-react"

import { site } from "@/content/site"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

function BrandMark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <img
        src={site.logo.src}
        alt=""
        className="h-10 w-auto shrink-0"
        width={124}
        height={88}
      />
      <span className="whitespace-nowrap font-heading text-lg font-semibold text-primary sm:text-xl">
        {site.shortName}
      </span>
    </Link>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="hidden border-b border-border/60 bg-forest text-forest-foreground sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          <p>
            {site.phones.map((phone, index) => (
              <span key={phone.href}>
                {index > 0 ? " · " : ""}
                {phone.label}:{" "}
                <a
                  className="underline-offset-2 hover:underline"
                  href={phone.href}
                >
                  {phone.number}
                </a>
              </span>
            ))}
          </p>
          <a
            className="underline-offset-2 hover:underline"
            href={site.emails[0].href}
          >
            {site.emails[0].address}
          </a>
        </div>
      </div>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <BrandMark />
        <NavigationMenu viewport={false} className="hidden lg:flex">
          <NavigationMenuList className="gap-0.5">
            {site.nav.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  href={item.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent px-3 text-sm"
                  )}
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <Button variant="cta" size="sm" className="hidden sm:inline-flex" asChild>
            <a href="/#contact">Enquire Now</a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-left font-heading text-primary">
                  {site.shortName}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {site.nav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="rounded-lg px-2 py-2.5 text-sm font-medium hover:bg-muted"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="px-4 pt-4">
                <Button variant="cta" className="w-full" asChild>
                  <a href="/#contact" onClick={() => setOpen(false)}>
                    Enquire Now
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
