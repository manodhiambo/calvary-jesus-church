import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, MapPin, Users, Bell, Share2, Heart, Check, X } from 'lucide-react';

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
  isDynamic?: boolean;
}

interface Registration {
  eventId: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
}

// Christian calendar calculator
const getEasterDate = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = Math.floor((h + l - 7 * m + 114) / 31);
  const p = (h + l - 7 * m + 114) % 31;
  return new Date(year, n - 1, p + 1);
};

const getChristianHolidays = (year: number) => {
  const easter = getEasterDate(year);
  const holidays = [
    {
      name: "New Year's Day Service",
      date: new Date(year, 0, 1),
      description: "Begin the year with prayer and worship as we commit our ways to the Lord.",
      category: 'special' as const,
      featured: true
    },
    {
      name: "Epiphany Sunday",
      date: new Date(year, 0, 6),
      description: "Celebrate the manifestation of Christ to the world and the visit of the Magi.",
      category: 'special' as const,
      featured: false
    },
    {
      name: "Ash Wednesday Service",
      date: new Date(easter.getTime() - 46 * 24 * 60 * 60 * 1000),
      description: "Begin the Lenten season with repentance and reflection on Christ's sacrifice.",
      category: 'special' as const,
      featured: true
    },
    {
      name: "Palm Sunday",
      date: new Date(easter.getTime() - 7 * 24 * 60 * 60 * 1000),
      description: "Commemorate Jesus' triumphal entry into Jerusalem with worship and celebration.",
      category: 'special' as const,
      featured: true
    },
    {
      name: "Good Friday Service",
      date: new Date(easter.getTime() - 2 * 24 * 60 * 60 * 1000),
      description: "Reflect on the crucifixion of Jesus Christ and His ultimate sacrifice for our sins.",
      category: 'special' as const,
      featured: true
    },
    {
      name: "Easter Sunday Celebration",
      date: easter,
      description: "Rejoice in the resurrection of Jesus Christ! Join us for this most holy celebration.",
      category: 'special' as const,
      featured: true
    },
    {
      name: "Ascension Day",
      date: new Date(easter.getTime() + 39 * 24 * 60 * 60 * 1000),
      description: "Celebrate Christ's ascension into heaven and His promise to return.",
      category: 'special' as const,
      featured: false
    },
    {
      name: "Pentecost Sunday",
      date: new Date(easter.getTime() + 49 * 24 * 60 * 60 * 1000),
      description: "Commemorate the coming of the Holy Spirit and the birth of the Church.",
      category: 'special' as const,
      featured: true
    },
    {
      name: "Reformation Day",
      date: new Date(year, 9, 31),
      description: "Remember the Protestant Reformation and our commitment to Scripture alone.",
      category: 'special' as const,
      featured: false
    },
    {
      name: "All Saints' Day",
      date: new Date(year, 10, 1),
      description: "Honor the saints who have gone before us and our hope in eternal life.",
      category: 'special' as const,
      featured: false
    },
    {
      name: "First Sunday of Advent",
      date: getFirstAdventSunday(year),
      description: "Begin the Advent season as we prepare our hearts for the coming of Christ.",
      category: 'special' as const,
      featured: true
    },
    {
      name: "Christmas Eve Service",
      date: new Date(year, 11, 24),
      description: "Join us for a special Christmas Eve service celebrating the birth of our Savior.",
      category: 'special' as const,
      featured: true
    },
    {
      name: "Christmas Day Service",
      date: new Date(year, 11, 25),
      description: "Celebrate the birth of Jesus Christ with worship, carols, and fellowship.",
      category: 'special' as const,
      featured: true
    }
  ];

  return holidays.filter(holiday => holiday.date >= new Date());
};

const getFirstAdventSunday = (year: number): Date => {
  const christmas = new Date(year, 11, 25);
  const dayOfWeek = christmas.getDay();
  const daysToSunday = (dayOfWeek === 0) ? 0 : 7 - dayOfWeek;
  const fourthAdvent = new Date(christmas.getTime() + daysToSunday * 24 * 60 * 60 * 1000);
  return new Date(fourthAdvent.getTime() - 21 * 24 * 60 * 60 * 1000);
};

const getNextSundays = (count: number = 8): Date[] => {
  const sundays: Date[] = [];
  const today = new Date();
  const currentDay = today.getDay();
  
  // Calculate next Sunday (0 = Sunday)
  const daysUntilSunday = currentDay === 0 ? 7 : 7 - currentDay;
  const nextSunday = new Date(today.getTime() + daysUntilSunday * 24 * 60 * 60 * 1000);
  
  for (let i = 0; i < count; i++) {
    const sunday = new Date(nextSunday.getTime() + i * 7 * 24 * 60 * 60 * 1000);
    sundays.push(sunday);
  }
  
  return sundays;
};

const categoryColors = {
  worship: 'bg-blue-100 text-blue-800 border-blue-200',
  ministry: 'bg-green-100 text-green-800 border-green-200',
  outreach: 'bg-purple-100 text-purple-800 border-purple-200',
  special: 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

const EventCard: React.FC<{ 
  event: UpcomingEvent; 
  featured?: boolean;
  registrations: Registration[];
  onRegister: (eventId: string, registration: Omit<Registration, 'eventId' | 'registrationDate'>) => void;
  onRSVP: (eventId: string) => void;
  rsvpList: string[];
}> = ({ event, featured = false, registrations, onRegister, onRSVP, rsvpList }) => {
  const [showRSVP, setShowRSVP] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isRegistered = registrations.some(r => r.eventId === event.id);
  const isRSVPd = rsvpList.includes(event.id);
  const daysUntil = Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onRegister(event.id, formData);
    setIsSubmitting(false);
    setShowRSVP(false);
    setShowSuccess(true);
    setFormData({ name: '', email: '', phone: '' });
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleRSVP = () => {
    onRSVP(event.id);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${featured ? 'ring-2 ring-yellow-400' : ''}`}>
      {featured && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-center py-2 font-semibold">
          ⭐ Featured Event
        </div>
      )}
      
      <div className="relative h-48 bg-cjc-navy">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute top-4 left-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[event.category]} bg-opacity-90`}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg p-2 text-center">
          <div className="text-2xl font-bold text-cjc-navy">{new Date(event.date).getDate()}</div>
          <div className="text-xs text-cjc-navy uppercase">
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
          </div>
        </div>
        {daysUntil <= 7 && daysUntil >= 0 && (
          <div className="absolute bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold font-heading text-cjc-navy mb-3">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-cjc-gold" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-cjc-gold" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-cjc-gold" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2 text-cjc-gold" />
            <span>{event.attendees}/{event.maxAttendees} registered</span>
            <div className="ml-2 bg-gray-200 rounded-full h-2 flex-1 max-w-20">
              <div 
                className="bg-cjc-gold h-2 rounded-full transition-all duration-300"
                style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {event.speaker && (
            <div className="flex items-center text-gray-600">
              <Heart className="w-4 h-4 mr-2 text-cjc-gold" />
              <span>Speaker: {event.speaker}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
        
        {showSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 rounded-lg flex items-center">
            <Check className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800">Registration successful!</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 justify-between items-center">
          {event.registrationRequired ? (
            <>
              {!isRegistered ? (
                <button 
                  onClick={() => setShowRSVP(true)}
                  className="bg-cjc-gold hover:bg-cjc-gold-mid text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  Register Now
                </button>
              ) : (
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold cursor-default flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  Registered
                </button>
              )}
            </>
          ) : (
            <button 
              onClick={handleRSVP}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center ${
                isRSVPd
                  ? 'bg-green-600 text-white'
                  : 'bg-cjc-gold hover:bg-cjc-gold-mid text-white'
              }`}
            >
              {isRSVPd ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  RSVP'd
                </>
              ) : (
                'RSVP'
              )}
            </button>
          )}
          
          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:text-cjc-gold hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-cjc-gold hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {showRSVP && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">Event Registration</h4>
              <button 
                onClick={() => setShowRSVP(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleRegistration}>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Full Name *" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none"
                />
                <input 
                  type="email" 
                  placeholder="Email Address *" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none"
                />
                <div className="flex gap-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email}
                    className="bg-cjc-gold hover:bg-cjc-gold-mid text-white px-4 py-2 rounded font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Registering...
                      </>
                    ) : (
                      'Complete Registration'
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowRSVP(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const UpcomingEventsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [rsvpList, setRsvpList] = useState<string[]>([]);
  const [dbEvents, setDbEvents] = useState<UpcomingEvent[]>([]);

  useEffect(() => {
    fetch('/api/public/events?limit=100')
      .then(r => r.json())
      .then((data: Array<{ id: number; title: string; event_date: string; location?: string; description?: string; category?: string; image_url?: string; is_featured?: boolean }>) => {
        if (!Array.isArray(data)) return;
        const upcoming = data
          .filter(e => new Date(e.event_date) >= new Date())
          .map(e => ({
            id: String(e.id),
            title: e.title,
            date: e.event_date.split('T')[0],
            time: new Date(e.event_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            location: e.location || "Nyaduong' Village",
            description: e.description || '',
            category: (e.category as UpcomingEvent['category']) || 'special',
            image: e.image_url || '/images/events/worship-service.jpg',
            attendees: 0,
            maxAttendees: 150,
            featured: e.is_featured || false,
            registrationRequired: false,
            isDynamic: false,
          }));
        setDbEvents(upcoming);
      })
      .catch(() => {});
  }, []);

  // Static events (keep some original events)
  const staticEvents: UpcomingEvent[] = [
    {
      id: 'community-outreach-1',
      title: 'Community Outreach Program',
      date: '2025-09-03',
      time: '8:00 AM - 4:00 PM',
      location: 'Migori Town Center',
      description: 'Join us as we serve our community through practical love and share the Gospel. We\'ll be providing food, clothing, and spiritual encouragement to those in need.',
      category: 'outreach',
      image: '/images/events/community-outreach.jpg',
      attendees: 25,
      maxAttendees: 40,
      featured: true,
      registrationRequired: true,
      isDynamic: false
    },
    {
      id: 'youth-bible-study-1',
      title: 'Youth Bible Study',
      date: '2025-08-05',
      time: '4:00 PM - 6:00 PM',
      location: 'Youth Hall',
      description: 'Young people ages 13-25 are invited for Bible study, fellowship, and discussion about living faithfully in today\'s world.',
      category: 'ministry',
      image: '/images/events/youth-fellowship.jpg',
      attendees: 18,
      maxAttendees: 30,
      featured: false,
      registrationRequired: false,
      isDynamic: false
    },
    {
      id: 'baptism-sunday-1',
      title: 'Baptism Sunday Celebration',
      date: '2025-09-07',
      time: '10:30 AM - 12:30 PM',
      location: 'Church Courtyard',
      description: 'Join us for a powerful Baptism Sunday as we celebrate new life in Christ. This is a public declaration of faith and a joyful gathering of our church family.',
      category: 'special',
      image: '/images/events/baptism.jpg',
      attendees: 85,
      maxAttendees: 150,
      featured: true,
      speaker: 'Pastor Bruce Germail',
      registrationRequired: true,
      isDynamic: false
    }
  ];

  // Generate dynamic events
  const dynamicEvents = useMemo(() => {
    const events: UpcomingEvent[] = [];
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    
    // Add Christian holidays for current and next year
    const holidays = [
      ...getChristianHolidays(currentYear),
      ...getChristianHolidays(nextYear)
    ];

    holidays.forEach((holiday, index) => {
      events.push({
        id: `holiday-${holiday.name.replace(/\s+/g, '-').toLowerCase()}-${holiday.date.getFullYear()}`,
        title: holiday.name,
        date: holiday.date.toISOString().split('T')[0],
        time: holiday.name.includes('Eve') ? '6:00 PM - 8:00 PM' : '10:00 AM - 12:00 PM',
        location: holiday.name.includes('Outreach') ? 'Community Center' : "Nyaduong' Village next to Nyaduong' Secondary School",
        description: holiday.description,
        category: holiday.category,
        image: `/images/events/${holiday.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        attendees: Math.floor(Math.random() * 100) + 50,
        maxAttendees: holiday.featured ? 200 : 150,
        featured: holiday.featured,
        speaker: holiday.featured ? 'Pastor Bruce Germail' : undefined,
        registrationRequired: holiday.featured,
        isDynamic: true
      });
    });

    // Add Sunday worship services
    const sundays = getNextSundays(12);
    sundays.forEach((sunday, index) => {
      events.push({
        id: `sunday-worship-${sunday.toISOString().split('T')[0]}`,
        title: 'Sunday Worship Service',
        date: sunday.toISOString().split('T')[0],
        time: '9:00 AM - 12:00 PM',
        location: "Nyaduong' Village next to Nyaduong' Secondary School",
        description: 'Join us for a powerful worship service filled with praise, prayer, and expository preaching from God\'s Word. Experience the presence of God as we gather as a community of believers.',
        category: 'worship',
        image: '/images/events/worship-service.jpg',
        attendees: Math.floor(Math.random() * 50) + 70,
        maxAttendees: 150,
        featured: index < 2, // First two Sundays are featured
        speaker: 'Pastor Bruce Germail',
        registrationRequired: false,
        isDynamic: true
      });
    });

    return events;
  }, []);

  // DB events take priority; merge with computed, deduplicate by date+title
  const allEvents = [...dbEvents, ...staticEvents, ...dynamicEvents]
    .filter(event => new Date(event.date) >= new Date())
    .filter((event, idx, arr) =>
      idx === arr.findIndex(e => e.date === event.date && e.title === event.title)
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const filteredEvents = filter === 'all' 
    ? allEvents 
    : allEvents.filter(event => event.category === filter);

  const featuredEvents = filteredEvents.filter(event => event.featured);
  const regularEvents = filteredEvents.filter(event => !event.featured);

  const handleRegistration = (eventId: string, registration: Omit<Registration, 'eventId' | 'registrationDate'>) => {
    const newRegistration: Registration = {
      ...registration,
      eventId,
      registrationDate: new Date().toISOString()
    };
    setRegistrations(prev => [...prev, newRegistration]);
  };

  const handleRSVP = (eventId: string) => {
    setRsvpList(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

  return (
    <main className="min-h-screen bg-cjc-cream">
      {/* Hero Section */}
      <section className="relative py-36 bg-cjc-navy overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-12 h-0.5 bg-cjc-gold mx-auto mb-6" />
            <h1 className="text-4xl font-bold font-heading mb-4 text-white">Upcoming Events</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8 mt-4">
              Don't miss out on these upcoming opportunities to worship, learn, and serve together
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-3xl font-bold">{allEvents.length}</div>
                <div className="text-gray-200">Total Events</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-3xl font-bold">{featuredEvents.length}</div>
                <div className="text-gray-200">Featured Events</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-3xl font-bold">{registrations.length}</div>
                <div className="text-gray-200">Your Registrations</div>
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
                    ? 'bg-cjc-navy text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                {category !== 'all' && (
                  <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                    {allEvents.filter(e => e.category === category).length}
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
            <h2 className="text-3xl font-bold font-heading text-cjc-navy mb-8 text-center">Featured Events</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  featured={true}
                  registrations={registrations}
                  onRegister={handleRegistration}
                  onRSVP={handleRSVP}
                  rsvpList={rsvpList}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Events */}
      {regularEvents.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-heading text-cjc-navy mb-8 text-center">All Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event}
                  registrations={registrations}
                  onRegister={handleRegistration}
                  onRSVP={handleRSVP}
                  rsvpList={rsvpList}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="py-16 bg-cjc-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-heading mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive notifications about new events and church announcements
          </p>
          <div className="flex flex-col sm:fleow gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <button className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
  </main>
  );
};

export default UpcomingEventsPage;
