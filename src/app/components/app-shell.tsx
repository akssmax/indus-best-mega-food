import type { CSSProperties } from "react"
import { Outlet, useRouterState } from "@tanstack/react-router"

import { AppSidebar } from "@/app/components/app-sidebar"
import { appNav } from "@/app/content/nav"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

function usePageTitle() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const exact = appNav.find((item) => item.href === pathname)?.title
  if (exact) return exact
  if (pathname.startsWith("/app/posts")) return "Posts"
  if (pathname.startsWith("/app/pages/home")) return "Home page"
  if (pathname === "/app/settings") return "Settings"
  return "Dashboard"
}

export function AppShell() {
  const pageTitle = usePageTitle()

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider
        className="dashboard-shell bg-sidebar"
        style={
          {
            "--sidebar": "var(--forest)",
            "--sidebar-foreground": "var(--forest-foreground)",
            "--sidebar-primary": "var(--cta)",
            "--sidebar-primary-foreground": "var(--cta-foreground)",
            "--sidebar-accent": "oklch(1 0 0 / 12%)",
            "--sidebar-accent-foreground": "var(--forest-foreground)",
            "--sidebar-border": "oklch(1 0 0 / 14%)",
            "--sidebar-ring": "var(--cta)",
          } as CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset className="overflow-hidden border border-border/60 bg-background shadow-sm md:ml-2 md:rounded-2xl">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/50 bg-card px-4 backdrop-blur-sm md:px-6">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="truncate font-heading text-lg">{pageTitle}</h1>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
