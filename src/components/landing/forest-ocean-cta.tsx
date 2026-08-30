"use client"

import { useState, type FocusEvent, type PointerEvent, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { OceanBackground } from "@/components/landing/ocean-background"
import { Section } from "@/components/landing/section"
import { Reveal } from "@/components/landing/motion"
import { cn } from "@/lib/utils"

type CtaMorph = "idle" | "factory" | "campus"

/** Static buttons — ocean morph handles the hover motion, not the controls. */
const ctaButtonClass =
  "h-12 px-6 text-base motion-safe:hover:translate-y-0 motion-safe:hover:scale-100 motion-safe:active:translate-y-0 motion-safe:active:scale-100"

export type ForestOceanCtaLink = {
  label: string
  href: string
  morph?: "factory" | "campus"
  external?: boolean
}

export function ForestOceanCta({
  id,
  eyebrow,
  title,
  body,
  primary,
  secondary,
  footnote,
  className,
}: {
  id?: string
  eyebrow?: ReactNode
  title: string
  body: string
  primary: ForestOceanCtaLink
  secondary: ForestOceanCtaLink
  footnote?: string
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
          <Button variant="cta" className={ctaButtonClass} asChild>
            <a
              href={primary.href}
              data-cta-morph={primary.morph ?? "factory"}
              onPointerEnter={() => setCtaMorph(primary.morph ?? "factory")}
              onFocus={() => setCtaMorph(primary.morph ?? "factory")}
              onBlur={onCtaBlur}
              {...(primary.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {primary.label}
            </a>
          </Button>
          <Button
            variant="outline"
            className={cn(
              ctaButtonClass,
              "border-forest-foreground/30 bg-transparent text-forest-foreground hover:bg-forest-foreground/10 hover:text-forest-foreground focus-visible:ring-forest-foreground/30"
            )}
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
        {footnote ? (
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-forest-foreground/75">
            {footnote}
          </p>
        ) : null}
      </Reveal>
    </Section>
  )
}
