import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SermonCard from '@/components/SermonCard';
import EventCard from '@/components/EventCard';
import { CalendarDays, Clock, MapPin, Heart, Users, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBaptismPhoto, setCurrentBaptismPhoto] = useState(0);
  
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

  // Baptism photos from September 7th, 2025
  const baptismPhotos = [
    '/images/baptism/1.jfif',
    '/images/baptism/2.jfif',
    '/images/baptism/3.jfif',
    '/images/baptism/4.jfif',
    '/images/baptism/5.jfif',
    '/images/baptism/6.jfif',
    '/images/baptism/7.jfif',
    '/images/baptism/8.jfif',
    '/images/baptism/9.jfif',
    '/images/baptism/10.jfif',
    '/images/baptism/11.jfif',
    '/images/baptism/12.jfif',
    '/images/baptism/13.jfif',
    '/images/baptism/14.jfif',
    '/images/baptism/15.jfif',
    '/images/baptism/16.jfif',
    '/images/baptism/17.jfif',
    '/images/baptism/18.jfif',
    '/images/baptism/19.jfif',
    '/images/baptism/20.jfif',
    '/images/baptism/21.jfif',
    '/images/baptism/22.jfif',
    '/images/baptism/23.jfif',
    '/images/baptism/24.jfif',
    '/images/baptism/25.jfif',
    '/images/baptism/26.jfif',
    '/images/baptism/27.jfif',
    '/images/baptism/28.jfif',
    '/images/baptism/29.jfif',
    '/images/baptism/30.jfif',
    '/images/baptism/31.jfif',
    '/images/baptism/32.jfif',
    '/images/baptism/33.jfif',
    '/images/baptism/34.jfif',
    '/images/baptism/35.jfif',
    '/images/baptism/36.jfif',
    '/images/baptism/37.jfif',
    '/images/baptism/38.jfif',
    '/images/baptism/39.jfif',
    '/images/baptism/40.jfif'
  ];

  const featuredSermon = {
    title: "The Authority of Scripture",
    speaker: "Pastor Bruce",
    date: "2025-01-21",
    description: "Understanding why the Bible is our sole authority for faith and practice.",
    videoUrl: "https://youtube.com/watch?v=example",
    thumbnail: "/images/sermons/thumbnails/sermon-1.jpg"
  };

  // Function to get next Sunday
  const getNextSunday = () => {
    const today = new Date();
    const nextSunday = new Date(today);
    const daysUntilSunday = 7 - today.getDay();
    nextSunday.setDate(today.getDate() + (daysUntilSunday === 7 ? 7 : daysUntilSunday));
    return nextSunday;
  };

  // Function to format date
  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    if (isNaN(d.getTime())) {
     throw new Error("Invalid date value");
   }
    return d.toISOString().split("T")[0];
  };

  // Dynamic upcoming events based on Christian calendar
  const getUpcomingEvents = () => {
    const events = [];
    const today = new Date();
    
    // Add next 4 Sundays
    for (let i = 0; i < 4; i++) {
      const sunday = new Date(today);
      const daysUntilSunday = 7 - today.getDay();
      sunday.setDate(today.getDate() + (daysUntilSunday === 7 ? 7 : daysUntilSunday) + (i * 7));
      
      events.push({
        title: "Sunday Worship Service",
        startDate: formatDate(sunday),
        startTime: "9:00 AM",
        endTime: "12:00 PM",
        location: "Nyaduong' Village",
        description: "Join us for worship, Bible teaching, and fellowship.",
        type: "worship"
      });
    }

    // Add monthly prayer meetings (first Friday of each month)
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const firstFriday = new Date(nextMonth);
    const daysUntilFriday = (5 - nextMonth.getDay() + 7) % 7;
    firstFriday.setDate(nextMonth.getDate() + daysUntilFriday);
    
    events.push({
      title: "Monthly Prayer Meeting",
      startDate: formatDate(firstFriday),
      startTime: "6:00 PM",
      endTime: "8:00 PM",
      location: "Nyaduong' Village",
      description: "Come together for focused prayer and intercession.",
      type: "prayer"
    });

    // Add Bible study (every Wednesday)
    const nextWednesday = new Date(today);
    const daysUntilWednesday = (3 - today.getDay() + 7) % 7;
    nextWednesday.setDate(today.getDate() + (daysUntilWednesday === 0 ? 7 : daysUntilWednesday));
    
    events.push({
      title: "Bible Study",
      startDate: formatDate(nextWednesday),
      startTime: "6:00 PM",
      endTime: "8:00 PM",
      location: "Nyaduong' Village",
      description: "Deep dive into God's Word with verse-by-verse study.",
      type: "study"
    });

    // Sort events by date
    return events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  };

  const upcomingEvents = getUpcomingEvents();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Baptism photo carousel - moves every 1 second
  useEffect(() => {
    const baptismTimer = setInterval(() => {
      setCurrentBaptismPhoto((prev) => (prev + 1) % baptismPhotos.length);
    }, 2000);
    return () => clearInterval(baptismTimer);
  }, [baptismPhotos.length]);

  const nextBaptismPhoto = () => {
    setCurrentBaptismPhoto((prev) => (prev + 1) % baptismPhotos.length);
  };

  const prevBaptismPhoto = () => {
    setCurrentBaptismPhoto((prev) => (prev - 1 + baptismPhotos.length) % baptismPhotos.length);
  };

  return (
    <>
      <Head>
        <title>Calvary Jesus Church - Unleashing God's Truth One Verse at a Time</title>
        <meta name="description" content="Welcome to Calvary Jesus Church in Migori. We are dedicated to teaching the Bible and building lives on solid Biblical foundation." />
        <meta name="keywords" content="church, Migori, Bible teaching, Christian fellowship, worship, baptism" />
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
                We have one service location to serve you better
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

        {/* Latest Baptism Service */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Recent Baptism Service
              </h2>
              <p className="text-xl text-slate-600 mb-4">
                Celebrating new believers who took the step of baptism on September 7th, 2025
              </p>
              <p className="text-lg text-slate-500">
                "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit" - Matthew 28:19
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative bg-slate-100 rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-96 md:h-[500px]">
                  {baptismPhotos.map((photo, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
                        index === currentBaptismPhoto ? 'translate-x-0' : 
                        index === (currentBaptismPhoto + 1) % baptismPhotos.length ? 'translate-x-full' :
                        'translate-x-full'
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`Baptism service photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  
                  {/* Navigation buttons */}
                  <button
                    onClick={prevBaptismPhoto}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextBaptismPhoto}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Photo counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                    {currentBaptismPhoto + 1} / {baptismPhotos.length}
                  </div>
                </div>
                
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Baptism Service - September 7th, 2025
                  </h3>
                  <p className="text-slate-600">
                    We rejoice with the believers who publicly declared their faith through baptism. 
                    It was a blessed day as we witnessed these precious souls take this important step 
                    in their walk with Christ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Sermon */}
        <section className="py-20 bg-slate-50">
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

        {/* Upcoming Events */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Upcoming Events
              </h2>
              <p className="text-xl text-slate-600">
                Don't miss out on what's happening in our church community
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {upcomingEvents.slice(0, 6).map((event, index) => (
                <EventCard key={index} event={event} featured={index === 0} />
              ))}
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
