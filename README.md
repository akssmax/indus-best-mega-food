# TanStack Start + shadcn/ui

This is a template for a new TanStack Start project with React, TypeScript, and shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## CMS dashboard (`/app`)

The team dashboard manages blog posts, enquiries, **site settings**, and the **home page**.

### Setup

After pulling CMS changes, apply the new tables and seed defaults:

```bash
npm run db:push
npm run db:seed
```

### Site settings

`/app/settings` — edit contact details, addresses, social links, navigation, explore menu, and home SEO. **Changes save live** (no draft/publish in v1).

### Home page

`/app/pages/home` — toggle sections on/off, reorder them, and edit copy per section. Defaults remain in `src/content/landing.ts`; the database stores overrides only.

**Note:** v1 edits go live immediately. Prefer editing during low-traffic periods until draft/publish is added.
