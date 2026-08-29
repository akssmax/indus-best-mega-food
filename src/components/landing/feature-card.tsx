import type { ComponentType, ReactNode } from "react"

import { Eyebrow } from "@/components/landing/section"
import { cn } from "@/lib/utils"

export const featureCardClass =
  "h-full rounded-2xl bg-card p-6 ring-1 ring-foreground/8"

export function FeatureCard({
  icon: Icon,
  title,
  children,
  className,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <article className={cn(featureCardClass, className)}>
      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" aria-hidden />
      </div>
      <h3 className="mt-5 font-heading text-lg font-semibold">{title}</h3>
      {children}
    </article>
  )
}

export function SectionIntro({
  eyebrow,
  title,
  body,
  heading = "h2",
  className,
}: {
  eyebrow: string
  title: string
  body?: string
  heading?: "h2" | "h3"
  className?: string
}) {
  const TitleTag = heading

  return (
    <div className={cn("max-w-2xl", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <TitleTag
        className={cn(
          "mt-3 font-heading font-semibold tracking-tight",
          heading === "h2" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
        )}
      >
        {title}
      </TitleTag>
      {body ? (
        <p className="mt-4 leading-relaxed text-muted-foreground">{body}</p>
      ) : null}
    </div>
  )
}

export const featureGridClass =
  "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
