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
  const { title, description, startDate, endDate, startTime, endTime, location, imageUrl, category, registrationRequired = false, onRegister } = event;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  const isUpcoming = new Date(startDate) > new Date();

  return (
    <div className={`bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group border ${featured ? 'border-cjc-gold/60' : 'border-gray-100 hover:border-cjc-gold/30'}`}>
      {/* Image */}
      <div className="relative h-48 bg-cjc-navy overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cjc-navy to-cjc-blue">
            <Calendar className="w-16 h-16 text-cjc-gold/30" />
          </div>
        )}

        {/* Category */}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="bg-cjc-gold text-white px-2.5 py-1 rounded-lg text-xs font-semibold capitalize">{category}</span>
          </div>
        )}

        {/* Status */}
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${isUpcoming ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>
            {isUpcoming ? 'Upcoming' : 'Past'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-cjc-navy mb-3 line-clamp-2 group-hover:text-cjc-gold transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 mb-4 line-clamp-2 text-sm leading-relaxed">{description}</p>

        <div className="space-y-2 mb-5">
          <div className="flex items-center text-sm text-gray-500 gap-2">
            <Calendar className="w-4 h-4 text-cjc-gold/70 flex-shrink-0" />
            <span>{formatDate(startDate)}{endDate && endDate !== startDate && ` – ${formatDate(endDate)}`}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 gap-2">
            <Clock className="w-4 h-4 text-cjc-gold/70 flex-shrink-0" />
            <span>{startTime}{endTime && ` – ${endTime}`}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 gap-2">
            <MapPin className="w-4 h-4 text-cjc-gold/70 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {registrationRequired && isUpcoming && (
            <button onClick={onRegister}
              className="flex-1 bg-cjc-gold hover:bg-cjc-gold-mid text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2">
              <Users className="w-4 h-4" /> Register
            </button>
          )}
          <button className="flex-1 border border-cjc-navy/20 hover:border-cjc-gold/40 hover:bg-cjc-gold/5 text-cjc-navy px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
            Learn More <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {registrationRequired && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-cjc-gold bg-cjc-gold/10 rounded-lg px-3 py-2">
            <Users className="w-3 h-3" /> Registration required
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
