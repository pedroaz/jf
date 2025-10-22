'use client';

import Link from 'next/link';

interface NavigationButtonsProps {
  nextHref?: string;
  backHref?: string;
}

export function NavigationButtons({ nextHref, backHref }: NavigationButtonsProps) {
  return (
    <div className="fixed top-4 right-4 flex gap-2">
      {backHref && (
        <Link
          href={backHref}
          className="px-4 py-2 bg-bb-blue text-white rounded-lg hover:opacity-80 transition-opacity"
        >
          ← Back
        </Link>
      )}
      {nextHref && (
        <Link
          href={nextHref}
          className="px-4 py-2 bg-bb-yellow text-black rounded-lg hover:opacity-80 transition-opacity font-semibold"
        >
          Next →
        </Link>
      )}
    </div>
  );
}
