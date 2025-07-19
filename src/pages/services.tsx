import React, { useState } from 'react';
import { Clock, MapPin, Play, Calendar, Book, Users, ChevronRight, Filter, Menu, X } from 'lucide-react';

// TypeScript interfaces
interface NavigationLink {
  href: string;
  label: string;
  active?: boolean;
}

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  series: string;
  videoUrl: string;
  description: string;
}

interface ServiceTimeCardProps {
  time: string;
  location: string;
  details: string;
  icon: React.ReactNode;
}

interface SermonCardProps {
  sermon: Sermon;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ServicesPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navigationLinks: NavigationLink[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services', active: true },
    { href: '/ministries', label: 'Ministries' },
    { href: '/events', label: 'Events' },
    { href: '/resources', label: 'Resources' },
    { href: '/give', label: 'Give' },
    { href: '/contact', label: 'Contact' }
  ];
  
  const [activeTab, setActiveTab] = useState<string>('times');
  const [filterSeries, setFilterSeries] = useState<string>('all');

  // Sample sermon data
  const sermons: Sermon[] = [
    {
      id: 1,
      title: "The Authority of Scripture",
      speaker: "Pastor Bruce",
      date: "2024-01-14",
      series: "Biblical Foundations",
      videoUrl: "https://youtube.com/watch?v=example1",
      description: "Understanding why the Bible is our sole source of divine authority."
    },
    {
      id: 2,
      title: "Salvation by Grace Alone",
      speaker: "Pastor Bruce", 
      date: "2024-01-07",
      series: "Gospel Essentials",
      videoUrl: "https://youtube.com/watch?v=example2",
      description: "No good deed from man can justify him before God - only through Christ."
    },
    {
      id: 3,
      title: "The Way to Heaven",
      speaker: "Pastor Bruce",
      date: "2023-12-31",
      series: "Gospel Essentials", 
      videoUrl: "https://youtube.com/watch?v=example3",
      description: "Jesus said: I am the way, and the truth, and the life."
    },
    {
      id: 4,
      title: "Born in Adam - The Reality of Sin",
      speaker: "Pastor Bruce",
      date: "2023-12-24",
      series: "Understanding Sin",
      videoUrl: "https://youtube.com/watch?v=example4",
      description: "All mankind are born sinners by birth through Adam."
    }
  ];

  const seriesList: string[] = ['all', ...new Set(sermons.map(sermon => sermon.series))];
  const filteredSermons: Sermon[] = filterSeries === 'all' ? sermons : sermons.filter(sermon => sermon.series === filterSeries);

  const ServiceTimeCard: React.FC<ServiceTimeCardProps> = ({ time, location, details, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="bg-blue-100 p-3 rounded-full">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{time}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location}</span>
          </div>
          <p className="text-gray-700">{details}</p>
        </div>
      </div>
    </div>
  );

  const SermonCard: React.FC<SermonCardProps> = ({ sermon }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {sermon.series}
          </span>
          <span className="text-sm text-gray-500">{sermon.date}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{sermon.title}</h3>
        <p className="text-gray-600 mb-3">{sermon.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Speaker: {sermon.speaker}</span>
          <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <Play className="w-4 h-4 mr-1" />
            Watch
          </button>
        </div>
      </div>
    </div>
  );

  const tabs: TabItem[] = [
    { id: 'times', label: 'Service Times', icon: Clock },
    { id: 'online', label: 'Online Services', icon: Play },
    { id: 'special', label: 'Special Events', icon: Calendar },
    { id: 'archive', label: 'Sermon Archive', icon: Book }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Book className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Calvary Jesus Church</h1>
                <p className="text-sm text-gray-600">Unleashing God's truth</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    link.active
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      link.active
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-xl opacity-90">Unleashing God's truth one verse at a time</p>
            <p className="text-lg opacity-80 mt-2">Teaching the Bible is our focus</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex space-x-8">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Service Times */}
        {activeTab === 'times' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Sunday Services</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We gather every Sunday to worship together and dive deep into God's Word. 
                All are welcome to join us in person at either of our locations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <ServiceTimeCard
                time="9:00 AM - 12:00 PM"
                location="Nyaduong' Village"
                details="Located next to Nyaduong' Secondary and Primary Schools. Our main worship service with expository preaching."
                icon={<Clock className="w-6 h-6 text-blue-600" />}
              />
              <ServiceTimeCard
                time="2:00 PM - 4:00 PM"
                location="Migori Town - Oruba"
                details="Inside Dip Primary School. Afternoon service for those who can't attend the morning session."
                icon={<Users className="w-6 h-6 text-blue-600" />}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-8 mt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What to Expect</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Biblical Teaching</h4>
                  <p className="text-gray-700">Every service centers on verse-by-verse exposition of Scripture, helping you understand God's Word deeply.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Worship & Prayer</h4>
                  <p className="text-gray-700">We gather to worship God in spirit and truth, and lift up prayers for our community and world.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Fellowship</h4>
                  <p className="text-gray-700">Connect with other believers who share a commitment to biblical truth and Christian growth.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">All Welcome</h4>
                  <p className="text-gray-700">Whether you're a longtime believer or just curious about faith, you'll find a warm welcome here.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Online Services */}
        {activeTab === 'online' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Online Services</h2>
              <p className="text-lg text-gray-600">
                Can't make it to church in person? Join us online for live streaming and recorded services.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Live Stream</h3>
              <p className="text-gray-600 mb-6">
                Join us live every Sunday at 9:00 AM (EAT) for our morning service from Nyaduong' Village.
              </p>
              
              {/* Placeholder for YouTube embed */}
              <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center mb-6">
                <div className="text-center">
                  <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Live stream will appear here during service times</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Next Live Service</p>
                  <p className="text-sm text-gray-600">Sunday at 9:00 AM EAT</p>
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Set Reminder
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Facebook Live</h3>
                <p className="text-gray-600 mb-4">Follow our Facebook page for live streaming and community updates.</p>
                <a 
                  href="https://www.facebook.com/profile.php?id=100064378341874" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Visit Facebook Page
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Missed a Service?</h3>
                <p className="text-gray-600 mb-4">Catch up on recent sermons and teachings in our archive.</p>
                <button 
                  onClick={() => setActiveTab('archive')}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Browse Archive
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Special Events */}
        {activeTab === 'special' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Events</h2>
              <p className="text-lg text-gray-600">
                Join us for special services, baptisms, and seasonal celebrations throughout the year.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-500 h-24"></div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Easter Service</h3>
                  <p className="text-gray-600 mb-4">Celebrate the resurrection of our Lord Jesus Christ with special worship and teaching.</p>
                  <div className="text-sm text-gray-500">
                    <p>Date: March 31, 2024</p>
                    <p>Time: 9:00 AM</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-500 h-24"></div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Christmas Service</h3>
                  <p className="text-gray-600 mb-4">Join us as we celebrate the birth of our Savior with special music and messages.</p>
                  <div className="text-sm text-gray-500">
                    <p>Date: December 25, 2024</p>
                    <p>Time: 9:00 AM</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-24"></div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Baptism Services</h3>
                  <p className="text-gray-600 mb-4">Witness believers publicly declare their faith through baptism.</p>
                  <div className="text-sm text-gray-500">
                    <p>Quarterly Events</p>
                    <p>Contact us for details</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">Upcoming Events</h3>
              <p className="text-yellow-700 mb-4">
                Stay connected with us to be notified of special events, guest speakers, and seasonal celebrations.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/events" 
                  className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors font-medium"
                >
                  View All Events
                </a>
                <a 
                  href="/contact" 
                  className="bg-yellow-800 text-white px-4 py-2 rounded-lg hover:bg-yellow-900 transition-colors font-medium"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Sermon Archive */}
        {activeTab === 'archive' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sermon Archive</h2>
              <p className="text-lg text-gray-600">
                Access our library of biblical teachings and sermons. Growing in God's Word, one message at a time.
              </p>
            </div>

            {/* Filter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <label className="font-medium text-gray-900">Filter by Series:</label>
                <select 
                  value={filterSeries}
                  onChange={(e) => setFilterSeries(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {seriesList.map(series => (
                    <option key={series} value={series}>
                      {series === 'all' ? 'All Series' : series}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sermons Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSermons.map(sermon => (
                <SermonCard key={sermon.id} sermon={sermon} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Load More Sermons
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer with additional navigation */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Church Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Calvary Jesus Church</h3>
              <p className="text-gray-300 mb-4">Unleashing God's truth one verse at a time</p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📧 Pst.bruce67@gmail.com</p>
                <p>📞 +254735464102</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
                <li><a href="/ministries" className="text-gray-300 hover:text-white transition-colors">Ministries</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/events" className="text-gray-300 hover:text-white transition-colors">Events</a></li>
                <li><a href="/resources" className="text-gray-300 hover:text-white transition-colors">Resources</a></li>
                <li><a href="/give" className="text-gray-300 hover:text-white transition-colors">Give</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-3">
                <a 
                  href="https://www.facebook.com/profile.php?id=100064378341874" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  📘 Facebook
                </a>
                <p className="text-sm text-gray-400">
                  Follow us for live streams and updates
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>&copy; 2024 Calvary Jesus Church. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
