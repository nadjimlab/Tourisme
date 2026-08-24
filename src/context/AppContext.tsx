import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  SiteCategory, 
  TouristSite, 
  TourismEvent, 
  MasterArtisan, 
  InvestmentOpportunity, 
  DigitalRequest, 
  NewsArticle 
} from '../types';
import { translations } from '../i18n/translations';
import { 
  INITIAL_SITES, 
  INITIAL_EVENTS, 
  INITIAL_ARTISANS, 
  INITIAL_INVESTMENTS, 
  INITIAL_NEWS, 
  INITIAL_REQUESTS 
} from '../data/initialData';

export type NavTab = 'home' | 'map' | 'investment' | 'services' | 'events' | 'handicrafts' | 'news' | 'admin';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['ar'];
  isRTL: boolean;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedSiteId: string | null;
  setSelectedSiteId: (id: string | null) => void;
  selectedCategory: SiteCategory | 'all';
  setSelectedCategory: (cat: SiteCategory | 'all') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  
  // Accessibility
  textSize: 'normal' | 'large' | 'xl';
  setTextSize: (size: 'normal' | 'large' | 'xl') => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;

  // Data Collections
  sites: TouristSite[];
  addSite: (site: TouristSite) => void;
  updateSite: (site: TouristSite) => void;
  deleteSite: (id: string) => void;

  events: TourismEvent[];
  addEvent: (event: TourismEvent) => void;
  updateEvent: (event: TourismEvent) => void;
  deleteEvent: (id: string) => void;

  artisans: MasterArtisan[];
  addArtisan: (artisan: MasterArtisan) => void;
  updateArtisan: (artisan: MasterArtisan) => void;
  deleteArtisan: (id: string) => void;

  investments: InvestmentOpportunity[];

  news: NewsArticle[];
  addNews: (article: NewsArticle) => void;
  deleteNews: (id: string) => void;

  requests: DigitalRequest[];
  submitRequest: (data: Omit<DigitalRequest, 'id' | 'trackingNumber' | 'status' | 'createdAt'>) => string;
  updateRequestStatus: (id: string, status: DigitalRequest['status'], responseNotes?: string, department?: string) => void;

  // Admin Auth
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('eloued_lang') as Language) || 'ar';
  });
  
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SiteCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Persistent / dynamic collections
  const [sites, setSites] = useState<TouristSite[]>(() => {
    const saved = localStorage.getItem('eloued_sites');
    return saved ? JSON.parse(saved) : INITIAL_SITES;
  });

  const [events, setEvents] = useState<TourismEvent[]>(() => {
    const saved = localStorage.getItem('eloued_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [artisans, setArtisans] = useState<MasterArtisan[]>(() => {
    const saved = localStorage.getItem('eloued_artisans');
    return saved ? JSON.parse(saved) : INITIAL_ARTISANS;
  });

  const [investments] = useState<InvestmentOpportunity[]>(INITIAL_INVESTMENTS);

  const [news, setNews] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('eloued_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [requests, setRequests] = useState<DigitalRequest[]>(() => {
    const saved = localStorage.getItem('eloued_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('eloued_is_admin') === 'true';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('eloued_sites', JSON.stringify(sites));
  }, [sites]);

  useEffect(() => {
    localStorage.setItem('eloued_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('eloued_artisans', JSON.stringify(artisans));
  }, [artisans]);

  useEffect(() => {
    localStorage.setItem('eloued_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('eloued_requests', JSON.stringify(requests));
  }, [requests]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('eloued_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Handlers
  const addSite = (site: TouristSite) => setSites(prev => [site, ...prev]);
  const updateSite = (site: TouristSite) => setSites(prev => prev.map(s => s.id === site.id ? site : s));
  const deleteSite = (id: string) => setSites(prev => prev.filter(s => s.id !== id));

  const addEvent = (event: TourismEvent) => setEvents(prev => [event, ...prev]);
  const updateEvent = (event: TourismEvent) => setEvents(prev => prev.map(e => e.id === event.id ? event : e));
  const deleteEvent = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));

  const addArtisan = (artisan: MasterArtisan) => setArtisans(prev => [artisan, ...prev]);
  const updateArtisan = (artisan: MasterArtisan) => setArtisans(prev => prev.map(a => a.id === artisan.id ? artisan : a));
  const deleteArtisan = (id: string) => setArtisans(prev => prev.filter(a => a.id !== id));

  const addNews = (article: NewsArticle) => setNews(prev => [article, ...prev]);
  const deleteNews = (id: string) => setNews(prev => prev.filter(n => n.id !== id));

  const submitRequest = (data: Omit<DigitalRequest, 'id' | 'trackingNumber' | 'status' | 'createdAt'>) => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `ELO-2026-${randomCode}`;
    const newReq: DigitalRequest = {
      ...data,
      id: `req-${Date.now()}`,
      trackingNumber,
      status: 'submitted',
      createdAt: new Date().toISOString(),
    };
    setRequests(prev => [newReq, ...prev]);
    return trackingNumber;
  };

  const updateRequestStatus = (id: string, status: DigitalRequest['status'], responseNotes?: string, department?: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status,
          updatedAt: new Date().toISOString(),
          adminResponse: responseNotes !== undefined ? responseNotes : r.adminResponse,
          departmentAssigned: department !== undefined ? department : r.departmentAssigned,
        };
      }
      return r;
    }));
  };

  const loginAdmin = (password: string) => {
    if (password === 'admin' || password === 'eloued2026' || password === 'tourisme39') {
      setIsAdmin(true);
      localStorage.setItem('eloued_is_admin', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('eloued_is_admin');
  };

  const t = translations[language] || translations.ar;
  const isRTL = language === 'ar';

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isRTL,
        activeTab,
        setActiveTab,
        selectedSiteId,
        setSelectedSiteId,
        selectedCategory,
        setSelectedCategory,
        searchTerm,
        setSearchTerm,
        textSize,
        setTextSize,
        highContrast,
        setHighContrast,
        sites,
        addSite,
        updateSite,
        deleteSite,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        artisans,
        addArtisan,
        updateArtisan,
        deleteArtisan,
        investments,
        news,
        addNews,
        deleteNews,
        requests,
        submitRequest,
        updateRequestStatus,
        isAdmin,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
