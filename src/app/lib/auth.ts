import { authClient } from "@/auth"
import { getAdminSessionFn } from "@/server/auth"

export type { AdminSession as DashboardSession } from "@/server/auth"

export async function signIn(
  email: string,
  password: string,
): Promise<boolean> {
  const { error } = await authClient.signIn.email({ email, password })
  return !error
}

export async function signOut(): Promise<void> {
  await authClient.signOut()
}

export async function getSession() {
  return getAdminSessionFn()
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getAdminSessionFn()) !== null
}
