import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Play, Calendar, User, Search, Filter, FileText, Loader2, BookOpen } from 'lucide-react';
import MediaCarousel from '@/components/MediaCarousel';

interface Sermon {
  id: number;
  title: string;
  speaker?: string;
  sermon_date?: string;
  series?: string;
  scripture_reference?: string;
  description?: string;
  video_url?: string;
  thumbnail_url?: string;
  pdf_url?: string;
  is_featured?: boolean;
}

const staticSermons: Sermon[] = [
  { id: -1, title: 'The Authority of Scripture', speaker: 'Pastor Bruce', series: 'Biblical Foundation', sermon_date: '2024-01-21', description: "Understanding the complete authority and sufficiency of God's Word in our lives." },
  { id: -2, title: 'Salvation Through Faith Alone', speaker: 'Pastor Bruce', series: 'Gospel Essentials', sermon_date: '2024-01-14', description: 'Exploring the biblical truth that salvation comes through faith in Christ alone.' },
  { id: -3, title: 'The Righteousness of God', speaker: 'Pastor Bruce', series: 'Gospel Essentials', sermon_date: '2024-01-07', description: "Understanding God's perfect righteousness and justice." },
  { id: -4, title: 'Biblical Study Methods', speaker: 'Pastor Bruce', series: 'Biblical Foundation', sermon_date: '2023-12-31', description: "How to properly study and interpret God's Word verse by verse." },
];

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [series, setSeries] = useState('all');
  const [speaker, setSpeaker] = useState('all');

  useEffect(() => {
    fetch('/api/public/sermons?limit=100')
      .then(r => r.json())
      .then(data => setSermons(Array.isArray(data) && data.length > 0 ? data : staticSermons))
      .catch(() => setSermons(staticSermons))
      .finally(() => setLoading(false));
  }, []);

  const seriesList = ['all', ...Array.from(new Set(sermons.map(s => s.series).filter(Boolean)))];
  const speakerList = ['all', ...Array.from(new Set(sermons.map(s => s.speaker).filter(Boolean)))];

  const filtered = sermons.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
      (s.description || '').toLowerCase().includes(search.toLowerCase());
    const matchSeries = series === 'all' || s.series === series;
    const matchSpeaker = speaker === 'all' || s.speaker === speaker;
    return matchSearch && matchSeries && matchSpeaker;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sermon Archive</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            "Unleashing God's truth one verse at a time" — Explore our collection of biblical teachings
          </p>
        </div>
      </section>

      <section className="py-6 bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search sermons..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <Filter className="w-4 h-4 text-gray-400" />
                <select value={series} onChange={e => setSeries(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  {seriesList.map(s => <option key={s} value={s}>{s === 'all' ? 'All Series' : s}</option>)}
                </select>
              </div>
              <select value={speaker} onChange={e => setSpeaker(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                {speakerList.map(s => <option key={s} value={s}>{s === 'all' ? 'All Speakers' : s}</option>)}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No sermons found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(sermon => {
                const media = [sermon.video_url, sermon.thumbnail_url].filter(Boolean) as string[];
                return (
                  <div key={sermon.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {media.length > 0 ? (
                      <MediaCarousel items={media} autoPlay={false} />
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white/40" />
                      </div>
                    )}
                    <div className="p-5">
                      {sermon.series && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mb-2">{sermon.series}</span>
                      )}
                      {sermon.is_featured && (
                        <span className="inline-block bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full mb-2 ml-1">Featured</span>
                      )}
                      <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">{sermon.title}</h3>
                      {sermon.scripture_reference && (
                        <p className="text-xs text-amber-600 font-medium mb-2">{sermon.scripture_reference}</p>
                      )}
                      {sermon.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{sermon.description}</p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        {sermon.speaker && <span className="flex items-center gap-1"><User className="w-3 h-3" />{sermon.speaker}</span>}
                        {sermon.sermon_date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(sermon.sermon_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>}
                      </div>
                      {sermon.pdf_url && (
                        <a href={sermon.pdf_url} target="_blank" rel="noreferrer"
                          className="mt-3 flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium">
                          <FileText className="w-3 h-3" /> Download Sermon Notes (PDF)
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us for Live Services</h2>
          <p className="text-blue-100 mb-6">Experience God's Word taught verse by verse every Sunday</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="bg-blue-800 rounded-lg p-5">
              <h3 className="font-semibold mb-1">Nyaduong' Village</h3>
              <p className="text-blue-200 text-sm">Sundays: 9:00 AM – 12:00 PM</p>
            </div>
            <div className="bg-blue-800 rounded-lg p-5">
              <h3 className="font-semibold mb-1">Bible Study</h3>
              <p className="text-blue-200 text-sm">Wednesdays: 6:00 PM – 8:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
