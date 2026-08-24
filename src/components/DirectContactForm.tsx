import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

const copy = {
  ar: {
    title: 'مراسلة مباشرة مع المديرية',
    lead: 'أرسل استفسارك أو مراسلتك إلى مديرية السياحة والصناعة التقليدية. بعد الإرسال احتفظ برقم التتبع لمتابعة الطلب.',
    name: 'الاسم واللقب',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    subject: 'موضوع المراسلة',
    message: 'نص الرسالة',
    namePlaceholder: 'أدخل الاسم واللقب',
    subjectPlaceholder: 'مثال: طلب معلومات حول مسار سياحي',
    messagePlaceholder: 'اكتب رسالتك بالتفصيل...',
    submit: 'إرسال المراسلة',
    sending: 'جارٍ إرسال المراسلة...',
    required: 'يرجى ملء جميع الحقول المطلوبة.',
    successTitle: 'تم إرسال مراسلتك بنجاح',
    successText: 'احتفظ برقم التتبع التالي لمتابعة حالة المراسلة من الخدمات الرقمية:',
    newMessage: 'إرسال مراسلة جديدة',
    error: 'تعذر إرسال المراسلة حالياً. يرجى المحاولة لاحقاً أو استخدام البريد الرسمي.',
  },
  fr: {
    title: 'Écrire directement à la Direction',
    lead: 'Envoyez votre demande à la Direction du Tourisme et de l’Artisanat. Après l’envoi, conservez le numéro de suivi pour consulter son état.',
    name: 'Nom et prénom',
    email: 'Adresse e-mail',
    phone: 'Téléphone',
    subject: 'Objet du message',
    message: 'Message',
    namePlaceholder: 'Saisissez votre nom et prénom',
    subjectPlaceholder: 'Ex. : Demande d’information sur un circuit',
    messagePlaceholder: 'Rédigez votre message en détail…',
    submit: 'Envoyer le message',
    sending: 'Envoi en cours…',
    required: 'Veuillez remplir tous les champs obligatoires.',
    successTitle: 'Votre message a été envoyé',
    successText: 'Conservez le numéro de suivi suivant pour consulter l’état de votre message depuis les services numériques :',
    newMessage: 'Envoyer un nouveau message',
    error: 'Le message n’a pas pu être envoyé. Réessayez plus tard ou utilisez l’adresse e-mail officielle.',
  },
  en: {
    title: 'Contact the Directorate directly',
    lead: 'Send your enquiry to the Directorate of Tourism and Handicrafts. After submission, keep the tracking number to follow its status.',
    name: 'Full name',
    email: 'Email address',
    phone: 'Phone number',
    subject: 'Message subject',
    message: 'Message',
    namePlaceholder: 'Enter your full name',
    subjectPlaceholder: 'E.g. Request for information about a tourist circuit',
    messagePlaceholder: 'Write your message in detail…',
    submit: 'Send message',
    sending: 'Sending message…',
    required: 'Please complete all required fields.',
    successTitle: 'Your message was sent',
    successText: 'Keep the following tracking number to check the message status in Digital Services:',
    newMessage: 'Send another message',
    error: 'The message could not be sent. Please try again later or use the official email address.',
  },
} as const;

type ContactValues = { fullName: string; email: string; phone: string; subject: string; message: string };

export const DirectContactForm: React.FC = () => {
  const { language, submitRequest, setActiveTab } = useApp();
  const text = copy[language];
  const [values, setValues] = useState<ContactValues>({ fullName: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const update = (field: keyof ContactValues, value: string) => setValues((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (Object.values(values).some((value) => !String(value).trim())) {
      setError(text.required);
      return;
    }

    setIsSubmitting(true);
    try {
      const request = await submitRequest({
        serviceType: 'suggestion',
        fullName: values.fullName.trim(),
        nationalIdOrPassport: '',
        email: values.email.trim(),
        phone: values.phone.trim(),
        subject: `[Contact] ${values.subject.trim()}`,
        details: values.message.trim(),
      });
      setTrackingNumber(request.trackingNumber);
      setValues({ fullName: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setError(text.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (trackingNumber) {
    return (
      <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm sm:p-8" aria-live="polite">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-600" />
          <div>
            <h3 className="font-heading text-xl font-black text-emerald-950">{text.successTitle}</h3>
            <p className="mt-2 text-sm leading-7 text-emerald-900">{text.successText}</p>
            <p className="mt-4 inline-flex rounded-xl border border-emerald-300 bg-white px-4 py-3 font-mono text-lg font-black tracking-wider text-[#17324D]">{trackingNumber}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={() => setActiveTab('services')} className="rounded-xl bg-[#0C6B58] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#095243]">{language === 'ar' ? 'متابعة الطلب' : language === 'fr' ? 'Suivre le dossier' : 'Track the case'}</button>
              <button type="button" onClick={() => setTrackingNumber('')} className="rounded-xl border border-emerald-300 bg-white px-4 py-3 text-xs font-bold text-emerald-900 transition hover:bg-emerald-100">{text.newMessage}</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-[#E7DCCB] bg-white p-6 shadow-[0_12px_35px_rgba(36,49,63,.06)] sm:p-8" aria-labelledby="direct-contact-title">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F1EC] text-[#0C6B58]"><Mail className="h-5 w-5" /></div>
        <div><h3 id="direct-contact-title" className="font-heading text-2xl font-black text-[#17324D]">{text.title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{text.lead}</p></div>
      </div>

      {error && <div className="mt-6 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800" role="alert"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>}

      <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={text.name} value={values.fullName} placeholder={text.namePlaceholder} onChange={(value) => update('fullName', value)} type="text" />
          <Field label={text.email} value={values.email} placeholder="name@example.com" onChange={(value) => update('email', value)} type="email" />
          <Field label={text.phone} value={values.phone} placeholder="+213 …" onChange={(value) => update('phone', value)} type="tel" />
          <Field label={text.subject} value={values.subject} placeholder={text.subjectPlaceholder} onChange={(value) => update('subject', value)} type="text" />
        </div>
        <label className="block text-sm font-bold text-[#17324D]"><span>{text.message} *</span><textarea required rows={5} value={values.message} onChange={(event) => update('message', event.target.value)} placeholder={text.messagePlaceholder} className="mt-2 w-full rounded-2xl border border-[#D8C7AF] bg-[#FAF7F2] px-4 py-3 text-sm font-normal text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0C6B58] focus:ring-2 focus:ring-[#0C6B58]/20" /></label>
        <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-[#0C6B58] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#095243] disabled:cursor-wait disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#0C6B58]/30">{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{isSubmitting ? text.sending : text.submit}</button>
      </form>
    </section>
  );
};

const Field: React.FC<{ label: string; value: string; placeholder: string; type: string; onChange: (value: string) => void }> = ({ label, value, placeholder, type, onChange }) => (
  <label className="block text-sm font-bold text-[#17324D]"><span>{label} *</span><input required type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-2xl border border-[#D8C7AF] bg-[#FAF7F2] px-4 py-3 text-sm font-normal text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0C6B58] focus:ring-2 focus:ring-[#0C6B58]/20" /></label>
);
