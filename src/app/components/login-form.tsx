import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { MapPinIcon, ShieldCheckIcon } from "lucide-react"
import { toast } from "sonner"

import { useAuth } from "@/app/hooks/use-auth"
import { BrandPattern, DropFlourish } from "@/components/ui/brand-pattern"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"

function LoginBrandMark({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <img
        src={site.logo.src}
        alt={site.logo.alt}
        className={cn(
          "h-auto w-auto shrink-0 object-contain",
          compact ? "h-10" : "h-11 sm:h-12"
        )}
        width={124}
        height={88}
      />
      <span
        className={cn(
          "min-w-0 font-heading font-semibold leading-[1.15]",
          compact ? "text-sm" : "text-[15px] sm:text-base"
        )}
      >
        Indus Best Mega
        <br />
        Food Park
      </span>
    </div>
  )
}

export function LoginForm() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)

    const ok = signIn(username.trim(), password)
    if (ok) {
      toast.success("Signed in.")
      await navigate({ to: "/app/enquiries" })
    } else {
      toast.error("Invalid username or password.")
    }

    setPending(false)
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col items-center gap-2 md:hidden">
        <LoginBrandMark compact />
        <p className="text-center text-sm text-muted-foreground">
          Team dashboard · Internal access
        </p>
      </div>

      <Card className="overflow-hidden border-border/60 p-0 shadow-lg ring-1 ring-foreground/5">
        <CardContent className="grid p-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="relative hidden min-h-[32rem] flex-col justify-between overflow-hidden bg-forest p-8 text-forest-foreground md:flex">
            <BrandPattern
              variant="hatch"
              className="text-forest-foreground opacity-[0.06]"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-forest via-forest to-forest/90" />
            <img
              src="/images/warehouse.jpg"
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-forest via-forest/80 to-forest/40" />

            <div className="relative z-10 space-y-6">
              <LoginBrandMark />
              <div className="space-y-3">
                <DropFlourish className="opacity-70" />
                <p className="max-w-xs text-pretty text-sm leading-relaxed opacity-90">
                  {site.tagline}
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-start gap-2 text-sm opacity-80">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 opacity-70" />
                <p className="max-w-xs leading-relaxed">{site.location}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-forest-foreground/15 bg-forest-foreground/10 px-3 py-1.5 text-xs font-medium">
                <ShieldCheckIcon className="size-3.5 shrink-0 opacity-80" />
                Authorised team members only
              </div>
            </div>
          </div>

          <form
            className="flex flex-col justify-center gap-6 p-6 sm:p-8 md:p-10"
            onSubmit={onSubmit}
          >
            <div className="space-y-2 text-center md:text-left">
              <h1 className="font-heading text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-balance text-muted-foreground">
                Sign in to manage enquiries, update pipeline status, and export
                leads.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  className="h-11 bg-background"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="h-11 bg-background"
                />
              </div>
              <Button
                type="submit"
                variant="cta"
                className="mt-1 h-11 w-full"
                disabled={pending}
              >
                {pending ? "Signing in…" : "Sign in"}
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground md:text-left">
              Mock credentials: <span className="font-medium">admin</span> /{" "}
              <span className="font-medium">1234</span>
            </p>
          </form>
        </CardContent>
      </Card>

      <p className="px-2 text-center text-xs text-muted-foreground">
        By signing in you confirm this session is for internal business use
        only.
      </p>
    </div>
  )
}
