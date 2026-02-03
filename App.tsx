
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Monitor, 
  Cpu, 
  CreditCard, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  Save,
  Wand2,
  RefreshCw
} from 'lucide-react';
import { mockDb } from './services/mockDb';
import { generateSectionContent } from './services/geminiService';
import { AppState } from './types/models';
import { Input, TextArea } from './components/ui/Input';
import { Button } from './components/ui/Button';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [data, setData] = useState<AppState>(mockDb.getData());
  const [isSaving, setIsSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      mockDb.saveData(data);
      setIsSaving(false);
      alert('Data seeded successfully!');
    }, 600);
  };

  const handleAiGenerate = async () => {
    setAiLoading(true);
    const result = await generateSectionContent(activeTab, "A high growth AI company focused on customer support automation");
    if (result) {
      if (activeTab === 'hero' && result.hero) {
        setData(prev => ({ ...prev, hero: { ...prev.hero, ...result.hero } }));
      }
    }
    setAiLoading(false);
  };

  const tabs = [
    { id: 'hero', name: 'Hero Section', icon: Monitor },
    { id: 'services', name: 'Services', icon: Cpu },
    { id: 'pricing', name: 'Pricing', icon: CreditCard },
    { id: 'stats', name: 'Statistics', icon: BarChart3 },
    { id: 'testimonials', name: 'Testimonials', icon: Users },
    { id: 'settings', name: 'Site Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#09090b]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white italic">D</div>
          <span className="font-bold text-xl tracking-tight text-zinc-100">Decagon <span className="text-zinc-500 font-light">Seed</span></span>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id 
                ? 'bg-zinc-800 text-zinc-100 shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800 flex flex-col gap-2">
          <Button variant="ghost" className="justify-start px-3" onClick={mockDb.reset}>
            <RefreshCw size={16} />
            Reset to Default
          </Button>
          <Button variant="ghost" className="justify-start px-3 text-red-500 hover:text-red-400">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 px-8 flex items-center justify-between bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-zinc-100 capitalize">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-3">
            <Button variant="ai" onClick={handleAiGenerate} loading={aiLoading}>
              <Wand2 size={16} />
              AI Suggestions
            </Button>
            <Button variant="primary" onClick={handleSave} loading={isSaving}>
              <Save size={16} />
              Save Changes
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'hero' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 gap-6 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Primary Messaging</h3>
                  <Input 
                    label="Headline" 
                    placeholder="Enter main headline" 
                    value={data.hero.headline}
                    onChange={e => setData({...data, hero: {...data.hero, headline: e.target.value}})}
                  />
                  <TextArea 
                    label="Subheadline" 
                    placeholder="Describe the product value" 
                    value={data.hero.subheadline}
                    onChange={e => setData({...data, hero: {...data.hero, subheadline: e.target.value}})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 col-span-2">Call to Action Buttons</h3>
                  <Input 
                    label="Primary CTA Text" 
                    value={data.hero.ctaText}
                    onChange={e => setData({...data, hero: {...data.hero, ctaText: e.target.value}})}
                  />
                  <Input 
                    label="Secondary CTA Text" 
                    value={data.hero.secondaryCtaText}
                    onChange={e => setData({...data, hero: {...data.hero, secondaryCtaText: e.target.value}})}
                  />
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                {data.services.map((service, idx) => (
                  <div key={service.id} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl flex gap-4 group">
                    <div className="w-12 h-12 bg-indigo-600/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-500">
                      <Cpu size={24} />
                    </div>
                    <div className="flex-1 space-y-4">
                      <Input 
                        label={`Service Title ${idx + 1}`} 
                        value={service.title}
                        onChange={e => {
                          const newServices = [...data.services];
                          newServices[idx].title = e.target.value;
                          setData({...data, services: newServices});
                        }}
                      />
                      <TextArea 
                        label="Description" 
                        value={service.description}
                        onChange={e => {
                          const newServices = [...data.services];
                          newServices[idx].description = e.target.value;
                          setData({...data, services: newServices});
                        }}
                      />
                    </div>
                    <Button variant="danger" className="h-fit self-start opacity-0 group-hover:opacity-100 transition-opacity">
                      Remove
                    </Button>
                  </div>
                ))}
                <Button variant="secondary" className="w-full py-4 border-dashed border-2 border-zinc-800 bg-transparent hover:bg-zinc-900">
                  + Add New Service
                </Button>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
                {data.pricing.map((tier, idx) => (
                  <div key={tier.id} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4 relative overflow-hidden">
                    {tier.isPopular && <div className="absolute top-0 right-0 bg-indigo-600 text-[10px] font-bold px-3 py-1 uppercase tracking-widest text-white">Popular</div>}
                    <Input 
                      label="Tier Name" 
                      value={tier.name}
                      onChange={e => {
                        const newPricing = [...data.pricing];
                        newPricing[idx].name = e.target.value;
                        setData({...data, pricing: newPricing});
                      }}
                    />
                    <div className="flex gap-4">
                      <Input 
                        label="Price ($)" 
                        type="number"
                        className="flex-1"
                        value={tier.price}
                        onChange={e => {
                          const newPricing = [...data.pricing];
                          newPricing[idx].price = e.target.value;
                          setData({...data, pricing: newPricing});
                        }}
                      />
                      <div className="flex flex-col gap-1.5 w-1/3">
                        <label className="text-sm font-medium text-zinc-400">Interval</label>
                        <select className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                          <option>Month</option>
                          <option>Year</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Features</label>
                      {tier.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex gap-2">
                          <input 
                            className="flex-1 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-sm text-zinc-300"
                            value={feature}
                            readOnly
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid grid-cols-2 gap-6 animate-in fade-in duration-500">
                {data.stats.map((stat, idx) => (
                  <div key={idx} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4">
                    <Input 
                      label="Label" 
                      value={stat.label}
                      onChange={e => {
                        const newStats = [...data.stats];
                        newStats[idx].label = e.target.value;
                        setData({...data, stats: newStats});
                      }}
                    />
                    <div className="flex gap-2">
                      <Input 
                        label="Value" 
                        value={stat.value}
                        className="flex-1"
                        onChange={e => {
                          const newStats = [...data.stats];
                          newStats[idx].value = e.target.value;
                          setData({...data, stats: newStats});
                        }}
                      />
                      <Input 
                        label="Suffix" 
                        value={stat.suffix}
                        className="w-20"
                        onChange={e => {
                          const newStats = [...data.stats];
                          newStats[idx].suffix = e.target.value;
                          setData({...data, stats: newStats});
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">SEO Configuration</h3>
                  <Input label="Site Title" defaultValue="Decagon AI | Leading Support Automation" />
                  <TextArea label="Meta Description" defaultValue="The world's most advanced AI agents for customer support, solving complex issues end-to-end." />
                  <Input label="Favicon URL" defaultValue="https://decagon.ai/favicon.ico" />
                </div>
                <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Technical Config</h3>
                  <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg bg-zinc-950">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-200">Production Mode</span>
                      <span className="text-xs text-zinc-500">Enable live data fetching for visitors</span>
                    </div>
                    <div className="w-12 h-6 bg-indigo-600 rounded-full flex items-center px-1">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <footer className="h-8 border-t border-zinc-800 px-4 flex items-center justify-between bg-zinc-950 text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Database Connected</span>
            <span className="flex items-center gap-1">Version 1.4.2-seed</span>
          </div>
          <div>Last saved: {new Date().toLocaleTimeString()}</div>
        </footer>
      </main>
    </div>
  );
};

export default App;
