export const landingSkins = [
  {
    id: "platform",
    href: "/landing-5",
    label: "Platform",
    note: "Live palette. ElevenLabs-style hero, flat joins.",
  },
  {
    id: "night",
    href: "/landing-3",
    label: "Night",
    note: "Near-black, cream type, brass. Place-led.",
  },
] as const

export type LandingSkinId = (typeof landingSkins)[number]["id"]

export function isLandingExperiment(pathname: string) {
  return landingSkins.some((skin) => skin.href === pathname)
}

export function isHeroTunerRoute(pathname: string) {
  return pathname === "/hero-1"
}

export function hideSiteChrome(pathname: string) {
  return isLandingExperiment(pathname) || isHeroTunerRoute(pathname)
}

export function showLandingSwitcher(pathname: string) {
  return pathname === "/" || isLandingExperiment(pathname)
}
