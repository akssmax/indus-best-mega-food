import { createServerFn } from "@tanstack/react-start"
import { asc, and, eq } from "drizzle-orm"

import { site } from "@/content/site"
import { landing } from "@/content/landing"
import {
  HOME_SECTION_DEFINITION_MAP,
  HOME_SECTION_KEYS,
  applyHomeSectionPatches,
  getDefaultHomeSections,
  validateHomeSectionPatch,
  type HomePageContent,
  type HomeSectionKey,
  type HomeSectionPatch,
  type ResolvedHomeSection,
} from "@/content/home-sections.registry"
import {
  siteSettingsPatchSchema,
  type SiteSettingsPatch,
} from "@/content/site-settings.schema"
import { mergeContent } from "@/lib/content-merge"
import { requireAdmin } from "@/server/session.server"
import { db, isDatabaseUnavailable } from "@/server/db"
import { pageSections, siteSettings } from "@/server/schema"

export type ResolvedSite = typeof site

const HOME_PAGE_SLUG = "home"

function isMissingCmsTable(error: unknown) {
  if (isDatabaseUnavailable(error)) return true
  if (!(error instanceof Error)) return false
  const message = error.message.toLowerCase()
  return (
    message.includes('relation "site_settings" does not exist') ||
    message.includes('relation "page_sections" does not exist') ||
    message.includes("failed query") && message.includes("site_settings")
  )
}

async function readSiteSettingsPatch(): Promise<SiteSettingsPatch> {
  try {
    const rows = await db
      .select({ data: siteSettings.data })
      .from(siteSettings)
      .where(eq(siteSettings.id, "default"))
      .limit(1)
    return rows.at(0)?.data ?? {}
  } catch (error) {
    if (isMissingCmsTable(error)) return {}
    throw error
  }
}

async function ensureHomeSections() {
  try {
    const existing = await db
      .select({ sectionKey: pageSections.sectionKey })
      .from(pageSections)
      .where(eq(pageSections.pageSlug, HOME_PAGE_SLUG))

    const existingKeys = new Set(existing.map((row) => row.sectionKey))
    const missing = getDefaultHomeSections().filter(
      (section) => !existingKeys.has(section.sectionKey),
    )

    if (missing.length > 0) {
      await db.insert(pageSections).values(missing)
    }
  } catch (error) {
    if (isMissingCmsTable(error)) return
    throw error
  }
}

async function readHomeSectionRows() {
  try {
    return await db
      .select({
        sectionKey: pageSections.sectionKey,
        enabled: pageSections.enabled,
        sortOrder: pageSections.sortOrder,
        data: pageSections.data,
      })
      .from(pageSections)
      .where(eq(pageSections.pageSlug, HOME_PAGE_SLUG))
      .orderBy(asc(pageSections.sortOrder))
  } catch (error) {
    if (isMissingCmsTable(error)) return null
    throw error
  }
}

function defaultHomeSections(): ResolvedHomeSection[] {
  return getDefaultHomeSections().map((section) => ({
    sectionKey: section.sectionKey,
    label: HOME_SECTION_DEFINITION_MAP[section.sectionKey].label,
    enabled: section.enabled,
    sortOrder: section.sortOrder,
  }))
}

function mergeSite(patch: SiteSettingsPatch): ResolvedSite {
  return mergeContent(site, patch as Partial<typeof site>)
}

function resolveHomeSections(
  rows: {
    sectionKey: string
    enabled: boolean
    sortOrder: number
    data: HomeSectionPatch
  }[],
): { sections: ResolvedHomeSection[]; landing: typeof landing } {
  const mergedLanding = applyHomeSectionPatches(landing, rows)

  const sections = rows
    .filter((row) =>
      HOME_SECTION_KEYS.includes(row.sectionKey as HomeSectionKey),
    )
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((row) => ({
      sectionKey: row.sectionKey as HomeSectionKey,
      label: HOME_SECTION_DEFINITION_MAP[row.sectionKey as HomeSectionKey].label,
      enabled: row.enabled,
      sortOrder: row.sortOrder,
    }))

  return { sections, landing: mergedLanding }
}

export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<ResolvedSite> => {
    const patch = await readSiteSettingsPatch()
    return mergeSite(patch)
  },
)

export const getHomePageContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomePageContent> => {
    await ensureHomeSections()
    const rows = await readHomeSectionRows()

    if (!rows) {
      return {
        landing,
        sections: defaultHomeSections(),
      }
    }

    return resolveHomeSections(rows)
  },
)

export type HomeSectionAdminRow = {
  id: string
  sectionKey: HomeSectionKey
  label: string
  enabled: boolean
  sortOrder: number
  data: HomeSectionPatch
  updatedAt: string
}

export const getSiteSettingsForEdit = createServerFn({ method: "GET" }).handler(
  async () => {
    await requireAdmin()
    const patch = await readSiteSettingsPatch()
    return { defaults: site, patch, merged: mergeSite(patch) }
  },
)

export const updateSiteSettings = createServerFn({ method: "POST" })
  .inputValidator((input: SiteSettingsPatch) => input)
  .handler(async ({ data }) => {
    await requireAdmin()
    const patch = siteSettingsPatchSchema.parse(data)

    await db
      .insert(siteSettings)
      .values({ id: "default", data: patch })
      .onConflictDoUpdate({
        target: siteSettings.id,
        set: { data: patch, updatedAt: new Date() },
      })

    return { ok: true as const }
  })

export const listHomeSections = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomeSectionAdminRow[]> => {
    await requireAdmin()
    await ensureHomeSections()

    const rows = await db
      .select()
      .from(pageSections)
      .where(eq(pageSections.pageSlug, HOME_PAGE_SLUG))
      .orderBy(asc(pageSections.sortOrder))

    return rows.map((row) => ({
      id: row.id,
      sectionKey: row.sectionKey as HomeSectionKey,
      label: HOME_SECTION_DEFINITION_MAP[row.sectionKey as HomeSectionKey].label,
      enabled: row.enabled,
      sortOrder: row.sortOrder,
      data: row.data ?? {},
      updatedAt: row.updatedAt.toISOString(),
    }))
  },
)

export const updateHomeSectionOrder = createServerFn({ method: "POST" })
  .inputValidator((input: { keys: HomeSectionKey[] }) => input)
  .handler(async ({ data }) => {
    await requireAdmin()
    if (data.keys.length !== HOME_SECTION_KEYS.length) {
      throw new Error("Invalid section order.")
    }

    await Promise.all(
      data.keys.map((key, index) =>
        db
          .update(pageSections)
          .set({ sortOrder: index, updatedAt: new Date() })
          .where(
            and(
              eq(pageSections.pageSlug, HOME_PAGE_SLUG),
              eq(pageSections.sectionKey, key),
            ),
          ),
      ),
    )

    return { ok: true as const }
  })

export const setHomeSectionEnabled = createServerFn({ method: "POST" })
  .inputValidator((input: { key: HomeSectionKey; enabled: boolean }) => input)
  .handler(async ({ data }) => {
    await requireAdmin()
    await db
      .update(pageSections)
      .set({ enabled: data.enabled, updatedAt: new Date() })
      .where(
        and(
          eq(pageSections.pageSlug, HOME_PAGE_SLUG),
          eq(pageSections.sectionKey, data.key),
        ),
      )
    return { ok: true as const }
  })

export const getHomeSectionForEdit = createServerFn({ method: "GET" })
  .inputValidator((input: { key: HomeSectionKey }) => input)
  .handler(async ({ data }) => {
    await requireAdmin()
    await ensureHomeSections()

    const rows = await db
      .select()
      .from(pageSections)
      .where(
        and(
          eq(pageSections.pageSlug, HOME_PAGE_SLUG),
          eq(pageSections.sectionKey, data.key),
        ),
      )
      .limit(1)

    const row = rows.at(0)
    if (!row) throw new Error("Section not found.")

    const definition = HOME_SECTION_DEFINITION_MAP[data.key]
    return {
      key: data.key,
      label: definition.label,
      patch: row.data ?? {},
      defaults: getSectionDefaults(data.key),
    }
  })

function getSectionDefaults(key: HomeSectionKey): HomeSectionPatch {
  switch (key) {
    case "hero":
      return {
        eyebrow: landing.hero.eyebrow,
        headline: landing.hero.headline,
        body: landing.hero.body,
        primaryCta: landing.hero.primaryCta,
        secondaryCta: landing.hero.secondaryCta,
        stats: [...landing.hero.stats],
        slides: landing.hero.slides.map((slide) => ({
          headline: slide.headline,
          body: slide.body,
        })),
      }
    case "logoStrip":
      return {
        label: landing.clients.label,
        items: [...landing.clients.items],
      }
    case "socialProof":
      return {
        eyebrow: landing.socialProof.eyebrow,
        title: landing.socialProof.title,
        body: landing.socialProof.body,
      }
    case "why":
      return {
        eyebrow: landing.why.eyebrow,
        title: landing.why.title,
        body: landing.why.body,
        advantages: landing.why.advantages.map((item) => ({
          title: item.title,
          body: item.body,
        })),
      }
    case "whoIsItFor":
      return {
        eyebrow: landing.audience.eyebrow,
        title: landing.audience.title,
        body: landing.audience.body,
        items: landing.audience.items.map((item) => ({
          title: item.title,
          subtitle: item.subtitle,
          body: item.body,
          cta: item.cta,
          icon: item.icon,
        })),
      }
    case "ecosystemFlow":
      return {
        eyebrow: landing.ecosystem.eyebrow,
        title: landing.ecosystem.title,
        body: landing.ecosystem.body,
        steps: landing.ecosystem.steps.map((step) => ({
          title: step.title,
          detail: step.detail,
        })),
      }
    case "campusFacilities":
      return {
        campusOverview: {
          eyebrow: landing.campusOverview.eyebrow,
          title: landing.campusOverview.title,
          body: landing.campusOverview.body,
        },
        facilityCategories: {
          eyebrow: landing.facilityCategories.eyebrow,
          title: landing.facilityCategories.title,
          body: landing.facilityCategories.body,
        },
        processingCapabilities: {
          eyebrow: landing.processingCapabilities.eyebrow,
          title: landing.processingCapabilities.title,
          body: landing.processingCapabilities.body,
        },
      }
    case "products":
      return {
        eyebrow: landing.products.eyebrow,
        title: landing.products.title,
        body: landing.products.body,
        cta: landing.products.cta,
      }
    case "opportunities":
      return {
        eyebrow: landing.opportunities.eyebrow,
        title: landing.opportunities.title,
        body: landing.opportunities.body,
        quote: landing.opportunities.quote,
        proofs: [...landing.opportunities.proofs],
        items: landing.opportunities.items.map((item) => ({
          title: item.title,
          kicker: "kicker" in item ? item.kicker : undefined,
          body: item.body,
          metric: "metric" in item ? item.metric : undefined,
          metricLabel: "metricLabel" in item ? item.metricLabel : undefined,
          featured: item.featured,
        })),
        cta: landing.opportunities.cta,
      }
    case "location":
      return {
        eyebrow: landing.location.eyebrow,
        title: landing.location.title,
        body: landing.location.body,
        benefits: landing.location.benefits.map((item) => ({
          title: item.title,
          body: item.body,
        })),
      }
    case "faq":
      return {
        eyebrow: landing.faq.eyebrow,
        title: landing.faq.title,
        items: landing.faq.items.map((item) => ({
          question: item.question,
          answer: item.answer,
          ...("link" in item && item.link ? { link: item.link } : {}),
        })),
        cta: landing.faq.cta,
      }
    case "finalCta":
      return {
        title: landing.finalCta.title,
        body: landing.finalCta.body,
        primaryCta: landing.finalCta.primaryCta,
        secondaryCta: landing.finalCta.secondaryCta,
      }
    default:
      return {}
  }
}

export const updateHomeSectionData = createServerFn({ method: "POST" })
  .inputValidator((input: { key: HomeSectionKey; patch: HomeSectionPatch }) => input)
  .handler(async ({ data }) => {
    await requireAdmin()
    const patch = validateHomeSectionPatch(data.key, data.patch) as HomeSectionPatch

    await db
      .update(pageSections)
      .set({ data: patch, updatedAt: new Date() })
      .where(
        and(
          eq(pageSections.pageSlug, HOME_PAGE_SLUG),
          eq(pageSections.sectionKey, data.key),
        ),
      )

    return { ok: true as const }
  })

export function getMergedSectionContent(
  key: HomeSectionKey,
  patch: HomeSectionPatch,
): HomeSectionPatch {
  const defaults = getSectionDefaults(key)
  return mergeContent(defaults, patch)
}
