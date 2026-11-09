/**
 * Writes public/robots.txt, public/sitemap.xml and public/llms.txt with your real domain.
 * Runs automatically before `next build` (see "prebuild" in package.json), also on Vercel.
 *
 * Domain, in order: NEXT_PUBLIC_SITE_URL -> Vercel production domain -> Vercel deployment URL -> placeholder.
 * Contact links use the same NEXT_PUBLIC_* variables as the site (set one to "-" to hide it).
 * Tools and projects are read from lib/data.ts, so edit them there only.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const clean = (v) => (v ?? '').trim();
const pick = (v, fallback) => {
  const x = clean(v);
  return x === '-' ? '' : x || fallback;
};

const siteUrl = (() => {
  const explicit = clean(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) return explicit.replace(/\/+$/, '');
  const vercel = clean(process.env.VERCEL_PROJECT_PRODUCTION_URL) || clean(process.env.VERCEL_URL);
  return vercel ? `https://${vercel}` : 'https://your-domain.com';
})();

const contacts = {
  telegram: pick(process.env.NEXT_PUBLIC_TELEGRAM_URL, 'https://t.me/Psycho269'),
  channel: pick(process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL, 'https://t.me/+-rvtCfWFqn8yZGI1'),
  youtube: pick(process.env.NEXT_PUBLIC_YOUTUBE_URL, 'https://www.youtube.com/@psycho2.9'),
  email: pick(process.env.NEXT_PUBLIC_CONTACT_EMAIL, 'neerajt0269@gmail.com'),
};

/* ---- read tools + projects from lib/data.ts ---- */
const src = readFileSync(join(root, 'lib/data.ts'), 'utf8');
const str = "'((?:[^'\\\\]|\\\\.)*)'";
const grab = (block, key) => [...block.matchAll(new RegExp(`\\b${key}:\\s*${str}`, 'g'))].map((m) => m[1].replace(/\\'/g, "'"));
const toolsBlock = src.slice(src.indexOf('export const TOOLS'), src.indexOf('export type ProjectCategory'));
const projBlock = src.slice(src.indexOf('export const PROJECTS'), src.indexOf('export type Milestone'));
const toolNames = grab(toolsBlock, 'name');
const toolFields = grab(toolsBlock, 'field');
const pTitles = grab(projBlock, 'title');
const pCats = grab(projBlock, 'category');
const pYears = grab(projBlock, 'year');
const pDescs = grab(projBlock, 'description');

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const llms = [
  '# PSYCHO2.9 (Neeraj Tiwari)',
  '',
  '> Cinematic portfolio of Neeraj Tiwari, aka PSYCHO2.9: video editor, Telegram bot builder, ethical hacker and web designer. High-retention edits, resilient bot systems and secure code.',
  '',
  '## Pages',
  `- [Home](${siteUrl}/): single-page portfolio (skills, timeline, selected works, about, contact)`,
  '',
  '## What I do',
  '- Video editing: high-retention cinematic edits, motion graphics, colour grading',
  '- Telegram bots: async Python bots, moderation, automation',
  '- Ethical hacking: Linux, security audits, hardened setups',
  '- Web design: responsive, accessible, light/dark interfaces',
  '',
  '## Tools',
  ...toolNames.map((n, i) => `- ${n}: ${toolFields[i]}`),
  '',
  '## Selected works',
  ...pTitles.map((t, i) => `- ${t} (${pCats[i]}, ${pYears[i]}): ${pDescs[i]}`),
  '',
  '## Contact',
  ...(contacts.telegram ? [`- Telegram: ${contacts.telegram}`] : []),
  ...(contacts.channel ? [`- Telegram channel: ${contacts.channel}`] : []),
  ...(contacts.youtube ? [`- YouTube: ${contacts.youtube}`] : []),
  ...(contacts.email ? [`- Email: ${contacts.email}`] : []),
  '',
].join('\n');

mkdirSync(join(root, 'public'), { recursive: true });
writeFileSync(join(root, 'public/robots.txt'), robots);
writeFileSync(join(root, 'public/sitemap.xml'), sitemap);
writeFileSync(join(root, 'public/llms.txt'), llms);
console.log(`[seo] robots.txt, sitemap.xml, llms.txt written for ${siteUrl}`);
