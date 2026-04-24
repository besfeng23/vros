'use server';
/**
 * @fileOverview A generative AI tool for administrative users to craft or refine marketing copy.
 *
 * - generateMarketingCopy - A function that generates or refines marketing copy based on input criteria.
 * - AdminAIAssistedContentAuthoringInput - The input type for the generateMarketingCopy function.
 * - AdminAIAssistedContentAuthoringOutput - The return type for the generateMarketingCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminAIAssistedContentAuthoringInputSchema = z.object({
  contentType: z
    .enum(['service_description', 'promotion_headline', 'patient_communication', 'general_marketing_copy'])
    .describe('The type of content to generate or refine (e.g., service description, promotion headline).'),
  currentDraft: z
    .string()
    .optional()
    .describe('Optional: Existing draft copy to be refined.'),
  keyPoints: z
    .array(z.string())
    .optional()
    .describe('Optional: Specific points or information that must be included in the copy.'),
  targetAudience: z
    .string()
    .optional()
    .describe('Optional: The target audience for this communication (e.g., new patients, existing clients interested in anti-aging).'),
  callToAction: z
    .string()
    .optional()
    .describe('Optional: The desired call to action (e.g., "Book now", "Learn more about our services").'),
  lengthPreference: z
    .string()
    .optional()
    .describe('Optional: Desired length of the copy, e.g., "short paragraph", "two sentences", "detailed description", "100 words".'),
});
export type AdminAIAssistedContentAuthoringInput = z.infer<typeof AdminAIAssistedContentAuthoringInputSchema>;

const AdminAIAssistedContentAuthoringOutputSchema = z.object({
  refinedCopy: z.string().describe('The AI-generated or refined marketing copy.'),
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
  prompt: `You are an expert marketing copywriter for Ortiz Clinic Philippines, a premium luxury medical brand specializing in skincare. Your goal is to craft content that consistently reflects:
1.  **Luxurious and Exclusive Tone:** Emphasizing quiet luxury, sophistication, and a premium patient experience.
2.  **Medical Credibility:** Ensuring accuracy, trustworthiness, and a professional, authoritative voice.
3.  **Conversion Objectives:** Persuading and guiding the reader towards a clear call to action or understanding, aligning with our business goals.
4.  **Calm and Polished Aesthetic:** Avoiding any noisy, aggressive, or cheap marketing language.

Your task is to generate new marketing copy or refine existing copy based on the following details. Ensure the output is concise, elegant, and highly effective for our discerning clientele.

Content Type: {{{contentType}}}
{{#if currentDraft}}
Current Draft to Refine: {{{currentDraft}}}
{{/if}}
{{#if keyPoints}}
Key Points to Include:
{{#each keyPoints}}- {{{this}}}
{{/each}}
{{/if}}
{{#if targetAudience}}
Target Audience: {{{targetAudience}}}
{{/if}}
{{#if callToAction}}
Desired Call to Action: {{{callToAction}}}
{{/if}}
{{#if lengthPreference}}
Desired Length: {{{lengthPreference}}}
{{/if}}

Please provide only the refined marketing copy in your response. Do not include any conversational text.`,
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
