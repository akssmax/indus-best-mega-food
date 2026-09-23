import "@tanstack/react-start/server-only"

import { getNeonAuth } from "./neon-auth.server"

export type AdminSession = {
  username: string
  loggedInAt: string
}

function toAdminSession(user: {
  email?: string | null
  name?: string | null
}): AdminSession {
  return {
    username: user.email ?? user.name ?? "admin",
    loggedInAt: new Date().toISOString(),
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const { data } = await getNeonAuth().getSession()
  const user = data?.user
  if (!user) return null
  return toAdminSession(user)
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession()
  if (!session) {
    throw new Error("Authentication required.")
  }
  return session
}
