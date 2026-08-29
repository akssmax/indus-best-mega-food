const SESSION_KEY = "ibmfp-dashboard-session"

// TODO: replace with real auth (Neon / Clerk / etc.)
const MOCK_USERNAME = "admin"
const MOCK_PASSWORD = "1234"

export type DashboardSession = {
  username: string
  loggedInAt: string
}

export function signIn(username: string, password: string): boolean {
  if (username !== MOCK_USERNAME || password !== MOCK_PASSWORD) {
    return false
  }

  const session: DashboardSession = {
    username,
    loggedInAt: new Date().toISOString(),
  }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return true
}

export function signOut(): void {
  sessionStorage.removeItem(SESSION_KEY)
}

export function getSession(): DashboardSession | null {
  if (typeof sessionStorage === "undefined") return null

  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as DashboardSession
  } catch {
    sessionStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}

export function requireAuth(): DashboardSession {
  const session = getSession()
  if (!session) {
    throw new Error("Authentication required.")
  }
  return session
}
