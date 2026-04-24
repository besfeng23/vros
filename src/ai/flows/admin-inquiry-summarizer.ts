
/**
 * @fileOverview A Genkit flow for summarizing operational inquiries and stakeholder context.
 *
 * - summarizeInquiry - A function that processes and synthesizes operational data using AI.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AdminInquirySummarizerInputSchema = z.object({
  inquiryText: z
    .string()
    .describe('The raw text content of the operational inquiry, deal note, or stakeholder context.'),
});
export type AdminInquirySummarizerInput = z.infer<
  typeof AdminInquirySummarizerInputSchema
>;

const AdminInquirySummarizerOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise, executive-level summary of the intelligence.'),
  sentiment: z
    .enum(['positive', 'neutral', 'negative', 'urgent'])
    .describe('The overall strategic sentiment or operational urgency.'),
  keywords: z
    .array(z.string())
    .describe('A list of key entities, divisions, or protocols mentioned.'),
  recommendedAction: z
    .string()
    .describe(
      'A brief, actionable recommendation for executive response or divisional handoff.'
    ),
});
export type AdminInquirySummarizerOutput = z.infer<
  typeof AdminInquirySummarizerOutputSchema
>;

export async function summarizeInquiry(
  input: AdminInquirySummarizerInput
): Promise<AdminInquirySummarizerOutput> {
  return adminInquirySummarizerFlow(input);
}

const inquirySummarizerPrompt = ai.definePrompt({
  name: 'inquirySummarizerPrompt',
  input: { schema: AdminInquirySummarizerInputSchema },
  output: { schema: AdminInquirySummarizerOutputSchema },
  prompt: `You are an AI assistant for Harmony OS, a premium enterprise operations platform. 
You specialize in synthesizing operational intelligence, stakeholder inquiries, and deal context for an executive board.

The goal is to maintain absolute discretion, strategic precision, and institutional integrity.

Analyze the following intelligence input:
"""
{{{inquiryText}}}
"""

Provide a concise executive summary, identify the strategic sentiment (positive, neutral, negative, or urgent), extract key entities/divisions, and suggest a brief, actionable recommendation for the executive team.
Ensure the output is formatted as JSON, adhering strictly to the provided output schema.`,
});

const adminInquirySummarizerFlow = ai.defineFlow(
  {
    name: 'adminInquirySummarizerFlow',
    inputSchema: AdminInquirySummarizerInputSchema,
    outputSchema: AdminInquirySummarizerOutputSchema,
  },
  async (input) => {
    const { output } = await inquirySummarizerPrompt(input);
    if (!output) {
      throw new Error('Failed to synthesize intelligence.');
    }
    return output;
  }
);
