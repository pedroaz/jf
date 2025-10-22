'use client';

import { NavigationButtons } from '@/components/NavigationButtons';
import { QRCodeSVG } from 'qrcode.react';

export default function Presentation4() {
  // Get the current URL origin for the QR code
  const inputUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/input`
    : 'http://localhost:3000/input';

  return (
    <main className="min-h-screen flex items-center justify-center">
      <NavigationButtons nextHref="/presentation/5" backHref="/presentation/3" />

      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">
          Share Your Ideas!
        </h1>
        <p className="text-xl mb-12 text-gray-600">
          Scan the QR code to submit your idea
        </p>

        <div className="inline-block p-8 bg-white rounded-2xl shadow-2xl">
          <QRCodeSVG
            value={inputUrl}
            size={400}
            level="H"
            includeMargin={true}
          />
        </div>
      </div>
    </main>
  );
}
