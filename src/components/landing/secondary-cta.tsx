import type { ReactNode } from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function SecondaryCtaLink({
  href,
  children,
  className,
  tone = "default",
}: {
  href: string
  children: ReactNode
  className?: string
  /** `on-dark` for forest bands; `default` for light surfaces. */
  tone?: "default" | "on-dark"
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-11 touch-target items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline",
        tone === "on-dark"
          ? "text-forest-foreground active:text-forest-foreground/80"
          : "text-primary active:text-primary/80",
        className
      )}
    >
      {children}
      <ArrowRightIcon className="size-4 shrink-0" aria-hidden />
    </a>
  )
}
