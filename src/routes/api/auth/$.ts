import { createFileRoute } from "@tanstack/react-router"
import { handleAuthProxyRequest } from "@neondatabase/neon-js/auth/server"

function authEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not set.`)
  return value
}

async function proxy(ctx: { request: Request; params: Record<string, string> }) {
  const path = ctx.params._splat ?? ""
  return handleAuthProxyRequest({
    request: ctx.request,
    path,
    baseUrl: authEnv("NEON_AUTH_BASE_URL"),
    cookieSecret: authEnv("NEON_AUTH_COOKIE_SECRET"),
  })
}

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: proxy,
      POST: proxy,
      PUT: proxy,
      PATCH: proxy,
      DELETE: proxy,
      OPTIONS: proxy,
    },
  },
})
