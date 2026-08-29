import { createFileRoute } from "@tanstack/react-router"

import { AppShell } from "@/app/components/app-shell"

export const Route = createFileRoute("/app/_authenticated")({
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return <AppShell />
}
