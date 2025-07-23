import React from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';

interface Event {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  location: string;
  imageUrl?: string;
  category?: string;
  registrationRequired?: boolean;
  onRegister?: () => void;
}

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, featured }) => {
  const {
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    imageUrl,
    category,
    registrationRequired = false,
    onRegister
  } = event;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (cat?: string) => {
    const colors = {
      worship: 'bg-blue-500',
      fellowship: 'bg-green-500',
      outreach: 'bg-purple-500',
      youth: 'bg-orange-500',
      children: 'bg-pink-500',
      conference: 'bg-red-500',
      prayer: 'bg-indigo-500',
      default: 'bg-gray-500'
    };

    if (!cat || typeof cat !== 'string') return colors.default;

    return colors[cat.toLowerCase() as keyof typeof colors] || colors.default;
  };

  const isUpcoming = new Date(startDate) > new Date();

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group ${featured ? 'border-4 border-yellow-400' : ''}`}>
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-blue-900 to-blue-700 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-2">📅</div>
              <p className="text-sm opacity-75">Event Image</p>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`${getCategoryColor(category)} text-white px-3 py-1 rounded-full text-xs font-semibold capitalize`}>
            {category || 'Uncategorized'}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isUpcoming 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-500 text-white'
          }`}>
            {isUpcoming ? 'Upcoming' : 'Past'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-900 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {/* Date */}
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-blue-900" />
            <span>
              {formatDate(startDate)}
              {endDate && endDate !== startDate && ` - ${formatDate(endDate)}`}
            </span>
          </div>

          {/* Time */}
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-blue-900" />
            <span>
              {startTime}
              {endTime && ` - ${endTime}`}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-blue-900" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {registrationRequired && isUpcoming && (
            <button
              onClick={onRegister}
              className="flex-1 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              Register
            </button>
          )}
          <button className="flex-1 border border-blue-900 hover:bg-blue-50 text-blue-900 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
            Learn More
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Registration Info */}
        {registrationRequired && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800 flex items-center">
              <Users className="w-3 h-3 mr-1" />
              Registration required
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
