import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Download, FileText, Video, BookOpen, Heart } from 'lucide-react';

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState('sermons');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Sample data - replace with actual data from your CMS
  const sermons = [
    {
      id: 1,
      title: "The Authority of Scripture",
      speaker: "Pastor Bruce",
      date: "2024-01-15",
      series: "Biblical Foundation",
      videoUrl: "https://youtube.com/watch?v=example1",
      description: "Understanding the complete authority and sufficiency of God's Word"
    },
    {
      id: 2,
      title: "Salvation by Grace Alone",
      speaker: "Pastor Bruce",
      date: "2024-01-08",
      series: "Gospel Essentials",
      videoUrl: "https://youtube.com/watch?v=example2",
      description: "Exploring the biblical doctrine of salvation through faith in Christ"
    },
    {
      id: 3,
      title: "The Way to Heaven",
      speaker: "Pastor Bruce",
      date: "2024-01-01",
      series: "Gospel Essentials",
      videoUrl: "https://youtube.com/watch?v=example3",
      description: "Jesus Christ as the only way to eternal life"
    }
  ];

  const bibleStudies = [
    {
      id: 1,
      title: "Romans Chapter Study Guide",
      type: "PDF",
      size: "2.5 MB",
      downloadUrl: "/downloads/romans-study.pdf"
    },
    {
      id: 2,
      title: "Biblical Doctrine Outline",
      type: "PDF",
      size: "1.8 MB",
      downloadUrl: "/downloads/doctrine-outline.pdf"
    },
    {
      id: 3,
      title: "Prayer and Scripture Memory",
      type: "PDF",
      size: "1.2 MB",
      downloadUrl: "/downloads/prayer-scripture.pdf"
    }
  ];

  const faqs = [
    {
      question: "What does it mean that the Bible is sufficient?",
      answer: "The Bible contains everything we need for life and godliness. As 2 Timothy 3:16-17 states, Scripture is complete and equips us for every good work."
    },
    {
      question: "How can I know if I'm truly saved?",
      answer: "True salvation is evidenced by faith in Jesus Christ alone for forgiveness of sins. Those who are of God hear His word (John 8:47) and show fruit in keeping with repentance."
    },
    {
      question: "Why do you emphasize Bible study so much?",
      answer: "The Bible is God's revealed will for our lives. It's infallible, complete, and authoritative. We study it because it contains God's mind and will for us (2 Timothy 3:16-17)."
    }
  ];

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle prayer request submission
    alert('Prayer request submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/images/logo1.jpg" alt="Calvary Jesus Church" className="h-12 w-12 rounded-full" />
              <span className="text-xl font-bold text-gray-900">Calvary Jesus Church</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600">About Us</Link>
              <Link href="/services" className="text-gray-600 hover:text-blue-600">Services</Link>
              <Link href="/ministries" className="text-gray-600 hover:text-blue-600">Ministries</Link>
              <Link href="/events" className="text-gray-600 hover:text-blue-600">Events</Link>
              <Link href="/resources" className="text-blue-600 font-semibold">Resources</Link>
              <Link href="/give" className="text-gray-600 hover:text-blue-600">Give</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Grow in your faith with our sermons, Bible studies, and prayer resources
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg shadow-sm p-2">
          <button
            onClick={() => setActiveTab('sermons')}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'sermons'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Video className="inline-block w-5 h-5 mr-2" />
            Sermons
          </button>
          <button
            onClick={() => setActiveTab('bible-study')}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'bible-study'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <BookOpen className="inline-block w-5 h-5 mr-2" />
            Bible Study
          </button>
          <button
            onClick={() => setActiveTab('prayer')}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'prayer'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Heart className="inline-block w-5 h-5 mr-2" />
            Prayer
          </button>
        </div>

        {/* Sermons Tab */}
        {activeTab === 'sermons' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sermon Archive</h2>
              <p className="text-gray-600">Teaching the Bible one verse at a time</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sermons.map((sermon) => (
                <div key={sermon.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-600 font-medium">{sermon.series}</span>
                      <span className="text-sm text-gray-500">{sermon.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{sermon.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{sermon.description}</p>
                    <p className="text-gray-700 font-medium mb-4">Speaker: {sermon.speaker}</p>
                    <a
                      href={sermon.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Watch Sermon
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bible Study Tab */}
        {activeTab === 'bible-study' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Bible Study Materials</h2>
              <p className="text-gray-600">Study guides and resources for deeper understanding</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bibleStudies.map((study) => (
                <div key={study.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <FileText className="w-8 h-8 text-red-500 mr-3" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{study.title}</h3>
                      <p className="text-sm text-gray-500">{study.type} • {study.size}</p>
                    </div>
                  </div>
                  <a
                    href={study.downloadUrl}
                    download
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </a>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Prayer Tab */}
        {activeTab === 'prayer' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Prayer Request</h2>
              <p className="text-gray-600">Share your prayer needs with us</p>
            </div>
            
            <form onSubmit={handlePrayerSubmit} className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-6">
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="prayer_request" className="block text-sm font-medium text-gray-700 mb-2">
                  Prayer Request *
                </label>
                <textarea
                  id="prayer_request"
                  name="prayer_request"
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share your prayer request..."
                />
              </div>

              <div className="mb-6 space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_secret"
                    name="is_secret"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is_secret" className="ml-2 text-sm text-gray-700">
                    This is a confidential prayer request
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allow_contact"
                    name="allow_contact"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="allow_contact" className="ml-2 text-sm text-gray-700">
                    You may contact me for a one-on-one conversation
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Submit Prayer Request
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <p>📧 Pst.bruce67@gmail.com</p>
                <p>📱 +254735464102</p>
                <p>📍 Migori, Kenya</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Service Times</h3>
              <div className="space-y-2">
                <p>Sunday: 9:00 AM - 12:00 PM</p>
                <p>Nyaduong' Village</p>
                <p>Sunday: 2:00 PM - 4:00 PM</p>
                <p>Oruba, Migori Town</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <a 
                href="https://www.facebook.com/profile.php?id=100064378341874" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Facebook Page
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 Calvary Jesus Church. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResourcesPage;
