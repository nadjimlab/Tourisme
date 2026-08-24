import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  deleteContent,
  fetchPublicCollections,
  fetchStaffCollections,
  getStaffProfile,
  insertArtisan,
  insertEvent,
  insertNews,
  insertSite,
  StaffProfile,
  subscribeToRealtime,
  submitPublicRequest,
  trackPublicRequest,
  updateRequest,
} from '../lib/supabaseData';
import {
  DigitalRequest,
  InvestmentOpportunity,
  Language,
  MasterArtisan,
  NewsArticle,
  SiteCategory,
  TouristSite,
  TourismEvent,
} from '../types';
import { translations } from '../i18n/translations';

export type NavTab = 'home' | 'official' | 'map' | 'investment' | 'services' | 'artisan' | 'events' | 'news' | 'admin' | 'about' | 'contact' | 'privacy' | 'terms' | 'faq';

type LoginResult = { ok: boolean; error?: string };

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
  textSize: 'normal' | 'large' | 'xl';
  setTextSize: (size: 'normal' | 'large' | 'xl') => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  loading: boolean;
  dataError: string | null;
  sites: TouristSite[];
  addSite: (site: TouristSite) => Promise<void>;
  updateSite: (site: TouristSite) => Promise<void>;
  deleteSite: (id: string) => Promise<void>;
  events: TourismEvent[];
  addEvent: (event: TourismEvent) => Promise<void>;
  updateEvent: (event: TourismEvent) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  artisans: MasterArtisan[];
  addArtisan: (artisan: MasterArtisan) => Promise<void>;
  updateArtisan: (artisan: MasterArtisan) => Promise<void>;
  deleteArtisan: (id: string) => Promise<void>;
  investments: InvestmentOpportunity[];
  news: NewsArticle[];
  addNews: (article: NewsArticle) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  requests: DigitalRequest[];
  submitRequest: (data: Omit<DigitalRequest, 'id' | 'trackingNumber' | 'status' | 'createdAt' | 'updatedAt' | 'adminResponse' | 'departmentAssigned'>) => Promise<DigitalRequest>;
  trackRequest: (trackingNumber: string) => Promise<DigitalRequest | null>;
  updateRequestStatus: (id: string, status: DigitalRequest['status'], responseNotes?: string, department?: string) => Promise<void>;
  isAdmin: boolean;
  staffProfile: StaffProfile | null;
  userEmail: string | null;
  loginAdmin: (email: string, password: string) => Promise<LoginResult>;
  logoutAdmin: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
const navTabs: NavTab[] = ['home', 'official', 'map', 'investment', 'services', 'artisan', 'events', 'news', 'admin', 'about', 'contact', 'privacy', 'terms', 'faq'];
const tabFromHash = (): NavTab => {
  const hash = window.location.hash.replace(/^#/, '') as NavTab;
  return navTabs.includes(hash) ? hash : 'home';
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => (localStorage.getItem('eloued_lang') as Language) || 'ar');
  const [activeTab, setActiveTab] = useState<NavTab>(tabFromHash);
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SiteCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);
  const [sites, setSites] = useState<TouristSite[]>([]);
  const [events, setEvents] = useState<TourismEvent[]>([]);
  const [artisans, setArtisans] = useState<MasterArtisan[]>([]);
  const [investments, setInvestments] = useState<InvestmentOpportunity[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [requests, setRequests] = useState<DigitalRequest[]>([]);
  const [staffProfile, setStaffProfile] = useState<StaffProfile | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const mounted = useRef(true);

  const applyPublicCollections = useCallback((collections: Awaited<ReturnType<typeof fetchPublicCollections>>) => {
    if (!mounted.current) return;
    setSites(collections.sites);
    setEvents(collections.events);
    setArtisans(collections.artisans);
    setInvestments(collections.investments);
    setNews(collections.news);
  }, []);

  const refreshData = useCallback(async (withRequests: boolean) => {
    try {
      setDataError(null);
      if (withRequests) {
        const collections = await fetchStaffCollections();
        if (!mounted.current) return;
        applyPublicCollections(collections);
        setRequests(collections.requests);
      } else {
        const collections = await fetchPublicCollections();
        applyPublicCollections(collections);
        if (mounted.current) setRequests([]);
      }
    } catch (error) {
      if (mounted.current) setDataError(error instanceof Error ? error.message : 'Impossible de charger les données.');
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [applyPublicCollections]);

  const loadUserState = useCallback(async (userId: string | null, email: string | null) => {
    setUserEmail(email);
    if (!userId) {
      setStaffProfile(null);
      setIsAdmin(false);
      await refreshData(false);
      return;
    }
    try {
      const profile = await getStaffProfile(userId);
      const staff = profile?.role === 'admin' || profile?.role === 'editor';
      setStaffProfile(profile);
      setIsAdmin(staff);
      await refreshData(staff);
    } catch (error) {
      setStaffProfile(null);
      setIsAdmin(false);
      setDataError(error instanceof Error ? error.message : 'Impossible de vérifier les droits.');
      await refreshData(false);
    }
  }, [refreshData]);

  useEffect(() => {
    mounted.current = true;
    void supabase.auth.getSession().then(({ data: { session } }) => loadUserState(session?.user.id ?? null, session?.user.email ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      void loadUserState(session?.user.id ?? null, session?.user.email ?? null);
    });
    return () => {
      mounted.current = false;
      listener.subscription.unsubscribe();
    };
  }, [loadUserState]);

  useEffect(() => subscribeToRealtime(() => void refreshData(isAdmin)), [isAdmin, refreshData]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    const handleHashChange = () => setActiveTab(tabFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const targetHash = activeTab === 'home' ? '' : `#${activeTab}`;
    if (window.location.hash !== targetHash) window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${targetHash}`);
  }, [activeTab]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('eloued_lang', lang);
  };

  const addSite = async (site: TouristSite) => { await insertSite(site); setSites((current) => [site, ...current]); };
  const updateSite = async (site: TouristSite) => { await insertSite(site); setSites((current) => current.map((item) => item.id === site.id ? site : item)); };
  const deleteSite = async (id: string) => { await deleteContent('sites', id); setSites((current) => current.filter((item) => item.id !== id)); };
  const addEvent = async (event: TourismEvent) => { await insertEvent(event); setEvents((current) => [event, ...current]); };
  const updateEvent = async (event: TourismEvent) => { await insertEvent(event); setEvents((current) => current.map((item) => item.id === event.id ? event : item)); };
  const deleteEvent = async (id: string) => { await deleteContent('events', id); setEvents((current) => current.filter((item) => item.id !== id)); };
  const addArtisan = async (artisan: MasterArtisan) => { await insertArtisan(artisan); setArtisans((current) => [artisan, ...current]); };
  const updateArtisan = async (artisan: MasterArtisan) => { await insertArtisan(artisan); setArtisans((current) => current.map((item) => item.id === artisan.id ? artisan : item)); };
  const deleteArtisan = async (id: string) => { await deleteContent('artisans', id); setArtisans((current) => current.filter((item) => item.id !== id)); };
  const addNews = async (article: NewsArticle) => { await insertNews(article); setNews((current) => [article, ...current]); };
  const deleteNews = async (id: string) => { await deleteContent('news', id); setNews((current) => current.filter((item) => item.id !== id)); };

  const submitRequest = async (data: Omit<DigitalRequest, 'id' | 'trackingNumber' | 'status' | 'createdAt' | 'updatedAt' | 'adminResponse' | 'departmentAssigned'>) => {
    const request = await submitPublicRequest(data);
    if (isAdmin) setRequests((current) => [request, ...current]);
    return request;
  };

  const trackRequest = async (trackingNumber: string) => trackPublicRequest(trackingNumber);

  const updateRequestStatus = async (id: string, status: DigitalRequest['status'], responseNotes?: string, department?: string) => {
    await updateRequest(id, status, responseNotes, department);
    setRequests((current) => current.map((request) => request.id === id ? {
      ...request,
      status,
      updatedAt: new Date().toISOString(),
      adminResponse: responseNotes ?? request.adminResponse,
      departmentAssigned: department ?? request.departmentAssigned,
    } : request));
  };

  const loginAdmin = async (email: string, password: string): Promise<LoginResult> => {
    const result = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
    if (result.error || !result.data.user) return { ok: false, error: result.error?.message || 'Identifiants invalides.' };

    try {
      const profile = await getStaffProfile(result.data.user.id);
      if (!profile || (profile.role !== 'admin' && profile.role !== 'editor')) {
        await supabase.auth.signOut();
        return { ok: false, error: 'Ce compte n’est pas autorisé à accéder à l’administration.' };
      }
      setStaffProfile(profile);
      setIsAdmin(true);
      setUserEmail(result.data.user.email ?? null);
      await refreshData(true);
      return { ok: true };
    } catch (error) {
      await supabase.auth.signOut();
      return { ok: false, error: error instanceof Error ? error.message : 'Impossible de charger les autorisations administratives.' };
    }
  };

  const logoutAdmin = async () => {
    await supabase.auth.signOut();
    setStaffProfile(null);
    setIsAdmin(false);
    setRequests([]);
  };

  const t = translations[language] || translations.ar;
  const isRTL = language === 'ar';
  const value = useMemo(() => ({
    language, setLanguage, t, isRTL, activeTab, setActiveTab, selectedSiteId, setSelectedSiteId, selectedCategory, setSelectedCategory,
    searchTerm, setSearchTerm, textSize, setTextSize, highContrast, setHighContrast, loading, dataError, sites, addSite, updateSite,
    deleteSite, events, addEvent, updateEvent, deleteEvent, artisans, addArtisan, updateArtisan, deleteArtisan, investments, news,
    addNews, deleteNews, requests, submitRequest, trackRequest, updateRequestStatus, isAdmin, staffProfile, userEmail, loginAdmin, logoutAdmin,
  }), [language, t, isRTL, activeTab, selectedSiteId, selectedCategory, searchTerm, textSize, highContrast, loading, dataError, sites, events, artisans, investments, news, requests, isAdmin, staffProfile, userEmail]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
