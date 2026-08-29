import { useEffect, useState, type ReactNode } from "react"

import type { EnquiryRecord, EnquiryStatus } from "@/app/lib/types"
import { enquiryStatusOptions } from "@/app/components/enquiry-status-badge"
import { EnquiryStatusBadge } from "@/app/components/enquiry-status-badge"
import { InterestBadge } from "@/app/components/interest-badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso))
}

export function EnquiryDetailSheet({
  enquiry,
  open,
  onOpenChange,
  onStatusChange,
  onNotesSave,
}: {
  enquiry: EnquiryRecord | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange: (id: string, status: EnquiryStatus) => Promise<unknown>
  onNotesSave: (id: string, notes: string) => Promise<unknown>
}) {
  const [notes, setNotes] = useState("")
  const [savingNotes, setSavingNotes] = useState(false)
  const [statusPending, setStatusPending] = useState(false)

  useEffect(() => {
    setNotes(enquiry?.notes ?? "")
  }, [enquiry])

  if (!enquiry) return null

  async function handleStatusChange(value: string) {
    if (!enquiry || !value) return
    setStatusPending(true)
    try {
      await onStatusChange(enquiry.id, value as EnquiryStatus)
    } finally {
      setStatusPending(false)
    }
  }

  async function handleNotesSave() {
    if (!enquiry) return
    setSavingNotes(true)
    try {
      await onNotesSave(enquiry.id, notes)
    } finally {
      setSavingNotes(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">{enquiry.name}</SheetTitle>
          <SheetDescription>
            Received {formatDate(enquiry.createdAt)} · {enquiry.source}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6 px-4 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <EnquiryStatusBadge status={enquiry.status} />
            <InterestBadge interest={enquiry.interest} />
          </div>

          <dl className="grid gap-3 text-sm">
            <DetailRow label="Company" value={enquiry.company || "—"} />
            <DetailRow
              label="Phone"
              value={
                <a className="text-primary hover:underline" href={`tel:${enquiry.phone}`}>
                  {enquiry.phone}
                </a>
              }
            />
            <DetailRow
              label="Email"
              value={
                <a
                  className="text-primary hover:underline"
                  href={`mailto:${enquiry.email}`}
                >
                  {enquiry.email}
                </a>
              }
            />
          </dl>

          <div>
            <p className="mb-2 text-sm font-medium">Message</p>
            <p className="rounded-lg border border-border/60 bg-muted/30 p-3 text-sm leading-relaxed text-muted-foreground">
              {enquiry.message || "No message provided."}
            </p>
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label htmlFor="enquiry-status">Status</Label>
            <Select
              value={enquiry.status}
              onValueChange={handleStatusChange}
              disabled={statusPending}
            >
              <SelectTrigger id="enquiry-status" className="h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {enquiryStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="enquiry-notes">Internal notes</Label>
            <Textarea
              id="enquiry-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Follow-up notes visible only to the team…"
              className="min-h-28"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit"
              disabled={savingNotes}
              onClick={() => void handleNotesSave()}
            >
              {savingNotes ? "Saving…" : "Save notes"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function DetailRow({
  label,
  value,
}: {
  label: string
  value: ReactNode
}) {
  return (
    <div className="grid gap-0.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}
