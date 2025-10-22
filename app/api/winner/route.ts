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

Please select the winner based on:
- Relevance to the project
- Creativity and originality
- Practical applicability
- Overall quality of the contribution

Respond ONLY in this exact format (do not critique other ideas, only explain why the winner was chosen):
WINNER: [exact name from the list above]
REASON: [1-2 sentences explaining why this idea won, focusing on its positive qualities]`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text'
      ? message.content[0].text.trim()
      : '';

    console.log('AI Response:', responseText);

    // Parse the response
    const winnerMatch = responseText.match(/WINNER:\s*(.+?)(?:\n|$)/i);
    const reasonMatch = responseText.match(/REASON:\s*([\s\S]+?)$/i);

    console.log('Winner Match:', winnerMatch);
    console.log('Reason Match:', reasonMatch);

    if (!winnerMatch || !reasonMatch) {
      return NextResponse.json(
        { error: `AI returned invalid format: "${responseText}"` },
        { status: 500 }
      );
    }

    const winnerName = winnerMatch[1].trim();
    const reason = reasonMatch[1].trim();

    console.log('Parsed Winner:', winnerName);
    console.log('Parsed Reason:', reason);

    // Find the winner in our inputs
    const winner = inputs.find(
      (input) => input.name.toLowerCase() === winnerName.toLowerCase()
    );

    if (!winner) {
      return NextResponse.json(
        { error: `AI returned unknown winner name: "${winnerName}". Available names: ${inputs.map(i => i.name).join(', ')}` },
        { status: 500 }
      );
    }

    store.setWinner(winner, reason);

    return NextResponse.json({ success: true, winner: store.getWinner(), reason });
  } catch (error) {
    console.error('Error selecting winner:', error);
    return NextResponse.json(
      { error: 'Failed to select winner' },
      { status: 500 }
    );
  }
}
