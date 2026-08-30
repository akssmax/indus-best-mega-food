import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

import { isAuthenticated } from "@/app/lib/auth"

export const Route = createFileRoute("/app")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/app/login") return

    if (typeof window !== "undefined" && !isAuthenticated()) {
      throw redirect({ to: "/app/login" })
    }
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: () => <Outlet />,
})
