import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SermonCard from '@/components/SermonCard';
import EventCard from '@/components/EventCard';
import { CalendarDays, Clock, MapPin, Heart, Users, BookOpen, ChevronLeft, ChevronRight, Play, Radio, ArrowRight } from 'lucide-react';
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
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  const heroSlides = [
    { image: '/images/hero/church-exterior.jpg', title: 'Welcome to Calvary Jesus Church', subtitle: "Unleashing God's Truth One Verse at a Time", cta: 'Join Us Sunday' },
    { image: '/images/hero/congregation.jpg', title: 'Growing in Faith Together', subtitle: 'Building Lives on Biblical Foundation', cta: 'Learn More' },
    { image: '/images/hero/bible-study.jpg', title: "Studying God's Word", subtitle: 'Teaching the Bible is Our Focus', cta: 'Bible Study' },
  ];

  const baptismPhotos = Array.from({ length: 40 }, (_, i) => `/images/baptism/${i + 1}.jfif`);

  useEffect(() => {
    fetch('/api/public/events?limit=6')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data.map(e => ({ ...e, startDate: e.event_date })));
        } else {
          setEvents(getStaticEvents());
        }
      })
      .catch(() => setEvents(getStaticEvents()));

    fetch('/api/public/sermons?featured=true&limit=1')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const s = data[0];
          setFeaturedSermon({ ...s, date: s.sermon_date, videoUrl: s.video_url, thumbnail: s.thumbnail_url });
        }
      })
      .catch(() => {});

    fetch('/api/public/online-services?limit=1')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setOnlineService(data[0]); })
      .catch(() => {});

    fetch('/api/public/services')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setChurchServices(data); })
      .catch(() => {});
  }, []);

  const getStaticEvents = (): Event[] => {
    const list: Event[] = [];
    const today = new Date();
    const fmt = (d: Date) => d.toISOString().split('T')[0];
    for (let i = 0; i < 4; i++) {
      const sunday = new Date(today);
      const diff = (7 - today.getDay()) % 7 || 7;
      sunday.setDate(today.getDate() + diff + i * 7);
      list.push({ title: 'Sunday Worship Service', startDate: fmt(sunday), location: "Nyaduong' Village", description: 'Join us for worship, Bible teaching, and fellowship.', type: 'worship' });
    }
    return list;
  };

  const staticSermon = { title: 'The Authority of Scripture', speaker: 'Pastor Bruce', date: '2025-01-21', description: 'Understanding why the Bible is our sole authority for faith and practice.', videoUrl: 'https://youtube.com/watch?v=example', thumbnail: '/images/sermons/thumbnails/sermon-1.jpg' };
  const displaySermon = featuredSermon || staticSermon;
  const displayEvents = events.length > 0 ? events : getStaticEvents();

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, [heroSlides.length]);

  useEffect(() => {
    const t = setInterval(() => setCurrentBaptismPhoto(p => (p + 1) % baptismPhotos.length), 2000);
    return () => clearInterval(t);
  }, [baptismPhotos.length]);

  const getVideoEmbed = (url: string) => {
    if (!url) return null;
    const m = url.match(/(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return m ? `https://www.youtube.com/embed/${m[1]}` : url;
  };

  return (
    <>
      <Head>
        <title>Calvary Jesus Church — Unleashing God's Truth One Verse at a Time</title>
        <meta name="description" content="Welcome to Calvary Jesus Church (CJC) in Migori, Kenya. Dedicated to expository Bible teaching, fellowship, worship, and building lives on God's Word. Join us every Sunday." />
        <meta property="og:title" content="Calvary Jesus Church — Unleashing God's Truth One Verse at a Time" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cjc.org" />
        <link rel="canonical" href="https://cjc.org" />
      </Head>

      <Header />

      <main className="min-h-screen">

        {/* ══════════════════════════════════════════════
            HERO — full-screen slideshow
        ══════════════════════════════════════════════ */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background images */}
          <div className="absolute inset-0">
            {heroSlides.map((slide, i) => (
              <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-cjc-navy/70" />
          {/* Gold bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cjc-navy/60 to-transparent" />

          {/* Content */}
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            {/* Gold accent line */}
            <div className="w-12 h-0.5 bg-cjc-gold mx-auto mb-6" />
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-5 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="bg-cjc-gold hover:bg-cjc-gold-mid text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-cjc-gold/30 hover:-translate-y-0.5">
                {heroSlides[currentSlide].cta}
              </Link>
              <Link href="/resources/prayer" className="border border-white/40 text-white hover:bg-white hover:text-cjc-navy px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300">
                Prayer Request
              </Link>
            </div>
          </div>

          {/* Slide dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)}
                className={`transition-all duration-300 rounded-full ${i === currentSlide ? 'w-6 h-2 bg-cjc-gold' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            WELCOME — 3 pillars
        ══════════════════════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="section-label">Our Foundation</p>
              <div className="gold-divider">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-cjc-navy">Welcome to Our Church Family</h2>
              </div>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                Calvary Jesus Church is based on Biblical doctrine solely. We believe that the Bible is complete on its own
                and nothing exists outside the Bible claimed to be from God is true.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: BookOpen, title: 'Bible Teaching', desc: "Teaching the Bible is our focus. We study God's Word verse by verse to understand His will for our lives." },
                { icon: Users,    title: 'Fellowship',    desc: 'Join our community of believers as we grow together in faith and support one another in love.' },
                { icon: Heart,    title: 'Prayer',         desc: 'We believe in the power of prayer and encourage every member to share their prayer requests with us.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="group text-center p-10 rounded-2xl border border-gray-100 hover:border-cjc-gold/30 hover:shadow-xl transition-all duration-300 bg-white">
                  <div className="w-16 h-16 bg-cjc-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-cjc-gold/20 transition-colors">
                    <Icon className="w-8 h-8 text-cjc-gold" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-cjc-navy mb-4">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SERVICE TIMES — navy band
        ══════════════════════════════════════════════ */}
        <section className="py-20 bg-cjc-navy text-white relative overflow-hidden">
          {/* Decorative gold arc */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-14">
              <p className="section-label text-cjc-gold">Come as You Are</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold">Join Us for Worship</h2>
              <p className="text-gray-300 mt-4 text-lg">We gather every week to worship and study God's Word together</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {[
                { icon: Clock, label: 'Morning Service', days: 'Sunday', time: '9:00 AM – 12:00 PM', place: "Nyaduong' Village, next to Nyaduong' Secondary School" },
                { icon: BookOpen, label: 'Bible Study', days: 'Wednesday', time: '6:00 PM – 8:00 PM', place: "Nyaduong' Village, Migori" },
              ].map(({ icon: Icon, label, days, time, place }) => (
                <div key={label} className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cjc-gold/40 rounded-2xl p-8 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-cjc-gold/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-cjc-gold" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold">{label}</h3>
                  </div>
                  <div className="space-y-2.5">
                    <p className="flex items-center gap-2 text-cjc-gold font-semibold">
                      <CalendarDays className="w-4 h-4" /> {days}: {time}
                    </p>
                    <p className="flex items-start gap-2 text-gray-300 text-sm">
                      <MapPin className="w-4 h-4 text-cjc-gold/70 mt-0.5 flex-shrink-0" /> {place}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
        </section>

        {/* ══════════════════════════════════════════════
            ONLINE SERVICE — when available
        ══════════════════════════════════════════════ */}
        {onlineService && (
          <section className="py-20 bg-cjc-blue text-white">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-10">
                {onlineService.is_live ? (
                  <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/40 text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <Radio className="w-4 h-4 animate-pulse" /> LIVE NOW
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 bg-cjc-gold/20 border border-cjc-gold/30 text-cjc-gold px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <Play className="w-4 h-4" /> Latest Online Service
                  </div>
                )}
                <h2 className="font-heading text-3xl md:text-4xl font-bold">{onlineService.title}</h2>
              </div>
              {onlineService.video_url && (
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  {onlineService.video_url.includes('youtube') || onlineService.video_url.includes('youtu.be') ? (
                    <iframe src={getVideoEmbed(onlineService.video_url) || ''} className="w-full h-full" allowFullScreen frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                  ) : (
                    <video src={onlineService.video_url} controls className="w-full h-full object-cover" />
                  )}
                </div>
              )}
              <div className="text-center mt-8">
                <Link href="/services" className="inline-flex items-center gap-2 text-cjc-gold hover:text-cjc-gold-mid font-medium transition-colors">
                  View All Online Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════
            RECENT SERVICES — carousel + past grid
        ══════════════════════════════════════════════ */}
        <section className="py-24 bg-cjc-cream">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="section-label">Our Gatherings</p>
              <div className="gold-divider">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-cjc-navy">Recent Services</h2>
              </div>
              <p className="text-gray-600 text-lg mb-2">Special moments from our church gatherings</p>
              <p className="scripture-text text-gray-500">"Therefore go and make disciples of all nations" — Matthew 28:19</p>
            </div>

            {churchServices.length > 0 ? (() => {
              const now = new Date();
              const sorted = [...churchServices].sort((a, b) => {
                const aDate = a.service_date ? new Date(a.service_date) : new Date(0);
                const bDate = b.service_date ? new Date(b.service_date) : new Date(0);
                const aUp = aDate >= now, bUp = bDate >= now;
                if (aUp && !bUp) return -1;
                if (!aUp && bUp) return 1;
                return aUp ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
              });
              const featured = sorted.find(s => s.id === selectedServiceId) || sorted[0];
              const pastServices = sorted.filter(s => s.id !== featured.id && s.service_date && new Date(s.service_date) < now);
              const media = Array.isArray(featured?.media_urls) ? featured.media_urls.filter(Boolean) : [];
              const isPast = featured?.service_date && new Date(featured.service_date) < now;

              return (
                <div className="max-w-4xl mx-auto">
                  {/* Featured card */}
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-12">
                    {media.length > 0 ? (
                      <MediaCarousel items={media} interval={2000} />
                    ) : (
                      <div className="relative h-96 md:h-[440px] bg-gray-100">
                        {baptismPhotos.map((photo, i) => (
                          <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === currentBaptismPhoto ? 'opacity-100' : 'opacity-0'}`}>
                            <img src={photo} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        <button onClick={() => setCurrentBaptismPhoto(p => (p - 1 + baptismPhotos.length) % baptismPhotos.length)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-cjc-navy/70 text-white p-2.5 rounded-full hover:bg-cjc-navy transition-colors">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={() => setCurrentBaptismPhoto(p => (p + 1) % baptismPhotos.length)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-cjc-navy/70 text-white p-2.5 rounded-full hover:bg-cjc-navy transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 right-4 bg-cjc-navy/70 text-white text-xs px-3 py-1 rounded-full">
                          {currentBaptismPhoto + 1} / {baptismPhotos.length}
                        </div>
                      </div>
                    )}
                    <div className="p-7">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {featured.service_type && (
                          <span className="bg-cjc-gold/15 text-cjc-gold text-xs font-semibold px-2.5 py-1 rounded-lg capitalize">{featured.service_type}</span>
                        )}
                        {isPast
                          ? <span className="bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-lg">Past Service</span>
                          : <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-lg font-medium">Upcoming</span>
                        }
                        {featured.service_date && (
                          <span className="text-xs text-gray-400 ml-auto">
                            {new Date(featured.service_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-cjc-navy mb-2">{featured.title}</h3>
                      {featured.description && <p className="text-gray-600 leading-relaxed">{featured.description}</p>}
                    </div>
                  </div>

                  {/* Past services grid */}
                  {pastServices.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <Clock className="w-4 h-4 text-cjc-gold" />
                        <h3 className="font-heading text-lg font-semibold text-gray-600">Past Services</h3>
                        <div className="flex-1 h-px bg-gray-200" />
                      </div>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {pastServices.map(svc => (
                          <button key={svc.id} onClick={() => setSelectedServiceId(svc.id)}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-cjc-gold/30 transition-all duration-300 text-left group">
                            {svc.media_urls?.[0] ? (
                              <img src={svc.media_urls[0]} alt="" className="w-full h-32 object-cover group-hover:opacity-95 transition-opacity" />
                            ) : (
                              <div className="w-full h-32 bg-cjc-cream flex items-center justify-center">
                                <BookOpen className="w-8 h-8 text-gray-300" />
                              </div>
                            )}
                            <div className="p-4">
                              <span className="bg-gray-100 text-gray-400 text-xs px-2 py-0.5 rounded">Past Service</span>
                              <h4 className="font-heading text-sm font-semibold text-cjc-navy mt-1.5 line-clamp-2 group-hover:text-cjc-gold transition-colors">{svc.title}</h4>
                              {svc.service_date && (
                                <p className="text-xs text-gray-400 mt-1">{new Date(svc.service_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })() : (
              /* Fallback: baptism photo slideshow */
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="relative h-96 md:h-[500px]">
                    {baptismPhotos.map((photo, i) => (
                      <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === currentBaptismPhoto ? 'opacity-100' : 'opacity-0'}`}>
                        <img src={photo} alt={`Baptism service photo ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <button onClick={() => setCurrentBaptismPhoto(p => (p - 1 + baptismPhotos.length) % baptismPhotos.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-cjc-navy/70 text-white p-2.5 rounded-full hover:bg-cjc-navy transition-colors">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={() => setCurrentBaptismPhoto(p => (p + 1) % baptismPhotos.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-cjc-navy/70 text-white p-2.5 rounded-full hover:bg-cjc-navy transition-colors">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 right-4 bg-cjc-navy/70 text-white text-sm px-3 py-1 rounded-full">
                      {currentBaptismPhoto + 1} / {baptismPhotos.length}
                    </div>
                  </div>
                  <div className="p-7">
                    <span className="bg-cjc-gold/15 text-cjc-gold text-xs font-semibold px-2.5 py-1 rounded-lg">Baptism</span>
                    <h3 className="font-heading text-2xl font-bold text-cjc-navy mt-3 mb-2">Baptism Service — September 7th, 2025</h3>
                    <p className="text-gray-600">We rejoice with the believers who publicly declared their faith through baptism.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FEATURED SERMON
        ══════════════════════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="section-label">God's Word</p>
              <div className="gold-divider">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-cjc-navy">Latest Sermon</h2>
              </div>
              <p className="text-gray-600 text-lg">Stay connected with our latest Bible teachings</p>
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
              <Link href="/services#archive" className="inline-flex items-center gap-2 bg-cjc-navy hover:bg-cjc-blue text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300">
                View All Sermons <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            UPCOMING EVENTS
        ══════════════════════════════════════════════ */}
        <section className="py-24 bg-cjc-cream">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="section-label">What's Happening</p>
              <div className="gold-divider">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-cjc-navy">Upcoming Events</h2>
              </div>
              <p className="text-gray-600 text-lg">Don't miss out on what's happening in our church community</p>
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
              <Link href="/events" className="inline-flex items-center gap-2 bg-cjc-gold hover:bg-cjc-gold-mid text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300">
                View All Events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CALL TO ACTION
        ══════════════════════════════════════════════ */}
        <section className="py-24 bg-cjc-navy text-white relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cjc-gold/5 rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cjc-gold/5 rounded-full" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="w-12 h-0.5 bg-cjc-gold mx-auto mb-8" />
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Join Our Church Family</h2>
            <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether you're new to faith or have been walking with Christ for years, we welcome you to be part of our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-cjc-gold hover:bg-cjc-gold-mid text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-cjc-gold/20">
                Visit Us
              </Link>
              <Link href="/resources/prayer" className="border border-white/30 text-white hover:border-white/70 hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                Share Prayer Request
              </Link>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
        </section>

      </main>

      <Footer />
    </>
  );
}
