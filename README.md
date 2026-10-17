# Due Label Technologies — website

One-page brand site. Next.js 14 (App Router) · TypeScript · Tailwind 3 · Framer Motion 11.
Same stack and conventions as `motion-kit`, so components move between the two freely.

## Run

```bash
npm install
cp .env.example .env.local   # then fill in the WhatsApp number (and Resend key, optional)
npm run dev                  # http://localhost:3000
```

`npm run build && npm start` for production. Deploys to Vercel as-is.

## Where things live

| Path | What |
| --- | --- |
| `lib/site.ts` | **All copy, projects, links and contact details.** Edit here, not in components. |
| `app/layout.tsx` | Fonts (Poppins + Inter, self-hosted from `@fontsource` via `next/font/local`), metadata. |
| `app/page.tsx` | Section order. |
| `app/globals.css` | Tailwind layers + the keyframes CSS still does best (glitter, marquee, glows, textures). |
| `tailwind.config.ts` | Brand tokens: `navy`, `blue`, `cyan`, `grey`, `charcoal`, `muted`, `line`, `mist`, `ember`, `wa`. |
| `components/motion/` | Reusable motion primitives (see below). |
| `components/sections/` | One file per section of the page. |
| `components/ui/` | Logo/Mark, smooth in-page link, copy-to-clipboard button. |
| `app/api/brief/route.ts` | Receives the contact form and emails it. |
| `public/images/` | Hero photo and the six project screenshots. |
| `app/icon.svg`, `app/apple-icon.png`, `app/manifest.ts` | Favicon (brand mark), iOS home-screen icon, PWA manifest + `/public/icon-*.png`. |

## Motion primitives

- `HoverHighlightGrid` — from motion-kit. Shared `layoutId` slab glides between cards. Extended with `trailing` (the navy CTA card sits in the grid but is never a target) and a per-cell leave so the slab hides when the pointer moves onto that CTA.
- `TiltCard` / `TiltLayer` — from motion-kit. Two fixes: layers rest at `z: 2` (never coplanar with the card face) and `transformStyle` is only `preserve-3d` while hovered. Without these, form controls blink out as the card settles.
- `PuzzleImage` — cuts an image into a 9×6 grid; tiles fly in and rest as a loose, floating mosaic. Scatter is generated client-side after mount so SSR output is deterministic.
- `Typewriter` — cycles the hero's service words.
- `Reveal` — `whileInView` rise-in with an optional stagger delay.

## Contact form

On submit the page does two things at once:

1. Opens WhatsApp (`wa.me/<number>?text=…`) with the brief pre-filled, so the visitor just taps send.
2. POSTs the brief to `/api/brief`, which emails it. With `RESEND_API_KEY` set it sends via Resend (verify your domain there and set `BRIEF_FROM`); without it, it relays through FormSubmit (first submission triggers a one-time activation email to the inbox).

A page can't push into WhatsApp server-side without the WhatsApp Business API, which is why step 1 is "visitor sends". If that's ever wanted, it's a second provider call in the same route.

## Before launch

- Replace the placeholder WhatsApp number in `.env.local` (also drives the phone button and the floating button).
- Real social links in `lib/site.ts` → `site.social`.
- `public/icons/whatsapp.png` is a 160px raster; swap for Meta's SVG from their brand resources if you want it crisper.
- Privacy / Terms links in the footer currently point to `#top`.
- Confirm the "within one working day" promise in the contact copy.
