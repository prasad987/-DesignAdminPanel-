import { useState } from 'react';
import { Plus, Edit, Trash2, Save } from 'lucide-react';

export function FooterManager() {
  const footerSections = [
    {
      id: 1,
      title: 'Product',
      links: [
        { id: 1, label: 'AI Agent', url: '/products/ai-agent' },
        { id: 2, label: 'Knowledge Base', url: '/products/knowledge-base' },
        { id: 3, label: 'Ticketing', url: '/products/ticketing' },
        { id: 4, label: 'Analytics', url: '/products/analytics' },
        { id: 5, label: 'Pricing', url: '/pricing' },
      ],
    },
    {
      id: 2,
      title: 'Industries',
      links: [
        { id: 1, label: 'E-commerce', url: '/industries/ecommerce' },
        { id: 2, label: 'Healthcare', url: '/industries/healthcare' },
        { id: 3, label: 'Financial Services', url: '/industries/financial' },
        { id: 4, label: 'Education', url: '/industries/education' },
        { id: 5, label: 'Technology', url: '/industries/technology' },
      ],
    },
    {
      id: 3,
      title: 'Resources',
      links: [
        { id: 1, label: 'Documentation', url: '/resources/docs' },
        { id: 2, label: 'Blog', url: '/blog' },
        { id: 3, label: 'Case Studies', url: '/resources/case-studies' },
        { id: 4, label: 'Help Center', url: '/help' },
        { id: 5, label: 'API Reference', url: '/api' },
      ],
    },
    {
      id: 4,
      title: 'Company',
      links: [
        { id: 1, label: 'About Us', url: '/company/about' },
        { id: 2, label: 'Careers', url: '/company/careers' },
        { id: 3, label: 'Press', url: '/company/press' },
        { id: 4, label: 'Contact', url: '/contact' },
        { id: 5, label: 'Partners', url: '/partners' },
      ],
    },
  ];

  const socialLinks = [
    { id: 1, platform: 'Twitter', url: 'https://twitter.com/decagon', icon: '𝕏' },
    { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com/company/decagon', icon: 'in' },
    { id: 3, platform: 'Facebook', url: 'https://facebook.com/decagon', icon: 'f' },
    { id: 4, platform: 'GitHub', url: 'https://github.com/decagon', icon: 'gh' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Footer Management</h2>
        <p className="text-gray-600 mt-1">Manage footer links, sections, and information</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Footer Sections</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {footerSections.map((section) => (
              <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{section.title}</h4>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.id} className="group flex items-center justify-between text-sm">
                      <span className="text-gray-600">{link.label}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="w-3 h-3 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="mt-3 text-sm text-blue-600 hover:underline">
                  + Add Link
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {socialLinks.map((social) => (
              <div key={social.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center font-semibold">
                  {social.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{social.platform}</p>
                  <p className="text-sm text-gray-500">{social.url}</p>
                </div>
                <div className="flex gap-2">
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
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Plus className="w-4 h-4" />
            Add Social Link
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Footer Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                defaultValue="Decagon AI Inc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
              <input
                type="text"
                defaultValue="© 2024 Decagon. All rights reserved."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input
                type="email"
                defaultValue="support@decagon.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                rows={3}
                defaultValue="123 Innovation Drive, San Francisco, CA 94105"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Legal Links</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    defaultValue="Privacy Policy"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    defaultValue="/privacy"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    defaultValue="Terms of Service"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    defaultValue="/terms"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Save className="w-4 h-4" />
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
