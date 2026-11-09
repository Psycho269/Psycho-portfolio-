'use client';

import { useEffect } from 'react';

/**
 * Inertial ("buttery") scrolling for mouse wheels and in-page links.
 * - Touch screens keep their native momentum scrolling (already smooth).
 * - Skipped for visitors who prefer reduced motion.
 * - Inner scrollable areas (e.g. the open zoom card) keep native scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduce) return;

    const root = document.documentElement;
    root.classList.add('has-smooth');

    let target = window.scrollY;
    let current = target;
    let raf = 0;
    let running = false;

    const max = () => Math.max(0, root.scrollHeight - window.innerHeight);
    const clamp = (v: number) => Math.min(max(), Math.max(0, v));
    const headerH = () => document.querySelector<HTMLElement>('.hdr')?.offsetHeight ?? 0;

    let last = 0;
    const tick = (now: number) => {
      const dt = Math.min(64, last ? now - last : 16);
      last = now;
      current += (target - current) * (1 - Math.exp(-dt / 140)); // same feel at any frame rate
      if (Math.abs(target - current) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        running = false;
        last = 0;
        return;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };
    const sync = () => {
      if (!running) {
        current = target = window.scrollY;
      }
    };

    const insideScrollable = (el: HTMLElement | null) => {
      while (el && el !== document.body) {
        const oy = getComputedStyle(el).overflowY;
        if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight) return true;
        el = el.parentElement;
      }
      return false;
    };

    /* wheel gestures glide scene to scene through the first three full-screen sections */
    const sceneTops = () => {
      const hh = headerH();
      return ['reel', 'timeline', 'work']
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el)
        .map((el) => el.getBoundingClientRect().top + window.scrollY - hh);
    };
    let dir = 0;
    let idle = 0;
    const snap = () => {
      const tops = sceneTops();
      if (tops.length < 2) return;
      const last = tops[tops.length - 1];
      const y = target;
      let to: number | null = null;
      if (dir > 0 && y < last - 2) to = tops.find((t) => t > y + 2) ?? null;
      else if (dir < 0 && y <= last + window.innerHeight && y > tops[0] + 2) to = [...tops].reverse().find((t) => t < y - 2) ?? null;
      if (to !== null) {
        target = clamp(to);
        start();
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented) return;
      if (document.body.style.overflow === 'hidden' || root.classList.contains('intro-lock')) return;
      if (insideScrollable(e.target as HTMLElement | null)) return;
      e.preventDefault();
      const dy = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
      if (!running) current = target = window.scrollY;
      target = clamp(target + dy);
      dir = Math.sign(dy);
      start();
      window.clearTimeout(idle);
      idle = window.setTimeout(snap, 120);
    };

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const id = a.getAttribute('href')!.slice(1);
      const el = id && id !== 'top' ? document.getElementById(id) : null;
      if (id && id !== 'top' && !el) return;
      e.preventDefault();
      if (!running) current = target = window.scrollY;
      target = clamp(el ? el.getBoundingClientRect().top + window.scrollY - headerH() : 0);
      start();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      root.classList.remove('has-smooth');
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return null;
}
