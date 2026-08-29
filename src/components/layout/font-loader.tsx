import { useEffect } from "react"

import { ensureFontsForDocument } from "@/lib/font-loader"

export function FontLoader() {
  useEffect(() => {
    void ensureFontsForDocument()
  }, [])

  return null
}
