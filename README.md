# PSYCHO2.9 portfolio (Next.js, Vercel-ready)

## Deploy
1. Push this folder to GitHub (or run `npx vercel` inside it).
2. Import the repo in Vercel. Framework preset: **Next.js**. No build settings to change.
3. Contact links are editable from environment variables. In Vercel: Project → Settings → Environment Variables →
   add `NEXT_PUBLIC_TELEGRAM_URL`, `NEXT_PUBLIC_TELEGRAM_CHANNEL_URL`, `NEXT_PUBLIC_YOUTUBE_URL`,
   `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_SITE_URL` (Production + Preview), then **Redeploy**
   (`NEXT_PUBLIC_*` values are baked in at build time). Set a value to `-` to hide a row.
   Locally copy `.env.example` to `.env.local` (never commit it). Defaults live in `lib/site.ts`.

Local: `npm install && npm run dev` (Node 18.18+ / 20+).

## Behaviour
- Theme follows the device / browser (`prefers-color-scheme`): dark = black + red, light = white + red. No toggle.
- Intro plays on every visit with sound and a Skip button. If the browser blocks sound-on autoplay it starts
  muted and turns sound on at the first tap / key press. Skipped for visitors with "reduce motion".
- Reel section: tap/click any logo to zoom it and see what it stands for.

## Data protection (India DPDP Act, 2023)
The site has **no contact form, no analytics, no tracking pixels, no cookies and no login**, so it does not collect
personal data. That is why there is no privacy-policy page, terms page, consent pop-up or 18+ gate.
"Send a brief" is a plain `mailto:` link. **Re-check before adding** a form, analytics (incl. Vercel Analytics),
embeds (YouTube iframes), or any sign-up. Then you need a privacy notice and consent. Not legal advice.

## SEO files (real files, not code)
`public/robots.txt`, `public/sitemap.xml` and `public/llms.txt` are plain files. `scripts/generate-seo.mjs` rewrites them with your
real domain before every build (`npm run seo` does it on demand). The domain comes from `NEXT_PUBLIC_SITE_URL`, otherwise Vercel's own
domain. The copies in this zip say `https://your-domain.com` until the first build. Tools/projects in `llms.txt` come from `lib/data.ts`.
`vercel.json` holds the security headers and cache rules. Do not add `app/robots.ts` or `app/sitemap.ts` (they clash with the files).

## Files
- `lib/data.ts` tools (reel logos), projects, timeline
- `lib/site.ts` site URL + contact links
- `public/og-image.jpg` (1200x630), `public/icon.png`, `public/favicon.ico`, `public/apple-touch-icon.png`
