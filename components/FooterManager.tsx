import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, Loader2, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { toast } from 'sonner';
import { homePageApi } from '../api';

interface FooterLink {
  id: number;
  label: string;
  url: string;
}

interface FooterSection {
  id: number;
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

interface LegalLink {
  id: number;
  label: string;
  url: string;
}

export function FooterManager() {
  const [footerSections, setFooterSections] = useState<FooterSection[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [globalInfo, setGlobalInfo] = useState({
    companyName: '',
    copyright: '',
    email: '',
    address: ''
  });
  const [legalLinks, setLegalLinks] = useState<LegalLink[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newLinkData, setNewLinkData] = useState({ label: '', url: '' });
  const [isSavingAll, setIsSavingAll] = useState(false);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    setIsLoading(true);
    try {
      const response = await homePageApi.getHomePageSettings();
      if (Array.isArray(response)) {
        const footerConfig = response.find((item: any) => item.section === "Global Footer Configuration");
        if (footerConfig && footerConfig.data) {
          const { navigation, socials, contact, legal } = footerConfig.data;
          if (navigation) setFooterSections(navigation);
          if (socials) setSocialLinks(socials);
          if (contact) setGlobalInfo(contact);
          if (legal) setLegalLinks(legal);
        } else {
          // Set defaults if no data found
          setFooterSections([
            { id: 1, title: 'Product', links: [] },
            { id: 2, title: 'Industries', links: [] }
          ]);
          setSocialLinks([
            { id: 1, platform: 'Twitter', url: '', icon: '𝕏' },
            { id: 2, platform: 'LinkedIn', url: '', icon: 'in' }
          ]);
          setGlobalInfo({
            companyName: 'Decagon AI Inc.',
            copyright: '© 2024 Decagon. All rights reserved.',
            email: 'support@decagon.com',
            address: '123 Innovation Drive, San Francisco, CA 94105'
          });
          setLegalLinks([
            { id: 1, label: 'Privacy Policy', url: '/privacy' },
            { id: 2, label: 'Terms of Service', url: '/terms' }
          ]);
        }
      }
    } catch (error) {
      toast.error('Failed to load footer settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) {
      toast.error('Section title is required');
      return;
    }
    const newSection: FooterSection = {
      id: Date.now(),
      title: newSectionTitle,
      links: [],
    };
    setFooterSections([...footerSections, newSection]);
    setNewSectionTitle('');
    setIsAddModalOpen(false);
    toast.success('Footer section added');
  };

  const handleOpenAddLink = (sectionId: number) => {
    setActiveSectionId(sectionId);
    setNewLinkData({ label: '', url: '' });
    setIsAddLinkModalOpen(true);
  };

  const handleAddLink = () => {
    if (!newLinkData.label.trim() || !newLinkData.url.trim()) {
      toast.error('Label and URL are required');
      return;
    }
    if (activeSectionId === null) return;
    const newLink: FooterLink = { id: Date.now(), label: newLinkData.label, url: newLinkData.url };
    setFooterSections(prev => prev.map(section => 
      section.id === activeSectionId ? { ...section, links: [...section.links, newLink] } : section
    ));
    setIsAddLinkModalOpen(false);
    toast.success('Link added');
  };

  const handleSaveAllChanges = async () => {
    setIsSavingAll(true);
    try {
      const payload = {
        navigation: footerSections,
        socials: socialLinks,
        contact: globalInfo,
        legal: legalLinks
      };
      await homePageApi.saveGlobalFooterSettings(payload);
      toast.success('Global footer settings saved successfully');
    } catch (error) {
      toast.error('Failed to save global footer settings');
    } finally {
      setIsSavingAll(false);
    }
  };

  const updateLegalLink = (id: number, field: keyof LegalLink, value: string) => {
    setLegalLinks(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const addLegalLink = () => {
    setLegalLinks([...legalLinks, { id: Date.now(), label: '', url: '' }]);
  };

  const removeLegalLink = (id: number) => {
    setLegalLinks(legalLinks.filter(l => l.id !== id));
  };

  const removeSection = (id: number) => {
    setFooterSections(footerSections.filter(s => s.id !== id));
    toast.success('Section removed');
  };

  const removeLink = (sectionId: number, linkId: number) => {
    setFooterSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, links: section.links.filter(l => l.id !== linkId) } : section
    ));
    toast.success('Link removed');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50/50">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <RefreshCw className="w-4 h-4 text-blue-300" />
          </div>
        </div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">Syncing footer settings...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 font-sans">Footer Management</h2>
        <p className="text-gray-600 mt-1">Manage global footer links, social media, and legal information</p>
      </div>

      <div className="space-y-6">
        {/* NAV SECTIONS */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Navigation Columns</h3>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add Section
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {footerSections.map((section) => (
              <div key={section.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50/20 group hover:bg-white transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">{section.title}</h4>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-red-500" onClick={() => removeSection(section.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {section.links.map((link) => (
                    <li key={link.id} className="group/link flex items-center justify-between text-sm">
                      <span className="text-gray-600 truncate mr-2">{link.label}</span>
                      <button className="p-1 hover:bg-gray-100 rounded text-red-400 opacity-0 group-hover/link:opacity-100" onClick={() => removeLink(section.id, link.id)}>
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:bg-blue-50 border border-dashed border-blue-100" onClick={() => handleOpenAddLink(section.id)}>
                  <Plus className="w-3 h-3 mr-1" /> Add Link
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialLinks.map((social) => (
              <div key={social.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold">{social.icon}</div>
                <div className="flex-1">
                  <Input value={social.url} onChange={(e) => setSocialLinks(prev => prev.map(s => s.id === social.id ? {...s, url: e.target.value} : s))} className="h-8" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GLOBAL INFO */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Global Footer Information</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input value={globalInfo.companyName} onChange={e => setGlobalInfo({...globalInfo, companyName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Copyright Text</Label>
                <Input value={globalInfo.copyright} onChange={e => setGlobalInfo({...globalInfo, copyright: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Contact Email</Label>
              <Input value={globalInfo.email} onChange={e => setGlobalInfo({...globalInfo, email: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input value={globalInfo.address} onChange={e => setGlobalInfo({...globalInfo, address: e.target.value})} />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Legal Links</h4>
              <div className="space-y-3">
                {legalLinks.map((legal) => (
                  <div key={legal.id} className="flex items-center gap-2">
                    <Input placeholder="Label" value={legal.label} onChange={e => updateLegalLink(legal.id, 'label', e.target.value)} className="flex-1" />
                    <Input placeholder="URL" value={legal.url} onChange={e => updateLegalLink(legal.id, 'url', e.target.value)} className="flex-1" />
                    <Button variant="ghost" size="icon" className="text-red-400" onClick={() => removeLegalLink(legal.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-4 text-blue-600" onClick={addLegalLink}>
                <Plus className="w-4 h-4 mr-1" /> Add Legal Link
              </Button>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-100">
              <Button onClick={handleSaveAllChanges} disabled={isSavingAll} className="bg-blue-600 hover:bg-blue-700 min-w-[200px] text-white">
                {isSavingAll ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                Save All Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader><DialogTitle>Add Footer Section</DialogTitle></DialogHeader>
          <div className="py-4">
            <Label>Section Title</Label>
            <Input 
              className="mt-[5px]" 
              value={newSectionTitle} 
              onChange={e => setNewSectionTitle(e.target.value)} 
              placeholder="e.g. Resources" 
            />
          </div>
          <DialogFooter><Button onClick={handleAddSection} className="bg-blue-600 text-white">Create Section</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddLinkModalOpen} onOpenChange={setIsAddLinkModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader><DialogTitle>Add New Link</DialogTitle></DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label>Link Label</Label>
              <Input 
                className="mt-[5px]" 
                value={newLinkData.label} 
                onChange={e => setNewLinkData({...newLinkData, label: e.target.value})} 
                placeholder="e.g. About Us" 
              />
            </div>
            <div>
              <Label>Link URL</Label>
              <Input 
                className="mt-[5px]" 
                value={newLinkData.url} 
                onChange={e => setNewLinkData({...newLinkData, url: e.target.value})} 
                placeholder="e.g. /about" 
              />
            </div>
          </div>
          <DialogFooter><Button onClick={handleAddLink} className="bg-blue-600 text-white">Add Link</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}