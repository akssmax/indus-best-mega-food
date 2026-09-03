"use client"

import { createContext, useContext, type ReactNode } from "react"

import { landing } from "@/content/landing"

const LandingContentContext = createContext<typeof landing | null>(null)

export function LandingContentProvider({
  value,
  children,
}: {
  value: typeof landing
  children: ReactNode
}) {
  return (
    <LandingContentContext.Provider value={value}>
      {children}
    </LandingContentContext.Provider>
  )
}

export function useLandingContent(): typeof landing {
  return useContext(LandingContentContext) ?? landing
}
