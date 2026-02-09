import { useState } from 'react';
import { Plus, Edit, Trash2, FileText, Video, Download, BookOpen } from 'lucide-react';

export function ResourcesManager() {
  const resources = [
    {
      id: 1,
      title: 'Complete Guide to AI Customer Support',
      type: 'Guide',
      icon: BookOpen,
      description: 'Learn how to implement AI-powered support in your organization',
      category: 'Best Practices',
      downloads: 1234,
      publishDate: '2024-01-15',
      status: 'Published',
    },
    {
      id: 2,
      title: 'Product Demo Video',
      type: 'Video',
      icon: Video,
      description: 'Watch a complete walkthrough of Decagon features',
      category: 'Product Tour',
      views: 5678,
      publishDate: '2024-02-10',
      status: 'Published',
    },
    {
      id: 3,
      title: 'ROI Calculator Template',
      type: 'Template',
      icon: Download,
      description: 'Calculate your potential savings with Decagon',
      category: 'Tools',
      downloads: 892,
      publishDate: '2024-03-05',
      status: 'Published',
    },
    {
      id: 4,
      title: 'Customer Support Metrics Whitepaper',
      type: 'Whitepaper',
      icon: FileText,
      description: 'Industry benchmarks and best practices',
      category: 'Research',
      downloads: 2341,
      publishDate: '2024-03-20',
      status: 'Published',
    },
    {
      id: 5,
      title: 'API Integration Guide',
      type: 'Documentation',
      icon: BookOpen,
      description: 'Technical documentation for developers',
      category: 'Technical',
      downloads: 567,
      publishDate: '2024-04-01',
      status: 'Draft',
    },
  ];

  const categories = ['All', 'Best Practices', 'Product Tour', 'Tools', 'Research', 'Technical'];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Resources Management</h2>
        <p className="text-gray-600 mt-1">Manage guides, whitepapers, videos, and other resources</p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Resource
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <div key={resource.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                          {resource.type}
                        </span>
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                          {resource.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          resource.status === 'Published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {resource.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>📅 {resource.publishDate}</span>
                    <span>
                      {resource.type === 'Video' 
                        ? `👁️ ${resource.views} views`
                        : `⬇️ ${resource.downloads} downloads`
                      }
                    </span>
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

      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Center Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Headline</label>
            <input
              type="text"
              defaultValue="Resources to Help You Succeed"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Description</label>
            <textarea
              rows={3}
              defaultValue="Explore our guides, templates, and resources to get the most out of Decagon"
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
