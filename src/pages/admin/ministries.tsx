import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import { Plus, Edit2, Trash2, BookOpen, Loader2, X, CheckCircle } from 'lucide-react';

interface Ministry {
  id: number;
  name: string;
  description: string;
  image_url: string;
  schedule: string;
  leader_name: string;
  contact_email: string;
  activities: string[];
  age_group: string;
  location: string;
  order_index: number;
}

const emptyForm = {
  name: '', description: '', image_url: '', schedule: '', leader_name: '',
  contact_email: '', activities: '', age_group: '', location: '', order_index: '0'
};

export default function AdminMinistries() {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchMinistries = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/ministries');
    const data = await res.json();
    setMinistries(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchMinistries(); }, []);

  const handleEdit = (m: Ministry) => {
    setForm({
      name: m.name || '', description: m.description || '',
      image_url: m.image_url || '', schedule: m.schedule || '',
      leader_name: m.leader_name || '', contact_email: m.contact_email || '',
      activities: (m.activities || []).join('\n'),
      age_group: m.age_group || '', location: m.location || '',
      order_index: m.order_index?.toString() || '0'
    });
    setEditingId(m.id); setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this ministry?')) return;
    await fetch(`/api/admin/ministries/${id}`, { method: 'DELETE' });
    showToast('Ministry deleted'); fetchMinistries();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const body = {
      ...form,
      activities: form.activities.split('\n').map(a => a.trim()).filter(Boolean),
      order_index: parseInt(form.order_index) || 0
    };
    const url = editingId ? `/api/admin/ministries/${editingId}` : '/api/admin/ministries';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    if (res.ok) {
      showToast(editingId ? 'Updated!' : 'Ministry created!');
      setShowForm(false); setEditingId(null); setForm(emptyForm); fetchMinistries();
    } else { const err = await res.json(); showToast(`Error: ${err.error}`); }
    setSaving(false);
  };

  return (
    <AdminLayout title="Ministries">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />{toast}
        </div>
      )}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-slate-600">{ministries.length} ministr{ministries.length !== 1 ? 'ies' : 'y'}</p>
          <button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700 text-sm font-medium">
            <Plus className="w-4 h-4" /> Add Ministry
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold">{editingId ? 'Edit Ministry' : 'Add Ministry'}</h2>
                <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Ministry Image</label>
                  <FileUpload folder="cjc/ministries" accept="image/*" label="Upload Ministry Image"
                    currentUrl={form.image_url} onUpload={url => setForm(f => ({...f, image_url: url}))} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ministry Name *</label>
                    <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="e.g., Youth Ministry" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Age Group</label>
                    <input value={form.age_group} onChange={e => setForm(f => ({...f, age_group: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="All Ages / Ages 13-18" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Leader</label>
                    <input value={form.leader_name} onChange={e => setForm(f => ({...f, leader_name: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Ministry leader name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
                    <input type="email" value={form.contact_email} onChange={e => setForm(f => ({...f, contact_email: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Schedule</label>
                    <input value={form.schedule} onChange={e => setForm(f => ({...f, schedule: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Sunday 2:00 PM" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                    <input value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Church hall / Main sanctuary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
                    <input type="number" value={form.order_index} onChange={e => setForm(f => ({...f, order_index: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} rows={3}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Activities (one per line)</label>
                  <textarea value={form.activities} onChange={e => setForm(f => ({...f, activities: e.target.value}))} rows={4}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none font-mono"
                    placeholder={"Bible storytelling\nScripture memory verses\nChristian songs"} />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving}
                    className="flex-1 bg-amber-600 text-white py-2.5 rounded-lg font-medium hover:bg-amber-700 disabled:opacity-60 flex items-center justify-center gap-2">
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {saving ? 'Saving...' : editingId ? 'Update Ministry' : 'Create Ministry'}
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
        ) : ministries.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No ministries yet</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ministries.map(m => (
              <div key={m.id} className="bg-white rounded-xl shadow-sm border overflow-hidden group">
                {m.image_url && <img src={m.image_url} alt={m.name} className="w-full h-40 object-cover" />}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{m.name}</h3>
                      {m.age_group && <p className="text-xs text-amber-600 mt-0.5">{m.age_group}</p>}
                      {m.leader_name && <p className="text-xs text-slate-500 mt-1">Leader: {m.leader_name}</p>}
                      {m.schedule && <p className="text-xs text-slate-500">{m.schedule}</p>}
                      {m.activities?.length > 0 && (
                        <p className="text-xs text-slate-400 mt-1">{m.activities.length} activities</p>
                      )}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(m)} className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(m.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
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
