import { Link } from "@tanstack/react-router"

import { site } from "@/content/site"
import { landing } from "@/content/landing"
import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={site.logo.src}
              alt=""
              className="h-12 w-auto rounded-md bg-background p-1"
              width={124}
              height={88}
            />
            <span className="font-heading text-xl leading-tight font-semibold">
              {site.name}
            </span>
          </Link>
          <p className="mt-4 text-sm text-forest-foreground/80">
            {site.tagline}. Located at {site.location}.
          </p>
          <div className="mt-4 flex gap-3">
            {site.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                className="text-xs text-forest-foreground/60 hover:text-cta"
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-cta uppercase">
            Navigation
          </p>
          <ul className="mt-3 space-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-forest-foreground/80 hover:text-cta"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-cta uppercase">
            Facilities
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href="/#facilities"
                className="text-sm text-forest-foreground/80 hover:text-cta"
              >
                Cold Storage
              </a>
            </li>
            <li>
              <a
                href="/#facilities"
                className="text-sm text-forest-foreground/80 hover:text-cta"
              >
                IQF & Processing
              </a>
            </li>
            <li>
              <a
                href="/#facilities"
                className="text-sm text-forest-foreground/80 hover:text-cta"
              >
                Warehousing
              </a>
            </li>
            <li>
              <a
                href="/#facilities"
                className="text-sm text-forest-foreground/80 hover:text-cta"
              >
                Quality Labs
              </a>
            </li>
            <li>
              <a
                href="/#facilities"
                className="text-sm text-forest-foreground/80 hover:text-cta"
              >
                Utilities
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-cta uppercase">
            Contact
          </p>
          <div className="mt-3 space-y-3 text-sm text-forest-foreground/80">
            {Object.values(site.addresses).map((address) => (
              <div key={address.label}>
                <p className="text-xs font-medium text-forest-foreground/50">
                  {address.label}
                </p>
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
                  <a href={phone.href} className="hover:text-cta">
                    {phone.label}: {phone.number}
                  </a>
                </p>
              ))}
              {site.emails.map((email) => (
                <p key={email.href}>
                  <a href={email.href} className="hover:text-cta">
                    {email.address}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Separator className="bg-forest-foreground/15" />
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-forest-foreground/75 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          &copy; {new Date().getFullYear()} {site.legalName}. All rights
          reserved.
        </p>
        <p>{landing.infrastructure.mofpi}</p>
      </div>
    </footer>
  )
}
