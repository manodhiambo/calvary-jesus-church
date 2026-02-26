import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { Calendar, Mic2, Church, Tv2, Users2, BookOpen, Download, TrendingUp, RefreshCw } from 'lucide-react';

interface Stats {
  events: number;
  sermons: number;
  services: number;
  onlineServices: number;
  leadership: number;
  ministries: number;
  resources: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [events, sermons, services, onlineSrv, leaders, ministries, resources] = await Promise.all([
        fetch('/api/admin/events').then(r => r.json()),
        fetch('/api/admin/sermons').then(r => r.json()),
        fetch('/api/admin/services').then(r => r.json()),
        fetch('/api/admin/online-services').then(r => r.json()),
        fetch('/api/admin/leadership').then(r => r.json()),
        fetch('/api/admin/ministries').then(r => r.json()),
        fetch('/api/admin/resources').then(r => r.json()),
      ]);

      setStats({
        events: Array.isArray(events) ? events.length : 0,
        sermons: Array.isArray(sermons) ? sermons.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        onlineServices: Array.isArray(onlineSrv) ? onlineSrv.length : 0,
        leadership: Array.isArray(leaders) ? leaders.length : 0,
        ministries: Array.isArray(ministries) ? ministries.length : 0,
        resources: Array.isArray(resources) ? resources.length : 0,
      });
    } catch {
      setStats({ events: 0, sermons: 0, services: 0, onlineServices: 0, leadership: 0, ministries: 0, resources: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const cards = [
    { label: 'Upcoming Events', value: stats?.events, icon: Calendar, href: '/admin/events', color: 'bg-blue-500' },
    { label: 'Sermons', value: stats?.sermons, icon: Mic2, href: '/admin/sermons', color: 'bg-purple-500' },
    { label: 'Special Services', value: stats?.services, icon: Church, href: '/admin/services', color: 'bg-amber-500' },
    { label: 'Online Services', value: stats?.onlineServices, icon: Tv2, href: '/admin/online-services', color: 'bg-green-500' },
    { label: 'Leadership Members', value: stats?.leadership, icon: Users2, href: '/admin/leadership', color: 'bg-red-500' },
    { label: 'Ministries', value: stats?.ministries, icon: BookOpen, href: '/admin/ministries', color: 'bg-indigo-500' },
    { label: 'Resources', value: stats?.resources, icon: Download, href: '/admin/resources', color: 'bg-teal-500' },
  ];

  const quickActions = [
    { label: 'Add New Event', href: '/admin/events', color: 'bg-blue-600 hover:bg-blue-700', icon: Calendar },
    { label: 'Upload Sermon', href: '/admin/sermons', color: 'bg-purple-600 hover:bg-purple-700', icon: Mic2 },
    { label: 'Add Leader', href: '/admin/leadership', color: 'bg-red-600 hover:bg-red-700', icon: Users2 },
    { label: 'Add Resource', href: '/admin/resources', color: 'bg-teal-600 hover:bg-teal-700', icon: Download },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
              <p className="text-amber-100">Manage Calvary Jesus Church content from here.</p>
            </div>
            <TrendingUp className="w-12 h-12 text-amber-200 opacity-60" />
          </div>
        </div>

        {/* Database Init Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">First time setup?</p>
              <p className="text-xs text-blue-600 mt-0.5">
                Initialize the database to create all tables and the default admin user.{' '}
                <button
                  onClick={async () => {
                    const key = prompt('Enter init key (default: init-cjc-2024):');
                    if (!key) return;
                    const res = await fetch('/api/admin/init-db', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ initKey: key }),
                    });
                    const data = await res.json();
                    alert(res.ok ? `✅ ${data.message}` : `❌ ${data.error}`);
                    if (res.ok) fetchStats();
                  }}
                  className="underline font-semibold hover:text-blue-800"
                >
                  Click here to initialize →
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Content Overview</h3>
            <button onClick={fetchStats} className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1">
              <RefreshCw className="w-3 h-3" />
              Refresh
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map(({ label, value, icon: Icon, href, color }) => (
              <Link
                key={href}
                href={href}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
              >
                <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  {loading ? '—' : value}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">{label}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map(({ label, href, color, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`${color} text-white rounded-xl p-4 text-center text-sm font-medium transition-colors flex flex-col items-center gap-2`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">Getting Started</h3>
          <ol className="space-y-2 text-sm text-slate-600">
            <li><span className="font-medium text-slate-800">1.</span> Initialize the database using the button above (first time only)</li>
            <li><span className="font-medium text-slate-800">2.</span> Add your Cloudinary credentials to environment variables for file uploads</li>
            <li><span className="font-medium text-slate-800">3.</span> Start adding events, sermons, and leadership team members</li>
            <li><span className="font-medium text-slate-800">4.</span> Content added here will automatically appear on the public website</li>
          </ol>
        </div>
      </div>
    </AdminLayout>
  );
}
