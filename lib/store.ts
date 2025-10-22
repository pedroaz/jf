import { AppState, UserInput, ProjectCard } from './types';
import { projectCards } from './sampleCards';

// In-memory store for the presentation state
class Store {
  private state: AppState = {
    visibleCards: [],
    userInputs: [],
    winner: null,
    winnerReason: null,
  };

  private cards: ProjectCard[] = [...projectCards];

  getState(): AppState {
    return { ...this.state };
  }

  getCards(): ProjectCard[] {
    return [...this.cards];
  }

  toggleCardVisibility(cardId: string): void {
    const card = this.cards.find((c) => c.id === cardId);
    if (card) {
      card.visible = !card.visible;
      this.updateVisibleCards();
    }
  }

  private updateVisibleCards(): void {
    this.state.visibleCards = this.cards
      .filter((c) => c.visible)
      .map((c) => c.id);
  }

  addUserInput(input: Omit<UserInput, 'id' | 'timestamp'>): void {
    const newInput: UserInput = {
      ...input,
      id: `input-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };
    this.state.userInputs.push(newInput);
  }

  getUserInputs(): UserInput[] {
    return [...this.state.userInputs];
  }

  setWinner(winner: UserInput, reason: string): void {
    console.log('Store.setWinner called with:', { winner, reason });
    this.state.winner = winner;
    this.state.winnerReason = reason;
    console.log('Store state after setWinner:', this.state);
  }

  getWinner(): UserInput | null {
    return this.state.winner;
  }

  getWinnerReason(): string | null {
    return this.state.winnerReason;
  }

  clearUserInputs(): void {
    this.state.userInputs = [];
    this.state.winner = null;
    this.state.winnerReason = null;
  }

  reset(): void {
    this.state = {
      visibleCards: [],
      userInputs: [],
      winner: null,
      winnerReason: null,
    };
    this.cards = [...projectCards];
  }
}

// Global singleton instance that persists across hot reloads
const globalForStore = globalThis as unknown as {
  store: Store | undefined;
};

export const store = globalForStore.store ?? new Store();

if (process.env.NODE_ENV !== 'production') {
  globalForStore.store = store;
}

// Log store instance ID for debugging
const storeId = Math.random().toString(36).substr(2, 9);
console.log('Store instance created/accessed:', storeId);
