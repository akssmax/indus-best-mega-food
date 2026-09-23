import "@tanstack/react-start/server-only"

import { createAuthServer } from "@neondatabase/neon-js/auth/server"
import type { NeonAuthServer } from "@neondatabase/neon-js/auth/server"
import { getRequest, setResponseHeader } from "@tanstack/react-start/server"

function requiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is not set. Add it to the environment.`)
  }
  return value
}

let instance: NeonAuthServer | undefined

export function getNeonAuth(): NeonAuthServer {
  if (!instance) {
    instance = createAuthServer({
      baseUrl: requiredEnv("NEON_AUTH_BASE_URL"),
      cookieSecret: requiredEnv("NEON_AUTH_COOKIE_SECRET"),
      context: () => {
        const request = getRequest()
        return {
          getCookies: () => request.headers.get("cookie") ?? "",
          setCookie: (name, value, options) => {
            const parts = [`${name}=${value}`]
            if (options?.maxAge != null) {
              parts.push(`Max-Age=${Math.floor(options.maxAge)}`)
            }
            if (options?.expires) {
              parts.push(`Expires=${options.expires.toUTCString()}`)
            }
            parts.push(`Path=${options?.path ?? "/"}`)
            if (options?.domain) parts.push(`Domain=${options.domain}`)
            if (options?.secure) parts.push("Secure")
            if (options?.httpOnly) parts.push("HttpOnly")
            if (options?.sameSite) parts.push(`SameSite=${options.sameSite}`)
            try {
              setResponseHeader("Set-Cookie", parts.join("; "))
            } catch {
              // No response context (e.g. during prerender); cache cookie is optional.
            }
          },
          getHeader: (name) => request.headers.get(name),
          getOrigin: () => request.headers.get("origin") ?? "",
          getFramework: () => "tanstack-start",
        }
      },
    })
  }
  return instance
}
