'use client';

import { useEffect } from 'react';

/** Fade + slide-up + un-blur as blocks scroll into view (items with data-reveal, staggered via --d). */
export default function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    root.classList.add('js-reveal');

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add('is-in');
          io.unobserve(el);
          if (el.hasAttribute('data-reveal')) window.setTimeout(() => el.classList.add('done'), 2000);
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove('js-reveal');
    };
  }, []);

  return null;
}
