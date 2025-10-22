'use client';

import { useEffect, useState } from 'react';
import { AppState, ProjectCard } from '@/lib/types';

interface StateResponse extends AppState {
  cards: ProjectCard[];
}

export function useAppState() {
  const [state, setState] = useState<StateResponse>({
    visibleCards: [],
    userInputs: [],
    winner: null,
    cards: [],
  });

  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await fetch('/api/state');
        const data = await response.json();
        setState(data);
      } catch (error) {
        console.error('Failed to fetch state:', error);
      }
    };

    // Initial fetch
    fetchState();

    // Poll every 500ms
    const interval = setInterval(fetchState, 500);

    return () => clearInterval(interval);
  }, []);

  return state;
}
