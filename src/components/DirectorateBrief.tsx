import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ArrowRight, Building2, Mail, ShieldCheck } from 'lucide-react';

export const DirectorateBrief: React.FC = () => {
  const { language, setActiveTab, t } = useApp();
  const isRTL = language === 'ar';
  const content = {
    ar: {
      eyebrow: 'المؤسسة والشفافية',
      title: 'مديرية السياحة والصناعة التقليدية لولاية الوادي',
      body: 'تعمل المديرية على تنفيذ السياسة القطاعية في مجال السياحة والصناعة التقليدية، تثمين التراث السوفي، مرافقة الحرفيين والفاعلين المحليين، وتيسير وصول المواطن والزائر إلى المعلومة والخدمة العمومية.',
      mission: 'معلومة رسمية، خدمة عمومية، وتراث محلي مستدام.',
      about: 'تعرف على المديرية',
      contact: 'اتصل بالمديرية',
    },
    fr: {
      eyebrow: 'Institution & transparence',
      title: 'Direction du Tourisme et de l’Artisanat de la wilaya d’El Oued',
      body: 'La Direction met en œuvre la politique sectorielle du tourisme et de l’artisanat, valorise le patrimoine soufi, accompagne les artisans et facilite l’accès des citoyens et visiteurs à l’information et au service public.',
      mission: 'Information officielle, service public et patrimoine local durable.',
      about: 'À propos de la Direction',
      contact: 'Contacter la Direction',
    },
    en: {
      eyebrow: 'Institution & transparency',
      title: 'Directorate of Tourism and Handicrafts of El Oued Province',
      body: 'The Directorate implements sector policy in tourism and handicrafts, promotes Soufi heritage, supports artisans and local stakeholders, and facilitates public access to reliable information and services.',
      mission: 'Official information, public service and sustainable local heritage.',
      about: 'About the Directorate',
      contact: 'Contact the Directorate',
    },
  } as const;
  const copy = content[language];

  return (
    <section className="bg-[#17324D] px-4 py-12 text-white sm:px-8" aria-labelledby="directorate-brief-title">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#F1C98D]"><Building2 className="h-4 w-4" />{copy.eyebrow}</div>
          <h2 id="directorate-brief-title" className="font-heading text-2xl font-black leading-tight sm:text-3xl">{copy.title}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-200 sm:text-base">{copy.body}</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-[#F5D0A9]"><ShieldCheck className="h-4 w-4" />{copy.mission}</div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D5A566] px-5 py-3 text-xs font-bold text-[#17324D] transition hover:bg-[#F1C98D] focus:outline-none focus:ring-2 focus:ring-white">{copy.about}{isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}</button>
          <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-transparent px-5 py-3 text-xs font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#F1C98D]"><Mail className="h-4 w-4 text-[#F1C98D]" />{copy.contact}</button>
        </div>
      </div>
    </section>
  );
};
