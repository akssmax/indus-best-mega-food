import { useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

export function LiveIndicator({
  className,
  label = "Live",
}: {
  className?: string
  label?: string
}) {
  const reduce = useReducedMotion()

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-cta/15 px-2.5 py-1 text-xs font-medium text-cta",
        className
      )}
    >
      <span className="relative flex size-2.5">
        {reduce ? null : (
          <span className="absolute inset-0 animate-ping rounded-full bg-cta/70" />
        )}
        <span className="relative m-auto size-2 rounded-full bg-cta shadow-[0_0_8px_var(--cta)]" />
      </span>
      {label}
    </span>
  )
}
