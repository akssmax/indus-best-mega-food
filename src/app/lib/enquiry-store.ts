import type { EnquiryDraft, EnquiryRecord, EnquiryStatus } from "./types"
import { getDb } from "./db"
import { seedEnquiries } from "./seed-enquiries"

export const enquiryStore = {
  list,
  get,
  save,
  update,
  seedIfEmpty,
}

async function list(): Promise<EnquiryRecord[]> {
  const db = await getDb()
  const records = await db.getAll("enquiries")
  return records.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

async function get(id: string): Promise<EnquiryRecord | null> {
  const db = await getDb()
  return (await db.get("enquiries", id)) ?? null
}

async function save(record: EnquiryDraft): Promise<EnquiryRecord> {
  const db = await getDb()
  const full: EnquiryRecord = {
    ...record,
    status: record.status ?? "new",
  }
  await db.put("enquiries", full)
  return full
}

async function update(
  id: string,
  patch: Partial<Pick<EnquiryRecord, "status" | "notes">>,
): Promise<EnquiryRecord | null> {
  const db = await getDb()
  const existing = await db.get("enquiries", id)
  if (!existing) return null

  const updated: EnquiryRecord = { ...existing, ...patch }
  await db.put("enquiries", updated)
  return updated
}

async function seedIfEmpty(): Promise<void> {
  const db = await getDb()
  const count = await db.count("enquiries")
  if (count > 0) return

  const tx = db.transaction("enquiries", "readwrite")
  await Promise.all([
    ...seedEnquiries.map((record) => tx.store.put(record)),
    tx.done,
  ])
}

export function createEnquiryRecord(
  input: Omit<EnquiryDraft, "id" | "createdAt" | "status"> & {
    id?: string
    createdAt?: string
    status?: EnquiryStatus
  },
): EnquiryRecord {
  return {
    id: input.id ?? crypto.randomUUID(),
    createdAt: input.createdAt ?? new Date().toISOString(),
    status: input.status ?? "new",
    name: input.name,
    company: input.company,
    phone: input.phone,
    email: input.email,
    interest: input.interest,
    message: input.message,
    source: input.source,
    notes: input.notes,
  }
}

export async function saveEnquiry(
  input: Omit<EnquiryDraft, "id" | "createdAt" | "status"> & {
    id?: string
    createdAt?: string
    status?: EnquiryStatus
  },
): Promise<EnquiryRecord> {
  return enquiryStore.save(createEnquiryRecord(input))
}
