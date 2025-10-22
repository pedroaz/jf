'use client';

import { NavigationButtons } from '@/components/NavigationButtons';
import { Card } from '@/components/Card';
import { useAppState } from '@/hooks/useAppState';

export default function Presentation5() {
  const { userInputs } = useAppState();

  const variants = ['yellow', 'pink', 'blue', 'green'] as const;

  return (
    <main className="min-h-screen p-8">
      <NavigationButtons nextHref="/presentation/6" backHref="/presentation/4" />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">
          BB Ideas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userInputs.map((input, index) => (
            <div
              key={input.id}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <Card
                title={input.name}
                description={input.idea}
                variant={variants[index % variants.length]}
              />
            </div>
          ))}
        </div>

        {userInputs.length === 0 && (
          <p className="text-center text-gray-400 text-xl">
            Please at least one person contributes an idea...
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
