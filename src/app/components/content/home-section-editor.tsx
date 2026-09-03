import { useMemo, useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { ArrowLeftIcon, Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import {
  CtaField,
  FormSection,
  RepeatableList,
  TextAreaField,
  TextField,
} from "@/app/components/content/field-components"
import { HomeSectionPreview } from "@/app/components/content/home-section-preview"
import {
  updateHomeSectionData,
} from "@/server/content"
import type { HomeSectionKey } from "@/content/home-sections.registry"
import type { HomeSectionPatch } from "@/content/home-sections.registry"
import { mergeContent } from "@/lib/content-merge"
import { Button } from "@/components/ui/button"

type HomeSectionEditorProps = {
  sectionKey: HomeSectionKey
  label: string
  defaults: HomeSectionPatch
  patch: HomeSectionPatch
}

export function HomeSectionEditor({
  sectionKey,
  label,
  defaults,
  patch,
}: HomeSectionEditorProps) {
  const navigate = useNavigate()
  const initial = useMemo(
    () => mergeContent(defaults, patch) as HomeSectionPatch,
    [defaults, patch],
  )
  const [form, setForm] = useState<HomeSectionPatch>(initial)
  const [saving, setSaving] = useState(false)

  function updateForm(next: HomeSectionPatch) {
    setForm(next)
  }

  async function handleSave() {
    setSaving(true)
    try {
      await updateHomeSectionData({ data: { key: sectionKey, patch: form } })
      toast.success("Section saved. Changes are live on the homepage.")
      void navigate({ to: "/app/pages/home" })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save section.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/app/pages/home">
            <ArrowLeftIcon className="size-4" />
            Back to sections
          </Link>
        </Button>
        <Button onClick={() => void handleSave()} disabled={saving}>
          {saving ? <Loader2Icon className="animate-spin" /> : null}
          Save section
        </Button>
      </div>

      <div>
        <h2 className="font-heading text-2xl">{label}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{sectionKey}</p>
      </div>

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="order-2 min-w-0 space-y-6 xl:order-1">
          {renderSectionForm(sectionKey, form, updateForm)}

          <div className="flex justify-end">
            <Button onClick={() => void handleSave()} disabled={saving}>
              {saving ? <Loader2Icon className="animate-spin" /> : null}
              Save section
            </Button>
          </div>
        </div>

        <div className="order-1 xl:sticky xl:top-4 xl:order-2 xl:self-start">
          <HomeSectionPreview sectionKey={sectionKey} form={form} />
        </div>
      </div>
    </div>
  )
}

function renderSectionForm(
  sectionKey: HomeSectionKey,
  form: HomeSectionPatch,
  setForm: (next: HomeSectionPatch) => void,
) {
  switch (sectionKey) {
    case "hero":
      return (
        <FormSection title="Hero">
          <TextField
            label="Eyebrow"
            value={String(form.eyebrow ?? "")}
            onChange={(eyebrow) => setForm({ ...form, eyebrow })}
          />
          <TextField
            label="Headline"
            value={String(form.headline ?? "")}
            onChange={(headline) => setForm({ ...form, headline })}
          />
          <TextAreaField
            label="Body"
            value={String(form.body ?? "")}
            onChange={(body) => setForm({ ...form, body })}
          />
          <CtaField
            label="Primary CTA"
            value={(form.primaryCta as { label: string; href: string }) ?? { label: "", href: "" }}
            onChange={(primaryCta) => setForm({ ...form, primaryCta })}
          />
          <CtaField
            label="Secondary CTA"
            value={(form.secondaryCta as { label: string; href: string }) ?? { label: "", href: "" }}
            onChange={(secondaryCta) => setForm({ ...form, secondaryCta })}
          />
          <RepeatableList
            title="Stats"
            items={(form.stats as { value: string; label: string }[]) ?? []}
            onChange={(stats) => setForm({ ...form, stats })}
            createItem={() => ({ value: "", label: "" })}
            renderItem={(item, _index, update, remove) => (
              <div className="grid gap-3 rounded-xl border border-border/60 p-4 md:grid-cols-2">
                <TextField label="Value" value={item.value} onChange={(value) => update({ ...item, value })} />
                <TextField label="Label" value={item.label} onChange={(label) => update({ ...item, label })} />
                <div className="md:col-span-2 flex justify-end">
                  <Button type="button" variant="ghost" size="sm" onClick={remove}>Remove</Button>
                </div>
              </div>
            )}
          />
          <RepeatableList
            title="Slides"
            items={(form.slides as { headline?: string; body?: string }[]) ?? []}
            onChange={(slides) => setForm({ ...form, slides })}
            createItem={() => ({ headline: "", body: "" })}
            renderItem={(item, _index, update, remove) => (
              <div className="space-y-3 rounded-xl border border-border/60 p-4">
                <TextField label="Headline" value={item.headline ?? ""} onChange={(headline) => update({ ...item, headline })} />
                <TextAreaField label="Body" value={item.body ?? ""} onChange={(body) => update({ ...item, body })} />
                <div className="flex justify-end">
                  <Button type="button" variant="ghost" size="sm" onClick={remove}>Remove</Button>
                </div>
              </div>
            )}
          />
        </FormSection>
      )
    case "logoStrip":
      return (
        <FormSection title="Client logos">
          <TextField label="Label" value={String(form.label ?? "")} onChange={(label) => setForm({ ...form, label })} />
          <RepeatableList
            title="Clients"
            items={(form.items as { name: string; logo?: string }[]) ?? []}
            onChange={(items) => setForm({ ...form, items })}
            createItem={() => ({ name: "", logo: "" })}
            renderItem={(item, _index, update, remove) => (
              <div className="grid gap-3 rounded-xl border border-border/60 p-4 md:grid-cols-2">
                <TextField label="Name" value={item.name} onChange={(name) => update({ ...item, name })} />
                <TextField label="Logo path" value={item.logo ?? ""} onChange={(logo) => update({ ...item, logo })} />
                <div className="md:col-span-2 flex justify-end">
                  <Button type="button" variant="ghost" size="sm" onClick={remove}>Remove</Button>
                </div>
              </div>
            )}
          />
        </FormSection>
      )
    case "faq":
      return (
        <FormSection title="FAQ">
          <TextField label="Eyebrow" value={String(form.eyebrow ?? "")} onChange={(eyebrow) => setForm({ ...form, eyebrow })} />
          <TextField label="Title" value={String(form.title ?? "")} onChange={(title) => setForm({ ...form, title })} />
          <RepeatableList
            title="Questions"
            items={(form.items as { question: string; answer: string; link?: { label: string; href: string } }[]) ?? []}
            onChange={(items) => setForm({ ...form, items })}
            createItem={() => ({ question: "", answer: "" })}
            renderItem={(item, _index, update, remove) => (
              <div className="space-y-3 rounded-xl border border-border/60 p-4">
                <TextField label="Question" value={item.question} onChange={(question) => update({ ...item, question })} />
                <TextAreaField label="Answer" value={item.answer} onChange={(answer) => update({ ...item, answer })} />
                <div className="flex justify-end">
                  <Button type="button" variant="ghost" size="sm" onClick={remove}>Remove</Button>
                </div>
              </div>
            )}
          />
          <CtaField
            label="Section CTA"
            value={(form.cta as { label: string; href: string }) ?? { label: "", href: "" }}
            onChange={(cta) => setForm({ ...form, cta })}
          />
        </FormSection>
      )
    case "finalCta":
      return (
        <FormSection title="Final CTA">
          <TextField label="Title" value={String(form.title ?? "")} onChange={(title) => setForm({ ...form, title })} />
          <TextAreaField label="Body" value={String(form.body ?? "")} onChange={(body) => setForm({ ...form, body })} />
          <CtaField label="Primary CTA" value={(form.primaryCta as { label: string; href: string }) ?? { label: "", href: "" }} onChange={(primaryCta) => setForm({ ...form, primaryCta })} />
          <CtaField label="Secondary CTA" value={(form.secondaryCta as { label: string; href: string }) ?? { label: "", href: "" }} onChange={(secondaryCta) => setForm({ ...form, secondaryCta })} />
        </FormSection>
      )
    default:
      return (
        <FormSection title="Section copy">
          <IntroFields form={form} setForm={setForm} />
          {sectionKey === "whoIsItFor" ? (
            <AudienceItems form={form} setForm={setForm} />
          ) : null}
          {sectionKey === "opportunities" ? (
            <OpportunityItems form={form} setForm={setForm} />
          ) : null}
          {sectionKey === "location" ? (
            <LocationBenefits form={form} setForm={setForm} />
          ) : null}
          {sectionKey === "why" ? (
            <WhyAdvantages form={form} setForm={setForm} />
          ) : null}
          {sectionKey === "ecosystemFlow" ? (
            <EcosystemSteps form={form} setForm={setForm} />
          ) : null}
          {sectionKey === "campusFacilities" ? (
            <CampusIntroFields form={form} setForm={setForm} />
          ) : null}
          {sectionKey === "products" ? (
            <CtaField label="CTA" value={(form.cta as { label: string; href: string }) ?? { label: "", href: "" }} onChange={(cta) => setForm({ ...form, cta })} />
          ) : null}
        </FormSection>
      )
  }
}

function IntroFields({
  form,
  setForm,
}: {
  form: HomeSectionPatch
  setForm: (next: HomeSectionPatch) => void
}) {
  return (
    <>
      <TextField label="Eyebrow" value={String(form.eyebrow ?? "")} onChange={(eyebrow) => setForm({ ...form, eyebrow })} />
      <TextField label="Title" value={String(form.title ?? "")} onChange={(title) => setForm({ ...form, title })} />
      <TextAreaField label="Body" value={String(form.body ?? "")} onChange={(body) => setForm({ ...form, body })} />
    </>
  )
}

function AudienceItems({ form, setForm }: { form: HomeSectionPatch; setForm: (next: HomeSectionPatch) => void }) {
  type AudienceItem = {
    title: string
    subtitle?: string
    body: string
    cta: { label: string; href: string }
  }
  const items = (form.items as AudienceItem[] | undefined) ?? []
  return (
    <RepeatableList
      title="Audience cards"
      items={items}
      onChange={(nextItems) => setForm({ ...form, items: nextItems })}
      createItem={() => ({ title: "", body: "", cta: { label: "", href: "" } })}
      renderItem={(item, _index, update, remove) => (
        <div className="space-y-3 rounded-xl border border-border/60 p-4">
          <TextField label="Title" value={item.title} onChange={(title) => update({ ...item, title })} />
          <TextField label="Subtitle" value={item.subtitle ?? ""} onChange={(subtitle) => update({ ...item, subtitle })} />
          <TextAreaField label="Body" value={item.body} onChange={(body) => update({ ...item, body })} />
          <CtaField label="Card CTA" value={item.cta} onChange={(cta) => update({ ...item, cta })} />
          <div className="flex justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={remove}>Remove</Button>
          </div>
        </div>
      )}
    />
  )
}

function OpportunityItems({ form, setForm }: { form: HomeSectionPatch; setForm: (next: HomeSectionPatch) => void }) {
  type OpportunityItem = {
    title: string
    kicker?: string
    body: string
    metric?: string
    metricLabel?: string
    featured?: boolean
  }
  const items = (form.items as OpportunityItem[] | undefined) ?? []
  return (
    <>
      <TextField label="Quote" value={String(form.quote ?? "")} onChange={(quote) => setForm({ ...form, quote })} />
      <RepeatableList
        title="Cards"
        items={items}
        onChange={(nextItems) => setForm({ ...form, items: nextItems })}
        createItem={() => ({ title: "", body: "" })}
        renderItem={(item, _index, update, remove) => (
          <div className="space-y-3 rounded-xl border border-border/60 p-4">
            <TextField label="Title" value={item.title} onChange={(title) => update({ ...item, title })} />
            <TextField label="Kicker" value={item.kicker ?? ""} onChange={(kicker) => update({ ...item, kicker })} />
            <TextAreaField label="Body" value={item.body} onChange={(body) => update({ ...item, body })} />
            <div className="grid gap-3 md:grid-cols-2">
              <TextField label="Metric" value={item.metric ?? ""} onChange={(metric) => update({ ...item, metric })} />
              <TextField label="Metric label" value={item.metricLabel ?? ""} onChange={(metricLabel) => update({ ...item, metricLabel })} />
            </div>
            <div className="flex justify-end">
              <Button type="button" variant="ghost" size="sm" onClick={remove}>Remove</Button>
            </div>
          </div>
        )}
      />
      <CtaField label="Section CTA" value={(form.cta as { label: string; href: string }) ?? { label: "", href: "" }} onChange={(cta) => setForm({ ...form, cta })} />
    </>
  )
}

function LocationBenefits({ form, setForm }: { form: HomeSectionPatch; setForm: (next: HomeSectionPatch) => void }) {
  return (
    <RepeatableList
      title="Benefits"
      items={(form.benefits as { title: string; body: string }[]) ?? []}
      onChange={(benefits) => setForm({ ...form, benefits })}
      createItem={() => ({ title: "", body: "" })}
      renderItem={(item, _index, update, remove) => (
        <div className="space-y-3 rounded-xl border border-border/60 p-4">
          <TextField label="Title" value={item.title} onChange={(title) => update({ ...item, title })} />
          <TextAreaField label="Body" value={item.body} onChange={(body) => update({ ...item, body })} />
          <div className="flex justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={remove}>Remove</Button>
          </div>
        </div>
      )}
    />
  )
}

function WhyAdvantages({ form, setForm }: { form: HomeSectionPatch; setForm: (next: HomeSectionPatch) => void }) {
  return (
    <RepeatableList
      title="Advantages"
      items={(form.advantages as { title?: string; body?: string }[]) ?? []}
      onChange={(advantages) => setForm({ ...form, advantages })}
      createItem={() => ({ title: "", body: "" })}
      renderItem={(item, _index, update, remove) => (
        <div className="space-y-3 rounded-xl border border-border/60 p-4">
          <TextField label="Title" value={item.title ?? ""} onChange={(title) => update({ ...item, title })} />
          <TextAreaField label="Body" value={item.body ?? ""} onChange={(body) => update({ ...item, body })} />
          <div className="flex justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={remove}>Remove</Button>
          </div>
        </div>
      )}
    />
  )
}

function EcosystemSteps({ form, setForm }: { form: HomeSectionPatch; setForm: (next: HomeSectionPatch) => void }) {
  return (
    <RepeatableList
      title="Steps"
      items={(form.steps as { title: string; detail: string }[]) ?? []}
      onChange={(steps) => setForm({ ...form, steps })}
      createItem={() => ({ title: "", detail: "" })}
      renderItem={(item, _index, update, remove) => (
        <div className="space-y-3 rounded-xl border border-border/60 p-4">
          <TextField label="Title" value={item.title} onChange={(title) => update({ ...item, title })} />
          <TextAreaField label="Detail" value={item.detail} onChange={(detail) => update({ ...item, detail })} />
          <div className="flex justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={remove}>Remove</Button>
          </div>
        </div>
      )}
    />
  )
}

function CampusIntroFields({ form, setForm }: { form: HomeSectionPatch; setForm: (next: HomeSectionPatch) => void }) {
  type IntroBlock = { eyebrow?: string; title?: string; body?: string }

  const blocks: Array<{ title: string; key: string; value: IntroBlock }> = [
    {
      title: "Campus overview",
      key: "campusOverview",
      value: (form.campusOverview as IntroBlock | undefined) ?? {},
    },
    {
      title: "Facility categories",
      key: "facilityCategories",
      value: (form.facilityCategories as IntroBlock | undefined) ?? {},
    },
    {
      title: "Processing capabilities",
      key: "processingCapabilities",
      value: (form.processingCapabilities as IntroBlock | undefined) ?? {},
    },
  ]

  return (
    <>
      {blocks.map(({ title, key, value }) => (
        <div key={key} className="space-y-3 rounded-xl border border-border/60 p-4">
          <p className="text-sm font-medium">{title}</p>
          <TextField
            label="Eyebrow"
            value={String(value.eyebrow ?? "")}
            onChange={(eyebrow) =>
              setForm({ ...form, [key]: { ...value, eyebrow } })
            }
          />
          <TextField
            label="Title"
            value={String(value.title ?? "")}
            onChange={(titleValue) =>
              setForm({ ...form, [key]: { ...value, title: titleValue } })
            }
          />
          <TextAreaField
            label="Body"
            value={String(value.body ?? "")}
            onChange={(body) => setForm({ ...form, [key]: { ...value, body } })}
          />
        </div>
      ))}
    </>
  )
}