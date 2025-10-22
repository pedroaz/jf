'use client';

import { NavigationButtons } from '@/components/NavigationButtons';
import { Card } from '@/components/Card';
import { useAppState } from '@/hooks/useAppState';

export default function Presentation3() {
  const { cards } = useAppState();

  const variants = ['yellow', 'pink', 'blue', 'green'] as const;

  return (
    <main className="min-h-screen p-8">
      <NavigationButtons nextHref="/presentation/4" backHref="/presentation/extra" />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">
          Project Setup & Techniques
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <Card
                title={card.title}
                description={card.description}
                variant={variants[index % variants.length]}
              />
            </div>
          ))}
        </div>

        {cards.length === 0 && (
          <p className="text-center text-gray-400 text-xl">
            If all goes well cards will appear here in a moment...
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
