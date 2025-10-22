'use client';

import { NavigationButtons } from '@/components/NavigationButtons';
import { useState } from 'react';

export default function PresentationExtra() {
  const [flipped1, setFlipped1] = useState(false);
  const [flipped2, setFlipped2] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <NavigationButtons nextHref="/presentation/3" backHref="/presentation/2" />

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Card 1 */}
          <div
            className="flip-card-container"
            onClick={() => setFlipped1(!flipped1)}
          >
            <div className={`flip-card-content ${flipped1 ? 'is-flipped' : ''}`}>
              <div className="flip-card-face flip-card-face-front">
                <div className="h-80 border-4 border-bb-blue bg-bb-blue/10 rounded-lg flex items-center justify-center p-8 cursor-pointer hover:border-bb-pink transition-colors">
                  <p className="text-3xl font-bold text-center">
                    Click to reveal
                  </p>
                </div>
              </div>
              <div className="flip-card-face flip-card-face-back">
                <div className="h-80 border-4 border-bb-pink bg-bb-pink/10 rounded-lg flex items-center justify-center p-8 cursor-pointer hover:border-bb-blue transition-colors">
                  <p className="text-2xl font-semibold text-center">
                    New Project & New Techniques and Tools
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="flip-card-container"
            onClick={() => setFlipped2(!flipped2)}
          >
            <div className={`flip-card-content ${flipped2 ? 'is-flipped' : ''}`}>
              <div className="flip-card-face flip-card-face-front">
                <div className="h-80 border-4 border-bb-blue bg-bb-blue/10 rounded-lg flex items-center justify-center p-8 cursor-pointer hover:border-bb-pink transition-colors">
                  <p className="text-3xl font-bold text-center">
                    Click to reveal
                  </p>
                </div>
              </div>
              <div className="flip-card-face flip-card-face-back">
                <div className="h-80 border-4 border-bb-yellow bg-bb-yellow/10 rounded-lg flex items-center justify-center p-8 cursor-pointer hover:border-bb-blue transition-colors">
                  <p className="text-6xl font-bold text-center">
                    Chocolate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .flip-card-container {
          perspective: 1000px;
          height: 20rem;
          width: 100%;
          max-width: 28rem;
        }

        .flip-card-content {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .flip-card-content.is-flipped {
          transform: rotateY(180deg);
        }

        .flip-card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flip-card-face-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </main>
  );
}
