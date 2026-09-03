import type { ReactNode } from "react"
import {
  CatchBoundary,
  HeadContent,
  Scripts,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router"

import { site } from "@/content/site"
import { getSiteContent } from "@/server/content"
import { SiteContentProvider } from "@/lib/site-content-context"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { ColorModeSync } from "@/components/theme/color-mode-sync"
import { FontLoader } from "@/components/layout/font-loader"
import { AppError, AppNotFound } from "@/components/layout/app-error"
import { Toaster } from "@/components/ui/sonner"
import { hideSiteChrome } from "@/lib/skins"
import { isDashboardRoute } from "@/app/lib/routes"
import { organizationJsonLd, THEME_COLOR } from "@/lib/seo"
import { themeBootScript } from "@/lib/theme"
import appCss from "../styles.css?url"

export const Route = createRootRoute({
  loader: async () => {
    const siteContent = await getSiteContent()
    return { siteContent }
  },
  head: ({ loaderData }) => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { name: "theme-color", content: THEME_COLOR },
      { title: loaderData?.siteContent.home.title ?? site.home.title },
      {
        name: "description",
        content: loaderData?.siteContent.home.description ?? site.home.description,
      },
      organizationJsonLd(),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
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
        <ColorModeSync />
        <FontLoader />
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
  const siteContent = Route.useLoaderData()?.siteContent ?? site
  const chromeless = hideSiteChrome(pathname)
  const dashboard = isDashboardRoute(pathname)

  return (
    <SiteContentProvider value={siteContent}>
      {chromeless || dashboard ? null : <SiteHeader />}
      {children}
      {chromeless || dashboard ? null : <SiteFooter tone="light" />}
    </SiteContentProvider>
  )
}
