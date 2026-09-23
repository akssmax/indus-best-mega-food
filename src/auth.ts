import { createAuthClient } from "@neondatabase/neon-js/auth"
import { BetterAuthReactAdapter } from "@neondatabase/neon-js/auth/react/adapters"

const configured = import.meta.env.VITE_NEON_AUTH_URL ?? "/api/auth"

const baseUrl =
  typeof window !== "undefined"
    ? new URL(configured, window.location.origin).toString()
    : new URL(configured, "http://localhost").toString()

export const authClient = createAuthClient(baseUrl, {
  adapter: BetterAuthReactAdapter(),
})
