// src/ai/flows/generate-personalized-constellation.ts
'use server';
/**
 * @fileOverview Generates a personalized constellation image based on portfolio details.
 *
 * - generatePersonalizedConstellation - A function that generates a constellation image.
 * - GeneratePersonalizedConstellationInput - The input type for the generatePersonalizedConstellation function.
 * - GeneratePersonalizedConstellationOutput - The return type for the generatePersonalizedConstellation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedConstellationInputSchema = z.object({
  portfolioDetails: z
    .string()
    .describe('A description of the users portfolio and work experience.'),
});
export type GeneratePersonalizedConstellationInput = z.infer<
  typeof GeneratePersonalizedConstellationInputSchema
>;

const GeneratePersonalizedConstellationOutputSchema = z.object({
  constellationImage: z
    .string()
    .describe(
      'The generated constellation image as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Keep the backslashes for escaping special characters like single quotes
    ),
});
export type GeneratePersonalizedConstellationOutput = z.infer<
  typeof GeneratePersonalizedConstellationOutputSchema
>;

export async function generatePersonalizedConstellation(
  input: GeneratePersonalizedConstellationInput
): Promise<GeneratePersonalizedConstellationOutput> {
  return generatePersonalizedConstellationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedConstellationPrompt',
  input: {schema: GeneratePersonalizedConstellationInputSchema},
  output: {schema: GeneratePersonalizedConstellationOutputSchema},
  prompt: `Given the following portfolio details, generate a constellation image that visually represents the user\'s work and experience.  The image should be a data URI.

Portfolio Details: {{{portfolioDetails}}}`, // Keep the backslashes for escaping single quotes in the prompt string.
});

const generatePersonalizedConstellationFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedConstellationFlow',
    inputSchema: GeneratePersonalizedConstellationInputSchema,
    outputSchema: GeneratePersonalizedConstellationOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {
          text: `Generate a constellation background based on these portfolio details: ${input.portfolioDetails}`,
        },
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {
      constellationImage: media!.url,
    };
  }
);
