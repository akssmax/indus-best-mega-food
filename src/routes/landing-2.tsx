import { createFileRoute } from "@tanstack/react-router"
import {
  MapPinIcon,
  CurrencyRupeeIcon,
  BuildingOffice2Icon,
  ArchiveBoxIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  MapIcon,
  CubeTransparentIcon,
  BoltIcon,
  ArrowPathIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline"

import { landing } from "@/content/landing"
import { site } from "@/content/site"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eyebrow } from "@/components/landing/section"
import { Reveal, Stagger, MotionItem } from "@/components/landing/motion"
import { motion, useReducedMotion } from "framer-motion"
import { WaterBackground } from "@/components/landing/water-background"

export const Route = createFileRoute("/landing-2")({
  component: LandingTwo,
})

function LandingTwo() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <WhySection />
      <InfrastructureSection />
      <FacilitiesSection />
      <OpportunitiesSection />
      <NumbersSection />
      <LocationSection />
      <PartnersSection />
      <GallerySection />
      <NewsSection />
      <FinalCtaSection />
      <EnquireSection />
    </main>
  )
}

/* ─── Hero – Split layout, no gradient overlay ─── */
function HeroSection() {
  const { hero } = landing
  const reduce = useReducedMotion()

  return (
    <section className="grid min-h-[85vh] lg:grid-cols-[1fr_1fr]">
      <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <Reveal>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.body}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="cta" className="h-12 px-7 text-base" asChild>
              <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
            </Button>
            <Button
              variant="outline"
              className="h-12 px-7 text-base"
              asChild
            >
              <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
            </Button>
          </div>
        </Reveal>
      </div>
      <div className="relative overflow-hidden bg-forest">
        <motion.img
          src={hero.image.src}
          alt={hero.image.alt}
          className="size-full object-cover"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: [0.22, 1, 0.36, 1] }}
        />
        <WaterBackground
          colorBack="#0f2b1d"
          colorHighlight="#c8a84e"
          opacity={0.25}
          className="pointer-events-auto absolute inset-0"
        />
      </div>
    </section>
  )
}

/* ─── About – Editorial style, large text ─── */
function AboutSection() {
  const { about } = landing

  return (
    <section id={about.id} className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
            <div>
              <Eyebrow>{about.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
                {about.title}
              </h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {about.body}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {about.whatIs}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12" delay={0.06}>
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={about.image.src}
              alt={about.image.alt}
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2">
          {[about.vision, about.mission].map((item) => (
            <MotionItem key={item.title}>
              <div className="rounded-xl border border-border/60 p-6">
                <p className="text-xs font-medium tracking-[0.22em] text-cta uppercase">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </MotionItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ─── Why – Numbered list layout ─── */
const whyIcons = [
  MapIcon,
  CubeTransparentIcon,
  BoltIcon,
  ArrowPathIcon,
  UserGroupIcon,
  BanknotesIcon,
]

function WhySection() {
  const { why } = landing

  return (
    <section
      id={why.id}
      className="bg-forest px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow className="text-cta">{why.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
              {why.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              {why.body}
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {why.advantages.map((item, index) => {
            const Icon = whyIcons[index] ?? MapIcon
            return (
              <MotionItem key={item.title}>
                <div className="group rounded-xl border border-white/10 p-6 transition-colors hover:border-cta/40">
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-3xl font-bold text-cta/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon className="size-5 text-cta" />
                  </div>
                  <h3 className="mt-3 font-heading text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {item.body}
                  </p>
                </div>
              </MotionItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

/* ─── Infrastructure – Horizontal icon strip ─── */
function InfrastructureSection() {
  const { infrastructure: data } = landing

  return (
    <section id={data.id} className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            {data.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {data.body}
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.zones.map((zone) => (
            <MotionItem key={zone.title}>
              <div className="rounded-xl bg-secondary/50 p-6 transition-colors hover:bg-secondary">
                <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
                  {zone.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {zone.body}
                </p>
              </div>
            </MotionItem>
          ))}
        </Stagger>

        <Reveal className="mt-12" delay={0.06}>
          <div className="rounded-xl border border-border/60 p-6">
            <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
              Connectivity
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {data.connectivity.map((item) => (
                <div key={item.label} className="text-center">
                  <p className="font-heading text-xl font-bold text-primary">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Facilities – Horizontal scroll cards ─── */
function FacilitiesSection() {
  const { facilities: data } = landing

  return (
    <section id={data.id} className="bg-secondary/30 px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            {data.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {data.body}
          </p>
        </Reveal>

        <div className="mt-12 -mx-6 px-6 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0">
          <Stagger className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {data.items.map((facility) => (
              <MotionItem key={facility.title}>
                <Card className="min-w-[280px] snap-start overflow-hidden sm:min-w-[320px] lg:min-w-0">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={facility.image.src}
                      alt={facility.image.alt}
                      className="size-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-base font-semibold">
                        {facility.title}
                      </h3>
                      <span className="rounded-full bg-cta/10 px-2.5 py-0.5 text-xs font-medium text-cta">
                        {facility.spec}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {facility.body}
                    </p>
                  </CardContent>
                </Card>
              </MotionItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}

/* ─── Opportunities – Bento grid ─── */
function OpportunitiesSection() {
  const { opportunities: data } = landing

  return (
    <section id={data.id} className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            {data.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {data.body}
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, index) => (
            <MotionItem key={item.title}>
              <div
                className={`rounded-xl border border-border/60 p-6 transition-colors hover:border-primary/30 ${
                  index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <h3 className="font-heading text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </MotionItem>
          ))}
        </Stagger>

        <Reveal className="mt-8" delay={0.06}>
          <Button variant="cta" className="h-12 px-7 text-base" asChild>
            <a href={data.cta.href}>{data.cta.label}</a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Numbers – Full-width band, large stats ─── */
const numbersIcons = [
  MapPinIcon,
  CurrencyRupeeIcon,
  BuildingOffice2Icon,
  ArchiveBoxIcon,
  UserGroupIcon,
  CalendarDaysIcon,
]

function NumbersSection() {
  const { numbers } = landing

  return (
    <section className="bg-forest px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.22em] text-cta uppercase">
            {numbers.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">
            {numbers.title}
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {numbers.items.map((stat, index) => {
            const Icon = numbersIcons[index] ?? MapPinIcon
            return (
              <MotionItem key={stat.label}>
                <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-white/10">
                    <Icon className="size-5 text-cta" />
                  </div>
                  <p className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-white/70">{stat.label}</p>
                </div>
              </MotionItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

/* ─── Location – Map + details side by side ─── */
function LocationSection() {
  const { location: data } = landing

  return (
    <section id={data.id} className="bg-secondary/30 px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            {data.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {data.body}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.4fr]">
          <Reveal>
            <div className="overflow-hidden rounded-2xl ring-1 ring-foreground/10">
              <iframe
                src={data.mapEmbed}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Indus Best Mega Food Park Location"
              />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="space-y-3">
              {data.connections.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg bg-card px-4 py-3 ring-1 ring-foreground/5"
                >
                  <span className="text-sm text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="font-heading text-sm font-bold text-primary">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Partners – Logo strip + testimonial ─── */
function PartnersSection() {
  const { partners: data } = landing

  return (
    <section id={data.id} className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            {data.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {data.body}
          </p>
        </Reveal>

        <Stagger className="mt-12 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
          {data.companies.map((company) => (
            <MotionItem key={company.name}>
              <div className="flex h-20 w-40 items-center justify-center rounded-xl border border-border/40 bg-secondary/30 px-4">
                <span className="text-center text-xs font-medium text-muted-foreground">
                  {company.name}
                </span>
              </div>
            </MotionItem>
          ))}
        </Stagger>

        <Reveal className="mt-12" delay={0.06}>
          <div className="rounded-2xl bg-forest p-8 sm:p-10">
            <blockquote className="text-base leading-relaxed text-forest-foreground/90 sm:text-lg">
              "{data.testimonial.quote}"
            </blockquote>
            <div className="mt-5 flex items-center gap-3">
              <div className="size-10 rounded-full bg-cta/20" />
              <div>
                <p className="text-sm font-semibold text-forest-foreground">
                  {data.testimonial.author}
                </p>
                <p className="text-xs text-forest-foreground/60">
                  {data.testimonial.company}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Gallery – Masonry-style grid with hover overlays ─── */
function GallerySection() {
  const { gallery: data } = landing

  return (
    <section className="bg-secondary/30 px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            {data.title}
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {data.items.map((item, index) => (
            <MotionItem key={item.caption}>
              <div
                className={`group relative overflow-hidden rounded-xl ring-1 ring-foreground/10 ${
                  index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className={`size-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    index === 0 ? "aspect-square sm:aspect-auto sm:h-full" : "aspect-[4/3]"
                  }`}
                  loading={index > 4 ? "lazy" : "eager"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-all duration-400 group-hover:opacity-100">
                  <span className="text-sm font-semibold text-white drop-shadow-md">
                    {item.caption}
                  </span>
                  <span className="mt-0.5 text-xs text-white/70 line-clamp-2">
                    {item.alt}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="size-8 rounded-full bg-white/20 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                </div>
              </div>
            </MotionItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ─── News – Minimal cards ─── */
function NewsSection() {
  const { news: data } = landing

  return (
    <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            {data.title}
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {data.items.map((item) => (
            <MotionItem key={item.title}>
              <div className="group rounded-xl border border-border/60 p-6 transition-colors hover:border-primary/30">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {item.tag}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.date).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </div>
            </MotionItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ─── Final CTA – Minimal dark section ─── */
function FinalCtaSection() {
  const { finalCta: data } = landing

  return (
    <section className="relative overflow-hidden bg-forest px-6 py-20 text-forest-foreground sm:px-10 lg:px-16 lg:py-28">
      <WaterBackground
        colorBack="#1a3a2a"
        colorHighlight="#c8a84e"
        opacity={0.45}
        className="pointer-events-auto absolute inset-0"
      />

      {/* Decorative grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative diagonal lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`,
        }}
      />

      {/* Decorative dots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.22em] text-cta uppercase">
            {data.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            {data.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-forest-foreground/80 sm:text-lg">
            {data.body}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="cta" className="h-12 px-7 text-base" asChild>
              <a href={data.primaryCta.href}>{data.primaryCta.label}</a>
            </Button>
            <Button
              variant="outline"
              className="h-12 border-forest-foreground/30 bg-transparent px-7 text-base text-forest-foreground hover:bg-forest-foreground/10 hover:text-forest-foreground"
              asChild
            >
              <a href={data.secondaryCta.href} download={data.secondaryCta.download}>
                {data.secondaryCta.label}
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Enquire – Contact form ─── */
function EnquireSection() {
  const { enquire } = landing

  return (
    <section id={enquire.id} className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <Eyebrow>{enquire.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl">{enquire.title}</h2>
            <p className="mt-4 text-muted-foreground">{enquire.body}</p>
            <dl className="mt-8 space-y-4 text-sm">
              {site.phones.map((phone) => (
                <div key={phone.href}>
                  <dt className="text-muted-foreground">{phone.label}</dt>
                  <dd>
                    <a
                      className="font-medium text-primary hover:underline"
                      href={phone.href}
                    >
                      {phone.number}
                    </a>
                  </dd>
                </div>
              ))}
              {site.emails.map((email) => (
                <div key={email.href}>
                  <dt className="text-muted-foreground">{email.label}</dt>
                  <dd>
                    <a
                      className="font-medium text-primary hover:underline"
                      href={email.href}
                    >
                      {email.address}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.08}>
            <EnquireForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function EnquireForm() {
  return (
    <form className="grid gap-4 rounded-xl border border-border/60 p-6">
      <p className="font-heading text-lg font-semibold">Send an enquiry</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Name"
          className="rounded-lg border border-border/60 bg-card px-3 py-2.5 text-sm"
        />
        <input
          name="company"
          placeholder="Company"
          className="rounded-lg border border-border/60 bg-card px-3 py-2.5 text-sm"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="phone"
          type="tel"
          required
          placeholder="Phone"
          className="rounded-lg border border-border/60 bg-card px-3 py-2.5 text-sm"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="rounded-lg border border-border/60 bg-card px-3 py-2.5 text-sm"
        />
      </div>
      <textarea
        name="message"
        rows={4}
        placeholder="Tell us about your requirements"
        className="rounded-lg border border-border/60 bg-card px-3 py-2.5 text-sm"
      />
      <Button variant="cta" className="h-11" type="submit">
        Submit Enquiry
      </Button>
    </form>
  )
}
