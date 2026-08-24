import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  BookOpen,
  FileText,
  Landmark,
  Mail,
  Map,
  MapPinned,
  Newspaper,
  Route,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { NavTab, useApp } from '../context/AppContext';

const copy = {
  ar: {
    eyebrow: 'بوابة ولاية الوادي',
    title: 'كل ما تحتاجه في بوابة رسمية واحدة',
    subtitle: 'تنظيم واضح يفصل بين المعلومات المؤسسية، اكتشاف الوجهة، والخدمات العمومية الرقمية.',
    open: 'فتح المحور',
    pillars: [
      {
        id: 'official',
        tab: 'home' as NavTab,
        title: 'الصفحة الرسمية',
        description: 'تعريف بالمديرية، الأخبار، الإعلانات، والمعلومات الرسمية الموثوقة.',
        items: [
          { label: 'تعريف بالمديرية', icon: Landmark },
          { label: 'الأخبار والمستجدات', icon: Newspaper },
          { label: 'الإعلانات الرسمية', icon: BellRing },
        ],
        tone: 'from-[#17324D] to-[#285A67]',
      },
      {
        id: 'explorer',
        tab: 'map' as NavTab,
        title: 'المستكشف السياحي',
        description: 'أماكن ومعالم وصور وتفاصيل ومسارات عبر خريطة تفاعلية موحدة.',
        items: [
          { label: 'الأماكن والمعالم', icon: MapPinned },
          { label: 'الخريطة والصور', icon: Map },
          { label: 'التفاصيل والمسارات', icon: Route },
        ],
        tone: 'from-[#7A5030] to-[#B8874D]',
      },
      {
        id: 'services',
        tab: 'services' as NavTab,
        title: 'الخدمات الرقمية',
        description: 'طلبات المواطنين، الأدلة، الفعاليات، الوثائق، والتواصل مع المديرية.',
        items: [
          { label: 'طلب معلومات', icon: FileText },
          { label: 'دليل المؤسسات والحرف', icon: UsersRound },
          { label: 'الفعاليات والوثائق والتواصل', icon: Mail },
        ],
        tone: 'from-[#0C6B58] to-[#2D8B70]',
      },
    ],
  },
  fr: {
    eyebrow: 'Portail de la wilaya d’El Oued',
    title: 'Tout ce dont vous avez besoin dans un portail officiel',
    subtitle: 'Une organisation claire entre information institutionnelle, découverte de la destination et services publics numériques.',
    open: 'Ouvrir le pôle',
    pillars: [
      {
        id: 'official',
        tab: 'home' as NavTab,
        title: 'Portail officiel',
        description: 'Présentation de la Direction, actualités, annonces et informations institutionnelles fiables.',
        items: [
          { label: 'La Direction', icon: Landmark },
          { label: 'Actualités', icon: Newspaper },
          { label: 'Annonces officielles', icon: BellRing },
        ],
        tone: 'from-[#17324D] to-[#285A67]',
      },
      {
        id: 'explorer',
        tab: 'map' as NavTab,
        title: 'Explorateur touristique',
        description: 'Lieux, sites, photos, détails et itinéraires réunis dans une carte interactive.',
        items: [
          { label: 'Lieux et sites', icon: MapPinned },
          { label: 'Carte et photos', icon: Map },
          { label: 'Détails et itinéraires', icon: Route },
        ],
        tone: 'from-[#7A5030] to-[#B8874D]',
      },
      {
        id: 'services',
        tab: 'services' as NavTab,
        title: 'Services numériques',
        description: 'Demandes citoyennes, annuaires, événements, documents et contact avec la Direction.',
        items: [
          { label: 'Demande d’information', icon: FileText },
          { label: 'Annuaires tourisme et artisanat', icon: UsersRound },
          { label: 'Événements, documents et contact', icon: Mail },
        ],
        tone: 'from-[#0C6B58] to-[#2D8B70]',
      },
    ],
  },
  en: {
    eyebrow: 'El Oued Wilaya portal',
    title: 'Everything you need in one official portal',
    subtitle: 'A clear structure connecting institutional information, destination discovery and digital public services.',
    open: 'Open section',
    pillars: [
      {
        id: 'official',
        tab: 'home' as NavTab,
        title: 'Official portal',
        description: 'Directorate profile, news, announcements and trusted institutional information.',
        items: [
          { label: 'About the Directorate', icon: Landmark },
          { label: 'News and updates', icon: Newspaper },
          { label: 'Official announcements', icon: BellRing },
        ],
        tone: 'from-[#17324D] to-[#285A67]',
      },
      {
        id: 'explorer',
        tab: 'map' as NavTab,
        title: 'Tourism explorer',
        description: 'Places, landmarks, photos, details and routes in one interactive map.',
        items: [
          { label: 'Places and landmarks', icon: MapPinned },
          { label: 'Map and photos', icon: Map },
          { label: 'Details and routes', icon: Route },
        ],
        tone: 'from-[#7A5030] to-[#B8874D]',
      },
      {
        id: 'services',
        tab: 'services' as NavTab,
        title: 'Digital services',
        description: 'Information requests, directories, events, documents and contact with the Directorate.',
        items: [
          { label: 'Information request', icon: FileText },
          { label: 'Tourism and crafts directories', icon: UsersRound },
          { label: 'Events, documents and contact', icon: Mail },
        ],
        tone: 'from-[#0C6B58] to-[#2D8B70]',
      },
    ],
  },
} as const;

export const PortalPillars: React.FC = () => {
  const { language, isRTL, setActiveTab } = useApp();
  const current = copy[language];

  const openPillar = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#F8F5EF] px-4 py-10 sm:px-8" aria-labelledby="portal-pillars-title">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_20%_0%,rgba(200,157,102,.22),transparent_48%),radial-gradient(circle_at_85%_20%,rgba(12,107,88,.12),transparent_42%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-7 max-w-3xl text-center">
          <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#B8874D]"><Sparkles className="h-4 w-4" />{current.eyebrow}</div>
          <h2 id="portal-pillars-title" className="font-heading text-3xl font-black text-[#17324D] sm:text-4xl">{current.title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">{current.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {current.pillars.map((pillar) => (
            <article key={pillar.id} className="group flex flex-col overflow-hidden rounded-[1.7rem] border border-[#E7DCCB] bg-white shadow-[0_12px_32px_rgba(36,49,63,.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(36,49,63,.14)]">
              <div className={`bg-gradient-to-br ${pillar.tone} p-6 text-white`}>
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20"><BookOpen className="h-6 w-6" /></div>
                  <span className="rounded-full border border-white/25 bg-black/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">0{current.pillars.indexOf(pillar) + 1}</span>
                </div>
                <h3 className="font-heading text-2xl font-black">{pillar.title}</h3>
                <p className="mt-2 min-h-14 text-sm leading-6 text-white/85">{pillar.description}</p>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="space-y-3">
                  {pillar.items.map((item) => {
                    const Icon = item.icon;
                    return <div key={item.label} className="flex items-center gap-3 text-sm text-slate-700"><Icon className="h-4 w-4 shrink-0 text-[#B8874D]" /> <span>{item.label}</span></div>;
                  })}
                </div>
                <button onClick={() => openPillar(pillar.tab)} className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#17324D] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#0C6B58] focus:outline-none focus:ring-2 focus:ring-[#B8874D]">
                  {current.open}
                  {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
