import type { ReactNode } from "react"

import { Eyebrow } from "@/components/landing/section"
import { contentContainerClass, contentGutterClass } from "@/lib/layout"
import { cn } from "@/lib/utils"

export function PlatformSection({
  id,
  eyebrow,
  title,
  body,
  children,
  className,
  innerClassName,
  "aria-label": ariaLabel,
}: {
  id?: string
  eyebrow?: string
  title?: string
  body?: string
  children: ReactNode
  className?: string
  innerClassName?: string
  "aria-label"?: string
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "scroll-mt-24 py-16 lg:py-24",
        contentGutterClass,
        className
      )}
    >
      <div className={cn(contentContainerClass, innerClassName)}>
        {eyebrow || title || body ? (
          <div className="max-w-2xl">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            {title ? (
              <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h2>
            ) : null}
            {body ? (
              <p className="mt-4 leading-relaxed text-muted-foreground">{body}</p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  )
}
