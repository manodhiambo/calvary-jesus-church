import React from 'react';
import { Calendar, Play, User, BookOpen } from 'lucide-react';

interface Sermon {
  title: string;
  speaker: string;
  date: string;
  description: string;
  videoUrl?: string;
  thumbnail?: string;
  series?: string;
  duration?: string;
}

interface SermonCardProps {
  sermon: Sermon;
  featured?: boolean;
}

const SermonCard: React.FC<SermonCardProps> = ({ sermon, featured }) => {
  const { title, speaker, date, description, videoUrl, thumbnail, series, duration } = sermon;

  const handlePlay = () => { if (videoUrl) window.open(videoUrl, '_blank'); };

  return (
    <div className={`bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group border ${featured ? 'border-cjc-gold/60' : 'border-gray-100 hover:border-cjc-gold/30'}`}>
      {/* Thumbnail */}
      <div className="relative h-52 bg-cjc-navy overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cjc-navy to-cjc-blue">
            <BookOpen className="w-16 h-16 text-cjc-gold/40" />
          </div>
        )}

        {/* Play overlay */}
        {videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-cjc-navy/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={handlePlay}
              className="bg-cjc-gold hover:bg-cjc-gold-mid text-white rounded-full p-4 transition-all duration-200 hover:scale-110 shadow-lg">
              <Play className="w-6 h-6 ml-0.5" />
            </button>
          </div>
        )}

        {series && (
          <div className="absolute top-3 left-3">
            <span className="bg-cjc-gold text-white px-2.5 py-1 rounded-lg text-xs font-semibold capitalize">{series}</span>
          </div>
        )}
        {duration && (
          <div className="absolute top-3 right-3">
            <span className="bg-black/60 text-white px-2 py-1 rounded text-xs">{duration}</span>
          </div>
        )}
        {featured && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-cjc-gold/90 text-white px-2.5 py-1 rounded-lg text-xs font-semibold">Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-cjc-navy mb-3 line-clamp-2 group-hover:text-cjc-gold transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 mb-5 line-clamp-3 text-sm leading-relaxed">{description}</p>

        <div className="flex items-center justify-between text-xs text-gray-400 mb-5">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-cjc-gold/70" />
            <span className="font-medium text-gray-600">{speaker}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cjc-gold/70" />
            <span>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {videoUrl && (
            <button onClick={handlePlay}
              className="flex-1 bg-cjc-gold hover:bg-cjc-gold-mid text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2">
              <Play className="w-4 h-4" /> Watch
            </button>
          )}
          <button className="flex-1 border border-cjc-navy/20 hover:border-cjc-gold/40 hover:bg-cjc-gold/5 text-cjc-navy px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default SermonCard;
