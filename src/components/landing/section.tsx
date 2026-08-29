import type { HTMLAttributes, ReactNode } from "react"

import { contentContainerClass, contentGutterClass } from "@/lib/layout"
import { cn } from "@/lib/utils"

export { contentContainerClass, contentGutterClass }

export function Section({
  id,
  className,
  innerClassName,
  deferPaint = false,
  children,
  ...rest
}: {
  id?: string
  className?: string
  innerClassName?: string
  /** Skip style/layout work until the section is near the viewport. */
  deferPaint?: boolean
  children: ReactNode
} & HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-16 lg:py-24",
        contentGutterClass,
        deferPaint && "content-visibility-auto",
        className
      )}
      {...rest}
    >
      <div className={cn(contentContainerClass, innerClassName)}>
        {children}
      </div>
    </section>
  )
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "font-heading text-xs font-medium tracking-[0.22em] text-primary uppercase",
        className
      )}
    >
      {children}
    </p>
  )
}
