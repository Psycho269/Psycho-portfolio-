'use client';

import { useEffect } from 'react';

/**
 * Scroll-linked scene transitions for the first three full-screen sections:
 * the scene leaving zooms in and fades through black, the next one eases in from slightly small.
 * Writes --fo (opacity), --fs (scale) and --py (parallax) on every [data-fx] element.
 */
export default function SceneScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-fx]'));
    if (!nodes.length) return;
    const root = document.documentElement;
    root.classList.add('js-fx');

    let raf = 0;
    const smooth = (t: number) => t * t * (3 - 2 * t);
    const update = () => {
      raf = 0;
      const hh = document.querySelector<HTMLElement>('.hdr')?.offsetHeight ?? 0;
      const vh = Math.max(1, window.innerHeight - hh);
      for (const el of nodes) {
        const p = (el.getBoundingClientRect().top - hh) / vh; // 0 = aligned under the header, +1 = one screen below, -1 = one screen above
        const a = Math.min(1, Math.abs(p));
        const o = 1 - smooth(Math.min(1, a / 0.85));
        const s = p < 0 ? 1 + 0.14 * a : 1 - 0.08 * a;
        el.style.setProperty('--fo', o.toFixed(3));
        el.style.setProperty('--fs', s.toFixed(4));
        el.style.setProperty('--py', `${(-p * 70).toFixed(1)}px`);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      root.classList.remove('js-fx');
      nodes.forEach((el) => ['--fo', '--fs', '--py'].forEach((k) => el.style.removeProperty(k)));
    };
  }, []);

  return null;
}
