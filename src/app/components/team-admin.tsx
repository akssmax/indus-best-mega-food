import { useCallback, useEffect, useState } from "react"
import { BanIcon, ShieldCheckIcon, TrashIcon, UserPlusIcon } from "lucide-react"
import { toast } from "sonner"

import { authClient } from "@/auth"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type TeamUser = {
  id: string
  email: string
  name?: string | null
  role?: string | null
  banned?: boolean | null
}

function messageOf(error: unknown, fallback: string): string {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message
    if (typeof message === "string" && message.length > 0) return message
  }
  return fallback
}

export function TeamAdmin() {
  const { data: sessionData, isPending: sessionPending } =
    authClient.useSession()
  const currentUser = sessionData?.user as { role?: string | null } | undefined
  const isAdmin = currentUser?.role === "admin"

  const [users, setUsers] = useState<TeamUser[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"user" | "admin">("user")
  const [creating, setCreating] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await authClient.admin.listUsers({
      query: { limit: 100, sortBy: "createdAt", sortDirection: "desc" },
    })
    if (error) {
      setLoadError(messageOf(error, "Could not load users."))
      setUsers([])
    } else {
      setUsers((data?.users ?? []) as TeamUser[])
      setLoadError(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (isAdmin) void load()
  }, [isAdmin, load])

  async function onCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCreating(true)
    const { error } = await authClient.admin.createUser({
      email: email.trim(),
      password,
      name: name.trim() || email.trim(),
      role,
    })
    setCreating(false)
    if (error) {
      toast.error(messageOf(error, "Could not create user."))
      return
    }
    toast.success("User created.")
    setEmail("")
    setName("")
    setPassword("")
    setRole("user")
    await load()
  }

  async function onSetPassword(user: TeamUser) {
    const next = window.prompt(`New password for ${user.email} (min 8 characters):`)
    if (!next) return
    const { error } = await authClient.admin.setUserPassword({
      userId: user.id,
      newPassword: next,
    })
    if (error) {
      toast.error(messageOf(error, "Could not set password."))
      return
    }
    toast.success("Password updated.")
  }

  async function onToggleRole(user: TeamUser) {
    const nextRole = user.role === "admin" ? "user" : "admin"
    const { error } = await authClient.admin.setRole({
      userId: user.id,
      role: nextRole,
    })
    if (error) {
      toast.error(messageOf(error, "Could not update role."))
      return
    }
    toast.success(nextRole === "admin" ? "Promoted to admin." : "Set as user.")
    await load()
  }

  async function onToggleBan(user: TeamUser) {
    const result = user.banned
      ? await authClient.admin.unbanUser({ userId: user.id })
      : await authClient.admin.banUser({ userId: user.id })
    if (result.error) {
      toast.error(messageOf(result.error, "Could not update access."))
      return
    }
    toast.success(user.banned ? "Access restored." : "User banned.")
    await load()
  }

  async function onRemove(user: TeamUser) {
    if (!window.confirm(`Remove ${user.email}? This cannot be undone.`)) return
    const { error } = await authClient.admin.removeUser({ userId: user.id })
    if (error) {
      toast.error(messageOf(error, "Could not remove user."))
      return
    }
    toast.success("User removed.")
    await load()
  }

  if (sessionPending) {
    return <p className="text-sm text-muted-foreground">Loading…</p>
  }

  if (!isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Team access required</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your account does not have the <code>admin</code> role. Ask an
            existing admin to promote you from the Neon Console → Auth → Users
            → “Make admin”.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Add team member</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={onCreate}>
            <div className="grid gap-1.5">
              <Label htmlFor="team-email">Email</Label>
              <Input
                id="team-email"
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="team-name">Name</Label>
              <Input
                id="team-name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="team-password">Temporary password</Label>
              <Input
                id="team-password"
                type="text"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="team-role">Role</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as "user" | "admin")}
              >
                <SelectTrigger id="team-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Button
                type="submit"
                variant="cta"
                className="h-11"
                disabled={creating}
              >
                <UserPlusIcon />
                {creating ? "Creating…" : "Create user"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading">
            Users {users.length > 0 ? `(${users.length})` : ""}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading users…</p>
          ) : loadError ? (
            <p className="text-sm text-destructive">{loadError}</p>
          ) : users.length === 0 ? (
            <p className="text-sm text-muted-foreground">No users yet.</p>
          ) : (
            <ul className="divide-y divide-border/60">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate font-medium">
                        {user.name || user.email}
                      </span>
                      <Badge
                        variant={user.role === "admin" ? "default" : "secondary"}
                      >
                        {user.role ?? "user"}
                      </Badge>
                      {user.banned ? (
                        <Badge variant="destructive">banned</Badge>
                      ) : null}
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSetPassword(user)}
                    >
                      Set password
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleRole(user)}
                    >
                      <ShieldCheckIcon />
                      {user.role === "admin" ? "Make user" : "Make admin"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleBan(user)}
                    >
                      <BanIcon />
                      {user.banned ? "Unban" : "Ban"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => onRemove(user)}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
