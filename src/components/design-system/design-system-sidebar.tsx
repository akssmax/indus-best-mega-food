import { designSystemNav } from "@/content/design-system-nav"
import { cn } from "@/lib/utils"

import { scrollToDesignSystemSection } from "./use-design-system-scroll-spy"

function NavLink({
  id,
  label,
  activeId,
  nested = false,
  onNavigate,
}: {
  id: string
  label: string
  activeId: string
  nested?: boolean
  onNavigate?: () => void
}) {
  const isActive = activeId === id

  return (
    <button
      type="button"
      onClick={() => scrollToDesignSystemSection(id, onNavigate)}
      className={cn(
        "block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        nested && "pl-4",
        isActive
          ? "bg-muted font-medium text-foreground"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
      )}
      aria-current={isActive ? "location" : undefined}
    >
      {label}
    </button>
  )
}

export function DesignSystemSidebar({
  activeId,
  className,
  onNavigate,
}: {
  activeId: string
  className?: string
  onNavigate?: () => void
}) {
  return (
    <nav
      aria-label="Design system sections"
      className={cn("space-y-6", className)}
    >
      {designSystemNav.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-2 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            {group.title}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <li key={item.id}>
                <NavLink
                  id={item.id}
                  label={item.label}
                  activeId={activeId}
                  onNavigate={onNavigate}
                />
                {"children" in item && item.children ? (
                  <ul className="mt-0.5 space-y-0.5">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <NavLink
                          id={child.id}
                          label={child.label}
                          activeId={activeId}
                          nested
                          onNavigate={onNavigate}
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
