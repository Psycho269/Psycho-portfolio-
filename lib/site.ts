/**
 * Site-wide config. Contact defaults come from the published portfolio;
 * any NEXT_PUBLIC_* env var overrides them (set it to - to hide a row).
 */
const clean = (v: string | undefined) => (v ?? '').trim();

function pick(envValue: string | undefined, fallback: string) {
  // undefined / empty -> fallback. A literal "-" hides the row.
  const v = clean(envValue);
  if (v === '-') return '';
  return v || fallback;
}

function siteUrl() {
  const explicit = clean(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) return explicit.replace(/\/+$/, '');
  const vercel = clean(process.env.VERCEL_PROJECT_PRODUCTION_URL) || clean(process.env.VERCEL_URL);
  if (vercel) return `https://${vercel}`;
  return 'http://localhost:3000';
}

export const SITE = {
  name: 'PSYCHO2.9',
  title: 'PSYCHO2.9 | Video Editor, Telegram Bot Builder, Ethical Hacker & Web Designer',
  description:
    'Cinematic portfolio of PSYCHO2.9: video editor, Telegram bot builder, ethical hacker and web designer. High-retention edits, resilient bot systems and secure code.',
  url: siteUrl(),
  ogAlt: 'PSYCHO2.9 in large red letters with a man in a black suit in front',
};

export const CONTACTS = {
  telegram: pick(process.env.NEXT_PUBLIC_TELEGRAM_URL, 'https://t.me/Psycho269'),
  telegramHandle: '@Psycho269',
  channel: pick(process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL, 'https://t.me/+-rvtCfWFqn8yZGI1'),
  youtube: pick(process.env.NEXT_PUBLIC_YOUTUBE_URL, 'https://www.youtube.com/@psycho2.9'),
  youtubeHandle: '@psycho2.9',
  email: pick(process.env.NEXT_PUBLIC_CONTACT_EMAIL, 'neerajt0269@gmail.com'),
};

export const briefMailto = () =>
  CONTACTS.email
    ? `mailto:${CONTACTS.email}?subject=${encodeURIComponent('Project brief for PSYCHO2.9')}`
    : CONTACTS.telegram || '#contact';
