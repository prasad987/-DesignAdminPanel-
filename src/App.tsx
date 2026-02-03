import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ProductsManager } from './components/ProductsManager';
import { IndustriesManager } from './components/IndustriesManager';
import { CustomerStoriesManager } from './components/CustomerStoriesManager';
import { ResourcesManager } from './components/ResourcesManager';
import { CompanyManager } from './components/CompanyManager';
import { HomePageManager } from './components/HomePageManager';
import { FooterManager } from './components/FooterManager';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';

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
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
}
