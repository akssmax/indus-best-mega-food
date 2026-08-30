import { createFileRoute, redirect } from "@tanstack/react-router"

import { LoginForm } from "@/app/components/login-form"
import { isAuthenticated } from "@/app/lib/auth"
import { OceanBackground } from "@/components/landing/ocean-background"

export const Route = createFileRoute("/app/login")({
  beforeLoad: async () => {
    if (await isAuthenticated()) {
      throw redirect({ to: "/app/enquiries" })
    }
  },
  head: () => ({
    meta: [{ title: "Sign in | Team dashboard" }],
  }),
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-card p-4 sm:p-6 md:p-10 dark:bg-background">
      <OceanBackground tone="paper" interaction="static" />

      <div className="relative z-10 w-full max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}
