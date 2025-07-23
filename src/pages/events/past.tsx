import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Eye, Download, Play } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PastEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'worship' | 'ministry' | 'outreach' | 'special';
  image: string;
  attendees: number;
  highlights: string[];
  gallery?: string[];
  videoUrl?: string;
  audioUrl?: string;
  downloads?: { name: string; url: string; type: 'pdf' | 'audio' | 'video' }[];
}

const pastEvents: PastEvent[] = [
  {
    id: '1',
    title: 'Easter Celebration Service',
    date: '2024-03-31',
    time: '9:00 AM - 12:00 PM',
    location: "Nyaduong' Village",
    description: 'A glorious celebration of Christ\'s resurrection with special music, testimonies, and powerful preaching about the victory we have in Jesus.',
    category: 'special',
    image: '/images/events/easter-service.jpg',
    attendees: 180,
    highlights: [
      'Baptism of 12 new believers',
      'Special choir performance',
      'Community lunch for 200+ people',
      'Children\'s Easter program'
    ],
    gallery: [
      '/images/gallery/easter-1.jpg',
      '/images/gallery/easter-2.jpg',
      '/images/gallery/easter-3.jpg'
    ],
    videoUrl: 'https://youtube.com/watch?v=example',
    audioUrl: 'https://example.com/easter-sermon.mp3',
    downloads: [
      { name: 'Easter Service Bulletin', url: '/downloads/easter-bulletin.pdf', type: 'pdf' },
      { name: 'Sermon Audio', url: '/downloads/easter-sermon.mp3', type: 'audio' }
    ]
  },
  {
    id: '2',
    title: 'Youth Conference 2024',
    date: '2024-02-15',
    time: '9:00 AM - 6:00 PM',
    location: 'Church Hall',
    description: 'A day-long conference for young people focusing on "Living for Christ in a Digital Age" with workshops, fellowship, and inspiring messages.',
    category: 'ministry',
    image: '/images/events/youth-conference.jpg',
    attendees: 65,
    highlights: [
      '4 workshop sessions',
      'Interactive Q&A with church leaders',
      'Praise and worship by youth band',
      'Commitment ceremony'
    ],
    gallery: [
      '/images/gallery/youth-conf-1.jpg',
      '/images/gallery/youth-conf-2.jpg'
    ],
    downloads: [
      { name: 'Conference Materials', url: '/downloads/youth-conf-materials.pdf', type: 'pdf' }
    ]
  },
  {
    id: '3',
    title: 'Community Food Drive',
    date: '2024-01-20',
    time: '8:00 AM - 4:00 PM',
    location: 'Migori Town Center',
    description: 'Outreach event providing food packages and basic necessities to 150 families in need while sharing the love of Christ.',
    category: 'outreach',
    image: '/images/events/food-drive.jpg',
    attendees: 45,
    highlights: [
      '150 families served',
      '2 tons of food distributed',
      '25 Gospel presentations',
      'Medical check-ups provided'
    ],
    gallery: [
      '/images/gallery/food-drive-1.jpg',
      '/images/gallery/food-drive-2.jpg',
      '/images/gallery/food-drive-3.jpg'
    ]
  },
  {
    id: '4',
    title: 'Christmas Eve Service',
    date: '2023-12-24',
    time: '7:00 PM - 9:00 PM',
    location: "Nyaduong' Village",
    description: 'A beautiful candlelight service celebrating the birth of our Savior with carols, scripture readings, and reflection on God\'s greatest gift.',
    category: 'worship',
    image: '/images/events/christmas-service.jpg',
    attendees: 120,
    highlights: [
      'Candlelight ceremony',
      'Children\'s nativity play',
      'Traditional Christmas carols',
      'Community gift exchange'
    ],
    videoUrl: 'https://youtube.com/watch?v=christmas-example',
    audioUrl: 'https://example.com/christmas-sermon.mp3'
  },
  {
    id: '5',
    title: 'Bible Study Marathon',
    date: '2023-11-18',
    time: '9:00 AM - 5:00 PM',
    location: 'Church Hall',
    description: 'Intensive Bible study covering the Book of Romans with detailed verse-by-verse exposition and group discussions.',
    category: 'ministry',
    image: '/images/events/bible-marathon.jpg',
    attendees: 38,
    highlights: [
      '8 hours of Bible study',
      'Covered Romans chapters 1-8',
      'Small group discussions',
      'Q&A sessions'
    ],
    downloads: [
      { name: 'Romans Study Guide', url: '/downloads/romans-study.pdf', type: 'pdf' },
      { name: 'Session Recordings', url: '/downloads/romans-audio.zip', type: 'audio' }
    ]
  }
];

const categoryColors = {
  worship: 'bg-blue-100 text-blue-800 border-blue-200',
  ministry: 'bg-green-100 text-green-800 border-green-200',
  outreach: 'bg-purple-100 text-purple-800 border-purple-200',
  special: 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

const PastEventCard: React.FC<{ event: PastEvent }> = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
        
        {event.videoUrl && (
          <div className="absolute bottom-4 right-4">
            <button className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
              <Play className="w-4 h-4" />
            </button>
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
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2 text-navy-600" />
            <span>{event.attendees} attended</span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-2">{event.description}</p>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="bg-navy-900 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition-colors font-semibold flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
          
          <div className="flex space-x-2">
            {event.videoUrl && (
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Watch Video">
                <Play className="w-4 h-4" />
              </button>
            )}
            {event.downloads && (
              <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Downloads">
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Expanded Details */}
        {showDetails && (
          <div className="mt-6 border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Event Highlights</h4>
            <ul className="space-y-2 mb-4">
              {event.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-navy-600 mr-2">•</span>
                  <span className="text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
            
            {/* Gallery Preview */}
            {event.gallery && (
              <div className="mb-4">
                <h5 className="font-semibold text-gray-900 mb-2">Photo Gallery</h5>
                <div className="flex space-x-2 overflow-x-auto">
                  {event.gallery.slice(0, 3).map((photo, index) => (
                    <div key={index} className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg"></div>
                  ))}
                  {event.gallery.length > 3 && (
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 text-sm">
                      +{event.gallery.length - 3}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Downloads */}
            {event.downloads && (
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Available Downloads</h5>
                <div className="space-y-2">
                  {event.downloads.map((download, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm text-gray-700">{download.name}</span>
                      <button className="text-navy-600 hover:text-navy-800 text-sm font-medium">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const PastEventsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date-desc');

  let filteredEvents = filter === 'all' 
    ? pastEvents 
    : pastEvents.filter(event => event.category === filter);

  // Sort events
  filteredEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'date-desc') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'date-asc') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'attendees') {
      return b.attendees - a.attendees;
    }
    return 0;
  });

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Past Events</h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
                Relive the memorable moments and see how God has been working in our church community
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-3xl font-bold">{pastEvents.length}</div>
                  <div className="text-gray-200">Events Completed</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-3xl font-bold">
                    {pastEvents.reduce((sum, event) => sum + event.attendees, 0)}
                  </div>
                  <div className="text-gray-200">Total Attendees</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-3xl font-bold">
                    {pastEvents.filter(event => event.videoUrl || event.audioUrl).length}
                  </div>
                  <div className="text-gray-200">Recorded Events</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter and Sort Section */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {['all', 'worship', 'ministry', 'outreach', 'special'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                      filter === category
                        ? 'bg-navy-900 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
              
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 font-medium">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="attendees">Most Attended</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <PastEventCard key={event.id} event={event} />
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more events.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default PastEventsPage;
