import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SermonCard from '@/components/SermonCard';
import EventCard from '@/components/EventCard';
import { CalendarDays, Clock, MapPin, Heart, Users, BookOpen } from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      image: '/images/hero/church-exterior.jpg',
      title: 'Welcome to Calvary Jesus Church',
      subtitle: 'Unleashing God\'s Truth One Verse at a Time',
      cta: 'Join Us Sunday'
    },
    {
      image: '/images/hero/congregation.jpg',
      title: 'Growing in Faith Together',
      subtitle: 'Building Lives on Biblical Foundation',
      cta: 'Learn More'
    },
    {
      image: '/images/hero/bible-study.jpg',
      title: 'Studying God\'s Word',
      subtitle: 'Teaching the Bible is Our Focus',
      cta: 'Bible Study'
    }
  ];

  const featuredSermon = {
    title: "The Authority of Scripture",
    speaker: "Pastor Bruce",
    date: "2024-01-21",
    description: "Understanding why the Bible is our sole authority for faith and practice.",
    videoUrl: "https://youtube.com/watch?v=example",
    thumbnail: "/images/sermons/thumbnails/sermon-1.jpg"
  };

  const upcomingEvent = {
    title: "Sunday Worship Service",
    startDate: "2024-08-04",
    startTime: "10:00 AM",
    location: "Nyaduong' Village",
    description: "Join us for worship, Bible teaching, and fellowship."
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <>
      <Head>
        <title>Calvary Jesus Church - Unleashing God's Truth One Verse at a Time</title>
        <meta name="description" content="Welcome to Calvary Jesus Church in Migori. We are dedicated to teaching the Bible and building lives on solid Biblical foundation." />
        <meta name="keywords" content="church, Migori, Bible teaching, Christian fellowship, worship" />
      </Head>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/60 z-10"></div>
          
          {/* Background Image Slider */}
          <div className="absolute inset-0">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                {heroSlides[currentSlide].cta}
              </Link>
              <Link href="/resources/prayer" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Prayer Request
              </Link>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-amber-500' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Welcome to Our Church Family
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Calvary Jesus Church is based on Biblical doctrine solely. We believe that the Bible is complete 
                on its own and nothing exists outside the Bible claimed to be from God is true.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <BookOpen className="w-16 h-16 text-amber-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Bible Teaching</h3>
                <p className="text-slate-600">
                  Teaching the Bible is our focus. We study God's Word verse by verse to understand His will for our lives.
                </p>
              </div>
              
              <div className="text-center p-8 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <Users className="w-16 h-16 text-amber-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Fellowship</h3>
                <p className="text-slate-600">
                  Join our community of believers as we grow together in faith and support one another.
                </p>
              </div>
              
              <div className="text-center p-8 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <Heart className="w-16 h-16 text-amber-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Prayer</h3>
                <p className="text-slate-600">
                  We believe in the power of prayer and encourage our members to share their prayer requests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Times */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Us for Worship</h2>
              <p className="text-xl text-slate-300">
                We have one service locations to serve you better
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800 p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <Clock className="w-8 h-8 text-amber-500 mr-4" />
                  <h3 className="text-2xl font-bold">Morning Service</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 text-amber-500 mr-3" />
                    <span>Sunday: 9:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-amber-500 mr-3 mt-1" />
                    <span>Nyaduong' Village, next to Nyaduong' Secondary and Primary Schools</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Sermon */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Latest Sermon
              </h2>
              <p className="text-xl text-slate-600">
                Stay connected with our latest Bible teachings
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <SermonCard sermon={featuredSermon} featured={true} />
            </div>

            <div className="text-center mt-12">
              <Link href="/services#archive" className="bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                View All Sermons
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming Event */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Upcoming Events
              </h2>
              <p className="text-xl text-slate-600">
                Don't miss out on what's happening in our church community
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <EventCard event={upcomingEvent} featured={true} />
            </div>

            <div className="text-center mt-12">
              <Link href="/events" className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                View All Events
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Church Family
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're new to faith or have been walking with Christ for years, 
              we welcome you to be part of our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Visit Us
              </Link>
              <Link href="/resources/prayer" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Share Prayer Request
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
