import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Filter, Loader2, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import MediaCarousel from '@/components/MediaCarousel';

interface DBEvent {
  id: number;
  title: string;
  description?: string;
  event_date: string;
  end_date?: string;
  location?: string;
  category?: string;
  image_url?: string;
  status?: string;
  is_featured?: boolean;
}

const categoryColors: Record<string, string> = {
  worship:  'bg-cjc-gold/15 text-cjc-gold',
  ministry: 'bg-cjc-gold/15 text-cjc-gold',
  outreach: 'bg-cjc-gold/15 text-cjc-gold',
  special:  'bg-cjc-gold/15 text-cjc-gold',
  general:  'bg-gray-100 text-gray-600',
};

const isPast = (dateStr: string) => new Date(dateStr) < new Date();

export default function EventsPage() {
  const [events, setEvents] = useState<DBEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    fetch('/api/public/events?limit=100')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setEvents(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...Array.from(new Set(events.map(e => e.category || 'general')))];

  const filtered = events
    .filter(e => category === 'all' || (e.category || 'general') === category)
    .filter(e => tab === 'past' ? isPast(e.event_date) : !isPast(e.event_date))
    .sort((a, b) =>
      tab === 'past'
        ? new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
        : new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    );

  const upcomingCount = events.filter(e => !isPast(e.event_date)).length;
  const pastCount = events.filter(e => isPast(e.event_date)).length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative py-36 bg-cjc-navy overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="w-12 h-0.5 bg-cjc-gold mx-auto mb-6" />
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6">Church Events</h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10">
              Join us as we worship, learn, and serve together as a church community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/events/upcoming" className="bg-cjc-gold hover:bg-cjc-gold-mid text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">Upcoming Events</Link>
              <Link href="/events/calendar" className="border border-white/40 text-white hover:bg-white hover:text-cjc-navy px-6 py-3 rounded-xl font-semibold transition-all duration-300">View Calendar</Link>
              <Link href="/events/past" className="border border-white/40 text-white hover:bg-white hover:text-cjc-navy px-6 py-3 rounded-xl font-semibold transition-all duration-300">Past Events</Link>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
        </section>

        {/* Tabs + Filter */}
        <section className="bg-white border-b border-gray-100 sticky top-0 z-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3">
              <div className="flex gap-1">
                <button onClick={() => setTab('upcoming')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'upcoming' ? 'bg-cjc-gold text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  Upcoming {upcomingCount > 0 && <span className="ml-1 opacity-80">({upcomingCount})</span>}
                </button>
                <button onClick={() => setTab('past')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'past' ? 'bg-cjc-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  Past {pastCount > 0 && <span className="ml-1 opacity-80">({pastCount})</span>}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select value={category} onChange={e => setCategory(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none capitalize"
                >
                  {categories.map(c => (
                    <option key={c} value={c} className="capitalize">{c === 'all' ? 'All Categories' : c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-cjc-gold" /></div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">No {tab} events found</h3>
                <p className="text-gray-400">
                  {tab === 'upcoming'
                    ? 'Check back soon or view past events.'
                    : 'No past events recorded yet.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map(event => {
                  const past = isPast(event.event_date);
                  const cat = event.category || 'general';
                  const media = event.image_url ? [event.image_url] : [];
                  return (
                    <div key={event.id} className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${event.is_featured ? 'ring-2 ring-amber-400' : ''}`}>
                      {event.is_featured && (
                        <div className="bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs text-center py-1.5 font-semibold">
                          ⭐ Featured Event
                        </div>
                      )}
                      {media.length > 0 ? (
                        <MediaCarousel items={media} autoPlay={false} className="rounded-t-none" />
                      ) : (
                        <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                          <Calendar className="w-12 h-12 text-white/30" />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${categoryColors[cat] || categoryColors.general}`}>
                            {cat}
                          </span>
                          {past ? (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">Past</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Upcoming</span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                        <div className="space-y-1.5 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            <span>{new Date(event.event_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                          )}
                        </div>
                        {event.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
