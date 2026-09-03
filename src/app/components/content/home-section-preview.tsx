"use client"

import { useMemo } from "react"

import { renderSingleHomeSection } from "@/components/landing/home-section-renderer"
import {
  applyHomeSectionPatches,
  type HomeSectionKey,
  type HomeSectionPatch,
} from "@/content/home-sections.registry"
import { landing } from "@/content/landing"
import { LandingContentProvider } from "@/lib/landing-content-context"

export function buildPreviewLanding(
  sectionKey: HomeSectionKey,
  sectionData: HomeSectionPatch,
) {
  return applyHomeSectionPatches(landing, [{ sectionKey, data: sectionData }])
}

type HomeSectionPreviewProps = {
  sectionKey: HomeSectionKey
  form: HomeSectionPatch
}

export function HomeSectionPreview({ sectionKey, form }: HomeSectionPreviewProps) {
  const previewLanding = useMemo(
    () => buildPreviewLanding(sectionKey, form),
    [sectionKey, form],
  )

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-2.5">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Live preview
        </p>
        <p className="text-xs text-muted-foreground">Updates as you edit</p>
      </div>
      <div className="relative max-h-[min(72vh,920px)] overflow-x-hidden overflow-y-auto overscroll-contain bg-background [&_a]:pointer-events-none">
        <LandingContentProvider value={previewLanding}>
          {renderSingleHomeSection(sectionKey)}
        </LandingContentProvider>
      </div>
    </div>
  )
}
