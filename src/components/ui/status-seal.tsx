import { ShieldCheckIcon } from "lucide-react"

import { PatternCorner } from "@/components/ui/brand-pattern"
import { cn } from "@/lib/utils"

function SealMark() {
  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-forest-foreground/10 ring-1 ring-forest-foreground/15">
      <ShieldCheckIcon className="size-6 text-cta" strokeWidth={2.25} />
    </span>
  )
}

export function StatusSeal({
  kicker,
  title,
  className,
}: {
  kicker: string
  title: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[9.5rem] w-full flex-col overflow-hidden rounded-2xl bg-linear-to-br from-forest via-forest to-forest/92 text-forest-foreground",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_14px_32px_rgba(15,43,29,0.14)] ring-1 ring-forest/25",
        "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:ring-forest-foreground/25",
        className
      )}
    >
      <PatternCorner
        variant="bloom"
        position="top-right"
        size="sm"
        className="text-cta opacity-[0.14]"
      />
      <div className="relative z-10 flex flex-1 flex-col justify-between gap-4 px-4 py-4 sm:px-5 sm:py-5">
        <SealMark />

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-cta uppercase">
            {kicker}
          </p>
          <p className="mt-1 font-heading text-lg font-semibold leading-tight sm:text-xl">
            {title}
          </p>
        </div>

        <span className="inline-flex w-fit items-center rounded-full bg-forest-foreground/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-forest-foreground/90 ring-1 ring-forest-foreground/12">
          Listed
        </span>
      </div>
    </div>
  )
}
