import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import { Plus, Edit2, Trash2, Calendar, Star, Loader2, X, CheckCircle } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  end_date: string;
  location: string;
  category: string;
  image_url: string;
  is_featured: boolean;
  registration_required: boolean;
  max_attendees: number;
  status: string;
}

const emptyForm = {
  title: '', description: '', event_date: '', end_date: '', location: '',
  category: 'general', image_url: '', is_featured: false,
  registration_required: false, max_attendees: '', status: 'upcoming'
};

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchEvents = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/events');
    const data = await res.json();
    setEvents(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleEdit = (ev: Event) => {
    setForm({
      title: ev.title || '', description: ev.description || '',
      event_date: ev.event_date ? ev.event_date.substring(0, 16) : '',
      end_date: ev.end_date ? ev.end_date.substring(0, 16) : '',
      location: ev.location || '', category: ev.category || 'general',
      image_url: ev.image_url || '', is_featured: ev.is_featured || false,
      registration_required: ev.registration_required || false,
      max_attendees: ev.max_attendees?.toString() || '', status: ev.status || 'upcoming'
    });
    setEditingId(ev.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this event?')) return;
    await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
    showToast('Event deleted');
    fetchEvents();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const body = { ...form, max_attendees: form.max_attendees ? parseInt(form.max_attendees) : null };
    const url = editingId ? `/api/admin/events/${editingId}` : '/api/admin/events';
    const method = editingId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    if (res.ok) {
      showToast(editingId ? 'Event updated!' : 'Event created!');
      setShowForm(false); setEditingId(null); setForm(emptyForm);
      fetchEvents();
    } else {
      const err = await res.json();
      showToast(`Error: ${err.error}`);
    }
    setSaving(false);
  };

  return (
    <AdminLayout title="Events Management">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />{toast}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-slate-600">{events.length} event{events.length !== 1 ? 's' : ''} total</p>
          <button
            onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add Event
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingId ? 'Edit Event' : 'Add New Event'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                    <input required value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Event title" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} rows={3}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" placeholder="Event description" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Date & Time *</label>
                    <input required type="datetime-local" value={form.event_date} onChange={e => setForm(f => ({...f, event_date: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">End Date & Time</label>
                    <input type="datetime-local" value={form.end_date} onChange={e => setForm(f => ({...f, end_date: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                    <input value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Event location" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                      <option value="general">General</option>
                      <option value="worship">Worship</option>
                      <option value="prayer">Prayer</option>
                      <option value="study">Bible Study</option>
                      <option value="outreach">Outreach</option>
                      <option value="special">Special Event</option>
                      <option value="youth">Youth</option>
                      <option value="children">Children</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="past">Past</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Max Attendees</label>
                    <input type="number" value={form.max_attendees} onChange={e => setForm(f => ({...f, max_attendees: e.target.value}))}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Leave blank for unlimited" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Event Image</label>
                    <FileUpload folder="cjc/events" accept="image/*" label="Upload Event Image"
                      currentUrl={form.image_url} onUpload={url => setForm(f => ({...f, image_url: url}))} />
                    {form.image_url && (
                      <div className="mt-2">
                        <label className="block text-xs text-slate-500 mb-1">Or enter URL directly:</label>
                        <input value={form.image_url} onChange={e => setForm(f => ({...f, image_url: e.target.value}))}
                          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="is_featured" checked={form.is_featured}
                      onChange={e => setForm(f => ({...f, is_featured: e.target.checked}))} className="w-4 h-4 accent-amber-600" />
                    <label htmlFor="is_featured" className="text-sm font-medium text-slate-700">Featured Event</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="reg_req" checked={form.registration_required}
                      onChange={e => setForm(f => ({...f, registration_required: e.target.checked}))} className="w-4 h-4 accent-amber-600" />
                    <label htmlFor="reg_req" className="text-sm font-medium text-slate-700">Registration Required</label>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving}
                    className="flex-1 bg-amber-600 text-white py-2.5 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {saving ? 'Saving...' : editingId ? 'Update Event' : 'Create Event'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className="px-6 border border-slate-300 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Events List */}
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-amber-600" /></div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No events yet</p>
            <p className="text-slate-400 text-sm">Click "Add Event" to create your first event</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {events.map(ev => (
              <div key={ev.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex gap-4 items-start">
                {ev.image_url && (
                  <img src={ev.image_url} alt={ev.title} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-slate-900">{ev.title}</h3>
                        {ev.is_featured && <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><Star className="w-3 h-3" />Featured</span>}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          ev.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                          ev.status === 'past' ? 'bg-slate-100 text-slate-600' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>{ev.status}</span>
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{ev.category}</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">
                        {new Date(ev.event_date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {ev.location && <p className="text-sm text-slate-500">{ev.location}</p>}
                      {ev.description && <p className="text-sm text-slate-600 mt-2 line-clamp-2">{ev.description}</p>}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => handleEdit(ev)} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(ev.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
