import {
  coldChain,
  infrastructure as infraItems,
  qualityLabs,
} from "@/content/facilities"
import { landing } from "@/content/landing"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { SectionBand } from "@/lib/section-band"

const categories = [
  {
    title: "Processing",
    items: [
      "Aseptic processing",
      "Pulping",
      "IQF (2 MT/H)",
      "Deep freeze / blast freezing",
      "Shared processing lines",
    ],
  },
  {
    title: "Cold Chain",
    items: coldChain
      .filter((item) =>
        ["Cold storage", "Ripening chambers", "Blast freezer", "IQF line with packaging hall"].includes(
          item.name
        )
      )
      .map((item) => `${item.name} · ${item.capacity} (${item.detail})`),
  },
  {
    title: "Packaging & Warehousing",
    items: coldChain
      .filter((item) => ["Dry warehouse", "Pack house"].includes(item.name))
      .map((item) => `${item.name} · ${item.capacity}`),
  },
  {
    title: "Quality & Testing",
    items: qualityLabs.map((lab) => `${lab} testing`),
  },
  {
    title: "Utilities & Infrastructure",
    items: infraItems.map((item) => `${item.name} · ${item.spec}`),
  },
] as const

export function FacilitiesCategories() {
  const { facilityCategories } = landing

  return (
    <SectionBand tone="secondary-30" to="background">
      <Section id={facilityCategories.id} className="bg-transparent">
        <Reveal className="max-w-2xl">
          <Eyebrow>{facilityCategories.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl">{facilityCategories.title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {facilityCategories.body}
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <MotionItem key={category.title}>
              <article className="h-full rounded-2xl bg-card p-6 ring-1 ring-foreground/8">
                <h3 className="font-heading text-lg font-semibold">{category.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {category.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </MotionItem>
          ))}
        </Stagger>
      </Section>
    </SectionBand>
  )
}
