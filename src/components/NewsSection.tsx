import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NewsArticle } from '../types';
import { 
  Newspaper, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  Share2, 
  Eye, 
  X, 
  Sparkles, 
  Building 
} from 'lucide-react';

export const NewsSection: React.FC = () => {
  const { language, t, isRTL, news } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <div className="bg-[#FAF7F2] py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8DCCD] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0F1E36] uppercase tracking-wider mb-2">
              <Newspaper className="w-4 h-4 text-[#C89D66]" />
              <span>{t.nav.news}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E36] font-heading">
              {t.news.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {t.news.subtitle}
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-slate-500 bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-[#E8DCCD] self-start md:self-auto">
            {news.length} {language === 'ar' ? 'بيانات وبلاغات رسمية' : 'Official Press Releases'}
          </span>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-[#E8DCCD] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Category */}
                <div className="relative h-56 bg-slate-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36] via-transparent to-transparent"></div>
                  
                  {item.isImportant && (
                    <span className="absolute top-4 right-4 bg-amber-500 text-[#0F1E36] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                      {language === 'ar' ? 'هام وعاجل' : 'Important Notice'}
                    </span>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold font-heading text-white line-clamp-2">
                      {item.title[language]}
                    </h3>
                  </div>
                </div>

                {/* Excerpt */}
                <div className="p-6">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {item.excerpt[language]}
                  </p>
                </div>
              </div>

              {/* Read Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedArticle(item)}
                  className="w-full bg-[#FAF7F2] hover:bg-[#0F1E36] hover:text-white text-[#0F1E36] text-xs font-bold py-3 rounded-2xl transition flex items-center justify-center gap-2 border border-[#D5C6B4]"
                >
                  <span>{t.news.readMore}</span>
                  {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 space-y-6">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-60 bg-slate-900">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title[language]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs text-amber-400 font-bold block mb-1">
                  {selectedArticle.date} • {t.ministryName}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  {selectedArticle.title[language]}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                {selectedArticle.content[language]}
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>{t.directorateName}</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-[#0F1E36] text-white px-4 py-2 rounded-xl font-bold"
                >
                  {language === 'ar' ? 'إغلاق' : 'Fermer'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
