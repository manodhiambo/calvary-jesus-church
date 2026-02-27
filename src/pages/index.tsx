import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SermonCard from '@/components/SermonCard';
import EventCard from '@/components/EventCard';
import { CalendarDays, Clock, MapPin, Heart, Users, BookOpen, ChevronLeft, ChevronRight, Play, Radio } from 'lucide-react';
import MediaCarousel from '@/components/MediaCarousel';

interface Event {
  id?: number;
  title: string;
  event_date?: string;
  startDate?: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  description?: string;
  category?: string;
  image_url?: string;
  is_featured?: boolean;
  status?: string;
  type?: string;
}

interface Sermon {
  id?: number;
  title: string;
  speaker?: string;
  sermon_date?: string;
  date?: string;
  description?: string;
  video_url?: string;
  videoUrl?: string;
  thumbnail_url?: string;
  thumbnail?: string;
  series?: string;
  is_featured?: boolean;
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBaptismPhoto, setCurrentBaptismPhoto] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [featuredSermon, setFeaturedSermon] = useState<Sermon | null>(null);
  const [onlineService, setOnlineService] = useState<{ video_url?: string; title?: string; is_live?: boolean } | null>(null);
  const [churchServices, setChurchServices] = useState<Array<{ id: number; title: string; description?: string; service_type?: string; service_date?: string; media_urls?: string[] }>>([]);
  const [serviceTab, setServiceTab] = useState(0);

  const heroSlides = [
    {
      image: '/images/hero/church-exterior.jpg',
      title: 'Welcome to Calvary Jesus Church',
      subtitle: "Unleashing God's Truth One Verse at a Time",
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
      title: "Studying God's Word",
      subtitle: 'Teaching the Bible is Our Focus',
      cta: 'Bible Study'
    }
  ];

  const baptismPhotos = Array.from({ length: 40 }, (_, i) => `/images/baptism/${i + 1}.jfif`);

  // Fetch events and sermons from API
  useEffect(() => {
    // Fetch upcoming events
    fetch('/api/public/events?limit=6')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data.map(e => ({
            ...e,
            startDate: e.event_date,
            startTime: new Date(e.event_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          })));
        } else {
          setEvents(getStaticEvents());
        }
      })
      .catch(() => setEvents(getStaticEvents()));

    // Fetch featured sermon
    fetch('/api/public/sermons?featured=true&limit=1')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const s = data[0];
          setFeaturedSermon({
            ...s,
            date: s.sermon_date,
            videoUrl: s.video_url,
            thumbnail: s.thumbnail_url,
          });
        }
      })
      .catch(() => {});

    // Fetch latest online service
    fetch('/api/public/online-services?limit=1')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setOnlineService(data[0]);
      })
      .catch(() => {});

    // Fetch church services (baptism, communion etc.)
    fetch('/api/public/services')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setChurchServices(data); })
      .catch(() => {});
  }, []);

  // Static fallback events
  const getStaticEvents = (): Event[] => {
    const events: Event[] = [];
    const today = new Date();
    const fmt = (d: Date) => d.toISOString().split('T')[0];
    for (let i = 0; i < 4; i++) {
      const sunday = new Date(today);
      const diff = (7 - today.getDay()) % 7 || 7;
      sunday.setDate(today.getDate() + diff + (i * 7));
      events.push({
        title: 'Sunday Worship Service', startDate: fmt(sunday),
        location: "Nyaduong' Village", description: 'Join us for worship, Bible teaching, and fellowship.',
        type: 'worship'
      });
    }
    return events;
  };

  const staticSermon = {
    title: "The Authority of Scripture", speaker: "Pastor Bruce",
    date: "2025-01-21",
    description: "Understanding why the Bible is our sole authority for faith and practice.",
    videoUrl: "https://youtube.com/watch?v=example",
    thumbnail: "/images/sermons/thumbnails/sermon-1.jpg"
  };

  const displaySermon = featuredSermon || staticSermon;
  const displayEvents = events.length > 0 ? events : getStaticEvents();

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const t = setInterval(() => setCurrentBaptismPhoto(p => (p + 1) % baptismPhotos.length), 2000);
    return () => clearInterval(t);
  }, [baptismPhotos.length]);

  const getVideoEmbed = (url: string) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const fbMatch = url.includes('facebook.com');
    if (fbMatch) return url;
    return url;
  };

  return (
    <>
      <Head>
        <title>Calvary Jesus Church - Unleashing God's Truth One Verse at a Time</title>
        <meta name="description" content="Welcome to Calvary Jesus Church (CJC) in Migori, Kenya. Dedicated to expository Bible teaching, fellowship, worship, and building lives on God's Word. Join us every Sunday." />
        <meta name="keywords" content="Calvary Jesus Church, CJC, Migori church, Kenya Bible church, expository preaching, Sunday service, Christian fellowship, Bible teaching" />
        <meta property="og:title" content="Calvary Jesus Church - Unleashing God's Truth One Verse at a Time" />
        <meta property="og:description" content="A Bible-centered church in Migori, Kenya dedicated to teaching God's Word verse by verse." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cjc.org" />
        <link rel="canonical" href="https://cjc.org" />
      </Head>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/60 z-10"></div>
          <div className="absolute inset-0">
            {heroSlides.map((slide, index) => (
              <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">{heroSlides[currentSlide].title}</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">{heroSlides[currentSlide].subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                {heroSlides[currentSlide].cta}
              </Link>
              <Link href="/resources/prayer" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Prayer Request
              </Link>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-amber-500' : 'bg-white/50'}`} />
            ))}
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Welcome to Our Church Family</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Calvary Jesus Church is based on Biblical doctrine solely. We believe that the Bible is complete
                on its own and nothing exists outside the Bible claimed to be from God is true.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: BookOpen, title: 'Bible Teaching', desc: "Teaching the Bible is our focus. We study God's Word verse by verse to understand His will for our lives." },
                { icon: Users, title: 'Fellowship', desc: 'Join our community of believers as we grow together in faith and support one another.' },
                { icon: Heart, title: 'Prayer', desc: 'We believe in the power of prayer and encourage our members to share their prayer requests.' }
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center p-8 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                  <Icon className="w-16 h-16 text-amber-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
                  <p className="text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Times */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Us for Worship</h2>
              <p className="text-xl text-slate-300">We gather every week to worship and study God's Word together</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-slate-800 p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <Clock className="w-8 h-8 text-amber-500 mr-4" />
                  <h3 className="text-2xl font-bold">Morning Service</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center"><CalendarDays className="w-5 h-5 text-amber-500 mr-3" /><span>Sunday: 9:00 AM - 12:00 PM</span></div>
                  <div className="flex items-start"><MapPin className="w-5 h-5 text-amber-500 mr-3 mt-1" /><span>Nyaduong' Village, next to Nyaduong' Secondary and Primary Schools</span></div>
                </div>
              </div>
              <div className="bg-slate-800 p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <Clock className="w-8 h-8 text-amber-500 mr-4" />
                  <h3 className="text-2xl font-bold">Bible Study</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center"><CalendarDays className="w-5 h-5 text-amber-500 mr-3" /><span>Wednesday: 6:00 PM - 8:00 PM</span></div>
                  <div className="flex items-start"><MapPin className="w-5 h-5 text-amber-500 mr-3 mt-1" /><span>Nyaduong' Village, Migori</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live / Latest Online Service */}
        {onlineService && (
          <section className="py-20 bg-slate-800 text-white">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-10">
                {onlineService.is_live ? (
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                    <span className="text-red-400 font-semibold text-lg">LIVE NOW</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Play className="w-5 h-5 text-amber-500" />
                    <span className="text-amber-400 font-semibold">Latest Online Service</span>
                  </div>
                )}
                <h2 className="text-3xl md:text-4xl font-bold">{onlineService.title}</h2>
              </div>
              {onlineService.video_url && (
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  {onlineService.video_url.includes('youtube') || onlineService.video_url.includes('youtu.be') ? (
                    <iframe
                      src={getVideoEmbed(onlineService.video_url) || ''}
                      className="w-full h-full" allowFullScreen frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    <video src={onlineService.video_url} controls className="w-full h-full object-cover" />
                  )}
                </div>
              )}
              <div className="text-center mt-6">
                <Link href="/services" className="text-amber-400 hover:text-amber-300 font-medium">
                  View All Online Services →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Recent Services — DB driven with category tabs + carousel */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Recent Services</h2>
              <p className="text-xl text-slate-600 mb-2">Special moments from our church gatherings</p>
              <p className="text-lg text-slate-500 italic">"Therefore go and make disciples of all nations" — Matthew 28:19</p>
            </div>

            {churchServices.length > 0 ? (
              <div className="max-w-4xl mx-auto">
                {/* Category Tabs */}
                {churchServices.length > 1 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {churchServices.map((svc, i) => {
                      const isPast = svc.service_date && new Date(svc.service_date) < new Date();
                      return (
                        <button
                          key={svc.id}
                          onClick={() => setServiceTab(i)}
                          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${
                            serviceTab === i ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <span className="capitalize">{svc.service_type || 'service'}</span>
                          {isPast && <span className={`text-xs px-1.5 py-0.5 rounded-full ${serviceTab === i ? 'bg-amber-500 text-amber-100' : 'bg-gray-200 text-gray-500'}`}>Past</span>}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Active Service */}
                {(() => {
                  const svc = churchServices[serviceTab] || churchServices[0];
                  const media = Array.isArray(svc?.media_urls) ? svc.media_urls.filter(Boolean) : [];
                  const isPast = svc?.service_date && new Date(svc.service_date) < new Date();
                  return (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
                      {media.length > 0 ? (
                        <MediaCarousel items={media} interval={3000} />
                      ) : (
                        /* Fallback: show static baptism photos if no media uploaded */
                        <div className="relative h-96 md:h-[440px] bg-slate-100">
                          {baptismPhotos.map((photo, index) => (
                            <div key={index} className={`absolute inset-0 transition-opacity duration-700 ${index === currentBaptismPhoto ? 'opacity-100' : 'opacity-0'}`}>
                              <img src={photo} alt="Service photo" className="w-full h-full object-cover" />
                            </div>
                          ))}
                          <button onClick={() => setCurrentBaptismPhoto(p => (p - 1 + baptismPhotos.length) % baptismPhotos.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button onClick={() => setCurrentBaptismPhoto(p => (p + 1) % baptismPhotos.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">
                            <ChevronRight className="w-6 h-6" />
                          </button>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-1.5 rounded-full text-sm">
                            {currentBaptismPhoto + 1} / {baptismPhotos.length}
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {svc.service_type && (
                            <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-1 rounded capitalize">{svc.service_type}</span>
                          )}
                          {isPast
                            ? <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">Past Service</span>
                            : <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Upcoming</span>
                          }
                          {svc.service_date && (
                            <span className="text-xs text-slate-400 ml-auto">
                              {new Date(svc.service_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{svc.title}</h3>
                        {svc.description && <p className="text-slate-600">{svc.description}</p>}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              /* Fallback: original baptism photo slideshow */
              <div className="max-w-4xl mx-auto">
                <div className="relative bg-slate-100 rounded-lg overflow-hidden shadow-lg">
                  <div className="relative h-96 md:h-[500px]">
                    {baptismPhotos.map((photo, index) => (
                      <div key={index} className={`absolute inset-0 transition-opacity duration-700 ${index === currentBaptismPhoto ? 'opacity-100' : 'opacity-0'}`}>
                        <img src={photo} alt={`Baptism service photo ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <button onClick={() => setCurrentBaptismPhoto(p => (p - 1 + baptismPhotos.length) % baptismPhotos.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={() => setCurrentBaptismPhoto(p => (p + 1) % baptismPhotos.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                      {currentBaptismPhoto + 1} / {baptismPhotos.length}
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Baptism Service — September 7th, 2025</h3>
                    <p className="text-slate-600">We rejoice with the believers who publicly declared their faith through baptism.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Featured Sermon */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Latest Sermon</h2>
              <p className="text-xl text-slate-600">Stay connected with our latest Bible teachings</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <SermonCard sermon={{
                title: displaySermon.title,
                speaker: (displaySermon as Sermon).speaker || 'Pastor Bruce',
                date: (displaySermon as Sermon).date || (displaySermon as Sermon).sermon_date || new Date().toISOString().split('T')[0],
                description: (displaySermon as Sermon).description || '',
                videoUrl: (displaySermon as Sermon).videoUrl || (displaySermon as Sermon).video_url,
                thumbnail: (displaySermon as Sermon).thumbnail || (displaySermon as Sermon).thumbnail_url,
                series: (displaySermon as Sermon).series,
              }} featured={true} />
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
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Upcoming Events</h2>
              <p className="text-xl text-slate-600">Don't miss out on what's happening in our church community</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayEvents.slice(0, 6).map((event, index) => {
                const eventDate = event.event_date || event.startDate || new Date().toISOString();
                const normalizedEvent = {
                  title: event.title,
                  description: event.description || '',
                  startDate: eventDate.substring(0, 10),
                  startTime: event.start_time || (event.event_date ? new Date(event.event_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '9:00 AM'),
                  endTime: event.end_time,
                  location: event.location || "Nyaduong' Village",
                  imageUrl: event.image_url,
                  category: event.category || event.type,
                  registrationRequired: (event as { registration_required?: boolean }).registration_required,
                };
                return <EventCard key={event.id || index} event={normalizedEvent} featured={index === 0} />;
              })}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Church Family</h2>
            <p className="text-xl mb-8 opacity-90">Whether you're new to faith or have been walking with Christ for years, we welcome you to be part of our community.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">Visit Us</Link>
              <Link href="/resources/prayer" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">Share Prayer Request</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
