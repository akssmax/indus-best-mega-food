import type { HTMLAttributes, ReactNode } from "react"

import { contentContainerClass, contentGutterClass } from "@/lib/layout"
import { cn } from "@/lib/utils"

export { contentContainerClass, contentGutterClass }

export function Section({
  id,
  className,
  innerClassName,
  children,
  ...rest
}: {
  id?: string
  className?: string
  innerClassName?: string
  children: ReactNode
} & HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-16 lg:py-24",
        contentGutterClass,
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
