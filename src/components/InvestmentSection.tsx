import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InvestmentOpportunity } from '../types';
import { generateInvestmentPDF } from '../utils/pdfGenerator';
import { 
  Briefcase, 
  FileDown, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Coins, 
  LandPlot, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Send,
  ExternalLink
} from 'lucide-react';

export const InvestmentSection: React.FC = () => {
  const { language, t, investments } = useApp();
  
  const [investorForm, setInvestorForm] = useState({
    investorName: '',
    companyName: '',
    email: '',
    phone: '',
    selectedProject: investments[0]?.id || '',
    capitalCapacity: '500_million_plus',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInvestorForm({
        investorName: '',
        companyName: '',
        email: '',
        phone: '',
        selectedProject: investments[0]?.id || '',
        capitalCapacity: '500_million_plus',
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="bg-[#FAF7F2] py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8DCCD] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C89D66]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C89D66] uppercase tracking-wider mb-2">
              <Briefcase className="w-4 h-4" />
              <span>{t.nav.investment}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E36] font-heading">
              {t.investment.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {t.investment.subtitle}
            </p>
          </div>
        </div>

        {/* Legal Advantages Banner (AAPI / Algerian Investment Code) */}
        <div className="bg-gradient-to-r from-[#0F1E36] to-[#162E52] rounded-3xl p-8 text-white shadow-md border border-[#233A5E]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.investment.lawBannerTitle}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading">
                {language === 'ar' ? 'حوافز استثنائية للاستثمار في الجنوب والواحات السوفية' : 'Exceptional Saharan Tourism Investment Incentives'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.investment.lawBannerDesc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto flex-shrink-0">
              <div className="bg-[#1E3A5F]/60 border border-[#2E517F] p-3.5 rounded-2xl text-center">
                <span className="text-2xl font-black text-amber-400 block font-mono">10 {language === 'ar' ? 'سنوات' : 'Ans'}</span>
                <span className="text-[11px] text-slate-200">{language === 'ar' ? 'إعفاء ضريبي وجمركي كامل' : 'Total Tax Exemption'}</span>
              </div>
              <div className="bg-[#1E3A5F]/60 border border-[#2E517F] p-3.5 rounded-2xl text-center">
                <span className="text-2xl font-black text-teal-400 block font-mono">100%</span>
                <span className="text-[11px] text-slate-200">{language === 'ar' ? 'مرافقة شباك موحد (AAPI)' : 'One-Stop Desk Support'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Investment Opportunities Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F1E36] font-heading">
              {t.investment.availableProjects}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {investments.length} {language === 'ar' ? 'مشاريع جاهزة للدراسة' : 'Projects open for bidding'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {investments.map((invest) => (
              <div
                key={invest.id}
                className="bg-white rounded-3xl border border-[#E8DCCD] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image & Status */}
                  <div className="relative h-56 bg-slate-800">
                    <img
                      src={invest.image}
                      alt={invest.title[language]}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36] via-transparent to-transparent"></div>
                    
                    <span className="absolute top-4 right-4 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                      {t.investment.statusAvailable}
                    </span>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{invest.location[language]}</span>
                      </div>
                      <h4 className="text-lg font-bold font-heading text-white leading-snug">
                        {invest.title[language]}
                      </h4>
                    </div>
                  </div>

                  {/* Body Specs */}
                  <div className="p-6 space-y-4">
                    {/* Key Metrics Strip */}
                    <div className="grid grid-cols-2 gap-3 bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8DCCD]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#C89D66]/20 flex items-center justify-center text-[#C89D66]">
                          <LandPlot className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block">{t.investment.area}</span>
                          <span className="text-xs font-bold text-slate-800 font-mono">{invest.areaHectares} {t.investment.hectares}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-600">
                          <Coins className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block">{t.investment.estimatedCost}</span>
                          <span className="text-xs font-bold text-slate-800 truncate block max-w-[140px]">{invest.estimatedCostDZD}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {invest.description[language]}
                    </p>

                    {/* Key Advantages Checklist */}
                    <div>
                      <span className="text-xs font-bold text-[#0F1E36] block mb-2">{t.investment.advantages}:</span>
                      <ul className="space-y-1.5">
                        {invest.advantages[language]?.map((adv, i) => (
                          <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* PDF Download Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => generateInvestmentPDF(invest, language === 'ar' ? 'ar' : language === 'fr' ? 'fr' : 'en')}
                    className="w-full bg-[#0F1E36] hover:bg-[#1E3A5F] text-white text-xs sm:text-sm font-bold py-3 rounded-2xl transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FileDown className="w-4 h-4 text-[#C89D66]" />
                    <span>{t.investment.downloadStudy}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Investor Guidance Desk Form */}
        <div className="bg-white rounded-3xl p-8 border border-[#E8DCCD] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                <Building2 className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'مكتب مرافقة المستثمر' : 'Investor Advisory Desk'}</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0F1E36] font-heading">
                {t.investment.requestFormTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'ar' 
                  ? 'هل لديك فكرة مشروع فندقي أو سياحي بوادي سوف؟ يسعد فريق مديرية السياحة بتقديم المرافقة التقنية وتسهيل الإجراءات لدى الوكالة الجزائرية لترقية الاستثمار (AAPI).'
                  : 'Looking to invest in Saharan tourism or hospitality? Our dedicated team provides end-to-end guidance and fast-track processing with the Algerian Investment Agency (AAPI).'}
              </p>

              <div className="pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C89D66]" />
                  <span>{t.investment.contactInvestmentOffice}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C89D66]" />
                  <a href="mailto:dta.eloued@mta.gov.dz" className="hover:text-[#0C6B58] transition font-mono">
                    dta.eloued@mta.gov.dz
                  </a>
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DCCD]">
              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0F1E36]">
                    {language === 'ar' ? 'تم استلام طلبكم بنجاح' : 'Investor Dossier Received'}
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    {language === 'ar' 
                      ? 'سيقوم مكتب ترقية الاستثمار بالاتصال بكم خلال 48 ساعة لتنسيق جلسة عمل ومراجعة ملف المشروع.'
                      : 'Our investment promotion officers will contact you within 48 hours to coordinate a technical consultation.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {language === 'ar' ? 'الاسم واللقب للمستثمر / الممثل' : 'Investor / Representative Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={investorForm.investorName}
                        onChange={(e) => setInvestorForm({ ...investorForm, investorName: e.target.value })}
                        className="w-full bg-white border border-[#D5C6B4] rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {language === 'ar' ? 'اسم المؤسسة أو المجمع الاستثماري' : 'Company / Entity Name'}
                      </label>
                      <input
                        type="text"
                        value={investorForm.companyName}
                        onChange={(e) => setInvestorForm({ ...investorForm, companyName: e.target.value })}
                        className="w-full bg-white border border-[#D5C6B4] rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *
                      </label>
                      <input
                        type="email"
                        required
                        value={investorForm.email}
                        onChange={(e) => setInvestorForm({ ...investorForm, email: e.target.value })}
                        className="w-full bg-white border border-[#D5C6B4] rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={investorForm.phone}
                        onChange={(e) => setInvestorForm({ ...investorForm, phone: e.target.value })}
                        className="w-full bg-white border border-[#D5C6B4] rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {language === 'ar' ? 'المشروع المستهدف أو فكرة الاستثمار' : 'Target Project or Concept'}
                    </label>
                    <select
                      value={investorForm.selectedProject}
                      onChange={(e) => setInvestorForm({ ...investorForm, selectedProject: e.target.value })}
                      className="w-full bg-white border border-[#D5C6B4] rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                    >
                      {investments.map(inv => (
                        <option key={inv.id} value={inv.id}>
                          {inv.title[language]}
                        </option>
                      ))}
                      <option value="custom">
                        {language === 'ar' ? 'مشروع سياحي خاص آخر (خارج ZET)' : 'Other Custom Hospitality Concept'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {language === 'ar' ? 'ملاحظات أو نبذة عن المشروع' : 'Project Outline / Message'}
                    </label>
                    <textarea
                      rows={3}
                      value={investorForm.message}
                      onChange={(e) => setInvestorForm({ ...investorForm, message: e.target.value })}
                      className="w-full bg-white border border-[#D5C6B4] rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                      placeholder={language === 'ar' ? 'حدد مساحة الأرض المطلوبة، التقدير المالي، ونوعية الخدمات المراد إنجازها...' : 'Specify surface area, estimated budget, hospitality category...'}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0C6B58] hover:bg-[#095243] text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.investment.submitProposal}</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
