import { cn } from "@/lib/utils"

export type SpecRow = {
  label: string
  value: string
  hint?: string
}

export function SpecTable({
  rows,
  className,
}: {
  rows: readonly SpecRow[]
  className?: string
}) {
  return (
    <div className={cn("divide-y divide-border border-y border-border", className)}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex min-h-12 items-baseline justify-between gap-4 py-3"
        >
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{row.label}</p>
            {row.hint ? (
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground/80">
                {row.hint}
              </p>
            ) : null}
          </div>
          <p className="shrink-0 text-right font-heading text-base font-semibold">
            {row.value}
          </p>
        </div>
      ))}
    </div>
  )
}
