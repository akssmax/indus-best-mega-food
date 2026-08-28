import { useEffect, useState } from "react"

import { getDesignSystemSectionIds } from "@/content/design-system-nav"

export function useDesignSystemScrollSpy() {
  const [activeId, setActiveId] = useState(() => {
    if (typeof window === "undefined") return "introduction"
    const hash = window.location.hash.replace("#", "")
    return hash || "introduction"
  })

  useEffect(() => {
    const ids = getDesignSystemSectionIds()
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return

        const next = [...visible].sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )[0]

        if (next?.target.id) {
          setActiveId(next.target.id)
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.1, 0.5, 1] }
    )

    for (const element of elements) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return activeId
}

export function scrollToDesignSystemSection(
  id: string,
  onNavigate?: () => void
) {
  const element = document.getElementById(id)
  if (!element) return

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches

  element.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  })
  window.history.replaceState(null, "", `#${id}`)
  onNavigate?.()
}
