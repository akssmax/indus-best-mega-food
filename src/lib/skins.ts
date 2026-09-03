export function isHeroTunerRoute(pathname: string) {
  return pathname === "/hero-1"
}

export function hideSiteChrome(pathname: string) {
  return isHeroTunerRoute(pathname)
}
