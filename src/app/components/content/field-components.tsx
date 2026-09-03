import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  rows?: number
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export function CtaField({
  label,
  value,
  onChange,
}: {
  label: string
  value: { label: string; href: string }
  onChange: (value: { label: string; href: string }) => void
}) {
  return (
    <div className="space-y-3 rounded-xl border border-border/60 p-4">
      <p className="text-sm font-medium">{label}</p>
      <TextField
        label="Label"
        value={value.label}
        onChange={(labelValue) => onChange({ ...value, label: labelValue })}
      />
      <TextField
        label="Link"
        value={value.href}
        onChange={(href) => onChange({ ...value, href })}
      />
    </div>
  )
}

export function RepeatableList<T>({
  title,
  items,
  onChange,
  renderItem,
  createItem,
  addLabel = "Add item",
}: {
  title: string
  items: T[]
  onChange: (items: T[]) => void
  renderItem: (
    item: T,
    index: number,
    update: (next: T) => void,
    remove: () => void,
  ) => React.ReactNode
  createItem: () => T
  addLabel?: string
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">{title}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange([...items, createItem()])}
        >
          {addLabel}
        </Button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) =>
          renderItem(
            item,
            index,
            (next) => {
              const copy = [...items]
              copy[index] = next
              onChange(copy)
            },
            () => onChange(items.filter((_, itemIndex) => itemIndex !== index)),
          ),
        )}
      </div>
    </div>
  )
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 md:p-6">
      <div>
        <h2 className="font-heading text-lg">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}
