import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import { Plus, Edit2, Trash2, Users2, Loader2, X, CheckCircle, GripVertical } from 'lucide-react';

interface Leader {
  id: number;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  email: string;
  phone: string;
  order_index: number;
}

const emptyForm = {
  name: '', position: '', bio: '', image_url: '', email: '', phone: '', order_index: '0'
};

export default function AdminLeadership() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchLeaders = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/leadership');
    const data = await res.json();
    setLeaders(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchLeaders(); }, []);

  const handleEdit = (l: Leader) => {
    setForm({
      name: l.name || '', position: l.position || '', bio: l.bio || '',
      image_url: l.image_url || '', email: l.email || '', phone: l.phone || '',
      order_index: l.order_index?.toString() || '0'
    });
    setEditingId(l.id); setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Remove this leader?')) return;
    await fetch(`/api/admin/leadership/${id}`, { method: 'DELETE' });
    showToast('Leader removed'); fetchLeaders();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const body = { ...form, order_index: parseInt(form.order_index) || 0 };
    const url = editingId ? `/api/admin/leadership/${editingId}` : '/api/admin/leadership';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    if (res.ok) {
      showToast(editingId ? 'Updated!' : 'Leader added!');
      setShowForm(false); setEditingId(null); setForm(emptyForm); fetchLeaders();
    } else { const err = await res.json(); showToast(`Error: ${err.error}`); }
    setSaving(false);
  };

  return (
    <AdminLayout title="Leadership Team">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />{toast}
        </div>
      )}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-slate-600">{leaders.length} team member{leaders.length !== 1 ? 's' : ''}</p>
          <button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700 text-sm font-medium">
            <Plus className="w-4 h-4" /> Add Leader
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl my-8">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold">{editingId ? 'Edit Leader' : 'Add Leader'}</h2>
                <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Profile Photo</label>
                  <FileUpload folder="cjc/leadership" accept="image/*" label="Upload Profile Photo"
                    currentUrl={form.image_url} onUpload={url => setForm(f => ({...f, image_url: url}))} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                    <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Position / Role *</label>
                    <input required value={form.position} onChange={e => setForm(f => ({...f, position: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="e.g., Senior Pastor, Elder" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
                    <input type="number" value={form.order_index} onChange={e => setForm(f => ({...f, order_index: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="0 = first" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Bio / Description</label>
                  <textarea value={form.bio} onChange={e => setForm(f => ({...f, bio: e.target.value}))} rows={3}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" placeholder="Brief bio or description of role" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving}
                    className="flex-1 bg-amber-600 text-white py-2.5 rounded-lg font-medium hover:bg-amber-700 disabled:opacity-60 flex items-center justify-center gap-2">
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {saving ? 'Saving...' : editingId ? 'Update Leader' : 'Add Leader'}
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
        ) : leaders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border">
            <Users2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No leadership members yet</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leaders.map(l => (
              <div key={l.id} className="bg-white rounded-xl shadow-sm border p-5 text-center relative group">
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(l)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(l.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <div className="absolute top-3 left-3 text-slate-300">
                  <GripVertical className="w-4 h-4" />
                </div>
                {l.image_url ? (
                  <img src={l.image_url} alt={l.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-slate-100" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-slate-400">{l.name.charAt(0)}</span>
                  </div>
                )}
                <h3 className="font-semibold text-slate-900">{l.name}</h3>
                <p className="text-amber-600 text-sm font-medium mt-0.5">{l.position}</p>
                {l.bio && <p className="text-slate-500 text-xs mt-2 line-clamp-2">{l.bio}</p>}
                {l.email && <p className="text-xs text-blue-500 mt-1 truncate">{l.email}</p>}
                <p className="text-xs text-slate-400 mt-2">Order: {l.order_index}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
