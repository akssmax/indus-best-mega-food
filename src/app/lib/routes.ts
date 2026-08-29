export function isDashboardRoute(pathname: string) {
  return pathname === "/app" || pathname.startsWith("/app/")
}
