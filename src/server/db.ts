import "@tanstack/react-start/server-only"

import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import type { NeonHttpDatabase } from "drizzle-orm/neon-http"

import * as schema from "./schema"

type Database = NeonHttpDatabase<typeof schema>

let instance: Database | undefined

function getDatabaseUrl(): string {
  const url = process.env["DATABASE_URL"]
  if (!url) {
    throw new Error("DATABASE_URL is not set. Add it to .env (see .env.example).")
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
