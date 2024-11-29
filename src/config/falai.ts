import * as fal from '@fal-ai/serverless-client';
import { env } from './env';

// Configure FAL.AI client with API key
fal.config({
  credentials: env.falKey,
});

export const falConfig = {
  defaultParams: {
    image_size: "landscape_16_9", // Changed from "1024x576" to a supported preset
    num_inference_steps: 30,
    guidance_scale: 7.0,
    scheduler: "UniPCMultistepScheduler",
  },
};

export { fal };