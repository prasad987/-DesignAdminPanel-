
export interface HeroData {
  headline: string;
  subheadline: string;
  ctaText: string;
  secondaryCtaText: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  interval: 'month' | 'year';
  features: string[];
  isPopular: boolean;
}

export interface StatsData {
  label: string;
  value: string;
  suffix: string;
}

export interface FooterData {
  copyright: string;
  socialLinks: { platform: string; url: string }[];
  address: string;
}

export interface AppState {
  hero: HeroData;
  services: ServiceItem[];
  pricing: PricingTier[];
  stats: StatsData[];
  footer: FooterData;
}
