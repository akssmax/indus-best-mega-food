import { useEffect } from "react"

import { subscribeColorMode, syncColorModeFromSystem } from "@/lib/theme"

/** Keeps the `dark` class aligned when mode is `system`. */
export function ColorModeSync() {
  useEffect(() => {
    syncColorModeFromSystem()
    return subscribeColorMode(() => syncColorModeFromSystem())
  }, [])

  return null
}
