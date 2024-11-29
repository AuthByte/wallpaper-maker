import React from 'react';
import { Download } from 'lucide-react';
import { GeneratedImage } from '../types/wallpaper';

interface WallpaperDisplayProps {
  image: GeneratedImage | null;
}

export function WallpaperDisplay({ image }: WallpaperDisplayProps) {
  if (!image) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `wallpaper-${image.seed}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={image.url}
          alt="Generated wallpaper"
          className="w-full object-cover"
          style={{ aspectRatio: '16/9' }}
        />
        <button
          onClick={handleDownload}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-black/50 px-4 py-2 text-white backdrop-blur-sm hover:bg-black/60"
        >
          <Download className="h-5 w-5" />
          Download
        </button>
      </div>
      <p className="text-sm text-gray-600">Seed: {image.seed}</p>
    </div>
  );
}