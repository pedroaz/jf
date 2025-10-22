'use client';

import { useState, useEffect } from 'react';
import { ProjectCard } from '@/lib/types';
import Link from 'next/link';

export default function AdminPage() {
  const [cards, setCards] = useState<ProjectCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch('/api/admin/cards');
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCard = async (cardId: string) => {
    try {
      await fetch('/api/admin/toggle-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardId }),
      });

      // Update local state
      setCards((prev) =>
        prev.map((card) =>
          card.id === cardId ? { ...card, visible: !card.visible } : card
        )
      );
    } catch (error) {
      console.error('Failed to toggle card:', error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <Link
            href="/presentation/3"
            className="px-4 py-2 bg-bb-blue text-white rounded-lg hover:opacity-80 transition-opacity"
          >
            View Presentation
          </Link>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Link
                key={num}
                href={`/presentation/${num}`}
                className="px-3 py-1 bg-white border-2 border-gray-300 rounded hover:border-bb-yellow transition-colors"
              >
                Slide {num}
              </Link>
            ))}
            <Link
              href="/input"
              className="px-3 py-1 bg-white border-2 border-gray-300 rounded hover:border-bb-pink transition-colors"
            >
              Input Form
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Project Cards (Slide 3)
          </h2>
          <p className="text-gray-600 mb-6">
            Click on cards to toggle their visibility in the presentation
          </p>

          <div className="space-y-3">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => toggleCard(card.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  card.visible
                    ? 'border-bb-green bg-bb-green/10 shadow-md'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{card.title}</h3>
                    <p className="text-sm text-gray-600">
                      {card.description}
                    </p>
                  </div>
                  <div
                    className={`ml-4 px-4 py-2 rounded-full text-sm font-semibold ${
                      card.visible
                        ? 'bg-bb-green text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {card.visible ? '✓ Visible' : 'Hidden'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
