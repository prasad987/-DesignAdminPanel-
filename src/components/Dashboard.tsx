import { Users, FileText, TrendingUp, DollarSign } from 'lucide-react';
import { StatCard } from './StatCard';
import { RecentActivity } from './RecentActivity';
import { QuickStats } from './QuickStats';

export function Dashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Content Items',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: FileText,
      color: 'green',
    },
    {
      title: 'Page Views',
      value: '45.2K',
      change: '+23.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple',
    },
    {
      title: 'Revenue',
      value: '$12,543',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'orange',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuickStats />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
