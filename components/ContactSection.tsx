import type { CSSProperties } from 'react';
import { CONTACTS, briefMailto } from '@/lib/site';
import { IconArrowUpRight, IconBroadcast, IconMail, IconSend, IconYoutube } from './Icons';

const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

export default function ContactSection() {
  const rows = [
    CONTACTS.telegram && { href: CONTACTS.telegram, title: 'Telegram', sub: CONTACTS.telegramHandle, Icon: IconSend, ext: true },
    CONTACTS.channel && { href: CONTACTS.channel, title: 'Channel', sub: 'Telegram broadcast', Icon: IconBroadcast, ext: true },
    CONTACTS.youtube && { href: CONTACTS.youtube, title: 'YouTube', sub: CONTACTS.youtubeHandle, Icon: IconYoutube, ext: true },
    CONTACTS.email && { href: `mailto:${CONTACTS.email}`, title: 'Email', sub: CONTACTS.email, Icon: IconMail, ext: false },
  ].filter(Boolean) as { href: string; title: string; sub: string; Icon: typeof IconMail; ext: boolean }[];

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact">
          <div className="contact__lead">
            <p className="eyebrow" data-reveal>
              Contact
            </p>
            <h2 id="contact-title" className="h2" data-reveal style={d(0.1)}>
              Design · Build · Explore · Repeat
            </h2>
            <p data-reveal style={d(0.2)}>
              Got a video to cut, a bot to build or a story to tell? Every message lands straight in my world.
            </p>
            <a className="btn" href={briefMailto()} data-reveal style={d(0.3)}>
              Send a brief <IconArrowUpRight size={16} />
            </a>
          </div>

          <ul className="channels">
            {rows.map(({ href, title, sub, Icon, ext }, i) => (
              <li key={title} data-reveal style={d(0.15 + i * 0.1)}>
                <a className="channel" href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <span className="channel__n">{String(i + 1).padStart(2, '0')}</span>
                  <Icon size={22} className="channel__i" />
                  <span className="channel__t">
                    <b>{title}</b>
                    <span>{sub}</span>
                  </span>
                  <IconArrowUpRight size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="foot" data-reveal>&copy; {new Date().getFullYear()} PSYCHO2.9 &middot; All rights reserved</p>
      </div>
    </section>
  );
}
