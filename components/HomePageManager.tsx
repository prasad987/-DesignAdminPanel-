import { useState, useEffect } from 'react';
import { Edit, Plus, Trash2, Eye, Save, Loader2, Info, FileText, RefreshCw } from 'lucide-react';
import { homePageApi, CustomerStoryData } from '../api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { toast } from 'sonner';

interface CustomerStory {
  id: number;
  company_logo: string;
  stories: string;
  customer_name: string;
  designation: string;
  percentage: number;
  short_summary: string;
}

interface ChannelDetail {
  headline: string;
  title: string;
}

export function HomePageManager() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isSavingHero, setIsSavingHero] = useState(false);
  const [isSavingStory, setIsSavingStory] = useState(false);
  const [isSavingDifference, setIsSavingDifference] = useState(false);
  const [isSavingOmnichannel, setIsSavingOmnichannel] = useState(false);
  const [isSavingPossible, setIsSavingPossible] = useState(false);
  const [isSavingResourceHub, setIsSavingResourceHub] = useState(false);
  const [isSavingHomeFooter, setIsSavingHomeFooter] = useState(false);
  const [isLoadingStories, setIsLoadingStories] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Hero Section State
  const [heroData, setHeroData] = useState({
    headline: 'Transform Your Customer Support with AI',
    subheadline: 'Decagon helps you deliver exceptional customer experiences with AI-powered support automation',
    ctaText: 'Get Started',
    ctaLink: '/get-started'
  });

  // Decagon Resource Hub State
  const [resourceHubData, setResourceHubData] = useState({
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3',
    headline: 'Explore the Decagon Resource Hub',
    button_name: 'View Hub',
    button_link: '/resources'
  });

  // Home Footer State
  const [homeFooterData, setHomeFooterData] = useState({
    headline: 'Ready to transform your support?',
    button_name: 'Book a Demo',
    button_link: '/demo'
  });

  // Omnichannel State
  const [omnichannelDetails, setOmnichannelDetails] = useState<ChannelDetail[]>([
    { headline: 'Seamless Experience', title: 'Email & Chat' },
    { headline: 'Instant Voice', title: 'Phone & SMS' }
  ]);

  // See What's Possible State
  const [possibleData, setPossibleData] = useState({
    headline: "See What's Possible"
  });

  // The Decagon Difference State
  const [differenceData, setDifferenceData] = useState({
    title1: 'AI-Powered Intelligence',
    headline: 'Advanced AI that learns and adapts to your business',
    title2: 'Built for Scale',
    button_name: 'Learn More',
    button_link: '/ai-tech'
  });

  const [customerStories, setCustomerStories] = useState<CustomerStory[]>([]);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<CustomerStory | null>(null);
  const [storyFormData, setStoryFormData] = useState<Omit<CustomerStory, 'id'>>({
    company_logo: '🏢',
    stories: '',
    customer_name: '',
    designation: '',
    percentage: 0,
    short_summary: ''
  });
  const [storyToDelete, setStoryToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsInitialLoading(true);
    try {
      await Promise.all([
        fetchHomePageData(),
        fetchStories()
      ]);
    } catch (error) {
      console.error("Error loading dashboard data", error);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const fetchHomePageData = async () => {
    try {
      const response = await homePageApi.getHomePageSettings();
      if (Array.isArray(response)) {
        response.forEach((item: any) => {
          switch (item.section) {
            case "Hero Section":
              if (item.data) {
                setHeroData({
                  headline: item.data.headline || '',
                  subheadline: item.data.subheadline || '',
                  ctaText: item.data.cta_button_text || item.data.ctaText || '',
                  ctaLink: item.data.cta_button_link || item.data.ctaLink || '',
                });
              }
              break;
            case "Omnichannel by Design":
              if (item.data?.details) setOmnichannelDetails(item.data.details);
              break;
            case "Decagon Resource Hub":
              if (item.data) setResourceHubData(item.data);
              break;
            case "Home Footer":
              if (item.data) setHomeFooterData(item.data);
              break;
            case "See What's Possible":
              if (item.data) setPossibleData(item.data);
              break;
            case "The Decagon Difference":
              if (item.data) setDifferenceData(item.data);
              break;
          }
        });

        // Fallback for legacy flat hero structure
        const heroItem = response.find(i => i.headline && !i.section);
        if (heroItem && !response.find(i => i.section === "Hero Section")) {
          setHeroData({
            headline: heroItem.headline,
            subheadline: heroItem.subheadline,
            ctaText: heroItem.cta_button_text || heroItem.ctaText,
            ctaLink: heroItem.cta_button_link || heroItem.ctaLink,
          });
        }
      }
    } catch (error) {
      toast.error('Failed to load homepage sections');
    }
  };

  const fetchStories = async () => {
    setIsLoadingStories(true);
    try {
      const data = await homePageApi.getCustomerStories();
      setCustomerStories(data as CustomerStory[]);
    } catch (error) {
      toast.error('Failed to load customer stories');
    } finally {
      setIsLoadingStories(false);
    }
  };

  const sections = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'resource-hub', label: 'Decagon Resource Hub' },
    { id: 'omnichannel', label: 'Omnichannel by Design' },
    { id: 'customer-stories', label: 'Customer Stories' },
    { id: 'decagon-difference', label: 'The Decagon Difference' },
    { id: 'whats-possible', label: "See What's Possible" },
    { id: 'home-footer', label: 'Home Footer Section' },
    { id: 'unified-platform', label: 'Complete Unified Platform' },
  ];

  const handleSaveHero = async () => {
    setIsSavingHero(true);
    try {
      await homePageApi.saveHeroSection(heroData);
      toast.success('Hero section updated successfully');
    } catch (error) {
      toast.error('Failed to update hero section');
    } finally {
      setIsSavingHero(false);
    }
  };

  const handleSaveResourceHub = async () => {
    setIsSavingResourceHub(true);
    try {
      await homePageApi.saveResourceHub(resourceHubData);
      toast.success('Resource Hub section updated');
    } catch (error) {
      toast.error('Failed to update Resource Hub section');
    } finally {
      setIsSavingResourceHub(false);
    }
  };

  const handleSaveHomeFooter = async () => {
    setIsSavingHomeFooter(true);
    try {
      await homePageApi.saveHomeFooter(homeFooterData);
      toast.success('Home Footer updated');
    } catch (error) {
      toast.error('Failed to update Home Footer');
    } finally {
      setIsSavingHomeFooter(false);
    }
  };

  const handleSaveOmnichannel = async () => {
    setIsSavingOmnichannel(true);
    try {
      const cleanedDetails = omnichannelDetails.filter(d => d.headline.trim() || d.title.trim());
      await homePageApi.saveOmnichannelSection({ details: cleanedDetails });
      toast.success('Omnichannel details updated');
    } catch (error) {
      toast.error('Failed to update Omnichannel section');
    } finally {
      setIsSavingOmnichannel(false);
    }
  };

  const handleSavePossible = async () => {
    setIsSavingPossible(true);
    try {
      await homePageApi.savePossibleSection(possibleData);
      toast.success('Possible section updated successfully');
    } catch (error) {
      toast.error('Failed to update section');
    } finally {
      setIsSavingPossible(false);
    }
  };

  const addOmniDetail = () => {
    setOmnichannelDetails([...omnichannelDetails, { headline: '', title: '' }]);
  };

  const removeOmniDetail = (index: number) => {
    const newDetails = omnichannelDetails.filter((_, i) => i !== index);
    setOmnichannelDetails(newDetails.length > 0 ? newDetails : [{ headline: '', title: '' }]);
  };

  const updateOmniDetail = (index: number, field: keyof ChannelDetail, value: string) => {
    const newDetails = [...omnichannelDetails];
    newDetails[index] = { ...newDetails[index], [field]: value };
    setOmnichannelDetails(newDetails);
  };

  const handleSaveDifference = async () => {
    setIsSavingDifference(true);
    try {
      await homePageApi.saveHomePageSection('The Decagon Difference', differenceData);
      toast.success('Decagon Difference updated');
    } catch (error) {
      toast.error('Failed to update Decagon Difference');
    } finally {
      setIsSavingDifference(false);
    }
  };

  const handleOpenStoryModal = (story?: CustomerStory) => {
    if (story) {
      setEditingStory(story);
      setStoryFormData({
        company_logo: story.company_logo,
        stories: story.stories,
        customer_name: story.customer_name,
        designation: story.designation,
        percentage: story.percentage,
        short_summary: story.short_summary
      });
    } else {
      setEditingStory(null);
      setStoryFormData({ company_logo: '🏢', stories: '', customer_name: '', designation: '', percentage: 0, short_summary: '' });
    }
    setIsStoryModalOpen(true);
  };

  const handleSaveStory = async () => {
    setIsSavingStory(true);
    try {
      if (editingStory) {
        await homePageApi.updateCustomerStory(editingStory.id, storyFormData as CustomerStoryData);
        toast.success('Story updated');
      } else {
        await homePageApi.createCustomerStory(storyFormData as CustomerStoryData);
        toast.success('Story added');
      }
      fetchStories();
      setIsStoryModalOpen(false);
    } catch (error) {
      toast.error('Failed to save story');
    } finally {
      setIsSavingStory(false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50/50">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <RefreshCw className="w-4 h-4 text-blue-300" />
          </div>
        </div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">Syncing workspace settings...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Home Page Management</h2>
        <p className="text-gray-600 mt-1">Manage all sections of your home page in a clean, simple workspace</p>
      </div>

      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-8">
            <h3 className="font-medium text-gray-900 mb-3 px-3">Page Sections</h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1 max-w-4xl">
          {/* HERO SECTION */}
          {activeSection === 'hero' && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-900">Hero Section</h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Headline</Label>
                  <Input
                    value={heroData.headline}
                    onChange={(e) => setHeroData({...heroData, headline: e.target.value})}
                    placeholder="Enter main headline"
                    className="text-lg h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subheadline</Label>
                  <Textarea
                    rows={3}
                    value={heroData.subheadline}
                    onChange={(e) => setHeroData({...heroData, subheadline: e.target.value})}
                    placeholder="Describe your value proposition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>CTA Text</Label>
                    <Input value={heroData.ctaText} onChange={(e) => setHeroData({...heroData, ctaText: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>CTA Link</Label>
                    <Input value={heroData.ctaLink} onChange={(e) => setHeroData({...heroData, ctaLink: e.target.value})} />
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 flex justify-end">
                  <Button onClick={handleSaveHero} disabled={isSavingHero} className="bg-blue-600 hover:bg-blue-700 min-w-[140px] text-white">
                    {isSavingHero ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* DECAGON RESOURCE HUB SECTION */}
          {activeSection === 'resource-hub' && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-900">Decagon Resource Hub</h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Section Headline</Label>
                  <Input
                    value={resourceHubData.headline}
                    onChange={(e) => setResourceHubData({...resourceHubData, headline: e.target.value})}
                    placeholder="Enter section headline"
                    className="text-lg h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={resourceHubData.image}
                    onChange={(e) => setResourceHubData({...resourceHubData, image: e.target.value})}
                    placeholder="e.g. https://images.unsplash.com/..."
                  />
                  {resourceHubData.image && (
                    <div className="mt-2 w-40 h-24 rounded-lg border border-gray-100 overflow-hidden bg-gray-50">
                      <img src={resourceHubData.image} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Button Name</Label>
                    <Input value={resourceHubData.button_name} onChange={(e) => setResourceHubData({...resourceHubData, button_name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Button Link</Label>
                    <Input value={resourceHubData.button_link} onChange={(e) => setResourceHubData({...resourceHubData, button_link: e.target.value})} />
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 flex justify-end">
                  <Button onClick={handleSaveResourceHub} disabled={isSavingResourceHub} className="bg-blue-600 hover:bg-blue-700 min-w-[140px] text-white">
                    {isSavingResourceHub ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* HOME FOOTER SECTION */}
          {activeSection === 'home-footer' && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-900">Home Footer Section</h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Headline</Label>
                  <Input
                    value={homeFooterData.headline}
                    onChange={(e) => setHomeFooterData({...homeFooterData, headline: e.target.value})}
                    placeholder="Enter footer headline"
                    className="text-lg h-12"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Button Name</Label>
                    <Input value={homeFooterData.button_name} onChange={(e) => setHomeFooterData({...homeFooterData, button_name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Button Link</Label>
                    <Input value={homeFooterData.button_link} onChange={(e) => setHomeFooterData({...homeFooterData, button_link: e.target.value})} />
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 flex justify-end">
                  <Button onClick={handleSaveHomeFooter} disabled={isSavingHomeFooter} className="bg-blue-600 hover:bg-blue-700 min-w-[140px] text-white">
                    {isSavingHomeFooter ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* OMNICHANNEL SECTION */}
          {activeSection === 'omnichannel' && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Omnichannel by Design</h3>
                  <p className="text-xs text-gray-500 mt-1">Manage multiple channel details sequentially</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Channel Details</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-blue-600 border-blue-100 hover:bg-blue-50"
                      onClick={addOmniDetail}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add Detail
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {omnichannelDetails.map((detail, index) => (
                      <div key={index} className="p-6 border border-gray-100 rounded-xl bg-gray-50/20 group transition-all hover:bg-white hover:shadow-sm relative">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wider">Channel Detail {index + 1}</span>
                          {omnichannelDetails.length > 1 && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-gray-300 hover:text-red-500 hover:bg-red-50"
                              onClick={() => removeOmniDetail(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-tight">Headline</Label>
                            <Input 
                              placeholder="e.g. Seamless Experience" 
                              value={detail.headline}
                              onChange={(e) => updateOmniDetail(index, 'headline', e.target.value)}
                              className="bg-white border-gray-200 h-10"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-tight">Title</Label>
                            <Input 
                              placeholder="e.g. Email & Chat" 
                              value={detail.title}
                              onChange={(e) => updateOmniDetail(index, 'title', e.target.value)}
                              className="bg-white border-gray-200 h-10"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex justify-end">
                  <Button 
                    onClick={handleSaveOmnichannel} 
                    disabled={isSavingOmnichannel}
                    className="bg-blue-600 hover:bg-blue-700 min-w-[160px] text-white"
                  >
                    {isSavingOmnichannel ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* SEE WHAT'S POSSIBLE */}
          {activeSection === 'whats-possible' && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">See What's Possible</h3>
                  <p className="text-xs text-gray-500 mt-1">Manage the primary headline for the possibility section</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Headline</Label>
                  <Input
                    value={possibleData.headline}
                    onChange={(e) => setPossibleData({ headline: e.target.value })}
                    placeholder="Enter main headline"
                    className="text-lg h-12"
                  />
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end">
                  <Button 
                    onClick={handleSavePossible} 
                    disabled={isSavingPossible}
                    className="bg-blue-600 hover:bg-blue-700 min-w-[140px] text-white"
                  >
                    {isSavingPossible ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* CUSTOMER STORIES */}
          {activeSection === 'customer-stories' && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-900">Customer Stories</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleOpenStoryModal()}>
                  <Plus className="w-4 h-4 mr-2" /> Add Story
                </Button>
              </div>
              <div className="space-y-4">
                {isLoadingStories ? (
                  <div className="flex items-center justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
                ) : customerStories.length > 0 ? (
                  customerStories.map((story) => (
                    <div key={story.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center text-xl">{story.company_logo}</div>
                        <div>
                          <h4 className="font-bold text-gray-900">{story.customer_name}</h4>
                          <p className="text-xs text-gray-500">{story.designation}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenStoryModal(story)}><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => setStoryToDelete(story.id)}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-400 border border-dashed border-gray-200 rounded-xl">
                    No stories found.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DECAGON DIFFERENCE */}
          {activeSection === 'decagon-difference' && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">The Decagon Difference</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>Title 1</Label><Input value={differenceData.title1} onChange={(e) => setDifferenceData({...differenceData, title1: e.target.value})} /></div>
                  <div className="space-y-2"><Label>Title 2</Label><Input value={differenceData.title2} onChange={(e) => setDifferenceData({...differenceData, title2: e.target.value})} /></div>
                </div>
                <div className="space-y-2"><Label>Headline</Label><Textarea value={differenceData.headline} onChange={(e) => setDifferenceData({...differenceData, headline: e.target.value})} /></div>
                <div className="pt-6 border-t border-gray-100 flex justify-end">
                  <Button onClick={handleSaveDifference} disabled={isSavingDifference} className="bg-blue-600 hover:bg-blue-700 min-w-[140px] text-white">
                    {isSavingDifference ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* UNIFIED PLATFORM */}
          {activeSection === 'unified-platform' && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm text-center py-20">
               <div className="inline-flex p-4 bg-gray-50 rounded-full mb-4">
                 <Info className="w-8 h-8 text-gray-400" />
               </div>
               <h3 className="text-lg font-bold text-gray-900 mb-2">Platform Management</h3>
               <p className="text-gray-500 max-w-xs mx-auto mb-6">This section is currently configured to use global product settings.</p>
               <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  Configure Unified Platform
               </Button>
            </div>
          )}
        </div>
      </div>

      {/* Story Management Modals */}
      <Dialog open={isStoryModalOpen} onOpenChange={setIsStoryModalOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader><DialogTitle>{editingStory ? 'Edit Story' : 'Add Story'}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Name</Label><Input value={storyFormData.customer_name} onChange={e => setStoryFormData({...storyFormData, customer_name: e.target.value})} /></div>
            <div className="space-y-2"><Label>Designation</Label><Input value={storyFormData.designation} onChange={e => setStoryFormData({...storyFormData, designation: e.target.value})} /></div>
            <div className="col-span-2 space-y-2"><Label>Story Content</Label><Textarea rows={4} value={storyFormData.stories} onChange={e => setStoryFormData({...storyFormData, stories: e.target.value})} /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsStoryModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveStory} disabled={isSavingStory} className="bg-blue-600 text-white">Save Story</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}