import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react';

export function ProductsManager() {
  const products = [
    {
      id: 1,
      name: 'AI Agent',
      description: 'Intelligent automation for customer support',
      features: ['Natural language processing', 'Smart routing', 'Auto-responses', '24/7 availability'],
      status: 'Active',
      icon: '🤖',
    },
    {
      id: 2,
      name: 'Knowledge Base',
      description: 'Self-service support portal',
      features: ['Article management', 'Search functionality', 'Analytics', 'Multi-language'],
      status: 'Active',
      icon: '📚',
    },
    {
      id: 3,
      name: 'Ticketing System',
      description: 'Streamlined ticket management',
      features: ['Automated workflows', 'Priority queues', 'SLA management', 'Collaboration tools'],
      status: 'Active',
      icon: '🎫',
    },
    {
      id: 4,
      name: 'Analytics Dashboard',
      description: 'Real-time insights and reporting',
      features: ['Custom reports', 'Performance metrics', 'Team analytics', 'Export data'],
      status: 'Active',
      icon: '📊',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Products Management</h2>
        <p className="text-gray-600 mt-1">Manage your product offerings and features</p>
      </div>

      <div className="mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
                  {product.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                </div>
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                {product.status}
              </span>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h4>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Page Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
            <input
              type="text"
              defaultValue="Our Products"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Description</label>
            <textarea
              rows={3}
              defaultValue="Discover our suite of AI-powered customer support solutions"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
