export interface WallpaperSettings {
  prompt: string;
  negativePrompt?: string;
  seed?: number;
  isGenerating: boolean;
}

export interface GeneratedImage {
  url: string;
  seed: number;
}