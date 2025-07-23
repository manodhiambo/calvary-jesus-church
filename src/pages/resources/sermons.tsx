import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navbar from '@/components/Header';
import { Play, Calendar, User, Search, Filter } from 'lucide-react';

const SermonsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [selectedSpeaker, setSelectedSpeaker] = useState('all');

  // Sample sermon data - in real implementation, this would come from CMS/API
  const sermons = [
    {
      id: 1,
      title: 'The Authority of Scripture',
      speaker: 'Pastor Bruce',
      date: '2024-01-21',
      series: 'Biblical Foundation',
      description: 'Understanding the complete authority and sufficiency of God\'s Word in our lives.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/sermons/thumbnails/sermon-1.jpg'
    },
    {
      id: 2,
      title: 'Salvation Through Faith Alone',
      speaker: 'Pastor Bruce',
      date: '2024-01-14',
      series: 'Gospel Essentials',
      description: 'Exploring the biblical truth that salvation comes through faith in Christ alone.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/sermons/thumbnails/sermon-2.jpg'
    },
    {
      id: 3,
      title: 'The Righteousness of God',
      speaker: 'Guest Speaker John',
      date: '2024-01-07',
      series: 'Gospel Essentials',
      description: 'Understanding God\'s perfect righteousness and justice.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/sermons/thumbnails/default-sermon.jpg'
    },
    {
      id: 4,
      title: 'Biblical Study Methods',
      speaker: 'Pastor Bruce',
      date: '2023-12-31',
      series: 'Biblical Foundation',
      description: 'How to properly study and interpret God\'s Word verse by verse.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/images/sermons/thumbnails/default-sermon.jpg'
    }
  ];

  const seriesList = ['all', ...Array.from(new Set(sermons.map(s => s.series)))];
  const speakersList = ['all', ...Array.from(new Set(sermons.map(s => s.speaker)))];

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeries = selectedSeries === 'all' || sermon.series === selectedSeries;
    const matchesSpeaker = selectedSpeaker === 'all' || sermon.speaker === selectedSpeaker;
    
    return matchesSearch && matchesSeries && matchesSpeaker;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sermon Archive
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              "Unleashing God's truth one verse at a time" - Explore our collection of biblical teachings
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search sermons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedSeries}
                  onChange={(e) => setSelectedSeries(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {seriesList.map(series => (
                    <option key={series} value={series}>
                      {series === 'all' ? 'All Series' : series}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={selectedSpeaker}
                onChange={(e) => setSelectedSpeaker(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {speakersList.map(speaker => (
                  <option key={speaker} value={speaker}>
                    {speaker === 'all' ? 'All Speakers' : speaker}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredSermons.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No sermons found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSermons.map((sermon) => (
                <div key={sermon.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-200">
                    <img
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/sermons/thumbnails/default-sermon.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {sermon.series}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {sermon.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {sermon.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{sermon.speaker}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(sermon.date)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => window.open(sermon.videoUrl, '_blank')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Watch Sermon
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Us for Live Services
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience God's Word taught verse by verse every Sunday
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-blue-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Nyaduong' Village</h3>
              <p className="text-blue-100">Sundays: 9:00 AM - 12:00 PM</p>
            </div>
            <div className="bg-blue-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Migori Town (Oruba)</h3>
              <p className="text-blue-100">Sundays: 2:00 PM - 4:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SermonsPage;
