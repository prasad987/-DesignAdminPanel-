import { useState } from 'react';
import { Plus, Edit, Trash2, Building2, ShoppingCart, Heart, GraduationCap, DollarSign, Plane } from 'lucide-react';

export function IndustriesManager() {
  const industries = [
    {
      id: 1,
      name: 'E-commerce & Retail',
      icon: ShoppingCart,
      description: 'Handle high-volume customer inquiries during peak seasons',
      useCases: ['Order tracking', 'Returns & refunds', 'Product recommendations', 'Inventory questions'],
      metrics: { satisfaction: '94%', responseTime: '2min', resolution: '85%' },
      color: 'blue',
    },
    {
      id: 2,
      name: 'Healthcare',
      icon: Heart,
      description: 'Provide HIPAA-compliant patient support',
      useCases: ['Appointment scheduling', 'Prescription refills', 'Insurance queries', 'Patient portals'],
      metrics: { satisfaction: '96%', responseTime: '1min', resolution: '88%' },
      color: 'red',
    },
    {
      id: 3,
      name: 'Financial Services',
      icon: DollarSign,
      description: 'Secure and compliant financial support',
      useCases: ['Account management', 'Transaction support', 'Fraud prevention', 'Loan inquiries'],
      metrics: { satisfaction: '92%', responseTime: '3min', resolution: '82%' },
      color: 'green',
    },
    {
      id: 4,
      name: 'Education',
      icon: GraduationCap,
      description: 'Support students and faculty 24/7',
      useCases: ['Course enrollment', 'Technical support', 'Academic advising', 'Campus services'],
      metrics: { satisfaction: '91%', responseTime: '4min', resolution: '80%' },
      color: 'purple',
    },
    {
      id: 5,
      name: 'Travel & Hospitality',
      icon: Plane,
      description: 'Enhance guest experiences across touchpoints',
      useCases: ['Booking assistance', 'Travel updates', 'Concierge services', 'Loyalty programs'],
      metrics: { satisfaction: '95%', responseTime: '2min', resolution: '87%' },
      color: 'orange',
    },
    {
      id: 6,
      name: 'Technology & SaaS',
      icon: Building2,
      description: 'Technical support at scale',
      useCases: ['Product support', 'API documentation', 'Troubleshooting', 'Feature requests'],
      metrics: { satisfaction: '93%', responseTime: '3min', resolution: '84%' },
      color: 'indigo',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    indigo: 'bg-indigo-100 text-indigo-600',
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Industries Management</h2>
        <p className="text-gray-600 mt-1">Manage industry-specific solutions and case studies</p>
      </div>

      <div className="mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add New Industry
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {industries.map((industry) => {
          const Icon = industry.icon;
          return (
            <div key={industry.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[industry.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{industry.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{industry.description}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Common Use Cases:</h4>
                <div className="flex flex-wrap gap-2">
                  {industry.useCases.map((useCase, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Performance Metrics:</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Satisfaction</p>
                    <p className="text-lg font-semibold text-gray-900">{industry.metrics.satisfaction}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Avg Response</p>
                    <p className="text-lg font-semibold text-gray-900">{industry.metrics.responseTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Resolution</p>
                    <p className="text-lg font-semibold text-gray-900">{industry.metrics.resolution}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
