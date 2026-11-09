'use client';

import Image from 'next/image';
import { useState, type CSSProperties } from 'react';
import Modal from './Modal';
import { PROJECTS, type Project } from '@/lib/data';
import { STAGE } from '@/lib/layout';

const ALT = 'Silhouette of a man standing in a dark round hall, surrounded by twelve glowing website screens';
const clip = (q: readonly (readonly number[])[]) => `polygon(${q.map(([x, y]) => `${x}% ${y}%`).join(',')})`;
const center = (q: readonly (readonly number[])[]) => ({
  x: q.reduce((s, p) => s + p[0], 0) / q.length / 100,
  y: q.reduce((s, p) => s + p[1], 0) / q.length / 100,
});

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);
  const [from, setFrom] = useState<{ x: number; y: number } | null>(null);

  const open = (p: Project, c: { x: number; y: number }, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setFrom({ x: r.left + c.x * r.width, y: r.top + c.y * r.height });
    setActive(p);
  };

  return (
    <section id="work" className="cover worksec" aria-labelledby="work-title" data-fx>
      <div className="fx">
      <h2 id="work-title" className="sr-only">
        Selected works and systems
      </h2>

      {(['wide', 'tall'] as const).map((k) => (
        <div key={k} className={`cover__scene scene--${k}`} style={{ '--ar': STAGE[k].w / STAGE[k].h } as CSSProperties}>
          <Image src={STAGE[k].src} alt={ALT} fill sizes="100vw" quality={90} />
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className="hot"
              style={{ clipPath: clip(STAGE[k].quads[i]) }}
              aria-label={`${p.title}. Open details`}
              onClick={(e) => open(p, center(STAGE[k].quads[i]), e.currentTarget)}
            />
          ))}
        </div>
      ))}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} labelledBy="proj-title-modal" from={from} wide>
        {active && (
          <>
            <div className="proj__media">
              <Image src={active.image} alt={active.alt} fill sizes="(min-width: 760px) 736px, 100vw" quality={90} />
            </div>
            <div className="proj__body">
              <h3 id="proj-title-modal">{active.title}</h3>
              <p className="proj__meta">
                {active.category} · {active.role} · {active.year}
              </p>
              <p className="proj__desc">{active.description}</p>
              <ul className="proj__tags" aria-label="Technologies and disciplines">
                {active.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
