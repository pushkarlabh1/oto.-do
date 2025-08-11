'use server';
/**
 * @fileOverview AI-powered integration suggestions for popular subsections.
 *
 * - getIntegrationSuggestions - A function that returns integration suggestions for a given category.
 * - IntegrationSuggestionsInput - The input type for the getIntegrationSuggestions function.
 * - IntegrationSuggestionsOutput - The return type for the getIntegrationSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntegrationSuggestionsInputSchema = z.object({
  category: z.enum(['commute', 'stock', 'dating']).describe('The category to get integration suggestions for.'),
  userChosenIntegrations: z.array(z.string()).optional().describe('List of integrations the user has previously chosen, to improve suggestions.'),
});
export type IntegrationSuggestionsInput = z.infer<typeof IntegrationSuggestionsInputSchema>;

const IntegrationSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of suggested integrations for the given category.'),
});
export type IntegrationSuggestionsOutput = z.infer<typeof IntegrationSuggestionsOutputSchema>;

export async function getIntegrationSuggestions(input: IntegrationSuggestionsInput): Promise<IntegrationSuggestionsOutput> {
  return integrationSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'integrationSuggestionsPrompt',
  input: {schema: IntegrationSuggestionsInputSchema},
  output: {schema: IntegrationSuggestionsOutputSchema},
  prompt: `You are an AI assistant that suggests relevant integrations for users based on their category of interest.

  The categories are commute, stock, and dating. You should only suggest integrations relevant to the category provided.

  You must return a JSON object with a "suggestions" field that is a list of strings.

  {{#if userChosenIntegrations}}
  The user has previously chosen the following integrations: {{userChosenIntegrations}}
  Use this information to provide even better suggestions.
  {{/if}}

  Category: {{{category}}}
  `,
});

const integrationSuggestionsFlow = ai.defineFlow(
  {
    name: 'integrationSuggestionsFlow',
    inputSchema: IntegrationSuggestionsInputSchema,
    outputSchema: IntegrationSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
