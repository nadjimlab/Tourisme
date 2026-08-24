import React from 'react';
import { ArrowLeft, ArrowRight, BedDouble, BriefcaseBusiness, Compass, Map, Sparkles } from 'lucide-react';
import { useApp, NavTab } from '../context/AppContext';

const cards = {
  ar: [
    { id: 'discover', title: 'اكتشف الوادي', description: 'المواقع السياحية والمسالك والمعالم المنشورة على الخريطة.', tab: 'map' as NavTab, icon: Compass, tone: 'from-[#17324D] to-[#285A67]' },
    { id: 'hospitality', title: 'أين تأكل وتقيم؟', description: 'اعثر على خيارات الإقامة والمطاعم والخدمات من خلال الخريطة.', tab: 'map' as NavTab, icon: BedDouble, tone: 'from-[#7A5030] to-[#B8874D]' },
    { id: 'crafts', title: 'صناعتنا التقليدية', description: 'تعرّف على الحرفيين والمنتجات الأصيلة في وادي سوف.', tab: 'artisan' as NavTab, icon: Sparkles, tone: 'from-[#0C6B58] to-[#2D8B70]' },
    { id: 'invest', title: 'كيف تستثمر؟', description: 'معلومات ومجالات الاستثمار السياحي ودعم المستثمرين.', tab: 'investment' as NavTab, icon: BriefcaseBusiness, tone: 'from-[#263A63] to-[#4D638F]' },
  ],
  fr: [
    { id: 'discover', title: 'Découvrez El Oued', description: 'Sites touristiques, circuits et repères publiés sur la carte.', tab: 'map' as NavTab, icon: Compass, tone: 'from-[#17324D] to-[#285A67]' },
    { id: 'hospitality', title: 'Où manger et dormir ?', description: 'Retrouvez les hébergements, restaurants et services disponibles sur la carte.', tab: 'map' as NavTab, icon: BedDouble, tone: 'from-[#7A5030] to-[#B8874D]' },
    { id: 'crafts', title: 'Notre artisanat', description: 'Découvrez les artisans et les produits authentiques du Souf.', tab: 'artisan' as NavTab, icon: Sparkles, tone: 'from-[#0C6B58] to-[#2D8B70]' },
    { id: 'invest', title: 'Comment investir ?', description: 'Informations sur l’investissement touristique et l’accompagnement des porteurs de projets.', tab: 'investment' as NavTab, icon: BriefcaseBusiness, tone: 'from-[#263A63] to-[#4D638F]' },
  ],
  en: [
    { id: 'discover', title: 'Discover El Oued', description: 'Tourist sites, circuits and published landmarks on the map.', tab: 'map' as NavTab, icon: Compass, tone: 'from-[#17324D] to-[#285A67]' },
    { id: 'hospitality', title: 'Where to eat and stay?', description: 'Find available accommodation, dining and services on the map.', tab: 'map' as NavTab, icon: BedDouble, tone: 'from-[#7A5030] to-[#B8874D]' },
    { id: 'crafts', title: 'Our handicrafts', description: 'Meet local artisans and discover authentic Souf products.', tab: 'artisan' as NavTab, icon: Sparkles, tone: 'from-[#0C6B58] to-[#2D8B70]' },
    { id: 'invest', title: 'How to invest?', description: 'Information on tourism investment and support for project owners.', tab: 'investment' as NavTab, icon: BriefcaseBusiness, tone: 'from-[#263A63] to-[#4D638F]' },
  ],
} as const;

const headings = {
  ar: { eyebrow: 'دليل الولاية', title: 'خطّط لزيارتك أو مشروعك', subtitle: 'وصول سريع إلى أهم المسارات والخدمات التي تحتاجها لاكتشاف الوادي أو الاستثمار فيها.' },
  fr: { eyebrow: 'Guide de la wilaya', title: 'Préparez votre visite ou votre projet', subtitle: 'Accédez rapidement aux parcours et services essentiels pour découvrir El Oued ou y investir.' },
  en: { eyebrow: 'Wilaya guide', title: 'Plan your visit or your project', subtitle: 'Quick access to the essential paths and services for discovering or investing in El Oued.' },
} as const;

export const TourismDirectory: React.FC = () => {
  const { language, isRTL, setActiveTab } = useApp();
  const copy = headings[language];
  const items = cards[language];

  const openSection = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#17324D] px-4 py-12 text-white sm:px-8" aria-labelledby="tourism-directory-title">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_8%_18%,rgba(200,157,102,.22),transparent_24%),radial-gradient(circle_at_92%_82%,rgba(12,107,88,.24),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-7 max-w-2xl">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#F5D0A9]"><Map className="h-4 w-4" />{copy.eyebrow}</div>
          <h2 id="tourism-directory-title" className="font-heading text-3xl font-black sm:text-4xl">{copy.title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-200 sm:text-base">{copy.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => openSection(item.tab)} className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5 text-start shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#F5D0A9]/70 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#F5D0A9]">
                <div className={`mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.tone} shadow-md`}><Icon className="h-5 w-5 text-white" /></div>
                <h3 className="font-heading text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 min-h-14 text-xs leading-6 text-slate-200">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#F5D0A9]">
                  {language === 'ar' ? 'فتح القسم' : language === 'fr' ? 'Ouvrir la section' : 'Open section'}
                  {isRTL ? <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
