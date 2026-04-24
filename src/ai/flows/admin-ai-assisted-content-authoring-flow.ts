
/**
 * @fileOverview A generative AI tool for administrative users to craft or refine executive Communications.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminAIAssistedContentAuthoringInputSchema = z.object({
  contentType: z
    .enum(['project_brief', 'operational_directive', 'stakeholder_memo', 'general_executive_copy'])
    .describe('The type of content to generate or refine (e.g., project brief, operational directive).'),
  currentDraft: z
    .string()
    .optional()
    .describe('Optional: Existing draft copy to be refined.'),
  keyPoints: z
    .array(z.string())
    .optional()
    .describe('Optional: Specific points or protocols that must be included in the copy.'),
  targetAudience: z
    .string()
    .optional()
    .describe('Optional: The target audience for this communication (e.g., Department Heads, Executives, External Partners).'),
  callToAction: z
    .string()
    .optional()
    .describe('Optional: The desired operational mandate or next step.'),
  lengthPreference: z
    .string()
    .optional()
    .describe('Optional: Desired length of the copy, e.g., "concise briefing", "detailed mandate", "one-line alert".'),
});
export type AdminAIAssistedContentAuthoringInput = z.infer<typeof AdminAIAssistedContentAuthoringInputSchema>;

const AdminAIAssistedContentAuthoringOutputSchema = z.object({
  refinedCopy: z.string().describe('The AI-generated or refined executive communication.'),
});
export type AdminAIAssistedContentAuthoringOutput = z.infer<typeof AdminAIAssistedContentAuthoringOutputSchema>;

export async function generateMarketingCopy(
  input: AdminAIAssistedContentAuthoringInput
): Promise<AdminAIAssistedContentAuthoringOutput> {
  return adminAIAssistedContentAuthoringFlow(input);
}

const contentAuthoringPrompt = ai.definePrompt({
  name: 'adminAIAssistedContentAuthoringPrompt',
  input: {schema: AdminAIAssistedContentAuthoringInputSchema},
  output: {schema: AdminAIAssistedContentAuthoringOutputSchema},
  prompt: `You are an expert executive communication strategist for Harmony OS, a premium enterprise operations platform. 
Your goal is to craft content that consistently reflects:
1.  **Strategic Precision:** Direct, unambiguous, and focused on operational execution.
2.  **Institutional Integrity:** Maintaining a professional, authoritative, and discreet voice.
3.  **Executive Authority:** Guiding the reader towards a clear mandate or institutional understanding.
4.  **Restrained Aesthetic:** Minimalist, high-density, and free of marketing fluff.

Your task is to generate new executive copy or refine existing drafts based on the following details. 

Content Type: {{{contentType}}}
{{#if currentDraft}}
Current Draft to Refine: {{{currentDraft}}}
{{/if}}
{{#if keyPoints}}
Key Points/Protocols to Include:
{{#each keyPoints}}- {{{this}}}
{{/each}}
{{/if}}
{{#if targetAudience}}
Target Audience: {{{targetAudience}}}
{{/if}}
{{#if callToAction}}
Mandate/Action: {{{callToAction}}}
{{/if}}
{{#if lengthPreference}}
Desired Format: {{{lengthPreference}}}
{{/if}}

Please provide only the refined executive communication. Do not include any conversational preamble.`,
});

const adminAIAssistedContentAuthoringFlow = ai.defineFlow(
  {
    name: 'adminAIAssistedContentAuthoringFlow',
    inputSchema: AdminAIAssistedContentAuthoringInputSchema,
    outputSchema: AdminAIAssistedContentAuthoringOutputSchema,
  },
  async input => {
    const {output} = await contentAuthoringPrompt(input);
    return output!;
  }
);
