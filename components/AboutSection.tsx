import Image from 'next/image';
import type { CSSProperties } from 'react';
import { IconBot, IconCode, IconShield, IconVideo } from './Icons';

const PILLARS = [
  { Icon: IconVideo, title: 'Cinematic Video Editing', text: 'After Effects, CapCut, Premiere Pro, motion rhythm, match cuts and color timing.' },
  { Icon: IconBot, title: 'Telegram Bot Development', text: 'Python, async frameworks, webhooks, group moderation and automated messaging.' },
  { Icon: IconShield, title: 'Ethical Hacking & Security', text: 'Linux administration, security evaluation, network discovery and hardened configs.' },
  { Icon: IconCode, title: 'Web Design & Vibe Coding', text: 'HTML5, modern CSS, JavaScript, rapid execution and fluid, responsive UI.' },
];

const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

export default function AboutSection() {
  return (
    <section id="about" className="section section--alt" aria-labelledby="about-title">
      <div className="wrap about">
        <div className="about__photo" data-reveal="left">
          <Image
            src="/about-portrait.jpg"
            alt="Portrait of PSYCHO2.9 in dark sunglasses and a black jacket, looking to the side against a pale grey sky"
            fill
            sizes="(min-width: 900px) 460px, 90vw"
          />
          <div className="about__cap">
            <span>PSYCHO2.9</span>
            <strong>Multidisciplinary technical creator</strong>
          </div>
        </div>

        <div className="about__text">
          <p className="eyebrow" data-reveal style={d(0.05)}>
            About the creator
          </p>
          <h2 id="about-title" className="name" data-reveal style={d(0.12)}>
            <span className="name__main">Neeraj Tiwari</span>
            <span className="name__aka">
              <i>aka</i> <b>Psycho2.9</b>
            </span>
          </h2>
          <p className="about__tag" data-reveal style={d(0.2)}>
            Synthesizing rhythm, logic, and defensive architecture.
          </p>
          <p data-reveal style={d(0.28)}>
            I operate at the crossroads of creative media and practical systems engineering. As a <strong>video editor</strong>, I
            craft high-retention cinematic edits with strict audio-visual synchronization, deliberate pacing and color timing.
          </p>
          <p data-reveal style={d(0.36)}>
            As a <strong>Telegram bot builder</strong> and <strong>ethical hacker</strong>, I engineer responsive asynchronous
            bots in Python and maintain Linux environments for security auditing and API reliability.
          </p>
          <p data-reveal style={d(0.44)}>
            As a <strong>web designer and vibe coder</strong>, I turn complex technical workflows into clean, accessible,
            responsive interfaces.
          </p>
          <ul className="pillars">
            {PILLARS.map(({ Icon, title, text }, i) => (
              <li key={title} data-reveal style={d(0.5 + i * 0.09)}>
                <b>
                  <Icon size={18} />
                  {title}
                </b>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
