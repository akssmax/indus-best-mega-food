import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate, useRouter } from "@tanstack/react-router"
import type { JSONContent } from "@tiptap/core"
import { ImageIcon, Loader2Icon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import { RichTextEditor } from "@/app/components/rich-text-editor"
import { uploadMedia } from "@/server/media"
import {
  createAuthor,
  createCategory,
  createPost,
  deleteCategory,
  updatePost,
  type CategoryWithUsage,
  type PostInput,
} from "@/server/posts"
import type { Author, Post } from "@/server/schema"
import { slugify } from "@/lib/slug"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const NONE = "__none__"

type PostEditorProps = {
  post:
    | (Post & {
        featuredImage: { id: string; url: string; alt: string } | null
      })
    | null
  authors: Author[]
  categories: CategoryWithUsage[]
}

export function PostEditor({
  post,
  authors: initialAuthors,
  categories: initialCategories,
}: PostEditorProps) {
  const navigate = useNavigate()
  const router = useRouter()

  const [title, setTitle] = useState(post?.title ?? "")
  const [slug, setSlug] = useState(post?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(Boolean(post))
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "")
  const [authorId, setAuthorId] = useState(post?.authorId ?? NONE)
  const [categoryId, setCategoryId] = useState(post?.categoryId ?? NONE)
  const [status, setStatus] = useState<"draft" | "published">(
    post?.status ?? "draft",
  )
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle ?? "")
  const [seoDescription, setSeoDescription] = useState(
    post?.seoDescription ?? "",
  )
  const [featuredImage, setFeaturedImage] = useState<{
    id: string
    url: string
  } | null>(post?.featuredImage ?? null)
  const [contentJson, setContentJson] = useState<JSONContent | null>(
    post?.contentJson ?? null,
  )
  const [contentHtml, setContentHtml] = useState(post?.contentHtml ?? "")
  const [authors, setAuthors] = useState(initialAuthors)
  const [categories, setCategories] = useState(initialCategories)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [categoryBusy, setCategoryBusy] = useState(false)
  const featuredInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title))
  }, [title, slugTouched])

  const payload = useMemo<PostInput>(
    () => ({
      title,
      slug,
      excerpt,
      contentJson,
      contentHtml,
      featuredImageId: featuredImage?.id ?? null,
      authorId: authorId === NONE ? null : authorId,
      categoryId: categoryId === NONE ? null : categoryId,
      status,
      seoTitle,
      seoDescription,
    }),
    [
      title,
      slug,
      excerpt,
      contentJson,
      contentHtml,
      featuredImage,
      authorId,
      categoryId,
      status,
      seoTitle,
      seoDescription,
    ],
  )

  async function onSave(nextStatus?: "draft" | "published") {
    const finalPayload = nextStatus
      ? { ...payload, status: nextStatus }
      : payload
    setSaving(true)
    try {
      if (post) {
        await updatePost({ data: { id: post.id, ...finalPayload } })
        toast.success("Post saved.")
      } else {
        const created = await createPost({ data: finalPayload })
        toast.success("Post created.")
        await navigate({
          to: "/app/posts/$postId",
          params: { postId: created.id },
        })
      }
      await router.invalidate()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed.")
    } finally {
      setSaving(false)
    }
  }

  async function onFeaturedImageUpload(file: File) {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.set("file", file)
      formData.set("alt", title || file.name)
      const record = await uploadMedia({ data: formData })
      setFeaturedImage({ id: record.id, url: record.url })
      toast.success("Image uploaded.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.")
    } finally {
      setUploading(false)
    }
  }

  async function onAddCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const name = newCategoryName.trim()
    if (!name) return
    setCategoryBusy(true)
    try {
      const created = await createCategory({ data: { name } })
      setCategories((prev) =>
        [...prev, { ...created, postCount: 0 }].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      )
      setCategoryId(created.id)
      setNewCategoryName("")
      toast.success("Category added.")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not add category.",
      )
    } finally {
      setCategoryBusy(false)
    }
  }

  async function onDeleteCategory(category: CategoryWithUsage) {
    if (category.postCount > 0) return
    setCategoryBusy(true)
    try {
      await deleteCategory({ data: { id: category.id } })
      setCategories((prev) => prev.filter((item) => item.id !== category.id))
      if (categoryId === category.id) setCategoryId(NONE)
      toast.success("Category removed.")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not delete category.",
      )
    } finally {
      setCategoryBusy(false)
    }
  }

  async function onAddAuthor() {
    const name = window.prompt("New author name")
    if (!name?.trim()) return
    try {
      const created = await createAuthor({ data: { name } })
      setAuthors((prev) => [...prev, created])
      setAuthorId(created.id)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not add author.",
      )
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-5">
        <div className="grid gap-1.5">
          <Label htmlFor="post-title">Title</Label>
          <Input
            id="post-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Post title"
            className="h-11 bg-background text-base"
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="post-slug">Slug</Label>
          <Input
            id="post-slug"
            value={slug}
            onChange={(event) => {
              setSlugTouched(true)
              setSlug(event.target.value)
            }}
            placeholder="post-url-slug"
            className="bg-background font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Public URL: /blog/{slug || "…"}
          </p>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="post-excerpt">Excerpt</Label>
          <Textarea
            id="post-excerpt"
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            placeholder="One or two sentences shown on the blog index and in search results."
            rows={3}
            className="bg-background"
          />
        </div>

        <div className="grid gap-1.5">
          <Label>Body</Label>
          <RichTextEditor
            initialJson={post?.contentJson}
            initialHtml={post?.contentHtml}
            onChange={(json, html) => {
              setContentJson(json)
              setContentHtml(html)
            }}
          />
        </div>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
        <div className="space-y-4 rounded-xl border border-border/60 bg-card p-4">
          <div className="grid gap-1.5">
            <Label>Status</Label>
            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value as "draft" | "published")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <div className="flex items-center justify-between">
              <Label>Category</Label>
              <button
                type="button"
                className="text-xs font-medium text-primary hover:underline"
                onClick={() => setCategoryDialogOpen(true)}
              >
                + New
              </button>
            </div>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Uncategorised" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>Uncategorised</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <div className="flex items-center justify-between">
              <Label>Author</Label>
              <button
                type="button"
                className="text-xs font-medium text-primary hover:underline"
                onClick={() => void onAddAuthor()}
              >
                + New
              </button>
            </div>
            <Select value={authorId} onValueChange={setAuthorId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="No author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>No author</SelectItem>
                {authors.map((author) => (
                  <SelectItem key={author.id} value={author.id}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-border/60 bg-card p-4">
          <Label>Featured image</Label>
          {featuredImage ? (
            <div className="relative overflow-hidden rounded-lg border border-border/60">
              <img
                src={featuredImage.url}
                alt=""
                className="aspect-video w-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon-sm"
                className="absolute right-2 top-2"
                onClick={() => setFeaturedImage(null)}
                aria-label="Remove featured image"
              >
                <Trash2Icon className="size-4" />
              </Button>
            </div>
          ) : (
            <button
              type="button"
              disabled={uploading}
              onClick={() => featuredInputRef.current?.click()}
              className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 text-sm text-muted-foreground transition-colors hover:bg-muted/50"
            >
              {uploading ? (
                <Loader2Icon className="size-5 animate-spin" />
              ) : (
                <ImageIcon className="size-5" />
              )}
              {uploading ? "Uploading…" : "Upload image"}
            </button>
          )}
          <input
            ref={featuredInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) void onFeaturedImageUpload(file)
              event.target.value = ""
            }}
          />
        </div>

        <div className="space-y-4 rounded-xl border border-border/60 bg-card p-4">
          <div className="grid gap-1.5">
            <Label htmlFor="post-seo-title">SEO title</Label>
            <Input
              id="post-seo-title"
              value={seoTitle}
              onChange={(event) => setSeoTitle(event.target.value)}
              placeholder="Defaults to the post title"
              className="bg-background"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="post-seo-description">SEO description</Label>
            <Textarea
              id="post-seo-description"
              value={seoDescription}
              onChange={(event) => setSeoDescription(event.target.value)}
              placeholder="Defaults to the excerpt"
              rows={3}
              className="bg-background"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="cta"
            disabled={saving}
            onClick={() => void onSave()}
          >
            {saving ? "Saving…" : post ? "Save changes" : "Create post"}
          </Button>
          {status === "draft" ? (
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={() => void onSave("published")}
            >
              Save & publish
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={() => void onSave("draft")}
            >
              Unpublish (move to draft)
            </Button>
          )}
        </div>
      </aside>

      <Dialog
        open={categoryDialogOpen}
        onOpenChange={(open) => {
          setCategoryDialogOpen(open)
          if (!open) setNewCategoryName("")
        }}
      >
        <DialogContent className="sm:max-w-md" showCloseButton>
          <DialogHeader>
            <DialogTitle>Categories</DialogTitle>
            <DialogDescription>
              Add a category for this post, or remove ones that are not used by
              any post.
            </DialogDescription>
          </DialogHeader>

          <form className="flex gap-2" onSubmit={(event) => void onAddCategory(event)}>
            <Input
              value={newCategoryName}
              onChange={(event) => setNewCategoryName(event.target.value)}
              placeholder="New category name"
              autoFocus
              className="h-9 bg-background"
              disabled={categoryBusy}
            />
            <Button
              type="submit"
              size="sm"
              className="shrink-0"
              disabled={categoryBusy || !newCategoryName.trim()}
            >
              Add
            </Button>
          </form>

          <ul className="max-h-64 space-y-1 overflow-y-auto">
            {categories.length === 0 ? (
              <li className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-sm text-muted-foreground">
                No categories yet
              </li>
            ) : (
              categories.map((category) => {
                const inUse = category.postCount > 0
                return (
                  <li
                    key={category.id}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted/50"
                  >
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">
                      {category.name}
                    </span>
                    {inUse ? (
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {category.postCount === 1
                          ? "1 post"
                          : `${category.postCount} posts`}
                      </span>
                    ) : (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground hover:text-destructive"
                        disabled={categoryBusy}
                        aria-label={`Delete ${category.name}`}
                        onClick={() => void onDeleteCategory(category)}
                      >
                        <Trash2Icon className="size-4" />
                      </Button>
                    )}
                  </li>
                )
              })
            )}
          </ul>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setCategoryDialogOpen(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
