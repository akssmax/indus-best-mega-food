import { useMemo, useState } from "react"
import { Link, useRouter } from "@tanstack/react-router"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { ColumnDef, SortingState } from "@tanstack/react-table"
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"
import { toast } from "sonner"

import { deletePost, setPostStatus } from "@/server/posts"
import type { PostListItem } from "@/server/posts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function formatDate(iso: string | null) {
  if (!iso) return "—"
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
    new Date(iso),
  )
}

export function PostsTable({ posts }: { posts: PostListItem[] }) {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([
    { id: "updatedAt", desc: true },
  ])
  const [globalFilter, setGlobalFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [pendingDelete, setPendingDelete] = useState<PostListItem | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filteredData = useMemo(
    () =>
      posts.filter(
        (post) => statusFilter === "all" || post.status === statusFilter,
      ),
    [posts, statusFilter],
  )

  async function toggleStatus(post: PostListItem) {
    const next = post.status === "published" ? "draft" : "published"
    try {
      await setPostStatus({ data: { id: post.id, status: next } })
      toast.success(
        next === "published" ? "Post published." : "Post moved to draft.",
      )
      await router.invalidate()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed.")
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return
    setDeleting(true)
    try {
      await deletePost({ data: { id: pendingDelete.id } })
      toast.success("Post deleted.")
      setPendingDelete(null)
      await router.invalidate()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed.")
    } finally {
      setDeleting(false)
    }
  }

  const columns = useMemo<ColumnDef<PostListItem>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <div className="max-w-md">
            <p className="truncate font-medium">{row.original.title}</p>
            <p className="truncate text-xs text-muted-foreground">
              /blog/{row.original.slug}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => row.original.category?.name ?? "—",
      },
      {
        accessorKey: "author",
        header: "Author",
        cell: ({ row }) => row.original.author?.name ?? "—",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) =>
          row.original.status === "published" ? (
            <div className="flex items-center gap-1.5">
              <Badge>Published</Badge>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:text-foreground"
                asChild
              >
                <a
                  href={`/blog/${row.original.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${row.original.title} on the site`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              </Button>
            </div>
          ) : (
            <Badge variant="secondary">Draft</Badge>
          ),
      },
      {
        accessorKey: "publishedAt",
        header: "Published",
        cell: ({ row }) => formatDate(row.original.publishedAt),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div onClick={(event) => event.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Post actions">
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem asChild>
                  <Link
                    to="/app/posts/$postId"
                    params={{ postId: row.original.id }}
                  >
                    <PencilIcon className="size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                {row.original.status === "published" ? (
                  <DropdownMenuItem asChild>
                    <a
                      href={`/blog/${row.original.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLinkIcon className="size-4" />
                      View live
                    </a>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem
                  onClick={() => void toggleStatus(row.original)}
                >
                  <ChevronDownIcon className="size-4" />
                  {row.original.status === "published"
                    ? "Move to draft"
                    : "Publish"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setPendingDelete(row.original)}
                >
                  <Trash2Icon className="size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [],
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const query = String(filterValue).toLowerCase()
      const post = row.original
      return [post.title, post.slug, post.excerpt].some((value) =>
        value.toLowerCase().includes(query),
      )
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <Input
            placeholder="Search title, slug, excerpt…"
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="h-10 max-w-sm border-border/60 bg-background"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-10 w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button asChild variant="cta" className="gap-2">
          <Link to="/app/posts/new">
            <PlusIcon className="size-4" />
            New post
          </Link>
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
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-border/40">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
                  No posts yet. Create your first post to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length}{" "}
          {table.getFilteredRowModel().rows.length === 1 ? "post" : "posts"}
        </p>
        <div className="flex items-center gap-2">
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

      <Dialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this post?</DialogTitle>
            <DialogDescription>
              “{pendingDelete?.title}” will be permanently removed. This cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPendingDelete(null)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => void confirmDelete()}
              disabled={deleting}
            >
              {deleting ? "Deleting…" : "Delete post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
