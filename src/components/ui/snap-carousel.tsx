import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function SnapCarousel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory touch-pan-x",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "-mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SnapSlide({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "w-[min(85vw,22rem)] shrink-0 snap-start lg:w-auto lg:min-w-0",
        className
      )}
    >
      {children}
    </div>
  )
}
