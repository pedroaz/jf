import { NextResponse } from 'next/server';
import { store } from '@/lib/store';
import Anthropic from '@anthropic-ai/sdk';

export async function POST() {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    const inputs = store.getUserInputs();

    if (inputs.length === 0) {
      return NextResponse.json(
        { error: 'No inputs to evaluate' },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic({
      apiKey,
    });

    const prompt = `You are evaluating ideas for a project presentation at a company. The project is for FIP (FRÄNKISCHE Industrial Pipes) - an internal ERP system where we're tackling the time tracking module first using Azure, C#, and modern development practices including spec development, design, testing, and high automation.

Here are the ideas submitted by attendees:

${inputs.map((input, idx) => `${idx + 1}. ${input.name}: "${input.idea}"`).join('\n')}

Please analyze all ideas and select the winner based on:
- Relevance to the project
- Creativity and originality
- Practical applicability
- Overall quality of the contribution

Respond with ONLY the name of the winner (exactly as it appears above, nothing else). Just the name, no explanation.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const winnerName = message.content[0].type === 'text'
      ? message.content[0].text.trim()
      : '';

    // Find the winner in our inputs
    const winner = inputs.find(
      (input) => input.name.toLowerCase() === winnerName.toLowerCase()
    );

    if (!winner) {
      // Fallback: pick random if name doesn't match
      const randomIndex = Math.floor(Math.random() * inputs.length);
      store.setWinner(inputs[randomIndex]);
    } else {
      store.setWinner(winner);
    }

    return NextResponse.json({ success: true, winner: store.getWinner() });
  } catch (error) {
    console.error('Error selecting winner:', error);
    return NextResponse.json(
      { error: 'Failed to select winner' },
      { status: 500 }
    );
  }
}
