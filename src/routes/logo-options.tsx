import { createFileRoute } from "@tanstack/react-router"
import { ArrowRightIcon, MenuIcon } from "lucide-react"

import {
  DropIAlternateSymbol,
  LogoLockup,
  LogoSymbol,
  dropIAlternates,
  logoConcepts,
} from "@/components/brand/logo-concepts"
import { OceanBackground } from "@/components/landing/ocean-background"
import { Eyebrow, Section } from "@/components/landing/section"
import { PageHero } from "@/components/layout/page-hero"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { seoHead } from "@/lib/seo"

export const Route = createFileRoute("/logo-options")({
  head: () =>
    seoHead({
      title: "Logo options | Indus Best Mega Food Park",
      description:
        "Internal brand exploration for the Indus Best Mega Food Park identity.",
      path: "/logo-options",
      noindex: true,
    }),
  component: LogoOptionsPage,
})

function MiniNavigation({
  concept,
  tone,
}: {
  concept: (typeof logoConcepts)[number]
  tone: "paper" | "forest"
}) {
  const forest = tone === "forest"

  return (
    <div
      className={
        forest
          ? "relative flex h-16 items-center gap-3 border-b border-forest-foreground/10 bg-forest px-4"
          : "flex h-16 items-center gap-3 border-b border-border/70 bg-background px-4"
      }
    >
      <LogoLockup concept={concept} tone={tone} compact />
      <div
        aria-hidden
        className={
          forest
            ? "ml-auto hidden items-center gap-3 text-[0.58rem] font-medium text-forest-foreground/65 sm:flex"
            : "ml-auto hidden items-center gap-3 text-[0.58rem] font-medium text-muted-foreground sm:flex"
        }
      >
        <span>About</span>
        <span>Facilities</span>
        <span>Investors</span>
      </div>
      <span
        className={
          forest
            ? "ml-auto grid size-8 place-items-center rounded-lg border border-forest-foreground/20 text-forest-foreground sm:ml-0"
            : "ml-auto grid size-8 place-items-center rounded-lg border border-border text-foreground sm:ml-0"
        }
      >
        <MenuIcon className="size-3.5" />
      </span>
    </div>
  )
}

function HeroApplication({
  concept,
}: {
  concept: (typeof logoConcepts)[number]
}) {
  return (
    <div className="relative isolate min-h-64 overflow-hidden bg-forest px-5 pt-5 text-forest-foreground sm:min-h-72 sm:px-6">
      <OceanBackground
        tone="forest"
        placement="fill"
        scale={1.45}
        interaction="static"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -bottom-14 size-48 rounded-full bg-cta/18 blur-3xl"
      />
      <div className="relative z-10">
        <LogoLockup concept={concept} tone="forest" compact />
        <div className="mt-10 max-w-sm sm:mt-12">
          <p className="text-[0.58rem] font-semibold tracking-[0.2em] text-cta uppercase">
            Ready infrastructure
          </p>
          <h3 className="mt-2 font-heading text-2xl leading-tight sm:text-[1.7rem]">
            From crop to market,
            <br />
            on one campus.
          </h3>
          <div className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-cta px-3 py-2 text-[0.65rem] font-semibold text-cta-foreground">
            Explore the park
            <ArrowRightIcon className="size-3" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ScaleTest({
  concept,
}: {
  concept: (typeof logoConcepts)[number]
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-5 rounded-xl border border-border/60 bg-muted/35 px-4 py-3">
      <div className="flex items-end gap-3">
        <LogoSymbol
          conceptId={concept.id}
          className="size-12"
          title={`${concept.name} mark at 48 pixels`}
        />
        <LogoSymbol
          conceptId={concept.id}
          className="size-8"
          title={`${concept.name} mark at 32 pixels`}
        />
        <LogoSymbol
          conceptId={concept.id}
          className="size-5"
          title={`${concept.name} mark at 20 pixels`}
        />
      </div>
      <p className="text-right text-[0.62rem] leading-relaxed font-medium tracking-[0.12em] text-muted-foreground uppercase">
        48 / 32 / 20 px
      </p>
    </div>
  )
}

function DropIStudies() {
  return (
    <section className="border-t border-border/60 bg-muted/25 p-5 sm:p-6">
      <div className="mb-5">
        <p className="text-[0.6rem] font-semibold tracking-[0.18em] text-cta uppercase">
          08A–08E · Alternate studies
        </p>
        <h4 className="mt-1.5 font-heading text-xl">Five ways to refine Drop I.</h4>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          The same core ingredients—structural I, water drop, and leaf—tested
          with different weight, balance, and silhouette.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {dropIAlternates.map((alternate, index) => (
          <div
            key={alternate.id}
            className="overflow-hidden rounded-2xl border border-border/70 bg-background"
          >
            <div className="grid min-h-36 place-items-center p-6">
              <DropIAlternateSymbol
                variant={alternate.id}
                className="size-20"
                title={`${alternate.label} Drop I alternate`}
              />
            </div>
            <div className="flex items-center gap-2 border-y border-border/60 bg-forest px-3 py-2.5">
              <DropIAlternateSymbol
                variant={alternate.id}
                tone="forest"
                className="size-7"
              />
              <div className="min-w-0 text-forest-foreground">
                <div className="text-[0.62rem] leading-none font-bold tracking-[0.08em]">
                  INDUS
                </div>
                <div className="mt-0.5 text-[0.38rem] tracking-[0.1em] text-forest-foreground/65 uppercase">
                  Mega Food Park
                </div>
              </div>
            </div>
            <div className="p-3.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[0.58rem] font-semibold text-cta">
                  08{String.fromCharCode(65 + index)}
                </span>
                <h5 className="text-sm font-semibold">{alternate.label}</h5>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {alternate.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ConceptCard({
  concept,
}: {
  concept: (typeof logoConcepts)[number]
}) {
  return (
    <article
      id={concept.id}
      className="group overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_18px_60px_rgba(15,43,29,0.07)]"
    >
      <div className="flex items-start justify-between gap-5 border-b border-border/60 p-5 sm:p-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[0.65rem] font-semibold tracking-[0.16em] text-cta">
              {concept.number}
            </span>
            <Eyebrow>{concept.name}</Eyebrow>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {concept.rationale}
          </p>
        </div>
        <LogoSymbol
          conceptId={concept.id}
          className="size-12 transition-transform duration-500 group-hover:scale-105 sm:size-14"
          title={`${concept.name} logo`}
        />
      </div>

      <div className="grid min-h-52 place-items-center bg-background/45 p-8 sm:p-10">
        <LogoLockup
          concept={concept}
          symbolClassName="size-16 sm:size-20"
          className="scale-105 sm:scale-110"
        />
      </div>

      <div className="grid border-y border-border/60 lg:grid-cols-2">
        <div className="border-b border-border/60 lg:border-r lg:border-b-0">
          <div className="border-b border-border/60 bg-muted/30 px-4 py-2 text-[0.58rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Light navigation
          </div>
          <MiniNavigation concept={concept} tone="paper" />
        </div>
        <div>
          <div className="border-b border-border/60 bg-muted/30 px-4 py-2 text-[0.58rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Forest navigation
          </div>
          <MiniNavigation concept={concept} tone="forest" />
        </div>
      </div>

      <HeroApplication concept={concept} />

      {concept.id === "indus-i" ? <DropIStudies /> : null}

      <div className="space-y-4 p-5 sm:p-6">
        <ScaleTest concept={concept} />
        <div className="flex flex-wrap gap-2">
          {concept.cues.map((cue) => (
            <Badge key={cue} variant="secondary">
              {cue}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  )
}

function LogoOptionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Brand exploration · 2026"
        title="A cleaner evolution of Indus."
        body="Eight modern vector directions built from the existing identity’s most memorable ingredients: the water drop, the leaf canopy, and the meeting of agriculture and infrastructure."
        cta={{ label: "Compare the options", href: "#options" }}
      />

      <Section id="options" className="bg-background">
        <div className="mb-10 grid gap-6 border-b border-border/70 pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Identity studies</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Familiar at heart. Sharper in form.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Every option carries forward the old logo’s drop or leaf
              language, reduced to clean geometry and tested as a primary
              lockup, navigation signature, hero application, and small icon.
              The live website logo remains unchanged.
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">8 concepts</Badge>
            <Badge variant="outline">Vector SVG</Badge>
            <Badge variant="outline">Drop + leaf heritage</Badge>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2 xl:gap-8">
          {logoConcepts.map((concept) => (
            <ConceptCard key={concept.id} concept={concept} />
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-forest px-6 py-10 text-center text-forest-foreground sm:px-10 sm:py-14">
          <Eyebrow className="text-cta">Next step</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl sm:text-4xl">
            Shortlist two directions, then refine one.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-forest-foreground/70 sm:text-base">
            The selected route can be developed into final horizontal,
            stacked, monochrome, favicon, signage, and social variants.
          </p>
          <Button variant="cta" className="mt-7" asChild>
            <a href="#options">Review all eight</a>
          </Button>
        </div>
      </Section>
    </main>
  )
}
