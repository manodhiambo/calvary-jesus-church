import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Navbar from '@/components/Header';
import { Book, Download, Heart, Play } from 'lucide-react';

const ResourcesPage = () => {
  const resourceSections = [
    {
      title: 'Sermons',
      description: 'Access our complete archive of sermons and teachings',
      icon: <Play className="w-8 h-8" />,
      href: '/resources/sermons',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Bible Study',
      description: 'Study guides, articles, and educational materials',
      icon: <Book className="w-8 h-8" />,
      href: '/resources/bible-study',
      bgColor: 'bg-green-50 hover:bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Prayer Requests',
      description: 'Submit your prayer requests with privacy options',
      icon: <Heart className="w-8 h-8" />,
      href: '/resources/prayer',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Downloads',
      description: 'eBooks, study notes, and other downloadable resources',
      icon: <Download className="w-8 h-8" />,
      href: '/resources/downloads',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Church Resources
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Grow in faith with our collection of sermons, study materials, and spiritual resources
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {resourceSections.map((section, index) => (
              <Link
                key={index}
                href={section.href}
                className={`${section.bgColor} rounded-xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-200`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`${section.iconColor} mb-4`}>
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Spiritual Guidance?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our pastoral team is here to support you in your spiritual journey. 
            Don't hesitate to reach out for prayer or counsel.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResourcesPage;
