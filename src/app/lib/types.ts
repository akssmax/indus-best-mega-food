import type { EnquiryInput } from "@/lib/enquiry"

export type EnquiryStatus = "new" | "contacted" | "qualified" | "closed"

export type EnquirySource = "contact" | "landing"

export type EnquiryRecord = EnquiryInput & {
  id: string
  createdAt: string
  status: EnquiryStatus
  source: EnquirySource
  notes?: string
}

export type EnquiryDraft = Omit<EnquiryRecord, "status"> & {
  status?: EnquiryStatus
}
