import { AppState, UserInput, ProjectCard } from './types';
import { projectCards } from './sampleCards';

// In-memory store for the presentation state
class Store {
  private state: AppState = {
    visibleCards: [],
    userInputs: [],
    winner: null,
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

  setWinner(winner: UserInput): void {
    this.state.winner = winner;
  }

  getWinner(): UserInput | null {
    return this.state.winner;
  }

  clearUserInputs(): void {
    this.state.userInputs = [];
    this.state.winner = null;
  }

  reset(): void {
    this.state = {
      visibleCards: [],
      userInputs: [],
      winner: null,
    };
    this.cards = [...projectCards];
  }
}

// Singleton instance
export const store = new Store();
