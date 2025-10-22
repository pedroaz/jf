import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, idea } = body;

    if (!name || !idea) {
      return NextResponse.json(
        { error: 'Name and idea are required' },
        { status: 400 }
      );
    }

    store.addUserInput({ name, idea });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add input' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const inputs = store.getUserInputs();
  return NextResponse.json(inputs);
}
