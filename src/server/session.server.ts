import { useSession } from "@tanstack/react-start/server"

export type AdminSession = {
  username: string
  loggedInAt: string
}

type SessionData = {
  admin?: AdminSession
}

function sessionPassword(): string {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must be set to at least 32 characters.")
  }
  return secret
}

export function getAdminSession() {
  return useSession<SessionData>({
    name: "ibmfp_session",
    password: sessionPassword(),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    },
  })
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession()
  if (!session.data.admin) {
    throw new Error("Authentication required.")
  }
  return session.data.admin
}
