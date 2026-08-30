import { createServerFn } from "@tanstack/react-start"

import { getAdminSession } from "./session.server"
import type { AdminSession } from "./session.server"

export type { AdminSession }

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator((input: { username: string; password: string }) => input)
  .handler(async ({ data }) => {
    const expectedUser = process.env.ADMIN_USERNAME
    const expectedPass = process.env.ADMIN_PASSWORD
    if (!expectedUser || !expectedPass) {
      throw new Error("Admin credentials are not configured on the server.")
    }

    if (data.username !== expectedUser || data.password !== expectedPass) {
      return { ok: false as const }
    }

    const session = await getAdminSession()
    await session.update({
      admin: { username: data.username, loggedInAt: new Date().toISOString() },
    })
    return { ok: true as const }
  })

export const logoutAdmin = createServerFn({ method: "POST" }).handler(
  async () => {
    const session = await getAdminSession()
    await session.clear()
  },
)

export const getAdminSessionFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<AdminSession | null> => {
    const session = await getAdminSession()
    return session.data.admin ?? null
  },
)
