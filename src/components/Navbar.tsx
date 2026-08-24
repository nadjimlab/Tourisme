import React, { useState } from 'react';
import { useApp, NavTab } from '../context/AppContext';
import { 
  PhoneCall, 
  Search, 
  Globe, 
  Shield,
  Building2,
  HelpCircle,
  Phone,
  Menu, 
  X, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Briefcase, 
  FileText, 
  Newspaper, 
  Home, 
  Eye, 
  Type, 
  SunMedium,
  ExternalLink
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    t, 
    activeTab, 
    setActiveTab, 
    textSize, 
    setTextSize, 
    highContrast, 
    setHighContrast,
    searchTerm,
    setSearchTerm,
    isAdmin 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const navLinks: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: t.nav.officialPortal, icon: Home },
    { id: 'map', label: t.nav.explorer, icon: MapPin },
    { id: 'artisan', label: t.nav.handicrafts, icon: Sparkles },
    { id: 'events', label: t.nav.events, icon: Calendar },
    { id: 'investment', label: t.nav.investment, icon: Briefcase },
    { id: 'services', label: t.nav.digitalHub, icon: FileText },
    { id: 'news', label: t.nav.news, icon: Newspaper },
    { id: 'admin', label: t.nav.adminPortal, icon: Shield },
    { id: 'about', label: language === 'ar' ? 'عن المديرية' : language === 'fr' ? 'La Direction' : 'About', icon: Building2 },
    { id: 'contact', label: language === 'ar' ? 'اتصل بنا' : language === 'fr' ? 'Contact' : 'Contact', icon: Phone },
    { id: 'faq', label: language === 'ar' ? 'الأسئلة الشائعة' : language === 'fr' ? 'FAQ' : 'FAQ', icon: HelpCircle },
  ];

  const handleNavClick = (tabId: NavTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-[#17324D] focus:shadow-xl">
        {language === 'ar' ? 'تجاوز إلى المحتوى الرئيسي' : language === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
      </a>
      <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top Ministerial Bar */}
      <div className="bg-[#0A1628] text-[#E2E8F0] border-b border-[#1E293B] text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Official Motto */}
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="font-semibold text-[#CBD5E1] tracking-wide">
              {t.countryName}
            </span>
          </div>

          {/* Right utility items */}
          <div className="flex items-center gap-3 text-xs">
            {/* Official Portal Link */}
            <a
              href="https://el-oued.mta.gov.dz/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-medium px-2 py-0.5 rounded bg-[#13233D] border border-[#233A5E] transition-colors"
              title="el-oued.mta.gov.dz"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.utility.officialSite || 'el-oued.mta.gov.dz'}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            {/* Tourism Hotline */}
            <a 
              href="tel:1077" 
              className="flex items-center gap-1.5 text-[#FBBF24] hover:text-[#F59E0B] font-bold px-2 py-0.5 rounded bg-[#1E293B]/60 transition-colors"
              title={t.utility.hotline}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.utility.hotline}: <strong className="font-mono text-white text-sm">1077</strong></span>
            </a>

            {/* Accessibility Controls */}
            <div className="hidden md:flex items-center gap-2 border-x border-[#334155] px-3">
              <button
                onClick={() => setTextSize(textSize === 'normal' ? 'large' : textSize === 'large' ? 'xl' : 'normal')}
                className="flex items-center gap-1 text-slate-300 hover:text-white px-1.5 py-0.5 rounded hover:bg-slate-800 transition"
                title={t.utility.fontIncrease}
              >
                <Type className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">{textSize === 'normal' ? 'A' : textSize === 'large' ? 'A+' : 'A++'}</span>
              </button>

              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] transition ${
                  highContrast ? 'bg-amber-400 text-black font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title={t.utility.highContrast}
              >
                <SunMedium className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{highContrast ? t.utility.highContrast : t.utility.portalAccessibility}</span>
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-[#1E293B] rounded-lg p-0.5">
              <button
                onClick={() => setLanguage('ar')}
                className={`px-2 py-0.5 text-xs rounded font-medium transition ${
                  language === 'ar' ? 'bg-[#C89D66] text-white shadow-xs font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-0.5 text-xs rounded font-medium transition ${
                  language === 'fr' ? 'bg-[#C89D66] text-white shadow-xs font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-xs rounded font-medium transition ${
                  language === 'en' ? 'bg-[#C89D66] text-white shadow-xs font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="bg-[#0F1E36] text-white py-3 px-4 sm:px-8 border-b border-[#1E3A5F] bg-[radial-gradient(circle_at_15%_30%,rgba(200,157,102,.18),transparent_28%),radial-gradient(circle_at_88%_80%,rgba(12,107,88,.16),transparent_30%)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Official Title */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <img
                src={`${import.meta.env.BASE_URL}algerian-flag-badge.png`}
                alt={language === 'ar' ? 'العلم الجزائري' : language === 'fr' ? 'Drapeau algérien' : 'Algerian flag'}
                className="h-10 w-10 shrink-0 object-contain drop-shadow-md sm:h-14 sm:w-14"
                width="256"
                height="256"
                decoding="async"
              />

              <div className="min-w-0 text-right">
                <p className="text-[8px] font-medium uppercase tracking-[.08em] text-[#C89D66] sm:text-[11px] sm:tracking-wider">
                  {t.ministryName}
                </p>
                <h1
                  aria-label={t.directorateName}
                  className="mt-0.5 flex max-w-[215px] flex-col font-heading leading-tight transition group-hover:text-[#F3E5D8] sm:max-w-[520px]"
                >
                  <span lang="ar" dir="rtl" className="text-[13px] font-black text-white sm:text-xl">{t.directorateName}</span>
                  <span lang="en" dir="ltr" className="mt-0.5 text-[7px] font-semibold tracking-[.01em] text-[#F5D0A9] sm:text-[11px]">Directorate of Tourism and Handicrafts – El Oued Province</span>
                  <span lang="zgh" dir="ltr" className="mt-0.5 font-tifinagh text-[8px] font-semibold tracking-wide text-[#D7E7DE] sm:text-xs">ⵜⴰⵏⵎⵀⵍⵜ ⵏ ⵜⵓⵔⵉⵙⵎ ⴷ ⵜⵃⵔⴼⵉⵏ – ⵡⴰⴷⵉ ⵙⵓⴼ</span>
                </h1>
                <p className="mt-1 hidden text-[10px] text-slate-300 sm:block">{t.slogan}</p>
              </div>

              <img
                src={`${import.meta.env.BASE_URL}algerian-republic-emblem.png`}
                alt={language === 'ar' ? 'شعار الجمهورية الجزائرية' : language === 'fr' ? 'Emblème de la République algérienne' : 'Emblem of the Algerian Republic'}
                className="hidden h-12 w-12 shrink-0 object-contain drop-shadow-md sm:block sm:h-16 sm:w-16"
                width="256"
                height="256"
                decoding="async"
              />
            </div>
          </div>

          {/* Quick Search & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Search Input Bar (Desktop) */}
            <div className="hidden lg:flex items-center relative w-72">
              <input
                type="text"
                placeholder={t.nav.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1A2E4E] border border-[#2D4A77] rounded-full py-1.5 pr-9 pl-4 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#C89D66] focus:border-transparent transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchModalOpen(!searchModalOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#1A2E4E] text-slate-200 hover:text-white"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#1A2E4E] text-slate-200 hover:text-white focus:outline-hidden"
              aria-label={language === 'ar' ? 'فتح القائمة' : language === 'fr' ? 'Ouvrir le menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Expand */}
        {searchModalOpen && (
          <div className="lg:hidden mt-3 pt-2 border-t border-[#1E3A5F]">
            <div className="relative">
              <input
                type="text"
                placeholder={t.nav.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1A2E4E] border border-[#2D4A77] rounded-lg py-2 pr-10 pl-4 text-sm text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#C89D66]"
                autoFocus
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tab Bar */}
      <nav className="bg-[#15253F] border-b border-[#22385D] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#C89D66] text-[#0F1E36] font-bold shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-[#1E365D]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0F1E36]' : 'text-[#C89D66]'}`} />
                  <span>{item.label}</span>
                  {item.id === 'admin' && isAdmin && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick CTA */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => handleNavClick('services')}
              className="bg-gradient-to-r from-[#0C6B58] to-[#14B8A6] hover:from-[#095243] hover:to-[#0D9488] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs transition flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.hero.ctaServices}</span>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden bg-[#0F1E36] border-b border-[#23385B] text-white px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#C89D66] text-[#0F1E36] font-bold'
                    : 'text-slate-200 hover:bg-[#1A2E4E]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#0F1E36]' : 'text-[#C89D66]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#1E3A5F] flex items-center justify-between text-xs text-slate-300">
            <span>{t.utility.hotline}: <strong className="text-[#FBBF24]">1077</strong></span>
            <span className="text-slate-400">Wilaya 39 - El Oued</span>
          </div>
        </div>
      )}
      </header>
    </>
  );
};
