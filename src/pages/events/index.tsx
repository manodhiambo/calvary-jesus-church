import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Filter, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'service' | 'ministry' | 'special' | 'community';
  image?: string;
  featured?: boolean;
}

const EventsIndex = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // Sample events data
  const events: Event[] = [
    {
      id: '1',
      title: 'Sunday Morning Service',
      description: 'Join us for our weekly Sunday worship service with Bible teaching and fellowship.',
      date: '2025-07-20',
      time: '9:00 AM - 12:00 PM',
      location: 'Nyaduong\' Village',
      category: 'service',
      featured: true
    },
    {
      id: '2',
      title: 'Sunday Afternoon Service',
      description: 'Our second Sunday service for those who cannot attend the morning session.',
      date: '2025-07-20',
      time: '2:00 PM - 4:00 PM',
      location: 'Oruba, Migori Town (Dip Primary School)',
      category: 'service',
      featured: true
    },
    {
      id: '3',
      title: 'Bible Study Fellowship',
      description: 'Deep dive into God\'s word with fellow believers. Studying verse by verse.',
      date: '2025-07-23',
      time: '6:00 PM - 8:00 PM',
      location: 'Church Hall',
      category: 'ministry'
    },
    {
      id: '4',
      title: 'Youth Ministry Meeting',
      description: 'Young people gathering for worship, teaching, and fellowship.',
      date: '2025-07-25',
      time: '5:00 PM - 7:00 PM',
      location: 'Youth Hall',
      category: 'ministry'
    },
    {
      id: '5',
      title: 'Prayer and Fasting Day',
      description: 'Special day of prayer and fasting for our church and community.',
      date: '2025-07-27',
      time: '6:00 AM - 6:00 PM',
      location: 'Main Church',
      category: 'special'
    },
    {
      id: '6',
      title: 'Community Outreach',
      description: 'Reaching out to our community with God\'s love and practical help.',
      date: '2025-07-30',
      time: '9:00 AM - 3:00 PM',
      location: 'Migori Town',
      category: 'community'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Events' },
    { value: 'service', label: 'Services' },
    { value: 'ministry', label: 'Ministries' },
    { value: 'special', label: 'Special Events' },
    { value: 'community', label: 'Community' }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'service': return 'bg-blue-100 text-blue-800';
      case 'ministry': return 'bg-green-100 text-green-800';
      case 'special': return 'bg-purple-100 text-purple-800';
      case 'community': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Church Events</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Join us for worship, fellowship, and spiritual growth. Stay connected with all our upcoming events and activities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === 'calendar' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>

        {/* Featured Events */}
        {selectedCategory === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Events</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {events.filter(event => event.featured).map(event => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-blue-600">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events List */}
        {viewMode === 'list' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedCategory === 'all' ? 'All Events' : `${categories.find(c => c.value === selectedCategory)?.label}`}
            </h2>
            <div className="space-y-4">
              {filteredEvents.map(event => (
                <div key={event.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Calendar</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center text-gray-600 py-12">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">Calendar view will be implemented with a calendar library</p>
                <p className="text-sm">For now, please use the list view to see all events</p>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-blue-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
          <p className="text-lg mb-6">
            Never miss an event! Contact us to be added to our notification list.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="tel:+254735464102"
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsIndex;
