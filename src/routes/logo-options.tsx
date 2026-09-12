import { createFileRoute } from "@tanstack/react-router"
import { LogoArtwork, logoConcepts } from "@/components/brand/logo-concepts"
import type { LogoConcept } from "@/components/brand/logo-concepts"
import { seoHead } from "@/lib/seo"

export const Route = createFileRoute("/logo-options")({
  head: () =>
    seoHead({
      title: "A new mark for Indus | Logo exploration",
      description:
        "Five minimal vector identities for Indus Best Mega Food Park.",
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
const label = "text-[10px] font-semibold uppercase tracking-[0.16em]"
function ConceptCard({ concept }: { concept: LogoConcept }) {
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
      <details className="border-t border-[#d8dfd5] p-6">
        <summary className="cursor-pointer text-sm font-semibold">
          Download SVG files · 10 variants
        </summary>
        <div className="mt-4 flex flex-wrap gap-2">
          {variants.map((variant) => (
            <a
              key={variant}
              download
              href={`/brand/${concept.id}/${variant}.svg`}
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
  return (
    <main className="bg-[#fafbf7] font-sans text-[#173c2b]">
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10 md:pt-24">
        <div className="flex flex-wrap justify-between gap-3 border-b border-[#d8dfd5] pb-5">
          <p className={label}>Indus Best Mega Food Park</p>
          <p className={`${label} text-[#657365]`}>
            Identity exploration / 01—05
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
              Five simple identities for a connected food industry. Built from
              purposeful geometry, open space and a confident, human sans-serif.
            </p>
            <a
              href="#concepts"
              className="mt-6 inline-block border-b border-[#164b35] pb-1 text-sm font-semibold"
            >
              Explore the five directions ↓
            </a>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2 md:gap-4">
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
        <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-[#5c695f]">
          <span>Palette</span>
          {[
            ["#164B35", "Forest"],
            ["#78AF45", "Fresh green"],
          ].map(([color, name]) => (
            <span key={color} className="flex items-center gap-2">
              <span
                className="size-4 rounded-full"
                style={{ background: color }}
              />
              {name} · {color}
            </span>
          ))}
          <span>Inter / outlined wordmarks</span>
          <span>Flat SVG / transparent cutouts</span>
        </div>
      </section>
      <section
        id="concepts"
        className="mx-auto grid max-w-7xl gap-8 px-6 pb-16 md:px-10"
      >
        {logoConcepts.map((c) => (
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
                The most complete response to the brief: a memorable leaf-block
                silhouette, a seed revealed through negative space, and enough
                structural weight to represent a food industry campus. It works
                independently of the name and keeps its character in one color.
              </p>
              <p className="mt-4 text-sm text-white/65">
                Design assessment below uses a 1–5 scale. These are comparative
                judgments, not audience research or trademark clearance.
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
  )
}
