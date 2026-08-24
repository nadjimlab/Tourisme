import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TouristSite, TourismEvent, MasterArtisan, DigitalRequest, NewsArticle, SiteCategory } from '../types';
import { 
  Shield, 
  Lock, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  MapPin, 
  Calendar, 
  Award, 
  Newspaper, 
  Download, 
  BarChart3, 
  Layers, 
  Send,
  Eye,
  Loader2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    language, 
    t, 
    isAdmin, 
    loginAdmin, 
    userEmail,
    logoutAdmin, 
    sites, 
    addSite, 
    deleteSite, 
    events, 
    addEvent, 
    deleteEvent, 
    artisans, 
    addArtisan, 
    deleteArtisan, 
    requests, 
    updateRequestStatus, 
    news, 
    addNews, 
    deleteNews 
  } = useApp();

  const [emailInput, setEmailInput] = useState(userEmail || '');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [adminTab, setAdminTab] = useState<'overview' | 'sites' | 'complaints' | 'events' | 'artisans' | 'news'>('overview');
  const profileSetupRequired = /profiles|schema cache/i.test(loginError);

  // New Site Form
  const [newSite, setNewSite] = useState({
    nameAr: '',
    nameFr: '',
    nameEn: '',
    category: 'cultural' as SiteCategory,
    communeAr: 'بلدية الوادي',
    communeFr: 'Commune d\'El Oued',
    communeEn: 'El Oued Municipality',
    lat: 33.3683,
    lng: 6.8516,
    descAr: '',
    descFr: '',
    descEn: '',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    visitingHoursAr: 'يومياً 08:00 - 18:00',
    feeAr: 'مجاني',
  });

  // Response Form for Complaint
  const [respondingToReq, setRespondingToReq] = useState<DigitalRequest | null>(null);
  const [responseNotes, setResponseNotes] = useState('');
  const [assignedDept, setAssignedDept] = useState('مصلحة الترقية والتهيئة السياحية');
  const [newStatus, setNewStatus] = useState<DigitalRequest['status']>('resolved');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!emailInput.trim() || !passwordInput) {
      setLoginError(language === 'ar' ? 'أدخل البريد الإلكتروني وكلمة المرور.' : language === 'fr' ? 'Saisissez votre adresse e-mail et votre mot de passe.' : 'Enter your email and password.');
      return;
    }

    setIsLoggingIn(true);
    try {
      const result = await loginAdmin(emailInput, passwordInput);
      if (!result.ok) {
        setLoginError(result.error || (language === 'ar' ? 'تعذر تسجيل الدخول.' : language === 'fr' ? 'Connexion impossible.' : 'Sign-in failed.'));
        return;
      }
      setPasswordInput('');
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : (language === 'ar' ? 'تعذر الاتصال بخدمة المصادقة.' : language === 'fr' ? 'Impossible de joindre le service d’authentification.' : 'Unable to reach the authentication service.'));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleCreateSite = async (e: React.FormEvent) => {
    e.preventDefault();
    const siteObj: TouristSite = {
      id: `site-${Date.now()}`,
      name: {
        ar: newSite.nameAr || 'معلم جديد',
        fr: newSite.nameFr || newSite.nameAr,
        en: newSite.nameEn || newSite.nameAr,
      },
      category: newSite.category,
      commune: {
        ar: newSite.communeAr,
        fr: newSite.communeFr,
        en: newSite.communeEn,
      },
      coordinates: [Number(newSite.lat), Number(newSite.lng)],
      description: {
        ar: newSite.descAr,
        fr: newSite.descFr || newSite.descAr,
        en: newSite.descEn || newSite.descAr,
      },
      history: {
        ar: newSite.descAr,
        fr: newSite.descFr || newSite.descAr,
        en: newSite.descEn || newSite.descAr,
      },
      images: [newSite.imageUrl],
      visitingHours: {
        ar: newSite.visitingHoursAr,
        fr: '08h00 - 18h00',
        en: '08:00 - 18:00',
      },
      entryFee: {
        ar: newSite.feeAr,
        fr: 'Gratuit',
        en: 'Free',
      },
      amenities: {
        ar: ['موقف سيارات', 'مرشد سياحي'],
        fr: ['Parking', 'Guide'],
        en: ['Parking', 'Guide'],
      },
      address: {
        ar: newSite.communeAr,
        fr: newSite.communeFr,
        en: newSite.communeEn,
      },
      rating: 5.0,
      reviewsCount: 1,
    };

    try {
      await addSite(siteObj);
      alert(language === 'ar' ? 'تم إضافة المعلم السياحي بنجاح وتحديث الخريطة التفاعلية!' : 'Site added successfully!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to save the site.');
      return;
    }
    setNewSite({
      nameAr: '',
      nameFr: '',
      nameEn: '',
      category: 'cultural',
      communeAr: 'بلدية الوادي',
      communeFr: 'Commune d\'El Oued',
      communeEn: 'El Oued Municipality',
      lat: 33.3683,
      lng: 6.8516,
      descAr: '',
      descFr: '',
      descEn: '',
      imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      visitingHoursAr: 'يومياً 08:00 - 18:00',
      feeAr: 'مجاني',
    });
  };

  const handleUpdateComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!respondingToReq) return;
    try {
      await updateRequestStatus(respondingToReq.id, newStatus, responseNotes, assignedDept);
      setRespondingToReq(null);
      setResponseNotes('');
      alert(language === 'ar' ? 'تم تحديث حالة الشكوى وإرسال الرد الإداري بنجاح!' : 'Complaint updated successfully!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to update the request.');
    }
  };

  const exportFullDossier = () => {
    const fullBackup = {
      exportDate: new Date().toISOString(),
      wilaya: 'El Oued (39)',
      directorate: 'Directorate of Tourism and Handicrafts',
      sitesCount: sites.length,
      sites,
      events,
      artisans,
      requests,
      news,
    };

    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rapport_Direction_Tourisme_ElOued_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  // If not logged in, render official administrative login screen
  if (!isAdmin) {
    return (
      <div className="bg-[#FAF7F2] py-16 px-4 sm:px-8 min-h-[600px] flex items-center justify-center">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-xl border border-[#E8DCCD] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#0F1E36] text-[#C89D66] flex items-center justify-center mx-auto shadow-md">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F1E36] font-heading">
              {t.admin.loginTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {t.admin.loginDesc}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t.admin.username}
              </label>
              <input
                type="email"
                required
                autoComplete="username"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="administration@tourisme-eloued.dz"
                className="w-full bg-white border border-[#D5C6B4] rounded-xl py-2 px-3 text-xs text-slate-800 font-mono focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t.admin.password}
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-white border border-[#D5C6B4] rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
              />
            </div>

            {loginError && (
              <div className="space-y-2" role="alert">
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
                {profileSetupRequired && (
                  <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-6 text-amber-900">
                    {language === 'ar' ? 'يجب على مسؤول Supabase إنشاء جدول profiles وتعيين دور admin أو editor للحساب. ملف الإصلاح موجود في supabase/repair_profiles.sql.' : language === 'fr' ? 'Un administrateur Supabase doit créer la table profiles et attribuer le rôle admin ou editor au compte. Le correctif se trouve dans supabase/repair_profiles.sql.' : 'A Supabase administrator must create the profiles table and assign the admin or editor role to this account. The fix is available in supabase/repair_profiles.sql.'}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#0F1E36] hover:bg-[#1E3A5F] disabled:cursor-wait disabled:opacity-60 text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
            >
              {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin text-[#C89D66]" /> : <Lock className="w-4 h-4 text-[#C89D66]" />}
              <span>{isLoggingIn ? (language === 'ar' ? 'جارٍ التحقق...' : language === 'fr' ? 'Vérification…' : 'Signing in…') : t.admin.loginBtn}</span>
            </button>
          </form>

        </div>
      </div>
    );
  }

  // Logged-in Admin Portal View
  return (
    <div className="bg-[#FAF7F2] py-8 px-4 sm:px-8 min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Admin Header */}
        <div className="bg-[#0F1E36] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#1E3A5F] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4" />
              <span>{t.admin.title}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              {t.directorateName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {t.admin.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={exportFullDossier}
              className="bg-[#1E3A5F] hover:bg-[#2B4E7E] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 border border-[#3A649E]"
              title={t.admin.actions.exportReport}
            >
              <Download className="w-4 h-4 text-[#C89D66]" />
              <span className="hidden sm:inline">{language === 'ar' ? 'تصدير تقرير إداري' : 'Export Dossier'}</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="bg-rose-900/80 hover:bg-rose-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>{t.admin.logout}</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DCCD] shadow-xs">
            <span className="text-xs text-slate-500 block">{t.admin.stats.totalSites}</span>
            <span className="text-2xl font-black text-[#0F1E36] font-mono">{sites.length}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E8DCCD] shadow-xs">
            <span className="text-xs text-slate-500 block">{t.admin.stats.pendingComplaints}</span>
            <span className="text-2xl font-black text-amber-600 font-mono">
              {requests.filter(r => r.status === 'submitted' || r.status === 'under_review' || r.status === 'in_progress').length}
            </span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E8DCCD] shadow-xs">
            <span className="text-xs text-slate-500 block">{t.admin.stats.activeEvents}</span>
            <span className="text-2xl font-black text-teal-600 font-mono">{events.length}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E8DCCD] shadow-xs">
            <span className="text-xs text-slate-500 block">{t.admin.stats.registeredArtisans}</span>
            <span className="text-2xl font-black text-purple-600 font-mono">{artisans.length}</span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto bg-white p-2 rounded-2xl border border-[#E8DCCD] shadow-xs">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              adminTab === 'overview' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:bg-[#FAF7F2]'
            }`}
          >
            {t.admin.tabs.overview}
          </button>
          <button
            onClick={() => setAdminTab('complaints')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
              adminTab === 'complaints' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:bg-[#FAF7F2]'
            }`}
          >
            <span>{t.admin.tabs.manageComplaints}</span>
            <span className="bg-amber-100 text-amber-900 text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold">
              {requests.length}
            </span>
          </button>
          <button
            onClick={() => setAdminTab('sites')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              adminTab === 'sites' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:bg-[#FAF7F2]'
            }`}
          >
            {t.admin.tabs.manageSites} ({sites.length})
          </button>
          <button
            onClick={() => setAdminTab('events')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              adminTab === 'events' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:bg-[#FAF7F2]'
            }`}
          >
            {t.admin.tabs.manageEvents} ({events.length})
          </button>
          <button
            onClick={() => setAdminTab('artisans')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              adminTab === 'artisans' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:bg-[#FAF7F2]'
            }`}
          >
            {t.admin.tabs.manageArtisans} ({artisans.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {adminTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-[#E8DCCD] shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#0F1E36] font-heading flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#C89D66]" />
                <span>{language === 'ar' ? 'توزيع المعالم والأنشطة السياحية حسب البلديات' : 'Sites Distribution across Municipalities'}</span>
              </h3>
              
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>بلدية الوادي (وسط المدينة والقصور العتيقة)</span>
                    <span className="font-mono">42%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0F1E36] rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>بلدية قمار وتغزوت (الزوايا والغيطان التراثية)</span>
                    <span className="font-mono">28%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#C89D66] rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>بلديات حاسي خليفة والدبيلة (سياحة الكثبان والتخييم)</span>
                    <span className="font-mono">18%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0C6B58] rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>حوض شط مروان والرطبة</span>
                    <span className="font-mono">12%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#E8DCCD] shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#0F1E36] font-heading">
                {language === 'ar' ? 'آخر الطلبات والشكاوى المودعة' : 'Latest Citizen Tickets'}
              </h3>
              
              <div className="space-y-3">
                {requests.slice(0, 3).map((req) => (
                  <div 
                    key={req.id}
                    onClick={() => {
                      setRespondingToReq(req);
                      setAdminTab('complaints');
                    }}
                    className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DCCD] hover:border-[#C89D66] cursor-pointer transition text-xs space-y-1"
                  >
                    <div className="flex justify-between font-mono font-bold text-slate-700">
                      <span>{req.trackingNumber}</span>
                      <span className="text-[10px] text-slate-500">{new Date(req.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="font-semibold text-slate-800 line-clamp-1">{req.subject}</p>
                    <span className="text-[10px] text-emerald-700 font-bold block">{req.status.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMPLAINTS & SERVICES DESK */}
        {adminTab === 'complaints' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCCD] shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-[#0F1E36] font-heading">
              {t.admin.tabs.manageComplaints}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-[#FAF7F2] text-slate-600 border-b border-[#E8DCCD]">
                    <th className="p-3 font-bold">رقم التتبع</th>
                    <th className="p-3 font-bold">المواطن / المؤسسة</th>
                    <th className="p-3 font-bold">نوع الخدمة</th>
                    <th className="p-3 font-bold">الموضوع</th>
                    <th className="p-3 font-bold">الحالة</th>
                    <th className="p-3 font-bold">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-[#0F1E36]">{req.trackingNumber}</td>
                      <td className="p-3">
                        <div className="font-bold">{req.fullName}</div>
                        <div className="text-slate-400">{req.phone}</div>
                      </td>
                      <td className="p-3">{req.serviceType}</td>
                      <td className="p-3 font-semibold text-slate-700 max-w-xs truncate">{req.subject}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          req.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                          req.status === 'in_progress' ? 'bg-purple-100 text-purple-800' :
                          req.status === 'under_review' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            setRespondingToReq(req);
                            setNewStatus(req.status);
                            setResponseNotes(req.adminResponse || '');
                            setAssignedDept(req.departmentAssigned || 'مصلحة الترقية والتهيئة السياحية');
                          }}
                          className="bg-[#0F1E36] hover:bg-[#1E3A5F] text-white px-3 py-1.5 rounded-lg font-bold text-[11px] transition flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>معالجة والرد</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Response Modal */}
            {respondingToReq && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
                <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <h4 className="font-bold text-[#0F1E36]">معالجة ملف: {respondingToReq.trackingNumber}</h4>
                    <button onClick={() => setRespondingToReq(null)} className="text-slate-400 hover:text-black">✕</button>
                  </div>

                  <div className="bg-[#FAF7F2] p-3 rounded-xl text-xs space-y-1">
                    <p><strong>المواطن:</strong> {respondingToReq.fullName} ({respondingToReq.phone})</p>
                    <p><strong>الموضوع:</strong> {respondingToReq.subject}</p>
                    <p className="text-slate-600"><strong>التفاصيل:</strong> {respondingToReq.details}</p>
                  </div>

                  <form onSubmit={handleUpdateComplaint} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold block mb-1">تحديث حالة الملف:</label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as DigitalRequest['status'])}
                        className="w-full border rounded-xl p-2 bg-white"
                      >
                        <option value="under_review">قيد المراجعة الإدارية (Under Review)</option>
                        <option value="in_progress">قيد التحقيق الميداني (In Progress)</option>
                        <option value="resolved">تمت المعالجة والإجابة (Resolved)</option>
                        <option value="rejected">مرفوض مع تبرير (Rejected)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold block mb-1">المصلحة المكلفة بالمعالجة:</label>
                      <input
                        type="text"
                        value={assignedDept}
                        onChange={(e) => setAssignedDept(e.target.value)}
                        className="w-full border rounded-xl p-2"
                      />
                    </div>

                    <div>
                      <label className="font-bold block mb-1">نص الرد الرسمي للمديرية:</label>
                      <textarea
                        rows={3}
                        required
                        value={responseNotes}
                        onChange={(e) => setResponseNotes(e.target.value)}
                        className="w-full border rounded-xl p-2"
                        placeholder="اكتب التعليمات والرد الإداري الموجه للمواطن..."
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="flex-1 bg-[#0C6B58] text-white py-2.5 rounded-xl font-bold">
                        حفظ التحديث والرد
                      </button>
                      <button type="button" onClick={() => setRespondingToReq(null)} className="px-4 border rounded-xl">
                        إلغاء
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SITES MANAGER */}
        {adminTab === 'sites' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Add New Site Form */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E8DCCD] shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#0F1E36] font-heading flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#C89D66]" />
                <span>{language === 'ar' ? 'إضافة معلم سياحي جديد للخريطة' : 'Add New Tourist Site'}</span>
              </h3>

              <form onSubmit={handleCreateSite} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">اسم المعلم بالعربية *</label>
                  <input
                    type="text"
                    required
                    value={newSite.nameAr}
                    onChange={(e) => setNewSite({ ...newSite, nameAr: e.target.value })}
                    className="w-full border border-[#D5C6B4] rounded-xl p-2 bg-[#FAF7F2]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold block mb-1">الصنف *</label>
                    <select
                      value={newSite.category}
                      onChange={(e) => setNewSite({ ...newSite, category: e.target.value as SiteCategory })}
                      className="w-full border border-[#D5C6B4] rounded-xl p-2 bg-[#FAF7F2]"
                    >
                      <option value="cultural">ثقافي ومعماري (Cultural)</option>
                      <option value="natural">طبيعي وواحات (Natural)</option>
                      <option value="religious">ديني وزوايا (Religious)</option>
                      <option value="handicrafts">حرف وورشات (Handicrafts)</option>
                      <option value="historical">تاريخي وقصور (Historical)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">البلدية *</label>
                    <input
                      type="text"
                      value={newSite.communeAr}
                      onChange={(e) => setNewSite({ ...newSite, communeAr: e.target.value })}
                      className="w-full border border-[#D5C6B4] rounded-xl p-2 bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold block mb-1">خط العرض (Latitude) *</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={newSite.lat}
                      onChange={(e) => setNewSite({ ...newSite, lat: parseFloat(e.target.value) })}
                      className="w-full border border-[#D5C6B4] rounded-xl p-2 bg-[#FAF7F2] font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">خط الطول (Longitude) *</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={newSite.lng}
                      onChange={(e) => setNewSite({ ...newSite, lng: parseFloat(e.target.value) })}
                      className="w-full border border-[#D5C6B4] rounded-xl p-2 bg-[#FAF7F2] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">رابط الصورة *</label>
                  <input
                    type="url"
                    value={newSite.imageUrl}
                    onChange={(e) => setNewSite({ ...newSite, imageUrl: e.target.value })}
                    className="w-full border border-[#D5C6B4] rounded-xl p-2 bg-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">الوصف والأهمية التاريخية *</label>
                  <textarea
                    rows={3}
                    required
                    value={newSite.descAr}
                    onChange={(e) => setNewSite({ ...newSite, descAr: e.target.value })}
                    className="w-full border border-[#D5C6B4] rounded-xl p-2 bg-[#FAF7F2]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0F1E36] hover:bg-[#1E3A5F] text-white py-2.5 rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة المعلم وتحديث الخريطة</span>
                </button>
              </form>
            </div>

            {/* Existing Sites List */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E8DCCD] shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#0F1E36] font-heading">
                قائمة المعالم المسجلة ({sites.length})
              </h3>

              <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                {sites.map(site => (
                  <div
                    key={site.id}
                    className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8DCCD] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img src={site.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-[#0F1E36]">{site.name.ar}</h4>
                        <span className="text-[11px] text-slate-500">{site.commune.ar} • {site.category}</span>
                        {site.id.startsWith('ouedna-place-') && <span className="mt-1 inline-block rounded-full bg-[#E8F1EC] px-2 py-0.5 text-[10px] font-bold text-[#0C6B58]">Ouedna · للعرض فقط</span>}
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={site.id.startsWith('ouedna-place-')}
                      onClick={() => {
                        if (site.id.startsWith('ouedna-place-')) return;
                        if (confirm(`هل أنت متأكد من حذف معلم: ${site.name.ar}؟`)) {
                          deleteSite(site.id);
                        }
                      }}
                      className={`rounded-lg p-2 transition ${site.id.startsWith('ouedna-place-') ? 'cursor-not-allowed text-slate-300' : 'text-rose-600 hover:bg-rose-50'}`}
                      title={site.id.startsWith('ouedna-place-') ? 'معلم من Ouedna — للعرض فقط' : 'حذف'}
                      aria-label={site.id.startsWith('ouedna-place-') ? 'معلم من Ouedna للعرض فقط' : 'حذف المعلم'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EVENTS MANAGER */}
        {adminTab === 'events' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCCD] shadow-xs space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#0F1E36] font-heading">
                إدارة الفعاليات والأجندة السياحية
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event) => (
                <div key={event.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DCCD] flex justify-between gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-[#C89D66] uppercase">{event.type}</span>
                    <h4 className="font-bold text-sm text-[#0F1E36]">{event.title.ar}</h4>
                    <p className="text-slate-500 mt-1">{event.dateStart} — {event.dateEnd}</p>
                    <p className="text-slate-600 mt-1">{event.location.ar}</p>
                  </div>

                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ARTISANS MANAGER */}
        {adminTab === 'artisans' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCCD] shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-[#0F1E36] font-heading">
              سجل الحرفيين المعتمدين بغرفة الصناعة التقليدية
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {artisans.map(artisan => (
                <div key={artisan.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DCCD] flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={artisan.photo} alt="" className="w-12 h-12 rounded-xl object-cover border" />
                    <div>
                      <span className="text-[10px] text-emerald-700 font-mono font-bold">{artisan.registrationNumber}</span>
                      <h4 className="font-bold text-slate-800">{artisan.name.ar}</h4>
                      <p className="text-slate-500">{artisan.commune.ar} • {artisan.phone}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteArtisan(artisan.id)}
                    className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
