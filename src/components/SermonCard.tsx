import React from 'react';
import { Calendar, Play, User } from 'lucide-react';

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
  const {
    title,
    speaker,
    date,
    description,
    videoUrl,
    thumbnail,
    series,
    duration
  } = sermon;

  const handlePlay = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group ${featured ? 'border-4 border-amber-500' : ''}`}>
      {/* Thumbnail Section */}
      <div className="relative h-48 bg-gradient-to-br from-blue-900 to-blue-700 overflow-hidden">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-2">📖</div>
              <p className="text-sm opacity-75">Sermon Thumbnail</p>
            </div>
          </div>
        )}

        {videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handlePlay}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-200 hover:scale-110"
            >
              <Play className="w-8 h-8 text-blue-900 ml-1" />
            </button>
          </div>
        )}

        {series && (
          <div className="absolute top-4 left-4">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {series}
            </span>
          </div>
        )}

        {duration && (
          <div className="absolute top-4 right-4">
            <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              {duration}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-900 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span className="font-medium">{speaker}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {videoUrl && (
            <button
              onClick={handlePlay}
              className="flex-1 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Watch
            </button>
          )}
          <button className="flex-1 border border-blue-900 hover:bg-blue-50 text-blue-900 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default SermonCard;

