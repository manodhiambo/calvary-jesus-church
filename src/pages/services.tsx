import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SermonCard from '@/components/SermonCard';
import { Clock, MapPin, Calendar, Play, Search, Filter, Users, BookOpen } from 'lucide-react';

export default function Services() {
  const [activeTab, setActiveTab] = useState('times');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeries, setFilterSeries] = useState('all');

  const serviceLocations = [
    {
      name: "Morning Service",
      time: "9:00 AM - 12:00 PM",
      day: "Sunday",
      location: "Nyaduong' Village",
      address: "Next to Nyaduong' Secondary and Primary Schools",
      description: "Our main worship service featuring expository Bible teaching, congregational singing, and fellowship.",
      image: "/images/services/morning-service.jpg"
    },
  ];

  const specialEvents = [
    {
      title: "Christmas Service",
      date: "December 25, 2024",
      time: "10:00 AM",
      location: "Both Locations",
      description: "Celebrate the birth of our Savior Jesus Christ with special music and message.",
      image: "/images/events/christmas-service.jpg"
    },
    {
      title: "Easter Service",
      date: "March 31, 2024", 
      time: "9:00 AM",
      location: "Nyaduong' Village",
      description: "Rejoice in the resurrection of Jesus Christ with communion and baptisms.",
      image: "/images/events/easter-service.jpg"
    },
    {
      title: "Baptism Service",
      date: "First Sunday of Each Month",
      time: "After Morning Service",
      location: "Nyaduong' Village",
      description: "Public declaration of faith through water baptism for new believers.",
      image: "/images/events/baptism.jpg"
    }
  ];

  const sermonSeries = [
    { id: 'all', name: 'All Sermons' },
    { id: 'romans', name: 'Romans' },
    { id: 'genesis', name: 'Genesis' },
    { id: 'psalms', name: 'Psalms' },
    { id: 'gospel', name: 'Gospel of John' },
    { id: 'doctrine', name: 'Christian Doctrine' }
  ];

  const sermonArchive = [
    {
      title: "The Authority of Scripture",
      speaker: "Pastor Bruce",
      date: "2024-01-21",
      series: "doctrine",
      description: "Understanding why the Bible is our sole authority for faith and practice.",
      videoUrl: "https://youtube.com/watch?v=example1",
      thumbnail: "/images/sermons/thumbnails/sermon-1.jpg"
    },
    {
      title: "Justification by Faith Alone",
      speaker: "Pastor Bruce", 
      date: "2024-01-14",
      series: "romans",
      description: "Exploring Romans 3:21-31 and the doctrine of justification.",
      videoUrl: "https://youtube.com/watch?v=example2",
      thumbnail: "/images/sermons/thumbnails/sermon-2.jpg"
    },
    {
      title: "The Sufficiency of Scripture",
      speaker: "Pastor Bruce",
      date: "2024-01-07",
      series: "doctrine",
      description: "Why Scripture is complete and sufficient for all matters of faith and practice.",
      videoUrl: "https://youtube.com/watch?v=example3",
      thumbnail: "/images/sermons/thumbnails/sermon-3.jpg"
    },
    {
      title: "In the Beginning God",
      speaker: "Pastor Bruce",
      date: "2023-12-31",
      series: "genesis",
      description: "Starting our journey through Genesis 1:1 and God's creative work.",
      videoUrl: "https://youtube.com/watch?v=example4",
      thumbnail: "/images/sermons/thumbnails/sermon-4.jpg"
    },
    {
      title: "The Lord is My Shepherd",
      speaker: "Pastor Bruce",
      date: "2023-12-24",
      series: "psalms",
      description: "Finding comfort and guidance in Psalm 23.",
      videoUrl: "https://youtube.com/watch?v=example5",
      thumbnail: "/images/sermons/thumbnails/sermon-5.jpg"
    },
    {
      title: "In the Beginning Was the Word",
      speaker: "Pastor Bruce",
      date: "2023-12-17",
      series: "gospel",
      description: "The deity of Christ revealed in John 1:1-14.",
      videoUrl: "https://youtube.com/watch?v=example6",
      thumbnail: "/images/sermons/thumbnails/sermon-6.jpg"
    }
  ];

  const filteredSermons = sermonArchive.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeries = filterSeries === 'all' || sermon.series === filterSeries;
    return matchesSearch && matchesSeries;
  });

  return (
    <>
      <Head>
        <title>Services - Calvary Jesus Church</title>
        <meta name="description" content="Join us for worship services at Calvary Jesus Church. Sunday services at 9 AM and 2 PM. View our sermon archive and special events." />
        <meta name="keywords" content="church services, worship, sermons, Bible teaching, Migori church services" />
      </Head>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="absolute inset-0 bg-black/30"></div>
          <img
            src="/images/services/worship-service.jpg"
            alt="Church Services"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Join us as we worship together and study God's Word
            </p>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6">
            <nav className="flex space-x-8">
              {[
                { id: 'times', label: 'Service Times', icon: Clock },
                { id: 'online', label: 'Online Services', icon: Play },
                { id: 'special-events', label: 'Special Events', icon: Calendar },
                { id: 'archive', label: 'Sermon Archive', icon: BookOpen }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === id
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* Service Times Tab */}
        {activeTab === 'times' && (
          <section id="times" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Service Times
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  We have two service locations to serve you better. Both services feature 
                  expository Bible teaching and congregational worship.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {serviceLocations.map((service, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.name}</h3>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-slate-600">
                          <Calendar className="w-5 h-5 text-amber-500 mr-3" />
                          <span>{service.day}</span>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Clock className="w-5 h-5 text-amber-500 mr-3" />
                          <span>{service.time}</span>
                        </div>
                        <div className="flex items-start text-slate-600">
                          <MapPin className="w-5 h-5 text-amber-500 mr-3 mt-1" />
                          <div>
                            <div className="font-semibold">{service.location}</div>
                            <div className="text-sm">{service.address}</div>
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-600 mb-6">{service.description}</p>
                      <Link href="/contact" className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                        Get Directions
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <div className="bg-slate-900 text-white p-8 rounded-lg max-w-4xl mx-auto">
                  <Users className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">What to Expect</h3>
                  <p className="text-slate-300 mb-6">
                    Our services focus on expository Bible teaching, where we go through Scripture 
                    verse by verse. We believe in congregational singing, prayer, and creating an 
                    atmosphere where God's Word can transform lives.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <BookOpen className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                      <h4 className="font-semibold">Bible Teaching</h4>
                      <p className="text-sm text-slate-400">Verse by verse exposition</p>
                    </div>
                    <div>
                      <Users className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                      <h4 className="font-semibold">Fellowship</h4>
                      <p className="text-sm text-slate-400">Community and connection</p>
                    </div>
                    <div>
                      <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                      <h4 className="font-semibold">Worship</h4>
                      <p className="text-sm text-slate-400">Singing and prayer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Online Services Tab */}
        {activeTab === 'online' && (
          <section id="online" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Online Services
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Can't make it to our physical location? Join us online for live streaming 
                  of our services and access to our sermon archive.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                {/* Live Stream Section */}
                <div className="bg-slate-900 rounded-lg p-8 mb-12">
                  <div className="text-center text-white mb-8">
                    <Play className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold mb-4">Live Stream</h3>
                    <p className="text-slate-300">
                      Join us live every Sunday for our worship services
                    </p>
                  </div>

                  {/* YouTube Embed Placeholder */}
                  <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center text-white">
                      <Play className="w-24 h-24 text-amber-500 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold mb-2">Live Stream Coming Soon</h4>
                      <p className="text-slate-400">
                        We're working on bringing you live streaming services
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 text-white">
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                      <h4 className="font-semibold">Morning Service</h4>
                      <p className="text-slate-400">Sunday 9:00 AM - 12:00 PM</p>
                    </div>
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                      <h4 className="font-semibold">Afternoon Service</h4>
                      <p className="text-slate-400">Sunday 2:00 PM - 4:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* How to Join Online */}
                <div className="bg-slate-50 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                    How to Join Online
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                        1
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-2">Visit Our Page</h4>
                      <p className="text-slate-600 text-sm">
                        Go to our Facebook page or YouTube channel
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                        2
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-2">Click Live Stream</h4>
                      <p className="text-slate-600 text-sm">
                        Look for the live video during service times
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                        3
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-2">Join & Interact</h4>
                      <p className="text-slate-600 text-sm">
                        Participate in the chat and feel connected
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Special Events Tab */}
        {activeTab === 'special-events' && (
          <section id="special-events" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Special Events
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Throughout the year, we hold special services and events to celebrate 
                  important moments in our faith journey.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {specialEvents.map((event, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{event.title}</h3>
                      <div className="space-y-2 mb-4 text-sm text-slate-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-amber-500 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-amber-500 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-amber-500 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <Link href="/events" className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors">
                  View All Events
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Sermon Archive Tab */}
        {activeTab === 'archive' && (
          <section id="archive" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Sermon Archive
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Catch up on past sermons or revisit your favorites. All our teachings 
                  are archived here for your continued study and growth.
                </p>
              </div>

              {/* Search and Filter */}
              <div className="mb-12 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search sermons..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <select
                      value={filterSeries}
                      onChange={(e) => setFilterSeries(e.target.value)}
                      className="pl-10 pr-8 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                    >
                      {sermonSeries.map((series) => (
                        <option key={series.id} value={series.id}>
                          {series.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Sermon Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSermons.map((sermon, index) => (
                  <SermonCard key={index} sermon={sermon} />
                ))}
              </div>

              {filteredSermons.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-600 mb-2">No sermons found</h3>
                  <p className="text-slate-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Us This Sunday
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Experience worship, fellowship, and Bible teaching that will strengthen your faith
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Plan Your Visit
              </Link>
              <Link href="/resources/prayer" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Prayer Request
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
