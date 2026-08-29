import type { ReactNode } from "react"
import {
  CatchBoundary,
  HeadContent,
  Scripts,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router"

import { site } from "@/content/site"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { LandingSwitcher } from "@/components/layout/landing-switcher"
import { AppError, AppNotFound } from "@/components/layout/app-error"
import { Toaster } from "@/components/ui/sonner"
import { isLandingExperiment } from "@/lib/skins"
import { isDashboardRoute } from "@/app/lib/routes"
import { themeBootScript } from "@/lib/theme"
import appCss from "../styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      {
        title: `${site.name} | Set up in Raipur, Chhattisgarh`,
      },
      {
        name: "description",
        content:
          "Developed plots, 16 MSME sheds, aseptic and IQF lines, 5,000 MT cold storage and 12,000 MT dry warehouse at Bemta–Sarora, near Raipur.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  errorComponent: AppError,
  notFoundComponent: AppNotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-svh antialiased">
        <ShellBoundary>
          <div id="top" />
          <PageChrome>{children}</PageChrome>
        </ShellBoundary>
        <Toaster />
        <Scripts />
      </body>
    </html>
  )
}

function ShellBoundary({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  return (
    <CatchBoundary getResetKey={() => pathname} errorComponent={AppError}>
      {children}
    </CatchBoundary>
  )
}

function PageChrome({ children }: { children: ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const experiment = isLandingExperiment(pathname)
  const dashboard = isDashboardRoute(pathname)

  return (
    <>
      {experiment || dashboard ? null : <SiteHeader />}
      {children}
      {experiment || dashboard ? null : <SiteFooter tone="light" />}
      {dashboard ? null : <LandingSwitcher />}
    </>
  )
}
