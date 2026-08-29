import { useMemo, useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { CheckIcon, ChevronDownIcon, DownloadIcon, EyeIcon } from "lucide-react"

import type { EnquiryRecord, EnquiryStatus } from "@/app/lib/types"
import { EnquiryDetailSheet } from "@/app/components/enquiry-detail-sheet"
import {
  EnquiryStatusBadge,
  enquiryStatusOptions,
} from "@/app/components/enquiry-status-badge"
import { InterestBadge, interestLabel } from "@/app/components/interest-badge"
import { enquiryInterests } from "@/content/landing"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso))
}

function exportToCsv(records: EnquiryRecord[]) {
  const headers = [
    "Received",
    "Name",
    "Company",
    "Phone",
    "Email",
    "Interest",
    "Status",
    "Source",
    "Message",
    "Notes",
  ]

  const rows = records.map((record) => [
    record.createdAt,
    record.name,
    record.company,
    record.phone,
    record.email,
    interestLabel(record.interest),
    record.status,
    record.source,
    record.message,
    record.notes ?? "",
  ])

  const csv = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n")

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export function EnquiriesTable({
  enquiries,
  loading,
  error,
  onStatusChange,
  onNotesSave,
}: {
  enquiries: EnquiryRecord[]
  loading: boolean
  error: string | null
  onStatusChange: (id: string, status: EnquiryStatus) => Promise<unknown>
  onNotesSave: (id: string, notes: string) => Promise<unknown>
}) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ])
  const [globalFilter, setGlobalFilter] = useState("")
  const [interestFilter, setInterestFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selected, setSelected] = useState<EnquiryRecord | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  function openEnquiry(record: EnquiryRecord) {
    setSelected(record)
    setSheetOpen(true)
  }

  const filteredData = useMemo(() => {
    return enquiries.filter((record) => {
      if (interestFilter !== "all" && record.interest !== interestFilter) {
        return false
      }
      if (statusFilter !== "all" && record.status !== statusFilter) {
        return false
      }
      return true
    })
  }, [enquiries, interestFilter, statusFilter])

  const columns = useMemo<ColumnDef<EnquiryRecord>[]>(
    () => [
      {
        accessorKey: "createdAt",
        header: "Received",
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => row.original.company || "—",
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => (
          <a
            className="font-medium text-primary hover:underline"
            href={`tel:${row.original.phone}`}
            onClick={(event) => event.stopPropagation()}
          >
            {row.original.phone}
          </a>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <a
            className="text-primary hover:underline"
            href={`mailto:${row.original.email}`}
            onClick={(event) => event.stopPropagation()}
          >
            {row.original.email}
          </a>
        ),
      },
      {
        accessorKey: "interest",
        header: "Interest",
        cell: ({ row }) => (
          <InterestBadge interest={row.original.interest} />
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <div className="w-fit" onClick={(event) => event.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <EnquiryStatusBadge status={row.original.status} />
                  <ChevronDownIcon className="size-3.5 shrink-0 opacity-60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-36">
                {enquiryStatusOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    className="flex items-center gap-2"
                    onClick={() =>
                      void onStatusChange(row.original.id, option.value)
                    }
                  >
                    <EnquiryStatusBadge status={option.value} />
                    {row.original.status === option.value ? (
                      <CheckIcon className="ml-auto size-4 text-muted-foreground" />
                    ) : null}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: () => (
          <span className="inline-flex items-center gap-1.5 text-sm text-primary">
            <EyeIcon className="size-4" />
            View
          </span>
        ),
      },
    ],
    [onStatusChange],
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const query = String(filterValue).toLowerCase()
      const record = row.original
      return [
        record.name,
        record.company,
        record.phone,
        record.email,
        record.message,
      ].some((value) => value.toLowerCase().includes(query))
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  })

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Input
            placeholder="Search name, company, email, phone…"
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="h-10 max-w-sm border-border/60 bg-background"
          />
          <Select value={interestFilter} onValueChange={setInterestFilter}>
            <SelectTrigger className="h-10 w-full sm:w-[200px]">
              <SelectValue placeholder="Interest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All interests</SelectItem>
              {enquiryInterests.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-10 w-full sm:w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {enquiryStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          className="gap-2 border-primary/20 text-primary hover:bg-primary/5"
          onClick={() => exportToCsv(filteredData)}
        >
          <DownloadIcon className="size-4" />
          Export CSV
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-border/60 bg-primary/5 hover:bg-primary/5"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-primary">
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 hover:text-foreground"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: " ↑",
                          desc: " ↓",
                        }[header.column.getIsSorted() as string] ?? null}
                      </button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer border-border/40 hover:bg-accent/25"
                  onClick={() => openEnquiry(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No enquiries match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length}{" "}
          {table.getFilteredRowModel().rows.length === 1 ? "enquiry" : "enquiries"}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-9 w-[110px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} rows
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <EnquiryDetailSheet
        enquiry={selected}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onStatusChange={async (id, status) => {
          await onStatusChange(id, status)
          setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev))
        }}
        onNotesSave={async (id, notes) => {
          await onNotesSave(id, notes)
          setSelected((prev) => (prev?.id === id ? { ...prev, notes } : prev))
        }}
      />
    </div>
  )
}
