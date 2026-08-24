import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Shield, 
  HeartHandshake, 
  Compass, 
  ExternalLink, 
  Sparkles,
  Award,
  Globe
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t, setActiveTab } = useApp();

  return (
    <footer className="bg-[#0A1424] text-white border-t border-[#1C2C47] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Official Directorate Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0F1E36] border border-[#C89D66] flex items-center justify-center p-2 shadow-sm">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/77/Emblem_of_Algeria.svg"
                  alt="Emblem of Algeria"
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block tracking-wider uppercase">
                  {t.countryName}
                </span>
                <h3 className="text-sm font-bold font-heading text-white leading-tight">
                  {t.directorateName}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'ar' 
                ? 'البوابة الرقمية الرسمية لترقية وتطوير السياحة الصحراوية، تثمين المعالم التراثية وحماية حرف الصناعة التقليدية بولاية الوادي، الجزائر.'
                : 'Portail officiel pour la promotion du tourisme saharien, la valorisation du patrimoine et la sauvegarde de l\'artisanat traditionnel dans la wilaya d\'El Oued.'}
            </p>

            <div className="text-xs text-amber-400/90 font-medium">
              ✦ {language === 'ar' ? 'مدينة الألف قبة وقبة — وادي سوف' : 'El Oued — The City of a Thousand Domes'}
            </div>
          </div>

          {/* Col 2: Fast Portal Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {language === 'ar' ? 'أقسام البوابة الرسمية' : 'Portal Sections'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('map'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition">
                  {t.nav.sitesMap}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('investment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition">
                  {t.nav.investment}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition">
                  {t.nav.digitalServices}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('artisan'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition">
                  {t.nav.handicrafts}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('events'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition">
                  {t.nav.events}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Directorate Contacts & Office */}
          <div className="space-y-3 text-xs text-slate-300">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {t.footer.contactUs}
            </h4>

            <div className="space-y-2.5">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C89D66] flex-shrink-0 mt-0.5" />
                <span>{t.footer.address}</span>
              </p>

              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C89D66] flex-shrink-0" />
                <span className="font-mono">{t.footer.phone}</span>
              </p>

              <p className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-[#C89D66] flex-shrink-0" />
                <span>Fax: <span className="font-mono">{t.footer.fax}</span></span>
              </p>

              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C89D66] flex-shrink-0" />
                <a href={`mailto:${t.footer.email}`} className="font-mono text-amber-300/90 hover:underline">
                  {t.footer.email}
                </a>
              </p>

              <p className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#C89D66] flex-shrink-0" />
                <a 
                  href="https://el-oued.mta.gov.dz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono text-[11px] hover:underline"
                >
                  <span>el-oued.mta.gov.dz</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>

              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C89D66] flex-shrink-0" />
                <span>{t.footer.workingHours}</span>
              </p>
            </div>
          </div>

          {/* Col 4: Emergency & Citizen Assistance Numbers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {language === 'ar' ? 'أرقام الطوارئ والمساعدة السياحية' : 'Emergency & Assistance Numbers'}
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#122038] p-2.5 rounded-xl border border-[#203457]">
                <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الحماية المدنية' : 'Civil Protection'}</span>
                <span className="font-mono font-black text-amber-400 text-sm">14</span>
              </div>

              <div className="bg-[#122038] p-2.5 rounded-xl border border-[#203457]">
                <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الدرك الوطني' : 'Gendarmerie'}</span>
                <span className="font-mono font-black text-teal-400 text-sm">1055</span>
              </div>

              <div className="bg-[#122038] p-2.5 rounded-xl border border-[#203457]">
                <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الأمن الوطني' : 'Police'}</span>
                <span className="font-mono font-black text-blue-400 text-sm">1548</span>
              </div>

              <div className="bg-[#122038] p-2.5 rounded-xl border border-[#203457]">
                <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الإسعاف الطبي' : 'SAMU'}</span>
                <span className="font-mono font-black text-rose-400 text-sm">1021</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => { setActiveTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full text-center bg-[#152744] hover:bg-[#1E375F] text-slate-300 hover:text-white py-2 rounded-xl text-xs font-bold transition border border-[#233F6B] flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-[#C89D66]" />
                <span>{t.nav.admin}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="border-t border-[#1C2C47] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            {t.footer.rights} • {new Date().getFullYear()} {t.countryName}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400 font-mono">
              Wilaya d'El Oued — Code 39
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
