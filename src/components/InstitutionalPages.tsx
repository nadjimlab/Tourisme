import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, Clock3, FileText, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

const copy = {
  ar: {
    eyebrow: 'المؤسسة والشفافية',
    aboutTitle: 'عن مديرية السياحة والصناعة التقليدية لولاية الوادي',
    aboutLead: 'بوابة رقمية رسمية للتعريف بالوجهة السياحية، مرافقة المتعاملين، وتيسير وصول المواطن إلى المعلومة والخدمة العمومية.',
    missionTitle: 'مهمتنا',
    mission: 'تعمل المديرية على تنفيذ السياسة القطاعية في مجال السياحة والصناعة التقليدية، تثمين التراث السوفي، دعم الاستثمار، ومرافقة الحرفيين والفاعلين المحليين وفق الأطر التنظيمية المعمول بها.',
    valuesTitle: 'مبادئ الخدمة العمومية',
    values: ['المعلومة الرسمية الموثوقة', 'المساواة في الوصول إلى الخدمة', 'حماية التراث والموارد الطبيعية', 'تشجيع المبادرات المحلية المستدامة'],
    contactTitle: 'اتصل بنا',
    contactLead: 'للاستفسارات والمراسلات الرسمية، استخدم بيانات الاتصال التالية أو أرسل طلباً عبر فضاء الخدمات الرقمية.',
    office: 'مقر المديرية',
    hours: 'ساعات العمل',
    address: 'حي الشط 08 ماي 1945، ولاية الوادي 39000، الجزائر',
    phone: '+213 (0) 32 12 24 98',
    fax: '+213 (0) 32 12 24 99',
    email: 'dta.eloued@mta.gov.dz',
    hoursValue: 'الأحد إلى الخميس: 08:00 – 16:30',
    privacyTitle: 'سياسة الخصوصية',
    privacyLead: 'تحترم المديرية خصوصية زوار البوابة وتتعامل مع البيانات المقدمة عبر الخدمات الرقمية لغرض معالجة الطلب الإداري فقط.',
    privacyPoints: ['لا تُستخدم بيانات الطلبات لأغراض تسويقية.', 'تُتاح بيانات الطلب للموظفين المخولين وفق الصلاحيات الممنوحة.', 'يُرجى عدم إرسال كلمات المرور أو مفاتيح الوصول داخل نماذج المواطنين.', 'يمكن طلب معلومات إضافية عبر البريد الرسمي للمديرية.'],
    termsTitle: 'شروط الاستخدام',
    termsLead: 'استخدام هذه البوابة مخصص للوصول إلى المعلومات والخدمات الرسمية المتعلقة بقطاع السياحة والصناعة التقليدية في ولاية الوادي.',
    termsPoints: ['يلتزم المستخدم بتقديم معلومات صحيحة عند إيداع أي طلب.', 'المحتوى المنشور يخضع للتحديث والمراجعة من المصالح المختصة.', 'لا يُعد المحتوى العام بديلاً عن النصوص التنظيمية الرسمية.', 'تُحترم حقوق الملكية للصور والوثائق والمواد المنشورة.'],
    faqTitle: 'الأسئلة الشائعة',
    faq: [
      ['كيف أجد معلماً سياحياً؟', 'استخدم الخريطة التفاعلية أو البحث السريع، ثم اختر التصنيف المناسب لعرض التفاصيل والإحداثيات.'],
      ['كيف أتابع شكوى أو طلباً؟', 'بعد الإرسال احتفظ برقم التتبع، ثم افتح الخدمات الرقمية واختر متابعة حالة طلب وأدخل الرقم.'],
      ['هل يمكن للحرفي طلب إدراج في الدليل؟', 'يمكن التواصل مع المديرية أو غرفة الصناعة التقليدية، وتُراجع البيانات قبل نشرها على الدليل.'],
      ['كيف أتواصل مع مصلحة الاستثمار؟', 'توجه إلى قسم الاستثمار السياحي أو استخدم بيانات الاتصال الرسمية لطلب المرافقة.'],
    ],
    openServices: 'فتح الخدمات الرقمية',
  },
  fr: {
    eyebrow: 'Institution & transparence',
    aboutTitle: 'À propos de la Direction du Tourisme et de l’Artisanat d’El Oued',
    aboutLead: 'Un portail numérique officiel pour promouvoir la destination, accompagner les opérateurs et faciliter l’accès du citoyen à l’information et au service public.',
    missionTitle: 'Notre mission',
    mission: 'La Direction met en œuvre la politique sectorielle du tourisme et de l’artisanat, valorise le patrimoine soufi, accompagne l’investissement et soutient les artisans et acteurs locaux dans le respect des cadres réglementaires.',
    valuesTitle: 'Principes du service public',
    values: ['Information officielle fiable', 'Égalité d’accès au service', 'Protection du patrimoine et des ressources', 'Développement local durable'],
    contactTitle: 'Nous contacter',
    contactLead: 'Pour vos demandes officielles, utilisez les coordonnées ci-dessous ou déposez un dossier via les services numériques.',
    office: 'Siège de la Direction',
    hours: 'Horaires d’ouverture',
    address: 'Cité Echatt 08 Mai 1945, Wilaya d’El Oued 39000, Algérie',
    phone: '+213 (0) 32 12 24 98',
    fax: '+213 (0) 32 12 24 99',
    email: 'dta.eloued@mta.gov.dz',
    hoursValue: 'Dimanche à jeudi : 08h00 – 16h30',
    privacyTitle: 'Politique de confidentialité',
    privacyLead: 'La Direction respecte la vie privée des visiteurs et traite les données transmises via les services numériques uniquement pour l’instruction administrative.',
    privacyPoints: ['Les données ne sont pas utilisées à des fins commerciales.', 'Les dossiers sont accessibles aux agents habilités selon leurs droits.', 'Ne transmettez jamais de mot de passe ou de clé d’accès dans un formulaire citoyen.', 'Toute demande d’information peut être adressée à l’email officiel.'],
    termsTitle: 'Conditions d’utilisation',
    termsLead: 'Ce portail est destiné à l’accès aux informations et services officiels du tourisme et de l’artisanat dans la Wilaya d’El Oued.',
    termsPoints: ['L’utilisateur s’engage à fournir des informations exactes.', 'Les contenus sont révisés et actualisés par les services compétents.', 'Les informations générales ne remplacent pas les textes réglementaires.', 'Les droits liés aux images et documents publiés doivent être respectés.'],
    faqTitle: 'Questions fréquentes',
    faq: [
      ['Comment trouver un site touristique ?', 'Utilisez la carte interactive ou la recherche rapide, puis sélectionnez la catégorie souhaitée pour afficher la fiche et les coordonnées.'],
      ['Comment suivre une réclamation ?', 'Conservez votre numéro de suivi après l’envoi, puis ouvrez les services numériques et saisissez ce numéro.'],
      ['Un artisan peut-il demander son inscription ?', 'Contactez la Direction ou la Chambre de l’artisanat ; les informations sont vérifiées avant publication.'],
      ['Comment contacter le service investissement ?', 'Consultez la rubrique investissement touristique ou utilisez les coordonnées officielles pour demander un accompagnement.'],
    ],
    openServices: 'Ouvrir les services numériques',
  },
  en: {
    eyebrow: 'Institution & transparency',
    aboutTitle: 'About the Directorate of Tourism and Handicrafts – El Oued',
    aboutLead: 'An official digital portal promoting the destination, supporting operators, and making public information and services easier to access.',
    missionTitle: 'Our mission',
    mission: 'The Directorate implements sector policy for tourism and handicrafts, safeguards Soufi heritage, supports investment, and assists local artisans and stakeholders within the applicable regulatory framework.',
    valuesTitle: 'Public service principles',
    values: ['Reliable official information', 'Equal access to services', 'Heritage and resource protection', 'Sustainable local development'],
    contactTitle: 'Contact us',
    contactLead: 'For official enquiries, use the contact details below or submit a case through the digital services desk.',
    office: 'Directorate headquarters',
    hours: 'Opening hours',
    address: 'Echatt District, May 08, 1945, El Oued Province 39000, Algeria',
    phone: '+213 (0) 32 12 24 98',
    fax: '+213 (0) 32 12 24 99',
    email: 'dta.eloued@mta.gov.dz',
    hoursValue: 'Sunday to Thursday: 08:00 – 16:30',
    privacyTitle: 'Privacy policy',
    privacyLead: 'The Directorate respects visitor privacy and processes data submitted through digital services solely for administrative handling.',
    privacyPoints: ['Data is not used for marketing purposes.', 'Cases are accessible to authorised staff according to their permissions.', 'Never send passwords or access keys through a citizen form.', 'Additional information requests may be sent to the official email.'],
    termsTitle: 'Terms of use',
    termsLead: 'This portal provides official information and services related to tourism and handicrafts in El Oued Province.',
    termsPoints: ['Users must provide accurate information when submitting a case.', 'Published content is reviewed and updated by the competent services.', 'General information does not replace official regulatory texts.', 'Copyright and licensing for published images and documents must be respected.'],
    faqTitle: 'Frequently asked questions',
    faq: [
      ['How can I find a tourist site?', 'Use the interactive map or quick search, then select a category to view the details and coordinates.'],
      ['How can I track a complaint?', 'Keep your tracking number after submission, open Digital Services, and enter the number in the tracking form.'],
      ['Can an artisan request directory inclusion?', 'Contact the Directorate or the Chamber of Crafts; information is reviewed before publication.'],
      ['How do I contact the investment desk?', 'Open the tourism investment section or use the official contact details to request guidance.'],
    ],
    openServices: 'Open digital services',
  },
} as const;

type InstitutionalTab = 'about' | 'contact' | 'privacy' | 'terms' | 'faq';

export const InstitutionalPages: React.FC<{ page: InstitutionalTab }> = ({ page }) => {
  const { language, setActiveTab } = useApp();
  const text = copy[language];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (page === 'contact') {
    return (
      <section className="bg-[#F8F5EF] px-4 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <PageHeader eyebrow={text.eyebrow} title={text.contactTitle} lead={text.contactLead} />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <ContactCard icon={MapPin} title={text.office} value={text.address} />
            <ContactCard icon={Clock3} title={text.hours} value={text.hoursValue} />
            <ContactCard icon={Phone} title="Téléphone / Phone" value={text.phone} href={`tel:${text.phone.replace(/[^+\d]/g, '')}`} />
            <ContactCard icon={Mail} title="Email" value={text.email} href={`mailto:${text.email}`} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => setActiveTab('services')} className="rounded-xl bg-[#0C6B58] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#095243] active:scale-[.98]">{text.openServices}</button>
            <a href="https://el-oued.mta.gov.dz/" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#D8C7AF] bg-white px-5 py-3 text-sm font-bold text-[#17324D] transition hover:border-[#B8874D] active:scale-[.98]">el-oued.mta.gov.dz</a>
          </div>
        </div>
      </section>
    );
  }

  if (page === 'privacy' || page === 'terms') {
    const title = page === 'privacy' ? text.privacyTitle : text.termsTitle;
    const lead = page === 'privacy' ? text.privacyLead : text.termsLead;
    const points = page === 'privacy' ? text.privacyPoints : text.termsPoints;
    return (
      <section className="bg-[#F8F5EF] px-4 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <PageHeader eyebrow={text.eyebrow} title={title} lead={lead} />
          <div className="mt-8 rounded-3xl border border-[#E7DCCB] bg-white p-6 shadow-[0_12px_35px_rgba(36,49,63,.06)] sm:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F1EC] text-[#0C6B58]"><ShieldCheck className="h-6 w-6" /></div>
            <div className="space-y-4">
              {points.map((point) => <p key={point} className="border-b border-[#EEE7DD] pb-4 text-sm leading-7 text-slate-700 last:border-0">{point}</p>)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (page === 'faq') {
    return (
      <section className="bg-[#F8F5EF] px-4 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <PageHeader eyebrow={text.eyebrow} title={text.faqTitle} lead={text.aboutLead} />
          <div className="mt-8 space-y-3">
            {text.faq.map(([question, answer], index) => (
              <div key={question} className="overflow-hidden rounded-2xl border border-[#E7DCCB] bg-white">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-sm font-bold text-[#17324D]" aria-expanded={openFaq === index}>
                  <span>{question}</span><ChevronDown className={`h-4 w-4 shrink-0 text-[#B8874D] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && <p className="border-t border-[#EEE7DD] px-5 py-4 text-sm leading-7 text-slate-600">{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F8F5EF] px-4 py-12 sm:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <PageHeader eyebrow={text.eyebrow} title={text.aboutTitle} lead={text.aboutLead} />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <article className="rounded-3xl bg-[#17324D] p-7 text-white shadow-[0_18px_45px_rgba(23,50,77,.14)] sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#E6C28E]">{text.missionTitle}</p>
            <p className="mt-4 text-base leading-8 text-slate-200">{text.mission}</p>
          </article>
          <article className="rounded-3xl border border-[#E7DCCB] bg-white p-7 shadow-[0_12px_35px_rgba(36,49,63,.06)] sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#B8874D]">{text.valuesTitle}</p>
            <div className="mt-5 space-y-4">{text.values.map((value) => <div key={value} className="flex items-start gap-3 text-sm leading-6 text-slate-700"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#0C6B58]" />{value}</div>)}</div>
          </article>
        </div>
      </div>
    </section>
  );
};

const PageHeader: React.FC<{ eyebrow: string; title: string; lead: string }> = ({ eyebrow, title, lead }) => (
  <header className="max-w-3xl">
    <p className="text-xs font-bold uppercase tracking-[.18em] text-[#B8874D]">{eyebrow}</p>
    <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-[#17324D] sm:text-4xl">{title}</h2>
    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{lead}</p>
  </header>
);

const ContactCard: React.FC<{ icon: React.ComponentType<{ className?: string }>; title: string; value: string; href?: string }> = ({ icon: Icon, title, value, href }) => (
  <div className="flex gap-4 rounded-2xl border border-[#E7DCCB] bg-white p-5 shadow-[0_8px_24px_rgba(36,49,63,.04)]">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4E8D8] text-[#B8874D]"><Icon className="h-5 w-5" /></div>
    <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</p>{href ? <a className="mt-1 block text-sm font-semibold leading-6 text-[#17324D] hover:text-[#0C6B58]" href={href}>{value}</a> : <p className="mt-1 text-sm leading-6 text-slate-700">{value}</p>}</div>
  </div>
);
