import { useCallback, useSyncExternalStore } from "react"

import {
  getSession,
  isAuthenticated,
  signIn as authSignIn,
  signOut as authSignOut,
  type DashboardSession,
} from "@/app/lib/auth"

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener("ibmfp-auth-change", callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener("ibmfp-auth-change", callback)
  }
}

function getSnapshot() {
  return isAuthenticated()
}

function getServerSnapshot() {
  return false
}

function notifyAuthChange() {
  window.dispatchEvent(new Event("ibmfp-auth-change"))
}

export function useAuth() {
  const authenticated = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )

  const session: DashboardSession | null = authenticated ? getSession() : null

  const signIn = useCallback((username: string, password: string) => {
    const ok = authSignIn(username, password)
    if (ok) notifyAuthChange()
    return ok
  }, [])

  const signOut = useCallback(() => {
    authSignOut()
    notifyAuthChange()
  }, [])

  return { authenticated, session, signIn, signOut }
}
