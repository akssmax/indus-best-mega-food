import { cn } from "@/lib/utils"

export function PostBody({
  html,
  className,
}: {
  html: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none dark:prose-invert",
        "prose-headings:font-heading prose-headings:tracking-tight",
        "prose-a:text-primary prose-img:rounded-xl",
        className,
      )}
      // Content is authored by authenticated admins via the Tiptap editor.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
