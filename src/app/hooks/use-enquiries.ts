import { useCallback, useEffect, useState } from "react"

import { enquiryStore } from "@/app/lib/enquiry-store"
import type { EnquiryRecord, EnquiryStatus } from "@/app/lib/types"

export function useEnquiries() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      await enquiryStore.seedIfEmpty()
      const records = await enquiryStore.list()
      setEnquiries(records)
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
      const updated = await enquiryStore.update(id, { status })
      if (updated) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? updated : item)),
        )
      }
      return updated
    },
    [],
  )

  const updateNotes = useCallback(async (id: string, notes: string) => {
    const updated = await enquiryStore.update(id, { notes })
    if (updated) {
      setEnquiries((prev) =>
        prev.map((item) => (item.id === id ? updated : item)),
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
