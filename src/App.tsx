import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveMap } from './components/InteractiveMap';
import { InvestmentSection } from './components/InvestmentSection';
import { DigitalServices } from './components/DigitalServices';
import { HandicraftsDirectory } from './components/HandicraftsDirectory';
import { EventsCalendar } from './components/EventsCalendar';
import { NewsSection } from './components/NewsSection';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { InstitutionalPages } from './components/InstitutionalPages';
import { FeaturedSites } from './components/FeaturedSites';
import { DirectorateBrief } from './components/DirectorateBrief';
import { TourismDirectory } from './components/TourismDirectory';
import { 
  ChevronUp, 
  MapPin, 
  Sparkles, 
  Calendar, 
  Briefcase, 
  ArrowRight, 
  ArrowLeft, 
  Shield 
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, setActiveTab, language, isRTL, t, loading, dataError } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const sectionTitle: Partial<Record<typeof activeTab, string>> = {
      map: language === 'ar' ? 'الخريطة والمعالم السياحية' : language === 'fr' ? 'Carte & sites touristiques' : 'Map & Tourist Sites',
      events: language === 'ar' ? 'أجندة الفعاليات' : language === 'fr' ? 'Agenda des événements' : 'Events Agenda',
      artisan: language === 'ar' ? 'دليل الصناعة التقليدية' : language === 'fr' ? 'Guide de l’artisanat' : 'Handicrafts Directory',
      investment: language === 'ar' ? 'الاستثمار السياحي' : language === 'fr' ? 'Investissement touristique' : 'Tourism Investment',
      services: language === 'ar' ? 'الخدمات الرقمية والشكاوى' : language === 'fr' ? 'Services numériques' : 'Digital Services',
      news: language === 'ar' ? 'الأخبار والمستجدات' : language === 'fr' ? 'Actualités' : 'News & Announcements',
      about: language === 'ar' ? 'عن المديرية' : language === 'fr' ? 'À propos de la Direction' : 'About the Directorate',
      contact: language === 'ar' ? 'اتصل بنا' : language === 'fr' ? 'Contact' : 'Contact',
      privacy: language === 'ar' ? 'سياسة الخصوصية' : language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy',
      terms: language === 'ar' ? 'شروط الاستخدام' : language === 'fr' ? 'Conditions d’utilisation' : 'Terms of Use',
      faq: 'FAQ',
    };
    document.title = activeTab === 'home' ? t.directorateName : `${sectionTitle[activeTab] || t.directorateName} | ${t.directorateName}`;
  }, [activeTab, language, t.directorateName]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-900 selection:bg-[#C89D66]/30 selection:text-[#0F1E36]">
      {/* Official Government Top Navigation Bar */}
      <Navbar />

      {dataError && (
        <div role="status" className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-900">
          {language === 'ar' ? 'تعذر تحميل بعض البيانات الرسمية حالياً. يرجى المحاولة لاحقاً.' : language === 'fr' ? 'Certaines données officielles sont momentanément indisponibles. Veuillez réessayer.' : 'Some official data is temporarily unavailable. Please try again.'}
        </div>
      )}
      {loading && (
        <div role="status" className="h-1 w-full overflow-hidden bg-[#E8DCCD]">
          <div className="h-full w-1/3 animate-pulse bg-[#C89D66]" />
        </div>
      )}

      {/* Main Content Router */}
      <main id="main-content" className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* 1. Hero with Real Imagery, Stats & Search */}
            <Hero />

            {/* 2. Directorate brief */}
            <DirectorateBrief />

            {/* 3. Featured destination cards */}
            <FeaturedSites />

            {/* 4. Official-style tourism directory shortcuts */}
            <TourismDirectory />

            {/* 5. Souf handicrafts and artisan directory */}
            <section className="py-2">
              <HandicraftsDirectory />
            </section>

            {/* 6. Tourism investment */}
            <section className="py-2">
              <InvestmentSection />
            </section>

            {/* 7. Digital services and citizen requests */}
            <section className="py-2">
              <DigitalServices />
            </section>

            {/* 8. Events and official announcements */}
            <section className="py-2">
              <EventsCalendar />
            </section>

            <section className="py-2">
              <NewsSection />
            </section>
          </div>
        )}

        {activeTab === 'map' && <InteractiveMap />}
        {activeTab === 'investment' && <InvestmentSection />}
        {activeTab === 'services' && <DigitalServices />}
        {activeTab === 'artisan' && <HandicraftsDirectory />}
        {activeTab === 'events' && <EventsCalendar />}
        {activeTab === 'news' && <NewsSection />}
        {activeTab === 'admin' && <AdminDashboard />}
        {activeTab === 'about' && <InstitutionalPages page="about" />}
        {activeTab === 'contact' && <InstitutionalPages page="contact" />}
        {activeTab === 'privacy' && <InstitutionalPages page="privacy" />}
        {activeTab === 'terms' && <InstitutionalPages page="terms" />}
        {activeTab === 'faq' && <InstitutionalPages page="faq" />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-[#0F1E36] hover:bg-[#C89D66] text-white p-3.5 rounded-2xl shadow-xl transition-all duration-300 border border-white/20 flex items-center justify-center group"
          title={language === 'ar' ? 'العودة إلى الأعلى' : 'Back to top'}
        >
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
