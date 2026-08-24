import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  ExternalLink,
  FileText,
  Landmark,
  Mail,
  MapPin,
  Newspaper,
  Phone,
  ShieldCheck,
  Waves,
} from 'lucide-react';
import { NavTab, useApp } from '../context/AppContext';

const copy = {
  ar: {
    eyebrow: 'معلومة رسمية من المديرية',
    title: 'الصفحة الرسمية لمديرية السياحة والصناعة التقليدية لولاية الوادي',
    intro: 'فضاء مؤسسي للتعريف بالمديرية، بولاية الوادي وتراثها السياحي، وبالخدمات والمعلومات المنشورة من المصالح المختصة.',
    sourceLabel: 'المصدر الرسمي',
    sourceText: 'تم إعداد هذا الملخص اعتماداً على المعلومات المنشورة في البوابة الرسمية للمديرية.',
    aboutTitle: 'عن ولاية الوادي',
    aboutText: 'تتميز ولاية الوادي بطابعها العمراني وتراثها المتنوع، وبموقعها في الصحراء الوسطى. وتضم مواقع طبيعية، مساجد وزوايا، أسواقاً شعبية ومدناً عتيقة، إضافة إلى غيطان النخيل المحاطة بالكثبان الرملية للعرق الشرقي الكبير.',
    heritageText: 'ويشمل تراث المنطقة الصناعات التقليدية والعادات والتقاليد واللباس التقليدي وفنون الطهي والفولكلور، مما يجعلها وجهة للسياحة الصحراوية والثقافية والبيئية.',
    missionTitle: 'مهام المديرية ومجالات العمل',
    missionText: 'تعمل المديرية على تطوير وتنمية السياحة من خلال دعم الاستثمارات والمنتجات السياحية وتنميتها، ومرافقة المستثمرين، والتعريف بالتراث السياحي والصناعة التقليدية في الولاية.',
    officialServices: 'الخدمات والروابط الرسمية',
    services: [
      { title: 'التعريف بالولاية', description: 'معلومات عن الولاية وتراثها ومقوماتها السياحية.', tab: 'about' as NavTab, icon: Landmark },
      { title: 'المواقع والمسالك السياحية', description: 'اكتشف المواقع والمسالك المنشورة على الخريطة.', tab: 'map' as NavTab, icon: MapPin },
      { title: 'الاستثمار السياحي', description: 'معلومات عن الاستثمار والمنتجات السياحية ومرافقة المستثمرين.', tab: 'investment' as NavTab, icon: Waves },
      { title: 'الخدمات والشكاوى', description: 'أرسل طلباً أو شكوى وتابع رقم الملف عبر البوابة الرقمية.', tab: 'services' as NavTab, icon: FileText },
    ],
    newsTitle: 'الأخبار والبلاغات الرسمية',
    newsCount: 'بيانات منشورة حالياً',
    newsEmpty: 'لا توجد بيانات أو بلاغات منشورة حالياً. ستظهر الأخبار بعد اعتمادها ونشرها من المصالح المختصة.',
    openNews: 'فتح الأخبار والمستجدات',
    contactTitle: 'بيانات الاتصال الرسمية',
    address: 'حي الشط 08 ماي 1945، بلدية الوادي',
    phone: 'الهاتف',
    fax: 'الفاكس',
    email: 'البريد الإلكتروني',
    sourceCta: 'زيارة الموقع الرسمي',
    verified: 'معلومات مستخرجة من المصدر الحكومي',
    documentsTitle: 'الوثائق والتحميلات',
    documentsText: 'سيتم نشر الاستمارات والوثائق الرسمية هنا بعد التحقق منها واعتمادها. لا يتم عرض ملفات غير موثقة.',
    contactCta: 'التواصل مع المديرية',
    documentsCta: 'فتح صفحة التحميل الرسمية',
  },
  fr: {
    eyebrow: 'Information officielle de la Direction',
    title: 'Portail officiel de la Direction du Tourisme et de l’Artisanat de la wilaya d’El Oued',
    intro: 'Un espace institutionnel consacré à la Direction, à la wilaya d’El Oued et à son patrimoine touristique, ainsi qu’aux services et informations publiés par les services compétents.',
    sourceLabel: 'Source officielle',
    sourceText: 'Ce résumé est établi à partir des informations publiées sur le portail officiel de la Direction.',
    aboutTitle: 'À propos de la wilaya d’El Oued',
    aboutText: 'La wilaya d’El Oued se distingue par son caractère urbain et la richesse de son patrimoine, ainsi que par sa situation dans le désert central. Elle comprend des sites naturels, des mosquées et zaouïas, des marchés populaires et des villes anciennes, ainsi que des ghout de palmiers entourés par les dunes du Grand Erg Oriental.',
    heritageText: 'Le patrimoine local comprend également les métiers traditionnels, les coutumes, le costume traditionnel, la gastronomie et le folklore, faisant de la région une destination de tourisme saharien, culturel et environnemental.',
    missionTitle: 'Missions et domaines d’action',
    missionText: 'La Direction œuvre au développement du tourisme en soutenant les investissements et les produits touristiques, en accompagnant les investisseurs et en valorisant le patrimoine touristique et l’artisanat de la wilaya.',
    officialServices: 'Services et liens officiels',
    services: [
      { title: 'Notre wilaya', description: 'Informations sur la wilaya, son patrimoine et ses atouts touristiques.', tab: 'about' as NavTab, icon: Landmark },
      { title: 'Sites et circuits touristiques', description: 'Découvrez les sites et circuits publiés sur la carte.', tab: 'map' as NavTab, icon: MapPin },
      { title: 'Investissement touristique', description: 'Informations sur l’investissement, les produits touristiques et l’accompagnement.', tab: 'investment' as NavTab, icon: Waves },
      { title: 'Services et réclamations', description: 'Déposez une demande ou une réclamation et suivez votre dossier.', tab: 'services' as NavTab, icon: FileText },
    ],
    newsTitle: 'Actualités et communiqués officiels',
    newsCount: 'communiqués actuellement publiés',
    newsEmpty: 'Aucun communiqué n’est actuellement publié. Les actualités apparaîtront après validation et publication par les services compétents.',
    openNews: 'Ouvrir les actualités',
    contactTitle: 'Coordonnées officielles',
    address: 'Quartier Al-Shatt, 08 mai 1945, commune d’El Oued',
    phone: 'Téléphone',
    fax: 'Fax',
    email: 'Courriel',
    sourceCta: 'Visiter le site officiel',
    verified: 'Informations relevées sur la source gouvernementale',
    documentsTitle: 'Documents et téléchargements',
    documentsText: 'Les formulaires et documents officiels seront publiés ici après vérification et validation. Aucun fichier non vérifié n’est présenté.',
    contactCta: 'Contacter la Direction',
    documentsCta: 'Ouvrir la page officielle de téléchargement',
  },
  en: {
    eyebrow: 'Official Directorate information',
    title: 'Official portal of the Directorate of Tourism and Handicrafts of El Oued Province',
    intro: 'An institutional space presenting the Directorate, El Oued Province and its tourism heritage, together with services and information published by the competent authorities.',
    sourceLabel: 'Official source',
    sourceText: 'This summary is based on information published on the Directorate’s official portal.',
    aboutTitle: 'About El Oued Province',
    aboutText: 'El Oued Province is known for its urban character and rich heritage, as well as its location in the central desert. It includes natural sites, mosques and zawiyas, popular markets and ancient towns, together with palm ghout surrounded by the dunes of the Great Eastern Erg.',
    heritageText: 'The local heritage also includes traditional crafts, customs, traditional dress, culinary arts and folklore, making the region a destination for Saharan, cultural and environmental tourism.',
    missionTitle: 'Mission and areas of action',
    missionText: 'The Directorate works to develop tourism by supporting tourism investment and products, assisting investors, and promoting the province’s tourism heritage and handicrafts.',
    officialServices: 'Official services and links',
    services: [
      { title: 'Our Wilaya', description: 'Information about the province, its heritage and tourism assets.', tab: 'about' as NavTab, icon: Landmark },
      { title: 'Tourist sites and circuits', description: 'Explore sites and circuits published on the map.', tab: 'map' as NavTab, icon: MapPin },
      { title: 'Tourism investment', description: 'Information on investment, tourism products and investor support.', tab: 'investment' as NavTab, icon: Waves },
      { title: 'Services and complaints', description: 'Submit a request or complaint and track your case.', tab: 'services' as NavTab, icon: FileText },
    ],
    newsTitle: 'Official news and announcements',
    newsCount: 'announcements currently published',
    newsEmpty: 'No official announcements are currently published. News will appear after validation and publication by the competent services.',
    openNews: 'Open news and updates',
    contactTitle: 'Official contact details',
    address: 'Al-Shatt District, May 08, 1945, El Oued municipality',
    phone: 'Phone',
    fax: 'Fax',
    email: 'Email',
    sourceCta: 'Visit official website',
    verified: 'Information collected from the government source',
    documentsTitle: 'Documents and downloads',
    documentsText: 'Official forms and documents will be published here after verification and approval. No unverified files are displayed.',
    contactCta: 'Contact the Directorate',
    documentsCta: 'Open official downloads',
  },
} as const;

export const OfficialPortal: React.FC = () => {
  const { language, isRTL, news, setActiveTab } = useApp();
  const current = copy[language];

  const openSection = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF7F2] pb-12">
      <section className="relative min-h-[420px] overflow-hidden px-4 py-16 text-white sm:min-h-[520px] sm:px-8">
        <img src={`${import.meta.env.BASE_URL}el-oued-souf-hero.jpg`} alt={language === 'ar' ? 'كثبان وادي سوف وخيام الصحراء' : language === 'fr' ? 'Dunes du Souf et tentes sahariennes' : 'Souf dunes and Saharan tents'} className="absolute inset-0 h-full w-full object-cover" width="2560" height="1440" loading="eager" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#17324D]/85 to-[#17324D]/65" />
        <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_15%_25%,rgba(200,157,102,.35),transparent_24%),radial-gradient(circle_at_85%_85%,rgba(12,107,88,.3),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#E5BB7C]"><ShieldCheck className="h-4 w-4" />{current.eyebrow}</div>
            <h1 className="font-heading text-3xl font-black leading-tight sm:text-5xl">{current.title}</h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-200 sm:text-lg">{current.intro}</p>

          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-8 lg:grid-cols-[1.35fr_.65fr]">
        <section className="rounded-[1.6rem] border border-[#E8DCCD] bg-white p-6 shadow-sm sm:p-8" aria-labelledby="official-about-title">
          <div className="mb-5 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4EDE4] text-[#B8874D]"><Landmark className="h-5 w-5" /></span><h2 id="official-about-title" className="font-heading text-2xl font-black text-[#17324D]">{current.aboutTitle}</h2></div>
          <p className="text-sm leading-7 text-slate-700">{current.aboutText}</p>
          <p className="mt-4 text-sm leading-7 text-slate-700">{current.heritageText}</p>
          <div className="mt-6 rounded-2xl border-s-4 border-[#C89D66] bg-[#FAF7F2] p-4 text-xs leading-6 text-slate-600"><strong className="text-[#17324D]">{current.sourceLabel}: </strong>{current.sourceText}</div>
        </section>

        <section className="rounded-[1.6rem] bg-[#0C6B58] p-6 text-white shadow-sm sm:p-8" aria-labelledby="official-contact-title">
          <div className="mb-5 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15"><Phone className="h-5 w-5" /></span><h2 id="official-contact-title" className="font-heading text-2xl font-black">{current.contactTitle}</h2></div>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-[#E5BB7C]" /><span>{current.address}</span></div>
            <div className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-[#E5BB7C]" /><span><strong>{current.phone}:</strong> <a className="underline decoration-white/40 underline-offset-4" href="tel:+21332122498">+213 32 12 24 98</a></span></div>
            <div className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-[#E5BB7C]" /><span><strong>{current.fax}:</strong> +213 32 12 24 99</span></div>
            <div className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-[#E5BB7C]" /><a className="break-all underline decoration-white/40 underline-offset-4" href="mailto:dta.eloued@mta.gov.dz">dta.eloued@mta.gov.dz</a></div>
          </div>
          <button onClick={() => openSection('contact')} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-bold text-[#0C6B58] transition hover:bg-[#E5BB7C] hover:text-[#17324D] focus:outline-none focus:ring-2 focus:ring-white">{current.contactCta}{isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}</button>
        </section>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-2 sm:px-8" aria-labelledby="official-mission-title">
        <div className="rounded-[1.6rem] border border-[#E8DCCD] bg-[#17324D] p-6 text-white sm:p-8"><div className="flex items-start gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C89D66]/20 text-[#E5BB7C]"><Waves className="h-5 w-5" /></div><div><h2 id="official-mission-title" className="font-heading text-2xl font-black">{current.missionTitle}</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-slate-200">{current.missionText}</p></div></div></div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8" aria-labelledby="official-services-title">
        <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#B8874D]">{current.eyebrow}</p><h2 id="official-services-title" className="mt-1 font-heading text-2xl font-black text-[#17324D]">{current.officialServices}</h2></div></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {current.services.map((service) => { const Icon = service.icon; return <button key={service.title} onClick={() => openSection(service.tab)} className="group rounded-2xl border border-[#E8DCCD] bg-white p-5 text-start shadow-sm transition hover:-translate-y-1 hover:border-[#C89D66] focus:outline-none focus:ring-2 focus:ring-[#C89D66]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EDE4] text-[#0C6B58] transition group-hover:bg-[#0C6B58] group-hover:text-white"><Icon className="h-5 w-5" /></span><h3 className="mt-4 text-sm font-bold text-[#17324D]">{service.title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{service.description}</p></button>; })}
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-8 lg:grid-cols-2">
        <section className="rounded-[1.6rem] border border-[#E8DCCD] bg-white p-6 shadow-sm" aria-labelledby="official-news-title">
          <div className="flex items-start justify-between gap-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EDE4] text-[#B8874D]"><Newspaper className="h-5 w-5" /></span><div><h2 id="official-news-title" className="font-heading text-xl font-black text-[#17324D]">{current.newsTitle}</h2><p className="mt-1 text-xs text-slate-500">{news.length} {current.newsCount}</p></div></div><BellRing className="h-5 w-5 text-[#C89D66]" /></div>
          {news.length === 0 ? <p className="mt-5 rounded-xl bg-[#FAF7F2] p-4 text-xs leading-6 text-slate-600">{current.newsEmpty}</p> : <button onClick={() => openSection('news')} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#17324D] px-4 py-3 text-xs font-bold text-white">{current.openNews}{isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}</button>}
        </section>

        <section className="rounded-[1.6rem] border border-[#E8DCCD] bg-white p-6 shadow-sm" aria-labelledby="official-documents-title"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EDE4] text-[#0C6B58]"><FileText className="h-5 w-5" /></span><h2 id="official-documents-title" className="font-heading text-xl font-black text-[#17324D]">{current.documentsTitle}</h2></div><p className="mt-5 rounded-xl bg-[#FAF7F2] p-4 text-xs leading-6 text-slate-600">{current.documentsText}</p><a href="https://el-oued.mta.gov.dz/fr/telechargement/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#17324D] px-4 py-3 text-xs font-bold text-[#17324D] transition hover:bg-[#17324D] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#C89D66]">{current.documentsCta}<ExternalLink className="h-4 w-4" /></a></section>
      </div>
    </div>
  );
};
