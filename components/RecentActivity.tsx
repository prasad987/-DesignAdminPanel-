import { UserPlus, FileText, Settings, Trash2 } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'user',
      message: 'New user registered',
      user: 'John Doe',
      time: '5 minutes ago',
      icon: UserPlus,
      color: 'blue',
    },
    {
      id: 2,
      type: 'content',
      message: 'New content published',
      user: 'Jane Smith',
      time: '15 minutes ago',
      icon: FileText,
      color: 'green',
    },
    {
      id: 3,
      type: 'settings',
      message: 'Settings updated',
      user: 'Admin',
      time: '1 hour ago',
      icon: Settings,
      color: 'purple',
    },
    {
      id: 4,
      type: 'delete',
      message: 'Content deleted',
      user: 'Mike Johnson',
      time: '2 hours ago',
      icon: Trash2,
      color: 'red',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${colorClasses[activity.color as keyof typeof colorClasses]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.user}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
