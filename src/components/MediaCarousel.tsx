import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface Props {
  items: string[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

function isVideo(url: string | undefined) {
  if (!url) return false;
  return /\.(mp4|mov|webm|avi|mkv)(\?|$)/i.test(url) ||
    url.includes('youtube.com') || url.includes('youtu.be') ||
    (url.includes('cloudinary.com') && url.includes('/video/'));
}

function isYouTube(url: string | undefined) {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
}

function youtubeEmbed(url: string) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|live\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

export default function MediaCarousel({ items, autoPlay = true, interval = 4000, className = '' }: Props) {
  const valid = items.filter(Boolean);
  const [idx, setIdx] = useState(0);

  // Only reset to first slide when the actual content changes, not just the array reference
  const itemsKey = items.join('|');
  useEffect(() => {
    setIdx(0);
  }, [itemsKey]);

  const validLength = valid.length;
  useEffect(() => {
    const si = Math.min(idx, Math.max(0, validLength - 1));
    if (!autoPlay || validLength <= 1 || isVideo(valid[si])) return;
    const t = setInterval(() => setIdx(p => (p + 1) % validLength), interval);
    return () => clearInterval(t);
  }, [autoPlay, idx, validLength, interval]);

  if (!valid.length) return null;

  const safeIdx = Math.min(idx, valid.length - 1);
  const url = valid[safeIdx];
  const video = isVideo(url);
  const yt = isYouTube(url);

  return (
    <div className={`relative overflow-hidden rounded-lg bg-slate-900 ${className}`}>
      <div className="w-full aspect-video">
        {video ? (
          yt ? (
            <iframe
              src={youtubeEmbed(url)}
              className="w-full h-full"
              allowFullScreen
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <video src={url} controls className="w-full h-full object-contain bg-black" />
          )
        ) : (
          <img
            src={url}
            alt=""
            className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
      </div>

      {valid.length > 1 && (
        <>
          <button
            onClick={() => setIdx(p => (p - 1 + valid.length) % valid.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIdx(p => (p + 1) % valid.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {valid.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === safeIdx ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full z-10">
            {safeIdx + 1}/{valid.length}
          </div>
        </>
      )}

      {!video && valid.length === 1 && (
        <div className="absolute bottom-2 right-2 text-white/60 text-xs bg-black/40 px-2 py-0.5 rounded-full z-10 flex items-center gap-1">
          <Play className="w-3 h-3" /> Photo
        </div>
      )}
    </div>
  );
}
