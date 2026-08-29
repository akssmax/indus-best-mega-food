import { useState } from "react"

import {
  peakAsepticMtph,
  throughputHeadlineStats,
} from "@/content/facilities"
import { landings } from "@/content/landings"
import { Reveal } from "@/components/landing/motion"
import { PlatformSection } from "@/components/landings/platform/section-shell"
import {
  facilityCategoryStyles,
  platformCapabilityTabs,
} from "@/lib/facility-categories"
import { cn } from "@/lib/utils"

export function PlatformCapabilities() {
  const { capabilities } = landings.platform
  const [activeId, setActiveId] = useState(platformCapabilityTabs[0].id)
  const activeTab =
    platformCapabilityTabs.find((tab) => tab.id === activeId) ??
    platformCapabilityTabs[0]
  const palette = facilityCategoryStyles[activeTab.style]
  const TabIcon = activeTab.icon

  return (
    <PlatformSection
      id="capabilities"
      eyebrow={capabilities.eyebrow}
      title={capabilities.title}
      body={capabilities.body}
      className="bg-background"
    >
      <Reveal className="mt-10" delay={0.03}>
        <div className="flex flex-wrap items-end gap-x-8 gap-y-4 rounded-2xl bg-secondary/30 px-5 py-5 ring-1 ring-foreground/8 sm:px-6 sm:py-6">
          <div>
            <p className="font-heading text-4xl font-semibold tabular-nums text-primary sm:text-5xl">
              {peakAsepticMtph}
            </p>
            <p className="mt-1 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Peak MTPH (aseptic line)
            </p>
          </div>
          <div className="hidden h-12 w-px bg-border/70 sm:block" aria-hidden />
          <div className="flex flex-wrap gap-3">
            {throughputHeadlineStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-full bg-card px-3 py-1.5 text-xs ring-1 ring-foreground/8"
              >
                <span className="font-semibold tabular-nums text-primary">
                  {stat.value}
                </span>
                <span className="ml-1.5 text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-8" delay={0.05}>
        <div className="overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/8">
          <div
            className="flex flex-wrap gap-1 border-b border-border/70 p-2 sm:p-2.5"
            role="tablist"
            aria-label="Campus capability categories"
          >
            {platformCapabilityTabs.map((tab) => {
              const selected = tab.id === activeId
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(tab.id)}
                  className={cn(
                    "inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors outline-none sm:px-4",
                    "focus-visible:ring-3 focus-visible:ring-ring/50",
                    selected
                      ? "bg-background text-foreground shadow-sm ring-1 ring-foreground/8"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="p-5 sm:p-8">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-xl",
                  palette.well
                )}
              >
                <TabIcon className="size-5" aria-hidden />
              </div>
              <h3 className="font-heading text-xl font-semibold">{activeTab.label}</h3>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {activeTab.items.map((item) => {
                const ItemIcon = item.icon
                return (
                  <li
                    key={item.label}
                    className="flex gap-3 rounded-xl bg-muted/40 p-3 ring-1 ring-foreground/6"
                  >
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-lg",
                        palette.item
                      )}
                    >
                      <ItemIcon className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0 pt-0.5 text-sm leading-relaxed text-foreground/90">
                      {item.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Reveal>
    </PlatformSection>
  )
}
