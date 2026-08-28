import type { ReactNode } from "react"
import { createContext, useContext } from "react"
import { Link } from "@tanstack/react-router"
import { ArrowRightIcon } from "lucide-react"

import { site } from "@/content/site"
import { landing } from "@/content/landing"
import { Eyebrow } from "@/components/landing/section"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BrandPattern, DropFlourish, WaveEdge } from "@/components/ui/brand-pattern"
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
  label: string
  separator: string
  legal: string
  splitBorder: string
  waveEdge: string
}

const footerToneStyles: Record<FooterTone, FooterStyles> = {
  dark: {
    shell: "bg-forest text-forest-foreground",
    nav: "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium touch-target outline-none transition-colors focus-visible:ring-3 focus-visible:ring-forest-foreground/30 text-forest-foreground/80 hover:bg-forest-foreground/10 hover:text-forest-foreground active:bg-forest-foreground/15",
    social:
      "inline-flex size-11 touch-target items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-3 focus-visible:ring-forest-foreground/30 text-forest-foreground/80 hover:bg-forest-foreground/10 hover:text-forest-foreground active:bg-forest-foreground/15",
    body: "text-sm text-forest-foreground/80",
    label: "text-xs font-medium text-forest-foreground/50",
    separator: "bg-forest-foreground/15",
    legal: "text-sm text-forest-foreground/75",
    splitBorder: "border-forest-foreground/15",
    waveEdge: "text-background",
  },
  light: {
    shell: "bg-card text-foreground",
    nav: "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium touch-target outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted/80",
    social:
      "inline-flex size-11 touch-target items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted/80",
    body: "text-sm text-muted-foreground",
    label: "text-xs font-medium text-muted-foreground/80",
    separator: "bg-border",
    legal: "text-sm text-muted-foreground",
    splitBorder: "border-border",
    waveEdge: "text-card",
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
    note: "Four columns. Brand, nav, explore, and full contact. Live site uses the light tone.",
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

const year = new Date().getFullYear()
const allLinks = [...site.nav, ...site.explore]

function BrandMark({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  return (
    <Link to="/" className={cn("flex items-center gap-3", className)}>
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
          "font-heading leading-tight font-semibold",
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
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  const styles = useFooterStyles()

  return (
    <a href={href} className={cn(styles.nav, className)}>
      {children}
    </a>
  )
}

function LinkColumn({
  title,
  items,
}: {
  title: string
  items: readonly { label: string; href: string }[]
}) {
  return (
    <div>
      <Eyebrow className="tracking-[0.18em] text-cta">{title}</Eyebrow>
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

function FooterPatternAccent() {
  const tone = useContext(FooterToneContext)

  return (
    <BrandPattern
      variant="flow"
      className={cn(
        "pointer-events-none absolute inset-auto -bottom-20 -left-12 h-56 w-72 opacity-[0.05] sm:h-72 sm:w-96",
        tone === "dark" ? "text-forest-foreground" : "text-cta"
      )}
    />
  )
}

function LegalBar({ className }: { className?: string }) {
  const styles = useFooterStyles()
  const tone = useContext(FooterToneContext)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <BrandPattern
        variant="hatch"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-[0.04]",
          tone === "dark" ? "text-forest-foreground" : "text-primary"
        )}
      />
      <div
        className={cn(
          "relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8",
          styles.legal
        )}
      >
        <p>
          &copy; {year} {site.legalName}. All rights reserved.
        </p>
        <p>{landing.infrastructure.mofpi}</p>
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
        <FooterPatternAccent />
        <div className="relative z-10">{children}</div>
      </footer>
    </FooterToneContext.Provider>
  )
}

function DirectoryFooter({ tone }: { tone: FooterTone }) {
  const styles = footerToneStyles[tone]

  return (
    <FooterShell variant="directory" tone={tone}>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
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
        <LinkColumn
          title="Navigation"
          items={[
            ...site.nav,
            { label: "Design System", href: "/design-system" },
          ]}
        />
        <LinkColumn title="Explore" items={site.explore} />
        <div>
          <Eyebrow className="tracking-[0.18em] text-cta">Contact</Eyebrow>
          <div className={cn("mt-3 space-y-3", styles.body)}>
            {Object.values(site.addresses).map((address) => (
              <div key={address.label}>
                <p className={styles.label}>{address.label}</p>
                <p className="mt-1 leading-relaxed">
                  {address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
            <div className="pt-2">
              {site.phones.map((phone) => (
                <p key={phone.href}>
                  <FooterLink href={phone.href}>
                    {phone.label}: {phone.number}
                  </FooterLink>
                </p>
              ))}
              {site.emails.map((email) => (
                <p key={email.href}>
                  <FooterLink href={email.href}>{email.address}</FooterLink>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Separator className={styles.separator} />
      <LegalBar />
    </FooterShell>
  )
}

function EditorialFooter({ tone }: { tone: FooterTone }) {
  const styles = footerToneStyles[tone]

  return (
    <FooterShell variant="editorial" tone={tone}>
      <WaveEdge className={cn("-mb-px", styles.waveEdge)} />
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
        <div className={cn("mt-10 space-y-1", styles.body)}>
          <p>{site.addresses.works.lines.join(" · ")}</p>
          <p>
            {site.phones.map((phone, index) => (
              <span key={phone.href}>
                {index > 0 ? " · " : null}
                <FooterLink href={phone.href}>
                  {phone.label} {phone.number}
                </FooterLink>
              </span>
            ))}
          </p>
        </div>
        <Socials className="mt-6 justify-center" />
      </div>
      <Separator className={styles.separator} />
      <LegalBar className="sm:flex-col sm:text-center lg:flex-row lg:text-left" />
    </FooterShell>
  )
}

function SplitFooter({ tone }: { tone: FooterTone }) {
  const styles = footerToneStyles[tone]

  return (
    <FooterShell variant="split" tone={tone}>
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-20 xl:px-8">
        <div>
          <Eyebrow className="text-cta">{site.name}</Eyebrow>
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
        <div className="grid grid-cols-2 gap-8">
          <LinkColumn title="Navigation" items={site.nav} />
          <LinkColumn
            title="Explore"
            items={[
              ...site.explore,
              { label: "Design System", href: "/design-system" },
            ]}
          />
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
      <Separator className={styles.separator} />
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
