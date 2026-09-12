import { createFileRoute } from "@tanstack/react-router"
import studies from "@/components/brand/branding-studies.json"
import { landing } from "@/content/landing"
import { site } from "@/content/site"
import { seoHead } from "@/lib/seo"

export const Route = createFileRoute("/branding")({
  head: () =>
    seoHead({
      title: "Branding | Indus Best Mega Food Park",
      description:
        "The original Indus identity, corrected colors and four canopy refinements.",
      path: "/branding",
      noindex: true,
    }),
  component: BrandingPage,
})
const eyebrow = "text-[10px] font-semibold uppercase tracking-[0.18em]"
const asset = (id: string, palette = "forest", variant = "horizontal") =>
  `/brand/branding/${id}/${palette}/${variant}.svg`
const mockups = [
  { id: "cap", label: "Cap" },
  { id: "billboard", label: "Billboard" },
  { id: "campus", label: "Campus gate" },
] as const

function LandingHeroPreview({ id, name }: { id: string; name: string }) {
  const hero = landing.hero
  return (
    <section className="border-t border-[#d5ddd2]">
      <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4 md:px-8">
        <p className={`${eyebrow} text-[#70806e]`}>On the landing page / Hero</p>
        <span className="text-xs text-[#5f7162]">{name} in the live header</span>
      </div>
      <div className="bg-[#164b35] text-white">
        <div className="flex items-center justify-between gap-4 border-b border-white/15 px-5 py-3 md:px-8">
          <img
            src={asset(id, "forest", "reversed")}
            alt={`${name} in the site header`}
            className="h-8 w-auto md:h-9"
          />
          <p className="hidden text-xs text-white/70 lg:block">
            {site.nav.map((item) => item.label).join("  ·  ")}
          </p>
          <span className="rounded-md bg-[#d4a84b] px-3 py-1.5 text-xs font-semibold text-[#2a2110]">
            Enquire now
          </span>
        </div>
        <div className="grid md:grid-cols-[1.15fr_1fr]">
          <div className="px-5 py-8 md:px-8 md:py-10">
            <p className={`${eyebrow} text-[#d4a84b]`}>{hero.eyebrow}</p>
            <h4 className="mt-3 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
              {hero.headline}
            </h4>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/75">
              {hero.body}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-md bg-[#d4a84b] px-4 py-2 text-sm font-semibold text-[#2a2110]">
                {hero.primaryCta.label}
              </span>
              <span className="rounded-md border border-white/30 px-4 py-2 text-sm">
                {hero.secondaryCta.label}
              </span>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-white/15 pt-5 sm:grid-cols-4">
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-lg font-semibold">{stat.value}</dt>
                  <dd className="text-[10px] tracking-wide text-white/60 uppercase">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-52">
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ApplicationMockups({ id, name }: { id: string; name: string }) {
  return (
    <section className="border-t border-[#d5ddd2] p-6 md:p-8">
      <p className={`${eyebrow} mb-6 text-[#70806e]`}>
        In the world / Three mockups
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {mockups.map((mockup) => (
          <figure
            key={mockup.id}
            className="overflow-hidden rounded-xl border border-[#d5ddd2] bg-[#f7f8f2]"
          >
            <img
              src={`/brand/mockups/${id}/${mockup.id}.png`}
              alt={`${name} on a ${mockup.label.toLowerCase()}`}
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="px-4 py-3 text-xs font-semibold">
              {mockup.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function BrandingPage() {
  return (
    <main className="bg-[#f7f8f2] font-sans text-[#183d2d]">
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-10">
        <div className="flex flex-wrap justify-between gap-3 border-b border-[#d5ddd2] pb-5">
          <p className={eyebrow}>Indus Best / Branding</p>
          <a
            href="/logo-options"
            className="text-xs text-[#5f7162] underline underline-offset-4"
          >
            View earlier explorations ↗
          </a>
        </div>
        <div className="grid items-end gap-7 py-12 md:grid-cols-[1.4fr_1fr]">
          <h1 className="font-sans text-5xl leading-[1.05] font-semibold tracking-[-0.045em] md:text-7xl">
            Still Indus.
            <br />
            <span className="text-[#789549]">Simply clearer.</span>
          </h1>
          <p className="max-w-md text-base leading-7 text-[#5f7162]">
            Keep the identity people know. Refine the canopy, protect the
            familiar arch and bring the colors into balance. Three close
            variations of your preferred mark, plus a simpler leaf-and-drop
            alternative, alongside the actual original.
          </p>
        </div>
        <nav
          aria-label="Branding sections"
          className="flex flex-wrap gap-3 text-sm"
        >
          <a
            href="#original"
            className="rounded-full bg-[#164b35] px-5 py-3 text-white"
          >
            Original, recolored ↓
          </a>
          <a
            href="#refinements"
            className="rounded-full border border-[#cbd7c7] px-5 py-3"
          >
            Four refinements ↓
          </a>
          <a
            href="#familiar"
            className="rounded-full border border-[#cbd7c7] px-5 py-3"
          >
            Hero & mockups ↓
          </a>
        </nav>
      </section>
      <section
        id="original"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-16 md:px-10"
      >
        <div className="mb-7">
          <p className={`${eyebrow} text-[#70806e]`}>
            01 / The original identity
          </p>
          <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight">
            Your original. Better-balanced color.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5f7162]">
            These are recolors of your supplied SVG, preserving its exact
            canopy, drop, proportions and IBMFP lettering. The brighter cyan and
            green are replaced with calmer, coordinated tones.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[0.8fr_2fr]">
          <figure className="flex flex-col justify-center rounded-2xl border border-[#d5ddd2] bg-[#edf0e6] p-7">
            <p className={`${eyebrow} text-[#70806e]`}>As supplied</p>
            <img
              src="/brand/references/original-color.svg"
              alt="Original Indus logo with bright cyan field and green canopy"
              className="mx-auto my-8 w-56 max-w-full"
            />
            <figcaption className="text-sm font-semibold">
              Original blue & green
            </figcaption>
            <p className="mt-2 text-xs leading-6 text-[#5f7162]">
              The reference artwork, before color correction.
            </p>
          </figure>
          <div className="grid gap-4 sm:grid-cols-2">
            {studies.palettes.map((p) => (
              <figure
                key={p.id}
                className="rounded-2xl border border-[#d5ddd2] bg-white p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className={eyebrow}>{p.name}</p>
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span
                      className="size-4 rounded-full"
                      style={{ backgroundColor: p.field }}
                    />
                    <span
                      className="size-4 rounded-full"
                      style={{ backgroundColor: p.canopy }}
                    />
                  </span>
                </div>
                <img
                  src={`/brand/original-corrected/${p.id}.svg`}
                  alt={`Original logo recolored in ${p.name}`}
                  className="mx-auto my-7 h-28 max-w-full"
                />
                <figcaption className="text-xs leading-6 text-[#5f7162]">
                  {p.note}
                </figcaption>
                <p className="mt-3 font-mono text-[10px] text-[#70806e]">
                  {p.field} / {p.canopy}
                </p>
                <a
                  href={`/brand/original-corrected/${p.id}.svg`}
                  download
                  className="mt-4 inline-block text-xs font-semibold underline underline-offset-4"
                >
                  Download original SVG ↓
                </a>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section
        id="refinements"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-16 md:px-10"
      >
        <p className={`${eyebrow} text-[#70806e]`}>
          02 / Four refinements
        </p>
        <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight">
          The familiar canopy, four ways.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5f7162]">
          Three stay close to the filled badge you liked. Open Canopy keeps only
          the leaf and the water drop. Every color version is shown together so
          you can compare them directly.
        </p>
        <div className="my-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {studies.options.map((o, i) => (
            <a
              key={o.id}
              href={`#${o.id}`}
              className="rounded-xl border border-[#d5ddd2] bg-white p-5"
            >
              <img
                src={asset(o.id, "forest", "symbol")}
                alt={`${o.name} symbol`}
                className="mx-auto mb-4 size-16"
              />
              <p className="text-xs font-semibold">
                0{i + 1} / {o.name}
              </p>
            </a>
          ))}
        </div>
        <div className="space-y-8">
          {studies.options.map((o, i) => (
            <article
              key={o.id}
              id={o.id}
              className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#d5ddd2] bg-white"
            >
              <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[#d5ddd2] p-6 md:p-8">
                <div>
                  <p className={`${eyebrow} text-[#70806e]`}>
                    Refinement 0{i + 1}
                  </p>
                  <h3 className="mt-2 font-sans text-2xl font-semibold">
                    {o.name}
                  </h3>
                </div>
                <span className="rounded-full bg-[#edf2df] px-4 py-2 text-xs font-medium">
                  {o.tag}
                </span>
              </header>
              <div className="grid md:grid-cols-[1.2fr_1fr]">
                <div className="flex min-h-52 items-center justify-center bg-[#f1f4e9] p-8">
                  <img
                    src={asset(o.id)}
                    alt={`${o.name} primary horizontal logo`}
                    className="w-full max-w-sm"
                  />
                </div>
                <p className="flex items-center p-7 text-sm leading-7 text-[#5f7162] md:p-10">
                  {o.note}
                </p>
              </div>
              <LandingHeroPreview id={o.id} name={o.name} />
              <ApplicationMockups id={o.id} name={o.name} />
              <div className="border-t border-[#d5ddd2] p-6 md:p-8">
                <p className={`${eyebrow} mb-6 text-[#70806e]`}>
                  Color comparison / All four palettes
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {studies.palettes.map((p) => (
                    <figure
                      key={p.id}
                      className="rounded-xl border border-[#d5ddd2] p-5"
                    >
                      <p className="text-xs font-semibold">{p.name}</p>
                      <img
                        src={asset(o.id, p.id)}
                        alt={`${o.name} in ${p.name}`}
                        className="my-6 w-full max-w-72"
                      />
                      <figcaption className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#5f7162]">
                        <a
                          download
                          href={asset(o.id, p.id)}
                          className="underline underline-offset-4"
                        >
                          Horizontal SVG ↓
                        </a>
                        <a
                          download
                          href={asset(o.id, p.id, "symbol")}
                          className="underline underline-offset-4"
                        >
                          Symbol SVG ↓
                        </a>
                        <a
                          download
                          href={asset(o.id, p.id, "primary")}
                          className="underline underline-offset-4"
                        >
                          Stacked SVG ↓
                        </a>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
              <div className="grid border-t border-[#d5ddd2] sm:grid-cols-3">
                <div className="p-6">
                  <p className={`${eyebrow} mb-5 text-[#70806e]`}>Black</p>
                  <img
                    src={asset(o.id, "forest", "monochrome")}
                    alt={`${o.name} in black`}
                    className="w-full max-w-60"
                  />
                </div>
                <div className="bg-[#164b35] p-6">
                  <p className={`${eyebrow} mb-5 text-white/70`}>White</p>
                  <img
                    src={asset(o.id, "forest", "reversed")}
                    alt={`${o.name} in white`}
                    className="w-full max-w-60"
                  />
                </div>
                <div className="p-6">
                  <p className={`${eyebrow} mb-5 text-[#70806e]`}>
                    Symbol / actual pixels
                  </p>
                  <div className="flex items-end gap-5">
                    {[48, 32, 24].map((size) => (
                      <div key={size}>
                        <img
                          src={asset(o.id, "forest", "symbol")}
                          alt={`${o.name} at ${size} pixels`}
                          style={{ width: size, height: size }}
                        />
                        <p className="mt-2 text-[10px] text-[#70806e]">
                          {size}px
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <details className="border-t border-[#d5ddd2] p-6">
                <summary className="cursor-pointer text-sm font-semibold">
                  Complete logo files
                </summary>
                <div className="mt-4 flex flex-wrap gap-4 text-xs">
                  {[
                    "primary",
                    "horizontal",
                    "compact",
                    "symbol",
                    "monochrome",
                    "reversed",
                  ].map((v) => (
                    <a
                      key={v}
                      download
                      href={asset(o.id, "forest", v)}
                      className="capitalize underline underline-offset-4"
                    >
                      {v} SVG ↓
                    </a>
                  ))}
                </div>
              </details>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-[#164b35] px-6 py-12 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_2fr]">
          <img
            src={asset("familiar", "forest", "reversed")}
            alt="Recommended Familiar Canopy identity in white"
            className="w-full max-w-xs"
          />
          <div>
            <p className={`${eyebrow} text-[#b6cc97]`}>
              Recommended starting point
            </p>
            <h2 className="mt-3 font-sans text-2xl font-semibold">
              Familiar Canopy · Forest & Leaf
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">
              This keeps the mark you liked and gives the name more room to
              breathe. Choose River & Forest if continuity with the original
              blue-and-green colors is the priority.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
