import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function QuickStats() {
  const data = [
    { name: 'Jan', users: 400, views: 2400 },
    { name: 'Feb', users: 300, views: 1398 },
    { name: 'Mar', users: 600, views: 9800 },
    { name: 'Apr', users: 800, views: 3908 },
    { name: 'May', users: 900, views: 4800 },
    { name: 'Jun', users: 1200, views: 3800 },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Users</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Views</span>
        </div>
      </div>
    </div>
  );
}
