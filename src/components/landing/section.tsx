import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function Section({
  id,
  className,
  innerClassName,
  children,
}: {
  id?: string
  className?: string
  innerClassName?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-24",
        className
      )}
    >
      <div className={cn("mx-auto w-full max-w-6xl", innerClassName)}>
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
