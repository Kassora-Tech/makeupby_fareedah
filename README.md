# Fareedah Davis — Portfolio Site

Single-page portfolio for Fareedah Davis, Senior Makeup Artist (Cape Town).
Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

All copy, image slots, services, and credentials live in **one file**:
[src/data/content.ts](src/data/content.ts). Edit there rather than in components.

## Swapping in real photography

Every image is a single string in `content.ts`. To replace a placeholder:

1. Drop the photo into `/public` (e.g. `public/glam-01.jpg`).
2. Change that one line: `src: U("1502823403499-...")` → `src: "/glam-01.jpg"`.

`ImageSlot` renders through `next/image` and falls back to a styled block if a
file is missing, so nothing breaks mid-swap. When all real photos are in, set
`showsStockCredit = false` in `content.ts` to drop the footer credit line.

### About the current placeholders

They are hand-picked Unsplash photos (free license, commercial use permitted),
chosen for cool-toned editorial mood. **They are placeholders, not a curated
set** — Unsplash and Pexels both require an API key for search and block
unauthenticated requests, so these were selected by hand from verified URLs.

With a free key from [unsplash.com/developers](https://unsplash.com/developers)
you can pull a wider, better-matched set per category:

```bash
UNSPLASH_ACCESS_KEY=your_key node scripts/fetch-unsplash.mjs
```

It prints ready-to-paste URLs grouped by gallery category. Review the results
before pasting — search relevance varies.

## Before launch

- **Contact form endpoint** — [src/app/api/contact/route.ts](src/app/api/contact/route.ts)
  is a placeholder that logs to the server console and returns success. Swap it
  for a real email service (Resend, Formspree, SendGrid) so inquiries actually
  arrive.
- **Real photography** — replace the Unsplash placeholders as above.

## Design system

Palette follows a 60/30/10 ratio, defined as CSS variables in
[src/app/globals.css](src/app/globals.css):

| Role | Token | Value |
| --- | --- | --- |
| Dominant base | `--ink` / `--surface` | `#0A0B0F` / `#15161C` |
| Secondary (structure, muted text, grain tint) | `--slate-700` / `--slate-500` / `--slate-300` | `#3A3F52` / `#5C6178` / `#9A9CAA` |
| Signature accent | `--accent` | `#3D6BFF` |
| Rare spark (used twice site-wide) | `--spark` | `#E0217D` |
| Optional cool pop | `--icy` | `#5FE3E0` |
| Text | `--text` / `--text-muted` | `#F1F0EC` / `#9A9CAA` |

Type: **Playfair Display** for display/headlines, **Inter** for body/UI.

### Motion

- `Reveal` ([src/components/Reveal.tsx](src/components/Reveal.tsx)) — scroll-in
  reveals via IntersectionObserver, animating `opacity`/`transform` only so work
  stays on the compositor. Observers disconnect after firing.
- `IntroLoader` ([src/components/IntroLoader.tsx](src/components/IntroLoader.tsx)) —
  ~1.25s studio title card on first load. Skippable by click or keypress, and an
  inline script in `layout.tsx` stamps `data-intro="seen"` before first paint so
  repeat visits in the same session never flash it.
- All motion is disabled under `prefers-reduced-motion: reduce`.

**Note on `ImageSlot`:** its wrapper is always `position: relative` (required by
`next/image` `fill`). To position one absolutely, wrap it in a positioned parent
rather than passing `absolute` in `className` — the utility won't reliably win
the cascade.

## Deploying

Push to a Git repo and import it in Vercel. No extra configuration needed —
`next.config.ts` already allowlists the Unsplash image host.
