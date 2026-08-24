import React, { useState } from 'react';
import { useApp, NavTab } from '../context/AppContext';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Search, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  Clock3,
  PhoneCall,
  Layers, 
  Award, 
  Hotel, 
  Landmark 
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { language, t, isRTL, setActiveTab, setSelectedCategory, sites, artisans, events } = useApp();
  const [heroSearch, setHeroSearch] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Dynamic filter for search suggestions
  const searchResults = heroSearch.trim() === '' ? [] : [
    ...sites.filter(s => 
      s.name[language]?.toLowerCase().includes(heroSearch.toLowerCase()) ||
      s.commune[language]?.toLowerCase().includes(heroSearch.toLowerCase()) ||
      s.description[language]?.toLowerCase().includes(heroSearch.toLowerCase())
    ).map(s => ({ type: 'site' as const, id: s.id, title: s.name[language], sub: s.commune[language] })),
    ...artisans.filter(a =>
      a.name[language]?.toLowerCase().includes(heroSearch.toLowerCase()) ||
      a.commune[language]?.toLowerCase().includes(heroSearch.toLowerCase())
    ).map(a => ({ type: 'artisan' as const, id: a.id, title: a.name[language], sub: a.commune[language] })),
    ...events.filter(e =>
      e.title[language]?.toLowerCase().includes(heroSearch.toLowerCase())
    ).map(e => ({ type: 'event' as const, id: e.id, title: e.title[language], sub: e.location[language] }))
  ].slice(0, 5);

  const handleSearchResultClick = (res: typeof searchResults[0]) => {
    setShowResults(false);
    setHeroSearch('');
    if (res.type === 'site') {
      setActiveTab('map');
    } else if (res.type === 'artisan') {
      setActiveTab('artisan');
    } else if (res.type === 'event') {
      setActiveTab('events');
    }
  };

  return (
    <section className="relative bg-[#0F1E36] text-white overflow-hidden">
      {/* Background Graphic & Saharan Imagery */}
      <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}el-oued-souf-hero.jpg`}
            alt={language === 'ar' ? 'كثبان وادي سوف وخيام الصحراء' : language === 'fr' ? 'Dunes du Souf et tentes sahariennes' : 'Souf dunes and Saharan tents'}
            className="h-full w-full scale-105 object-cover opacity-65 transition duration-1000"
          />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36] via-[#0F1E36]/65 to-[#0A1628]/55"></div>
        {/* Subtle decorative geometric overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C89D66_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-16">
        
        {/* Top Badges & Weather Ticker */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2 bg-[#C89D66]/20 border border-[#C89D66]/40 text-[#F5D0A9] px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C89D66]" />
            <span>{t.hero.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
          </div>

          {/* Official contact information — no synthetic live-weather claim */}
          <div className="flex items-center gap-4 bg-[#1E293B]/70 border border-[#334155] rounded-xl px-4 py-2 text-xs backdrop-blur-md">
            <div className="flex items-center gap-2 text-amber-400">
              <Clock3 className="w-4 h-4" />
              <span className="font-bold text-white text-sm">08:00–16:30</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-slate-300 border-x border-slate-700 px-3">
              <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-mono">1077</span>
            </div>
            <span className="text-emerald-400 font-medium text-[11px]">
              {language === 'ar' ? 'معلومة رسمية' : language === 'fr' ? 'Information officielle' : 'Official information'}
            </span>
          </div>
        </div>

        {/* Main Headline & Slogan */}
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight font-heading mb-4 tracking-tight">
            {t.hero.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Dynamic Global Search with Auto-Complete */}
        <div className="max-w-2xl relative mb-10">
          <div className="relative flex items-center bg-[#1A2E4E]/90 border-2 border-[#C89D66] rounded-2xl p-2 shadow-2xl backdrop-blur-md">
            <Search className="w-5 h-5 text-[#C89D66] mx-3 flex-shrink-0" />
            <input
              type="text"
              placeholder={t.nav.searchPlaceholder}
              value={heroSearch}
              onChange={(e) => {
                setHeroSearch(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-hidden pr-2"
            />
            <button
              onClick={() => {
                if (heroSearch.trim()) {
                  setActiveTab('map');
                }
              }}
              className="bg-[#C89D66] hover:bg-[#B38752] text-[#0F1E36] font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 flex-shrink-0 shadow-md"
            >
              <span>{t.hero.searchBtn}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Search Dropdown Suggestion Box */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#0F1E36] border border-[#2B4366] rounded-xl shadow-2xl overflow-hidden z-30 divide-y divide-[#1E3352]">
              {searchResults.map((res, i) => (
                <div
                  key={i}
                  onClick={() => handleSearchResultClick(res)}
                  className="px-4 py-3 hover:bg-[#1A2F4F] cursor-pointer flex items-center justify-between text-xs sm:text-sm transition"
                >
                  <div className="flex items-center gap-2.5">
                    {res.type === 'site' && <MapPin className="w-4 h-4 text-[#C89D66]" />}
                    {res.type === 'artisan' && <Sparkles className="w-4 h-4 text-emerald-400" />}
                    {res.type === 'event' && <Calendar className="w-4 h-4 text-amber-400" />}
                    <div>
                      <span className="font-semibold text-white block">{res.title}</span>
                      <span className="text-[11px] text-slate-400">{res.sub}</span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-[#15253F] px-2 py-0.5 rounded">
                    {res.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Category Shortcuts */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          <button
            onClick={() => {
              setSelectedCategory('cultural');
              setActiveTab('map');
            }}
            className="flex items-center gap-2 bg-[#1A2E4E]/80 hover:bg-[#C89D66] hover:text-[#0F1E36] text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold transition border border-[#2A4268]"
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>{t.categories.cultural}</span>
          </button>
          
          <button
            onClick={() => {
              setSelectedCategory('natural');
              setActiveTab('map');
            }}
            className="flex items-center gap-2 bg-[#1A2E4E]/80 hover:bg-[#C89D66] hover:text-[#0F1E36] text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold transition border border-[#2A4268]"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t.categories.natural}</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('religious');
              setActiveTab('map');
            }}
            className="flex items-center gap-2 bg-[#1A2E4E]/80 hover:bg-[#C89D66] hover:text-[#0F1E36] text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold transition border border-[#2A4268]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.categories.religious}</span>
          </button>

          <button
            onClick={() => setActiveTab('artisan')}
            className="flex items-center gap-2 bg-[#1A2E4E]/80 hover:bg-[#C89D66] hover:text-[#0F1E36] text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold transition border border-[#2A4268]"
          >
            <Award className="w-3.5 h-3.5" />
            <span>{t.hero.ctaArtisans}</span>
          </button>

          <button
            onClick={() => setActiveTab('investment')}
            className="flex items-center gap-2 bg-[#0C6B58]/80 hover:bg-[#0C6B58] text-emerald-100 px-4 py-2 rounded-xl text-xs font-semibold transition border border-[#14B8A6]/40"
          >
            <span>{t.nav.investment} (ZET)</span>
          </button>
        </div>

        {/* Quick Regional Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#1E3A5F]/80">
          <div className="bg-[#15253F]/60 border border-[#233A5E] rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#C89D66]/20 flex items-center justify-center text-[#C89D66]">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">{sites.length}</div>
              <div className="text-[11px] text-slate-300">{language === 'ar' ? 'معلماً منشوراً على البوابة' : language === 'fr' ? 'sites publiés sur le portail' : 'published portal sites'}</div>
            </div>
          </div>

          <div className="bg-[#15253F]/60 border border-[#233A5E] rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">{sites.length}+</div>
              <div className="text-[11px] text-slate-300">{t.hero.statSites}</div>
            </div>
          </div>

          <div className="bg-[#15253F]/60 border border-[#233A5E] rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">{artisans.length}</div>
              <div className="text-[11px] text-slate-300">{language === 'ar' ? 'حرفيون في الدليل' : language === 'fr' ? 'artisans dans l’annuaire' : 'artisans in the directory'}</div>
            </div>
          </div>

          <div className="bg-[#15253F]/60 border border-[#233A5E] rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">
              <Hotel className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">{events.length}</div>
              <div className="text-[11px] text-slate-300">{language === 'ar' ? 'فعاليات منشورة' : language === 'fr' ? 'événements publiés' : 'published events'}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
