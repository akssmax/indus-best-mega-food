import { createServerFn } from "@tanstack/react-start"

import { getAdminSession } from "./session.server"
import type { AdminSession } from "./session.server"

export type { AdminSession }

export const getAdminSessionFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<AdminSession | null> => getAdminSession(),
)
