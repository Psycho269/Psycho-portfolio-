import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found | PSYCHO2.9',
  description: 'This page does not exist.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="nf">
      <p className="nf__code" aria-hidden="true">
        404
      </p>
      <h1 className="nf__title">Page not found</h1>
      <p className="nf__text">The page you are looking for does not exist or has moved.</p>
      <Link className="btn btn--solid" href="/">
        Back to the reel
      </Link>
    </main>
  );
}
