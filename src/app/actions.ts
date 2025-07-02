
'use server';
import { generatePersonalizedConstellation, type GeneratePersonalizedConstellationInput } from '@/ai/flows/generate-personalized-constellation';

export async function runConstellationGenerator(input: GeneratePersonalizedConstellationInput) {
  try {
    const result = await generatePersonalizedConstellation(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to generate constellation: ${errorMessage}` };
  }
}
