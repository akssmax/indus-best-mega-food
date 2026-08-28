import { useRouterState } from "@tanstack/react-router"
import {
  Building2Icon,
  InfoIcon,
  LandmarkIcon,
  MailIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const items = [
  { href: "/about", label: "About", icon: InfoIcon },
  { href: "/campus", label: "Campus", icon: LandmarkIcon },
  { href: "/opportunities", label: "Why invest", icon: Building2Icon },
  { href: "/contact", label: "Enquire", icon: MailIcon, primary: true },
] as const

export function BottomDock() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <nav
      aria-label="Mobile dock"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground/15 bg-background/95 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          const primary = "primary" in item && item.primary
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-14 touch-manipulation flex-col items-center justify-center gap-1 text-xs font-medium outline-none",
                  "focus-visible:ring-3 focus-visible:ring-ring/50",
                  primary
                    ? "bg-cta text-cta-foreground"
                    : active
                      ? "text-foreground"
                      : "text-muted-foreground"
                )}
              >
                <Icon className="size-5" />
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
