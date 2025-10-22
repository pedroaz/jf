import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  const cards = store.getCards();
  return NextResponse.json(cards);
}
