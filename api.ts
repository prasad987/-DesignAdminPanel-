import axios from 'axios';

/**
 * API Service for Decagon Admin
 * Configured to communicate with the backend
 */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    "ngrok-skip-browser-warning": true,
  },
});

export interface HeroData {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}

export interface ResourceHubData {
  image: string;
  headline: string;
  button_name: string;
  button_link: string;
}

export interface HomeFooterData {
  headline: string;
  button_name: string;
  button_link: string;
}

export interface CustomerStoryData {
  id?: number;
  company_logo: string;
  stories: string;
  customer_name: string;
  designation: string;
  percentage: number;
  short_summary: string;
}

export const homePageApi = {
  /**
   * Fetches all homepage settings.
   */
  getHomePageSettings: async () => {
    try {
      const response = await api.get('/api/home-page/');
      return response.data;
    } catch (error) {
      console.error('Error fetching home page settings:', error);
      throw error;
    }
  },

  /**
   * Saves the Hero Section configuration using a PUT request with wrapped payload.
   */
  saveHeroSection: async (data: HeroData) => {
    try {
      const response = await api.put('/api/home-page/', {
        section: "Hero Section",
        data: {
          headline: data.headline,
          subheadline: data.subheadline,
          cta_button_text: data.ctaText,
          cta_button_link: data.ctaLink
        },
        updatedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error saving home page hero:', error);
      throw error;
    }
  },

  /**
   * Saves the Omnichannel Section configuration with wrapped payload.
   */
  saveOmnichannelSection: async (data: { details: { headline: string; title: string }[] }) => {
    try {
      const response = await api.put('/api/home-page/', {
        section: "Omnichannel by Design",
        data: data,
        updatedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error saving omnichannel section:', error);
      throw error;
    }
  },

  /**
   * Saves the Decagon Resource Hub configuration with wrapped payload.
   */
  saveResourceHub: async (data: ResourceHubData) => {
    try {
      const response = await api.put('/api/home-page/', {
        section: "Decagon Resource Hub",
        data: data,
        updatedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error saving Decagon Resource Hub:', error);
      throw error;
    }
  },

  /**
   * Saves the "Home Footer" (Homepage specific section) with wrapped payload.
   */
  saveHomeFooter: async (data: HomeFooterData) => {
    try {
      const response = await api.put('/api/home-page/', {
        section: "Home Footer",
        data: data,
        updatedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error("Error saving 'Home Footer':", error);
      throw error;
    }
  },

  /**
   * Saves the "See What's Possible" section with wrapped payload.
   */
  savePossibleSection: async (data: { headline: string }) => {
    try {
      const response = await api.put('/api/home-page/', {
        section: "See What's Possible",
        data: data,
        updatedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error saving See What\'s Possible section:', error);
      throw error;
    }
  },

  /**
   * General method to save any homepage section with wrapped payload.
   */
  saveHomePageSection: async (sectionName: string, data: any) => {
    try {
      const response = await api.put('/api/home-page/', {
        section: sectionName,
        data: data,
        updatedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error(`Error saving ${sectionName} section:`, error);
      throw error;
    }
  },

  /**
   * Saves the entire Global Footer configuration (navigation, socials, legal).
   */
  saveGlobalFooterSettings: async (data: any) => {
    try {
      const response = await api.put('/api/home-page/', {
        section: "Global Footer Configuration",
        data: data,
        updatedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error("Error saving global footer settings:", error);
      throw error;
    }
  },

  /**
   * Fetches all Customer Stories.
   */
  getCustomerStories: async (): Promise<CustomerStoryData[]> => {
    try {
      const response = await api.get('/api/customer-stories/');
      return response.data;
    } catch (error) {
      console.error('Error fetching customer stories:', error);
      throw error;
    }
  },

  /**
   * Creates a new Customer Story.
   */
  createCustomerStory: async (data: CustomerStoryData) => {
    try {
      const response = await api.post('/api/customer-stories/', data);
      return response.data;
    } catch (error) {
      console.error('Error creating customer story:', error);
      throw error;
    }
  },

  /**
   * Updates an existing Customer Story.
   */
  updateCustomerStory: async (id: number, data: CustomerStoryData) => {
    try {
      const response = await api.put(`/api/customer-stories/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating customer story:', error);
      throw error;
    }
  },

  /**
   * Deletes a Customer Story.
   */
  deleteCustomerStory: async (id: number) => {
    try {
      const response = await api.delete(`/api/customer-stories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting customer story:', error);
      throw error;
    }
  }
};