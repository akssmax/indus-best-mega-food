import { landing } from "@/content/landing"
import { landings } from "@/content/landings"
import { site } from "@/content/site"
import { pickFeaturedProducts, type NouryaProduct } from "@/lib/nourya"
import { IslandNav } from "@/components/layout/headers/island-nav"
import { SiteFooter } from "@/components/layout/site-footer"
import { SkinFrame } from "@/components/landings/skin-frame"
import { NightHeroGallery } from "@/components/landings/night/hero-gallery"
import { LandingEnquireForm } from "@/components/landings/enquire-form"
import { Button } from "@/components/ui/button"
import { CaptionGallery } from "@/components/ui/caption-gallery"
import { CampusHotspots } from "@/components/ui/campus-hotspots"
import { FilmGrain, PatternBand } from "@/components/ui/brand-pattern"
import { ContactPhoneLink } from "@/components/ui/contact-link"
import { StickyEnquireBar } from "@/components/ui/sticky-enquire-bar"
import { LogoStrip } from "@/components/landing/logo-strip"
import { Reveal, Stagger, MotionItem } from "@/components/landing/motion"
import { Eyebrow } from "@/components/landing/section"

const primaryCtaClass =
  "h-12 touch-manipulation rounded-full px-8 text-base font-semibold ring-1 ring-cta-foreground/15"

const secondaryCtaClass =
  "h-12 touch-manipulation rounded-full border-foreground/40 bg-foreground/10 px-8 text-base font-medium text-foreground backdrop-blur-md hover:border-foreground/55 hover:bg-foreground/15"

const secondaryCtaSolidClass =
  "h-12 touch-manipulation rounded-full border-border/80 bg-background/40 px-8 text-base font-medium text-foreground hover:border-border hover:bg-background/60"

export function NightLanding({ products }: { products: NouryaProduct[] }) {
  const copy = landings.night
  const featured = pickFeaturedProducts(products)

  return (
    <SkinFrame skin="night" className="pb-24 lg:pb-0">
      <IslandNav />
      <main className="-mt-14 sm:-mt-16">
        <section className="relative flex min-h-svh items-end overflow-hidden">
          <NightHeroGallery />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/55 to-background/20" />
          <FilmGrain className="opacity-[0.18]" />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-20">
            <Reveal>
              <Eyebrow className="text-cta">{copy.hero.eyebrow}</Eyebrow>
              <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] font-semibold sm:text-6xl lg:text-7xl">
                {copy.hero.headline}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
                {copy.hero.body}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button variant="cta" className={primaryCtaClass} asChild>
                  <a href={copy.hero.primaryCta.href}>{copy.hero.primaryCta.label}</a>
                </Button>
                <Button variant="outline" className={secondaryCtaClass} asChild>
                  <a href={copy.hero.secondaryCta.href}>{copy.hero.secondaryCta.label}</a>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="border-y border-border/70 bg-card/40">
          <div className="mx-auto w-full max-w-6xl overflow-x-auto snap-x snap-mandatory touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="flex min-w-max px-4 sm:px-6 lg:grid lg:min-w-0 lg:grid-cols-6 lg:px-8">
              {landing.numbers.items.map((stat) => (
                <li
                  key={stat.label}
                  className="min-w-[9.5rem] snap-start border-r border-border/50 px-6 py-5 last:border-r-0 lg:min-w-0"
                >
                  <p className="font-heading text-3xl font-semibold text-cta">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <LogoStrip variant="plain" />

        <section id="why" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <Eyebrow className="text-cta">{copy.why.eyebrow}</Eyebrow>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{copy.why.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {copy.why.body}
                </p>
              </Reveal>
              <div className="mt-8">
                <CampusHotspots
                  src="/images/warehouse.jpg"
                  alt="Warehouse sheds"
                  className="h-64 rounded-3xl sm:h-80"
                  pins={[
                    {
                      label: "16 sheds",
                      detail: "Plug-and-play MSME",
                      x: "30%",
                      y: "38%",
                      tone: "cta",
                      icon: "sheds",
                    },
                    {
                      label: "Utilities",
                      detail: "Water, ETP, weighbridge",
                      x: "68%",
                      y: "62%",
                      tone: "primary",
                      icon: "utilities",
                    },
                  ]}
                />
              </div>
            </div>
            <Stagger className="space-y-6">
              {landing.why.advantages.map((item) => (
                <MotionItem key={item.title}>
                  <article className="rounded-3xl border border-border/80 bg-card/70 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
                    <h3 className="font-heading text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </article>
                </MotionItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section id="gallery" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="max-w-2xl">
              <Eyebrow className="text-cta">{copy.gallery.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{copy.gallery.title}</h2>
            </Reveal>
            <div className="mt-10">
              <CaptionGallery items={landing.gallery.items} />
            </div>
          </div>
        </section>

        <section id="products" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="max-w-2xl">
              <Eyebrow className="text-cta">{copy.products.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl sm:text-4xl">{copy.products.title}</h2>
              <p className="mt-4 text-muted-foreground">{copy.products.body}</p>
            </Reveal>
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2">
              {featured.map((product) => (
                <MotionItem key={product.handle}>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-3xl touch-manipulation ring-1 ring-border/60 transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
                  >
                    <div className="relative aspect-[5/4] bg-muted">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : null}
                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background via-background/80 to-transparent p-5">
                        <p className="font-heading text-2xl">{product.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {product.priceLabel}
                        </p>
                      </div>
                    </div>
                  </a>
                </MotionItem>
              ))}
            </Stagger>
          </div>
        </section>

        <PatternBand
          variant="flow"
          className="border-y border-border/50 bg-secondary px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
          patternClassName="text-foreground opacity-[0.1]"
        >
          <div className="mx-auto w-full max-w-4xl">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <div className="h-1 bg-cta" aria-hidden />
                <div className="px-8 py-12 text-center sm:px-12 sm:py-14">
                  <Eyebrow className="text-cta">{copy.cta.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-4xl sm:text-5xl">{copy.cta.title}</h2>
                  <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                    {copy.cta.body}
                  </p>
                  <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
                    <Button variant="cta" className={primaryCtaClass} asChild>
                      <a href="#contact">{copy.hero.primaryCta.label}</a>
                    </Button>
                    <Button variant="outline" className={secondaryCtaSolidClass} asChild>
                      <a href={site.phones[0].href}>Call {site.phones[0].number}</a>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </PatternBand>

        <section id="contact" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2">
            <Reveal>
              <Eyebrow className="text-cta">{copy.enquire.eyebrow}</Eyebrow>
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
              <LandingEnquireForm className="rounded-3xl border border-border/80 bg-card p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] [&_[data-slot=button]]:h-12 [&_[data-slot=button]]:rounded-full [&_[data-slot=button]]:text-base [&_[data-slot=button]]:font-semibold" />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter variant="editorial" />
      <StickyEnquireBar href="#contact" label={copy.hero.primaryCta.label} />
    </SkinFrame>
  )
}
