import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  const state = store.getState();
  const cards = store.getCards();

  return NextResponse.json({
    ...state,
    cards: cards.filter(c => state.visibleCards.includes(c.id)),
  });
}
