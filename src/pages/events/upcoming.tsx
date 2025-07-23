import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Bell, Share2, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'worship' | 'ministry' | 'outreach' | 'special';
  image: string;
  attendees: number;
  maxAttendees: number;
  featured: boolean;
  speaker?: string;
  registrationRequired: boolean;
}

const upcomingEvents: UpcomingEvent[] = [
  {
    id: '1',
    title: 'Sunday Worship Service',
    date: '2024-07-28',
    time: '9:00 AM - 12:00 PM',
    location: "Nyaduong' Village next to Nyaduong' Secondary School",
    description: 'Join us for a powerful worship service filled with praise, prayer, and expository preaching from God\'s Word. Experience the presence of God as we gather as a community of believers.',
    category: 'worship',
    image: '/images/events/worship-service.jpg',
    attendees: 85,
    maxAttendees: 150,
    featured: true,
    speaker: 'Pastor Bruce',
    registrationRequired: false
  },
  {
    id: '2',
    title: 'Midweek Bible Study',
    date: '2024-07-30',
    time: '6:00 PM - 8:00 PM',
    location: 'Church Hall',
    description: 'Deep dive into Scripture with verse-by-verse exposition. Bring your Bible and notebook as we study God\'s Word together and grow in biblical understanding.',
    category: 'ministry',
    image: '/images/events/bible-study.jpg',
    attendees: 32,
    maxAttendees: 50,
    featured: false,
    speaker: 'Pastor Bruce',
    registrationRequired: false
  },
  {
    id: '3',
    title: 'Community Outreach Program',
    date: '2024-08-03',
    time: '8:00 AM - 4:00 PM',
    location: 'Migori Town Center',
    description: 'Join us as we serve our community through practical love and share the Gospel. We\'ll be providing food, clothing, and spiritual encouragement to those in need.',
    category: 'outreach',
    image: '/images/events/community-outreach.jpg',
    attendees: 25,
    maxAttendees: 40,
    featured: true,
    registrationRequired: true
  },
  {
    id: '4',
    title: 'Youth Bible Study',
    date: '2024-08-05',
    time: '4:00 PM - 6:00 PM',
    location: 'Youth Hall',
    description: 'Young people ages 13-25 are invited for Bible study, fellowship, and discussion about living faithfully in today\'s world.',
    category: 'ministry',
    image: '/images/events/youth-fellowship.jpg',
    attendees: 18,
    maxAttendees: 30,
    featured: false,
    registrationRequired: false
  },
  {
    id: '5',
    title: 'Annual Church Conference',
    date: '2024-08-15',
    time: '9:00 AM - 5:00 PM',
    location: 'Main Sanctuary',
    description: 'A special day of spiritual renewal, biblical teaching, and fellowship. Guest speakers will join us for this significant church event.',
    category: 'special',
    image: '/images/events/conference.jpg',
    attendees: 120,
    maxAttendees: 200,
    featured: true,
    speaker: 'Pastor Bruce & Guest Speakers',
    registrationRequired: true
  }
];

const categoryColors = {
  worship: 'bg-blue-100 text-blue-800 border-blue-200',
  ministry: 'bg-green-100 text-green-800 border-green-200',
  outreach: 'bg-purple-100 text-purple-800 border-purple-200',
  special: 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

const EventCard: React.FC<{ event: UpcomingEvent; featured?: boolean }> = ({ event, featured = false }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRSVP, setShowRSVP] = useState(false);

  const daysUntil = Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${featured ? 'ring-2 ring-yellow-400' : ''}`}>
      {featured && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-center py-2 font-semibold">
          ⭐ Featured Event
        </div>
      )}
      
      <div className="relative h-48 bg-gradient-to-r from-navy-900 to-navy-700">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute top-4 left-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[event.category]} bg-opacity-90`}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg p-2 text-center">
          <div className="text-2xl font-bold text-navy-900">{new Date(event.date).getDate()}</div>
          <div className="text-xs text-navy-700 uppercase">
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
          </div>
        </div>
        {daysUntil <= 7 && (
          <div className="absolute bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-navy-600" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-navy-600" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-navy-600" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          
                      <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2 text-navy-600" />
            <span>{event.attendees}/{event.maxAttendees} registered</span>
            <div className="ml-2 bg-gray-200 rounded-full h-2 flex-1 max-w-20">
              <div 
                className="bg-navy-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {event.speaker && (
            <div className="flex items-center text-gray-600">
              <Heart className="w-4 h-4 mr-2 text-navy-600" />
              <span>Speaker: {event.speaker}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
        
        <div className="flex flex-wrap gap-2 justify-between items-center">
          {event.registrationRequired ? (
            <>
              {!isRegistered ? (
                <button 
                  onClick={() => setShowRSVP(true)}
                  className="bg-navy-900 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition-colors font-semibold"
                >
                  Register Now
                </button>
              ) : (
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold cursor-default">
                  ✓ Registered
                </button>
              )}
            </>
          ) : (
            <button 
              onClick={() => setIsRegistered(!isRegistered)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isRegistered 
                  ? 'bg-green-600 text-white' 
                  : 'bg-navy-900 text-white hover:bg-navy-800'
              }`}
            >
              {isRegistered ? '✓ RSVP\'d' : 'RSVP'}
            </button>
          )}
          
          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:text-navy-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-navy-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {showRSVP && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Event Registration</h4>
            <div className="space-y-2">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setIsRegistered(true);
                    setShowRSVP(false);
                  }}
                  className="bg-navy-900 text-white px-4 py-2 rounded font-semibold hover:bg-navy-800 transition-colors"
                >
                  Complete Registration
                </button>
                <button 
                  onClick={() => setShowRSVP(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const UpcomingEventsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredEvents = filter === 'all' 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.category === filter);

  const featuredEvents = filteredEvents.filter(event => event.featured);
  const regularEvents = filteredEvents.filter(event => !event.featured);

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
                Don't miss out on these upcoming opportunities to worship, learn, and serve together
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-3xl font-bold">{upcomingEvents.length}</div>
                  <div className="text-gray-200">Events This Month</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-3xl font-bold">{featuredEvents.length}</div>
                  <div className="text-gray-200">Featured Events</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-3xl font-bold">
                    {upcomingEvents.reduce((sum, event) => sum + event.attendees, 0)}
                  </div>
                  <div className="text-gray-200">Total Registrations</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {['all', 'worship', 'ministry', 'outreach', 'special'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                    filter === category
                      ? 'bg-navy-900 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  {category !== 'all' && (
                    <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                      {upcomingEvents.filter(e => e.category === category).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Events</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredEvents.map((event) => (
                  <EventCard key={event.id} event={event} featured={true} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular Events */}
        {regularEvents.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Signup */}
        <section className="py-16 bg-navy-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive notifications about new events and church announcements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              <button className="bg-yellow-500 text-navy-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default UpcomingEventsPage;
