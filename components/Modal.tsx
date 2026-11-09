'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { IconClose } from './Icons';

type Props = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  /** Screen position the panel should zoom out of (e.g. the clicked logo). */
  from?: { x: number; y: number } | null;
  wide?: boolean;
  children: ReactNode;
};

const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function Modal({ open, onClose, labelledBy, from, wide, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  const style = {
    '--fx': `${from ? from.x - window.innerWidth / 2 : 0}px`,
    '--fy': `${from ? from.y - window.innerHeight / 2 : 0}px`,
  } as CSSProperties;

  return (
    <div
      className="modal"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className={wide ? 'modal__panel modal__panel--wide' : 'modal__panel'}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        style={style}
      >
        <button type="button" className="modal__close" aria-label="Close" onClick={onClose}>
          <IconClose size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
