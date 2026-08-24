import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceType, DigitalRequest } from '../types';
import { 
  FileText, 
  Search, 
  Send, 
  CheckCircle2, 
  Clock, 
  FileDown, 
  ShieldAlert, 
  AlertCircle, 
  Download, 
  Building, 
  Compass, 
  Award, 
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

async function downloadReceipt(request: DigitalRequest) {
  const { generateFilingReceiptPDF } = await import('../utils/pdfGenerator');
  await generateFilingReceiptPDF(request);
}

export const DigitalServices: React.FC = () => {
  const { language, t, isRTL, submitRequest, trackRequest } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'complaint' | 'track' | 'forms'>('complaint');

  // Form State
  const [formData, setFormData] = useState({
    serviceType: 'complaint' as ServiceType,
    fullName: '',
    nationalIdOrPassport: '',
    email: '',
    phone: '',
    subject: '',
    details: '',
  });

  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [lastSubmittedReq, setLastSubmittedReq] = useState<DigitalRequest | null>(null);

  // Tracking State
  const [trackInput, setTrackInput] = useState('');
  const [trackedResult, setTrackedResult] = useState<DigitalRequest | null | 'not_found'>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRequestError(null);
    try {
      const savedRequest = await submitRequest(formData);
      setGeneratedCode(savedRequest.trackingNumber);
      setLastSubmittedReq(savedRequest);
      setFormData({ serviceType: 'complaint', fullName: '', nationalIdOrPassport: '', email: '', phone: '', subject: '', details: '' });
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : 'La demande n’a pas pu être envoyée.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestError(null);
    try {
      const match = await trackRequest(trackInput.trim().toUpperCase());
      setTrackedResult(match || 'not_found');
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : 'Le suivi est temporairement indisponible.');
      setTrackedResult('not_found');
    }
  };

  const getStatusBadge = (status: DigitalRequest['status']) => {
    switch (status) {
      case 'submitted':
        return <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">{t.services.tracker.submitted}</span>;
      case 'under_review':
        return <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">{t.services.tracker.under_review}</span>;
      case 'in_progress':
        return <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">{t.services.tracker.in_progress}</span>;
      case 'resolved':
        return <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">{t.services.tracker.resolved}</span>;
      case 'rejected':
        return <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full">{t.services.tracker.rejected}</span>;
      default:
        return null;
    }
  };

  const officialForms = [
    {
      id: 'form-hotel-classif',
      title: language === 'ar' ? 'استمارة طلب تصنيف مؤسسة فندقية وسياحية' : 'Dossier de demande de classement hôtelier',
      code: 'FORM-DIR-01',
      icon: Building,
      size: '1.4 MB',
    },
    {
      id: 'form-artisan-card',
      title: language === 'ar' ? 'ملف طلب بطاقة الحرفي المهنية وغرفة الصناعة التقليدية' : 'Formulaire d\'octroi de la carte professionnelle d\'artisan',
      code: 'FORM-CAM-02',
      icon: Award,
      size: '850 KB',
    },
    {
      id: 'form-guide-permit',
      title: language === 'ar' ? 'كراس شروط اعتماد المرشدين السياحيين المحليين' : 'Cahier des charges pour l\'agrément des guides locaux',
      code: 'FORM-DIR-03',
      icon: Compass,
      size: '2.1 MB',
    },
    {
      id: 'form-safari-permit',
      title: language === 'ar' ? 'تصريح تنظيم مسار سياحي واستكشافي في العرق الشرقي' : 'Autorisation de circuit et bivouac dans le Grand Erg',
      code: 'FORM-DIR-04',
      icon: Sparkles,
      size: '1.1 MB',
    }
  ];

  return (
    <div className="bg-[#FAF7F2] py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8DCCD] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0C6B58] uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4" />
              <span>{t.nav.digitalServices}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E36] font-heading">
              {t.services.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {t.services.subtitle}
            </p>
          </div>

          {/* Sub-tabs switch */}
          <div className="flex items-center gap-1.5 bg-[#F4EDE4] p-1.5 rounded-2xl self-start md:self-auto">
            <button
              onClick={() => setActiveSubTab('complaint')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeSubTab === 'complaint' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:text-black'
              }`}
            >
              {t.services.tabs.complaint}
            </button>

            <button
              onClick={() => setActiveSubTab('track')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeSubTab === 'track' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:text-black'
              }`}
            >
              {t.services.tabs.track}
            </button>

            <button
              onClick={() => setActiveSubTab('forms')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeSubTab === 'forms' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:text-black'
              }`}
            >
              {t.services.tabs.forms}
            </button>
          </div>
        </div>

        {/* SUBTAB 1: Complaint & Request Form */}
        {activeSubTab === 'complaint' && (
          <div className="bg-white rounded-3xl p-8 border border-[#E8DCCD] shadow-sm max-w-4xl mx-auto">
            
            {generatedCode ? (
              <div className="text-center py-8 space-y-6 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#0F1E36] font-heading">
                    {t.services.form.successTitle}
                  </h3>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto">
                    {t.services.form.successMsg}
                  </p>
                </div>

                {/* Generated Tracking Box */}
                <div className="bg-[#FAF7F2] border-2 border-dashed border-[#C89D66] rounded-2xl p-6 max-w-md mx-auto">
                  <span className="text-xs font-bold text-slate-500 block mb-1">
                    {language === 'ar' ? 'رقم التتبع الرسمي للملف' : 'Official Case Tracking Code'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#0F1E36] font-mono tracking-widest block">
                    {generatedCode}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  {lastSubmittedReq && (
                    <button
                      onClick={() => void downloadReceipt(lastSubmittedReq)}
                      className="bg-[#0F1E36] hover:bg-[#1E3A5F] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-md"
                    >
                      <FileDown className="w-4 h-4 text-[#C89D66]" />
                      <span>{t.services.form.downloadReceipt}</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setTrackInput(generatedCode);
                      setActiveSubTab('track');
                    }}
                    className="bg-[#0C6B58] hover:bg-[#095243] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-md"
                  >
                    <Search className="w-4 h-4" />
                    <span>{language === 'ar' ? 'الانتقال إلى شاشة المتابعة' : 'Go to Tracking Screen'}</span>
                  </button>

                  <button
                    onClick={() => setGeneratedCode(null)}
                    className="text-xs text-slate-600 hover:text-slate-900 underline block w-full"
                  >
                    {language === 'ar' ? 'تقديم طلب جديد' : 'Submit another request'}
                  </button>
                </div>
              </div>
            ) : (
              <>
              {requestError && (
                <div className="mb-4 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-center text-rose-800 text-xs">
                  <AlertCircle className="w-5 h-5 text-rose-600 mx-auto mb-1" />
                  <p>{requestError}</p>
                </div>
              )}
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* Service Type Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    {t.services.form.serviceType} *
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as ServiceType })}
                    className="w-full bg-[#FAF7F2] border border-[#D5C6B4] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                  >
                    <option value="complaint">{t.services.form.complaintOption}</option>
                    <option value="suggestion">{t.services.form.suggestionOption}</option>
                    <option value="hotel_classification">{t.services.form.hotelClassification}</option>
                    <option value="guide_license">{t.services.form.guideLicense}</option>
                    <option value="artisan_card">{t.services.form.artisanCard}</option>
                    <option value="safariPermit">{t.services.form.safariPermit}</option>
                  </select>
                </div>

                {/* Personal & Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {t.services.form.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#D5C6B4] rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {t.services.form.idNumber} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nationalIdOrPassport}
                      onChange={(e) => setFormData({ ...formData, nationalIdOrPassport: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#D5C6B4] rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {t.services.form.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#D5C6B4] rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {t.services.form.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#D5C6B4] rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.services.form.subject} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#D5C6B4] rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                  />
                </div>

                {/* Details */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.services.form.details} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#D5C6B4] rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
                    placeholder={language === 'ar' ? 'اشرح تفاصيل الشكوى أو الطلب الإداري بدقة...' : 'Explain the details of your inquiry, complaint or permit request...'}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0C6B58] hover:bg-[#095243] disabled:opacity-60 disabled:cursor-wait text-white text-sm font-bold py-3.5 rounded-2xl transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.services.form.submit}</span>
                  </button>
                </div>

              </form>
              </>
            )}

          </div>
        )}

        {/* SUBTAB 2: Track Application Status */}
        {activeSubTab === 'track' && (
          <div className="bg-white rounded-3xl p-8 border border-[#E8DCCD] shadow-sm max-w-3xl mx-auto space-y-6">
            
            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <label className="text-sm font-bold text-[#0F1E36] block">
                {t.services.tracker.inputLabel}
              </label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder={t.services.tracker.placeholder}
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  className="w-full bg-[#FAF7F2] border-2 border-[#D5C6B4] rounded-2xl py-3 px-4 text-sm font-mono text-slate-800 focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden uppercase"
                />
                <button
                  type="submit"
                  className="bg-[#0F1E36] hover:bg-[#1E3A5F] text-white font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm transition flex items-center gap-2 flex-shrink-0 shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.services.tracker.checkBtn}</span>
                </button>
              </div>
            </form>

            {/* Tracking Result View */}
            {requestError && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-center text-rose-800 text-xs">
                <AlertCircle className="w-5 h-5 text-rose-600 mx-auto mb-1" />
                <p>{requestError}</p>
              </div>
            )}

            {trackedResult === 'not_found' && !requestError && (
              <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center text-rose-800 text-xs space-y-1">
                <AlertCircle className="w-6 h-6 text-rose-600 mx-auto" />
                <p className="font-bold">{language === 'ar' ? 'رقم التتبع غير موجود بالمنظومة' : 'Tracking Number not found'}</p>
                <p>{language === 'ar' ? 'يرجى التأكد من كتابة الرقم بشكل صحيح (مثال: ELO-2026-8491)' : 'Please verify the code format (e.g. ELO-2026-8491)'}</p>
              </div>
            )}

            {trackedResult && trackedResult !== 'not_found' && (
              <div className="bg-[#FAF7F2] border border-[#E8DCCD] rounded-2xl p-6 space-y-5 animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2D4C3] pb-4">
                  <div>
                    <span className="text-[11px] text-slate-500 font-bold block">{language === 'ar' ? 'رقم الملف' : 'Dossier No.'}</span>
                    <span className="text-lg font-black text-[#0F1E36] font-mono">{trackedResult.trackingNumber}</span>
                  </div>
                  <div>
                    {getStatusBadge(trackedResult.status)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block font-bold">{t.services.form.fullName}:</span>
                    <span className="text-slate-800 font-semibold">{trackedResult.fullName || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-bold">{language === 'ar' ? 'تاريخ التسجيل' : 'Submission Date'}:</span>
                    <span className="text-slate-800 font-mono">{new Date(trackedResult.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block font-bold">{t.services.form.subject}:</span>
                    <span className="text-slate-800 font-semibold">{trackedResult.subject}</span>
                  </div>
                </div>

                {/* Assigned Department & Official Directorate Response */}
                {trackedResult.departmentAssigned && (
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
                    <span className="text-[11px] font-bold text-[#0C6B58] block mb-1">
                      {t.services.tracker.assignedTo}:
                    </span>
                    <span className="text-slate-800 font-semibold">{trackedResult.departmentAssigned}</span>
                  </div>
                )}

                {trackedResult.adminResponse && (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-emerald-900 block">
                      {t.services.tracker.officialResponse}:
                    </span>
                    <p className="text-emerald-800 leading-relaxed">
                      {trackedResult.adminResponse}
                    </p>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => void downloadReceipt(trackedResult)}
                    className="bg-[#0F1E36] hover:bg-[#1E3A5F] text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-xs"
                  >
                    <FileDown className="w-3.5 h-3.5 text-[#C89D66]" />
                    <span>{t.services.form.downloadReceipt}</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* SUBTAB 3: Downloadable Administrative Forms */}
        {activeSubTab === 'forms' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#E8DCCD] shadow-sm">
              <h3 className="text-xl font-bold text-[#0F1E36] font-heading mb-2">
                {t.services.downloadableForms.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                {t.services.downloadableForms.desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {officialForms.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="bg-[#FAF7F2] border border-[#E8DCCD] p-5 rounded-2xl flex items-center justify-between gap-4 hover:border-[#C89D66] transition group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-white text-[#0F1E36] flex items-center justify-center shadow-xs group-hover:bg-[#C89D66] group-hover:text-white transition">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-[#0F1E36] leading-snug">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {item.code} • PDF ({item.size})
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          alert(language === 'ar' ? `جاري تحميل الاستمارة: ${item.title}` : `Téléchargement du formulaire: ${item.title}`);
                        }}
                        className="p-2.5 rounded-xl bg-white border border-[#D5C6B4] text-slate-700 hover:bg-[#0F1E36] hover:text-white transition shadow-xs flex-shrink-0"
                        title="Download PDF Form"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
