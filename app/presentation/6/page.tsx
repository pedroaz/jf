'use client';

import { NavigationButtons } from '@/components/NavigationButtons';
import { useAppState } from '@/hooks/useAppState';
import { useState, useEffect } from 'react';

export default function Presentation6() {
  const { userInputs, winner } = useAppState();
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWinner, setShowWinner] = useState(false);

  const selectWinner = async () => {
    if (userInputs.length === 0) return;

    setIsAnimating(true);
    setShowWinner(false);

    // Cycle through entries
    let cycles = 0;
    const maxCycles = 20;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % userInputs.length);
      cycles++;

      if (cycles >= maxCycles) {
        clearInterval(interval);
        // Make API call to select winner
        fetch('/api/winner', { method: 'POST' })
          .then(() => {
            setTimeout(() => {
              setIsAnimating(false);
              setShowWinner(true);
            }, 500);
          })
          .catch((error) => {
            console.error('Failed to select winner:', error);
            setIsAnimating(false);
          });
      }
    }, 100);
  };

  const displayedInput = isAnimating
    ? userInputs[currentIndex]
    : winner;

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <NavigationButtons backHref="/presentation/5" />

      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-12">
          {showWinner ? '🎉 Winner! 🎉' : 'Now who gets the chocolate?'}
        </h1>

        {!isAnimating && !showWinner && (
          <button
            onClick={selectWinner}
            disabled={userInputs.length === 0}
            className="px-8 py-4 bg-bb-pink text-white text-2xl rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mb-12"
          >
            Pick Winner
          </button>
        )}

        {(isAnimating || showWinner) && displayedInput && (
          <div
            className={`p-12 rounded-2xl border-4 transition-all duration-300 ${showWinner
                ? 'bg-bb-yellow/20 border-bb-yellow scale-110 shadow-2xl'
                : 'bg-gray-100 border-gray-300'
              }`}
          >
            <h2 className="text-4xl font-bold mb-6">{displayedInput.name}</h2>
            <p className="text-2xl text-gray-700">{displayedInput.idea}</p>
          </div>
        )}

        {userInputs.length === 0 && (
          <p className="text-gray-400 text-xl">
            No submissions yet. Cannot select a winner.
          </p>
        )}
      </div>
    </main>
  );
}
