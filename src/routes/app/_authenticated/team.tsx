import { createFileRoute } from "@tanstack/react-router"

import { TeamAdmin } from "@/app/components/team-admin"

export const Route = createFileRoute("/app/_authenticated/team")({
  head: () => ({
    meta: [{ title: "Team | Team dashboard" }],
  }),
  component: TeamPage,
})

function TeamPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Team</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create accounts and manage access. New members get the password you
          set here, then can change it after signing in.
        </p>
      </div>
      <TeamAdmin />
    </div>
  )
}
