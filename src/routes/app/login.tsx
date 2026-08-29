import { createFileRoute, redirect } from "@tanstack/react-router"

import { LoginForm } from "@/app/components/login-form"
import { isAuthenticated } from "@/app/lib/auth"
import { BrandPattern } from "@/components/ui/brand-pattern"

export const Route = createFileRoute("/app/login")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && isAuthenticated()) {
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
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-muted p-4 sm:p-6 md:p-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <BrandPattern
          variant="ripple"
          className="absolute inset-0 text-foreground opacity-[0.035]"
        />
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-forest/12 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-cta/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-forest/8 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}
