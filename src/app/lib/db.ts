import { openDB, type DBSchema, type IDBPDatabase } from "idb"

import type { EnquiryRecord } from "./types"

const DB_NAME = "ibmfp-dashboard"
const DB_VERSION = 1

interface DashboardDB extends DBSchema {
  enquiries: {
    key: string
    value: EnquiryRecord
    indexes: {
      createdAt: string
      status: EnquiryRecord["status"]
      interest: EnquiryRecord["interest"]
    }
  }
}

let dbPromise: Promise<IDBPDatabase<DashboardDB>> | null = null

export function getDb() {
  if (typeof indexedDB === "undefined") {
    throw new Error("IndexedDB is not available in this environment.")
  }

  if (!dbPromise) {
    dbPromise = openDB<DashboardDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("enquiries")) {
          const store = db.createObjectStore("enquiries", { keyPath: "id" })
          store.createIndex("createdAt", "createdAt")
          store.createIndex("status", "status")
          store.createIndex("interest", "interest")
        }
      },
    })
  }

  return dbPromise
}
