'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { IconSkip } from './Icons';

/**
 * Full-screen intro. Starts immediately WITH sound, no start/mute buttons,
 * only a Skip button in the corner. It plays on every visit.
 *
 * Browsers may block sound-on autoplay until the visitor interacts with the page.
 * If that happens the video still starts (muted) and the sound switches on at the
 * visitor's first tap / key press, with no buttons shown.
 */
export default function IntroOverlay() {
  const [open, setOpen] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const finish = useCallback(() => {
    document.documentElement.classList.add('intro-done');
    setLeaving(true);
    window.setTimeout(() => setOpen(false), 500);
  }, []);

  useEffect(() => {
    if (!open) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('intro-done');
      setOpen(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    document.documentElement.classList.add('intro-lock');

    const events = ['click', 'touchend', 'pointerup', 'keydown'] as const;
    let armed = false;
    const unmute = () => {
      video.muted = false;
      setNeedsTap(false);
      disarm();
    };
    const disarm = () => {
      if (!armed) return;
      armed = false;
      events.forEach((ev) => window.removeEventListener(ev, unmute));
    };

    video.muted = false;
    video.volume = 1;
    const attempt = video.play();
    if (attempt !== undefined) {
      attempt.catch(() => {
        // Sound-on autoplay blocked: start silently, enable sound on first interaction.
        video.muted = true;
        setNeedsTap(true);
        video.play().catch(() => finish());
        armed = true;
        events.forEach((ev) => window.addEventListener(ev, unmute));
      });
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      disarm();
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('intro-lock');
    };
  }, [open, finish]);

  if (!open) return null;

  return (
    <div className={leaving ? 'intro intro--leaving' : 'intro'} role="dialog" aria-label="Intro video">
      <video
        ref={videoRef}
        className="intro__video"
        autoPlay
        playsInline
        preload="auto"
        onEnded={finish}
        onError={finish}
      >
        <source src="/media/intro.webm" type="video/webm" />
        <source src="/media/intro.mp4" type="video/mp4" />
      </video>
      {needsTap && (
        <p className="intro__hint" aria-hidden="true">
          Tap anywhere for sound
        </p>
      )}
      <button type="button" className="intro__skip" onClick={finish}>
        Skip <IconSkip size={14} />
      </button>
    </div>
  );
}
