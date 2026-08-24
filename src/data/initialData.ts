import { TouristSite, TourismEvent, MasterArtisan, InvestmentOpportunity, DigitalRequest, NewsArticle } from '../types';

export const INITIAL_SITES: TouristSite[] = [
  {
    id: 'site-eloued-domes',
    name: {
      ar: 'مدينة الألف قبة وقبة – النسيج المعماري التاريخي',
      fr: 'La Ville aux Mille Coupoles – Tissu Urbain Historique',
      en: 'The City of a Thousand Domes – Historic Architecture',
    },
    category: 'cultural',
    commune: {
      ar: 'بلدية الوادي (وسط المدينة)',
      fr: 'Commune d\'El Oued (Centre-ville)',
      en: 'El Oued Municipality (City Center)',
    },
    coordinates: [33.3683, 6.8516],
    description: {
      ar: 'تتميز مدينة الوادي بنمطها المعماري السوفي الفريد المعتمد على القباب البيضاء والأقواس المبنية من مادة "التمشنت" (الجبس التقليدي) والطين، مما يوفر عزلاً حرارياً طبيعياً ضد حرارة الصحراء ويمنح المدينة لقباً شهيراً كعاصمة الألف قبة.',
      fr: 'El Oued est mondialement célèbre pour son architecture soufie unique, dominée par d\'innombrables coupoles blanches en Timchent (plâtre traditionnel) offrant une climatisation passive contre le climat saharien.',
      en: 'El Oued is renowned for its iconic Saharan dome architecture built using local gypsum (Timchent) and desert clay, providing natural thermal insulation and earning it the title "City of a Thousand Domes".',
    },
    history: {
      ar: 'يعود هذا الطراز المعماري إلى قرون خلت، حيث ابتكره أهالي سوف للتغلب على قساوة المناخ الصحراوي وندرة الأخشاب للأسقف المسطحة، فصارت القبة رمزاً للهوية الثقافية للولاية.',
      fr: 'Développé au fil des siècles par les habitants du Souf face à la rareté du bois et la rigueur du climat, ce modèle de coupole est devenu le symbole identitaire de la région.',
      en: 'Pioneered centuries ago by the local Soufi inhabitants to adapt to extreme desert temperatures and wood scarcity, the white dome became an enduring architectural signature.',
    },
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    ],
    visitingHours: {
      ar: 'متاح طوال اليوم (أفضل وقت: الصباح الباكر أو قبل الغروب)',
      fr: 'Accessible en continu (Recommandé au lever/coucher du soleil)',
      en: 'Open all day (Best at sunrise & golden hour sunset)',
    },
    entryFee: {
      ar: 'مجاني للعموم',
      fr: 'Accès libre et gratuit',
      en: 'Free Public Access',
    },
    amenities: {
      ar: ['مواقف سيارات', 'مطاعم تقليدية ومقاهي', 'إمكانية التقاط صور بانورامية', 'مرشدين سياحيين محليين'],
      fr: ['Parking', 'Restaurants traditionnels', 'Points de vue panoramiques', 'Guides locaux disponibles'],
      en: ['Parking', 'Traditional Cafés & Dining', 'Panoramic Photo Viewpoints', 'Local Certified Guides'],
    },
    address: {
      ar: 'شارع أول نوفمبر وساحة الشهداء، وسط مدينة الوادي',
      fr: 'Avenue du 1er Novembre, Centre-ville d\'El Oued',
      en: '1st November Avenue, Downtown El Oued',
    },
    rating: 4.9,
    reviewsCount: 384,
    isFeatured: true,
    bestTimeToVisit: {
      ar: 'من أكتوبر إلى نهاية أفريل',
      fr: 'D\'octobre à fin avril',
      en: 'October through late April',
    }
  },
  {
    id: 'site-zaouia-guemar',
    name: {
      ar: 'الزاوية التجانية بقمار – المنارة الروحية والتاريخية',
      fr: 'Zaouïa Tidjania de Guemar – Haut Lieu Spirituel',
      en: 'Zaouia Tijaniyya of Guemar – Spiritual Landmark',
    },
    category: 'religious',
    commune: {
      ar: 'بلدية قمار (18 كلم شمال الوادي)',
      fr: 'Commune de Guemar (18 km au Nord)',
      en: 'Guemar Municipality (18 km North)',
    },
    coordinates: [33.4939, 6.7972],
    description: {
      ar: 'من أهم وأعرق المعالم الدينية والروحية في الجزائر وشمال إفريقيا، تأسست سنة 1789م على يد الشيخ سيدي محمد الساسي التجاني وتعتبر قبلة للزوار والباحثين في الفقه والتصوف من مختلف دول العالم.',
      fr: 'Fondée en 1789 par Cheikh Sidi Mohammed El Sassi Tidjani, cette prestigieuse zaouïa constitue un pôle majeur du soufisme et de la spiritualité en Afrique du Nord.',
      en: 'Established in 1789 by Sheikh Sidi Mohammed El Sassi Tidjani, this revered sanctuary is a major global pilgrimage and intellectual center for Tijaniyya spiritual heritage.',
    },
    history: {
      ar: 'تضم الزاوية مسجداً تاريخياً ذا قباب مزخرفة ومدرسة قرآنية ومكتبة ثرية بالمخطوطات النادرة التي تعود لقرون من الإشعاع العلمي.',
      fr: 'Le complexe comprend une mosquée aux plafonds sculptés, une madrasa coranique et une bibliothèque abritant des manuscrits d\'une valeur inestimable.',
      en: 'The sanctuary hosts an ornately decorated mosque, an ancient Quranic school, and an extensive library with rare Islamic manuscripts.',
    },
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    ],
    visitingHours: {
      ar: 'يومياً من 08:30 إلى 18:00 (يرجى الالتزام باللباس المحتشم)',
      fr: 'Tous les jours de 08h30 à 18h00 (Tenue correcte exigée)',
      en: 'Daily 08:30 to 18:00 (Respectful attire required)',
    },
    entryFee: {
      ar: 'مجاني للزوار والباحثين',
      fr: 'Entrée gratuite',
      en: 'Free Entry',
    },
    amenities: {
      ar: ['مصلى للرجال والنساء', 'مكتبة مخطوطات', 'مرشد ديني وتاريخي', 'مرافق وضوء مهيأة'],
      fr: ['Salles de prière', 'Bibliothèque de manuscrits', 'Médiateur culturel', 'Installations d\'ablutions'],
      en: ['Prayer Halls', 'Manuscript Library', 'Cultural Docents', 'Ablution Facilities'],
    },
    address: {
      ar: 'وسط مدينة قمار العتيقة، ولاية الوادي',
      fr: 'Centre historique de Guemar, Wilaya d\'El Oued',
      en: 'Historic Center of Guemar, El Oued Province',
    },
    rating: 4.95,
    reviewsCount: 290,
    isFeatured: true,
  },
  {
    id: 'site-ghout-souf',
    name: {
      ar: 'واحات الغيطان السوفية (نظام زراعة النخيل في قيعان الرمال - اليونسكو)',
      fr: 'Les Ghouts du Souf (Système Agricole Saharien Classé UNESCO)',
      en: 'The Ghouts of Souf (UNESCO Agricultural Heritage)',
    },
    category: 'natural',
    commune: {
      ar: 'بلديات تغزوت، الرباح، وقمار',
      fr: 'Communes de Taghzout, Robbah et Guemar',
      en: 'Taghzout, Robbah and Guemar Municipalities',
    },
    coordinates: [33.4125, 6.8920],
    description: {
      ar: 'نظام زراعي تقليدي عبقري مصنف من قبل منظمة الأغذية والزراعة (FAO) واليونسكو كنظام تراث زراعي ذي أهمية عالمية (GIAHS). يقوم على حفر أحواض دائرية عميقة بين الكثبان لتصل جذور نخيل دقلة نور إلى المياه الجوفية دون الحاجة إلى مضخات ري.',
      fr: 'Système agricole de génie classé par la FAO/UNESCO (SIPAM). Les palmiers dattiers sont plantés dans des entonnoirs creusés dans le sable pour atteindre la nappe phréatique sans pompage.',
      en: 'A genius ancestral farming marvel recognized by UNESCO and FAO (GIAHS). Funnel-like hollows are hand-excavated between dunes allowing date palm roots to feed directly on groundwater.',
    },
    history: {
      ar: 'ابتكره الفلاح السوفي منذ مئات السنين في معركة مستمرة ضد زحف الرمال، مما جعل وادي سوف تنتج أجود أنواع تمور "دقلة نور" الفاخرة.',
      fr: 'Fruit de siècles de persévérance face à l\'avancée des sables, ce modèle produit les meilleures dattes Deglet Nour d\'Algérie.',
      en: 'Perfected over centuries by Soufi farmers resisting desert sands, producing the world-renowned Algerian Deglet Nour dates.',
    },
    images: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    ],
    visitingHours: {
      ar: 'زيارات مع مرشد سياحي من 08:00 إلى 17:30',
      fr: 'Visites guidées de 08h00 à 17h30',
      en: 'Guided excursions 08:00 to 17:30',
    },
    entryFee: {
      ar: 'مجاني (رسوم رمزية للجولات الإرشادية وقطف التمور)',
      fr: 'Gratuit (Prestations de guides selon circuit)',
      en: 'Free Access (Guided tasting tours available)',
    },
    amenities: {
      ar: ['تذوق التمور الطازجة', 'جلسات شاي صحراوي تقليدي', 'مسارات مشي بين الغيطان', 'شراء منتجات التمور المباشرة'],
      fr: ['Dégustation de dattes', 'Cérémonie du thé saharien', 'Sentiers pédestres', 'Vente directe de produits du terroir'],
      en: ['Fresh Date Tastings', 'Traditional Saharan Mint Tea', 'Walking Footpaths', 'Farm-to-table Date Products'],
    },
    address: {
      ar: 'محيطات الغيطان، بلدية تغزوت والرباح',
      fr: 'Périmètres des Ghouts, Taghzout & Robbah',
      en: 'Ghout Perimeters, Taghzout & Robbah',
    },
    rating: 4.92,
    reviewsCount: 412,
    isFeatured: true,
  },
  {
    id: 'site-grand-erg-oriental',
    name: {
      ar: 'كثبان العرق الشرقي الكبير (سياحة المغامرات والتخييم الصحراوي)',
      fr: 'Dunes du Grand Erg Oriental (Aventure & Bivouac Saharien)',
      en: 'Great Eastern Erg Dunes (Desert Safari & Camping)',
    },
    category: 'natural',
    commune: {
      ar: 'بلدية حاسي خليفة والدبيلة',
      fr: 'Communes de Hassi Khelifa & Debila',
      en: 'Hassi Khelifa & Debila Municipalities',
    },
    coordinates: [33.2844, 7.0250],
    description: {
      ar: 'بحر شاسع من الكثبان الرملية الذهبية المتماوجة يصل ارتفاع بعضها إلى 100 متر. وجهة مثالية للتزلج على الرمال، جولات سيارات الدفع الرباعي 4x4، ركوب الجمال، والمبيت في المخيمات الصحراوية تحت قبة السماء الصافية.',
      fr: 'Une immense mer de dunes ondulantes offrant des paysages spectaculaires. Idéal pour le sandboarding, les safaris en 4x4, les méharées à dos de dromadaire et les nuits étoilées en bivouac.',
      en: 'A vast sea of golden rippling dunes rising up to 100 meters. The premier destination for sandboarding, 4x4 dune bashing, camel trekking, and unforgettable star-gazing luxury bivouacs.',
    },
    history: {
      ar: 'يعتبر العرق الشرقي الكبير من أكبر التجمعات الرملية في الصحراء الكبرى، وكان تاريخياً مسلكاً لقوافل التجارة العابرة للصحراء.',
      fr: 'Composante majeure du Sahara, l\'Erg Oriental était jadis traversé par les caravanes marchandes reliant le Maghreb au Sahel.',
      en: 'One of the grandest dune complexes in the Sahara desert, crossed for millennia by historic trans-Saharan merchant caravans.',
    },
    images: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    ],
    visitingHours: {
      ar: 'مفتوح طوال العام (يوصى بمرافقة وكالة سياحية معتمدة)',
      fr: 'Ouvert toute l\'année (Accompagnement d\'agence agréée recommandé)',
      en: 'Open Year-Round (Certified travel agency guide recommended)',
    },
    entryFee: {
      ar: 'مجاني للطبيعة (الأنشطة حسب وكالات الأسفار)',
      fr: 'Accès naturel libre (Tarifs selon prestataires)',
      en: 'Free Access (Activities booked via local operators)',
    },
    amenities: {
      ar: ['تخييم صحراوي مهيأ', 'تزلج على الرمال', 'رحلات بالجمال', 'مطاعم خيم بدوية وسهرات فنية'],
      fr: ['Bivouacs équipés', 'Sandboard', 'Randonnées chamelières', 'Soirées musicales folkloriques'],
      en: ['Bedouin Campgrounds', 'Sandboarding Equipment', 'Camel Riding', 'Saharan Music Campfires'],
    },
    address: {
      ar: 'مسلك الكثبان الكبرى، طريق حاسي خليفة، ولاية الوادي',
      fr: 'Route des Grandes Dunes, Hassi Khelifa, El Oued',
      en: 'Great Dunes Trail, Hassi Khelifa, El Oued',
    },
    rating: 4.97,
    reviewsCount: 520,
    isFeatured: true,
  },
  {
    id: 'site-chott-merouane',
    name: {
      ar: 'شط مروان – المحمية الطبيعية الرطبة (رامسار)',
      fr: 'Chott Merouane – Zone Humide Protégée (Ramsar)',
      en: 'Chott Merouane – Ramsar Wetland Reserve',
    },
    category: 'natural',
    commune: {
      ar: 'بلدية المغير / وادي سوف',
      fr: 'Bordure Nord-Ouest de la région du Souf',
      en: 'Northwestern Souf Wetland Belt',
    },
    coordinates: [33.9167, 6.1667],
    description: {
      ar: 'بحيرة ملحية عملاقة مصنفة كمحمية دولية ضمن اتفاقية رامسار للأراضي الرطبة. تستقطب في فصل الشتاء والربيع آلاف الطيور المهاجرة من بينها طيور النحام الوردي (الفلامنغو) في مشهد بيئي استثنائي بين رمال الصحراء.',
      fr: 'Immense lac salé classé site Ramsar d\'importance internationale. Il accueille en hiver et au printemps des colonies spectaculaires de flamants roses et d\'oiseaux migrateurs.',
      en: 'A colossal salt lake classified as a Ramsar Wetland of International Importance, hosting thousands of migrating greater flamingos against shimmering desert crystal beds in winter and spring.',
    },
    history: {
      ar: 'يعتبر شط مروان جزءاً من حوض شط ملغيغ التاريخي وكان مصدر استخراج الملح الطبيعي عالي النقاوة منذ القدم.',
      fr: 'Faisant partie de la dépression du Chott Melrhir, il constituait une source séculaire d\'extraction de sel gemme pur.',
      en: 'Part of the historic Chott depression, famous since antiquity for mineral-rich salt extraction and unique desert biodiversity.',
    },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    ],
    visitingHours: {
      ar: 'يومياً (أفضل مشاهدة للطيور: الصباح الباكر)',
      fr: 'Tous les jours (Observation optimale le matin)',
      en: 'Daily (Best birdwatching in early morning)',
    },
    entryFee: {
      ar: 'مجاني للعموم وهواة مراقبة الطيور',
      fr: 'Entrée libre et gratuite',
      en: 'Free Public Access',
    },
    amenities: {
      ar: ['نقاط مراقبة الطيور', 'أماكن رصد فوتوغرافي', 'مواقف سيارات طبيعية'],
      fr: ['Postes d\'observation ornithologique', 'Spots photo', 'Stationnement'],
      en: ['Bird Observation Points', 'Photography Spots', 'Nature Parking'],
    },
    address: {
      ar: 'طريق الشط الوطني، ولاية الوادي',
      fr: 'Route Nationale du Chott, Wilaya d\'El Oued',
      en: 'Chott National Road, El Oued Province',
    },
    rating: 4.85,
    reviewsCount: 178,
  },
  {
    id: 'site-souk-ghezal',
    name: {
      ar: 'سوق الغزل التاريخي وشارع الصناعات التقليدية',
      fr: 'Souk El-Ghezal & Rue de l\'Artisanat Traditionnel',
      en: 'Historic Souk El-Ghezal & Handicrafts Market',
    },
    category: 'handicrafts',
    commune: {
      ar: 'بلدية الوادي (المدينة القديمة)',
      fr: 'Commune d\'El Oued (Vieille Ville)',
      en: 'El Oued (Old Town Quarter)',
    },
    coordinates: [33.3670, 6.8530],
    description: {
      ar: 'القلب النابض للصناعة التقليدية والتجارة السوفية، حيث تجتمع حائكات الزرابي الصوفية وتجار صوف الجمال والبرانيس ومنحوتات وردة الرمال والتمور في أجواء شعبية مفعمة بالأصالة.',
      fr: 'Le cœur battant du commerce traditionnel soufi où se négocient les tapis de haute laine, les burnous, les roses des sables et les meilleures dattes fraîches.',
      en: 'The vibrant historic epicenter of Soufi craftsmanship where master weavers trade exquisite hand-knotted wool rugs, camel-wool burnouses, and natural sand rose crystals.',
    },
    history: {
      ar: 'تأسس السوق منذ أزيد من قرنين وكان محطة التقاء قوافل البدو والرحل لبيع منتجات الصوف والنسيج اليدوي الأصيل.',
      fr: 'Vieux de plus de deux siècles, il était le carrefour des nomades pour le négoce des toisons de laine et des tissages artisanaux.',
      en: 'Dating back over two centuries, this market was the traditional crossroads where nomadic pastoralists traded pure desert wool and weaves.',
    },
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    ],
    visitingHours: {
      ar: 'يومياً من 08:00 إلى 20:00 (ذروة النشاط: يومي الجمعة والسبت)',
      fr: 'Tous les jours de 08h00 à 20h00 (Affluence vendredi & samedi)',
      en: 'Daily 08:00 to 20:00 (Peak market vibe on Fridays & Saturdays)',
    },
    entryFee: {
      ar: 'دخول مجاني للتسوق والتجول',
      fr: 'Accès libre',
      en: 'Free Public Access',
    },
    amenities: {
      ar: ['دكاكين حرفيين معتمدين', 'مقاهي شاي سوفي', 'أجهزة صراف آلي قريبة', 'مرافق صحية'],
      fr: ['Boutiques d\'artisans certifiés', 'Salons de thé traditionnels', 'Distributeurs bancaires', 'Sanitaires'],
      en: ['Certified Artisan Boutiques', 'Traditional Tea Shops', 'Nearby ATMs', 'Public Facilities'],
    },
    address: {
      ar: 'ساحة السوق المركزي، حي التحرير، بلدية الوادي',
      fr: 'Place du Marché Central, Quartier El Tahrir, El Oued',
      en: 'Central Market Square, El Tahrir District, El Oued',
    },
    rating: 4.88,
    reviewsCount: 310,
    isFeatured: true,
  },
  {
    id: 'site-museum-souf',
    name: {
      ar: 'متحف وادي سوف الصحراوي (دار الثقافة)',
      fr: 'Musée Saharien d\'El Oued (Maison de la Culture)',
      en: 'El Oued Saharan Ethnographic Museum',
    },
    category: 'cultural',
    commune: {
      ar: 'بلدية الوادي',
      fr: 'Commune d\'El Oued',
      en: 'El Oued Municipality',
    },
    coordinates: [33.3725, 6.8480],
    description: {
      ar: 'صرح ثقافي يوثق تاريخ منطقة سوف وعاداتها وتقاليدها. يضم أجنحة خاصة بالحياة البدوية، أدوات حفر الغيطان، نماذج الزرابي التراثية، ومجموعة نادرة من المستحاثات والحيوانات المحنطة الخاصة بالبيئة الصحراوية.',
      fr: 'Espace muséal retraçant la vie traditionnelle du Souf, les outils ancestraux de creusement des Ghouts, les tapisseries rares et la faune saharienne.',
      en: 'Cultural repository documenting the history and heritage of Souf, featuring traditional nomadic lifestyle exhibits, ancient Ghout digging tools, rare carpets, and desert fossil collections.',
    },
    history: {
      ar: 'أنشئ ليكون مرجعاً توثيقياً لطلبة التاريخ والزوار والباحثين في التراث المادي واللامادي لمنطقة وادي سوف.',
      fr: 'Créé pour préserver et valoriser la mémoire matérielle et immatérielle du patrimoine soufi.',
      en: 'Founded to preserve and celebrate the tangible and intangible heritage of the Saharan Souf civilization.',
    },
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    ],
    visitingHours: {
      ar: 'من الأحد إلى الخميس: 09:00 - 16:30 (السبت: 10:00 - 15:00)',
      fr: 'Dimanche à jeudi: 09h00 - 16h30 (Samedi: 10h00 - 15h00)',
      en: 'Sunday to Thursday: 09:00 - 16:30 (Saturday: 10:00 - 15:00)',
    },
    entryFee: {
      ar: '50 دج للبالغين (مجاني للأطفال والطلبة)',
      fr: '50 DZD adultes (Gratuit pour enfants & étudiants)',
      en: '50 DZD (Free for students and children)',
    },
    amenities: {
      ar: ['قاعة محاضرات', 'مرشد سياحي معتمد', 'متجر هدايا تذكارية', 'ولوج مهيأ لذوي الاحتياجات'],
      fr: ['Salle de conférences', 'Guide conférencier', 'Boutique souvenirs', 'Accès personnes à mobilité réduite'],
      en: ['Auditorium', 'Museum Docent Tour', 'Souvenir Shop', 'Wheelchair Accessible'],
    },
    address: {
      ar: 'شارع محمد خميستي، محاذاة دار الثقافة محمد الأمين العمودي، الوادي',
      fr: 'Rue Mohamed Khemisti, près de la Maison de la Culture, El Oued',
      en: 'Mohamed Khemisti Street, near Cultural Center, El Oued',
    },
    rating: 4.79,
    reviewsCount: 195,
  }
];

export const INITIAL_EVENTS: TourismEvent[] = [
  {
    id: 'event-souf-desert-festival',
    title: {
      ar: 'المهرجان الدولي لسياحة الكثبان والرياضات الرملية',
      fr: 'Festival International du Tourisme Saharien & Sports de Sable',
      en: 'International Saharan Tourism & Sand Sports Festival',
    },
    type: 'international',
    category: 'festival',
    dateStart: '2026-11-15',
    dateEnd: '2026-11-20',
    location: {
      ar: 'كثبان حاسي خليفة وقمار، ولاية الوادي',
      fr: 'Grandes Dunes de Hassi Khelifa & Guemar',
      en: 'Hassi Khelifa & Guemar Great Dunes',
    },
    description: {
      ar: 'تظاهرة دولية كبرى تجمع عشاق التزلج على الرمال، سباقات الرالي بالدفع الرباعي، عروض الفانتازيا والمهاري، وسهرات فنية بدوية بمشاركة وفود من مختلف دول العالم.',
      fr: 'Rassemblement international majeur combinant sandboard, rallye 4x4, fantasia équestre, courses de méharis et concerts sahariens.',
      en: 'Premier international festival featuring dune sandboarding competitions, 4x4 desert rally, equestrian fantasia, camel races, and nightly Saharan folklore concerts.',
    },
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      ar: 'مديرية السياحة والصناعة التقليدية بالتنسيق مع ولاية الوادي',
      fr: 'Direction du Tourisme et de l\'Artisanat & Wilaya d\'El Oued',
      en: 'Directorate of Tourism in coordination with El Oued Wilaya',
    },
    isUpcoming: true,
  },
  {
    id: 'event-deglet-nour-fair',
    title: {
      ar: 'الصالون الوطني لتمور دقلة نور والصناعات التحويلية',
      fr: 'Salon National de la Datte Deglet Nour & Produits Dérivés',
      en: 'National Deglet Nour Dates & Agro-Tourism Fair',
    },
    type: 'national',
    category: 'exhibition',
    dateStart: '2026-10-25',
    dateEnd: '2026-10-29',
    location: {
      ar: 'قصر المعارض، بلدية الوادي',
      fr: 'Palais des Expositions, El Oued',
      en: 'Exhibition Center, El Oued',
    },
    description: {
      ar: 'معرض وطني يبرز تمور الغيطان السوفية ذات الشهرة العالمية مع ندوات علمية حول التنمية المستدامة للواحات وسياحة المزارع.',
      fr: 'Salon d\'envergure nationale célébrant la reine des dattes du Souf avec des rencontres B2B et des visites d\'agrotourisme dans les Ghouts.',
      en: 'National exhibition highlighting the world-famous Souf dates with business networking and educational agro-tourism tours into ancestral Ghouts.',
    },
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      ar: 'غرفة الفلاحة بالتعاون مع مديرية السياحة والتجارة',
      fr: 'Chambre de l\'Agriculture & Direction du Tourisme',
      en: 'Chamber of Agriculture & Directorate of Tourism',
    },
    isUpcoming: true,
  },
  {
    id: 'event-carpet-heritage-days',
    title: {
      ar: 'الأيام الوطنية لزربية وادي سوف والنسيج الصوفي',
      fr: 'Journées Nationales du Tapis du Souf & Tissage Traditionnel',
      en: 'National Souf Carpet & Traditional Weaving Heritage Days',
    },
    type: 'national',
    category: 'exhibition',
    dateStart: '2026-12-05',
    dateEnd: '2026-12-09',
    location: {
      ar: 'دار الصناعة التقليدية والحرف، شارع الشهداء، الوادي',
      fr: 'Maison de l\'Artisanat, Rue des Martyrs, El Oued',
      en: 'Handicrafts Center, Martyrs Avenue, El Oued',
    },
    description: {
      ar: 'احتفالية تسلط الضوء على الزربية السوفية المصنوعة من صوف الأغنام الخالص مع ورشات حية للحياكة بالمنسج التقليدي وتكريم الحرفيات المتميزات.',
      fr: 'Événement dédié au tapis artisanal soufi en pure laine avec ateliers en direct de tissage sur métier à tisser traditionnel et remises de prix.',
      en: 'Exhibition dedicated to pure sheep wool Soufi carpets, featuring live traditional loom demonstrations and awards for master women artisans.',
    },
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    organizer: {
      ar: 'غرفة الصناعة التقليدية والحرف لولاية الوادي',
      fr: 'Chambre de l\'Artisanat et des Métiers (CAM El Oued)',
      en: 'Chamber of Crafts and Trades of El Oued',
    },
    isUpcoming: true,
  }
];

export const INITIAL_ARTISANS: MasterArtisan[] = [
  {
    id: 'artisan-fatima-carpet',
    name: {
      ar: 'الحاجة فاطمة السوفية (تعاونية أصالة وادي سوف للزرابي)',
      fr: 'Hadjah Fatima Soufia (Coopérative Asala du Tapis)',
      en: 'Hadjah Fatima Soufia (Asala Souf Carpet Guild)',
    },
    craftCategory: 'carpets',
    commune: {
      ar: 'بلدية كوينين',
      fr: 'Commune de Kouinine',
      en: 'Kouinine Municipality',
    },
    address: {
      ar: 'حي النور، ورشة صناعة الزرابي والنسيج الصوفي، كوينين',
      fr: 'Quartier En-Nour, Atelier de tissage, Kouinine',
      en: 'En-Nour District, Traditional Weaving Workshop, Kouinine',
    },
    phone: '+213 661 45 88 12',
    whatsapp: '+213661458812',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: {
      ar: 'حرفية متميزة في صناعة الزربية السوفية الصوفية الأصلية لأكثر من 35 سنة، حاصلة على الميدالية الذهبية للصالون الوطني للصناعة التقليدية بالجزائر العاصمة.',
      fr: 'Maître artisane du tapis traditionnel soufi en pure laine depuis plus de 35 ans, lauréate de la médaille d\'or au Salon National d\'Alger.',
      en: 'Master weaver specializing in authentic Soufi pure wool carpets for over 35 years, recipient of the National Gold Medal for Handicrafts in Algiers.',
    },
    products: [
      {
        title: {
          ar: 'زربية سوفية ملكية بنقوش هندسية أمازيغية وعربية',
          fr: 'Tapis Royal Soufi à motifs géométriques',
          en: 'Royal Souf Hand-Knotted Wool Carpet',
        },
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: {
          ar: 'برنوس سوفي شتوي من وبر الإبل الأصيل',
          fr: 'Burnous traditionnel en poil de chameau',
          en: 'Traditional Camel Hair Winter Burnous',
        },
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      }
    ],
    isCertified: true,
    registrationNumber: 'CAM-ELO-39042',
    experienceYears: 35,
  },
  {
    id: 'artisan-ahmed-sand-rose',
    name: {
      ar: 'الأستاذ أحمد بشير (نحات وردة الرمال الصحراوية)',
      fr: 'Ahmed Bachir (Artiste Sculpteur sur Rose des Sables)',
      en: 'Ahmed Bachir (Desert Sand Rose Sculptor)',
    },
    craftCategory: 'sand_rose',
    commune: {
      ar: 'بلدية الوادي (سوق الغزل)',
      fr: 'Commune d\'El Oued (Souk El-Ghezal)',
      en: 'El Oued (Souk El-Ghezal)',
    },
    address: {
      ar: 'شارع الشهداء، جناح وردة الرمال والتحف المعدنية',
      fr: 'Rue des Martyrs, Stand des Roses des Sables, El Oued',
      en: 'Martyrs Street, Desert Crystal Gallery, El Oued',
    },
    phone: '+213 550 78 91 30',
    whatsapp: '+213550789130',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: {
      ar: 'فنان تشكيلي وحرفي متخصص في استخراج وصقل بلورات وردة الرمال الطبيعية النادرة ودمجها مع الإضاءة العصرية وخشب النخيل.',
      fr: 'Artiste passionné par la mise en valeur des roses des sables naturelles du Souf, créateur de luminaires et sculptures architecturales.',
      en: 'Renowned artisan specializing in harvesting and hand-polishing natural Gypsum sand rose formations into illuminated architectural artworks.',
    },
    products: [
      {
        title: {
          ar: 'تحفة وردة الرمال الطبيعية الكبرى بإضاءة ليلية',
          fr: 'Sculpture géante en Rose des Sables rétro-éclairée',
          en: 'Illuminated Grand Desert Sand Rose Cluster',
        },
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      }
    ],
    isCertified: true,
    registrationNumber: 'CAM-ELO-39118',
    experienceYears: 22,
  },
  {
    id: 'artisan-mokhtar-palm-wood',
    name: {
      ar: 'المعلم المختار حركات (نجارة وأثاث خشب النخيل والجريد)',
      fr: 'Mokhtar Harakat (Ébénisterie en Bois de Palmier)',
      en: 'Mokhtar Harakat (Date Palm Wood Craft & Furniture)',
    },
    craftCategory: 'palm_wood',
    commune: {
      ar: 'بلدية قمار',
      fr: 'Commune de Guemar',
      en: 'Guemar Municipality',
    },
    address: {
      ar: 'المنطقة الحرفية، طريق الوادي قمار',
      fr: 'Zone Artisanale, Route d\'El Oued, Guemar',
      en: 'Crafts Zone, El Oued Road, Guemar',
    },
    phone: '+213 771 99 24 15',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: {
      ar: 'رائد في تحويل جذوع النخيل السوفية وجريدها إلى صالونات ومقاعد وطاولات بيئية فاخرة تعكس الطابع الصحراوي الأصيل للفنادق والمنتجعات.',
      fr: 'Pionnier du mobilier éco-responsable conçu à partir de troncs et palmes de dattiers pour les complexes touristiques sahariens.',
      en: 'Pioneer in eco-friendly handcrafted furniture using seasoned date palm trunks and fronds, crafted for boutique desert lodges and resorts.',
    },
    products: [
      {
        title: {
          ar: 'طاقم صالون صحراوي كامل من خشب وجريد النخيل',
          fr: 'Salon saharien complet en bois de palmier',
          en: 'Handcrafted Saharan Date Palm Lounge Set',
        },
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      }
    ],
    isCertified: true,
    registrationNumber: 'CAM-ELO-39205',
    experienceYears: 28,
  }
];

export const INITIAL_INVESTMENTS: InvestmentOpportunity[] = [
  {
    id: 'invest-ecolodge-dunes',
    title: {
      ar: 'مشروع إنجاز منتجع بيئي سياحي وصحراوي (ZET قمار)',
      fr: 'Projet d\'Éco-Lodge Saharien Haut Standing (ZET Guemar)',
      en: 'Luxury Saharan Eco-Lodge & Glamping Resort (ZET Guemar)',
    },
    category: 'ecolodge',
    location: {
      ar: 'منطقة التوسع السياحي بقمار (ZET Guemar)، ولاية الوادي',
      fr: 'Zone d\'Expansion Touristique de Guemar, El Oued',
      en: 'Guemar Tourism Expansion Zone (ZET), El Oued',
    },
    areaHectares: 12.5,
    zetZoneName: {
      ar: 'منطقة التوسع السياحي قمار (مهيأة ومربوطة بالشبكات)',
      fr: 'ZET de Guemar (Viabilisée et raccordée)',
      en: 'Guemar ZET (Serviced with roads, water, and power)',
    },
    estimatedCostDZD: '850,000,000 دج (~5.8 مليون يورو)',
    status: 'available',
    description: {
      ar: 'فرصة استثمارية واعدة لإنجاز مخيم بيئي فندقي فاخر بطاقة استيعاب 120 سريراً على شكل قباب سوفية تقليدية مع مسابح صحراوية، مركز علاج بمياه الاسترخاء، ونادٍ للرياضات الرملية.',
      fr: 'Opportunité d\'investissement pour un complexe hôtelier écologique de 120 lits intégrant architecture en coupoles, piscines oasis, spa thermal et club de sports de dunes.',
      en: 'High-potential investment project for a 120-bed eco-friendly luxury resort featuring traditional Souf dome architecture, desert oasis pools, and a sand sports club.',
    },
    advantages: {
      ar: [
        'إعفاء تام من الضريبة على أرباح الشركات (IBS) لمدة 10 سنوات وفق قانون الاستثمار AAPI',
        'عقار سياحي مهيأ وموصول بشبكات الكهرباء والغاز والمياه وطريق وطني سريع',
        'قرب الموقع من مطار قمار الدولي (12 دقيقة فقط)',
        'طلب سياحي دولي ووطني متزايد على سياحة المغامرات والتخييم الفاخر'
      ],
      fr: [
        'Exonération totale de l\'IBS pendant 10 ans selon le cadre incitatif AAPI',
        'Foncier touristique viabilisé et connecté aux réseaux d\'énergie et voirie',
        'Proximité immédiate de l\'Aéroport International de Guemar (12 min)',
        'Forte demande nationale et internationale pour le glamping et l\'aventure saharienne'
      ],
      en: [
        '100% corporate tax exemption for 10 years under the Algerian AAPI Investment Law',
        'Fully serviced tourism land with direct access to national highway and utilities',
        'Immediate proximity to Guemar International Airport (12 minutes)',
        'Booming international and domestic demand for desert glamping and wellness'
      ]
    },
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    pdfTitle: 'Dossier_Technique_ZET_Guemar_EcoLodge_2026.pdf',
  },
  {
    id: 'invest-wellness-chott',
    title: {
      ar: 'مركز المعالجة بمياه الشط والاسترخاء البيئي (ZET شط مروان)',
      fr: 'Centre de Thalasso Saharienne & Bien-être (ZET Chott Merouane)',
      en: 'Saharan Salt-Lake Thalasso & Wellness Spa (ZET Chott)',
    },
    category: 'wellness_spa',
    location: {
      ar: 'منطقة التوسع السياحي الشط، ولاية الوادي',
      fr: 'Zone d\'Expansion Touristique du Chott, El Oued',
      en: 'Chott Tourism Expansion Zone, El Oued',
    },
    areaHectares: 8.0,
    zetZoneName: {
      ar: 'منطقة التوسع السياحي لشط مروان',
      fr: 'ZET de Chott Merouane',
      en: 'Chott Merouane ZET Zone',
    },
    estimatedCostDZD: '620,000,000 دج (~4.2 مليون يورو)',
    status: 'available',
    description: {
      ar: 'مشروع استشفائي وسياحي يستغل الخصائص المعدنية الفريدة لملح شط مروان والرمال الساخنة (العلاج بالرمل / الريدمانتير) لجذب السياح الباحثين عن الراحة والعلاج الطبيعي.',
      fr: 'Projet novateur de tourisme médical et de bien-être exploitant les vertus minérales des sels du Chott et les arénothérapies traditionnelles (bains de sable chaud).',
      en: 'Innovative medical and wellness tourism project capitalizing on high-mineral desert salts and traditional heated sand therapies (psammotherapy).',
    },
    advantages: {
      ar: [
        'موقع استراتيجي مطل مباشرة على بحيرة شط مروان ومحمية الطيور المهاجرة',
        'تسهيلات بنكية تفضيلية لدعم السياحة العلاجية والاستشفائية',
        'تسهيل استيراد التجهيزات الطبية والسبا بتخفيض جمركي كامل'
      ],
      fr: [
        'Emplacement panoramique face au Chott et à la réserve ornithologique',
        'Facilités bancaires bonifiées pour le tourisme de santé et bien-être',
        'Franchise douanière totale sur l\'importation des équipements spécialisés'
      ],
      en: [
        'Scenic vantage location facing Chott Merouane nature reserve',
        'Subsidized loan facilities for medical & wellness hospitality',
        'Customs-duty free import regime for certified wellness & spa machinery'
      ]
    },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    pdfTitle: 'Dossier_Technique_ZET_Chott_Spa_2026.pdf',
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-minister-visit',
    title: {
      ar: 'وزارة السياحة تعلن عن تدابير تحفيزية جديدة لتشجيع الإيواء لدى الساكن وتأهيل الحرفيين بوادي سوف',
      fr: 'Nouvelles mesures d\'incitation pour l\'hébergement chez l\'habitant et le soutien aux artisans du Souf',
      en: 'Ministry announces new incentive measures for homestays and artisan support in El Oued',
    },
    excerpt: {
      ar: 'في إطار ترقية السياحة الصحراوية، أطلقت المديرية دليلاً مبسطاً لمنح تراخيص الإيواء لدى الساكن وتسهيل قروض مصغرة للحرفيات.',
      fr: 'La Direction du Tourisme lance un guide simplifié pour l\'octroi des autorisations d\'hébergement chez l\'habitant et des micro-crédits artisanaux.',
      en: 'The Directorate launches a streamlined regulatory framework for certified desert homestays and micro-credits for traditional weavers.',
    },
    content: {
      ar: 'أكدت مديرية السياحة والصناعة التقليدية لولاية الوادي مواصلة جهودها في تعزيز البنية التحتية واستقطاب الاستثمارات ذات القيمة المضافة العالية، مع التركيز على صيغ الإيواء السياحي الأصيل والترويج الدولي لمدينة الألف قبة.',
      fr: 'La Direction réaffirme sa détermination à accompagner les porteurs de projets dans le cadre du plan de relance du tourisme saharien 2026-2030.',
      en: 'The Directorate reaffirmed its dedication to supporting private investors under the Saharan Tourism Master Plan 2026-2030.',
    },
    date: '2026-08-18',
    category: 'ministerial',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    isImportant: true,
  },
  {
    id: 'news-circuit-validation',
    title: {
      ar: 'اعتماد 5 مسارات سياحية جديدة تشمل الغيطان التاريخية وقصور وادي سوف العتيقة',
      fr: 'Homologation de 5 nouveaux circuits touristiques à travers les Ghouts et Ksours historiques',
      en: 'Approval of 5 new tourist circuits exploring historic Ghouts and ancient Souf Ksours',
    },
    excerpt: {
      ar: 'صادقت اللجنة الولائية لتطوير السياحة على خمسة مسارات مجهزة بلوحات إرشادية وتغطية أمنية وخدمات إرشاد معتمدة.',
      fr: 'La commission de wilaya valide de nouveaux itinéraires dotés d\'une signalétique moderne et d\'un encadrement par des guides agréés.',
      en: 'The Wilaya Tourism Commission has ratified 5 official circuits equipped with directional signage and certified guide services.',
    },
    content: {
      ar: 'تشمل المسارات المعتمدة: مسار القباب البيضاء بوسط المدينة، مسار غيطان النخيل بقمار وتغزوت، مسار الزوايا والمخطوطات، مسار الكثبان العظمى بالعرق الشرقي، ومسار التراث المائي والملحي بشط مروان.',
      fr: 'Les circuits incluent la Route des Coupoles, la Route des Ghouts, le Circuit Spirituel des Zaouïas, l\'Aventure du Grand Erg et la Route du Sel.',
      en: 'The approved circuits include the Thousand Domes Trail, the Palm Ghouts Trail, the Spiritual Zaouias Circuit, the Great Erg Safari, and the Salt Lake Heritage Trail.',
    },
    date: '2026-08-10',
    category: 'regional',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
  }
];

export const INITIAL_REQUESTS: DigitalRequest[] = [
  {
    id: 'req-01',
    trackingNumber: 'ELO-2026-8491',
    serviceType: 'complaint',
    fullName: 'يوسف بن علي القماري',
    nationalIdOrPassport: '109384729103',
    email: 'youcef.guemari@gmail.com',
    phone: '+213 661 22 33 44',
    subject: 'شكوى بخصوص لوحات التوجيه السياحي المؤدية لغيطان تغزوت',
    details: 'نحيطكم علماً بوجود تلف في اللوحة الإرشادية عند المدخل الشمالي لبلدية تغزوت المؤدية إلى الغيطان التراثية، نرجو صيانتها قبل انطلاق الموسم السياحي.',
    status: 'in_progress',
    createdAt: '2026-08-20T10:30:00Z',
    updatedAt: '2026-08-22T14:15:00Z',
    departmentAssigned: 'مصلحة التهيئة والمواقع السياحية',
    adminResponse: 'تمت إحالة الطلب إلى الفرقة التقنية التابعة للمديرية وسيتم تثبيت لوحة إرشادية جديدة ثنائية اللغة خلال الأسبوع الجاري.',
  },
  {
    id: 'req-02',
    trackingNumber: 'ELO-2026-9120',
    serviceType: 'hotel_classification',
    fullName: 'مجمع قباب الرمال الفندقي',
    nationalIdOrPassport: '001928374615',
    email: 'direction@resort-dunes-eloued.dz',
    phone: '+213 550 11 99 88',
    subject: 'طلب تصنيف وتجديد رخصة فندق 4 نجوم',
    details: 'إيداع الملف التقني ورخص الاستغلال ومخططات السلامة لإجراء المعاينة الميدانية من قبل لجنة التصنيف الولائية.',
    status: 'under_review',
    createdAt: '2026-08-22T09:00:00Z',
    departmentAssigned: 'مصلحة الأنشطة السياحية والفندقة',
    adminResponse: 'تم استلام الملف وجاري دراسة مطابقة المعايير الفندقية لتحديد موعد الزيارة الميدانية للجنة.',
  }
];
