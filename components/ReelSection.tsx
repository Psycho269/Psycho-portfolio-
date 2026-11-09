'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Modal from './Modal';
import { TOOLS, type Tool } from '@/lib/data';

/* Tools are laid out along an ellipse arch (same geometry as the SVG guide line). */
const CX = 49.5;
const CY = 61;
const RX = 37.5;
const RY = 48;
const START = 170;
const END = 10;

const ARC = TOOLS.map((_, i) => {
  const deg = START - ((START - END) * i) / (TOOLS.length - 1);
  const a = (deg * Math.PI) / 180;
  return {
    left: (CX + RX * Math.cos(a)).toFixed(2),
    top: (CY - RY * Math.sin(a)).toFixed(2),
    rot: `${((90 - deg) * 0.3).toFixed(1)}deg`,
  };
});

const ARC_P = TOOLS.map((_, i) => {
  // portrait phones: wider, flatter arch so the icons never overlap
  const deg = 170 - (160 * i) / (TOOLS.length - 1);
  const a = (deg * Math.PI) / 180;
  return { left: (50 + 44 * Math.cos(a)).toFixed(2), top: (52 - 36 * Math.sin(a)).toFixed(2) };
});

const sx = (CX + RX * Math.cos((START * Math.PI) / 180)).toFixed(2);
const ex = (CX + RX * Math.cos((END * Math.PI) / 180)).toFixed(2);
const ey = (CY - RY * Math.sin((START * Math.PI) / 180)).toFixed(2);
const ARC_PATH = `M${sx} ${ey} A${RX} ${RY} 0 0 1 ${ex} ${ey}`;

export default function ReelSection() {
  const [active, setActive] = useState<Tool | null>(null);
  const [from, setFrom] = useState<{ x: number; y: number } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause();
    }
  }, []);

  const openTool = (tool: Tool, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setFrom({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setActive(tool);
  };

  return (
    <section id="reel" className="reel" aria-labelledby="reel-title">
      <div className="reel__stage" data-fx>
        <div className="fx">
        <video
          ref={videoRef}
          className="reel__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/reel-poster.jpg"
          aria-hidden="true"
        >
          <source src="/media/reel.mp4" type="video/mp4" />
        </video>
        <div className="reel__shade" />

        <div className="arc">
          <svg className="arc__line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d={ARC_PATH} />
          </svg>
          {TOOLS.map((tool, i) => (
            <button
              key={tool.id}
              type="button"
              className="tile"
              style={
                { '--l': `${ARC[i].left}%`, '--t': `${ARC[i].top}%`, '--lp': `${ARC_P[i].left}%`, '--tp': `${ARC_P[i].top}%`, '--rot': ARC[i].rot, '--n': i } as CSSProperties
              }
              aria-label={`${tool.name}: ${tool.field}. Open details`}
              onClick={(e) => openTool(tool, e.currentTarget)}
            >
              <span className="tile__img">
                <Image src={tool.image} alt="" fill sizes="(min-width: 1920px) 220px, 120px" quality={90} priority={i < 6} />
              </span>
            </button>
          ))}
        </div>

        <div className="reel__copy">
          <p className="eyebrow">Welcome to my world</p>
          <h1 id="reel-title" className="reel__h1">
            High-Retention Cinema. Resilient Bot Systems. Secure Code.
          </h1>
          <ul className="reel__roles">
            <li>Video Editor</li>
            <li>Telegram Bot Builder</li>
            <li>Ethical Hacker</li>
            <li>Web Designer</li>
          </ul>
        </div>
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} labelledBy="tool-title" from={from}>
        {active && (
          <div className="tool">
            <div className="tool__logo">
              <Image src={active.image} alt={`${active.name} logo`} fill sizes="260px" quality={95} />
            </div>
            <p className="tool__field">{active.field}</p>
            <h3 id="tool-title">{active.name}</h3>
            <p className="tool__detail">{active.detail}</p>
          </div>
        )}
      </Modal>
    </section>
  );
}
