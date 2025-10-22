export interface UserInput {
  id: string;
  name: string;
  idea: string;
  timestamp: number;
}

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  visible: boolean;
}

export interface AppState {
  visibleCards: string[]; // IDs of visible project cards
  userInputs: UserInput[];
  winner: UserInput | null;
}
