import { motion, useReducedMotion } from "framer-motion"

import { landing } from "@/content/landing"
import { landings } from "@/content/landings"
import { site } from "@/content/site"
import { pickFeaturedProducts, type NouryaProduct } from "@/lib/nourya"
import { IslandNav } from "@/components/layout/headers/island-nav"
import { SiteFooter } from "@/components/layout/site-footer"
import { SkinFrame } from "@/components/landings/skin-frame"
import { LandingEnquireForm } from "@/components/landings/enquire-form"
import { Button } from "@/components/ui/button"
import { CaptionGallery } from "@/components/ui/caption-gallery"
import { CampusHotspots } from "@/components/ui/campus-hotspots"
import { FilmGrain, PatternBand } from "@/components/ui/brand-pattern"
import { Reveal, Stagger, MotionItem } from "@/components/landing/motion"
import { Eyebrow } from "@/components/landing/section"

export function NightLanding({ products }: { products: NouryaProduct[] }) {
  const copy = landings.night
  const featured = pickFeaturedProducts(products)
  const reduce = useReducedMotion()

  return (
    <SkinFrame skin="night">
      <IslandNav />
      <main className="-mt-14 sm:-mt-16">
        <section className="relative flex min-h-svh items-end overflow-hidden">
          <motion.img
            src={landing.about.image.src}
            alt={landing.about.image.alt}
            className="absolute inset-0 size-full object-cover"
            initial={reduce ? false : { scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 14, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/45 to-background/10" />
          <FilmGrain className="opacity-[0.22]" />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-20">
            <Reveal>
              <Eyebrow className="text-cta">{copy.hero.eyebrow}</Eyebrow>
              <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] font-semibold sm:text-6xl lg:text-7xl">
                {copy.hero.headline}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
                {copy.hero.body}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button variant="cta" className="h-12 touch-manipulation rounded-full px-7 text-base" asChild>
                  <a href={copy.hero.primaryCta.href}>{copy.hero.primaryCta.label}</a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 touch-manipulation rounded-full border-foreground/25 bg-background/20 px-7 text-base text-foreground"
                  asChild
                >
                  <a href={copy.hero.secondaryCta.href}>{copy.hero.secondaryCta.label}</a>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="border-y border-border/60">
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
                  className="h-64 sm:h-80"
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
                  <article className="rounded-3xl border border-border/70 bg-card/60 p-6">
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
                    className="group block overflow-hidden rounded-3xl touch-manipulation"
                  >
                    <div className="relative aspect-[5/4] bg-muted">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="size-full object-cover"
                        />
                      ) : null}
                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background to-transparent p-5">
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
          variant="rain"
          className="bg-forest px-4 py-20 text-forest-foreground sm:px-6 lg:px-8 lg:py-28"
          patternClassName="text-forest-foreground opacity-[0.12]"
        >
          <div className="relative mx-auto w-full max-w-3xl text-center">
            <FilmGrain />
            <Reveal>
              <Eyebrow className="text-cta">{copy.cta.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-4xl sm:text-5xl">{copy.cta.title}</h2>
              <p className="mx-auto mt-4 max-w-lg text-forest-foreground/80">
                {copy.cta.body}
              </p>
              <Button variant="cta" className="mt-8 h-12 touch-manipulation rounded-full px-7 text-base" asChild>
                <a href="/contact">{landing.finalCta.primaryCta.label}</a>
              </Button>
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
                      <a className="inline-flex min-h-11 items-center font-medium" href={phone.href}>
                        {phone.number}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.06}>
              <LandingEnquireForm className="rounded-3xl border border-border bg-card p-6" />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter variant="editorial" />
    </SkinFrame>
  )
}
