import React from 'react';
import { Users, Heart, Music, BookOpen, ArrowRight, Phone, Mail } from 'lucide-react';

interface MinistryData {
  id: string;
  name: string;
  description: string;
  contactPerson: string;
  contactEmail?: string;
  contactPhone?: string;
  imageUrl?: string;
  activities: string[];
  meetingTime?: string;
  targetGroup: string;
}

interface MinistrySectionProps {
  ministry: MinistryData;
  onJoin?: () => void;
  onVolunteer?: () => void;
}

const MinistrySection: React.FC<MinistrySectionProps> = ({
  ministry,
  onJoin,
  onVolunteer
}) => {
  const getMinistryIcon = (name?: string) => {
    if (!name) return '⛪';

    const iconMap = {
      'children': '👶',
      'youth': '🌟',
      'adults': '👥',
      'music': '🎵',
      'outreach': '🤝',
      'prayer': '🙏',
      'worship': '⛪',
      'fellowship': '💒'
    };

    const key = name.toLowerCase();
    for (const [keyword, icon] of Object.entries(iconMap)) {
      if (key.includes(keyword)) {
        return icon;
      }
    }
    return '⛪';
  };

  const getTargetGroupColor = (group: string) => {
    const colors = {
      'children': 'bg-pink-100 text-pink-800 border-pink-200',
      'youth': 'bg-orange-100 text-orange-800 border-orange-200',
      'adults': 'bg-blue-100 text-blue-800 border-blue-200',
      'seniors': 'bg-purple-100 text-purple-800 border-purple-200',
      'all ages': 'bg-green-100 text-green-800 border-green-200',
      'default': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[group.toLowerCase() as keyof typeof colors] || colors.default;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header Section */}
      <div className="relative h-64 bg-gradient-to-br from-blue-900 to-blue-700 overflow-hidden">
        {ministry.imageUrl ? (
          <img 
            src={ministry.imageUrl} 
            alt={ministry.name}
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-2">{getMinistryIcon(ministry.name)}</div>
              <p className="text-sm opacity-75">Ministry Image</p>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Ministry Title */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-2">{ministry.name}</h3>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTargetGroupColor(ministry.targetGroup)}`}>
              {ministry.targetGroup}
            </span>
            {ministry.meetingTime && (
              <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-xs font-medium">
                {ministry.meetingTime}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">
          {ministry.description}
        </p>

        {/* Activities */}
        {ministry.activities && ministry.activities.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-900" />
              Activities & Programs
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {ministry.activities.map((activity, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-900 rounded-full mr-2"></div>
                  {activity}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-900" />
            Ministry Contact
          </h4>
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">{ministry.contactPerson}</p>
            {ministry.contactEmail && (
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-blue-900" />
                <a 
                  href={`mailto:${ministry.contactEmail}`}
                  className="hover:text-blue-900 transition-colors"
                >
                  {ministry.contactEmail}
                </a>
              </div>
            )}
            {ministry.contactPhone && (
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2 text-blue-900" />
                <a 
                  href={`tel:${ministry.contactPhone}`}
                  className="hover:text-blue-900 transition-colors"
                >
                  {ministry.contactPhone}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onJoin}
            className="flex-1 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Join Ministry
          </button>
          <button
            onClick={onVolunteer}
            className="flex-1 border border-blue-900 hover:bg-blue-50 text-blue-900 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Volunteer
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 text-center">
            Join us in making a difference through this ministry. All are welcome!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MinistrySection;
