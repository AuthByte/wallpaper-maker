import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import WallpaperForm from './components/WallpaperForm';
import { WallpaperDisplay } from './components/WallpaperDisplay';
import { generateWallpaper } from './services/falai';
import type { WallpaperSettings, GeneratedImage } from './types/wallpaper';
import { ImageIcon } from 'lucide-react';

function App() {
  const [settings, setSettings] = useState<WallpaperSettings>({
    prompt: '',
    negativePrompt: '',
    isGenerating: false,
  });
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);

  const handleSettingsChange = (newSettings: Partial<WallpaperSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleGenerate = async () => {
    if (!settings.prompt) return;

    setSettings((prev) => ({ ...prev, isGenerating: true }));
    try {
      const result = await generateWallpaper(
        settings.prompt,
        settings.negativePrompt,
        settings.seed
      );
      setGeneratedImage(result);
      toast.success('Wallpaper generated successfully!');
    } catch (error) {
      toast.error('Failed to generate wallpaper. Please try again.');
      console.error(error);
    } finally {
      setSettings((prev) => ({ ...prev, isGenerating: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ImageIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">4K Wallpaper Maker</h1>
          </div>
          <p className="text-lg text-gray-600">
            Create beautiful 4K wallpapers using AI. Just describe what you want to see.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <WallpaperForm
              settings={settings}
              onSettingsChange={handleSettingsChange}
              onGenerate={handleGenerate}
            />
            <div className="prose prose-sm">
              <h3>Tips for better results:</h3>
              <ul>
                <li>Be specific about the style you want (e.g., "photorealistic", "anime", "oil painting")</li>
                <li>Include details about lighting and atmosphere</li>
                <li>Use the negative prompt to exclude unwanted elements</li>
                <li>Save the seed number to recreate similar images</li>
              </ul>
            </div>
          </div>
          
          <div>
            <WallpaperDisplay image={generatedImage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;