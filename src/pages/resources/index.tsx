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
      bgColor: 'bg-amber-50 hover:bg-amber-100',
      iconColor: 'text-cjc-gold'
    },
    {
      title: 'Bible Study',
      description: 'Study guides, articles, and educational materials',
      icon: <Book className="w-8 h-8" />,
      href: '/resources/bible-study',
      bgColor: 'bg-amber-50 hover:bg-amber-100',
      iconColor: 'text-cjc-gold'
    },
    {
      title: 'Prayer Requests',
      description: 'Submit your prayer requests with privacy options',
      icon: <Heart className="w-8 h-8" />,
      href: '/resources/prayer',
      bgColor: 'bg-amber-50 hover:bg-amber-100',
      iconColor: 'text-cjc-gold'
    },
    {
      title: 'Downloads',
      description: 'eBooks, study notes, and other downloadable resources',
      icon: <Download className="w-8 h-8" />,
      href: '/resources/downloads',
      bgColor: 'bg-amber-50 hover:bg-amber-100',
      iconColor: 'text-cjc-gold'
    }
  ];

  return (
    <div className="min-h-screen bg-cjc-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-36 bg-cjc-navy overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-12 h-0.5 bg-cjc-gold mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-white">
              Church Resources
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
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
                  <h3 className="text-2xl font-bold font-heading text-cjc-navy mb-3">
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
      <section className="bg-cjc-navy text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-heading mb-4">
            Need Spiritual Guidance?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our pastoral team is here to support you in your spiritual journey.
            Don't hesitate to reach out for prayer or counsel.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-cjc-gold hover:bg-cjc-gold-mid text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
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
