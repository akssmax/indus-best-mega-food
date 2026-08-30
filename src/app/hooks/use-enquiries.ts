import { useCallback, useEffect, useState } from "react"

import type { EnquiryRecord, EnquiryStatus } from "@/app/lib/types"
import {
  listEnquiries,
  updateEnquiryNotes,
  updateEnquiryStatus,
} from "@/server/enquiries"

export function useEnquiries() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const records = await listEnquiries()
      setEnquiries(
        records.map((record) => ({
          ...record,
          notes: record.notes ?? undefined,
        })),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load enquiries.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const updateStatus = useCallback(
    async (id: string, status: EnquiryStatus) => {
      const updated = await updateEnquiryStatus({ data: { id, status } })
      if (updated) {
        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === id ? { ...updated, notes: updated.notes ?? undefined } : item,
          ),
        )
      }
      return updated
    },
    [],
  )

  const updateNotes = useCallback(async (id: string, notes: string) => {
    const updated = await updateEnquiryNotes({ data: { id, notes } })
    if (updated) {
      setEnquiries((prev) =>
        prev.map((item) =>
          item.id === id ? { ...updated, notes: updated.notes ?? undefined } : item,
        ),
      )
    }
    return updated
  }, [])

  return {
    enquiries,
    loading,
    error,
    refresh,
    updateStatus,
    updateNotes,
  }
}
