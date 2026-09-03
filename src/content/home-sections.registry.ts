import { z } from "zod"

import { landing } from "@/content/landing"
import { mergeContent } from "@/lib/content-merge"

const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
})

const sectionIntroSchema = z.object({
  eyebrow: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  body: z.string().min(1).optional(),
})

export const heroSectionPatchSchema = z.object({
  eyebrow: z.string().min(1).optional(),
  headline: z.string().min(1).optional(),
  body: z.string().min(1).optional(),
  primaryCta: ctaSchema.optional(),
  secondaryCta: ctaSchema.optional(),
  stats: z
    .array(z.object({ value: z.string().min(1), label: z.string().min(1) }))
    .optional(),
  slides: z
    .array(
      z.object({
        headline: z.string().min(1).optional(),
        body: z.string().min(1).optional(),
      }),
    )
    .optional(),
})

export const logoStripSectionPatchSchema = z.object({
  label: z.string().min(1).optional(),
  items: z
    .array(z.object({ name: z.string().min(1), logo: z.string().optional() }))
    .optional(),
})

export const socialProofSectionPatchSchema = sectionIntroSchema

export const whySectionPatchSchema = sectionIntroSchema.extend({
  advantages: z
    .array(
      z.object({
        title: z.string().min(1).optional(),
        body: z.string().min(1).optional(),
      }),
    )
    .optional(),
})

export const whoIsItForSectionPatchSchema = sectionIntroSchema.extend({
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        subtitle: z.string().min(1).optional(),
        body: z.string().min(1),
        cta: ctaSchema,
        icon: z.enum(["factory", "building", "expand", "sprout"]).optional(),
      }),
    )
    .optional(),
})

export const ecosystemFlowSectionPatchSchema = sectionIntroSchema.extend({
  steps: z
    .array(
      z.object({
        title: z.string().min(1),
        detail: z.string().min(1),
      }),
    )
    .optional(),
})

export const campusFacilitiesSectionPatchSchema = z.object({
  campusOverview: sectionIntroSchema.optional(),
  facilityCategories: sectionIntroSchema.optional(),
  processingCapabilities: sectionIntroSchema.optional(),
})

export const productsSectionPatchSchema = sectionIntroSchema.extend({
  cta: ctaSchema.optional(),
})

export const opportunitiesSectionPatchSchema = sectionIntroSchema.extend({
  quote: z.string().min(1).optional(),
  proofs: z.array(z.string().min(1)).optional(),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        kicker: z.string().optional(),
        body: z.string().min(1),
        metric: z.string().optional(),
        metricLabel: z.string().optional(),
        featured: z.boolean().optional(),
      }),
    )
    .optional(),
  cta: ctaSchema.optional(),
})

export const locationSectionPatchSchema = sectionIntroSchema.extend({
  benefits: z
    .array(
      z.object({
        title: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .optional(),
})

export const faqSectionPatchSchema = sectionIntroSchema.extend({
  items: z
    .array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
        link: ctaSchema.optional(),
      }),
    )
    .optional(),
  cta: ctaSchema.optional(),
})

export const finalCtaSectionPatchSchema = z.object({
  title: z.string().min(1).optional(),
  body: z.string().min(1).optional(),
  primaryCta: ctaSchema.optional(),
  secondaryCta: ctaSchema.optional(),
})

export type HomeSectionKey = (typeof HOME_SECTION_KEYS)[number]

export const HOME_SECTION_KEYS = [
  "hero",
  "logoStrip",
  "socialProof",
  "why",
  "whoIsItFor",
  "ecosystemFlow",
  "campusFacilities",
  "products",
  "opportunities",
  "location",
  "faq",
  "finalCta",
] as const

export type HomeSectionPatch = Record<
  string,
  string | number | boolean | null | HomeSectionPatch | HomeSectionPatch[]
>

type MutableLanding = {
  -readonly [K in keyof typeof landing]: typeof landing[K] extends readonly (infer U)[]
    ? U[]
    : typeof landing[K] extends object
      ? { -readonly [P in keyof typeof landing[K]]: (typeof landing)[K][P] }
      : (typeof landing)[K]
}

type SectionDefinition = {
  key: HomeSectionKey
  label: string
  defaultEnabled: boolean
  schema: z.ZodTypeAny
  apply: (target: MutableLanding, patch: HomeSectionPatch) => void
}

export const HOME_SECTION_DEFINITIONS: SectionDefinition[] = [
  {
    key: "hero",
    label: "Hero",
    defaultEnabled: true,
    schema: heroSectionPatchSchema,
    apply: (target, patch) => {
      const { slides, ...rest } = patch as {
        slides?: Record<string, unknown>[]
      } & Record<string, unknown>
      target.hero = mergeContent(target.hero, rest as never)
      if (Array.isArray(slides)) {
        target.hero.slides = target.hero.slides.map((slide, index) =>
          mergeContent(slide, slides[index] ?? {}),
        )
      }
    },
  },
  {
    key: "logoStrip",
    label: "Client logos",
    defaultEnabled: true,
    schema: logoStripSectionPatchSchema,
    apply: (target, patch) => {
      const { items, ...rest } = patch as {
        items?: Record<string, unknown>[]
      } & Record<string, unknown>
      target.clients = mergeContent(target.clients, rest as never)
      if (Array.isArray(items)) {
        target.clients.items = items.map((item, index) =>
          mergeContent(target.clients.items[index] ?? { name: "", logo: "" }, item ?? {}),
        ) as typeof target.clients.items
      }
    },
  },
  {
    key: "socialProof",
    label: "Social proof",
    defaultEnabled: false,
    schema: socialProofSectionPatchSchema,
    apply: (target, patch) => {
      target.socialProof = mergeContent(target.socialProof, patch as never)
    },
  },
  {
    key: "why",
    label: "Why this campus",
    defaultEnabled: true,
    schema: whySectionPatchSchema,
    apply: (target, patch) => {
      const { advantages, ...rest } = patch as {
        advantages?: { title?: string; body?: string }[]
      } & Record<string, unknown>
      target.why = mergeContent(target.why, rest as never)
      if (Array.isArray(advantages)) {
        target.why.advantages = target.why.advantages.map((item, index) =>
          mergeContent(item, advantages[index] ?? {}) as (typeof target.why.advantages)[number],
        )
      }
    },
  },
  {
    key: "whoIsItFor",
    label: "Who is it for",
    defaultEnabled: true,
    schema: whoIsItForSectionPatchSchema,
    apply: (target, patch) => {
      const { items, ...rest } = patch as {
        items?: Record<string, unknown>[]
      } & Record<string, unknown>
      target.audience = mergeContent(target.audience, rest as never)
      if (Array.isArray(items)) {
        target.audience.items = target.audience.items.map((item, index) =>
          mergeContent(item, items[index] ?? {}),
        )
      }
    },
  },
  {
    key: "ecosystemFlow",
    label: "Ecosystem flow",
    defaultEnabled: true,
    schema: ecosystemFlowSectionPatchSchema,
    apply: (target, patch) => {
      const { steps, ...rest } = patch as {
        steps?: Record<string, unknown>[]
      } & Record<string, unknown>
      target.ecosystem = mergeContent(target.ecosystem, rest as never)
      if (Array.isArray(steps)) {
        target.ecosystem.steps = target.ecosystem.steps.map((step, index) =>
          mergeContent(step, steps[index] ?? {}),
        )
      }
    },
  },
  {
    key: "campusFacilities",
    label: "Campus facilities",
    defaultEnabled: true,
    schema: campusFacilitiesSectionPatchSchema,
    apply: (target, patch) => {
      const p = patch as {
        campusOverview?: Record<string, unknown>
        facilityCategories?: Record<string, unknown>
        processingCapabilities?: Record<string, unknown>
      }
      if (p.campusOverview) {
        target.campusOverview = mergeContent(target.campusOverview, p.campusOverview as never)
      }
      if (p.facilityCategories) {
        target.facilityCategories = mergeContent(
          target.facilityCategories,
          p.facilityCategories as never,
        )
      }
      if (p.processingCapabilities) {
        target.processingCapabilities = mergeContent(
          target.processingCapabilities,
          p.processingCapabilities as never,
        )
      }
    },
  },
  {
    key: "products",
    label: "Products",
    defaultEnabled: true,
    schema: productsSectionPatchSchema,
    apply: (target, patch) => {
      target.products = mergeContent(target.products, patch as never)
    },
  },
  {
    key: "opportunities",
    label: "Opportunities",
    defaultEnabled: true,
    schema: opportunitiesSectionPatchSchema,
    apply: (target, patch) => {
      const { items, ...rest } = patch as {
        items?: Record<string, unknown>[]
      } & Record<string, unknown>
      target.opportunities = mergeContent(target.opportunities, rest as never)
      if (Array.isArray(items)) {
        target.opportunities.items = target.opportunities.items.map((item, index) =>
          mergeContent(item, items[index] ?? {}),
        )
      }
    },
  },
  {
    key: "location",
    label: "Location",
    defaultEnabled: true,
    schema: locationSectionPatchSchema,
    apply: (target, patch) => {
      const { benefits, ...rest } = patch as {
        benefits?: Record<string, unknown>[]
      } & Record<string, unknown>
      target.location = mergeContent(target.location, rest as never)
      if (Array.isArray(benefits)) {
        target.location.benefits = target.location.benefits.map((item, index) =>
          mergeContent(item, benefits[index] ?? {}),
        )
      }
    },
  },
  {
    key: "faq",
    label: "FAQ",
    defaultEnabled: true,
    schema: faqSectionPatchSchema,
    apply: (target, patch) => {
      const { items, ...rest } = patch as {
        items?: Record<string, unknown>[]
      } & Record<string, unknown>
      target.faq = mergeContent(target.faq, rest as never)
      if (Array.isArray(items)) {
        target.faq.items = target.faq.items.map((item, index) =>
          mergeContent(item, items[index] ?? {}),
        )
      }
    },
  },
  {
    key: "finalCta",
    label: "Final CTA",
    defaultEnabled: true,
    schema: finalCtaSectionPatchSchema,
    apply: (target, patch) => {
      target.finalCta = mergeContent(target.finalCta, patch as never)
    },
  },
]

export const HOME_SECTION_DEFINITION_MAP = Object.fromEntries(
  HOME_SECTION_DEFINITIONS.map((section) => [section.key, section]),
) as Record<HomeSectionKey, SectionDefinition>

export function validateHomeSectionPatch(key: HomeSectionKey, patch: unknown) {
  const definition = HOME_SECTION_DEFINITION_MAP[key]
  return definition.schema.parse(patch)
}

export function applyHomeSectionPatches(
  defaults: typeof landing,
  rows: { sectionKey: string; data: HomeSectionPatch }[],
): typeof landing {
  const merged = structuredClone(defaults) as MutableLanding
  for (const row of rows) {
    const definition = HOME_SECTION_DEFINITION_MAP[row.sectionKey as HomeSectionKey]
    if (!definition || !row.data || Object.keys(row.data).length === 0) continue
    definition.apply(merged, row.data)
  }
  return merged as typeof landing
}

export function getDefaultHomeSections() {
  return HOME_SECTION_DEFINITIONS.map((section, index) => ({
    pageSlug: "home" as const,
    sectionKey: section.key,
    enabled: section.defaultEnabled,
    sortOrder: index,
    data: {} as HomeSectionPatch,
  }))
}

export type ResolvedHomeSection = {
  sectionKey: HomeSectionKey
  label: string
  enabled: boolean
  sortOrder: number
}

export type HomePageContent = {
  landing: typeof landing
  sections: ResolvedHomeSection[]
}
