import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import { Plus, Edit2, Trash2, Download, Loader2, X, CheckCircle, BookOpen, Mic2 } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  resource_type: string;
  file_url: string;
  thumbnail_url: string;
  category: string;
  author: string;
  download_count: number;
}

const emptyForm = {
  title: '', description: '', resource_type: 'sermon', file_url: '',
  thumbnail_url: '', category: '', author: ''
};

const resourceTypes = [
  { value: 'sermon', label: 'Sermon', icon: Mic2 },
  { value: 'bible-study', label: 'Bible Study', icon: BookOpen },
  { value: 'download', label: 'Download / Document', icon: Download },
];

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [activeType, setActiveType] = useState('all');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchResources = async () => {
    setLoading(true);
    const url = activeType === 'all' ? '/api/admin/resources' : `/api/admin/resources?type=${activeType}`;
    const res = await fetch(url);
    const data = await res.json();
    setResources(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchResources(); }, [activeType]);

  const handleEdit = (r: Resource) => {
    setForm({
      title: r.title || '', description: r.description || '',
      resource_type: r.resource_type || 'sermon', file_url: r.file_url || '',
      thumbnail_url: r.thumbnail_url || '', category: r.category || '', author: r.author || ''
    });
    setEditingId(r.id); setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this resource?')) return;
    await fetch(`/api/admin/resources/${id}`, { method: 'DELETE' });
    showToast('Resource deleted'); fetchResources();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const url = editingId ? `/api/admin/resources/${editingId}` : '/api/admin/resources';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
    });
    if (res.ok) {
      showToast(editingId ? 'Updated!' : 'Resource added!');
      setShowForm(false); setEditingId(null); setForm(emptyForm); fetchResources();
    } else { const err = await res.json(); showToast(`Error: ${err.error}`); }
    setSaving(false);
  };

  const filteredResources = activeType === 'all' ? resources : resources.filter(r => r.resource_type === activeType);

  return (
    <AdminLayout title="Resources">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />{toast}
        </div>
      )}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {['all', 'sermon', 'bible-study', 'download'].map(t => (
              <button key={t} onClick={() => setActiveType(t)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeType === t ? 'bg-amber-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}>
                {t === 'all' ? 'All' : t === 'bible-study' ? 'Bible Study' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700 text-sm font-medium">
            <Plus className="w-4 h-4" /> Add Resource
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold">{editingId ? 'Edit Resource' : 'Add Resource'}</h2>
                <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Resource Type *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {resourceTypes.map(({ value, label, icon: Icon }) => (
                      <button key={value} type="button" onClick={() => setForm(f => ({...f, resource_type: value}))}
                        className={`flex items-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          form.resource_type === value ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}>
                        <Icon className="w-4 h-4" />{label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                  <input required value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Resource title" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Author / Speaker</label>
                    <input value={form.author} onChange={e => setForm(f => ({...f, author: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Pastor Bruce" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <input value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="e.g., Romans, Prayer" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} rows={2}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
                </div>
                {/* File Upload - accepts both PDFs and videos */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">File Upload</label>
                  <FileUpload
                    folder={`cjc/resources/${form.resource_type}`}
                    accept=".pdf,application/pdf,video/*,image/*"
                    label="Upload PDF, Video, or Image"
                    currentUrl={form.file_url}
                    onUpload={url => setForm(f => ({...f, file_url: url}))}
                  />
                  <div className="mt-2">
                    <input value={form.file_url} onChange={e => setForm(f => ({...f, file_url: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Or paste URL (YouTube, PDF link, etc.)" />
                  </div>
                </div>
                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Thumbnail (optional)</label>
                  <FileUpload folder="cjc/resources/thumbs" accept="image/*" label="Upload Thumbnail"
                    currentUrl={form.thumbnail_url} onUpload={url => setForm(f => ({...f, thumbnail_url: url}))} />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving}
                    className="flex-1 bg-amber-600 text-white py-2.5 rounded-lg font-medium hover:bg-amber-700 disabled:opacity-60 flex items-center justify-center gap-2">
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {saving ? 'Saving...' : editingId ? 'Update Resource' : 'Add Resource'}
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
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border">
            <Download className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No resources yet</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredResources.map(r => (
              <div key={r.id} className="bg-white rounded-xl shadow-sm border p-4 flex gap-4">
                {r.thumbnail_url && <img src={r.thumbnail_url} alt={r.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{r.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          r.resource_type === 'sermon' ? 'bg-purple-100 text-purple-700' :
                          r.resource_type === 'bible-study' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>{r.resource_type}</span>
                      </div>
                      {r.author && <p className="text-sm text-slate-500 mt-0.5">By {r.author}</p>}
                      {r.category && <p className="text-xs text-amber-600 mt-0.5">{r.category}</p>}
                      <div className="flex gap-2 mt-1">
                        {r.file_url && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">File attached</span>}
                        {r.download_count > 0 && <span className="text-xs text-slate-400">{r.download_count} downloads</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(r)} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(r.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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
