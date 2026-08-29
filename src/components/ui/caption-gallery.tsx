import { useState } from "react"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type GalleryItem = {
  src: string
  alt: string
  caption: string
}

export function CaptionGallery({
  items,
  className,
}: {
  items: readonly GalleryItem[]
  className?: string
}) {
  const [active, setActive] = useState<number | null>(null)
  const current = active !== null ? items[active] : null

  return (
    <>
      <ul
        className={cn(
          "grid grid-cols-2 gap-3 auto-rows-[min(42vw,10.5rem)] sm:grid-cols-3 sm:auto-rows-[min(28vw,10rem)] lg:grid-cols-4",
          className
        )}
      >
        {items.map((item, index) => (
          <li
            key={item.caption}
            className={cn("min-h-0", index === 0 && "col-span-2 sm:row-span-2")}
          >
            <button
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "group relative block w-full overflow-hidden text-left outline-none touch-manipulation focus-visible:ring-3 focus-visible:ring-ring/50",
                index === 0 ? "h-full min-h-0" : "aspect-[4/3]"
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 size-full object-cover"
                loading={index > 2 ? "lazy" : "eager"}
              />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-3 py-3">
                <span className="block text-sm font-medium text-white">
                  {item.caption}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-50 flex flex-col bg-black/92"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <p className="font-heading text-lg text-white">{current.caption}</p>
            <Button
              variant="ghost"
              size="icon"
              className="size-11 touch-manipulation text-white hover:bg-white/10 hover:text-white"
              aria-label="Close"
              onClick={() => setActive(null)}
            >
              <XIcon />
            </Button>
          </div>
          <button
            type="button"
            className="flex min-h-0 flex-1 touch-manipulation items-center justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
            onClick={() => setActive(null)}
          >
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-full max-w-full object-contain"
            />
          </button>
        </div>
      ) : null}
    </>
  )
}
