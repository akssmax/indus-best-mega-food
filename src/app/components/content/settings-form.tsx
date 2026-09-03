import { useMemo, useState } from "react"
import { Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import {
  FormSection,
  RepeatableList,
  TextAreaField,
  TextField,
} from "@/app/components/content/field-components"
import { updateSiteSettings } from "@/server/content"
import type { SiteSettingsPatch } from "@/content/site-settings.schema"
import type { ResolvedSite } from "@/server/content"
import { Button } from "@/components/ui/button"

type SettingsFormProps = {
  merged: ResolvedSite
}

export function SettingsForm({ merged }: SettingsFormProps) {
  const [phones, setPhones] = useState(
    merged.phones.map((phone) => ({ ...phone })) as Array<{
      label: string
      number: string
      href: string
    }>,
  )
  const [emails, setEmails] = useState(
    merged.emails.map((email) => ({ ...email })) as Array<{
      label: string
      address: string
      href: string
    }>,
  )
  const [addresses, setAddresses] = useState({
    works: { ...merged.addresses.works, lines: [...merged.addresses.works.lines] },
    corporate: {
      ...merged.addresses.corporate,
      lines: [...merged.addresses.corporate.lines],
    },
    registered: {
      ...merged.addresses.registered,
      lines: [...merged.addresses.registered.lines],
    },
  })
  const [socials, setSocials] = useState(
    merged.socials.map((social) => ({ ...social })) as Array<{
      label: string
      href: string
    }>,
  )
  const [nav, setNav] = useState(
    merged.nav.map((item) => ({ ...item })) as Array<{ label: string; href: string }>,
  )
  const [explore, setExplore] = useState(
    merged.explore.map((item) => ({ ...item })) as Array<{ label: string; href: string }>,
  )
  const [homeTitle, setHomeTitle] = useState<string>(merged.home.title)
  const [homeDescription, setHomeDescription] = useState<string>(merged.home.description)
  const [saving, setSaving] = useState(false)

  const payload = useMemo<SiteSettingsPatch>(
    () => ({
      phones,
      emails,
      addresses,
      socials,
      nav,
      explore,
      home: { title: homeTitle, description: homeDescription },
    }),
    [phones, emails, addresses, socials, nav, explore, homeTitle, homeDescription],
  )

  async function handleSave() {
    setSaving(true)
    try {
      await updateSiteSettings({ data: payload })
      toast.success("Settings saved. Changes are live on the site.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save settings.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
        Changes save live immediately across the public site.
      </div>

      <FormSection title="Home SEO" description="Title and description for the homepage.">
        <TextField label="Title" value={homeTitle} onChange={setHomeTitle} />
        <TextAreaField
          label="Description"
          value={homeDescription}
          onChange={setHomeDescription}
        />
      </FormSection>

      <FormSection title="Contact phones">
        <RepeatableList
          title="Phone numbers"
          items={phones}
          onChange={setPhones}
          createItem={() => ({ label: "New contact", number: "", href: "tel:" })}
          renderItem={(item, _index, update, remove) => (
            <div className="space-y-3 rounded-xl border border-border/60 p-4">
              <div className="flex justify-end">
                <Button type="button" variant="ghost" size="sm" onClick={remove}>
                  Remove
                </Button>
              </div>
              <TextField
                label="Label"
                value={item.label}
                onChange={(label) => update({ ...item, label })}
              />
              <TextField
                label="Number"
                value={item.number}
                onChange={(number) => update({ ...item, number, href: `tel:${number.replace(/\s/g, "")}` })}
              />
            </div>
          )}
        />
      </FormSection>

      <FormSection title="Contact emails">
        <RepeatableList
          title="Email addresses"
          items={emails}
          onChange={setEmails}
          createItem={() => ({
            label: "New inbox",
            address: "",
            href: "mailto:",
          })}
          renderItem={(item, _index, update, remove) => (
            <div className="space-y-3 rounded-xl border border-border/60 p-4">
              <div className="flex justify-end">
                <Button type="button" variant="ghost" size="sm" onClick={remove}>
                  Remove
                </Button>
              </div>
              <TextField
                label="Label"
                value={item.label}
                onChange={(label) => update({ ...item, label })}
              />
              <TextField
                label="Address"
                value={item.address}
                onChange={(address) =>
                  update({ ...item, address, href: `mailto:${address}` })
                }
              />
            </div>
          )}
        />
      </FormSection>

      <FormSection title="Addresses">
        {(["works", "corporate", "registered"] as const).map((key) => (
          <div key={key} className="space-y-3 rounded-xl border border-border/60 p-4">
            <TextField
              label={`${key} label`}
              value={addresses[key].label}
              onChange={(label) =>
                setAddresses((current) => ({
                  ...current,
                  [key]: { ...current[key], label },
                }))
              }
            />
            <TextAreaField
              label="Lines (one per line)"
              value={addresses[key].lines.join("\n")}
              onChange={(value) =>
                setAddresses((current) => ({
                  ...current,
                  [key]: {
                    ...current[key],
                    lines: value.split("\n").map((line) => line.trim()).filter(Boolean),
                  },
                }))
              }
              rows={4}
            />
          </div>
        ))}
      </FormSection>

      <FormSection title="Social links">
        <RepeatableList
          title="Social profiles"
          items={socials}
          onChange={setSocials}
          createItem={() => ({ label: "Social", href: "https://" })}
          renderItem={(item, _index, update, remove) => (
            <div className="space-y-3 rounded-xl border border-border/60 p-4">
              <div className="flex justify-end">
                <Button type="button" variant="ghost" size="sm" onClick={remove}>
                  Remove
                </Button>
              </div>
              <TextField
                label="Label"
                value={item.label}
                onChange={(label) => update({ ...item, label })}
              />
              <TextField
                label="URL"
                value={item.href}
                onChange={(href) => update({ ...item, href })}
              />
            </div>
          )}
        />
      </FormSection>

      <FormSection title="Main navigation">
        <RepeatableList
          title="Nav links"
          items={nav}
          onChange={setNav}
          createItem={() => ({ label: "New link", href: "/" })}
          renderItem={(item, _index, update, remove) => (
            <div className="grid gap-3 rounded-xl border border-border/60 p-4 md:grid-cols-2">
              <TextField
                label="Label"
                value={item.label}
                onChange={(label) => update({ ...item, label })}
              />
              <TextField
                label="Href"
                value={item.href}
                onChange={(href) => update({ ...item, href })}
              />
              <div className="md:col-span-2 flex justify-end">
                <Button type="button" variant="ghost" size="sm" onClick={remove}>
                  Remove
                </Button>
              </div>
            </div>
          )}
        />
      </FormSection>

      <FormSection title="Explore links">
        <RepeatableList
          title="Explore menu"
          items={explore}
          onChange={setExplore}
          createItem={() => ({ label: "New link", href: "/" })}
          renderItem={(item, _index, update, remove) => (
            <div className="grid gap-3 rounded-xl border border-border/60 p-4 md:grid-cols-2">
              <TextField
                label="Label"
                value={item.label}
                onChange={(label) => update({ ...item, label })}
              />
              <TextField
                label="Href"
                value={item.href}
                onChange={(href) => update({ ...item, href })}
              />
              <div className="md:col-span-2 flex justify-end">
                <Button type="button" variant="ghost" size="sm" onClick={remove}>
                  Remove
                </Button>
              </div>
            </div>
          )}
        />
      </FormSection>

      <div className="flex justify-end">
        <Button onClick={() => void handleSave()} disabled={saving}>
          {saving ? <Loader2Icon className="animate-spin" /> : null}
          Save settings
        </Button>
      </div>
    </div>
  )
}
