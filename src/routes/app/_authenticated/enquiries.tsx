import { createFileRoute } from "@tanstack/react-router"

import { EnquiriesOverview } from "@/app/components/enquiries-overview"
import { EnquiriesTable } from "@/app/components/enquiries-table"
import { useEnquiries } from "@/app/hooks/use-enquiries"

export const Route = createFileRoute("/app/_authenticated/enquiries")({
  head: () => ({
    meta: [{ title: "Enquiries | Team dashboard" }],
  }),
  component: EnquiriesPage,
})

function EnquiriesPage() {
  const { enquiries, loading, error, updateStatus, updateNotes } = useEnquiries()

  return (
    <div className="space-y-4 md:space-y-6">
      <EnquiriesOverview enquiries={enquiries} loading={loading} />
      <EnquiriesTable
        enquiries={enquiries}
        loading={loading}
        error={error}
        onStatusChange={updateStatus}
        onNotesSave={updateNotes}
      />
    </div>
  )
}
