import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'worship' | 'ministry' | 'outreach' | 'special';
  image: string;
  attendees?: number;
  maxAttendees?: number;
  isUpcoming: boolean;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Sunday Worship Service',
    date: '2025-07-27',
    time: '9:00 AM - 12:00 PM',
    location: "Nyaduong' Village",
    description: 'Join us for worship, prayer, and biblical teaching as we gather to honor God.',
    category: 'worship',
    image: '/images/events/worship-service.jpg',
    attendees: 85,
    maxAttendees: 150,
    isUpcoming: true
  },
  {
    id: '2',
    title: 'Bible Study Fellowship',
    date: '2025-07-30',
    time: '6:00 PM - 8:00 PM',
    location: 'Church Hall',
    description: 'Deep dive into Scripture with expository teaching and group discussion.',
    category: 'ministry',
    image: '/images/events/bible-study.jpg',
    attendees: 32,
    maxAttendees: 50,
    isUpcoming: true
  },
  {
    id: '3',
    title: 'Community Outreach Program',
    date: '2025-08-03',
    time: '8:00 AM - 4:00 PM',
    location: 'Migori Town Center',
    description: 'Serving our community through practical love and sharing the Gospel.',
    category: 'outreach',
    image: '/images/events/community-outreach.jpg',
    attendees: 25,
    maxAttendees: 40,
    isUpcoming: true
  },
  {
    id: '4',
    title: 'Annual Church Conference',
    date: '2025-12-07',
    time: '9:00 AM - 5:00 PM',
    location: 'Main Sanctuary',
    description: 'A day of spiritual renewal, teaching, and fellowship with guest speakers.',
    category: 'special',
    image: '/images/events/conference.jpg',
    attendees: 120,
    maxAttendees: 200,
    isUpcoming: true
  }
];

const categoryColors = {
  worship: 'bg-blue-100 text-blue-800',
  ministry: 'bg-green-100 text-green-800',
  outreach: 'bg-purple-100 text-purple-800',
  special: 'bg-yellow-100 text-yellow-800'
};

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 bg-gradient-to-r from-navy-900 to-navy-700">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${categoryColors[event.category]} bg-opacity-90`}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          
          {event.attendees && event.maxAttendees && (
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{event.attendees}/{event.maxAttendees} attending</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex justify-between items-center">
          <button className="bg-navy-900 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition-colors">
            RSVP
          </button>
          <button className="text-navy-900 hover:text-navy-700 font-medium flex items-center">
            Learn More <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const EventsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredEvents = selectedCategory === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => event.category === selectedCategory);

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6">Church Events</h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                Join us as we gather to worship, learn, and serve together. 
                Discover upcoming events and be part of our church community.
              </p>
              
              {/* Quick Navigation */}
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/events/upcoming" className="bg-white text-navy-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Upcoming Events
                </Link>
                <Link href="/events/calendar" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-navy-900 transition-colors">
                  View Calendar
                </Link>
                <Link href="/events/past" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-navy-900 transition-colors">
                  Past Events
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Events Listing */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Filter Section */}
            <div className="flex flex-wrap items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
              
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="worship">Worship</option>
                  <option value="ministry">Ministry</option>
                  <option value="outreach">Outreach</option>
                  <option value="special">Special Events</option>
                </select>
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Want to Stay Updated?
                </h3>
                <p className="text-gray-700 mb-6">
                  Subscribe to our newsletter to receive notifications about upcoming events and church announcements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <input 
                    type="email" 
                    placeholder="Enter your email address"
                    className="flex-1 max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  />
                  <button className="bg-navy-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-navy-800 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default EventsPage;
