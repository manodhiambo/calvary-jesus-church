import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import { Plus, Edit2, Trash2, Tv2, Loader2, X, CheckCircle, Radio } from 'lucide-react';

interface OnlineService {
  id: number;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  service_date: string;
  is_live: boolean;
  live_url: string;
  duration_minutes: number;
}

const emptyForm = {
  title: '', description: '', video_url: '', thumbnail_url: '',
  service_date: '', is_live: false, live_url: '', duration_minutes: ''
};

export default function AdminOnlineServices() {
  const [services, setServices] = useState<OnlineService[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchServices = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/online-services');
    const data = await res.json();
    setServices(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleEdit = (s: OnlineService) => {
    setForm({
      title: s.title || '', description: s.description || '',
      video_url: s.video_url || '', thumbnail_url: s.thumbnail_url || '',
      service_date: s.service_date ? s.service_date.substring(0, 10) : '',
      is_live: s.is_live || false, live_url: s.live_url || '',
      duration_minutes: s.duration_minutes?.toString() || ''
    });
    setEditingId(s.id); setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this online service?')) return;
    await fetch(`/api/admin/online-services/${id}`, { method: 'DELETE' });
    showToast('Deleted'); fetchServices();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const body = { ...form, duration_minutes: form.duration_minutes ? parseInt(form.duration_minutes) : null };
    const url = editingId ? `/api/admin/online-services/${editingId}` : '/api/admin/online-services';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    if (res.ok) {
      showToast(editingId ? 'Updated!' : 'Created!');
      setShowForm(false); setEditingId(null); setForm(emptyForm); fetchServices();
    } else { const err = await res.json(); showToast(`Error: ${err.error}`); }
    setSaving(false);
  };

  return (
    <AdminLayout title="Online Services">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />{toast}
        </div>
      )}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-slate-600">{services.length} online service{services.length !== 1 ? 's' : ''}</p>
          <button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700 text-sm font-medium">
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold">{editingId ? 'Edit Online Service' : 'Add Online Service'}</h2>
                <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                  <input required value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Sunday Service - Jan 19, 2025" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Service Date</label>
                    <input type="date" value={form.service_date} onChange={e => setForm(f => ({...f, service_date: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Duration (minutes)</label>
                    <input type="number" value={form.duration_minutes} onChange={e => setForm(f => ({...f, duration_minutes: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="180" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} rows={3}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
                </div>
                {/* Video Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Service Video</label>
                  <FileUpload folder="cjc/online-services" accept="video/*" label="Upload Service Video"
                    currentUrl={form.video_url} onUpload={url => setForm(f => ({...f, video_url: url}))} />
                  <div className="mt-2">
                    <input value={form.video_url} onChange={e => setForm(f => ({...f, video_url: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Or paste YouTube/Facebook Live URL" />
                  </div>
                </div>
                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Thumbnail</label>
                  <FileUpload folder="cjc/online-services/thumbs" accept="image/*" label="Upload Thumbnail"
                    currentUrl={form.thumbnail_url} onUpload={url => setForm(f => ({...f, thumbnail_url: url}))} />
                </div>
                {/* Live settings */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="is_live" checked={form.is_live}
                      onChange={e => setForm(f => ({...f, is_live: e.target.checked}))} className="w-4 h-4 accent-green-600" />
                    <label htmlFor="is_live" className="text-sm font-medium text-green-800 flex items-center gap-2">
                      <Radio className="w-4 h-4" /> Currently Live
                    </label>
                  </div>
                  {form.is_live && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Live Stream URL</label>
                      <input value={form.live_url} onChange={e => setForm(f => ({...f, live_url: e.target.value}))}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="https://youtube.com/live/..." />
                    </div>
                  )}
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving}
                    className="flex-1 bg-amber-600 text-white py-2.5 rounded-lg font-medium hover:bg-amber-700 disabled:opacity-60 flex items-center justify-center gap-2">
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {saving ? 'Saving...' : editingId ? 'Update' : 'Add Service'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className="px-6 border border-slate-300 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-amber-600" /></div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border">
            <Tv2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No online services yet</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {services.map(s => (
              <div key={s.id} className="bg-white rounded-xl shadow-sm border p-5 flex gap-4">
                {s.thumbnail_url && <img src={s.thumbnail_url} alt={s.title} className="w-24 h-16 object-cover rounded-lg flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{s.title}</h3>
                        {s.is_live && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse"><Radio className="w-2 h-2" />LIVE</span>}
                      </div>
                      {s.service_date && <p className="text-sm text-slate-500 mt-1">{new Date(s.service_date).toLocaleDateString()}</p>}
                      <div className="flex gap-2 mt-1">
                        {s.video_url && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Video</span>}
                        {s.duration_minutes && <span className="text-xs text-slate-500">{s.duration_minutes} min</span>}
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
