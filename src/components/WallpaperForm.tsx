import React from 'react';
import { Wand2 } from 'lucide-react';
import type { WallpaperSettings } from '../types/wallpaper';

interface WallpaperFormProps {
  settings: WallpaperSettings;
  onSettingsChange: (settings: Partial<WallpaperSettings>) => void;
  onGenerate: () => void;
}

export default function WallpaperForm({ settings, onSettingsChange, onGenerate }: WallpaperFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
      <div className="space-y-2">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
          Prompt
        </label>
        <textarea
          id="prompt"
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          placeholder="Describe your perfect wallpaper (e.g., 'a serene mountain landscape at sunset, photorealistic')"
          value={settings.prompt}
          onChange={(e) => onSettingsChange({ prompt: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="negativePrompt" className="block text-sm font-medium text-gray-700">
          Negative Prompt (Optional)
        </label>
        <textarea
          id="negativePrompt"
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
          rows={2}
          placeholder="Elements to avoid (e.g., 'blurry, distorted, text, watermarks')"
          value={settings.negativePrompt}
          onChange={(e) => onSettingsChange({ negativePrompt: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="seed" className="block text-sm font-medium text-gray-700">
          Seed (Optional)
        </label>
        <input
          type="number"
          id="seed"
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter a seed number for reproducible results"
          value={settings.seed || ''}
          onChange={(e) => onSettingsChange({ seed: e.target.value ? Number(e.target.value) : undefined })}
          min={0}
          max={999999}
        />
      </div>

      <button
        type="submit"
        disabled={!settings.prompt.trim() || settings.isGenerating}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
      >
        <Wand2 className="h-5 w-5" />
        {settings.isGenerating ? 'Generating...' : 'Generate Wallpaper'}
      </button>
    </form>
  );
}