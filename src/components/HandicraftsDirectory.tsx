import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CraftCategory, MasterArtisan } from '../types';
import { 
  Sparkles, 
  Search, 
  Phone, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Eye, 
  X, 
  MessageSquare,
  ShoppingBag
} from 'lucide-react';

export const HandicraftsDirectory: React.FC = () => {
  const { language, t, artisans } = useApp();
  
  const [selectedCraft, setSelectedCraft] = useState<CraftCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtisanModal, setSelectedArtisanModal] = useState<MasterArtisan | null>(null);

  const filteredArtisans = artisans.filter(artisan => {
    const matchesCraft = selectedCraft === 'all' || artisan.craftCategory === selectedCraft;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      artisan.name[language]?.toLowerCase().includes(query) ||
      artisan.commune[language]?.toLowerCase().includes(query) ||
      artisan.bio[language]?.toLowerCase().includes(query);
    return matchesCraft && matchesSearch;
  });

  const craftFilters: { id: CraftCategory | 'all'; label: string }[] = [
    { id: 'all', label: t.artisan.filterAll },
    { id: 'carpets', label: t.artisan.carpets },
    { id: 'sand_rose', label: t.artisan.sand_rose },
    { id: 'palm_wood', label: t.artisan.palm_wood },
    { id: 'leather', label: t.artisan.leather },
    { id: 'traditional_food', label: t.artisan.traditional_food },
    { id: 'copper_pottery', label: t.artisan.copper_pottery },
  ];

  return (
    <div className="bg-[#FAF7F2] py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8DCCD] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C89D66] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{t.nav.handicrafts}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E36] font-heading">
              {t.artisan.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {t.artisan.subtitle}
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DCCD] flex items-center gap-3">
            <Award className="w-8 h-8 text-[#C89D66]" />
            <div className="text-xs">
              <span className="font-bold text-[#0F1E36] block">
                {language === 'ar' ? 'غرفة الصناعة التقليدية والحرف' : 'Chambre de l\'Artisanat (CAM)'}
              </span>
              <span className="text-slate-500">
                {language === 'ar' ? 'جميع الحرفيين معتمدين ومسجلين رسمياً' : 'All artisans verified & certified'}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8DCCD] shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {craftFilters.map(craft => (
              <button
                key={craft.id}
                onClick={() => setSelectedCraft(craft.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCraft === craft.id
                    ? 'bg-[#0F1E36] text-white shadow-xs'
                    : 'bg-[#F4EDE4] text-slate-700 hover:bg-[#EAE0D3]'
                }`}
              >
                {craft.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <input
              type="text"
              placeholder={t.artisan.searchArtisan}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#D5C6B4] rounded-xl py-2 pr-9 pl-3 text-xs text-slate-800 focus:ring-2 focus:ring-[#C89D66] focus:outline-hidden"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          </div>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-white rounded-3xl border border-[#E8DCCD] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={artisan.photo}
                    alt={artisan.name[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36] via-transparent to-transparent"></div>
                  
                  {artisan.isCertified && (
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t.artisan.certifiedBadge}</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] text-amber-300 font-semibold block">
                      {artisan.commune[language]}
                    </span>
                    <h3 className="text-base font-bold font-heading text-white truncate">
                      {artisan.name[language]}
                    </h3>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                    <span>{t.artisan.registrationNo}: <strong className="font-mono text-slate-700">{artisan.registrationNumber}</strong></span>
                    <span>{artisan.experienceYears} {t.artisan.years} {t.artisan.experience}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {artisan.bio[language]}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-[#C89D66] flex-shrink-0" />
                    <span className="truncate">{artisan.address[language]}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedArtisanModal(artisan)}
                  className="w-full bg-[#FAF7F2] hover:bg-[#F4EDE4] text-[#0F1E36] text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 border border-[#D5C6B4]"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C89D66]" />
                  <span>{t.artisan.viewCatalog}</span>
                </button>

                <a
                  href={`tel:${artisan.phone}`}
                  className="w-full bg-[#0F1E36] hover:bg-[#1E3A5F] text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C89D66]" />
                  <span>{t.artisan.contactArtisan}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Artisan Showcase Modal */}
      {selectedArtisanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 p-6 sm:p-8 space-y-6">
            
            <button
              onClick={() => setSelectedArtisanModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={selectedArtisanModal.photo}
                alt={selectedArtisanModal.name[language]}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#C89D66]"
              />
              <div>
                <span className="text-xs text-[#0C6B58] font-bold">
                  {selectedArtisanModal.registrationNumber} • {t.artisan.certifiedBadge}
                </span>
                <h3 className="text-xl font-bold text-[#0F1E36] font-heading">
                  {selectedArtisanModal.name[language]}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedArtisanModal.commune[language]} — {selectedArtisanModal.address[language]}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                {language === 'ar' ? 'السيرة المهنية والمهارات' : 'Artisan Biography'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedArtisanModal.bio[language]}
              </p>
            </div>

            {/* Products Gallery */}
            <div>
              <h4 className="text-xs font-bold text-[#0F1E36] uppercase tracking-wider mb-3">
                {t.artisan.viewCatalog}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedArtisanModal.products.map((prod, i) => (
                  <div key={i} className="bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E8DCCD] group">
                    <div className="h-36 overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.title[language]}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="p-3">
                      <h5 className="text-xs font-bold text-[#0F1E36]">
                        {prod.title[language]}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Footer */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <a
                href={`tel:${selectedArtisanModal.phone}`}
                className="bg-[#0F1E36] hover:bg-[#1E3A5F] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C89D66]" />
                <span>{selectedArtisanModal.phone}</span>
              </a>

              {selectedArtisanModal.whatsapp && (
                <a
                  href={`https://wa.me/${selectedArtisanModal.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
