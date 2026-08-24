import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Compass, Leaf, MapPinned } from 'lucide-react';

export const ProvinceIntro: React.FC = () => {
  const { language, setActiveTab } = useApp();

  const content = {
    ar: {
      eyebrow: 'ولاية الوادي | وادي سوف',
      title: 'نبذة عن ولاية الوادي',
      text: 'تقع ولاية الوادي في الجنوب الشرقي للجزائر، وتتميز بواحاتها الممتدة، كثبانها الذهبية، وعمارتها السوفية ذات القباب المتفردة. تجمع الولاية بين الذاكرة التاريخية، الطبيعة الصحراوية، والصناعة التقليدية الأصيلة، لتقدم للزائر تجربة ثقافية وسياحية غنية.',
      cta: 'اكتشف معالم الولاية',
      items: [
        ['التراث السوفي', 'قباب وعمارة تقليدية تحكي تاريخ المنطقة', Building2],
        ['واحات وطبيعة', 'غيطان نخيل وكثبان ومسالك صحراوية', Leaf],
        ['وجهة مفتوحة', 'معالم وخدمات ومواقع قابلة للاستكشاف', Compass],
      ],
    },
    fr: {
      eyebrow: 'Wilaya d’El Oued | Le Souf',
      title: 'À propos de la wilaya d’El Oued',
      text: 'Située au sud-est de l’Algérie, la wilaya d’El Oued se distingue par ses oasis, ses dunes dorées et son architecture soufie aux coupoles singulières. Elle réunit patrimoine, nature saharienne et artisanat authentique pour offrir une expérience touristique et culturelle complète.',
      cta: 'Découvrir les sites de la wilaya',
      items: [
        ['Patrimoine soufi', 'Coupoles et architecture traditionnelle', Building2],
        ['Oasis et nature', 'Palmeraies, dunes et itinéraires sahariens', Leaf],
        ['Destination ouverte', 'Sites et services à découvrir', Compass],
      ],
    },
    en: {
      eyebrow: 'El Oued Province | The Souf',
      title: 'About El Oued Province',
      text: 'Located in south-eastern Algeria, El Oued Province is known for its palm oases, golden dunes and distinctive Soufi domed architecture. Heritage, desert landscapes and authentic handicrafts come together to offer visitors a rich cultural and tourism experience.',
      cta: 'Discover the province sites',
      items: [
        ['Soufi heritage', 'Domes and traditional architecture', Building2],
        ['Oases and nature', 'Palm groves, dunes and desert routes', Leaf],
        ['An open destination', 'Sites and services to explore', Compass],
      ],
    },
  } as const;

  const current = content[language];

  return (
    <section className="px-4 py-4 sm:px-8 sm:py-6" aria-labelledby="province-intro-title">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#E7DCCB] bg-white shadow-[0_12px_34px_rgba(36,49,63,.06)]">
        <div className="grid lg:grid-cols-[1.2fr_.8fr]">
          <div className="relative overflow-hidden bg-[#17324D] px-6 py-8 text-white sm:px-10 sm:py-10">
            <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full border border-[#E6C28E]/20" />
            <div className="absolute -bottom-24 -right-10 h-56 w-56 rounded-full border border-[#E6C28E]/15" />
            <div className="relative">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#F1C98D]"><MapPinned className="h-4 w-4" />{current.eyebrow}</div>
              <h2 id="province-intro-title" className="font-heading text-2xl font-black leading-tight sm:text-3xl">{current.title}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">{current.text}</p>
              <button onClick={() => setActiveTab('map')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D5A566] px-4 py-2.5 text-xs font-bold text-[#17324D] transition hover:bg-[#F1C98D] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#17324D]">{current.cta}<Compass className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 bg-[#FCFAF6] p-5 sm:grid-cols-3 lg:grid-cols-1 lg:p-8">
            {current.items.map(([title, text, Icon]) => (
              <div key={title} className="flex items-start gap-3 rounded-2xl border border-[#E7DCCB] bg-white p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4E8D8] text-[#B8874D]"><Icon className="h-4 w-4" /></span>
                <div><h3 className="text-sm font-bold text-[#17324D]">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-600">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
