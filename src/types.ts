export type Language = 'ar' | 'fr' | 'en';

export type SiteCategory = 'natural' | 'religious' | 'historical' | 'cultural' | 'handicrafts' | 'accommodation' | 'dining' | 'services';

export interface TouristSite {
  id: string;
  name: {
    ar: string;
    fr: string;
    en: string;
  };
  category: SiteCategory;
  commune: {
    ar: string;
    fr: string;
    en: string;
  };
  coordinates: [number, number]; // [lat, lng]
  description: {
    ar: string;
    fr: string;
    en: string;
  };
  history: {
    ar: string;
    fr: string;
    en: string;
  };
  images: string[];
  visitingHours: {
    ar: string;
    fr: string;
    en: string;
  };
  entryFee: {
    ar: string;
    fr: string;
    en: string;
  };
  amenities: {
    ar: string[];
    fr: string[];
    en: string[];
  };
  address: {
    ar: string;
    fr: string;
    en: string;
  };
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  bestTimeToVisit?: {
    ar: string;
    fr: string;
    en: string;
  };
}

export type EventType = 'local' | 'national' | 'international';

export interface TourismEvent {
  id: string;
  title: {
    ar: string;
    fr: string;
    en: string;
  };
  type: EventType;
  dateStart: string;
  dateEnd: string;
  location: {
    ar: string;
    fr: string;
    en: string;
  };
  description: {
    ar: string;
    fr: string;
    en: string;
  };
  image: string;
  organizer: {
    ar: string;
    fr: string;
    en: string;
  };
  category: 'festival' | 'exhibition' | 'forum' | 'sports';
  isUpcoming: boolean;
}

export type CraftCategory = 'carpets' | 'leather' | 'palm_wood' | 'sand_rose' | 'traditional_food' | 'copper_pottery';

export interface ArtisanProduct {
  title: {
    ar: string;
    fr: string;
    en: string;
  };
  image: string;
  description?: {
    ar: string;
    fr: string;
    en: string;
  };
}

export interface MasterArtisan {
  id: string;
  name: {
    ar: string;
    fr: string;
    en: string;
  };
  craftCategory: CraftCategory;
  commune: {
    ar: string;
    fr: string;
    en: string;
  };
  address: {
    ar: string;
    fr: string;
    en: string;
  };
  phone: string;
  whatsapp?: string;
  photo: string;
  bio: {
    ar: string;
    fr: string;
    en: string;
  };
  products: ArtisanProduct[];
  isCertified: boolean;
  registrationNumber: string;
  experienceYears: number;
}

export interface InvestmentOpportunity {
  id: string;
  title: {
    ar: string;
    fr: string;
    en: string;
  };
  category: 'ecolodge' | 'hotel' | 'wellness_spa' | 'sports_complex' | 'handicraft_village';
  location: {
    ar: string;
    fr: string;
    en: string;
  };
  areaHectares: number;
  zetZoneName?: {
    ar: string;
    fr: string;
    en: string;
  };
  estimatedCostDZD: string;
  status: 'available' | 'under_study' | 'allocated';
  description: {
    ar: string;
    fr: string;
    en: string;
  };
  advantages: {
    ar: string[];
    fr: string[];
    en: string[];
  };
  image: string;
  pdfTitle: string;
}

export type ComplaintStatus = 'submitted' | 'under_review' | 'in_progress' | 'resolved' | 'rejected';
export type ServiceType = 'complaint' | 'suggestion' | 'hotel_classification' | 'guide_license' | 'artisan_card' | 'safari_permit';

export interface DigitalRequest {
  id: string;
  trackingNumber: string;
  serviceType: ServiceType;
  fullName: string;
  nationalIdOrPassport: string;
  email: string;
  phone: string;
  subject: string;
  details: string;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt?: string;
  adminResponse?: string;
  departmentAssigned?: string;
}

export interface NewsArticle {
  id: string;
  title: {
    ar: string;
    fr: string;
    en: string;
  };
  excerpt: {
    ar: string;
    fr: string;
    en: string;
  };
  content: {
    ar: string;
    fr: string;
    en: string;
  };
  date: string;
  category: 'ministerial' | 'regional' | 'event_coverage' | 'investment';
  image: string;
  isImportant?: boolean;
}
