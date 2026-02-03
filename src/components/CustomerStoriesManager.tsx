import { useState } from 'react';
import { Plus, Edit, Trash2, Star, TrendingUp, Users } from 'lucide-react';

export function CustomerStoriesManager() {
  const stories = [
    {
      id: 1,
      company: 'TechCorp Inc.',
      industry: 'Technology',
      logo: '🏢',
      featured: true,
      quote: 'Decagon transformed our customer support operations, reducing response times by 70%',
      author: 'Sarah Johnson',
      position: 'VP of Customer Success',
      results: [
        { metric: '70%', label: 'Faster responses' },
        { metric: '95%', label: 'CSAT score' },
        { metric: '$500K', label: 'Annual savings' },
      ],
      status: 'Published',
      publishDate: '2024-01-15',
    },
    {
      id: 2,
      company: 'RetailHub',
      industry: 'E-commerce',
      logo: '🛍️',
      featured: true,
      quote: 'The AI agent handles 80% of our customer inquiries automatically',
      author: 'Mike Chen',
      position: 'CTO',
      results: [
        { metric: '80%', label: 'Automation rate' },
        { metric: '3x', label: 'More tickets resolved' },
        { metric: '24/7', label: 'Support coverage' },
      ],
      status: 'Published',
      publishDate: '2024-02-20',
    },
    {
      id: 3,
      company: 'FinanceHub',
      industry: 'Financial Services',
      logo: '💰',
      featured: false,
      quote: 'Incredible ROI in just 3 months. Our customers love the instant responses',
      author: 'Emma Davis',
      position: 'Chief Operating Officer',
      results: [
        { metric: '3 months', label: 'Time to ROI' },
        { metric: '92%', label: 'Customer satisfaction' },
        { metric: '60%', label: 'Cost reduction' },
      ],
      status: 'Published',
      publishDate: '2024-03-10',
    },
    {
      id: 4,
      company: 'HealthFirst',
      industry: 'Healthcare',
      logo: '🏥',
      featured: false,
      quote: 'HIPAA-compliant support that our patients trust',
      author: 'Dr. James Wilson',
      position: 'Medical Director',
      results: [
        { metric: '100%', label: 'HIPAA compliant' },
        { metric: '50K', label: 'Patients served' },
        { metric: '4.9/5', label: 'Patient rating' },
      ],
      status: 'Draft',
      publishDate: '2024-04-05',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Customer Stories</h2>
        <p className="text-gray-600 mt-1">Manage customer testimonials and case studies</p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            All Stories
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            Featured
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            Published
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            Drafts
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add New Story
        </button>
      </div>

      <div className="space-y-6">
        {stories.map((story) => (
          <div key={story.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-3xl">
                  {story.logo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{story.company}</h3>
                    {story.featured && (
                      <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        <Star className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      story.status === 'Published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {story.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{story.industry} • Published {story.publishDate}</p>
                  <blockquote className="text-gray-700 italic mb-3">
                    "{story.quote}"
                  </blockquote>
                  <p className="text-sm text-gray-600">
                    — <span className="font-medium">{story.author}</span>, {story.position}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Key Results:</h4>
              <div className="grid grid-cols-3 gap-4">
                {story.results.map((result, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600 mb-1">{result.metric}</p>
                    <p className="text-xs text-gray-600">{result.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
