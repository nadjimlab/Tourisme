import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { SiteCategory, TouristSite } from '../types';
import { 
  MapPin, 
  Layers, 
  Search, 
  ExternalLink, 
  Copy, 
  Check, 
  FileDown, 
  Clock, 
  Sparkles,
  Landmark,
  Compass, 
  Star, 
  Navigation, 
  Eye, 
  X,
  Share2,
  Hotel,
  Utensils,
  Building2
} from 'lucide-react';
import L from 'leaflet';

async function downloadSiteBrochure(site: TouristSite, language: import('../types').Language) {
  const { generateSitePDF } = await import('../utils/pdfGenerator');
  await generateSitePDF(site, language);
}

export const InteractiveMap: React.FC = () => {
  const { 
    language, 
    t, 
    sites, 
    selectedCategory, 
    setSelectedCategory, 
    selectedSiteId, 
    setSelectedSiteId, 
    searchTerm 
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeSiteModal, setActiveSiteModal] = useState<TouristSite | null>(null);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [viewMode, setViewMode] = useState<'split' | 'mapOnly' | 'listOnly'>('split');

  // Filter sites by category and search terms
  const filteredSites = sites.filter(site => {
    const matchesCategory = selectedCategory === 'all' || site.category === selectedCategory;
    const query = (localSearch || searchTerm).toLowerCase().trim();
    const matchesSearch = !query || 
      site.name[language]?.toLowerCase().includes(query) ||
      site.commune[language]?.toLowerCase().includes(query) ||
      site.description[language]?.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (cat: SiteCategory) => {
    switch (cat) {
      case 'natural': return '#059669'; // Emerald
      case 'religious': return '#D97706'; // Amber / Gold
      case 'historical': return '#1E3A8A'; // Deep Blue
      case 'cultural': return '#0D9488'; // Teal
      case 'handicrafts': return '#C89D66'; // Desert Sand
      case 'accommodation': return '#7C3AED';
      case 'dining': return '#EA580C';
      case 'services': return '#2563EB';
      default: return '#0F1E36';
    }
  };

  const getCategoryLabel = (cat: SiteCategory) => {
    return t.categories[cat] || cat;
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [33.3683, 6.8516], // El Oued City Center
        zoom: 11,
        scrollWheelZoom: true,
      });

      // Warm CartoDB Voyager or OpenStreetMap Tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 19,
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup handled on unmount
    };
  }, []);

  // Update Markers when filteredSites or language changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    filteredSites.forEach(site => {
      const color = getCategoryColor(site.category);
      
      const customIcon = L.divIcon({
        className: 'custom-map-icon',
        html: `
          <div style="
            background-color: ${color};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2.5px solid #FFFFFF;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            color: white;
            font-size: 14px;
            cursor: pointer;
          ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker(site.coordinates, { icon: customIcon });

      const popupContent = `
        <div style="font-family: 'Cairo', 'Plus Jakarta Sans', sans-serif; min-width: 200px; text-align: ${language === 'ar' ? 'right' : 'left'}; direction: ${language === 'ar' ? 'rtl' : 'ltr'};">
          <div style="font-size: 10px; font-weight: bold; color: ${color}; text-transform: uppercase; margin-bottom: 2px;">
            ${getCategoryLabel(site.category)}
          </div>
          <h3 style="font-size: 14px; font-weight: bold; margin: 0 0 4px 0; color: #0F1E36;">
            ${site.name[language] || site.name.ar}
          </h3>
          <p style="font-size: 11px; color: #64748B; margin: 0 0 8px 0;">
            ${site.commune[language] || site.commune.ar}
          </p>
          <button id="btn-view-site-${site.id}" style="
            background: #0F1E36;
            color: #FFFFFF;
            border: none;
            border-radius: 6px;
            padding: 4px 10px;
            font-size: 11px;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
          ">
            ${t.map.siteDetails}
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-view-site-${site.id}`);
        if (btn) {
          btn.onclick = () => {
            setActiveSiteModal(site);
          };
        }
      });

      markersLayerRef.current?.addLayer(marker);
    });

    // Auto-center map if specific site selected or on search
    if (selectedSiteId) {
      const selected = sites.find(s => s.id === selectedSiteId);
      if (selected && mapInstanceRef.current) {
        mapInstanceRef.current.setView(selected.coordinates, 13, { animate: true });
        setActiveSiteModal(selected);
      }
    }
  }, [filteredSites, language, selectedSiteId]);

  const handleCopyCoordinates = (coords: [number, number]) => {
    navigator.clipboard.writeText(`${coords[0]}, ${coords[1]}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 3000);
  };

  const handleCenterOnSite = (site: TouristSite) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(site.coordinates, 14, { animate: true });
    }
  };

  const categoriesList: { id: SiteCategory | 'all'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: t.categories.all, icon: Layers },
    { id: 'cultural', label: t.categories.cultural, icon: Sparkles },
    { id: 'historical', label: t.categories.historical, icon: Landmark },
    { id: 'natural', label: t.categories.natural, icon: Compass },
    { id: 'religious', label: t.categories.religious, icon: Star },
    { id: 'handicrafts', label: t.categories.handicrafts, icon: MapPin },
    { id: 'accommodation', label: t.categories.accommodation, icon: Hotel },
    { id: 'dining', label: t.categories.dining, icon: Utensils },
    { id: 'services', label: t.categories.services, icon: Building2 },
  ];

  return (
    <div className="bg-[#FAF7F2] py-8 px-4 sm:px-8 min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8DCCD] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C89D66] uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>{t.nav.sitesMap}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E36] font-heading">
              {t.map.title}
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              {t.map.subtitle}
            </p>
          </div>

          {/* View Toggles */}
          <div className="flex items-center gap-2 bg-[#F4EDE4] p-1.5 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'split' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:text-black'
              }`}
            >
              {language === 'ar' ? 'عرض مدمج' : 'Split View'}
            </button>
            <button
              onClick={() => setViewMode('mapOnly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'mapOnly' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:text-black'
              }`}
            >
              {t.map.mapView}
            </button>
            <button
              onClick={() => setViewMode('listOnly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'listOnly' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-700 hover:text-black'
              }`}
            >
              {t.map.listView} ({filteredSites.length})
            </button>
          </div>
        </div>

        {/* Categories Bar & Search Filter */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-3.5 rounded-xl shadow-xs border border-[#E8DCCD]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {categoriesList.map(cat => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                    isSelected 
                      ? 'bg-[#C89D66] text-[#0F1E36] shadow-xs' 
                      : 'bg-[#F4EDE4] text-slate-700 hover:bg-[#EAE0D3]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search in Map */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder={t.map.searchInMap}
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#D5C6B4] rounded-lg py-1.5 pr-8 pl-3 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#C89D66]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
          </div>
        </div>

        {/* Main Grid: Interactive Map & Sites Cards */}
        <div className={`grid gap-6 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
          
          {/* Leaflet Map Frame */}
          {viewMode !== 'listOnly' && (
            <div className={`relative bg-white rounded-2xl shadow-sm border border-[#E8DCCD] overflow-hidden ${
              viewMode === 'split' ? 'lg:col-span-7 h-[580px]' : 'h-[680px]'
            }`}>
              <div ref={mapContainerRef} className="w-full h-full z-10" />

              {/* Map floating controls */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                <button
                  onClick={() => {
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.setView([33.3683, 6.8516], 11);
                    }
                  }}
                  className="bg-white/95 hover:bg-white text-[#0F1E36] p-2 rounded-xl shadow-md border border-slate-200 text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs transition"
                  title={t.map.resetView}
                >
                  <Navigation className="w-4 h-4 text-[#C89D66]" />
                  <span className="hidden sm:inline">{t.map.resetView}</span>
                </button>
              </div>

              {/* Map Legend Floating Banner */}
              <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-md border border-slate-200 text-[11px] hidden sm:flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#059669]"></span> {t.categories.natural}</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"></span> {t.categories.religious}</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]"></span> {t.categories.cultural}</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]"></span> {t.categories.historical}</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#C89D66]"></span> {t.categories.handicrafts}</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]"></span> {t.categories.accommodation}</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]"></span> {t.categories.dining}</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span> {t.categories.services}</span>
              </div>
            </div>
          )}

          {/* Sites Directory List / Cards */}
          {viewMode !== 'mapOnly' && (
            <div className={`space-y-4 ${
              viewMode === 'split' ? 'lg:col-span-5 h-[580px] overflow-y-auto pr-1' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-0'
            }`}>
              {filteredSites.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-dashed border-slate-300">
                  <Compass className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="font-bold text-slate-700">{language === 'ar' ? 'لم يتم العثور على معالم مطابقة' : 'No matching sites found'}</p>
                  <p className="text-xs mt-1">{language === 'ar' ? 'يرجى تغيير صنف المعلم أو كلمة البحث' : 'Please adjust your category or search query'}</p>
                </div>
              ) : (
                filteredSites.map((site) => {
                  const color = getCategoryColor(site.category);
                  return (
                    <div
                      key={site.id}
                      className="bg-white rounded-2xl border border-[#E8DCCD] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Photo Banner */}
                        <div className="relative h-44 overflow-hidden bg-slate-200">
                          <img
                            src={site.images[0]}
                            alt={site.name[language]}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          
                          {/* Category Badge */}
                          <span 
                            style={{ backgroundColor: color }}
                            className="absolute top-3 right-3 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs"
                          >
                            {getCategoryLabel(site.category)}
                          </span>

                          {/* Rating Badge */}
                          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1 font-bold">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span>{site.rating}</span>
                            <span className="text-[10px] text-slate-300 font-normal">({site.reviewsCount})</span>
                          </div>
                        </div>

                        {/* Card Details */}
                        <div className="p-4 space-y-2.5">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-[#C89D66]" />
                            <span>{site.commune[language] || site.commune.ar}</span>
                          </div>

                          <h3 className="font-bold text-[#0F1E36] text-base leading-snug font-heading group-hover:text-[#C89D66] transition">
                            {site.name[language] || site.name.ar}
                          </h3>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {site.description[language] || site.description.ar}
                          </p>

                          {/* Visiting Hours & Fee Strip */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-teal-600" />
                              <span className="truncate max-w-[150px]">{site.visitingHours[language]}</span>
                            </span>
                            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {site.entryFee[language]}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            handleCenterOnSite(site);
                            setActiveSiteModal(site);
                          }}
                          className="w-full bg-[#0F1E36] hover:bg-[#1E365D] text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{t.map.siteDetails}</span>
                        </button>

                        <button
                          onClick={() => void downloadSiteBrochure(site, language)}
                          className="w-full bg-[#F4EDE4] hover:bg-[#EAE0D3] text-[#0F1E36] text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5 border border-[#D5C6B4]"
                          title={t.map.downloadBrochure}
                        >
                          <FileDown className="w-3.5 h-3.5 text-[#C89D66]" />
                          <span>PDF</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

        </div>

      </div>

      {/* Full Tourist Site Detail Modal */}
      {activeSiteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveSiteModal(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gallery Header */}
            <div className="relative h-64 sm:h-80 bg-slate-900">
              <img
                src={activeSiteModal.images[0]}
                alt={activeSiteModal.name[language]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36] via-transparent to-black/30"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span 
                  style={{ backgroundColor: getCategoryColor(activeSiteModal.category) }}
                  className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-2 inline-block shadow-sm"
                >
                  {getCategoryLabel(activeSiteModal.category)}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  {activeSiteModal.name[language] || activeSiteModal.name.ar}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-[#C89D66]" />
                  <span>{activeSiteModal.address[language] || activeSiteModal.address.ar}</span>
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Key Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DCCD]">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">{t.map.visitingHours}</span>
                  <span className="text-xs font-semibold text-slate-800">{activeSiteModal.visitingHours[language]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">{t.map.entryFee}</span>
                  <span className="text-xs font-bold text-emerald-700">{activeSiteModal.entryFee[language]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">{t.map.coordinates}</span>
                  <span className="text-xs font-mono text-slate-800">
                    {activeSiteModal.coordinates[0].toFixed(3)}N, {activeSiteModal.coordinates[1].toFixed(3)}E
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">{language === 'ar' ? 'التقييم' : 'Rating'}</span>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {activeSiteModal.rating} / 5.0
                  </span>
                </div>
              </div>

              {/* Description & Historical Overview */}
              <div>
                <h4 className="text-sm font-bold text-[#0F1E36] uppercase tracking-wider mb-2">
                  {language === 'ar' ? 'الوصف والأهمية التاريخية والمعمارية' : 'Description & Cultural Significance'}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeSiteModal.description[language]}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mt-2 italic bg-amber-50/50 p-3 rounded-xl border-l-4 border-[#C89D66]">
                  {activeSiteModal.history[language]}
                </p>
              </div>

              {/* Amenities & Facilities */}
              <div>
                <h4 className="text-sm font-bold text-[#0F1E36] uppercase tracking-wider mb-3">
                  {t.map.amenities}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeSiteModal.amenities[language]?.map((amenity, i) => (
                    <span
                      key={i}
                      className="bg-[#F4EDE4] text-[#0F1E36] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#E2D4C3]"
                    >
                      ✓ {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions & Navigation Links */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${activeSiteModal.coordinates[0]},${activeSiteModal.coordinates[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0C6B58] hover:bg-[#095243] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-xs"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>{t.map.getDirections}</span>
                  </a>

                  <button
                    onClick={() => handleCopyCoordinates(activeSiteModal.coordinates)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5"
                  >
                    {copiedCoords ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCoords ? t.map.coordsCopied : t.map.copyCoords}</span>
                  </button>
                </div>

                <button
                  onClick={() => void downloadSiteBrochure(activeSiteModal, language)}
                  className="bg-[#C89D66] hover:bg-[#B38752] text-[#0F1E36] text-xs font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-md"
                >
                  <FileDown className="w-4 h-4" />
                  <span>{t.map.downloadBrochure}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};
