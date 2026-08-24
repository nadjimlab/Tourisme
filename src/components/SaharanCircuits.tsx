import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  MapPinned,
  Mountain,
  Route,
  Sparkles,
  Sun,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SiteCategory } from '../types';

const copy = {
  ar: {
    eyebrow: 'اكتشف الصحراء السوفية',
    title: 'دوائر سياحية صحراوية في ولاية الوادي',
    subtitle: 'مسارات مقترحة تجمع بين العمارة السوفية، الواحات، الكثبان، الثقافة المحلية والحرف التقليدية.',
    note: 'المسارات التالية إطار تعريفي أولي؛ أما المواقع والإحداثيات المنشورة فعلياً فتظهر في الخريطة الرسمية.',
    explore: 'استكشف نقاط المسار على الخريطة',
    circuits: [
      { title: 'دائرة التراث والعمارة السوفية', description: 'رحلة لاكتشاف القصور، الأبواب التاريخية، القباب والعناصر المعمارية التي تميز مدن وادي سوف.', tags: ['التراث العمراني', 'القصور', 'الثقافة'], category: 'historical' as SiteCategory, icon: Mountain, tone: 'from-[#6D452D] to-[#B9854B]' },
      { title: 'دائرة الواحات والكثبان الذهبية', description: 'مسار صحراوي يربط بين مشاهد الغيطان، النخيل، الرمال الذهبية وتجربة الصحراء المفتوحة.', tags: ['الواحات', 'الطبيعة', 'الرمال'], category: 'natural' as SiteCategory, icon: Sun, tone: 'from-[#A66A35] to-[#D19A5A]' },
      { title: 'دائرة الثقافة والحرف السوفية', description: 'تجربة محلية للتعرف على الحرف، الزرابي، منتجات النخيل، التمور وروح الضيافة السوفية.', tags: ['الحرف', 'المنتجات المحلية', 'التجربة السوفية'], category: 'cultural' as SiteCategory, icon: Sparkles, tone: 'from-[#176052] to-[#3B8B70]' },
    ],
  },
  fr: {
    eyebrow: 'Découvrez le désert du Souf',
    title: 'Circuits touristiques sahariens à El Oued',
    subtitle: 'Des itinéraires suggérés autour de l’architecture soufie, des oasis, des dunes, de la culture locale et de l’artisanat.',
    note: 'Ces circuits constituent une présentation éditoriale initiale ; les sites et coordonnées réellement publiés sont disponibles sur la carte officielle.',
    explore: 'Voir les points du circuit sur la carte',
    circuits: [
      { title: 'Circuit du patrimoine et de l’architecture soufie', description: 'Une découverte des ksour, portes historiques, coupoles et éléments architecturaux qui caractérisent les villes du Souf.', tags: ['Patrimoine bâti', 'Ksour', 'Culture'], category: 'historical' as SiteCategory, icon: Mountain, tone: 'from-[#6D452D] to-[#B9854B]' },
      { title: 'Circuit des oasis et des dunes dorées', description: 'Un parcours saharien entre ghout, palmeraies, paysages de sable et expérience du désert ouvert.', tags: ['Oasis', 'Nature', 'Dunes'], category: 'natural' as SiteCategory, icon: Sun, tone: 'from-[#A66A35] to-[#D19A5A]' },
      { title: 'Circuit de la culture et de l’artisanat soufi', description: 'Une immersion locale autour des métiers, tapis, produits du palmier, dattes et hospitalité du Souf.', tags: ['Artisanat', 'Produits locaux', 'Expérience soufie'], category: 'cultural' as SiteCategory, icon: Sparkles, tone: 'from-[#176052] to-[#3B8B70]' },
    ],
  },
  en: {
    eyebrow: 'Discover the Souf desert',
    title: 'Saharan tourism circuits in El Oued Province',
    subtitle: 'Suggested routes combining Souf architecture, oases, dunes, local culture and traditional crafts.',
    note: 'These circuits are an initial editorial framework; the sites and coordinates actually published are available on the official map.',
    explore: 'Explore circuit points on the map',
    circuits: [
      { title: 'Souf heritage and architecture circuit', description: 'Discover ksour, historic gates, domes and architectural features that define the towns of the Souf.', tags: ['Built heritage', 'Ksour', 'Culture'], category: 'historical' as SiteCategory, icon: Mountain, tone: 'from-[#6D452D] to-[#B9854B]' },
      { title: 'Oases and golden dunes circuit', description: 'A Saharan route through ghout gardens, palm groves, golden sands and the open desert experience.', tags: ['Oases', 'Nature', 'Dunes'], category: 'natural' as SiteCategory, icon: Sun, tone: 'from-[#A66A35] to-[#D19A5A]' },
      { title: 'Souf culture and crafts circuit', description: 'A local experience around crafts, carpets, palm products, dates and Souf hospitality.', tags: ['Crafts', 'Local products', 'Souf experience'], category: 'cultural' as SiteCategory, icon: Sparkles, tone: 'from-[#176052] to-[#3B8B70]' },
    ],
  },
} as const;

export const SaharanCircuits: React.FC = () => {
  const { language, isRTL, sites, setActiveTab, setSelectedCategory } = useApp();
  const current = copy[language];

  const openCircuit = (category: SiteCategory) => {
    setSelectedCategory(category);
    setActiveTab('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#17324D] px-4 py-12 text-white sm:px-8" aria-labelledby="saharan-circuits-title">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_12%_20%,rgba(216,172,109,.35),transparent_24%),radial-gradient(circle_at_90%_90%,rgba(48,143,112,.25),transparent_26%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#E5BB7C]"><Compass className="h-4 w-4" />{current.eyebrow}</div>
            <h2 id="saharan-circuits-title" className="font-heading text-3xl font-black leading-tight sm:text-4xl">{current.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">{current.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-xs text-slate-200 backdrop-blur-sm"><Route className="h-4 w-4 shrink-0 text-[#E5BB7C]" /><span>{sites.length} {language === 'ar' ? 'نقطة منشورة على الخريطة' : language === 'fr' ? 'points publiés sur la carte' : 'published map points'}</span></div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {current.circuits.map((circuit, index) => {
            const Icon = circuit.icon;
            const count = sites.filter((site) => site.category === circuit.category).length;
            return (
              <article key={circuit.title} className="group overflow-hidden rounded-[1.6rem] border border-white/15 bg-[#10283F] shadow-[0_18px_45px_rgba(3,15,29,.25)] transition duration-300 hover:-translate-y-1 hover:border-[#E5BB7C]/60">
                <div className={`relative flex min-h-44 flex-col justify-between overflow-hidden bg-gradient-to-br ${circuit.tone} p-6`}>
                  <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border border-white/20 bg-white/10 blur-sm" />
                  <div className="relative flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/15 ring-1 ring-white/20"><Icon className="h-6 w-6" /></span><span className="rounded-full border border-white/25 bg-black/10 px-3 py-1 text-[10px] font-bold tracking-wider">0{index + 1}</span></div>
                  <div className="relative mt-8"><h3 className="font-heading text-xl font-black leading-snug">{circuit.title}</h3><div className="mt-2 flex items-center gap-2 text-xs text-white/80"><MapPinned className="h-3.5 w-3.5" />{count} {language === 'ar' ? 'نقطة من الفئة' : language === 'fr' ? 'points de cette catégorie' : 'points in this category'}</div></div>
                </div>
                <div className="p-6"><p className="min-h-20 text-sm leading-6 text-slate-300">{circuit.description}</p><div className="mt-4 flex flex-wrap gap-2">{circuit.tags.map((tag) => <span key={tag} className="rounded-full bg-white/8 px-2.5 py-1 text-[11px] text-slate-200">{tag}</span>)}</div><button onClick={() => openCircuit(circuit.category)} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E5BB7C] px-4 py-3 text-xs font-bold text-[#17324D] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#E5BB7C]">{current.explore}{isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}</button></div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#E5BB7C]/25 bg-[#0E253B]/70 px-4 py-3 text-xs leading-6 text-slate-300"><MapPinned className="mt-1 h-4 w-4 shrink-0 text-[#E5BB7C]" /><p>{current.note}</p></div>
      </div>
    </section>
  );
};
