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
import { AppError, AppNotFound } from "@/components/layout/app-error"
import { Toaster } from "@/components/ui/sonner"
import appCss from "../styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: `${site.name} | Food processing campus, Raipur`,
      },
      {
        name: "description",
        content:
          "Indus Best Mega Food Park in Bemta–Sarora, Raipur: developed plots, MSME plug-and-play sheds, fruit and vegetable lines, IQF, cold chain, and shared utilities for food manufacturers.",
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
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-svh antialiased">
        <ShellBoundary>
          <div id="top" />
          <SiteHeader />
          {children}
          <SiteFooter />
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
