import { useState } from 'react';
import { Edit, Save, Users, Target, Award, Briefcase } from 'lucide-react';

export function CompanyManager() {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About Us' },
    { id: 'team', label: 'Team' },
    { id: 'careers', label: 'Careers' },
    { id: 'press', label: 'Press & Media' },
  ];

  const teamMembers = [
    { id: 1, name: 'John Smith', role: 'CEO & Founder', bio: 'Former VP at leading tech company', image: '👨‍💼' },
    { id: 2, name: 'Sarah Johnson', role: 'CTO', bio: '15+ years in AI/ML development', image: '👩‍💻' },
    { id: 3, name: 'Mike Chen', role: 'Head of Product', bio: 'Product leader from Fortune 500', image: '👨‍💼' },
    { id: 4, name: 'Emma Davis', role: 'VP of Customer Success', bio: 'Customer experience expert', image: '👩‍💼' },
  ];

  const jobListings = [
    { id: 1, title: 'Senior Software Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time' },
    { id: 2, title: 'Product Manager', department: 'Product', location: 'San Francisco', type: 'Full-time' },
    { id: 3, title: 'Customer Success Manager', department: 'Customer Success', location: 'Remote', type: 'Full-time' },
    { id: 4, title: 'Marketing Manager', department: 'Marketing', location: 'New York', type: 'Full-time' },
  ];

  const pressReleases = [
    { id: 1, title: 'Decagon Raises $50M Series B', date: '2024-03-15', type: 'Funding' },
    { id: 2, title: 'New AI Features Launch', date: '2024-02-20', type: 'Product' },
    { id: 3, title: 'Partnership with Major Retailer', date: '2024-01-10', type: 'Partnership' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Company Information</h2>
        <p className="text-gray-600 mt-1">Manage company details, team, careers, and press</p>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'about' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Story</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mission Statement</label>
                <textarea
                  rows={3}
                  defaultValue="To revolutionize customer support through AI-powered automation, making exceptional service accessible to every business."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                <textarea
                  rows={5}
                  defaultValue="Decagon is the leading AI-powered customer support platform, trusted by thousands of companies worldwide. Founded in 2020, we're on a mission to transform how businesses interact with their customers."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Our Vision</h4>
              <p className="text-sm text-gray-600">Make world-class customer support accessible to every business</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Our Values</h4>
              <p className="text-sm text-gray-600">Innovation, customer-first, transparency, and excellence</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Our Team</h4>
              <p className="text-sm text-gray-600">150+ talented people across 20 countries</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Team Member
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl">
                    {member.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-blue-600 mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                    <div className="flex gap-2 mt-3">
                      <button className="text-sm text-blue-600 hover:underline">Edit</button>
                      <button className="text-sm text-red-600 hover:underline">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'careers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Careers Page Content</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                <input
                  type="text"
                  defaultValue="Join Our Mission"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  defaultValue="We're building the future of customer support. Join our team of innovators."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Open Positions</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add Position
              </button>
            </div>
            <div className="space-y-3">
              {jobListings.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'press' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Press Releases</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add Press Release
              </button>
            </div>
            <div className="space-y-3">
              {pressReleases.map((release) => (
                <div key={release.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{release.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                      <span>{release.date}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {release.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Kit</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Upload Logo
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Press Contact Email</label>
                <input
                  type="email"
                  defaultValue="press@decagon.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
