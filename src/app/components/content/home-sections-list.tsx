import { useState } from "react"
import { Link } from "@tanstack/react-router"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ExternalLinkIcon,
  Loader2Icon,
  PencilIcon,
} from "lucide-react"
import { toast } from "sonner"

import {
  listHomeSections,
  setHomeSectionEnabled,
  updateHomeSectionOrder,
  type HomeSectionAdminRow,
} from "@/server/content"
import type { HomeSectionKey } from "@/content/home-sections.registry"
import { Button } from "@/components/ui/button"

export function HomeSectionsList({
  initialSections,
}: {
  initialSections: HomeSectionAdminRow[]
}) {
  const [sections, setSections] = useState(initialSections)
  const [busyKey, setBusyKey] = useState<string | null>(null)

  async function refresh() {
    const next = await listHomeSections()
    setSections(next)
  }

  async function moveSection(key: HomeSectionKey, direction: -1 | 1) {
    const index = sections.findIndex((section) => section.sectionKey === key)
    const target = index + direction
    if (index < 0 || target < 0 || target >= sections.length) return

    const reordered = [...sections]
    const [item] = reordered.splice(index, 1)
    reordered.splice(target, 0, item!)
    setSections(reordered)
    setBusyKey(key)

    try {
      await updateHomeSectionOrder({
        data: { keys: reordered.map((section) => section.sectionKey) },
      })
      toast.success("Section order updated.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not reorder sections.")
      await refresh()
    } finally {
      setBusyKey(null)
    }
  }

  async function toggleSection(key: HomeSectionKey, enabled: boolean) {
    setBusyKey(key)
    setSections((current) =>
      current.map((section) =>
        section.sectionKey === key ? { ...section, enabled } : section,
      ),
    )

    try {
      await setHomeSectionEnabled({ data: { key, enabled } })
      toast.success(enabled ? "Section enabled." : "Section hidden.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update section.")
      await refresh()
    } finally {
      setBusyKey(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Toggle visibility, reorder sections, and edit copy. Changes go live immediately.
        </p>
        <Button variant="outline" size="sm" asChild>
          <a href="/" target="_blank" rel="noreferrer">
            Preview homepage
            <ExternalLinkIcon className="size-4" />
          </a>
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
        <ul className="divide-y divide-border/60">
          {sections.map((section, index) => (
            <li
              key={section.id}
              className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-5"
            >
              <div className="min-w-0">
                <p className="font-medium">{section.label}</p>
                <p className="text-sm text-muted-foreground">{section.sectionKey}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="flex items-center gap-2 rounded-lg border border-border/60 px-3 py-2">
                  <input
                    type="checkbox"
                    className="size-4 accent-[var(--cta)]"
                    checked={section.enabled}
                    disabled={busyKey === section.sectionKey}
                    onChange={(event) =>
                      void toggleSection(section.sectionKey, event.target.checked)
                    }
                    aria-label={`Toggle ${section.label}`}
                  />
                  <span className="text-sm">{section.enabled ? "Visible" : "Hidden"}</span>
                </label>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={index === 0 || busyKey === section.sectionKey}
                  onClick={() => void moveSection(section.sectionKey, -1)}
                  aria-label={`Move ${section.label} up`}
                >
                  {busyKey === section.sectionKey ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <ArrowUpIcon className="size-4" />
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={
                    index === sections.length - 1 || busyKey === section.sectionKey
                  }
                  onClick={() => void moveSection(section.sectionKey, 1)}
                  aria-label={`Move ${section.label} down`}
                >
                  <ArrowDownIcon className="size-4" />
                </Button>

                <Button variant="secondary" size="sm" asChild>
                  <Link
                    to="/app/pages/home/$sectionKey"
                    params={{ sectionKey: section.sectionKey }}
                  >
                    <PencilIcon className="size-4" />
                    Edit copy
                  </Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
