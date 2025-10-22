import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST() {
  try {
    store.clearUserInputs();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to clear inputs' },
      { status: 500 }
    );
  }
}
