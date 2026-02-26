import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import { Plus, Edit2, Trash2, Mic2, Star, Loader2, X, CheckCircle } from 'lucide-react';

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  series: string;
  scripture_reference: string;
  description: string;
  video_url: string;
  audio_url: string;
  pdf_url: string;
  thumbnail_url: string;
  duration_minutes: number;
  sermon_date: string;
  views: number;
  is_featured: boolean;
}

const emptyForm = {
  title: '', speaker: 'Pastor Bruce', series: '', scripture_reference: '',
  description: '', video_url: '', audio_url: '', pdf_url: '',
  thumbnail_url: '', duration_minutes: '', sermon_date: '', is_featured: false
};

export default function AdminSermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchSermons = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/sermons');
    const data = await res.json();
    setSermons(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchSermons(); }, []);

  const handleEdit = (s: Sermon) => {
    setForm({
      title: s.title || '', speaker: s.speaker || 'Pastor Bruce',
      series: s.series || '', scripture_reference: s.scripture_reference || '',
      description: s.description || '', video_url: s.video_url || '',
      audio_url: s.audio_url || '', pdf_url: s.pdf_url || '',
      thumbnail_url: s.thumbnail_url || '',
      duration_minutes: s.duration_minutes?.toString() || '',
      sermon_date: s.sermon_date ? s.sermon_date.substring(0, 10) : '',
      is_featured: s.is_featured || false
    });
    setEditingId(s.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this sermon?')) return;
    await fetch(`/api/admin/sermons/${id}`, { method: 'DELETE' });
    showToast('Sermon deleted');
    fetchSermons();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const body = { ...form, duration_minutes: form.duration_minutes ? parseInt(form.duration_minutes) : null };
    const url = editingId ? `/api/admin/sermons/${editingId}` : '/api/admin/sermons';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      showToast(editingId ? 'Sermon updated!' : 'Sermon created!');
      setShowForm(false); setEditingId(null); setForm(emptyForm);
      fetchSermons();
    } else {
      const err = await res.json();
      showToast(`Error: ${err.error}`);
    }
    setSaving(false);
  };

  return (
    <AdminLayout title="Sermon Archive">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />{toast}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-slate-600">{sermons.length} sermon{sermons.length !== 1 ? 's' : ''}</p>
          <button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700 text-sm font-medium">
            <Plus className="w-4 h-4" /> Add Sermon
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold">{editingId ? 'Edit Sermon' : 'Add Sermon'}</h2>
                <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                    <input required value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Sermon title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Speaker</label>
                    <input value={form.speaker} onChange={e => setForm(f => ({...f, speaker: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                    <input type="date" value={form.sermon_date} onChange={e => setForm(f => ({...f, sermon_date: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Series</label>
                    <input value={form.series} onChange={e => setForm(f => ({...f, series: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="e.g., Romans, Genesis" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Scripture Reference</label>
                    <input value={form.scripture_reference} onChange={e => setForm(f => ({...f, scripture_reference: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="e.g., John 3:16" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Duration (minutes)</label>
                    <input type="number" value={form.duration_minutes} onChange={e => setForm(f => ({...f, duration_minutes: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="60" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} rows={3}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" placeholder="Brief description of the sermon" />
                  </div>
                  {/* Video Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Video</label>
                    <FileUpload folder="cjc/sermons/videos" accept="video/*" label="Upload Video (MP4, etc.)"
                      currentUrl={form.video_url} onUpload={url => setForm(f => ({...f, video_url: url}))} />
                    <div className="mt-2">
                      <input value={form.video_url} onChange={e => setForm(f => ({...f, video_url: e.target.value}))}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Or paste YouTube/video URL" />
                    </div>
                  </div>
                  {/* PDF Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">PDF Notes / Document</label>
                    <FileUpload folder="cjc/sermons/pdfs" accept=".pdf,application/pdf" label="Upload PDF"
                      currentUrl={form.pdf_url} onUpload={url => setForm(f => ({...f, pdf_url: url}))} />
                    {form.pdf_url && (
                      <input value={form.pdf_url} onChange={e => setForm(f => ({...f, pdf_url: e.target.value}))}
                        className="w-full mt-2 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="PDF URL" />
                    )}
                  </div>
                  {/* Thumbnail */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Thumbnail Image</label>
                    <FileUpload folder="cjc/sermons/thumbnails" accept="image/*" label="Upload Thumbnail"
                      currentUrl={form.thumbnail_url} onUpload={url => setForm(f => ({...f, thumbnail_url: url}))} />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="is_featured" checked={form.is_featured}
                      onChange={e => setForm(f => ({...f, is_featured: e.target.checked}))} className="w-4 h-4 accent-amber-600" />
                    <label htmlFor="is_featured" className="text-sm font-medium text-slate-700">Featured on Homepage</label>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving}
                    className="flex-1 bg-amber-600 text-white py-2.5 rounded-lg font-medium hover:bg-amber-700 disabled:opacity-60 flex items-center justify-center gap-2">
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {saving ? 'Saving...' : editingId ? 'Update Sermon' : 'Add Sermon'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className="px-6 border border-slate-300 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-amber-600" /></div>
        ) : sermons.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <Mic2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No sermons yet</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {sermons.map(s => (
              <div key={s.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex gap-4">
                {s.thumbnail_url && <img src={s.thumbnail_url} alt={s.title} className="w-20 h-16 object-cover rounded-lg flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-slate-900">{s.title}</h3>
                        {s.is_featured && <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><Star className="w-3 h-3" />Featured</span>}
                        {s.series && <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">{s.series}</span>}
                      </div>
                      <p className="text-sm text-slate-500 mt-1">{s.speaker} {s.sermon_date && `• ${new Date(s.sermon_date).toLocaleDateString()}`} {s.scripture_reference && `• ${s.scripture_reference}`}</p>
                      <div className="flex gap-3 mt-2">
                        {s.video_url && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Video</span>}
                        {s.pdf_url && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">PDF</span>}
                        {s.audio_url && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Audio</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(s)} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(s.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
