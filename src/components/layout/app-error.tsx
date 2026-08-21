import { Link, useRouter } from "@tanstack/react-router"
import type { ErrorComponentProps } from "@tanstack/react-router"

import { site } from "@/content/site"
import { Button } from "@/components/ui/button"

export function AppError({ error, info, reset }: ErrorComponentProps) {
  const router = useRouter()
  const isDev = import.meta.env.DEV
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred."

  function retry() {
    reset()
    void router.invalidate()
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <img
          src={site.logo.src}
          alt=""
          className="mx-auto h-12 w-auto"
          width={124}
          height={88}
        />
        <p className="mt-6 text-xs font-medium tracking-[0.22em] text-cta uppercase">
          Something went wrong
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl">This page hit a snag.</h1>
        <p className="mt-4 text-muted-foreground">
          You can try again, or go back to the park. If it keeps happening, call
          or email us from the contact section.
        </p>
        {isDev ? (
          <pre className="mt-6 max-h-48 overflow-auto rounded-xl bg-muted p-4 text-left text-xs text-destructive ring-1 ring-destructive/20">
            <code>
              {message}
              {info?.componentStack
                ? `\n${info.componentStack.trim()}`
                : ""}
            </code>
          </pre>
        ) : null}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="cta" className="h-10 px-4" onClick={retry}>
            Try again
          </Button>
          <Button variant="outline" className="h-10 px-4" asChild>
            <Link to="/">Back to the park</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export function AppNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <p className="text-xs font-medium tracking-[0.22em] text-cta uppercase">
          404
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl">Page not found.</h1>
        <p className="mt-4 text-muted-foreground">
          That address is not on this site. Head back to the park to keep
          looking.
        </p>
        <Button variant="cta" className="mt-8 h-10 px-4" asChild>
          <Link to="/">Back to the park</Link>
        </Button>
      </div>
    </main>
  )
}
