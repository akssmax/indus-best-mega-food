import {
  Building2Icon,
  ChartNoAxesCombinedIcon,
  HandshakeIcon,
  PackageIcon,
  SproutIcon,
  WarehouseIcon,
} from "lucide-react"

import { landing } from "@/content/landing"
import { landings } from "@/content/landings"
import { site } from "@/content/site"
import { pickFeaturedProducts, type NouryaProduct } from "@/lib/nourya"
import { IslandNav } from "@/components/layout/headers/island-nav"
import { SiteFooter } from "@/components/layout/site-footer"
import { SkinFrame } from "@/components/landings/skin-frame"
import { MintHeroGradient } from "@/components/landings/mint/hero-gradient"
import { LandingEnquireForm } from "@/components/landings/enquire-form"
import { LogoStrip } from "@/components/landing/logo-strip"
import { Button } from "@/components/ui/button"
import { ContactPhoneLink } from "@/components/ui/contact-link"
import { StickyEnquireBar } from "@/components/ui/sticky-enquire-bar"
import { Reveal, Stagger, MotionItem } from "@/components/landing/motion"
import { Eyebrow } from "@/components/landing/section"
import { cn } from "@/lib/utils"

const primaryCtaClass =
  "h-12 touch-manipulation rounded-full px-8 text-base font-semibold shadow-lg"

const secondaryHeroCtaClass =
  "h-12 touch-manipulation rounded-full border-white/35 bg-white/15 px-8 text-base font-medium text-white backdrop-blur-md hover:border-white/50 hover:bg-white/22"

const featureIcons = [
  SproutIcon,
  Building2Icon,
  ChartNoAxesCombinedIcon,
  WarehouseIcon,
  PackageIcon,
  HandshakeIcon,
] as const

const featureGradients = [
  "from-primary/20 to-aqua/15 text-primary",
  "from-accent/20 to-primary/10 text-accent",
  "from-aqua/25 to-accent/15 text-aqua",
  "from-primary/15 to-accent/20 text-primary",
  "from-accent/15 to-aqua/20 text-accent",
  "from-aqua/20 to-primary/15 text-primary",
] as const

const wayGradients = [
  "mint-card-gradient ring-primary/15",
  "bg-linear-to-br from-accent/8 to-primary/8 ring-accent/15",
  "bg-linear-to-br from-aqua/10 to-accent/8 ring-aqua/20",
  "bg-linear-to-br from-primary/8 to-aqua/10 ring-primary/15",
] as const

export function MintLanding({ products }: { products: NouryaProduct[] }) {
  const copy = landings.mint
  const featured = pickFeaturedProducts(products)
  const ways = landing.opportunities.items.filter((item) => !item.featured)

  return (
    <SkinFrame skin="mint" className="pb-24 lg:pb-0">
      <IslandNav />
      <main>
        <section className="relative overflow-hidden px-4 pb-16 pt-28 text-white sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
          <MintHeroGradient />
          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] lg:items-center lg:gap-16">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.22em] text-white/80 uppercase">
                {copy.hero.eyebrow}
              </p>
              <h1 className="mt-4 max-w-xl text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {copy.hero.headline}
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
                {copy.hero.body}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button variant="cta" className={primaryCtaClass} asChild>
                  <a href={copy.hero.primaryCta.href}>{copy.hero.primaryCta.label}</a>
                </Button>
                <Button variant="outline" className={secondaryHeroCtaClass} asChild>
                  <a href={copy.hero.secondaryCta.href}>{copy.hero.secondaryCta.label}</a>
                </Button>
              </div>
              <ul className="mt-10 flex flex-wrap gap-3">
                {landing.hero.stats.slice(0, 4).map((stat) => (
                  <li
                    key={stat.label}
                    className="rounded-2xl border border-white/20 bg-white/12 px-4 py-3 backdrop-blur-md"
                  >
                    <p className="font-heading text-xl font-semibold">{stat.value}</p>
                    <p className="mt-0.5 text-xs text-white/75">{stat.label}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="relative">
              <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-md">
                <img
                  src={landing.hero.image.src}
                  alt={landing.hero.image.alt}
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                />
                <div className="mt-3 grid grid-cols-3 gap-2 px-1 pb-1">
                  {landing.numbers.items.slice(0, 3).map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl bg-white/12 px-3 py-2.5 text-center backdrop-blur-sm"
                    >
                      <p className="text-sm font-semibold">{stat.value}</p>
                      <p className="mt-0.5 text-[10px] leading-tight text-white/70">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border bg-card px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl overflow-x-auto snap-x snap-mandatory touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="flex min-w-max lg:min-w-0 lg:grid lg:grid-cols-6">
              {landing.numbers.items.map((stat) => (
                <li
                  key={stat.label}
                  className="min-w-[9rem] snap-start border-r border-border/60 px-6 py-2 last:border-r-0 lg:min-w-0"
                >
                  <p className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <LogoStrip variant="plain" />

        <section id="features" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <Eyebrow className="text-primary">{copy.features.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-5xl">
                {copy.features.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {copy.features.body}
              </p>
            </Reveal>

            <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {landing.why.advantages.map((item, index) => {
                const Icon = featureIcons[index % featureIcons.length]
                const gradient = featureGradients[index % featureGradients.length]

                return (
                  <MotionItem key={item.title}>
                    <article className="h-full rounded-2xl border border-border/80 bg-card p-6 shadow-[0_8px_32px_oklch(0.5_0.08_250/8%)]">
                      <span
                        className={cn(
                          "inline-flex size-11 items-center justify-center rounded-xl bg-linear-to-br ring-1 ring-inset ring-black/5",
                          gradient
                        )}
                      >
                        <Icon className="size-5" strokeWidth={2.25} aria-hidden />
                      </span>
                      <h3 className="mt-4 font-heading text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </article>
                  </MotionItem>
                )
              })}
            </Stagger>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="max-w-2xl">
              <Eyebrow className="text-primary">{copy.ways.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{copy.ways.title}</h2>
            </Reveal>

            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
              {ways.map((item, index) => (
                <MotionItem key={item.title}>
                  <article
                    className={cn(
                      "h-full rounded-2xl p-6 ring-1",
                      wayGradients[index % wayGradients.length]
                    )}
                  >
                    {"kicker" in item && item.kicker ? (
                      <p className="text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
                        {item.kicker}
                      </p>
                    ) : null}
                    <h3 className="mt-2 font-heading text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                    {"metric" in item && item.metric ? (
                      <p className="mt-4 font-heading text-2xl font-semibold text-primary">
                        {item.metric}
                        {"metricLabel" in item && item.metricLabel ? (
                          <span className="ml-2 text-sm font-normal text-muted-foreground">
                            {item.metricLabel}
                          </span>
                        ) : null}
                      </p>
                    ) : null}
                  </article>
                </MotionItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="max-w-2xl">
              <Eyebrow className="text-primary">{copy.products.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{copy.products.title}</h2>
              <p className="mt-4 text-muted-foreground">{copy.products.body}</p>
            </Reveal>
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <MotionItem key={product.handle}>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_8px_28px_oklch(0.5_0.08_250/8%)] transition-shadow hover:shadow-[0_12px_40px_oklch(0.5_0.1_250/12%)]"
                  >
                    <div className="relative aspect-square bg-muted">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : null}
                    </div>
                    <div className="p-4">
                      <p className="font-heading font-semibold">{product.title}</p>
                      <p className="mt-1 text-sm text-primary">{product.priceLabel}</p>
                    </div>
                  </a>
                </MotionItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="mint-band-gradient px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.22em] text-white/80 uppercase">
                {copy.cta.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-5xl">
                {copy.cta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/85">
                {copy.cta.body}
              </p>
              <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
                <Button
                  variant="cta"
                  className="h-12 rounded-full bg-white px-8 text-base font-semibold text-primary hover:bg-white/95"
                  asChild
                >
                  <a href="#contact">{copy.hero.primaryCta.label}</a>
                </Button>
                <Button variant="outline" className={secondaryHeroCtaClass} asChild>
                  <a href={site.phones[0].href}>Call {site.phones[0].number}</a>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2">
            <Reveal>
              <Eyebrow className="text-primary">{copy.enquire.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{copy.enquire.title}</h2>
              <p className="mt-4 text-muted-foreground">{copy.enquire.body}</p>
              <dl className="mt-8 space-y-3 text-sm">
                {site.phones.map((phone) => (
                  <div key={phone.href}>
                    <dt className="text-muted-foreground">{phone.label}</dt>
                    <dd>
                      <ContactPhoneLink href={phone.href}>{phone.number}</ContactPhoneLink>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.06}>
              <LandingEnquireForm className="rounded-2xl border border-border/80 bg-card p-6 shadow-[0_8px_32px_oklch(0.5_0.08_250/8%)] [&_[data-slot=button]]:h-12 [&_[data-slot=button]]:rounded-full [&_[data-slot=button]]:text-base [&_[data-slot=button]]:font-semibold" />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter variant="split" />
      <StickyEnquireBar href="#contact" label={copy.hero.primaryCta.label} />
    </SkinFrame>
  )
}
