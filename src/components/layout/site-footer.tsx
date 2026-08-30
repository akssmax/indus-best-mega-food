"use client"

import type { ReactNode } from "react"
import { createContext, useContext } from "react"
import { Link } from "@tanstack/react-router"
import { ArrowRightIcon } from "lucide-react"

import { site } from "@/content/site"
import { landing } from "@/content/landing"
import { ColorModeToggle } from "@/components/theme/color-mode-toggle"
import { Eyebrow } from "@/components/landing/section"
import { Button } from "@/components/ui/button"
import { BrandPattern, DropFlourish } from "@/components/ui/brand-pattern"
import { cn } from "@/lib/utils"

export const footerVariants = ["directory", "editorial", "split"] as const

export type FooterVariant = (typeof footerVariants)[number]

export const footerTones = ["dark", "light"] as const

export type FooterTone = (typeof footerTones)[number]

type FooterStyles = {
  shell: string
  nav: string
  social: string
  body: string
  eyebrow: string
  label: string
  separator: string
  legal: string
  splitBorder: string
}

const footerToneStyles: Record<FooterTone, FooterStyles> = {
  dark: {
    shell: "bg-forest text-forest-foreground",
    nav: "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium touch-target outline-none transition-colors focus-visible:ring-3 focus-visible:ring-forest-foreground/30 text-forest-foreground/80 hover:bg-forest-foreground/10 hover:text-forest-foreground active:bg-forest-foreground/15",
    social:
      "inline-flex size-11 touch-target items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-3 focus-visible:ring-forest-foreground/30 text-forest-foreground/80 hover:bg-forest-foreground/10 hover:text-forest-foreground active:bg-forest-foreground/15",
    body: "text-sm text-forest-foreground/80",
    eyebrow: "tracking-[0.18em] text-cta",
    label: "text-xs font-medium text-forest-foreground/80",
    separator: "bg-forest-foreground/15",
    legal: "text-sm text-forest-foreground/75",
    splitBorder: "border-forest-foreground/15",
  },
  light: {
    shell: "bg-card text-foreground dark:bg-background",
    nav: "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium touch-target outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted/80",
    social:
      "inline-flex size-11 touch-target items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted/80",
    body: "text-sm text-muted-foreground",
    eyebrow: "tracking-[0.18em] text-primary",
    label: "text-xs font-medium text-muted-foreground",
    separator: "bg-border",
    legal: "text-sm text-muted-foreground",
    splitBorder: "border-border",
  },
}

const FooterToneContext = createContext<FooterTone>("dark")

function useFooterStyles() {
  return footerToneStyles[useContext(FooterToneContext)]
}

export const footerVariantMeta: Record<
  FooterVariant,
  { name: string; note: string }
> = {
  directory: {
    name: "Directory",
    note: "Four columns. Brand, nav, explore, and full contact. Card in light mode; matches scrolled header (background) in dark mode.",
  },
  editorial: {
    name: "Editorial",
    note: "Centered wordmark, a single link row, and a compact contact strip. Magazine-site layout.",
  },
  split: {
    name: "Split",
    note: "Large type and a CTA on the left, links on the right, offices in a bottom rail.",
  },
}

const blogLink = { label: "Blog", href: "/blog" }
const allLinks = [...site.nav, blogLink, ...site.explore]

function BrandMark({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  return (
    <Link to="/" className={cn("flex min-w-0 items-center gap-3", className)}>
      <img
        src={site.logo.src}
        alt=""
        className={cn(
          "w-auto rounded-md bg-background p-1",
          size === "sm" && "h-9",
          size === "md" && "h-12",
          size === "lg" && "h-14"
        )}
        width={124}
        height={88}
      />
      <span
        className={cn(
          "min-w-0 font-heading leading-tight font-semibold",
          size === "sm" && "text-base",
          size === "md" && "text-xl",
          size === "lg" && "text-2xl"
        )}
      >
        {site.name}
      </span>
    </Link>
  )
}

function FooterLink({
  href,
  children,
  className,
  wrap,
}: {
  href: string
  children: ReactNode
  className?: string
  /** Allow long mailto/tel strings to wrap instead of overflowing. */
  wrap?: boolean
}) {
  const styles = useFooterStyles()

  return (
    <a
      href={href}
      className={cn(
        styles.nav,
        wrap &&
          "inline-block max-w-full whitespace-normal break-all [overflow-wrap:anywhere] sm:break-words",
        className
      )}
    >
      {children}
    </a>
  )
}

function FooterEyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const styles = useFooterStyles()
  return <Eyebrow className={cn(styles.eyebrow, className)}>{children}</Eyebrow>
}

function LinkColumn({
  title,
  items,
}: {
  title: string
  items: readonly { label: string; href: string }[]
}) {
  return (
    <div className="min-w-0">
      <FooterEyebrow>{title}</FooterEyebrow>
      <ul className="mt-3 space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <FooterLink href={item.href}>{item.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LegalBar({ className }: { className?: string }) {
  const styles = useFooterStyles()
  const tone = useContext(FooterToneContext)

  return (
    <div className={cn("relative overflow-hidden border-t border-border", className)}>
      <BrandPattern
        variant="hatch"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-[0.04]",
          tone === "dark" ? "text-forest-foreground" : "text-primary"
        )}
      />
      <div
        className={cn(
          "relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-4 px-4 py-6 sm:grid-cols-[1fr_auto_1fr] sm:px-6 lg:px-8",
          styles.legal
        )}
      >
        <p>
          &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
        <div className="justify-self-center">
          <ColorModeToggle
            compact
            showLabel={false}
            surface={tone === "dark" ? "forest" : "default"}
          />
        </div>
        <p className="max-w-full break-words sm:justify-self-end sm:text-right">
          {landing.infrastructure.mofpi}
        </p>
      </div>
    </div>
  )
}

function SocialIcon({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  if (label === "Facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className={className}
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  }

  if (label === "LinkedIn") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className={className}
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.065 2.065 0 1 1 0-4.13 2.065 2.065 0 0 1 0 4.13zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  }

  return null
}

function Socials({ className }: { className?: string }) {
  const styles = useFooterStyles()

  return (
    <div className={cn("flex gap-1", className)}>
      {site.socials.map((social) => (
        <a
          key={social.href}
          href={social.href}
          className={styles.social}
          target="_blank"
          rel="noreferrer"
          aria-label={social.label}
        >
          <SocialIcon label={social.label} className="size-4" />
        </a>
      ))}
    </div>
  )
}

function FooterShell({
  variant,
  tone,
  children,
}: {
  variant: FooterVariant
  tone: FooterTone
  children: ReactNode
}) {
  const styles = footerToneStyles[tone]

  return (
    <FooterToneContext.Provider value={tone}>
      <footer
        className={cn(styles.shell, "relative z-0 overflow-hidden")}
        data-footer-variant={variant}
        data-footer-tone={tone}
        aria-label={`${footerVariantMeta[variant].name} footer`}
      >
        <div className="relative z-10">{children}</div>
      </footer>
    </FooterToneContext.Provider>
  )
}

function DirectoryFooter({ tone }: { tone: FooterTone }) {
  const styles = footerToneStyles[tone]

  return (
    <FooterShell variant="directory" tone={tone}>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 xl:grid-cols-4 xl:px-8">
        <div className="min-w-0 sm:col-span-2 xl:col-span-1">
          <DropFlourish
            className={cn(
              "mb-4",
              tone === "dark"
                ? "text-forest-foreground/25"
                : "text-primary/30"
            )}
          />
          <BrandMark />
          <p className={cn("mt-4", styles.body)}>
            {site.tagline} Located at {site.location}.
          </p>
          <Socials className="mt-4" />
        </div>
        <LinkColumn title="Navigation" items={[...site.nav, blogLink]} />
        <LinkColumn title="Explore" items={site.explore} />
        <div className="min-w-0 sm:col-span-2 xl:col-span-1">
          <FooterEyebrow>Contact</FooterEyebrow>
          <div className={cn("mt-3 space-y-3", styles.body)}>
            {Object.values(site.addresses).map((address) => (
              <div key={address.label}>
                <p className={styles.label}>{address.label}</p>
                <p className="mt-1 leading-relaxed break-words">
                  {address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LegalBar />
    </FooterShell>
  )
}

function EditorialFooter({ tone }: { tone: FooterTone }) {
  const styles = footerToneStyles[tone]

  return (
    <FooterShell variant="editorial" tone={tone}>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:py-20">
        <BrandMark size="lg" className="justify-center" />
        <p className={cn("mt-5 max-w-md leading-relaxed sm:text-base", styles.body)}>
          {site.tagline} {site.location}.
        </p>
        <nav aria-label="Footer" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {allLinks.map((item) => (
            <FooterLink key={item.href} href={item.href} className="text-[15px]">
              {item.label}
            </FooterLink>
          ))}
        </nav>
        <Button variant="cta" className="mt-8 h-11 px-6" asChild>
          <a href="/contact">
            Enquire now
            <ArrowRightIcon />
          </a>
        </Button>
        <div className={cn("mt-10", styles.body)}>
          <p>{site.addresses.works.lines.join(" · ")}</p>
        </div>
        <Socials className="mt-6 justify-center" />
      </div>
      <LegalBar className="sm:flex-col sm:text-center lg:flex-row lg:text-left" />
    </FooterShell>
  )
}

function SplitFooter({ tone }: { tone: FooterTone }) {
  const styles = footerToneStyles[tone]

  return (
    <FooterShell variant="split" tone={tone}>
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:items-end lg:py-20 xl:px-8">
        <div className="min-w-0">
          <FooterEyebrow>{site.name}</FooterEyebrow>
          <p className="mt-4 max-w-lg font-heading text-4xl leading-[1.1] font-semibold sm:text-5xl">
            A ready campus for food processing.
          </p>
          <p className={cn("mt-4 max-w-md leading-relaxed", styles.body)}>
            {site.location}. Plots, sheds, and shared lines — allocated on
            enquiry.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="cta" className="h-11 px-5" asChild>
              <a href="/contact">Talk to the project team</a>
            </Button>
            <Socials />
          </div>
        </div>
        <div className="min-w-0 grid grid-cols-2 gap-8">
          <LinkColumn title="Navigation" items={[...site.nav, blogLink]} />
          <LinkColumn title="Explore" items={site.explore} />
        </div>
      </div>
      <div className={cn("border-t", styles.splitBorder)}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {Object.values(site.addresses).map((address) => (
            <div key={address.label}>
              <p className={cn("tracking-[0.14em] uppercase", styles.label)}>
                {address.label}
              </p>
              <p className={cn("mt-2 leading-relaxed", styles.body)}>
                {address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
      <LegalBar />
    </FooterShell>
  )
}

export function SiteFooter({
  variant = "directory",
  tone = "dark",
}: {
  variant?: FooterVariant
  tone?: FooterTone
}) {
  if (variant === "editorial") return <EditorialFooter tone={tone} />
  if (variant === "split") return <SplitFooter tone={tone} />
  return <DirectoryFooter tone={tone} />
}
