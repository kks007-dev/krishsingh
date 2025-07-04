// src/ai/flows/generate-personalized-constellation.ts
'use server';
/**
 * @fileOverview Generates a personalized constellation image based on recruiter inputs.
 *
 * - generatePersonalizedConstellation - A function that generates a constellation image.
 * - GeneratePersonalizedConstellationInput - The input type for the generatePersonalizedConstellation function.
 * - GeneratePersonalizedConstellationOutput - The return type for the generatePersonalizedConstellation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedConstellationInputSchema = z.object({
  companyName: z.string().describe("The recruiter's company name."),
  role: z.string().describe('The job role they are hiring for.'),
  keySkills: z
    .string()
    .describe('Key skills they are looking for in a candidate.'),
  companyCulture: z
    .string()
    .describe('A few words about the company culture.'),
});
export type GeneratePersonalizedConstellationInput = z.infer<
  typeof GeneratePersonalizedConstellationInputSchema
>;

const GeneratePersonalizedConstellationOutputSchema = z.object({
  constellationImage: z
    .string()
    .describe(
      "The generated constellation image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
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

const generatePersonalizedConstellationFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedConstellationFlow',
    inputSchema: GeneratePersonalizedConstellationInputSchema,
    outputSchema: GeneratePersonalizedConstellationOutputSchema,
  },
  async input => {
    const {companyName, role, keySkills, companyCulture} = input;
    const promptText = `Generate a cosmic constellation that represents a potential job opportunity.
      Company Name: ${companyName}
      Hiring for Role: ${role}
      Key Skills Required: ${keySkills}
      Company Culture: ${companyCulture}
      The constellation should be a beautiful, abstract representation of these elements, like a celestial map for a career. It should be set against a dark, starry night sky background. Do not include any text in the image.`;

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [{text: promptText}],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {
      constellationImage: media!.url,
    };
  }
);