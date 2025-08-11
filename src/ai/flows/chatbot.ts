'use server';
/**
 * @fileOverview A simple chatbot that responds to user messages.
 */

import {ai} from '@/ai/genkit';
import {
  ChatbotInput,
  ChatbotOutputSchema,
  ChatbotOutput,
} from '@/ai/flows/schemas/chatbot-schema';

export async function chatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  function renderHistory(history = []) {
    return (history || [])
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');
  }

  // Define the integrations (replace or extend as needed)
  const integrations = [
    'Ride Booking Agent: Seamless integration with transportation services for booking rides.',
    'AI Stock Analysist Agent: Advanced tools for stock market data analysis and visualization.',
    'Auto swipping agent: Automatically swipes for you on dating apps based on your preference.',
    // Add more as needed
  ];

  const prompt = `
You are oto.do's professional assistant. When asked about oto.do, describe the platform clearly and highlight its key integrations and capabilities. Use a friendly but professional tone. Answer specific questions about oto.do with concise, relevant information.

Key integrations provided by oto.do:
${integrations.map(i => `- ${i}`).join('\n')}

---

${renderHistory(input.history)}

User: ${input.message}
Assistant:
  `;

  const { output } = await ai.generate({
    prompt,
    input: input,
    output: {
      schema: ChatbotOutputSchema,
    },
  });
  return output!;
}

