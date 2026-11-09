import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { CONTACTS, SITE } from '@/lib/site';

const oswald = localFont({
  src: [
    { path: './fonts/oswald-300.woff2', weight: '300', style: 'normal' },
    { path: './fonts/oswald-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/oswald-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/oswald-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/oswald-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-oswald',
  display: 'swap',
});

const anton = localFont({
  src: [{ path: './fonts/anton-400.woff2', weight: '400', style: 'normal' }],
  variable: '--font-anton',
  display: 'swap',
});

const bodoni = localFont({
  src: [
    { path: './fonts/bodonimoda-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/bodonimoda-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-bodoni',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: '/',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: SITE.ogAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: [{ url: '/og-image.jpg', alt: SITE.ogAlt }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#070709' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

/**
 * "Desktop site" mode on a phone/tablet makes the page ~980px wide on a screen that is really ~400px wide.
 * Detect that (touch device whose layout width is clearly bigger than its screen) and flag <html data-dm>,
 * so the site shows the full PC layout instead of the tall phone layout.
 */
const DESKTOP_MODE_SCRIPT = `(function(){try{var d=document.documentElement;function f(){var w=d.clientWidth||innerWidth;var touch=navigator.maxTouchPoints>0||matchMedia('(pointer: coarse)').matches;if(touch&&w>=700&&w>screen.width*1.12){d.setAttribute('data-dm','1')}else{d.removeAttribute('data-dm')}}f();addEventListener('resize',f);addEventListener('orientationchange',f)}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
      },
      {
        '@type': 'Person',
        '@id': `${SITE.url}/#person`,
        name: SITE.name,
        url: SITE.url,
        image: `${SITE.url}/og-image.jpg`,
        jobTitle: ['Video Editor', 'Telegram Bot Builder', 'Ethical Hacker', 'Web Designer'],
        sameAs: [CONTACTS.telegram, CONTACTS.channel, CONTACTS.youtube].filter(Boolean),
      },
    ],
  };

  return (
    <html lang="en" className={`${oswald.variable} ${anton.variable} ${bodoni.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: DESKTOP_MODE_SCRIPT }} />
        {/* Without JavaScript the intro overlay could never be dismissed, so hide it. */}
        <noscript>
          <style>{'.intro{display:none!important}'}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
