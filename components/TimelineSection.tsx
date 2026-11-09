'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Modal from './Modal';
import { TIMELINE, type Milestone } from '@/lib/data';

/* Landscape layout, in % of a 16:9 box: three cards each side of the figure along a gold arch, so he stays in the clear. */
const X = [13, 23.5, 34, 66, 76.5, 87];
const LY = [30, 23, 17, 17, 23, 30];
const W = [11, 11.5, 12, 12, 11.5, 11];
const RY = [24, 17, 9, -9, -17, -24];
const DOT = { x: 50, y: 5 };
/* Portrait layout: year tabs along the top, one big card below. */
const PX = [9, 25, 41, 57, 73, 89];
const PY = [11, 8, 6, 6, 8, 11];
const PDOT = { x: 50, y: 2.4 };

type Pt = readonly [number, number];
function smooth(pts: Pt[], dy: number, lead: number, tail = 0) {
  const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M${pts[0][0] - lead} ${pts[0][1] + dy + lead * 0.3} L${pts[0][0]} ${pts[0][1] + dy}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const m = mid(pts[i], pts[i + 1]);
    d += ` Q${pts[i][0]} ${pts[i][1] + dy} ${m[0]} ${m[1] + dy}`;
  }
  const l = pts[pts.length - 1];
  d += ` L${l[0]} ${l[1] + dy}`;
  return tail ? `${d} L${l[0] + tail} ${l[1] + dy + tail * 0.3}` : d;
}
const LPTS: Pt[] = TIMELINE.map((_, i) => [X[i] * 1.6, LY[i] * 0.9]); // viewBox 160 x 90
const PPTS: Pt[] = TIMELINE.map((_, i) => [PX[i], PY[i]]); // viewBox 100 x 100
const L_CURVE = smooth(LPTS, 1.2, 8, 8);
const P_CURVE = smooth(PPTS, 2.4, 5);

export default function TimelineSection() {
  const [idx, setIdx] = useState(TIMELINE.length - 1);
  const [modal, setModal] = useState<Milestone | null>(null);
  const [from, setFrom] = useState<{ x: number; y: number } | null>(null);
  const [seen, setSeen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const portrait = () =>
    !document.documentElement.hasAttribute('data-dm') && window.matchMedia('(max-aspect-ratio: 1/1)').matches; // portrait screens: carousel layout (not in desktop mode)
  const touch = () => window.matchMedia('(hover: none)').matches;
  const openModal = (m: Milestone, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setFrom({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setModal(m);
  };
  const onCard = (i: number, el: HTMLElement) => {
    if (i === idx || (touch() && !portrait())) {
      setIdx(i);
      openModal(TIMELINE[i], el);
    } else setIdx(i);
  };
  const step = (d: number) => setIdx((v) => Math.min(TIMELINE.length - 1, Math.max(0, v + d)));

  const la = LPTS[idx];
  const pa = PPTS[idx];

  return (
    <section id="timeline" aria-labelledby="timeline-title" className="cover tlsec" data-fx>
      <h2 id="timeline-title" className="sr-only">
        Journey through time: chronology of technical evolution
      </h2>

      <div className="fx">
      <div className="cover__scene scene--wide" style={{ '--ar': 2100 / 900 } as CSSProperties}>
        <Image src="/stage/timeline-bg-wide.jpg" alt="" fill sizes="100vw" quality={90} />
        <Image src="/stage/person-cutout.png" alt="" width={425} height={1100} quality={90} className="tl__person tl__person--wide" />
      </div>
      <div className="cover__scene scene--tall" style={{ '--ar': 941 / 1671 } as CSSProperties}>
        <Image src="/stage/timeline-bg-tall.jpg" alt="" fill sizes="100vw" quality={90} />
        <Image src="/stage/person-cutout.png" alt="" width={425} height={1100} quality={90} className="tl__person tl__person--tall" />
      </div>

      <div
        ref={stageRef}
        className={seen ? 'tl tl--in' : 'tl'}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null || !portrait()) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
        }}
      >
        <svg className="tl__svg tl__svg--l" viewBox="0 0 160 90" preserveAspectRatio="none" aria-hidden="true">
          <circle className="tl__clock" cx={DOT.x * 1.6} cy={DOT.y * 0.9} r="40" />
          <circle className="tl__clock tl__clock--ticks" cx={DOT.x * 1.6} cy={DOT.y * 0.9} r="46" />
          <circle className="tl__clock" cx={DOT.x * 1.6} cy={DOT.y * 0.9} r="52" />
          <path className="tl__curve" d={L_CURVE} />
          <line className="tl__beam-soft" x1={LPTS[5 - idx][0]} y1={LPTS[5 - idx][1]} x2={DOT.x * 1.6} y2={DOT.y * 0.9} />
          <line key={`l${idx}`} className="tl__beam" x1={DOT.x * 1.6} y1={DOT.y * 0.9} x2={la[0]} y2={la[1] + 1.4} />
          <circle className="tl__dot" cx={DOT.x * 1.6} cy={DOT.y * 0.9} r="1.3" />
        </svg>
        <svg className="tl__svg tl__svg--p" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path className="tl__curve" d={P_CURVE} />
          <line key={`p${idx}`} className="tl__beam" x1={PDOT.x} y1={PDOT.y} x2={pa[0]} y2={pa[1] + 1.6} />
          <circle className="tl__dot" cx={PDOT.x} cy={PDOT.y} r="1.1" />
        </svg>

        <p className="tl__title" aria-hidden="true">
          Journey
          <br />
          Through
          <br />
          Time
        </p>

        {TIMELINE.map((m, i) => (
          <button
            key={`y${m.year}`}
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className={i === idx ? 'tl__year tl__year--on' : 'tl__year'}
            style={{ '--l': `${X[i]}%`, '--t': `${LY[i]}%`, '--lp': `${PX[i]}%`, '--tp': `${PY[i]}%` } as CSSProperties}
            onClick={() => setIdx(i)}
          >
            {m.year}
          </button>
        ))}

        {TIMELINE.map((m, i) => {
          const o = i - idx;
          return (
            <button
              key={m.year}
              type="button"
              className={i === idx ? 'tc tc--on' : 'tc'}
              data-pos={o === 0 ? '0' : o === -1 ? '-1' : o === 1 ? '1' : 'far'}
              style={{ '--l': `${X[i]}%`, '--ct': `${LY[i] + 4}%`, '--w': `${W[i]}%`, '--ry': `${RY[i]}deg`, '--i': i, '--o': o } as CSSProperties}
              aria-label={`${m.year}: ${m.headline}. Open details`}
              onPointerEnter={(e) => e.pointerType === 'mouse' && !portrait() && setIdx(i)}
              onFocus={() => setIdx(i)}
              onClick={(e) => onCard(i, e.currentTarget)}
            >
              <span className="tc__img">
                <Image src={m.image} alt="" fill sizes="(min-width: 1200px) 320px, 80vw" quality={90} />
              </span>
              <span className="tc__t">{m.headline}</span>
              <span className="tc__s">{m.summary}</span>
              <span className="tc__l">
                {m.disciplines.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </button>
          );
        })}
      </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} labelledBy="tl-title" from={from} wide>
        {modal && (
          <>
            <div className="proj__media">
              <Image src={modal.image} alt={modal.alt} fill sizes="(min-width: 760px) 736px, 100vw" quality={90} />
            </div>
            <div className="proj__body">
              <p className="tool__field" style={{ margin: 0 }}>{modal.year}</p>
              <h3 id="tl-title">{modal.headline}</h3>
              <p className="proj__desc">{modal.summary}</p>
              <ul className="proj__tags" aria-label="Core disciplines">
                {modal.disciplines.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
