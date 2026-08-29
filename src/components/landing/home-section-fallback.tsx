import { contentContainerClass, contentGutterClass } from "@/lib/layout"
import { cn } from "@/lib/utils"

export function HomeSectionFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn("py-16 lg:py-24", contentGutterClass, className)}
      aria-busy="true"
      aria-label="Loading section"
    >
      <div
        className={cn(
          contentContainerClass,
          "flex min-h-[14rem] animate-pulse flex-col gap-4"
        )}
      >
        <div className="h-3 w-28 rounded bg-muted" />
        <div className="h-9 max-w-md rounded bg-muted/80" />
        <div className="h-4 max-w-2xl rounded bg-muted/60" />
        <div className="mt-4 min-h-[10rem] flex-1 rounded-3xl bg-muted/40" />
      </div>
    </div>
  )
}
