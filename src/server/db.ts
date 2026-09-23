import "@tanstack/react-start/server-only"

import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import type { NeonHttpDatabase } from "drizzle-orm/neon-http"

import * as schema from "./schema"

type Database = NeonHttpDatabase<typeof schema>

let instance: Database | undefined

export class DatabaseUnavailableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DatabaseUnavailableError"
  }
}

export function isDatabaseUnavailable(error: unknown): boolean {
  return error instanceof DatabaseUnavailableError
}

function getDatabaseUrl(): string {
  const url = process.env["DATABASE_URL"]
  if (!url) {
    throw new DatabaseUnavailableError(
      "DATABASE_URL is not set. Add it to .env (see .env.example).",
    )
  }
  return url
}

function getDatabase(): Database {
  if (!instance) {
    instance = drizzle({ client: neon(getDatabaseUrl()), schema })
  }
  return instance
}

export const db = new Proxy({} as Database, {
  get(_target, prop, receiver) {
    const database = getDatabase()
    const value = Reflect.get(database, prop, receiver)
    return typeof value === "function" ? value.bind(database) : value
  },
})
