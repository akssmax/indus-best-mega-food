import { landing } from "@/content/landing"
import { landings } from "@/content/landings"
import { site } from "@/content/site"
import { pickFeaturedProducts, type NouryaProduct } from "@/lib/nourya"
import { OverlayNav } from "@/components/layout/headers/overlay-nav"
import { SiteFooter } from "@/components/layout/site-footer"
import { SkinFrame } from "@/components/landings/skin-frame"
import { AtelierHeroGallery } from "@/components/landings/atelier/hero-gallery"
import { LandingEnquireForm } from "@/components/landings/enquire-form"
import { Button } from "@/components/ui/button"
import { SnapCarousel, SnapSlide } from "@/components/ui/snap-carousel"
import { SpecTable } from "@/components/ui/spec-table"
import { StickyEnquireBar } from "@/components/ui/sticky-enquire-bar"
import { ContactPhoneLink } from "@/components/ui/contact-link"
import { ProcessFlow } from "@/components/ui/process-flow"
import { UtilityMeters } from "@/components/ui/utility-meters"
import { PatternBand } from "@/components/ui/brand-pattern"
import { LogoStrip } from "@/components/landing/logo-strip"
import { Reveal, Stagger, MotionItem } from "@/components/landing/motion"
import { Eyebrow } from "@/components/landing/section"

export function AtelierLanding({ products }: { products: NouryaProduct[] }) {
  const copy = landings.atelier
  const featured = pickFeaturedProducts(products)

  return (
    <SkinFrame skin="atelier" className="pb-24 lg:pb-0">
      <OverlayNav />
      <main>
        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto grid w-full max-w-6xl lg:h-[80vh] lg:max-h-[80vh] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch">
            <div className="flex min-h-0 flex-col justify-center lg:overflow-y-auto lg:pr-12">
              <Reveal>
                <Eyebrow>{copy.hero.eyebrow}</Eyebrow>
                <h1 className="mt-5 max-w-xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  {copy.hero.headline}
                </h1>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {copy.hero.body}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button variant="cta" className="h-12 touch-manipulation px-6 text-base" asChild>
                    <a href={copy.hero.primaryCta.href}>{copy.hero.primaryCta.label}</a>
                  </Button>
                  <Button variant="outline" className="h-12 touch-manipulation border-foreground/20 px-6 text-base" asChild>
                    <a href={copy.hero.secondaryCta.href}>{copy.hero.secondaryCta.label}</a>
                  </Button>
                </div>
              </Reveal>
              <SpecTable
                className="mt-10 max-w-md"
                rows={landing.hero.stats.map((stat) => ({
                  label: stat.label,
                  value: stat.value,
                }))}
              />
            </div>
            <AtelierHeroGallery className="mt-10 h-[min(52vw,50vh)] min-h-0 lg:mt-0 lg:h-full lg:max-h-full" />
          </div>
        </section>

        <LogoStrip variant="plain" />

        <PatternBand
          variant="hatch"
          className="border-y border-border bg-secondary/40 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
          patternClassName="text-foreground opacity-[0.08]"
        >
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="max-w-2xl">
              <Eyebrow>{copy.why.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{copy.why.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {copy.why.body}
              </p>
            </Reveal>
            <Stagger className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {landing.why.advantages.map((item, index) => (
                <MotionItem key={item.title}>
                  <div className="h-full bg-background p-6">
                    <p className="font-heading text-3xl font-semibold text-primary/80">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 font-heading text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </MotionItem>
              ))}
            </Stagger>
          </div>
        </PatternBand>

        <section id="campus" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="max-w-2xl">
              <Eyebrow>{copy.campus.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{copy.campus.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {copy.campus.body}
              </p>
            </Reveal>
            <SnapCarousel className="mt-12">
              {landing.facilities.items.map((facility) => (
                <SnapSlide key={facility.title}>
                  <article className="h-full border border-border bg-card">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={facility.image.src}
                        alt={facility.image.alt}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-heading text-base font-semibold">
                          {facility.title}
                        </h3>
                        <span className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                          {facility.spec}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {facility.body}
                      </p>
                    </div>
                  </article>
                </SnapSlide>
              ))}
            </SnapCarousel>
          </div>
        </section>

        <section className="border-y border-border bg-forest px-4 py-16 text-forest-foreground sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2">
            <Reveal>
              <Eyebrow className="text-forest-foreground/90">{copy.readout.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl sm:text-4xl">{copy.readout.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-forest-foreground/85">
                {copy.readout.body}
              </p>
              <div className="mt-8">
                <ProcessFlow
                  size="lg"
                  surface="dark"
                  steps={landing.location.steps.map((step) => ({
                    title: step.title,
                    detail: step.detail,
                    tone: step.tone,
                  }))}
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <UtilityMeters
                className="mt-2"
                surface="dark"
                items={[
                  { label: "Process water", value: "2.7 MLD", fill: 86, tone: "aqua" },
                  { label: "ETP & STP", value: "Centralised", fill: 72, tone: "primary" },
                  { label: "Weighbridge", value: "100 MT", fill: 64, tone: "cta" },
                  { label: "Cold storage", value: "5,000 MT", fill: 80, tone: "aqua" },
                  { label: "Dry warehouse", value: "12,000 MT", fill: 70, tone: "cta" },
                ]}
              />
            </Reveal>
          </div>
        </section>

        <section id="ways" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="max-w-2xl">
              <Eyebrow>{copy.ways.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{copy.ways.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {copy.ways.body}
              </p>
            </Reveal>
            <SpecTable
              className="mt-10"
              rows={landing.opportunities.items.map((item) => ({
                label: item.title,
                value: item.featured ? "Invest" : "Operate",
                hint: item.body,
              }))}
            />
            <Button variant="cta" className="mt-8 h-12 touch-manipulation px-6 text-base" asChild>
              <a href={landing.opportunities.cta.href}>{landing.opportunities.cta.label}</a>
            </Button>
          </div>
        </section>

        <section id="products" className="border-t border-border px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="max-w-2xl">
              <Eyebrow>{landing.products.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl sm:text-4xl">{landing.products.title}</h2>
            </Reveal>
            <Stagger className="mt-10 grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
              {featured.map((product) => (
                <MotionItem key={product.handle}>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-background p-3 touch-manipulation"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="size-full object-cover"
                        />
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm font-medium">{product.title}</p>
                    <p className="text-xs text-muted-foreground">{product.priceLabel}</p>
                  </a>
                </MotionItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section id="location" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="max-w-2xl">
              <Eyebrow>{landing.location.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl sm:text-4xl">{landing.location.title}</h2>
              <p className="mt-4 text-muted-foreground">{landing.location.body}</p>
            </Reveal>
            <div className="mt-10 overflow-hidden border border-border">
              <iframe
                src={landing.location.mapEmbed}
                width="100%"
                height="380"
                style={{ border: 0 }}
                loading="lazy"
                title="Campus location"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <SpecTable
              className="mt-6"
              rows={landing.location.connections.slice(0, 4).map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
          </div>
        </section>

        <section id="contact" className="border-t border-border px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2">
            <Reveal>
              <Eyebrow>{copy.enquire.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-3xl sm:text-4xl">{copy.enquire.title}</h2>
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
              <LandingEnquireForm className="border border-border bg-card p-5 sm:p-6" />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter variant="split" />
      <StickyEnquireBar href="/contact" label={copy.hero.primaryCta.label} />
    </SkinFrame>
  )
}
