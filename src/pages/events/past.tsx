import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Filter, Loader2, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MediaCarousel from '@/components/MediaCarousel';

interface DBEvent {
  id: number;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  category?: string;
  image_url?: string;
  is_featured?: boolean;
}

const categoryColors: Record<string, string> = {
  worship:  'bg-blue-100 text-blue-800',
  ministry: 'bg-green-100 text-green-800',
  outreach: 'bg-purple-100 text-purple-800',
  special:  'bg-yellow-100 text-yellow-800',
  general:  'bg-gray-100 text-gray-700',
};

const staticPast: DBEvent[] = [
  { id: -1, title: 'Easter Celebration Service', event_date: '2025-03-31', location: "Nyaduong' Village", category: 'special', description: 'A glorious celebration of Christ\'s resurrection with special music, testimonies, and powerful preaching.' },
  { id: -2, title: 'Youth Conference 2024', event_date: '2024-02-15', location: 'Church Hall', category: 'ministry', description: 'A day-long conference for young people focusing on living for Christ.' },
  { id: -3, title: 'Community Food Drive', event_date: '2024-01-20', location: 'Migori Town Center', category: 'outreach', description: 'Outreach providing food packages to 150 families while sharing the love of Christ.' },
  { id: -4, title: 'Christmas Eve Service', event_date: '2023-12-24', location: "Nyaduong' Village", category: 'worship', description: 'A beautiful candlelight service celebrating the birth of our Savior.' },
];

export default function PastEventsPage() {
  const [events, setEvents] = useState<DBEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('date-desc');

  useEffect(() => {
    fetch('/api/public/events?limit=200')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const past = data.filter((e: DBEvent) => new Date(e.event_date) < new Date());
          setEvents(past.length > 0 ? past : staticPast);
        } else {
          setEvents(staticPast);
        }
      })
      .catch(() => setEvents(staticPast))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...Array.from(new Set(events.map(e => e.category || 'general')))];

  const filtered = events
    .filter(e => category === 'all' || (e.category || 'general') === category)
    .sort((a, b) => {
      if (sort === 'date-asc') return new Date(a.event_date).getTime() - new Date(b.event_date).getTime();
      return new Date(b.event_date).getTime() - new Date(a.event_date).getTime();
    });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cjc-cream">
        <section className="relative py-36 bg-cjc-navy overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
          <div className="container mx-auto px-4 text-center">
            <div className="w-12 h-0.5 bg-cjc-gold mx-auto mb-6" />
            <h1 className="text-4xl font-bold font-heading mb-4 text-white">Past Events</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Relive the memorable moments and see how God has been working in our church community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-md mx-auto text-white">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold">{events.length}</div>
                <div className="text-gray-200 text-sm">Events Recorded</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold">{Array.from(new Set(events.map(e => e.category))).filter(Boolean).length}</div>
                <div className="text-gray-200 text-sm">Categories</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter bar */}

        <section className="bg-white border-b py-4">
          <div className="container mx-auto px-4 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-colors ${category === c ? 'bg-cjc-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {c === 'all' ? 'All' : c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
              </select>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-cjc-gold" /></div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">No past events found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map(event => {
                  const cat = event.category || 'general';
                  const media = event.image_url ? [event.image_url] : [];
                  return (
                    <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      {media.length > 0 ? (
                        <MediaCarousel items={media} autoPlay={false} />
                      ) : (
                        <div className="h-36 bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center">
                          <Calendar className="w-10 h-10 text-white/30" />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex gap-2 mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${categoryColors[cat] || categoryColors.general}`}>{cat}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">Past</span>
                        </div>
                        <h3 className="text-lg font-bold font-heading text-cjc-navy mb-2">{event.title}</h3>
                        <div className="space-y-1 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-cjc-gold" />
                            {new Date(event.event_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-cjc-gold" />
                              {event.location}
                            </div>
                          )}
                        </div>
                        {event.description && <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>}
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
