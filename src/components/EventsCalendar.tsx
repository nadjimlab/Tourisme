import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventType, TourismEvent } from '../types';
import { Calendar as CalendarIcon, MapPin, Clock, Download, Share2, Sparkles } from 'lucide-react';

export const EventsCalendar: React.FC = () => {
  const { language, t, events } = useApp();
  const [filterType, setFilterType] = useState<EventType | 'all'>('all');

  const filteredEvents = events.filter((event) => filterType === 'all' || event.type === filterType);

  const downloadICS = (event: TourismEvent) => {
    const title = event.title[language] || event.title.ar;
    const location = event.location[language] || event.location.ar;
    const description = event.description[language] || event.description.ar;
    const start = event.dateStart.replace(/-/g, '');
    const end = event.dateEnd.replace(/-/g, '');
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Directorate of Tourism El Oued//Events//EN\nBEGIN:VEVENT\nSUMMARY:${title}\nDESCRIPTION:${description}\nLOCATION:${location}\nDTSTART;VALUE=DATE:${start}\nDTEND;VALUE=DATE:${end}\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;
    const url = URL.createObjectURL(new Blob([icsContent], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.id}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const shareEvent = async (event: TourismEvent) => {
    const title = event.title[language] || event.title.ar;
    const location = event.location[language] || event.location.ar;
    const shareData = { title, text: `${title} — ${location}`, url: window.location.href };
    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
    } else {
      await navigator.clipboard?.writeText(`${title} — ${window.location.href}`);
    }
  };

  return (
    <section className="bg-[#F8F5EF] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-6 rounded-3xl border border-[#E7DCCB] bg-white p-6 shadow-[0_10px_30px_rgba(36,49,63,.05)] md:flex-row md:items-center md:p-8">
          <div className="max-w-3xl">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B8874D]"><CalendarIcon className="h-4 w-4" /><span>{t.nav.events}</span></div>
            <h2 className="font-heading text-3xl font-black text-[#17324D] sm:text-4xl">{t.events.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">{t.events.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 rounded-2xl bg-[#F4E8D8] p-1.5">
            {([['all', t.events.filterAll], ['local', t.events.filterLocal], ['national', t.events.filterNational], ['international', t.events.filterInternational]] as const).map(([type, label]) => (
              <button key={type} onClick={() => setFilterType(type)} className={`rounded-xl px-3.5 py-2 text-xs font-bold transition active:scale-[.98] ${filterType === type ? 'bg-[#17324D] text-white shadow-sm' : 'text-slate-700 hover:bg-white'}`}>{label}</button>
            ))}
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#D8C7AF] bg-white px-6 py-14 text-center">
            <CalendarIcon className="mx-auto h-10 w-10 text-[#B8874D]" />
            <h3 className="mt-4 font-heading text-xl font-bold text-[#17324D]">{language === 'ar' ? 'لا توجد فعاليات منشورة حالياً' : language === 'fr' ? 'Aucun événement publié pour le moment' : 'No published events at the moment'}</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-slate-600">{language === 'ar' ? 'ستظهر الفعاليات الرسمية هنا بعد اعتمادها ونشرها من المصالح المختصة.' : language === 'fr' ? 'Les événements officiels apparaîtront ici après validation et publication par les services compétents.' : 'Official events will appear here after validation and publication by the competent services.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <article key={event.id} className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E7DCCB] bg-white shadow-[0_8px_24px_rgba(36,49,63,.05)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(36,49,63,.1)]">
                <div>
                  <div className="relative h-48 overflow-hidden bg-[#17324D]">
                    <img src={event.image} alt={event.title[language] || event.title.ar} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#17324D] via-transparent to-transparent" />
                    <span className="absolute right-3 top-3 rounded-full border border-[#E6C28E]/50 bg-[#17324D]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F5D0A9]">{event.type}</span>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-amber-300"><Clock className="h-3.5 w-3.5" /><span>{event.dateStart} → {event.dateEnd}</span></div>
                      <h3 className="font-heading text-base font-bold">{event.title[language] || event.title.ar}</h3>
                    </div>
                  </div>
                  <div className="space-y-3 p-5">
                    <div className="flex items-center gap-2 text-xs text-slate-500"><MapPin className="h-3.5 w-3.5 shrink-0 text-[#B8874D]" /><span className="truncate">{event.location[language] || event.location.ar}</span></div>
                    <p className="line-clamp-3 text-xs leading-6 text-slate-600">{event.description[language] || event.description.ar}</p>
                    <div className="border-t border-slate-100 pt-2 text-[11px] text-slate-500"><span className="block font-semibold">{t.events.organizer}:</span><span className="text-slate-700">{event.organizer[language] || event.organizer.ar}</span></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 p-5 pt-0">
                  <button onClick={() => downloadICS(event)} className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#D8C7AF] bg-[#F8F5EF] py-2.5 text-xs font-bold text-[#17324D] transition hover:bg-[#F4E8D8] active:scale-[.98]" title={t.events.addToCalendar}><Download className="h-3.5 w-3.5 text-[#B8874D]" />.iCal</button>
                  <button onClick={() => void shareEvent(event)} className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#17324D] py-2.5 text-xs font-bold text-white transition hover:bg-[#0C6B58] active:scale-[.98]"><Share2 className="h-3.5 w-3.5 text-[#E6C28E]" />{language === 'ar' ? 'مشاركة الفعالية' : language === 'fr' ? 'Partager' : 'Share event'}</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
