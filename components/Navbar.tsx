'use client';

import { useState } from 'react';
import { IconClose, IconMenu } from './Icons';

const LINKS = [
  { href: '#reel', label: 'Skills' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ ctaHref }: { ctaHref: string }) {
  const [open, setOpen] = useState(false);
  const external = ctaHref.startsWith('http');

  return (
    <header className="hdr">
      <div className="wrap hdr__bar">
        <a className="hdr__brand" href="#top" aria-label="PSYCHO2.9, back to top">
          PSYCHO2.9
        </a>

        <nav className="hdr__nav" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hdr__actions">
          <a
            className="btn btn--solid hdr__cta"
            href={ctaHref}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            Let&rsquo;s build
          </a>
          <button
            type="button"
            className="hdr__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="hdr__drawer" aria-label="Mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            className="btn btn--solid"
            href={ctaHref}
            onClick={() => setOpen(false)}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            Let&rsquo;s build
          </a>
        </nav>
      )}
    </header>
  );
}
