'use server';
/**
 * @fileOverview A Genkit flow for summarizing patient inquiries.
 *
 * - summarizeInquiry - A function that processes and summarizes patient inquiries using AI.
 * - AdminInquirySummarizerInput - The input type for the summarizeInquiry function.
 * - AdminInquirySummarizerOutput - The return type for the summarizeInquiry function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AdminInquirySummarizerInputSchema = z.object({
  inquiryText: z
    .string()
    .describe('The raw text content of the patient inquiry or feedback.'),
});
export type AdminInquirySummarizerInput = z.infer<
  typeof AdminInquirySummarizerInputSchema
>;

const AdminInquirySummarizerOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise, editorial-style summary of the patient inquiry.'),
  sentiment: z
    .enum(['positive', 'neutral', 'negative', 'urgent'])
    .describe('The overall sentiment or urgency of the inquiry.'),
  keywords: z
    .array(z.string())
    .describe('A list of key topics or entities mentioned in the inquiry.'),
  recommendedAction: z
    .string()
    .describe(
      'A brief, actionable recommendation for how clinic staff should respond or what steps to take.'
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
  prompt: `You are an AI assistant for Ortiz Clinic Philippines, specializing in summarizing patient inquiries and feedback.
Your goal is to help clinic staff quickly understand the core message and respond efficiently, maintaining a premium, luxury-medical service experience.

Analyze the following patient inquiry, keeping in mind Ortiz Clinic's brand identity: medically credible, polished, calm, and conversion-focused.

Inquiry:
"""
{{{inquiryText}}}
"""

Provide a concise summary, identify the overall sentiment (positive, neutral, negative, or urgent), extract key topics, and suggest a brief, actionable recommendation for the clinic staff.
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
      throw new Error('Failed to summarize inquiry.');
    }
    return output;
  }
);
