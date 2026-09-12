import { useContext, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import {
  LogoArtwork,
  logoConcepts,
  LogoPaletteContext,
  logoPalettes,
  logoAssetUrl,
} from "@/components/brand/logo-concepts"
import type { LogoConcept } from "@/components/brand/logo-concepts"
import { seoHead } from "@/lib/seo"

export const Route = createFileRoute("/logo-options")({
  head: () =>
    seoHead({
      title: "A new mark for Indus | Logo exploration",
      description:
        "Twelve minimal vector identities for Indus Best Mega Food Park.",
      path: "/logo-options",
      noindex: true,
    }),
  component: LogoOptionsPage,
})

const variants = [
  "primary",
  "horizontal",
  "compact",
  "symbol",
  "monochrome",
  "reversed",
  "green",
  "symbol-black",
  "symbol-white",
  "symbol-green",
]
function HeroPreview({ concept }: { concept: LogoConcept }) {
  const palette = useContext(LogoPaletteContext)
  return (
    <section
      aria-label={`${concept.name} hero preview`}
      className="border-t border-[#d8dfd5]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f3f5ec] px-6 py-4">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-[#657365] uppercase">
          In context / Website hero
        </p>
        <span className="text-xs text-[#657365]">{concept.name}</span>
      </div>
      <div className="text-white" style={{ backgroundColor: palette.main }}>
        <div className="flex items-center justify-between gap-4 border-b border-white/15 px-6 py-5 md:px-10">
          <LogoArtwork
            concept={concept}
            variant="reversed"
            className="w-48 max-w-[65%]"
          />
          <span className="hidden text-xs text-white/75 sm:block">
            About us / Facilities / Investors
          </span>
          <span aria-hidden="true" className="text-xl sm:hidden">
            ☰
          </span>
        </div>
        <div className="grid md:grid-cols-[1.15fr_1fr]">
          <div className="px-6 py-10 md:px-10 md:py-14">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-[#b4cf91] uppercase">
              A connected food ecosystem
            </p>
            <h3 className="mt-4 font-sans text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl">
              Great food businesses
              <br />
              grow here.
            </h3>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/75">
              From harvest to market. The space, infrastructure and connections
              to build your next chapter.
            </p>
            <a
              href="/facilities"
              className="mt-7 inline-flex items-center gap-6 rounded-md bg-[#d9ebac] px-5 py-3 text-sm font-semibold text-[#123c2d] hover:bg-white"
            >
              Explore the park <span aria-hidden="true">↗</span>
            </a>
            <div className="mt-9 flex items-center gap-3 border-t border-white/15 pt-5">
              <LogoArtwork
                concept={concept}
                variant="symbol-white"
                className="size-8"
              />
              <span className="text-xs text-white/65">
                Rooted in agriculture. Built for business.
              </span>
            </div>
          </div>
          <div className="relative min-h-64 overflow-hidden">
            <img
              src="/images/admin-building.jpg"
              alt="Indus Best Mega Food Park campus building"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute right-5 bottom-5 left-5 flex items-center gap-4 rounded-lg bg-[#f3f5ec] p-5 text-[#164b35]">
              <LogoArtwork
                concept={concept}
                variant="symbol"
                className="size-12"
              />
              <div>
                <p className="text-sm font-semibold">
                  A place to make more possible.
                </p>
                <p className="mt-1 text-xs text-[#657365]">
                  Indus Best Mega Food Park · Raipur
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const label = "text-[10px] font-semibold uppercase tracking-[0.16em]"
function ConceptCard({ concept }: { concept: LogoConcept }) {
  const palette = useContext(LogoPaletteContext)
  return (
    <article
      id={concept.id}
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#d8dfd5] bg-white"
    >
      <div className="flex items-start justify-between gap-6 border-b border-[#d8dfd5] p-6 md:p-8">
        <div>
          <p className={`${label} text-[#657365]`}>Concept {concept.number}</p>
          <h2 className="mt-2 font-sans text-2xl font-semibold tracking-tight">
            {concept.name}
          </h2>
        </div>
        {Number(concept.number) >= 6 && (
          <span className="rounded-full bg-[#164b35] px-3 py-2 text-xs font-semibold text-white">
            {Number(concept.number) >= 10
              ? "Original refined"
              : "New direction"}
          </span>
        )}
        {concept.number === "01" && (
          <span className="rounded-full bg-[#e9f0dc] px-3 py-2 text-xs font-semibold">
            Recommended
          </span>
        )}
      </div>
      <div className="grid md:grid-cols-[1.2fr_1fr]">
        <div className="relative flex min-h-72 items-center justify-center bg-[#f3f5ec] p-9">
          <span className={`${label} absolute top-5 left-6 text-[#657365]`}>
            Primary identity
          </span>
          <LogoArtwork
            concept={concept}
            variant="primary"
            className="w-full max-w-72"
          />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <h3 className="font-sans text-xl font-semibold">{concept.idea}</h3>
          <p className="mt-4 text-sm leading-7 text-[#5c695f]">
            {concept.rationale}
          </p>
          <p className="mt-5 border-l-2 border-[#78af45] pl-4 text-sm leading-6">
            {concept.strength}
          </p>
        </div>
      </div>
      <div className="grid border-y border-[#d8dfd5] md:grid-cols-2">
        <div className="p-6">
          <p className={`${label} mb-6 text-[#657365]`}>
            Horizontal / website & documents
          </p>
          <LogoArtwork concept={concept} className="h-16 max-w-full" />
        </div>
        <div className="bg-[#164b35] p-6 text-white">
          <p className={`${label} mb-6 text-white/70`}>Reversed / pure white</p>
          <LogoArtwork
            concept={concept}
            variant="reversed"
            className="h-16 max-w-full"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-3">
        <div className="p-6">
          <p className={`${label} mb-6 text-[#657365]`}>Compact</p>
          <LogoArtwork
            concept={concept}
            variant="compact"
            className="h-12 max-w-full"
          />
        </div>
        <div className="bg-[#f6f6f2] p-6">
          <p className={`${label} mb-6 text-[#657365]`}>Single-color green</p>
          <LogoArtwork
            concept={concept}
            variant="symbol-green"
            className="size-12"
          />
        </div>
        <div className="p-6">
          <p className={`${label} mb-6 text-[#657365]`}>
            Symbol / actual pixels
          </p>
          <div className="flex items-end gap-5">
            {[48, 32, 24].map((size) => (
              <div key={size} style={{ width: size }}>
                <LogoArtwork
                  concept={concept}
                  variant="symbol"
                  className="w-full"
                />
                <span className="mt-2 block text-[10px] text-[#657365]">
                  {size}px
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#d8dfd5] p-6">
        <span className={`${label} text-[#657365]`}>
          Black / transparent background
        </span>
        <LogoArtwork
          concept={concept}
          variant="monochrome"
          className="h-12 max-w-full"
        />
      </div>
      <HeroPreview concept={concept} />
      <details className="border-t border-[#d8dfd5] p-6">
        <summary className="cursor-pointer text-sm font-semibold">
          Download SVG files · {palette.name}
        </summary>
        <div className="mt-4 flex flex-wrap gap-2">
          {variants.map((variant) => (
            <a
              key={variant}
              download
              href={logoAssetUrl(concept.id, variant, palette.id)}
              className="rounded-md border border-[#d8dfd5] px-3 py-2 text-xs capitalize hover:bg-[#e9f0dc] focus-visible:outline-2"
            >
              {variant.replaceAll("-", " ")} ↓
            </a>
          ))}
        </div>
      </details>
    </article>
  )
}

function LogoOptionsPage() {
  const [palette, setPalette] = useState(logoPalettes[0])
  return (
    <LogoPaletteContext.Provider value={palette}>
      <main className="bg-[#fafbf7] font-sans text-[#173c2b]">
        <div className="sticky top-16 z-20 flex flex-wrap items-center justify-center gap-3 border-b border-[#d8dfd5] bg-[#fafbf7] px-5 py-3">
          <label htmlFor="logo-palette" className="text-xs font-semibold">
            Logo palette
          </label>
          <select
            id="logo-palette"
            value={palette.id}
            onChange={(event) =>
              setPalette(
                logoPalettes.find(
                  (option) => option.id === event.target.value
                ) ?? logoPalettes[0]
              )
            }
            className="rounded-md border border-[#d8dfd5] bg-white px-3 py-2 text-xs"
          >
            {logoPalettes.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="size-4 rounded-full"
            style={{ backgroundColor: palette.main }}
          />
          <span
            aria-hidden="true"
            className="size-4 rounded-full"
            style={{ backgroundColor: palette.accent }}
          />
        </div>
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-24">
          <div className="flex flex-wrap justify-between gap-3 border-b border-[#d8dfd5] pb-5">
            <p className={label}>Indus Best Mega Food Park</p>
            <p className={`${label} text-[#657365]`}>
              Identity exploration / 01—12
            </p>
          </div>
          <div className="grid items-end gap-8 py-12 md:grid-cols-[1.5fr_1fr]">
            <h1 className="font-sans text-5xl leading-[1.06] font-semibold tracking-[-0.055em] md:text-7xl">
              A place for food.
              <br />
              <span className="text-[#729344]">A mark for growth.</span>
            </h1>
            <div>
              <p className="max-w-md text-base leading-7 text-[#5c695f]">
                Twelve simple identities for a connected food industry. Built
                from purposeful geometry, open space and a confident, human
                sans-serif.
              </p>
              <a
                href="#concepts"
                className="mt-6 inline-block border-b border-[#164b35] pb-1 text-sm font-semibold"
              >
                Explore the twelve directions ↓
              </a>
              <a
                href="/branding"
                className="mt-4 block text-sm font-semibold underline underline-offset-4"
              >
                See the original identity on /branding →
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-4 lg:grid-cols-5">
            {logoConcepts.map((c) => (
              <a
                href={`#${c.id}`}
                key={c.id}
                className="group rounded-xl border border-[#d8dfd5] p-3 transition-colors hover:bg-[#e9f0dc] md:p-6"
              >
                <LogoArtwork
                  concept={c}
                  variant="symbol"
                  className="mx-auto my-4 w-full max-w-20"
                />
                <p className={`${label} text-[#657365]`}>{c.number}</p>
                <p className="mt-1 hidden text-sm font-semibold md:block">
                  {c.name}
                </p>
              </a>
            ))}
          </div>
          <section
            aria-label="Logo color palettes"
            className="mt-10 rounded-2xl border border-[#d8dfd5] bg-white p-5 md:p-8"
          >
            <p className={`${label} text-[#657365]`}>
              Color exploration / Six directions
            </p>
            <h2 className="mt-3 font-sans text-2xl font-semibold">
              Same mark. A different personality.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5c695f]">
              Choose a palette to update all twelve logos, their hero previews
              and color SVG downloads. Black, white and single-green production
              proofs stay available for comparison.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {logoPalettes.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={palette.id === option.id}
                  onClick={() => setPalette(option)}
                  className="rounded-xl border-2 p-5 text-left transition-colors hover:bg-[#f3f5ec] focus-visible:outline-2 focus-visible:outline-offset-4"
                  style={{
                    borderColor:
                      palette.id === option.id ? option.main : "#e2e6de",
                    backgroundColor:
                      palette.id === option.id ? "#f3f5ec" : undefined,
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <img
                      src={logoAssetUrl(
                        "organic-food-hub",
                        "symbol",
                        option.id
                      )}
                      alt={`${option.name} color sample`}
                      className="size-14"
                    />
                    <span className="flex gap-2" aria-hidden="true">
                      <span
                        className="size-7 rounded-full"
                        style={{ backgroundColor: option.main }}
                      />
                      <span
                        className="size-7 rounded-full"
                        style={{ backgroundColor: option.accent }}
                      />
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-semibold">
                    {option.name}
                    {palette.id === option.id ? " ✓" : ""}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[#5c695f]">
                    {option.note}
                  </p>
                  <p className="mt-3 font-mono text-[10px] text-[#657365]">
                    {option.main} / {option.accent}
                  </p>
                </button>
              ))}
            </div>
            <p role="status" className="mt-5 text-sm font-medium">
              Viewing {palette.name} · 12 concepts · 48 color SVGs
            </p>
          </section>
        </section>
        <section
          id="concepts"
          className="mx-auto grid max-w-7xl gap-8 px-6 pb-16 md:px-10"
        >
          {logoConcepts
            .filter((c) => Number(c.number) < 10)
            .map((c) => (
              <ConceptCard key={c.id} concept={c} />
            ))}
          <section
            id="original-refinements"
            className="scroll-mt-36 rounded-2xl border border-[#d8dfd5] bg-white p-6 md:p-10"
          >
            <p className={`${label} text-[#657365]`}>
              10—12 / Original identity, refined
            </p>
            <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight">
              A clearer version of a familiar face.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5c695f]">
              Three refinements drawn from your supplied SVGs. We keep the arch,
              agriculture and water story, simplify the geometry, and bring the
              colors into the selected palette. The references below are shown
              as supplied so you can compare.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {[
                {
                  file: "original-color",
                  name: "Group 1 · Original colors",
                  note: "Blue field, green canopy and highlighted drop.",
                },
                {
                  file: "original-forest",
                  name: "Group 2 · Dark-green study",
                  note: "The same geometry with a pale field and blue drop.",
                },
                {
                  file: "base-fragment",
                  name: "Clip path group · Base only",
                  note: "A clipped strip, not a complete logo. Used as a foundation reference.",
                },
              ].map((reference) => (
                <figure
                  key={reference.file}
                  className="rounded-xl border border-[#d8dfd5] bg-[#fafbf7] p-5"
                >
                  <div className="flex h-36 items-center justify-center">
                    <img
                      src={`/brand/references/${reference.file}.svg`}
                      alt={reference.name}
                      className="max-h-32 w-full max-w-44"
                    />
                  </div>
                  <figcaption className="mt-4 text-sm font-semibold">
                    {reference.name}
                  </figcaption>
                  <p className="mt-2 text-xs leading-5 text-[#657365]">
                    {reference.note}
                  </p>
                </figure>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-[#5c695f]">
              The refinements use clean filled paths and transparent openings.
              No leaf veins, drop highlights, embedded lettering, masks or
              clipping. Each includes hero previews, all six color palettes, and
              SVG downloads.
            </p>
          </section>
          {logoConcepts
            .filter((c) => Number(c.number) >= 10)
            .map((c) => (
              <ConceptCard key={c.id} concept={c} />
            ))}
        </section>
        <section className="bg-[#164b35] px-6 py-16 text-white md:px-10">
          <div className="mx-auto max-w-6xl">
            <p className={`${label} text-[#b4cf91]`}>
              Our recommendation / Concept 01
            </p>
            <div className="mt-6 grid gap-8 md:grid-cols-[1fr_2fr]">
              <LogoArtwork
                concept={logoConcepts[0]}
                variant="symbol-white"
                className="size-36"
              />
              <div>
                <h2 className="font-sans text-4xl font-semibold tracking-tight">
                  Organic Food Hub
                </h2>
                <p className="mt-5 max-w-2xl leading-7 text-white/80">
                  The most complete response to the brief: a memorable
                  leaf-block silhouette, a seed revealed through negative space,
                  and enough structural weight to represent a food industry
                  campus. It works independently of the name and keeps its
                  character in one color.
                </p>
                <p className="mt-4 text-sm text-white/65">
                  Design assessment below uses a 1–5 scale. These are
                  comparative judgments, not audience research or trademark
                  clearance.
                </p>
              </div>
            </div>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr>
                    {[
                      "Concept",
                      "Memory",
                      "Simplicity",
                      "Food relevance",
                      "Scale",
                      "Distinctiveness",
                      "Standalone",
                    ].map((x) => (
                      <th
                        key={x}
                        className="border-b border-white/25 px-3 py-4 font-medium text-white/65"
                      >
                        {x}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {logoConcepts.map((c) => (
                    <tr
                      key={c.id}
                      className={c.number === "01" ? "bg-white/10" : ""}
                    >
                      <th className="px-3 py-4 font-medium">{c.name}</th>
                      {c.scores.map((s, i) => (
                        <td key={i} className="px-3 py-4">
                          {s}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {logoConcepts.map((c) => (
                <p key={c.id} className="text-sm leading-6 text-white/70">
                  <strong className="text-white">{c.number} / </strong>
                  {c.tradeoff}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
    </LogoPaletteContext.Provider>
  )
}
