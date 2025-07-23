import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navbar from '@/components/Header';
import { Book, Download, Search, Calendar, Users, FileText } from 'lucide-react';

const BibleStudyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample bible study materials - in real implementation, this would come from CMS/API
  const studyMaterials = [
    {
      id: 1,
      title: 'Understanding Biblical Authority',
      category: 'Doctrine',
      description: 'A comprehensive study on the complete authority and sufficiency of Scripture as outlined in 2 Timothy 3:16-17.',
      type: 'Study Guide',
      lessons: 8,
      downloadUrl: '/downloads/biblical-authority-study.pdf',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'The Gospel According to Romans',
      category: 'Book Study',
      description: 'Verse-by-verse study through Paul\'s letter to the Romans, focusing on justification by faith alone.',
      type: 'Series',
      lessons: 16,
      downloadUrl: '/downloads/romans-study-guide.pdf',
      lastUpdated: '2024-01-10'
    },
    {
      id: 3,
      title: 'Salvation: By Grace Through Faith',
      category: 'Doctrine',
      description: 'Exploring the biblical truth that salvation is by grace alone, through faith alone, in Christ alone.',
      type: 'Article',
      lessons: 1,
      downloadUrl: '/downloads/salvation-study.pdf',
      lastUpdated: '2024-01-05'
    },
    {
      id: 4,
      title: 'Proper Bible Study Methods',
      category: 'Methodology',
      description: 'Learn how to study Scripture using proper hermeneutical principles and verse-by-verse exposition.',
      type: 'Guide',
      lessons: 6,
      downloadUrl: '/downloads/bible-study-methods.pdf',
      lastUpdated: '2023-12-20'
    },
    {
      id: 5,
      title: 'The Ten Commandments and the Law',
      category: 'Old Testament',
      description: 'Understanding God\'s moral law and its role in revealing our need for a Savior.',
      type: 'Study Guide',
      lessons: 10,
      downloadUrl: '/downloads/ten-commandments-study.pdf',
      lastUpdated: '2023-12-15'
    },
    {
      id: 6,
      title: 'Jesus Christ: The Only Way',
      category: 'Christology',
      description: 'Biblical examination of Christ\'s exclusive claim in John 14:6 - "I am the way, and the truth, and the life."',
      type: 'Article',
      lessons: 1,
      downloadUrl: '/downloads/jesus-only-way.pdf',
      lastUpdated: '2023-12-10'
    }
  ];

  const categories = ['all', ...Array.from(new Set(studyMaterials.map(m => m.category)))];

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Series':
        return <Users className="w-5 h-5" />;
      case 'Guide':
        return <Book className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Series':
        return 'bg-green-100 text-green-800';
      case 'Guide':
        return 'bg-blue-100 text-blue-800';
      case 'Article':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bible Study Resources
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              "Study to show yourself approved to God, a worker who does not need to be ashamed, 
              rightly dividing the word of truth." - 2 Timothy 2:15
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
                placeholder="Search study materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Book className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Study Materials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredMaterials.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No study materials found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMaterials.map((material) => (
                <div key={material.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(material.type)}
                        <span className={`text-sm px-3 py-1 rounded-full ${getTypeColor(material.type)}`}>
                          {material.type}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {material.category}
                      </span>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {material.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {material.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{material.lessons} {material.lessons === 1 ? 'Lesson' : 'Lessons'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(material.lastUpdated)}</span>
                      </div>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => window.open(material.downloadUrl, '_blank')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bible Study Principles Section */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Bible Study Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At Calvary Jesus Church, we believe in studying God's Word with reverence and precision
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-green-600 mb-4">
                <Book className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Scripture Alone</h3>
              <p className="text-gray-600">
                We believe the Bible is complete and nothing exists outside the Bible claimed to be from God is true.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-green-600 mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verse by Verse</h3>
              <p className="text-gray-600">
                Our teaching method involves careful, systematic exposition of Scripture, one verse at a time.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-green-600 mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Learning</h3>
              <p className="text-gray-600">
                Join our Bible study groups to learn together and grow in understanding of God's Word.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Bible Study Groups
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Come and study God's Word with fellow believers in a supportive, learning environment
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            Contact Us to Join
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BibleStudyPage;
