"use client"

import { useState, type FocusEvent, type PointerEvent, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { OceanBackground } from "@/components/landing/ocean-background"
import { Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { cn } from "@/lib/utils"

type CtaMorph = "idle" | "factory" | "campus"

export type ForestOceanCtaLink = {
  label: string
  href: string
  morph?: "factory" | "campus"
}

export function ForestOceanCta({
  id,
  eyebrow,
  title,
  body,
  primary,
  secondary,
  className,
}: {
  id?: string
  eyebrow?: ReactNode
  title: string
  body: string
  primary: ForestOceanCtaLink
  secondary: ForestOceanCtaLink
  className?: string
}) {
  const [ctaMorph, setCtaMorph] = useState<CtaMorph>("idle")

  const dissolve = () => setCtaMorph("idle")

  const onCtaBlur = (event: FocusEvent<HTMLAnchorElement>) => {
    const next = event.relatedTarget
    if (next instanceof Element && next.closest("[data-cta-morph]")) return
    dissolve()
  }

  const onSectionPointerOver = (event: PointerEvent<HTMLElement>) => {
    const target = event.target
    if (!(target instanceof Element)) return
    if (!target.closest("[data-cta-morph]")) dissolve()
  }

  return (
    <Section
      id={id}
      className={cn(
        "relative z-10 flex min-h-[28rem] items-center overflow-hidden bg-forest py-20 text-forest-foreground sm:min-h-[32rem] lg:min-h-[36rem] lg:py-28",
        className
      )}
      innerClassName="contents"
      onPointerOver={onSectionPointerOver}
      onPointerLeave={dissolve}
    >
      <OceanBackground
        tone="forest"
        interaction="factory"
        dropEngaged={ctaMorph !== "idle"}
        morphTarget={ctaMorph === "campus" ? 1 : 0}
      />

      <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
        {eyebrow}
        <h2
          className={cn(
            "font-heading text-3xl font-semibold sm:text-4xl lg:text-5xl",
            eyebrow ? "mt-3" : undefined
          )}
        >
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-forest-foreground/90 sm:text-lg">
          {body}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="cta" className="h-12 px-6 text-base" asChild>
            <a
              href={primary.href}
              data-cta-morph={primary.morph ?? "factory"}
              onPointerEnter={() => setCtaMorph(primary.morph ?? "factory")}
              onFocus={() => setCtaMorph(primary.morph ?? "factory")}
              onBlur={onCtaBlur}
            >
              {primary.label}
            </a>
          </Button>
          <Button
            variant="outline"
            className="h-12 border-forest-foreground/30 bg-transparent px-6 text-base text-forest-foreground hover:bg-forest-foreground/10 hover:text-forest-foreground focus-visible:ring-forest-foreground/30"
            asChild
          >
            <a
              href={secondary.href}
              data-cta-morph={secondary.morph ?? "campus"}
              onPointerEnter={() => setCtaMorph(secondary.morph ?? "campus")}
              onFocus={() => setCtaMorph(secondary.morph ?? "campus")}
              onBlur={onCtaBlur}
            >
              {secondary.label}
            </a>
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
