import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function PullQuote({
  children,
  cite,
  className,
}: {
  children: ReactNode
  cite?: string
  className?: string
}) {
  return (
    <blockquote
      className={cn(
        "border-l-2 border-cta py-2 pl-6 sm:pl-8",
        className
      )}
    >
      <p className="font-heading text-2xl leading-snug font-medium sm:text-3xl lg:text-4xl">
        {children}
      </p>
      {cite ? (
        <footer className="mt-4 text-sm tracking-[0.14em] text-muted-foreground uppercase">
          {cite}
        </footer>
      ) : null}
    </blockquote>
  )
}
