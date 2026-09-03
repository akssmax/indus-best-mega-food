import { createFileRoute } from "@tanstack/react-router"

import { SettingsForm } from "@/app/components/content/settings-form"
import { getSiteSettingsForEdit } from "@/server/content"

export const Route = createFileRoute("/app/_authenticated/settings")({
  loader: async () => getSiteSettingsForEdit(),
  head: () => ({
    meta: [{ title: "Settings | Team dashboard" }],
  }),
  component: SettingsPage,
})

function SettingsPage() {
  const { merged } = Route.useLoaderData()
  return <SettingsForm merged={merged} />
}
