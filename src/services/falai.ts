import { fal, falConfig } from '../config/falai';
import type { GeneratedImage } from '../types/wallpaper';

export async function generateWallpaper(
  prompt: string,
  negativePrompt?: string,
  seed?: number
): Promise<GeneratedImage> {
  try {
    const sanitizedPrompt = prompt.trim();
    if (!sanitizedPrompt) {
      throw new Error('Prompt is required');
    }

    const result = await fal.subscribe('fal-ai/sana', {
      input: {
        ...falConfig.defaultParams,
        prompt: sanitizedPrompt,
        negative_prompt: negativePrompt?.trim(),
        seed: seed || Math.floor(Math.random() * 1000000),
      },
    });

    if (!result.images?.[0]?.url) {
      throw new Error('No image was generated');
    }

    return {
      url: result.images[0].url,
      seed: result.seed,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error generating wallpaper:', error.message);
      throw new Error(`Failed to generate wallpaper: ${error.message}`);
    }
    console.error('Unknown error generating wallpaper:', error);
    throw new Error('Failed to generate wallpaper. Please try again.');
  }
}