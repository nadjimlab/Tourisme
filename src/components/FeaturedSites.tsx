import React from 'react';
import { useApp } from '../context/AppContext';
import { TouristSite } from '../types';
import { ArrowLeft, ArrowRight, Compass, MapPin, Star } from 'lucide-react';

export const FeaturedSites: React.FC = () => {
  const { language, t, sites, setActiveTab, setSelectedSiteId } = useApp();
  const visibleSites = sites.slice(0, 6);
  const isRTL = language === 'ar';
  const labels = {
    ar: { eyebrow: 'وجهات مختارة', title: 'اكتشف معالم الوادي', subtitle: 'بطاقات مختارة من قاعدة المعالم الحالية، مع معلومات الموقع والوصف والصور والاتجاهات المتاحة.', all: 'عرض جميع المعالم', details: 'تفاصيل المعلم', noSites: 'لا توجد معالم منشورة للعرض حالياً' },
    fr: { eyebrow: 'Destinations sélectionnées', title: 'Découvrez les sites d’El Oued', subtitle: 'Une sélection issue du catalogue actuel, avec les informations de localisation, descriptions et images disponibles.', all: 'Voir tous les sites', details: 'Voir les détails', noSites: 'Aucun site publié pour le moment' },
    en: { eyebrow: 'Selected destinations', title: 'Discover El Oued sites', subtitle: 'A selection from the current catalogue, with available location, description and image information.', all: 'View all sites', details: 'View details', noSites: 'No published sites at the moment' },
  } as const;
  const copy = labels[language];

  const openSite = (site: TouristSite) => {
    setSelectedSiteId(site.id);
    setActiveTab('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryLabel = (site: TouristSite) => t.categories[site.category] || site.category;

  return (
    <section className="relative overflow-hidden bg-[#F8F5EF] px-4 py-12 sm:px-8" aria-labelledby="featured-sites-title">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#EDE0CC]/50 to-transparent" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#B8874D]"><Compass className="h-4 w-4" />{copy.eyebrow}</div>
            <h2 id="featured-sites-title" className="font-heading text-3xl font-black text-[#17324D] sm:text-4xl">{copy.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">{copy.subtitle}</p>
          </div>
          <button onClick={() => { setActiveTab('map'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#CDA36F] bg-white px-4 py-2.5 text-xs font-bold text-[#17324D] transition hover:bg-[#17324D] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#B8874D]">{copy.all}{isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}</button>
        </div>

        {visibleSites.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#D8C7AF] bg-white px-6 py-12 text-center text-sm font-semibold text-slate-600">{copy.noSites}</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleSites.map((site) => {
              const title = site.name[language] || site.name.ar;
              const description = site.description[language] || site.description.ar;
              return (
                <article key={site.id} className="group overflow-hidden rounded-[1.6rem] border border-[#E7DCCB] bg-white shadow-[0_10px_28px_rgba(36,49,63,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(36,49,63,.13)]">
                  <div className="relative h-52 overflow-hidden bg-[#17324D]">
                    {site.images[0] ? <img src={site.images[0]} alt={title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_20%_20%,#CDA36F,#17324D_65%)]"><Compass className="h-12 w-12 text-white/80" /></div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10253B] via-transparent to-transparent" />
                    <span className="absolute right-3 top-3 rounded-full border border-white/30 bg-[#17324D]/85 px-3 py-1 text-[10px] font-bold text-[#F5D0A9]">{categoryLabel(site)}</span>
                    <div className="absolute bottom-4 left-4 right-4 text-white"><div className="flex items-center gap-1.5 text-[11px] text-[#F5D0A9]"><MapPin className="h-3.5 w-3.5" />{site.commune[language] || site.commune.ar}</div><h3 className="mt-1 truncate font-heading text-xl font-bold">{title}</h3></div>
                  </div>
                  <div className="space-y-4 p-5">
                    <p className="line-clamp-2 min-h-12 text-sm leading-6 text-slate-600">{description || (language === 'ar' ? 'معلومات المعلم قيد التحديث من المصالح المختصة.' : language === 'fr' ? 'Les informations de ce site sont en cours de mise à jour.' : 'Site information is being updated by the competent services.')}</p>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500"><span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-[#D5A566] text-[#B8874D]" />{site.rating > 0 ? site.rating.toFixed(1) : '—'}</span><span>{site.coordinates[0].toFixed(3)}, {site.coordinates[1].toFixed(3)}</span></div>
                    <button onClick={() => openSite(site)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#17324D] py-3 text-xs font-bold text-white transition hover:bg-[#0C6B58] focus:outline-none focus:ring-2 focus:ring-[#B8874D]">{copy.details}{isRTL ? <ArrowLeft className="h-4 w-4 text-[#F5D0A9]" /> : <ArrowRight className="h-4 w-4 text-[#F5D0A9]" />}</button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
