import type { ReactNode } from "react"

import type { LandingSkinId } from "@/lib/skins"
import { cn } from "@/lib/utils"

export function SkinFrame({
  skin,
  className,
  children,
}: {
  skin: LandingSkinId
  className?: string
  children: ReactNode
}) {
  return (
    <div
      data-skin={skin}
      className={cn("min-h-svh bg-background font-sans text-foreground", className)}
    >
      {children}
    </div>
  )
}
