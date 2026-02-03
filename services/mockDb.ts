
import { AppState } from '../types/models';

const STORAGE_KEY = 'decagon_admin_data';

const DEFAULT_DATA: AppState = {
  hero: {
    headline: "Generative AI for High-Stakes Customer Support",
    subheadline: "Decagon's AI agents solve complex customer issues end-to-end, so your team doesn't have to.",
    ctaText: "Book a Demo",
    secondaryCtaText: "View Case Studies"
  },
  services: [
    { id: '1', title: 'Automated Resolutions', description: 'Solve 70% of tickets without human intervention.', icon: 'Zap' },
    { id: '2', title: 'Deep Integration', description: 'Connects with your CRM, helpdesk, and internal tools.', icon: 'Layers' },
    { id: '3', title: 'Advanced Reasoning', description: 'Handles nuanced queries that standard bots fail on.', icon: 'Cpu' }
  ],
  pricing: [
    { id: 'p1', name: 'Starter', price: '499', interval: 'month', features: ['Up to 1k resolutions', 'Slack support', 'Core integrations'], isPopular: false },
    { id: 'p2', name: 'Growth', price: '1499', interval: 'month', features: ['Up to 5k resolutions', 'Dedicated CSM', 'Custom models'], isPopular: true }
  ],
  stats: [
    { label: 'Resolutions', value: '10M', suffix: '+' },
    { label: 'Accuracy', value: '99', suffix: '%' }
  ],
  footer: {
    copyright: '© 2024 Decagon AI Inc.',
    socialLinks: [{ platform: 'LinkedIn', url: '#' }, { platform: 'Twitter', url: '#' }],
    address: 'San Francisco, CA'
  }
};

export const mockDb = {
  getData: (): AppState => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_DATA;
  },
  saveData: (data: AppState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  reset: () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }
};
