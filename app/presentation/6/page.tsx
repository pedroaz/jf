'use client';

import { NavigationButtons } from '@/components/NavigationButtons';
import { useAppState } from '@/hooks/useAppState';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/useWindowSize';

export default function Presentation6() {
  const { userInputs } = useAppState();
  const [isThinking, setIsThinking] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localWinner, setLocalWinner] = useState<any>(null);
  const [localWinnerReason, setLocalWinnerReason] = useState<string | null>(null);
  const { width, height } = useWindowSize();

  // Debug logging
  useEffect(() => {
    if (showWinner) {
      console.log('Winner data:', { winner: localWinner, winnerReason: localWinnerReason });
    }
  }, [showWinner, localWinner, localWinnerReason]);

  const selectWinner = async () => {
    if (userInputs.length === 0) return;

    setIsThinking(true);
    setShowWinner(false);
    setError(null);

    // Make API call to select winner
    try {
      const response = await fetch('/api/winner', { method: 'POST' });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to select winner');
      }

      const data = await response.json();
      console.log('Winner API response:', data);

      // Store the winner data locally
      setLocalWinner(data.winner);
      setLocalWinnerReason(data.reason);

      // Wait a bit before showing winner for dramatic effect
      setTimeout(() => {
        setIsThinking(false);
        setShowWinner(true);
      }, 1000);
    } catch (error: any) {
      console.error('Failed to select winner:', error);
      setIsThinking(false);
      setError(error.message || 'AI failed to select winner');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      {showWinner && localWinner && <Confetti width={width} height={height} recycle={true} />}
      <NavigationButtons backHref="/presentation/5" />

      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-12">
          {showWinner ? '🎉 Winner! 🎉' : 'Now who gets the chocolate?'}
        </h1>

        {isThinking && (
          <div className="mb-8 p-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-bb-pink mb-6"></div>
            <p className="text-3xl font-bold text-bb-blue animate-pulse">
              AI is thinking...
            </p>
          </div>
        )}

        {error && (
          <div className="mb-8 p-6 bg-red-100 border-2 border-red-500 rounded-lg">
            <p className="text-2xl font-bold text-red-700 mb-2">
              ❌ AI Selection Failed
            </p>
            <p className="text-lg text-red-600">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!isThinking && !showWinner && !error && (
          <button
            onClick={selectWinner}
            disabled={userInputs.length === 0}
            className="px-8 py-4 bg-bb-pink text-white text-2xl rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mb-12"
          >
            Pick Winner
          </button>
        )}

        {!error && showWinner && localWinner && (
          <div className="p-12 rounded-2xl border-4 bg-bb-yellow/20 border-bb-yellow shadow-2xl transition-all duration-300">
            <h2 className="text-5xl font-bold mb-6 text-bb-blue">{localWinner.name}</h2>
            <p className="text-xl text-gray-600 mb-6 italic">&quot;{localWinner.idea}&quot;</p>
            {localWinnerReason && (
              <div className="mt-8 pt-8 border-t-2 border-bb-yellow">
                <p className="text-lg font-semibold text-bb-pink mb-2">Why they won:</p>
                <p className="text-xl text-gray-800">{localWinnerReason}</p>
              </div>
            )}
          </div>
        )}

        {userInputs.length === 0 && !error && !isThinking && (
          <p className="text-gray-400 text-xl">
            No submissions yet. Cannot select a winner.
          </p>
        )}
      </div>
    </main>
  );
}
