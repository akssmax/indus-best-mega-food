import { useCallback, useEffect, useState } from "react"
import { useRouter } from "@tanstack/react-router"

import {
  getSession,
  signIn as authSignIn,
  signOut as authSignOut,
} from "@/app/lib/auth"
import type { DashboardSession } from "@/app/lib/auth"

export function useAuth() {
  const router = useRouter()
  const [session, setSession] = useState<DashboardSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    void getSession().then((current) => {
      if (!cancelled) {
        setSession(current)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const signIn = useCallback(
    async (username: string, password: string) => {
      const ok = await authSignIn(username, password)
      if (ok) {
        setSession(await getSession())
        await router.invalidate()
      }
      return ok
    },
    [router],
  )

  const signOut = useCallback(async () => {
    await authSignOut()
    setSession(null)
    await router.invalidate()
  }, [router])

  return { authenticated: session !== null, loading, session, signIn, signOut }
}
