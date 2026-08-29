"use client"

import { useRef } from "react"

import { OceanBackground } from "@/components/landing/ocean-background"
import { heroShellClass } from "@/components/landing/heroes"
import { contentContainerClass, contentGutterClass } from "@/lib/layout"
import { cn } from "@/lib/utils"
import { HeroBgControls } from "@/components/design-system/hero-bg-controls"

/** Simplified hero BG preview with inline controls beside the preview — design system only. */
export function HeroBgTuner() {
  const dropAnchorRef = useRef<HTMLDivElement>(null)

  return (
    <div className="grid min-h-[32rem] lg:grid-cols-[minmax(0,1fr)_min(100%,22rem)]">
      <div className="relative min-w-0">
        <section
          className={cn(
            heroShellClass,
            contentGutterClass,
            "overflow-hidden pb-10 lg:pb-16"
          )}
        >
          <OceanBackground
            tone="forest"
            interaction="drop"
            dropAnchorRef={dropAnchorRef}
          />
          <div
            className={cn(contentContainerClass, "relative z-10 flex flex-col gap-8")}
          >
            <div className="max-w-3xl space-y-6 pt-4">
              <p className="font-heading text-xs font-medium tracking-[0.22em] uppercase text-cta">
                Hero BG tuner · temporary
              </p>
              <h2 className="text-4xl leading-tight font-semibold text-forest-foreground sm:text-5xl">
                Hover and drag to preview the drop morph.
              </h2>
              <p className="max-w-xl text-base text-forest-foreground/85">
                Use the panel on the right to tweak WGSL parameters live. For the
                full homepage hero, open{" "}
                <a href="/hero-1" className="underline underline-offset-2">
                  /hero-1
                </a>
                .
              </p>
            </div>
            <div
              ref={dropAnchorRef}
              className="overflow-hidden rounded-xl ring-1 ring-white/10"
            >
              <div className="aspect-[16/10] sm:aspect-[2/1] lg:aspect-[21/9]">
                <img
                  src="/images/warehouse.jpg"
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <HeroBgControls className="h-full min-h-[32rem] border-l shadow-none lg:max-h-none" />
    </div>
  )
}
