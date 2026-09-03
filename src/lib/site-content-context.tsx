"use client"

import { createContext, useContext, type ReactNode } from "react"

import { site } from "@/content/site"
import type { ResolvedSite } from "@/server/content"

const SiteContentContext = createContext<ResolvedSite | null>(null)

export function SiteContentProvider({
  value,
  children,
}: {
  value: ResolvedSite
  children: ReactNode
}) {
  return (
    <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
  )
}

export function useSiteContent(): ResolvedSite {
  return useContext(SiteContentContext) ?? site
}
