import { Link } from "@tanstack/react-router"

import { site } from "@/content/site"
import { cn } from "@/lib/utils"

export function LandingBrand({
  className,
  wordmarkClassName,
  stacked = false,
}: {
  className?: string
  wordmarkClassName?: string
  stacked?: boolean
}) {
  return (
    <Link
      to="/"
      className={cn(
        "flex min-w-0 items-center gap-2 rounded-lg outline-none touch-manipulation",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <img
        src={site.logo.src}
        alt=""
        className="h-9 w-auto shrink-0 sm:h-10"
        width={124}
        height={88}
      />
      <span
        className={cn(
          "min-w-0 font-heading text-[13px] font-semibold leading-[1.15] sm:text-sm",
          stacked ? "lg:text-[15px]" : "truncate",
          wordmarkClassName
        )}
      >
        {stacked ? (
          <>
            Indus Best Mega
            <br />
            Food Park
          </>
        ) : (
          site.shortName
        )}
      </span>
    </Link>
  )
}
