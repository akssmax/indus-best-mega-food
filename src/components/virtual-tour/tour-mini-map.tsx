import { virtualTour, type VirtualTourZone } from "@/content/virtual-tour"
import { timelineDotClass } from "@/components/virtual-tour/tour-timeline"
import { cn } from "@/lib/utils"

export function TourMiniMap({
  zones,
  activeId,
  onSelect,
  variant = "inline",
  className,
}: {
  zones: readonly VirtualTourZone[]
  activeId: string
  onSelect: (id: string) => void
  variant?: "inline" | "floating"
  className?: string
}) {
  const { miniMap } = virtualTour
  const floating = variant === "floating"

  return (
    <div
      className={cn(
        floating &&
          "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-50 w-[min(100%,11rem)] rounded-xl border border-border/80 bg-background/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-md sm:right-6 sm:w-44 lg:bottom-6",
        className
      )}
    >
      {!floating ? (
        <p className="mb-3 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
          Campus map
        </p>
      ) : (
        <p className="mb-1.5 px-0.5 text-[0.625rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Campus map
        </p>
      )}
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-muted ring-1 ring-border/60",
          floating ? "aspect-square" : "aspect-square"
        )}
      >
        <img
          src={miniMap.src}
          alt={miniMap.alt}
          className="absolute inset-0 size-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-forest/35 via-transparent to-forest/10"
          aria-hidden
        />
        {zones.map((zone, index) => {
          const active = zone.id === activeId
          const activeIndex = zones.findIndex((z) => z.id === activeId)
          const passed = activeIndex > index
          return (
            <button
              key={zone.id}
              type="button"
              aria-label={`${index + 1}. ${zone.label}`}
              aria-current={active ? "true" : undefined}
              onClick={() => onSelect(zone.id)}
              style={{ left: zone.mapPosition.x, top: zone.mapPosition.y }}
              className={cn(
                "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full font-semibold outline-none transition-all duration-300 focus-visible:ring-3 focus-visible:ring-ring/50",
                floating ? "size-6 text-[0.5625rem]" : "size-8 text-xs",
                active
                  ? timelineDotClass.active
                  : passed
                    ? timelineDotClass.passed
                    : timelineDotClass.upcoming
              )}
            >
              {index + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}
