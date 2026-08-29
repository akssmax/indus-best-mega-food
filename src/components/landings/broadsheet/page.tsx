import { landing } from "@/content/landing"
import { landings } from "@/content/landings"
import { site } from "@/content/site"
import { pickFeaturedProducts, type NouryaProduct } from "@/lib/nourya"
import { landingImageSizes, sizedImageUrl } from "@/lib/media"
import { MastheadNav } from "@/components/layout/headers/masthead-nav"
import { BottomDock } from "@/components/layout/headers/bottom-dock"
import { SiteFooter } from "@/components/layout/site-footer"
import { SkinFrame } from "@/components/landings/skin-frame"
import { LandingEnquireForm } from "@/components/landings/enquire-form"
import { PullQuote } from "@/components/ui/pull-quote"
import { DropFlourish } from "@/components/ui/brand-pattern"
import { ContactPhoneLink } from "@/components/ui/contact-link"
import { LogoStrip } from "@/components/landing/logo-strip"
import { Reveal, Stagger, MotionItem } from "@/components/landing/motion"
import { Eyebrow } from "@/components/landing/section"

export function BroadsheetLanding({ products }: { products: NouryaProduct[] }) {
  const copy = landings.broadsheet
  const featured = pickFeaturedProducts(products, 6)

  return (
    <SkinFrame skin="broadsheet" className="pb-20 lg:pb-0">
      <MastheadNav />
      <main>
        <section className="border-b border-foreground/20 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.22em] text-cta uppercase">
                {copy.hero.kicker}
              </p>
              <h1 className="mt-4 max-w-5xl font-heading text-4xl leading-[1.12] font-medium sm:text-5xl lg:text-6xl">
                {copy.hero.headline}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {copy.hero.deck}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={copy.hero.primaryCta.href}
                  className="inline-flex h-12 min-w-11 touch-manipulation items-center justify-center bg-cta px-6 text-sm font-medium text-cta-foreground"
                >
                  {copy.hero.primaryCta.label}
                </a>
                <a
                  href={copy.hero.secondaryCta.href}
                  className="inline-flex h-12 min-w-11 touch-manipulation items-center justify-center border border-foreground/25 px-6 text-sm font-medium"
                >
                  {copy.hero.secondaryCta.label}
                </a>
              </div>
            </Reveal>
            <div className="mt-10 overflow-hidden border border-foreground/15">
              <img
                src={landing.hero.image.src}
                alt={landing.hero.image.alt}
                sizes={landingImageSizes.hero}
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                className="aspect-[21/9] w-full object-cover sm:aspect-[2.4/1]"
              />
            </div>
          </div>
        </section>

        <LogoStrip variant="plain" />

        <section id="campus" className="border-b border-foreground/15 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="flex items-end justify-between gap-4">
              <div>
                <Eyebrow className="text-cta">{copy.stories.eyebrow}</Eyebrow>
                <h2 className="mt-3 font-heading text-3xl font-medium">{copy.stories.title}</h2>
              </div>
              <DropFlourish className="hidden text-cta sm:block" />
            </Reveal>
            <Stagger className="mt-8 grid gap-px bg-foreground/15 md:grid-cols-3">
              {landing.news.items.map((item) => (
                <MotionItem key={item.title}>
                  <article className="h-full bg-background p-6">
                    <p className="text-[11px] tracking-[0.16em] text-cta uppercase">{item.tag}</p>
                    <h3 className="mt-3 font-heading text-xl font-medium">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>
                  </article>
                </MotionItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="border-b border-foreground/15 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <Reveal>
              <Eyebrow className="text-cta">{copy.why.eyebrow}</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-medium">{copy.why.title}</h2>
            </Reveal>
            <ol className="divide-y divide-foreground/15 border-y border-foreground/15">
              {landing.why.advantages.map((item, index) => (
                <li key={item.title} className="flex min-h-16 gap-4 py-5">
                  <span className="w-8 shrink-0 font-heading text-lg text-cta">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-medium">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-foreground/15 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-4xl">
            <PullQuote cite={landing.partners.testimonial.author}>
              {landing.partners.testimonial.quote}
            </PullQuote>
          </div>
        </section>

        <section id="products" className="border-b border-foreground/15 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal>
              <Eyebrow className="text-cta">{copy.products.eyebrow}</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-medium">{copy.products.title}</h2>
            </Reveal>
            <Stagger className="mt-8 grid grid-cols-2 gap-px bg-foreground/15 sm:grid-cols-3">
              {featured.map((product) => (
                <MotionItem key={product.handle}>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-background p-4 touch-manipulation"
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      {product.image ? (
                        <img
                          src={sizedImageUrl(product.image, 640)}
                          alt={product.title}
                          sizes={landingImageSizes.product}
                          loading="lazy"
                          decoding="async"
                          className="size-full object-cover"
                        />
                      ) : null}
                    </div>
                    <p className="mt-3 font-heading text-base">{product.title}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </a>
                </MotionItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section id="location" className="border-b border-foreground/15 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="max-w-2xl">
              <Eyebrow className="text-cta">{landing.location.eyebrow}</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-medium">{landing.location.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{landing.location.body}</p>
            </Reveal>
            <div className="mt-8 overflow-hidden border border-foreground/15">
              <iframe
                src={landing.location.mapEmbed}
                width="100%"
                height="360"
                style={{ border: 0 }}
                loading="lazy"
                title="Campus location"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <ul className="mt-6 grid gap-px bg-foreground/15 sm:grid-cols-2">
              {landing.location.connections.slice(0, 4).map((item) => (
                <li
                  key={item.label}
                  className="flex min-h-12 items-center justify-between gap-4 bg-background px-4 py-3 text-sm"
                >
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-heading font-medium">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2">
            <Reveal>
              <Eyebrow className="text-cta">{copy.enquire.eyebrow}</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-medium">{copy.enquire.title}</h2>
              <p className="mt-4 text-muted-foreground">{copy.enquire.body}</p>
              <dl className="mt-8 space-y-3 text-sm">
                {site.phones.map((phone) => (
                  <div key={phone.href} className="border-b border-foreground/10 pb-3">
                    <dt className="text-muted-foreground">{phone.label}</dt>
                    <dd>
                      <ContactPhoneLink href={phone.href}>{phone.number}</ContactPhoneLink>
                    </dd>
                  </div>
                ))}
                {site.emails.map((email) => (
                  <div key={email.href} className="border-b border-foreground/10 pb-3">
                    <dt className="text-muted-foreground">{email.label}</dt>
                    <dd>
                      <a className="inline-flex min-h-11 items-center font-medium" href={email.href}>
                        {email.address}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="border border-foreground/20 p-5 sm:p-6">
                <p className="font-heading text-xl">Place a notice</p>
                <LandingEnquireForm className="mt-5" />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter variant="directory" />
      <BottomDock />
    </SkinFrame>
  )
}
