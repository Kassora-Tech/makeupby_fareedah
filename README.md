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

### Brand mark vs. legal name

`brand` in `content.ts` holds both:

- `brand.mark` (`makeupby_fareedah`) — the wordmark shown in the nav and intro card.
- `brand.heroLines` — the same handle split across two lines for the oversized
  hero. The break point is data, not markup, so it's easy to change.
- `brand.legalName` (`Fareedah Davis`) — used for the footer copyright, the page
  title/metadata, and a visually-hidden line in the hero, so the real name still
  reaches search engines and screen readers.

## Photography

Every photo on the site is Fareedah's own work, in `public/images`. There is no
stock imagery left. Each image is a single string in `content.ts`, so swapping a
shot is a one-line change.

### Adding new work

Because Vercel's Image Optimization is disabled (see below), **the committed file
is exactly what browsers download.** Don't commit multi-megabyte PNGs straight off
a phone or camera — convert them first:

```bash
node -e "const s=require('sharp');s('public/images/NEW.png').resize({width:1200,withoutEnlargement:true}).jpeg({quality:82,mozjpeg:true}).toFile('public/images/NEW.jpg')"
```

That pipeline took the current set from 21.3 MB of PNG to 1.4 MB of JPEG with no
visible quality loss. `public/images/*.png` is gitignored, so masters can sit
beside the shipped `.jpg` without bloating the repo.

Then add an entry to `galleryImages` in `content.ts`:

```ts
{ id: "unique-id", category: "Editorial", src: "/images/NEW.jpg", alt: "…", aspect: "portrait" }
```

Filter tabs are **derived from the images present**, so a new category creates its
own tab automatically and no tab can appear with nothing behind it. `aspect`
(`portrait` / `square` / `tall` / `wide`) only crops the tile — it never distorts
the photo.

## Before launch

- **Contact form endpoint** — [src/app/api/contact/route.ts](src/app/api/contact/route.ts)
  is a placeholder that logs to the server console and returns success. Swap it
  for a real email service (Resend, Formspree, SendGrid) so inquiries actually
  arrive. This is the one genuine gap: right now a booking enquiry goes nowhere.

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
  ~1.25s studio title card on first load. Skippable by click or keypress. An
  inline script in the `<head>` of `layout.tsx` stamps `data-intro="seen"` on
  `<html>` before first paint, and CSS hides the overlay, so repeat visits in the
  same session never flash it. `<html>` carries `suppressHydrationWarning` because
  that attribute is added pre-hydration by design. Keep the script in `<head>`:
  React never executes script tags rendered as children inside components.
- All motion is disabled under `prefers-reduced-motion: reduce`.

**Note on `ImageSlot`:** its wrapper is always `position: relative` (required by
`next/image` `fill`). To position one absolutely, wrap it in a positioned parent
rather than passing `absolute` in `className` — the utility won't reliably win
the cascade.

## Deploying

Push to a Git repo and import it in Vercel. **No environment variables are
required** — nothing in the app reads `process.env`.

### Image Optimization is off — on purpose

`next.config.ts` sets `images.unoptimized`. Vercel's Image Optimization is a
metered feature that isn't enabled on this account, and with it on every
`/_next/image` request returned `HTTP 402`
(`OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED`) — meaning **no image on the site
rendered at all**, even though the underlying files served fine.

Bypassing the optimizer costs nothing. `next/image` still drives layout via `fill`
and the aspect-ratio wrappers, so there's no layout shift; we lose automatic
resizing and WebP/AVIF, and compensate by pre-compressing files (see
[Photography](#photography)).

If Image Optimization is enabled on the plan later, delete the `unoptimized` line
to turn it back on.
