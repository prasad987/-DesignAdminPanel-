import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, MousePointer, Clock } from 'lucide-react';

export function Analytics() {
  const pageViewsData = [
    { name: 'Mon', views: 4000 },
    { name: 'Tue', views: 3000 },
    { name: 'Wed', views: 5000 },
    { name: 'Thu', views: 4500 },
    { name: 'Fri', views: 6000 },
    { name: 'Sat', views: 3500 },
    { name: 'Sun', views: 4000 },
  ];

  const trafficSourceData = [
    { name: 'Direct', value: 400 },
    { name: 'Social', value: 300 },
    { name: 'Search', value: 300 },
    { name: 'Referral', value: 200 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const metrics = [
    { label: 'Avg. Session Duration', value: '3m 24s', icon: Clock, change: '+12%' },
    { label: 'Total Sessions', value: '12,543', icon: Users, change: '+8%' },
    { label: 'Bounce Rate', value: '42.5%', icon: MousePointer, change: '-5%' },
    { label: 'Conversion Rate', value: '3.2%', icon: TrendingUp, change: '+15%' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Analytics</h2>
        <p className="text-gray-600 mt-1">Track your website performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-green-600">{metric.change}</span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{metric.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Page Views</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pageViewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="views" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficSourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {trafficSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {trafficSourceData.map((source, index) => (
              <div key={source.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm text-gray-600">{source.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{source.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
