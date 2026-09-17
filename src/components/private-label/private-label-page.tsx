import {
  LockClosedIcon,
  AdjustmentsHorizontalIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  ArchiveBoxIcon,
  BeakerIcon,
  CircleStackIcon,
  ShoppingBagIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline"

import { privateLabel as data } from "@/content/private-label"
import { SectionIntro, featureGridClass } from "@/components/landing/feature-card"
import { TrustBrandsSection } from "@/components/landing/trust-brands-section"
import { ForestOceanCta } from "@/components/landing/forest-ocean-cta"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PatternBand } from "@/components/ui/brand-pattern"
import { CampusImg } from "@/components/ui/campus-img"
import { landingImageSizes } from "@/lib/media"
import { cn } from "@/lib/utils"

const advantageIcons = [
  ShieldCheckIcon,
  BanknotesIcon,
  LockClosedIcon,
  AdjustmentsHorizontalIcon,
] as const

const packagingIcons = [
  ArchiveBoxIcon,
  BeakerIcon,
  CircleStackIcon,
  ShoppingBagIcon,
  SwatchIcon,
] as const

function MockupImage({
  src,
  alt,
  priority = false,
  className,
}: {
  src: string
  alt: string
  priority?: boolean
  className?: string
}) {
  return (
    <CampusImg
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      sizes={landingImageSizes.card}
      className={cn(
        "size-full object-cover object-center",
        className
      )}
    />
  )
}

function SplitMockupSection({
  eyebrow,
  title,
  body,
  secondary,
  image,
  imageFirst = false,
  priority = false,
}: {
  eyebrow: string
  title: string
  body: string
  secondary?: string
  image: { src: string; alt: string }
  imageFirst?: boolean
  priority?: boolean
}) {
  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14",
        !imageFirst && "lg:[&>*:first-child]:order-2"
      )}
    >
      <Reveal>
        <SectionIntro eyebrow={eyebrow} title={title} body={body} />
        {secondary ? (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {secondary}
          </p>
        ) : null}
      </Reveal>
      <Reveal delay={0.06}>
        <figure className="overflow-hidden rounded-3xl bg-muted/30 ring-1 ring-foreground/8">
          <div className="aspect-[4/3] sm:aspect-[5/4]">
            <MockupImage src={image.src} alt={image.alt} priority={priority} />
          </div>
        </figure>
      </Reveal>
    </div>
  )
}

export function PrivateLabelPageContent() {
  return (
    <>
      <Section>
        <SplitMockupSection
          eyebrow={data.intro.eyebrow}
          title={data.intro.title}
          body={data.intro.body}
          secondary={data.intro.secondary}
          image={data.intro.image}
          priority
        />
      </Section>

      <Section className="relative overflow-hidden bg-secondary/30">
        <PatternBand
          variant="flow"
          className="pointer-events-none absolute inset-0 text-primary/15"
          patternClassName="opacity-[0.07]"
        />
        <div className="relative z-10">
          <Reveal>
            <SectionIntro
              eyebrow={data.footprint.eyebrow}
              title={data.footprint.title}
              body={data.footprint.body}
            />
          </Reveal>
          <Stagger className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {data.footprint.stats.map((stat) => (
              <MotionItem key={stat.label}>
                <div className="rounded-2xl bg-card px-5 py-6 ring-1 ring-foreground/8">
                  <p className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </MotionItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <Reveal>
          <SectionIntro
            eyebrow={data.showcase.eyebrow}
            title={data.showcase.title}
            body={data.showcase.body}
          />
        </Reveal>
        <div className="mt-12 space-y-6 lg:space-y-8">
          {data.showcase.items.map((item, index) => {
            const imageFirst = index % 2 === 0

            return (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/8">
                  <div
                    className={cn(
                      "grid lg:grid-cols-2 lg:items-stretch",
                      !imageFirst && "lg:[&>*:first-child]:order-2"
                    )}
                  >
                    <div className="relative aspect-[4/3] min-h-[14rem] overflow-hidden sm:aspect-[5/4] lg:aspect-auto lg:min-h-[20rem] lg:h-full">
                      <MockupImage src={item.image.src} alt={item.image.alt} />
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/35 to-transparent px-5 py-4 lg:hidden"
                        aria-hidden
                      >
                        <p className="font-heading text-sm font-semibold text-white">
                          YOUR BRAND
                        </p>
                      </div>
                    </div>
                    <div className="p-6 sm:p-8 lg:p-10">
                      <Eyebrow>{item.eyebrow}</Eyebrow>
                      <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <Section id="categories">
        <Reveal>
          <SectionIntro
            eyebrow={data.categories.eyebrow}
            title={data.categories.title}
            body={data.categories.body}
          />
        </Reveal>
        <Reveal className="mt-10" delay={0.04}>
          <Accordion
            type="single"
            collapsible
            defaultValue="category-0"
            className="rounded-2xl bg-card px-6 ring-1 ring-foreground/8 sm:px-8"
          >
            {data.categories.items.map((category, index) => (
              <AccordionItem key={category.title} value={`category-${index}`}>
                <AccordionTrigger className="py-4 text-base font-medium">
                  {category.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-6 pb-2 lg:grid-cols-[1fr_12rem] lg:items-start">
                    <div>
                      <p className="text-muted-foreground">{category.body}</p>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {category.products.map((product) => (
                          <li
                            key={product}
                            className="flex gap-2 text-sm text-foreground"
                          >
                            <span
                              aria-hidden
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-cta"
                            />
                            {product}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <CampusImg
                      src={category.image.src}
                      alt={category.image.alt}
                      loading="lazy"
                      sizes={landingImageSizes.product}
                      className="hidden aspect-[4/3] w-full rounded-xl object-cover ring-1 ring-foreground/8 lg:block"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Section>

      <Section className="bg-muted/40">
        <Reveal>
          <SectionIntro
            eyebrow={data.packaging.eyebrow}
            title={data.packaging.title}
            body={data.packaging.body}
          />
        </Reveal>
        <Reveal className="mt-10" delay={0.04}>
          <figure className="overflow-hidden rounded-3xl ring-1 ring-foreground/8">
            <div className="aspect-[16/9] sm:aspect-[21/9]">
              <MockupImage
                src={data.packaging.image.src}
                alt={data.packaging.image.alt}
              />
            </div>
          </figure>
        </Reveal>
        <Stagger className={cn(featureGridClass, "mt-10")}>
          {data.packaging.options.map((option, index) => {
            const Icon = packagingIcons[index] ?? ArchiveBoxIcon
            return (
              <MotionItem key={option.label}>
                <article className="h-full rounded-2xl bg-card p-6 ring-1 ring-foreground/8">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold">
                    {option.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {option.detail}
                  </p>
                </article>
              </MotionItem>
            )
          })}
        </Stagger>
      </Section>

      <Section>
        <Reveal>
          <SectionIntro
            eyebrow={data.advantages.eyebrow}
            title={data.advantages.title}
          />
        </Reveal>
        <Stagger className={cn(featureGridClass, "lg:grid-cols-2")}>
          {data.advantages.items.map((item, index) => {
            const Icon = advantageIcons[index] ?? ShieldCheckIcon
            return (
              <MotionItem key={item.title}>
                <article className="h-full rounded-2xl bg-card p-6 ring-1 ring-foreground/8">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </article>
              </MotionItem>
            )
          })}
        </Stagger>
      </Section>

      <Section className="relative overflow-hidden">
        <PatternBand
          variant="vein"
          className="pointer-events-none absolute inset-0 text-primary/20"
          patternClassName="opacity-[0.06]"
        />
        <div className="relative z-10">
          <Reveal>
            <SectionIntro
              eyebrow={data.process.eyebrow}
              title={data.process.title}
              body={data.process.body}
            />
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.process.steps.map((step, index) => (
              <MotionItem key={step.title}>
                <article className="h-full rounded-2xl bg-card p-5 ring-1 ring-foreground/8">
                  <p className="font-heading text-sm font-semibold tracking-wide text-cta">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-heading text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.detail}
                  </p>
                </article>
              </MotionItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <TrustBrandsSection {...data.trust} />

      <ForestOceanCta
        eyebrow={<Eyebrow className="text-cta">{data.hero.eyebrow}</Eyebrow>}
        title={data.cta.title}
        body={data.cta.body}
        primary={{ ...data.cta.primary, morph: "factory" }}
        secondary={{ ...data.cta.secondary, morph: "campus" }}
      />
    </>
  )
}
