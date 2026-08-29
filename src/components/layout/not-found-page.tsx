import { useEffect } from "react"
import { Link } from "@tanstack/react-router"
import { ArrowRightIcon } from "lucide-react"

import { site } from "@/content/site"
import { Button } from "@/components/ui/button"
import { Eyebrow, Section } from "@/components/landing/section"
import { DropFlourish, PatternBand } from "@/components/ui/brand-pattern"
import { contentContainerClass, contentGutterClass } from "@/lib/layout"
import { cn } from "@/lib/utils"

const linkClass = cn(
  "group flex items-center justify-between gap-3 rounded-2xl bg-background px-4 py-4",
  "ring-1 ring-foreground/8 transition-colors hover:bg-muted/40",
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
)

function QuickLink({ label, href }: { label: string; href: string }) {
  const content = (
    <>
      <span className="font-heading text-sm font-semibold sm:text-base">
        {label}
      </span>
      <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
    </>
  )

  if (href.includes("#")) {
    return (
      <a href={href} className={linkClass}>
        {content}
      </a>
    )
  }

  return (
    <Link to={href} className={linkClass}>
      {content}
    </Link>
  )
}

const quickLinks = [
  { label: "Home", href: "/" },
  ...site.nav,
  ...site.explore.filter(
    (item) => !site.nav.some((navItem) => navItem.href === item.href)
  ),
]

export function NotFoundPage() {
  useEffect(() => {
    document.title = `Page not found | ${site.name}`
  }, [])

  return (
    <main>
      <section
        className={cn(
          "relative -mt-14 overflow-hidden bg-forest pt-28 text-forest-foreground sm:-mt-16 sm:pt-[7.5rem] lg:pt-36",
          contentGutterClass
        )}
      >
        <PatternBand
          variant="flow"
          className="pointer-events-none absolute inset-0 text-forest-foreground/15"
          patternClassName="opacity-[0.07]"
        />
        <div
          className={cn(
            contentContainerClass,
            "relative z-10 pb-16 sm:pb-20 lg:pb-24"
          )}
        >
          <Link
            to="/"
            className="inline-flex rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-forest-foreground/30"
          >
            <img
              src={site.logo.src}
              alt={site.logo.alt}
              className="h-10 w-auto sm:h-11"
              width={124}
              height={88}
            />
          </Link>

          <div className="mt-10 max-w-xl">
            <Eyebrow className="text-cta">404 · Not found</Eyebrow>
            <h1 className="mt-4 text-4xl leading-[1.08] font-semibold sm:text-5xl">
              This address is not on the campus map.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-forest-foreground/85 sm:text-lg">
              The page may have moved, or the link could be out of date. Head
              back to the park, or pick a section below.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button variant="cta" className="h-11 px-5" asChild>
                <Link to="/">Back to homepage</Link>
              </Button>
              <Button
                variant="outline"
                className="h-11 border-forest-foreground/25 bg-transparent px-5 text-forest-foreground hover:bg-forest-foreground/10 hover:text-forest-foreground"
                asChild
              >
                <Link to="/contact">Talk to the team</Link>
              </Button>
            </div>
          </div>

          <DropFlourish className="pointer-events-none absolute top-24 right-0 hidden text-forest-foreground/20 lg:block" />
        </div>
      </section>

      <Section className="bg-card">
        <div className="flex items-center gap-3">
          <DropFlourish className="hidden text-primary/35 sm:block" />
          <Eyebrow>Keep browsing</Eyebrow>
        </div>
        <h2 className="mt-3 text-2xl sm:text-3xl">Try one of these pages</h2>
        <nav
          aria-label="Suggested pages"
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {quickLinks.map((item) => (
            <QuickLink key={item.href} label={item.label} href={item.href} />
          ))}
        </nav>
      </Section>
    </main>
  )
}
