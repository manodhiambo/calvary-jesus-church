import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import { Plus, Edit2, Trash2, Church, Loader2, X, CheckCircle, Image as ImageIcon } from 'lucide-react';

interface ChurchService {
  id: number;
  title: string;
  description: string;
  service_type: string;
  service_date: string;
  media_urls: string[];
}

const emptyForm = { title: '', description: '', service_type: 'baptism', service_date: '', media_urls: [] as string[] };

export default function AdminServices() {
  const [services, setServices] = useState<ChurchService[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchServices = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/services');
    const data = await res.json();
    setServices(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleEdit = (s: ChurchService) => {
    setForm({
      title: s.title || '', description: s.description || '',
      service_type: s.service_type || 'baptism',
      service_date: s.service_date ? s.service_date.substring(0, 10) : '',
      media_urls: s.media_urls || []
    });
    setEditingId(s.id); setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this service?')) return;
    await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
    showToast('Service deleted'); fetchServices();
  };

  const addMediaUrl = (url: string) => {
    if (url) setForm(f => ({ ...f, media_urls: [...f.media_urls, url] }));
  };

  const removeMediaUrl = (idx: number) => {
    setForm(f => ({ ...f, media_urls: f.media_urls.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const url = editingId ? `/api/admin/services/${editingId}` : '/api/admin/services';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
    });
    if (res.ok) {
      showToast(editingId ? 'Service updated!' : 'Service created!');
      setShowForm(false); setEditingId(null); setForm(emptyForm); fetchServices();
    } else { const err = await res.json(); showToast(`Error: ${err.error}`); }
    setSaving(false);
  };

  return (
    <AdminLayout title="Special Services">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />{toast}
        </div>
      )}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-slate-600">{services.length} service{services.length !== 1 ? 's' : ''}</p>
          <button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700 text-sm font-medium">
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold">{editingId ? 'Edit Service' : 'Add Special Service'}</h2>
                <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                  <input required value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="e.g., Baptism Service - September 2025" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Service Type</label>
                    <select value={form.service_type} onChange={e => setForm(f => ({...f, service_type: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                      <option value="baptism">Baptism</option>
                      <option value="communion">Communion / Lord's Supper</option>
                      <option value="easter">Easter Service</option>
                      <option value="christmas">Christmas Service</option>
                      <option value="dedication">Child Dedication</option>
                      <option value="ordination">Ordination</option>
                      <option value="special">Other Special Service</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                    <input type="date" value={form.service_date} onChange={e => setForm(f => ({...f, service_date: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} rows={3}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
                </div>

                {/* Media Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <ImageIcon className="w-4 h-4 inline mr-1" />Photos & Videos ({form.media_urls.length} uploaded)
                  </label>
                  <FileUpload folder="cjc/services" accept="image/*,video/*"
                    label="Upload Photo or Video" onUpload={addMediaUrl} />
                  {form.media_urls.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {form.media_urls.map((url, i) => (
                        <div key={i} className="relative group">
                          {url.includes('/video/') || url.match(/\.(mp4|webm)$/i) ? (
                            <video src={url} className="w-full h-24 object-cover rounded-lg" />
                          ) : (
                            <img src={url} alt="" className="w-full h-24 object-cover rounded-lg" />
                          )}
                          <button type="button" onClick={() => removeMediaUrl(i)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving}
                    className="flex-1 bg-amber-600 text-white py-2.5 rounded-lg font-medium hover:bg-amber-700 disabled:opacity-60 flex items-center justify-center gap-2">
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {saving ? 'Saving...' : editingId ? 'Update Service' : 'Create Service'}
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
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <Church className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No special services yet</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {services.map(s => (
              <div key={s.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{s.title}</h3>
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">{s.service_type}</span>
                    </div>
                    {s.service_date && <p className="text-sm text-slate-500 mt-1">{new Date(s.service_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>}
                    {s.description && <p className="text-sm text-slate-600 mt-1 line-clamp-2">{s.description}</p>}
                    {s.media_urls?.length > 0 && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {s.media_urls.slice(0, 5).map((url, i) => (
                          <img key={i} src={url} alt="" className="w-12 h-12 object-cover rounded-lg border border-slate-200" />
                        ))}
                        {s.media_urls.length > 5 && <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-500">+{s.media_urls.length - 5}</div>}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(s)} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(s.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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
