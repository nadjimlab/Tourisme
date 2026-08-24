import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventType, TourismEvent } from '../types';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Download, 
  Share2, 
  Users, 
  Sparkles, 
  Check,
  CheckCircle2,
  X
} from 'lucide-react';

export const EventsCalendar: React.FC = () => {
  const { language, t, events } = useApp();
  const [filterType, setFilterType] = useState<EventType | 'all'>('all');
  const [selectedEvent, setSelectedEvent] = useState<TourismEvent | null>(null);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const filteredEvents = events.filter(e => {
    if (filterType === 'all') return true;
    return e.type === filterType;
  });

  const downloadICS = (event: TourismEvent) => {
    const title = event.title[language] || event.title.ar;
    const location = event.location[language] || event.location.ar;
    const desc = event.description[language] || event.description.ar;
    const start = event.dateStart.replace(/-/g, '');
    const end = event.dateEnd.replace(/-/g, '');

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Directorate of Tourism El Oued//Events//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${desc}
LOCATION:${location}
DTSTART;VALUE=DATE:${start}
DTEND;VALUE=DATE:${end}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisteredSuccess(true);
    setTimeout(() => {
      setRegisteredSuccess(false);
      setSelectedEvent(null);
    }, 2500);
  };

  return (
    <div className="bg-[#FAF7F2] py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8DCCD] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C89D66] uppercase tracking-wider mb-2">
              <CalendarIcon className="w-4 h-4" />
              <span>{t.nav.events}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E36] font-heading">
              {t.events.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {t.events.subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#F4EDE4] p-1.5 rounded-2xl self-start md:self-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                filterType === 'all' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:text-black'
              }`}
            >
              {t.events.filterAll}
            </button>
            <button
              onClick={() => setFilterType('local')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                filterType === 'local' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:text-black'
              }`}
            >
              {t.events.filterLocal}
            </button>
            <button
              onClick={() => setFilterType('national')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                filterType === 'national' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:text-black'
              }`}
            >
              {t.events.filterNational}
            </button>
            <button
              onClick={() => setFilterType('international')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                filterType === 'international' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:text-black'
              }`}
            >
              {t.events.filterInternational}
            </button>
          </div>
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl border border-[#E8DCCD] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Date Banner */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36] via-transparent to-transparent"></div>
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 right-3 bg-[#0F1E36]/90 text-[#F5D0A9] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#C89D66]/40 backdrop-blur-xs">
                    {event.type.toUpperCase()}
                  </span>

                  {/* Dates Banner */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{event.dateStart} ➔ {event.dateEnd}</span>
                    </div>
                    <h3 className="text-base font-bold font-heading text-white line-clamp-1">
                      {event.title[language]}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-[#C89D66] flex-shrink-0" />
                    <span className="truncate">{event.location[language]}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {event.description[language]}
                  </p>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <span className="font-semibold block">{t.events.organizer}:</span>
                    <span className="text-slate-700">{event.organizer[language]}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => downloadICS(event)}
                  className="w-full bg-[#FAF7F2] hover:bg-[#F4EDE4] text-[#0F1E36] text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 border border-[#D5C6B4]"
                  title={t.events.addToCalendar}
                >
                  <Download className="w-3.5 h-3.5 text-[#C89D66]" />
                  <span>.iCal</span>
                </button>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="w-full bg-[#0F1E36] hover:bg-[#1E3A5F] text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Users className="w-3.5 h-3.5 text-[#C89D66]" />
                  <span>{t.events.registerAttendance}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Register Attendance Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 space-y-5">
            
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-[#C89D66] uppercase tracking-wider block mb-1">
                {language === 'ar' ? 'تأكيد الحضور والمشاركة' : 'Event Attendance Registration'}
              </span>
              <h3 className="text-lg font-bold text-[#0F1E36] font-heading">
                {selectedEvent.title[language]}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {selectedEvent.dateStart} — {selectedEvent.location[language]}
              </p>
            </div>

            {registeredSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-2xl text-center space-y-2 text-emerald-800 animate-in zoom-in-95">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">{language === 'ar' ? 'تم تسجيل حضوركم بنجاح' : 'Registration Confirmed!'}</h4>
                <p className="text-xs">{language === 'ar' ? 'نتطلع للترحيب بكم في فعاليات وادي سوف.' : 'We look forward to welcoming you to El Oued.'}</p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'الاسم واللقب' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-[#FAF7F2] border border-[#D5C6B4] rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-[#FAF7F2] border border-[#D5C6B4] rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'رقم الهاتف' : 'Phone'} *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-[#FAF7F2] border border-[#D5C6B4] rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0F1E36] hover:bg-[#1E3A5F] text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>{t.events.registerAttendance}</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
