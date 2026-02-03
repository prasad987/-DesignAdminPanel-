import { useState } from 'react';
import { Edit, Plus, Trash2, MoveUp, MoveDown, Eye } from 'lucide-react';

export function HomePageManager() {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'customer-stories', label: 'Customer Stories' },
    { id: 'decagon-difference', label: 'The Decagon Difference' },
    { id: 'unified-platform', label: 'Complete Unified Platform' },
    { id: 'omnichannel', label: 'Omnichannel by Design' },
    { id: 'whats-possible', label: "See What's Possible" },
  ];

  const customerStories = [
    { id: 1, company: 'TechCorp', quote: 'Decagon transformed our customer service', author: 'Sarah Johnson, CEO', image: 'techcorp-logo' },
    { id: 2, company: 'RetailCo', quote: 'Best decision we made this year', author: 'Mike Chen, CTO', image: 'retailco-logo' },
    { id: 3, company: 'FinanceHub', quote: 'Incredible ROI in just 3 months', author: 'Emma Davis, COO', image: 'financehub-logo' },
  ];

  const differencePoints = [
    { id: 1, title: 'AI-Powered Intelligence', description: 'Advanced AI that learns and adapts to your business', icon: 'brain' },
    { id: 2, title: 'Seamless Integration', description: 'Connect with all your existing tools effortlessly', icon: 'link' },
    { id: 3, title: '24/7 Availability', description: 'Always-on support that never sleeps', icon: 'clock' },
    { id: 4, title: 'Scalable Solution', description: 'Grows with your business needs', icon: 'trending-up' },
  ];

  const platformFeatures = [
    { id: 1, title: 'Unified Inbox', description: 'All conversations in one place', status: 'Published' },
    { id: 2, title: 'Smart Routing', description: 'Intelligent ticket distribution', status: 'Published' },
    { id: 3, title: 'Knowledge Base', description: 'Self-service support portal', status: 'Published' },
    { id: 4, title: 'Analytics Dashboard', description: 'Real-time insights and metrics', status: 'Published' },
  ];

  const omnichannelChannels = [
    { id: 1, name: 'Email', enabled: true, icon: 'mail' },
    { id: 2, name: 'Live Chat', enabled: true, icon: 'message-circle' },
    { id: 3, name: 'Phone', enabled: true, icon: 'phone' },
    { id: 4, name: 'SMS', enabled: true, icon: 'smartphone' },
    { id: 5, name: 'Social Media', enabled: true, icon: 'share-2' },
    { id: 6, name: 'Slack', enabled: true, icon: 'slack' },
  ];

  const possibilityCards = [
    { id: 1, title: 'Reduce Response Time', metric: '70%', description: 'faster customer replies', color: 'blue' },
    { id: 2, title: 'Increase Satisfaction', metric: '95%', description: 'customer happiness rate', color: 'green' },
    { id: 3, title: 'Save Costs', metric: '$500K', description: 'annual savings', color: 'purple' },
    { id: 4, title: 'Boost Efficiency', metric: '3x', description: 'more tickets resolved', color: 'orange' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Home Page Management</h2>
        <p className="text-gray-600 mt-1">Manage all sections of your home page</p>
      </div>

      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-0">
            <h3 className="font-medium text-gray-900 mb-3">Page Sections</h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1">
          {activeSection === 'hero' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
                <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                  <input
                    type="text"
                    defaultValue="Transform Your Customer Support with AI"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
                  <textarea
                    rows={3}
                    defaultValue="Decagon helps you deliver exceptional customer experiences with AI-powered support automation"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
                  <input
                    type="text"
                    defaultValue="Get Started"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Link</label>
                  <input
                    type="text"
                    defaultValue="/get-started"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeSection === 'customer-stories' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Customer Stories</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Story
                  </button>
                </div>
                <div className="space-y-4">
                  {customerStories.map((story) => (
                    <div key={story.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{story.company}</h4>
                        <p className="text-sm text-gray-600 mt-1">"{story.quote}"</p>
                        <p className="text-xs text-gray-500 mt-1">— {story.author}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'decagon-difference' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">The Decagon Difference</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Point
                </button>
              </div>
              <div className="space-y-3">
                {differencePoints.map((point, index) => (
                  <div key={point.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <MoveUp className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <MoveDown className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{point.title}</h4>
                      <p className="text-sm text-gray-600">{point.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'unified-platform' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Complete Unified Platform</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </div>
              <div className="space-y-3">
                {platformFeatures.map((feature) => (
                  <div key={feature.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {feature.status}
                      </span>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'omnichannel' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Omnichannel by Design</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Channel
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {omnichannelChannels.map((channel) => (
                  <div key={channel.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-lg">📧</span>
                      </div>
                      <span className="font-medium text-gray-900">{channel.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={channel.enabled} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'whats-possible' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">See What's Possible</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Card
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {possibilityCards.map((card) => (
                  <div key={card.id} className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        card.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        card.color === 'green' ? 'bg-green-100 text-green-600' :
                        card.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {card.color}
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{card.title}</h4>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{card.metric}</p>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
