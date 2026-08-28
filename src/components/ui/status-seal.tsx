import { ShieldCheckIcon } from "lucide-react"
import { useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

function SealMark({ reduced }: { reduced: boolean | null }) {
  return (
    <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-forest-foreground/10 ring-1 ring-forest-foreground/15">
      {!reduced ? (
        <span className="absolute inset-0 rounded-xl ring-1 ring-cta/25" aria-hidden />
      ) : null}
      <ShieldCheckIcon className="relative size-6 text-cta" strokeWidth={2.25} />
      {!reduced ? (
        <span
          aria-hidden
          className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-cta shadow-[0_0_8px_var(--cta)] ring-2 ring-forest"
        />
      ) : null}
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
  const reduce = useReducedMotion()

  return (
    <div
      className={cn(
        "relative flex h-full min-h-[9.5rem] w-full flex-col overflow-hidden rounded-2xl bg-linear-to-br from-forest via-forest to-forest/92 text-forest-foreground",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_14px_32px_rgba(15,43,29,0.14)] ring-1 ring-forest/25",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-linear-to-b from-cta via-cta/70 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-6 size-28 rounded-full bg-cta/12 blur-2xl"
      />

      <div className="relative flex flex-1 flex-col justify-between gap-4 px-4 py-4 sm:px-5 sm:py-5">
        <SealMark reduced={reduce} />

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-cta uppercase">
            {kicker}
          </p>
          <p className="mt-1 font-heading text-lg font-semibold leading-tight sm:text-xl">
            {title}
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-forest-foreground/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-forest-foreground/90 ring-1 ring-forest-foreground/12">
          {!reduce ? (
            <span
              aria-hidden
              className="size-1.5 animate-pulse rounded-full bg-cta shadow-[0_0_6px_var(--cta)]"
            />
          ) : null}
          Listed
        </span>
      </div>
    </div>
  )
}
