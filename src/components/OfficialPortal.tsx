import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

const copy = {
  ar: {
    eyebrow: 'الصفحة الرسمية للمديرية',
    title: 'مديرية السياحة والصناعة التقليدية لولاية الوادي',
    intro: 'فضاء مؤسسي للتعريف بالمديرية وولاية الوادي وتراثها السياحي، مع الحفاظ على الوصول إلى بقية الخدمات من خلال شريط التنقل.',
    imageAlt: 'كثبان وادي سوف والخيام الصحراوية',
  },
  fr: {
    eyebrow: 'Portail officiel de la Direction',
    title: 'Direction du Tourisme et de l’Artisanat de la wilaya d’El Oued',
    intro: 'Un espace institutionnel consacré à la Direction, à la wilaya d’El Oued et à son patrimoine touristique. Les autres services restent accessibles depuis la navigation principale.',
    imageAlt: 'Dunes du Souf et tentes sahariennes',
  },
  en: {
    eyebrow: 'Official Directorate portal',
    title: 'Directorate of Tourism and Handicrafts of El Oued Province',
    intro: 'An institutional space presenting the Directorate, El Oued Province and its tourism heritage. All other services remain available through the main navigation.',
    imageAlt: 'Souf dunes and Saharan tents',
  },
} as const;

export const OfficialPortal: React.FC = () => {
  const { language } = useApp();
  const current = copy[language];

  return (
    <section className="relative min-h-[420px] overflow-hidden px-4 py-16 text-white sm:min-h-[520px] sm:px-8">
      <img
        src={`${import.meta.env.BASE_URL}el-oued-souf-hero.jpg`}
        alt={current.imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
        width="2560"
        height="1440"
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#17324D]/85 to-[#17324D]/65" />
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_15%_25%,rgba(200,157,102,.35),transparent_24%),radial-gradient(circle_at_85%_85%,rgba(12,107,88,.3),transparent_28%)]" />
      <div className="relative mx-auto flex min-h-[388px] max-w-7xl items-center sm:min-h-[488px]">
        <div className="max-w-4xl">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#E5BB7C]"><ShieldCheck className="h-4 w-4" />{current.eyebrow}</div>
          <h1 className="font-heading text-3xl font-black leading-tight sm:text-5xl">{current.title}</h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-200 sm:text-lg">{current.intro}</p>
        </div>
      </div>
    </section>
  );
};
