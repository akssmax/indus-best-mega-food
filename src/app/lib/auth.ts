import { getAdminSessionFn, loginAdmin, logoutAdmin } from "@/server/auth"

export type { AdminSession as DashboardSession } from "@/server/auth"

export async function signIn(
  username: string,
  password: string,
): Promise<boolean> {
  const result = await loginAdmin({ data: { username, password } })
  return result.ok
}

export async function signOut(): Promise<void> {
  await logoutAdmin()
}

export async function getSession() {
  return getAdminSessionFn()
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getAdminSessionFn()) !== null
}
