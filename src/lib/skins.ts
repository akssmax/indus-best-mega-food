export const landingSkins = [
  {
    id: "atelier",
    href: "/landing-2",
    label: "Atelier",
    note: "Stone, charcoal, terracotta. Procurement-first.",
  },
  {
    id: "night",
    href: "/landing-3",
    label: "Night",
    note: "Near-black, cream type, brass. Place-led.",
  },
  {
    id: "broadsheet",
    href: "/landing-4",
    label: "Broadsheet",
    note: "Paper, ink, chili. Editorial journal.",
  },
] as const

export type LandingSkinId = (typeof landingSkins)[number]["id"]

export function isLandingExperiment(pathname: string) {
  return landingSkins.some((skin) => skin.href === pathname)
}

export function showLandingSwitcher(pathname: string) {
  return pathname === "/" || isLandingExperiment(pathname)
}
