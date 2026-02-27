import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Book, Download, Search, Calendar, FileText, Loader2, Users } from 'lucide-react';
import MediaCarousel from '@/components/MediaCarousel';

interface Resource {
  id: number;
  title: string;
  description?: string;
  resource_type: string;
  file_url?: string;
  thumbnail_url?: string;
  category?: string;
  author?: string;
  created_at?: string;
}

const staticMaterials: Resource[] = [
  { id: -1, title: 'Understanding Biblical Authority', resource_type: 'bible-study', category: 'Doctrine', description: 'A comprehensive study on the complete authority and sufficiency of Scripture (2 Timothy 3:16-17).', author: 'Pastor Bruce', created_at: '2024-01-15' },
  { id: -2, title: 'The Gospel According to Romans', resource_type: 'bible-study', category: 'Book Study', description: "Verse-by-verse study through Paul's letter to the Romans, focusing on justification by faith alone.", author: 'Pastor Bruce', created_at: '2024-01-10' },
  { id: -3, title: 'Salvation: By Grace Through Faith', resource_type: 'bible-study', category: 'Doctrine', description: 'Exploring the biblical truth that salvation is by grace alone, through faith alone, in Christ alone.', author: 'Pastor Bruce', created_at: '2024-01-05' },
  { id: -4, title: 'Proper Bible Study Methods', resource_type: 'bible-study', category: 'Methodology', description: 'Learn how to study Scripture using proper hermeneutical principles and verse-by-verse exposition.', author: 'Pastor Bruce', created_at: '2023-12-20' },
  { id: -5, title: 'The Ten Commandments and the Law', resource_type: 'bible-study', category: 'Old Testament', description: "Understanding God's moral law and its role in revealing our need for a Savior.", author: 'Pastor Bruce', created_at: '2023-12-15' },
  { id: -6, title: 'Jesus Christ: The Only Way', resource_type: 'bible-study', category: 'Christology', description: "Biblical examination of Christ's exclusive claim in John 14:6.", author: 'Pastor Bruce', created_at: '2023-12-10' },
];

export default function BibleStudyPage() {
  const [materials, setMaterials] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetch('/api/public/resources?type=bible-study')
      .then(r => r.json())
      .then(data => setMaterials(Array.isArray(data) && data.length > 0 ? data : staticMaterials))
      .catch(() => setMaterials(staticMaterials))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...Array.from(new Set(materials.map(m => m.category).filter(Boolean)))];

  const filtered = materials.filter(m =>
    (category === 'all' || m.category === category) &&
    (m.title.toLowerCase().includes(search.toLowerCase()) || (m.description || '').toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-cjc-cream">
      <Header />

      <section className="relative py-36 bg-cjc-navy overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
        <div className="container mx-auto px-4 text-center">
          <div className="w-12 h-0.5 bg-cjc-gold mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-white">Bible Study Resources</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            "Study to show yourself approved to God, a worker who does not need to be ashamed,
            rightly dividing the word of truth." — 2 Timothy 2:15
          </p>
        </div>
      </section>

      <section className="py-5 bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search study materials..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Book className="w-4 h-4 text-gray-400" />
            <select value={category} onChange={e => setCategory(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
              {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-cjc-gold" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">No study materials found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(m => {
                const media = [m.thumbnail_url, m.file_url].filter(u => u && !/\.pdf$/i.test(u || '')) as string[];
                return (
                  <div key={m.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {media.length > 0 && <MediaCarousel items={media} autoPlay={false} />}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{m.category || m.resource_type}</span>
                        {m.author && <span className="text-xs text-gray-400 flex items-center gap-1"><Users className="w-3 h-3" />{m.author}</span>}
                      </div>
                      <h3 className="text-lg font-bold font-heading text-cjc-navy mb-2 line-clamp-2">{m.title}</h3>
                      {m.description && <p className="text-sm text-gray-600 mb-4 line-clamp-3">{m.description}</p>}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        {m.created_at && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(m.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>}
                      </div>
                      {m.file_url && (
                        <a href={m.file_url} target="_blank" rel="noreferrer"
                          className="w-full bg-cjc-gold hover:bg-cjc-gold-mid text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                          {/\.pdf$/i.test(m.file_url) ? <><FileText className="w-4 h-4" />Download PDF</> : <><Download className="w-4 h-4" />Download</>}
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

      <section className="bg-cjc-cream py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold font-heading text-cjc-navy mb-8 text-center">Our Bible Study Approach</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Book, title: 'Scripture Alone', text: "We believe the Bible is complete and nothing outside it claimed to be from God is true." },
              { icon: Search, title: 'Verse by Verse', text: "Our teaching involves careful, systematic exposition of Scripture, one verse at a time." },
              { icon: Users, title: 'Community Learning', text: "Join our Bible study groups to learn together and grow in understanding of God's Word." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white rounded-lg p-6 shadow-sm">
                <Icon className="w-8 h-8 text-cjc-gold mb-3" />
                <h3 className="text-lg font-semibold font-heading mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
