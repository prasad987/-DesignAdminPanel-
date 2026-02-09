import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { HomePageManager } from './components/HomePageManager';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { ProductsManager } from './components/ProductsManager';
import { IndustriesManager } from './components/IndustriesManager';
import { CustomerStoriesManager } from './components/CustomerStoriesManager';
import { ResourcesManager } from './components/ResourcesManager';
import { CompanyManager } from './components/CompanyManager';
import { FooterManager } from './components/FooterManager';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'homepage':
        return <HomePageManager />;
      case 'products':
        return <ProductsManager />;
      case 'industries':
        return <IndustriesManager />;
      case 'customers':
        return <CustomerStoriesManager />;
      case 'resources':
        return <ResourcesManager />;
      case 'company':
        return <CompanyManager />;
      case 'footer':
        return <FooterManager />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}