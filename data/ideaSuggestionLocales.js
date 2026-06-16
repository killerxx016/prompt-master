import { IDEA_SUGGESTIONS } from './ideaSuggestions.js';
import FULL_AI_TRANSLATIONS from './fullIdeaTranslations.json';

const SECTION_TRANSLATIONS = {
  tr: { Images: 'Görseller', Video: 'Video', 'Social Media': 'Sosyal Medya', Music: 'Müzik', Programming: 'Programlama', Writing: 'Yazı', Marketing: 'Pazarlama' },
  ar: { Images: 'الصور', Video: 'الفيديو', 'Social Media': 'وسائل التواصل الاجتماعي', Music: 'الموسيقى', Programming: 'البرمجة', Writing: 'الكتابة', Marketing: 'التسويق' },
};

const TYPE_TRANSLATIONS = {
  tr: {
    'Image Improvement': 'Görsel İyileştirme', 'Anime world': 'Anime Dünyası', 'Cartoon style': 'Çizgi Film Stili', 'Better lighting': 'Işık İyileştirme', 'Cinematic image': 'Sinematik Görsel', 'Professional personal photo': 'Profesyonel Kişisel Fotoğraf', 'Product photo': 'Ürün Fotoğrafı', 'Background change': 'Arka Plan Değişimi', 'Character style': 'Karakter Stili', 'Modern photo edits': 'Modern Fotoğraf Düzenleme',
    'Short video script': 'Kısa Video Senaryosu', 'YouTube outline': 'YouTube Taslağı', Storyboard: 'Storyboard', 'Product ad': 'Ürün Reklamı', Captions: 'Açıklamalar', 'B-roll ideas': 'B-roll Fikirleri', 'Podcast clips': 'Podcast Klipleri',
    'Instagram carousel': 'Instagram Carousel', 'LinkedIn post': 'LinkedIn Gönderisi', 'TikTok hooks': 'TikTok Hookları', 'Content calendar': 'İçerik Takvimi', 'Profile bio': 'Profil Biyografisi', 'Comment replies': 'Yorum Yanıtları',
    Lyrics: 'Şarkı Sözleri', 'Beat idea': 'Beat Fikri', 'AI song prompt': 'Yapay Zeka Şarkı Fikri', Jingle: 'Jingle', Playlist: 'Çalma Listesi',
    Debugging: 'Hata Ayıklama', 'Feature plan': 'Özellik Planı', 'Code review': 'Kod İncelemesi', Refactoring: 'Refactor', 'API design': 'API Tasarımı', Testing: 'Test', 'UI component': 'UI Bileşeni',
    'Blog outline': 'Blog Taslağı', Email: 'E-posta', 'Story scene': 'Hikaye Sahnesi', Summary: 'Özet', 'Tone rewrite': 'Ton Yeniden Yazımı', Resume: 'Özgeçmiş', Presentation: 'Sunum',
    'Customer persona': 'Müşteri Personası', 'Landing page': 'Landing Page', 'Ad copy': 'Reklam Metni', 'Email sequence': 'E-posta Serisi', 'Brand voice': 'Marka Sesi', 'Competitor analysis': 'Rakip Analizi', 'Launch plan': 'Lansman Planı', 'Offer creation': 'Teklif Oluşturma',
  },
  ar: {
    'Image Improvement': 'تحسين الصورة', 'Anime world': 'تحويل الصورة إلى عالم أنمي', 'Cartoon style': 'تحويل الصورة إلى أسلوب كرتوني', 'Better lighting': 'تحسين إضاءة الصورة', 'Cinematic image': 'تحويل الصورة إلى لقطة سينمائية', 'Professional personal photo': 'صورة شخصية احترافية', 'Product photo': 'صورة منتج احترافية', 'Background change': 'تغيير خلفية الصورة', 'Character style': 'تصميم شخصية متناسقة', 'Modern photo edits': 'تعديل صورة بأسلوب عصري',
    'Short video script': 'سيناريو فيديو قصير', 'YouTube outline': 'مخطط فيديو يوتيوب', Storyboard: 'لوحة مشاهد للفيديو', 'Product ad': 'فيديو إعلاني للمنتج', Captions: 'تعليقات الفيديو', 'B-roll ideas': 'أفكار لقطات داعمة', 'Podcast clips': 'اختيار مقاطع بودكاست',
    'Instagram carousel': 'كاروسيل إنستغرام', 'LinkedIn post': 'منشور لينكدإن', 'TikTok hooks': 'افتتاحيات تيك توك', 'Content calendar': 'تقويم محتوى', 'Profile bio': 'نبذة الملف الشخصي', 'Comment replies': 'ردود التعليقات',
    Lyrics: 'كلمات أغنية', 'Beat idea': 'فكرة إيقاع موسيقي', 'AI song prompt': 'فكرة أغنية بالذكاء الاصطناعي', Jingle: 'لحن إعلاني قصير', Playlist: 'استراتيجية قائمة تشغيل',
    Debugging: 'مساعد إصلاح الأخطاء البرمجية', 'Feature plan': 'خطة بناء ميزة برمجية', 'Code review': 'مراجعة كود', Refactoring: 'تحسين بنية الكود', 'API design': 'تصميم واجهة برمجة تطبيقات', Testing: 'خطة اختبارات', 'UI component': 'مواصفات مكوّن واجهة',
    'Blog outline': 'مخطط مقال متوافق مع محركات البحث', Email: 'إعادة صياغة بريد إلكتروني', 'Story scene': 'بناء مشهد قصصي', Summary: 'تلخيص ذكي', 'Tone rewrite': 'إعادة صياغة النبرة', Resume: 'تحسين نقاط السيرة الذاتية', Presentation: 'نص عرض تقديمي',
    'Customer persona': 'شخصية العميل', 'Landing page': 'نص صفحة هبوط', 'Ad copy': 'نسخ إعلانية', 'Email sequence': 'سلسلة رسائل بريدية', 'Brand voice': 'دليل صوت العلامة التجارية', 'Competitor analysis': 'تحليل المنافسين', 'Launch plan': 'خطة إطلاق منتج', 'Offer creation': 'تحسين العرض التسويقي',
  },
};

const NEW_TYPE_TRANSLATIONS = {
  tr: {
    'Ad Creative': 'Reklam Kreatifi', 'Background Change': 'Arka Plan Değişimi', 'Brand Identity': 'Marka Kimliği', 'Cinematic Portrait': 'Sinematik Portre', 'Design Critique': 'Tasarım Eleştirisi', 'Design System': 'Tasarım Sistemi', 'Event Visual': 'Etkinlik Görseli', Infographic: 'İnfografik', 'Logo Concepts': 'Logo Konseptleri', 'Mobile App UI': 'Mobil Uygulama Arayüzü', Moodboard: 'Moodboard', 'Packaging Mockup': 'Ambalaj Mockupı', 'Photo Enhancement': 'Fotoğraf İyileştirme', 'Poster Design': 'Poster Tasarımı', 'Presentation Deck': 'Sunum Destesi', 'Product Photo': 'Ürün Fotoğrafı', 'Professional Headshot': 'Profesyonel Portre', 'Restaurant Food Photo': 'Restoran Yemek Fotoğrafı', 'Social Poster': 'Sosyal Poster', 'UI Landing Page': 'Arayüz Landing Page',
    'B-roll Shot List': 'B-roll Çekim Listesi', 'Before After Video': 'Önce-Sonra Videosu', 'Content Repurpose': 'İçeriği Yeniden Kullanma', 'Instagram Reel Script': 'Instagram Reel Senaryosu', 'Product Demo Video': 'Ürün Demo Videosu', 'Talking Head Script': 'Kamera Karşısı Konuşma Senaryosu', 'TikTok Hook Pack': 'TikTok Hook Paketi', 'Trend Adaptation': 'Trend Uyarlaması', 'Video Ad Script': 'Video Reklam Senaryosu', 'YouTube Shorts Idea': 'YouTube Shorts Fikri',
    'Favorite Prompts': 'Favori Promptlar', 'Filter System': 'Filtre Sistemi', 'Import Export': 'İçe/Dışa Aktarma', 'Multilingual Labels': 'Çok Dilli Etiketler', 'Project Workspace': 'Proje Çalışma Alanı', 'Prompt Card UI': 'Prompt Kartı Arayüzü', 'Prompt Library Data Schema': 'Prompt Kütüphanesi Veri Şeması', 'Prompt Quality Score': 'Prompt Kalite Puanı', 'Search UX': 'Arama Deneyimi', 'Usage Analytics': 'Kullanım Analitiği',
    'About Me Page': 'Hakkımda Sayfası', 'Audience Impression': 'Kitle İzlenimi', 'Avatar Prompt': 'Avatar Fikri', 'Brand Archetype': 'Marka Arketipi', 'Brand Guess': 'Marka Tahmini', 'Carousel Strategy': 'Carousel Stratejisi', 'Case Study': 'Vaka Çalışması', 'Character Branding': 'Karakter Markalaması', 'Character Interpretation': 'Karakter Yorumu', 'Collage Prompt': 'Kolaj Fikri', 'Color Personality': 'Renk Kişiliği', 'Comment Strategy': 'Yorum Stratejisi', 'Communication Vibe': 'İletişim Hissi', 'Company Page': 'Şirket Sayfası', 'Creative Caption': 'Yaratıcı Açıklama', 'Creator Identity': 'Üretici Kimliği', 'Creator Self-Analysis': 'Üretici Öz Analizi', 'Cross-Platform Identity': 'Çapraz Platform Kimliği', 'Custom Doll Trend': 'Özel Figür Trendi', 'Detailed Description': 'Ayrıntılı Açıklama', 'Expression Analysis': 'İfade Analizi', 'Founder Persona': 'Kurucu Personası', 'Founder Story': 'Kurucu Hikayesi', 'Future Self Trend': 'Gelecekteki Ben Trendi', 'Hiring Post': 'İşe Alım Gönderisi', 'Honest Review': 'Dürüst İnceleme', 'Instagram Bio': 'Instagram Biyografisi', 'Lead Magnet': 'Lead Magnet', 'LinkedIn Bio': 'LinkedIn Biyografisi', 'LinkedIn Content': 'LinkedIn İçeriği', 'LinkedIn Personality': 'LinkedIn Kişiliği', 'LinkedIn Photo': 'LinkedIn Fotoğrafı', 'Luxury Persona': 'Lüks Persona', 'Magazine Cover': 'Dergi Kapağı', 'Main Character Trend': 'Ana Karakter Trendi', 'Metaphorical City': 'Metaforik Şehir', 'Metaphorical Room': 'Metaforik Oda', Newsletter: 'Bülten', 'Personal Brand': 'Kişisel Marka', 'Personal Manifesto': 'Kişisel Manifesto', 'Personality Vibe Read': 'Kişilik Hissi Analizi', 'Photo Feedback': 'Fotoğraf Geri Bildirimi', 'Playlist Cover': 'Çalma Listesi Kapağı', 'Profile Audit': 'Profil Denetimi', Rebrand: 'Yeniden Markalama', 'Self-Reflection': 'Öz Yansıtma', 'Social Bio': 'Sosyal Biyografi', 'Streetwear Persona': 'Streetwear Personası', 'Style Identity': 'Stil Kimliği', 'Symbolic Portrait': 'Sembolik Portre', 'Thought Leadership': 'Düşünce Liderliği', 'TikTok Profile': 'TikTok Profili', 'Vibe Check': 'Vibe Kontrolü', 'Visual Aura': 'Görsel Aura', 'Website Branding': 'Web Sitesi Markalaması',
    'AI Agent Workflow': 'AI Ajan İş Akışı', 'Business Idea Validator': 'İş Fikri Doğrulama', 'Campaign Plan': 'Kampanya Planı', 'Client Proposal': 'Müşteri Teklifi', 'Competitor Angle': 'Rakip Açısı', 'Course Outline': 'Kurs Taslağı', 'Customer Support Replies': 'Müşteri Destek Yanıtları', 'Notion Workspace': 'Notion Çalışma Alanı', 'Offer Positioning': 'Teklif Konumlandırması', 'Pricing Page Audit': 'Fiyatlandırma Sayfası Denetimi', 'Productivity System': 'Verimlilik Sistemi', 'Research Summary': 'Araştırma Özeti', 'SEO Topic Cluster': 'SEO Konu Kümesi', 'UGC Brief': 'UGC Briefi',
    'Ad Copy': 'Reklam Metni', 'Brand Voice': 'Marka Sesi', 'Content Calendar': 'İçerik Takvimi', 'Customer Persona': 'Müşteri Personası', 'Email Sequence': 'E-posta Serisi', 'Landing Page Copy': 'Landing Page Metni',
  },
  ar: {
    'Ad Creative': 'تصميم إعلاني', 'Background Change': 'تغيير الخلفية', 'Brand Identity': 'هوية العلامة التجارية', 'Cinematic Portrait': 'بورتريه سينمائي', 'Design Critique': 'مراجعة التصميم', 'Design System': 'نظام تصميم', 'Event Visual': 'تصميم فعالية', Infographic: 'إنفوجرافيك', 'Logo Concepts': 'أفكار شعار', 'Mobile App UI': 'واجهة تطبيق جوال', Moodboard: 'لوحة مزاجية', 'Packaging Mockup': 'نموذج تغليف', 'Photo Enhancement': 'تحسين الصورة', 'Poster Design': 'تصميم ملصق', 'Presentation Deck': 'عرض تقديمي', 'Product Photo': 'صورة منتج', 'Professional Headshot': 'صورة شخصية احترافية', 'Restaurant Food Photo': 'تصوير طعام مطعم', 'Social Poster': 'ملصق اجتماعي', 'UI Landing Page': 'واجهة صفحة هبوط',
    'B-roll Shot List': 'قائمة لقطات داعمة', 'Before After Video': 'فيديو قبل وبعد', 'Content Repurpose': 'إعادة توظيف المحتوى', 'Instagram Reel Script': 'سيناريو ريلز إنستغرام', 'Product Demo Video': 'فيديو عرض المنتج', 'Talking Head Script': 'سيناريو حديث مباشر', 'TikTok Hook Pack': 'حزمة افتتاحيات تيك توك', 'Trend Adaptation': 'تكييف الترند', 'Video Ad Script': 'سيناريو إعلان فيديو', 'YouTube Shorts Idea': 'فكرة يوتيوب شورتس',
    'Favorite Prompts': 'المفضلة', 'Filter System': 'نظام التصفية', 'Import Export': 'الاستيراد والتصدير', 'Multilingual Labels': 'تسميات متعددة اللغات', 'Project Workspace': 'مساحة عمل المشروع', 'Prompt Card UI': 'واجهة بطاقة النص', 'Prompt Library Data Schema': 'بنية بيانات المكتبة', 'Prompt Quality Score': 'درجة جودة النص', 'Search UX': 'تجربة البحث', 'Usage Analytics': 'تحليلات الاستخدام',
    'About Me Page': 'صفحة نبذة عني', 'Audience Impression': 'انطباع الجمهور', 'Avatar Prompt': 'وصف أفاتار', 'Brand Archetype': 'نمط العلامة', 'Brand Guess': 'تخيل العلامة', Captions: 'تعليقات', 'Carousel Strategy': 'استراتيجية كاروسيل', 'Case Study': 'دراسة حالة', 'Character Branding': 'هوية شخصية', 'Character Interpretation': 'تفسير الشخصية', 'Collage Prompt': 'تصميم كولاج', 'Color Personality': 'شخصية الألوان', 'Comment Strategy': 'استراتيجية التعليقات', 'Communication Vibe': 'طابع التواصل', 'Company Page': 'صفحة الشركة', 'Creative Caption': 'تعليق إبداعي', 'Creator Identity': 'هوية صانع المحتوى', 'Creator Self-Analysis': 'تحليل صانع المحتوى', 'Cross-Platform Identity': 'هوية متعددة المنصات', 'Custom Doll Trend': 'تصميم دمية مخصصة', 'Detailed Description': 'وصف تفصيلي', 'Expression Analysis': 'تحليل التعبير', 'Founder Persona': 'شخصية المؤسس', 'Founder Story': 'قصة المؤسس', 'Future Self Trend': 'الذات المستقبلية', 'Hiring Post': 'منشور توظيف', 'Honest Review': 'مراجعة صادقة', 'Instagram Bio': 'نبذة إنستغرام', 'Lead Magnet': 'مغناطيس عملاء', 'LinkedIn Bio': 'نبذة لينكدإن', 'LinkedIn Content': 'محتوى لينكدإن', 'LinkedIn Personality': 'شخصية لينكدإن', 'LinkedIn Photo': 'صورة لينكدإن', 'Luxury Persona': 'هوية فاخرة', 'Magazine Cover': 'غلاف مجلة', 'Main Character Trend': 'طاقة الشخصية الرئيسية', 'Metaphorical City': 'مدينة مجازية', 'Metaphorical Room': 'غرفة مجازية', Newsletter: 'نشرة بريدية', 'Personal Brand': 'علامة شخصية', 'Personal Manifesto': 'بيان شخصي', 'Personality Vibe Read': 'قراءة طابع الشخصية', 'Photo Feedback': 'ملاحظات على الصورة', 'Playlist Cover': 'غلاف قائمة تشغيل', 'Profile Audit': 'تدقيق الملف الشخصي', Rebrand: 'إعادة بناء العلامة', 'Self-Reflection': 'أسئلة تأمل ذاتي', 'Social Bio': 'نبذة اجتماعية', 'Streetwear Persona': 'هوية ستريتوير', 'Style Identity': 'هوية الأسلوب', 'Symbolic Portrait': 'بورتريه رمزي', 'Thought Leadership': 'قيادة فكرية', 'TikTok Profile': 'ملف تيك توك', 'Vibe Check': 'فحص الطابع', 'Visual Aura': 'هالة بصرية', 'Website Branding': 'هوية موقع شخصي',
    'AI Agent Workflow': 'سير عمل وكيل ذكاء اصطناعي', 'Business Idea Validator': 'تقييم فكرة عمل', 'Campaign Plan': 'خطة حملة', 'Client Proposal': 'عرض للعميل', 'Competitor Angle': 'زاوية منافس', 'Content Calendar': 'تقويم محتوى', 'Course Outline': 'مخطط دورة', 'Customer Persona': 'شخصية العميل', 'Customer Support Replies': 'ردود دعم العملاء', 'Email Sequence': 'سلسلة بريدية', 'Landing Page Copy': 'نص صفحة هبوط', 'Notion Workspace': 'مساحة عمل نوتشن', 'Offer Positioning': 'تموضع العرض', 'Pricing Page Audit': 'تدقيق صفحة التسعير', 'Productivity System': 'نظام إنتاجية', 'Research Summary': 'ملخص بحث', 'SEO Topic Cluster': 'مجموعة موضوعات لمحركات البحث', 'UGC Brief': 'موجز محتوى المستخدمين', 'Ad Copy': 'نص إعلاني', 'Brand Voice': 'صوت العلامة التجارية',
  },
};

const STYLE_TRANSLATIONS = {
  tr: { 'bright social-media look': 'parlak sosyal medya görünümü', 'clean studio lighting': 'temiz stüdyo ışığı', 'editorial magazine style': 'editorial dergi stili', 'high-contrast hero image': 'yüksek kontrastlı hero görsel', 'minimal luxury style': 'minimal lüks stil', 'modern tech aesthetic': 'modern teknoloji estetiği', 'premium dark background': 'premium koyu arka plan', 'realistic e-commerce style': 'gerçekçi e-ticaret stili', 'soft natural daylight': 'yumuşak doğal gün ışığı', 'warm cinematic lighting': 'sıcak sinematik ışık' },
  ar: { 'bright social-media look': 'مظهر اجتماعي مشرق', 'clean studio lighting': 'إضاءة استوديو نظيفة', 'editorial magazine style': 'أسلوب مجلة تحريري', 'high-contrast hero image': 'صورة بارزة عالية التباين', 'minimal luxury style': 'الفخامة البسيطة', 'modern tech aesthetic': 'جمالية تقنية عصرية', 'premium dark background': 'خلفية داكنة فاخرة', 'realistic e-commerce style': 'أسلوب تجارة إلكترونية واقعي', 'soft natural daylight': 'ضوء نهاري طبيعي ناعم', 'warm cinematic lighting': 'إضاءة سينمائية دافئة' },
};

const AUDIENCE_TRANSLATIONS = {
  tr: { 'startup founders': 'startup kurucuları', marketers: 'pazarlamacılar', designers: 'tasarımcılar', freelancers: 'freelancerlar', 'local business owners': 'yerel işletme sahipleri', 'university students': 'üniversite öğrencileri', 'B2B SaaS teams': 'B2B SaaS ekipleri', 'e-commerce founders': 'e-ticaret kurucuları', 'career switchers': 'kariyer değiştirenler', 'agency owners': 'ajans sahipleri' },
  ar: { 'startup founders': 'مؤسسي الشركات الناشئة', marketers: 'المسوقين', designers: 'المصممين', freelancers: 'المستقلين', 'local business owners': 'أصحاب الأعمال المحلية', 'university students': 'طلاب الجامعات', 'B2B SaaS teams': 'فرق البرمجيات الخدمية للشركات', 'e-commerce founders': 'مؤسسي المتاجر الإلكترونية', 'career switchers': 'من يغيّرون مسارهم المهني', 'agency owners': 'أصحاب الوكالات' },
};

function typeLabel(type, language) {
  return TYPE_TRANSLATIONS[language]?.[type] || NEW_TYPE_TRANSLATIONS[language]?.[type] || (language === 'ar' ? 'فكرة جاهزة' : 'Hazır Fikir');
}

function cleanAudience(value, language) {
  return AUDIENCE_TRANSLATIONS[language]?.[value] || (language === 'ar' ? 'الجمهور المحدد' : 'belirlenen hedef kitle');
}

const TITLE_TRANSLATIONS = {
  ar: {
    'Image Prompt': 'مطالبة صورة',
    'Video Prompt': 'مطالبة فيديو',
    'Marketing Prompt': 'مطالبة تسويق',
    in: 'بأسلوب',
    for: 'لـ',
  },
  tr: {
    'Image Prompt': 'Görsel Promptu',
    'Video Prompt': 'Video Promptu',
    'Marketing Prompt': 'Pazarlama Promptu',
    in: 'stili',
    for: 'için',
  },
};

const TERM_TRANSLATIONS = {
  ar: {
    a: '', an: '', the: '', and: 'و', or: 'أو', for: 'لـ', to: 'إلى', of: 'من', in: 'في', on: 'على', with: 'مع', as: 'كـ', into: 'إلى', from: 'من', this: 'هذا', that: 'ذلك', it: 'ذلك', each: 'كل', only: 'فقط', not: 'لا', my: 'خاصتي', me: 'لي', what: 'ما', before: 'قبل', after: 'بعد', based: 'بناءً على', about: 'حول', at: 'عند', real: 'حقيقي', make: 'اجعل', create: 'أنشئ', write: 'اكتب', analyze: 'حلّل', include: 'ضمّن', keep: 'حافظ', avoid: 'تجنب', do: 'افعل', act: 'تصرّف', give: 'امنح', turn: 'حوّل', apply: 'طبّق', replace: 'استبدل', improve: 'حسّن', preserve: 'حافظ', preserving: 'مع الحفاظ على', copying: 'نسخ', usable: 'قابل للاستخدام', uploaded: 'المرفوع',
    image: 'صورة', images: 'صور', improvement: 'تحسين', enhancement: 'تحسين', enhance: 'حسّن', anime: 'أنمي', world: 'عالم', transformation: 'تحويل', polished: 'مصقول', cartoon: 'كرتوني', style: 'أسلوب', better: 'أفضل', lighting: 'إضاءة', fix: 'إصلاح', cinematic: 'سينمائي', look: 'مظهر', professional: 'احترافي', personal: 'شخصي', photo: 'صورة', product: 'منتج', premium: 'فاخر', background: 'خلفية', change: 'تغيير', character: 'شخصية', sheet: 'ورقة', modern: 'عصري', edit: 'تعديل', edits: 'تعديلات', prompt: 'مطالبة', ad: 'إعلان', creative: 'إبداعي', bright: 'مشرق', social: 'اجتماعي', media: 'إعلام', clean: 'نظيف', studio: 'استوديو', high: 'عال', contrast: 'تباين', hero: 'بارز', minimal: 'بسيط', luxury: 'فاخر', dark: 'داكن', realistic: 'واقعي', commerce: 'تجاري', commercial: 'تجاري', soft: 'ناعم', natural: 'طبيعي', daylight: 'ضوء النهار', warm: 'دافئ', portrait: 'بورتريه', headshot: 'صورة شخصية', content: 'محتوى', repurpose: 'إعادة توظيف', language: 'لغة', learning: 'تعلم', page: 'صفحة', linkedin: 'لينكدإن', creator: 'صانع محتوى', local: 'محلي', restaurant: 'مطعم', marketing: 'تسويق', copy: 'نص', brand: 'علامة', voice: 'صوت', calendar: 'تقويم', customer: 'عميل', persona: 'شخصية', email: 'بريد إلكتروني', sequence: 'سلسلة', landing: 'هبوط', ready: 'جاهز', use: 'استخدام', section: 'قسم', video: 'فيديو', short: 'قصير', script: 'سيناريو', youtube: 'يوتيوب', outline: 'مخطط', storyboard: 'لوحة مشاهد', captions: 'تعليقات', b: 'لقطات', roll: 'داعمة', ideas: 'أفكار', idea: 'فكرة', podcast: 'بودكاست', clips: 'مقاطع', instagram: 'إنستغرام', carousel: 'كاروسيل', tiktok: 'تيك توك', hooks: 'بدايات', hook: 'بداية', profile: 'ملف', bio: 'نبذة', comment: 'تعليق', comments: 'تعليقات', replies: 'ردود', music: 'موسيقى', lyrics: 'كلمات', beat: 'إيقاع', jingle: 'لحن قصير', playlist: 'قائمة تشغيل', programming: 'برمجة', debugging: 'تصحيح الأخطاء', feature: 'ميزة', plan: 'خطة', code: 'كود', review: 'مراجعة', refactoring: 'إعادة هيكلة', api: 'واجهة برمجة', design: 'تصميم', testing: 'اختبار', tests: 'اختبارات', ui: 'واجهة', component: 'مكون', writing: 'كتابة', blog: 'مدونة', story: 'قصة', scene: 'مشهد', summary: 'ملخص', tone: 'نبرة', rewrite: 'إعادة صياغة', resume: 'سيرة ذاتية', presentation: 'عرض تقديمي',
    visual: 'مرئي', direction: 'اتجاه', color: 'لون', colors: 'ألوان', mood: 'مزاج', concept: 'مفهوم', concepts: 'مفاهيم', structure: 'بنية', rules: 'قواعد', variations: 'تنويعات', senior: 'خبير', layout: 'تخطيط', typography: 'طباعة', bold: 'جريء', icon: 'أيقونة', safe: 'آمن', designer: 'مصمم', spacing: 'تباعد', famous: 'مشهور', brands: 'علامات', vibe: 'طابع', strategy: 'استراتيجية', identity: 'هوية', visible: 'مرئي', case: 'حالة', poster: 'ملصق', study: 'دراسة', ecommerce: 'تجارة إلكترونية', e: 'إلكتروني', packaging: 'تغليف', app: 'تطبيق', mobile: 'جوال', system: 'نظام', event: 'فعالية', moodboard: 'لوحة مزاجية', mockup: 'نموذج', food: 'طعام', setting: 'إعداد', describe: 'صِف', checklist: 'قائمة تحقق', data: 'بيانات', guide: 'دليل', campaign: 'حملة', coffee: 'قهوة', store: 'متجر', infographic: 'إنفوجرافيك', logo: 'شعار', online: 'عبر الإنترنت', estate: 'عقاري', deck: 'عرض', private: 'خاص', keywords: 'كلمات مفتاحية', impression: 'انطباع', outfit: 'ملابس', audit: 'تدقيق', master: 'ماستر', angle: 'زاوية', positioning: 'تموضع', brief: 'موجز', main: 'رئيسي', friendly: 'ودود', easy: 'سهل', action: 'إجراء', text: 'نص', thought: 'فكر', lead: 'جذب عملاء', claims: 'ادعاءات', offer: 'عرض', startup: 'شركة ناشئة', trend: 'ترند', business: 'عمل', company: 'شركة', founder: 'مؤسس', founders: 'مؤسسون', owners: 'مالكون', hiring: 'توظيف', newsletter: 'نشرة', leadership: 'قيادة', agency: 'وكالة', student: 'طالب', dental: 'مختبر أسنان', fitness: 'لياقة', saas: 'برمجيات خدمية', subject: 'موضوع', person: 'شخص', details: 'تفاصيل', palette: 'لوحة ألوان', personality: 'شخصية', aesthetic: 'جمالية', composition: 'تكوين', caption: 'تعليق', clear: 'واضح', expression: 'تعبير', topic: 'الموضوع', audience: 'الجمهور', role: 'الدور', product: 'المنتج', service: 'الخدمة', current: 'الحالي', niche: 'المجال', brand: 'العلامة', theme: 'الموضوع', genre: 'النوع', value: 'القيمة', component: 'المكون', context: 'السياق', keyword: 'الكلمة المفتاحية', email: 'البريد الإلكتروني', idea: 'الفكرة', text: 'النص', bullets: 'النقاط', offer: 'العرض', competitors: 'المنافسون',
  },
  tr: {
    image: 'görsel', images: 'görseller', improvement: 'iyileştirme', enhancement: 'iyileştirme', enhance: 'iyileştir', anime: 'anime', world: 'dünya', transformation: 'dönüşümü', polished: 'parlak', cartoon: 'çizgi film', style: 'stil', better: 'daha iyi', lighting: 'ışık', fix: 'düzeltme', cinematic: 'sinematik', look: 'görünüm', professional: 'profesyonel', personal: 'kişisel', photo: 'fotoğraf', product: 'ürün', premium: 'premium', background: 'arka plan', change: 'değişim', character: 'karakter', sheet: 'sayfası', modern: 'modern', edit: 'düzenleme', edits: 'düzenlemeler', prompt: 'prompt', ad: 'reklam', creative: 'kreatif', bright: 'parlak', social: 'sosyal', media: 'medya', clean: 'temiz', studio: 'stüdyo', high: 'yüksek', contrast: 'kontrast', hero: 'hero', minimal: 'minimal', luxury: 'lüks', dark: 'koyu', realistic: 'gerçekçi', commerce: 'ticaret', soft: 'yumuşak', natural: 'doğal', daylight: 'gün ışığı', warm: 'sıcak', portrait: 'portre', headshot: 'profil portresi', content: 'içerik', repurpose: 'yeniden kullanım', language: 'dil', learning: 'öğrenme', page: 'sayfası', linkedin: 'LinkedIn', creator: 'üretici', local: 'yerel', restaurant: 'restoran', marketing: 'pazarlama', copy: 'metin', brand: 'marka', voice: 'sesi', calendar: 'takvim', customer: 'müşteri', persona: 'persona', email: 'e-posta', sequence: 'serisi', landing: 'landing', ready: 'hazır', use: 'kullanım', section: 'bölüm', video: 'video', short: 'kısa', script: 'senaryo', youtube: 'YouTube', outline: 'taslak', storyboard: 'storyboard', captions: 'altyazılar', b: 'b', roll: 'roll', ideas: 'fikirler', podcast: 'podcast', clips: 'klipler', instagram: 'Instagram', carousel: 'carousel', tiktok: 'TikTok', hooks: 'hooklar', profile: 'profil', bio: 'biyografi', comment: 'yorum', replies: 'yanıtlar', music: 'müzik', lyrics: 'şarkı sözleri', beat: 'beat', jingle: 'jingle', playlist: 'çalma listesi', programming: 'programlama', debugging: 'hata ayıklama', feature: 'özellik', plan: 'plan', code: 'kod', review: 'inceleme', refactoring: 'refactor', api: 'API', design: 'tasarım', testing: 'test', ui: 'UI', component: 'bileşen', writing: 'yazı', blog: 'blog', story: 'hikaye', scene: 'sahne', summary: 'özet', tone: 'ton', rewrite: 'yeniden yazım', resume: 'özgeçmiş', presentation: 'sunum',
  },
};

function translateLooseText(text, language) {
  if (!text) return '';
  const terms = TERM_TRANSLATIONS[language] || {};
  let translated = text;

  const phrasePairs = language === 'ar'
    ? [
      [/Ready-to-use (.+?) prompt for the (.+?) section\./g, 'مطالبة $1 جاهزة للاستخدام لقسم $2.'],
      [/Create an original (.+?) for \[subject\/product\/person\/brand\] using (.+?)\./g, 'أنشئ $1 أصليًا لـ [الموضوع/المنتج/الشخص/العلامة] باستخدام $2.'],
      [/Preserve the main subject and composition\./g, 'حافظ على الموضوع الرئيسي والتكوين.'],
      [/Make the result realistic, sharp, clean, and commercially usable\./g, 'اجعل النتيجة واقعية وحادة ونظيفة وقابلة للاستخدام التجاري.'],
      [/Specify lighting, background, camera angle, textures, mood, and negative instructions: no distorted hands, no unreadable text, no fake logos, no over-smoothed skin, no unrealistic reflections\./g, 'حدّد الإضاءة والخلفية وزاوية الكاميرا والملمس والمزاج والتعليمات السلبية: لا أيدٍ مشوهة، لا نص غير مقروء، لا شعارات مزيفة، لا بشرة ملساء بشكل مبالغ فيه، ولا انعكاسات غير واقعية.'],
      [/Act as a senior LinkedIn strategist\./g, 'تصرّف كاستراتيجي لينكدإن خبير.'],
      [/Act as a short-form video strategist\./g, 'تصرّف كاستراتيجي فيديوهات قصيرة.'],
      [/Act as a practical marketing strategist\./g, 'تصرّف كاستراتيجي تسويق عملي.'],
      [/Act as an experienced operator\./g, 'تصرّف كمسؤول عمليات خبير.'],
      [/Improve the existing Prompt Master website by adding or refining (.+?)\./g, 'حسّن موقع Prompt Master الحالي بإضافة أو تحسين $1.'],
      [/Keep the current dark visual identity, language switcher, authentication, prompt generator, and modes unchanged\./g, 'حافظ على الهوية المرئية الداكنة الحالية ومبدّل اللغة والمصادقة ومولّد المطالبات والأوضاع دون تغيير.'],
      [/Do not redesign the whole site\./g, 'لا تعِد تصميم الموقع بالكامل.'],
      [/Provide exact component structure, data fields, empty states, mobile behavior, and safe implementation steps\./g, 'قدّم بنية المكونات الدقيقة وحقول البيانات وحالات الفراغ وسلوك الهاتف وخطوات تنفيذ آمنة.'],
    ]
    : [
      [/Ready-to-use (.+?) prompt for the (.+?) section\./g, '$2 bölümü için kullanıma hazır $1 promptu.'],
      [/Create an original (.+?) for \[subject\/product\/person\/brand\] using (.+?)\./g, '[konu/ürün/kişi/marka] için $2 kullanarak özgün bir $1 oluştur.'],
      [/Preserve the main subject and composition\./g, 'Ana konuyu ve kompozisyonu koru.'],
      [/Make the result realistic, sharp, clean, and commercially usable\./g, 'Sonucu gerçekçi, keskin, temiz ve ticari kullanıma uygun hale getir.'],
      [/Specify lighting, background, camera angle, textures, mood, and negative instructions: no distorted hands, no unreadable text, no fake logos, no over-smoothed skin, no unrealistic reflections\./g, 'Işığı, arka planı, kamera açısını, dokuları, ruh halini ve negatif talimatları belirt: bozuk eller yok, okunamayan metin yok, sahte logo yok, aşırı pürüzsüz cilt yok, gerçek dışı yansıma yok.'],
      [/Act as a senior LinkedIn strategist\./g, 'Kıdemli bir LinkedIn stratejisti gibi davran.'],
      [/Act as a short-form video strategist\./g, 'Kısa video stratejisti gibi davran.'],
      [/Act as a practical marketing strategist\./g, 'Pratik bir pazarlama stratejisti gibi davran.'],
      [/Act as an experienced operator\./g, 'Deneyimli bir operasyon uzmanı gibi davran.'],
      [/Improve the existing Prompt Master website by adding or refining (.+?)\./g, 'Mevcut Prompt Master web sitesinde $1 ekle veya geliştir.'],
      [/Keep the current dark visual identity, language switcher, authentication, prompt generator, and modes unchanged\./g, 'Mevcut koyu görsel kimliği, dil değiştiriciyi, kimlik doğrulamayı, prompt oluşturucuyu ve modları değiştirme.'],
      [/Do not redesign the whole site\./g, 'Tüm siteyi yeniden tasarlama.'],
      [/Provide exact component structure, data fields, empty states, mobile behavior, and safe implementation steps\./g, 'Tam bileşen yapısını, veri alanlarını, boş durumları, mobil davranışı ve güvenli uygulama adımlarını ver.'],
    ];

  for (const [pattern, replacement] of phrasePairs) translated = translated.replace(pattern, replacement);

  translated = translated.replace(/\b[A-Za-z][A-Za-z-]*\b/g, (word) => {
    const lower = word.toLowerCase();
    if (terms[lower] !== undefined) return terms[lower];
    // Unknown word: keep it as-is instead of dropping it. Dropping words left
    // gaps that broke sentence structure (missing words, double spaces).
    return word;
  });

  return translated.replace(/\s+/g, ' ').trim();
}

function translateTitleText(title, language) {
  let translated = translateLooseText(title, language);
  const titleTerms = TITLE_TRANSLATIONS[language] || {};
  for (const [source, target] of Object.entries(titleTerms)) {
    translated = translated.replace(new RegExp(`\\b${source}\\b`, 'g'), target);
  }
  return translated;
}

function translateTags(tags, language) {
  return tags.map((tag) => translateLooseText(tag, language).trim()).filter(Boolean);
}

const ITEM_TRANSLATIONS = {
  ar: {
    'img-enhancement-001': {
      title: 'تحسين الصورة',
      useCase: 'تحسين صورة منخفضة الجودة مع الحفاظ على واقعيتها وطبيعتها.',
      promptText: 'حسّن هذه الصورة مع الحفاظ على الموضوع الأصلي والهوية والوضعية والتكوين. حسّن الحدة وتوازن الإضاءة ودقة الألوان وملمس البشرة أو المواد والوضوح العام. أزل التشويش والضبابية وآثار الضغط والعيوب المشتتة. أبقِ النتيجة واقعية ونظيفة وطبيعية، دون تغيير العناصر الرئيسية أو إضافة تفاصيل غير واقعية.',
    },
    'img-anime-002': {
      title: 'تحويل إلى عالم أنمي',
      useCase: 'تحويل شخص أو منتج أو مشهد إلى عالم أنمي مصقول.',
      promptText: 'حوّل الموضوع إلى عالم أنمي سينمائي بإضاءة معبرة وخلفيات مفصلة وخطوط نظيفة وألوان نابضة ومتوازنة وأجواء عاطفية. حافظ على هوية الموضوع والظل العام وتفاصيل الملابس والتكوين الرئيسي. أضف سردًا بيئيًا خفيفًا وعمق مجال ناعمًا وأسلوب إنتاج أنمي عالي الجودة.',
    },
    'img-cartoon-003': {
      title: 'أسلوب كرتوني مصقول',
      useCase: 'إنشاء نسخة كرتونية ودودة من الموضوع.',
      promptText: 'حوّل الموضوع إلى رسم كرتوني عصري مصقول. أبقِ الموضوع معروفًا، وبسّط التفاصيل بذوق، واستخدم حدودًا نظيفة وأشكالًا معبرة وظلالًا ناعمة ولوحة ألوان ودودة. اجعله يبدو مصممًا باحتراف لملف شخصي أو ملصق أو منشور اجتماعي مع الحفاظ على الوضعية الأصلية والسمات البصرية الأساسية.',
    },
    'img-lighting-004': {
      title: 'إصلاح الإضاءة',
      useCase: 'إصلاح الإضاءة الداكنة أو المسطحة أو غير المتساوية في صورة.',
      promptText: 'حسّن الإضاءة في هذه الصورة مع الحفاظ على واقعية المشهد. وازن التعريض، واستعد تفاصيل الظلال، وخفف اللمعات القاسية، وأضف تباينًا طبيعيًا، واجعل الموضوع بارزًا بوضوح. حافظ على الألوان الأصلية والهوية والخلفية والتكوين. تجنب المبالغة في التحرير أو الوهج الاصطناعي أو الملمس البلاستيكي.',
    },
    'img-profile-006': {
      title: 'صورة شخصية احترافية',
      useCase: 'إنشاء بورتريه احترافي مصقول للملفات الشخصية.',
      promptText: 'أنشئ بورتريهًا شخصيًا احترافيًا مناسبًا للينكدإن أو لملف عمل. أبقِ الشخص معروفًا وطبيعيًا. استخدم إضاءة استوديو جذابة وخلفية نظيفة وتفاصيل وجه واضحة وملمس بشرة واقعيًا وتعبيرًا واثقًا وملابس مصقولة. تجنب التنقيح الشديد أو فلاتر الجمال المبالغ فيها أو تغييرات الوجه غير الواقعية.',
    },
    'video-short-011': {
      title: 'سيناريو فيديو قصير سريع الانتشار',
      useCase: 'كتابة سيناريو سريع قائم على بداية قوية لفيديو قصير.',
      promptText: 'اكتب سيناريو فيديو قصير حول [الموضوع] للجمهور [الجمهور]. ابدأ ببداية قوية مدتها ثانيتان، ثم قدّم 3 نقاط قيمة سريعة، ورؤية مفاجئة واحدة، ودعوة بسيطة لاتخاذ إجراء. اجعله حواريًا وبصريًا وسهل التصوير. أضف ملاحظات مشاهد ونصًا على الشاشة وأسطر تعليق صوتي. الطول المستهدف: من 30 إلى 45 ثانية.',
    },
    'marketing-ad-copy-045': {
      title: 'تنويعات نص إعلاني',
      useCase: 'إنشاء تنويعات إعلانية جاهزة للحملة.',
      promptText: 'أنشئ تنويعات نص إعلاني لـ [المنتج] تستهدف [الجمهور]. قدّم 10 بدايات، و5 خيارات للنص الأساسي، و5 عناوين، و5 دعوات لاتخاذ إجراء، و3 مفاهيم إبداعية. امزج بين زوايا تقودها الفائدة والمشكلة والدليل والفضول والاستعجال. اجعل الادعاءات قابلة للتصديق ومتوافقة.',
    },
  },
  tr: {
    'img-enhancement-001': {
      title: 'Görsel İyileştirme',
      useCase: 'Düşük kaliteli bir görseli gerçekçi ve doğal kalacak şekilde iyileştir.',
      promptText: 'Bu görseli özgün konuyu, kimliği, pozu ve kompozisyonu koruyarak iyileştir. Keskinliği, ışık dengesini, renk doğruluğunu, cilt veya malzeme dokusunu ve genel netliği artır. Gürültüyü, bulanıklığı, sıkıştırma izlerini ve dikkat dağıtan kusurları kaldır. Ana nesneleri değiştirmeden veya gerçek dışı ayrıntılar eklemeden sonucu gerçekçi, temiz ve doğal tut.',
    },
    'img-anime-002': {
      title: 'Anime Dünyasına Dönüşüm',
      useCase: 'Bir kişiyi, ürünü veya sahneyi özenli anime tarzı bir dünyaya dönüştür.',
      promptText: 'Konuyu etkileyici ışık, ayrıntılı arka planlar, temiz çizgiler, canlı ama dengeli renkler ve duygusal atmosferle sinematik bir anime dünyasına dönüştür. Konunun kimliğini, siluetini, kıyafet ayrıntılarını ve ana kompozisyonu koru. İnce çevresel hikaye anlatımı, yumuşak alan derinliği ve yüksek kaliteli anime prodüksiyon tarzı ekle.',
    },
    'img-cartoon-003': {
      title: 'Parlak Çizgi Film Stili',
      useCase: 'Bir konunun samimi çizgi film versiyonunu oluştur.',
      promptText: 'Konuyu parlak modern bir çizgi film illüstrasyonuna dönüştür. Konuyu tanınır tut, ayrıntıları zevkli biçimde sadeleştir, temiz konturlar, etkileyici şekiller, yumuşak gölgeler ve samimi bir renk paleti kullan. Özgün pozu ve temel görsel özellikleri korurken profil, çıkartma veya sosyal gönderi için profesyonel tasarlanmış gibi görünmesini sağla.',
    },
    'img-lighting-004': {
      title: 'Işık Düzeltme',
      useCase: 'Bir fotoğraftaki karanlık, düz veya dengesiz ışığı düzelt.',
      promptText: 'Sahneyi gerçekçi tutarak bu görseldeki ışığı iyileştir. Pozlamayı dengele, gölge ayrıntılarını geri kazan, sert parlak alanları yumuşat, doğal kontrast ekle ve konunun net biçimde öne çıkmasını sağla. Özgün renkleri, kimliği, arka planı ve kompozisyonu koru. Aşırı düzenlemeden, yapay parıltıdan veya plastik görünümlü dokulardan kaçın.',
    },
    'img-profile-006': {
      title: 'Profesyonel Kişisel Fotoğraf',
      useCase: 'Profiller için özenli profesyonel bir portre oluştur.',
      promptText: 'LinkedIn veya iş profili için uygun profesyonel bir kişisel portre oluştur. Kişiyi tanınır ve doğal tut. Hoş stüdyo ışığı, temiz arka plan, net yüz ayrıntıları, gerçekçi cilt dokusu, kendinden emin ifade ve özenli kıyafet kullan. Ağır rötuştan, abartılı güzellik filtrelerinden veya gerçek dışı yüz değişikliklerinden kaçın.',
    },
    'video-short-011': {
      title: 'Viral Kısa Video Senaryosu',
      useCase: 'Kısa video için hızlı, güçlü girişe dayalı bir senaryo yaz.',
      promptText: '[KONU] hakkında [HEDEF KİTLE] için kısa video senaryosu yaz. Güçlü bir 2 saniyelik girişle başla, ardından 3 hızlı değer noktası, şaşırtıcı bir içgörü ve basit bir eylem çağrısı ver. Konuşma dilinde, görsel ve çekmesi kolay tut. Sahne notları, ekrandaki metin ve dış ses satırları ekle. Hedef uzunluk: 30-45 saniye.',
    },
    'marketing-ad-copy-045': {
      title: 'Reklam Metni Varyasyonları',
      useCase: 'Kampanyaya hazır reklam varyasyonları oluştur.',
      promptText: '[ÜRÜN] için [HEDEF KİTLE] hedefli reklam metni varyasyonları oluştur. 10 giriş, 5 ana metin seçeneği, 5 başlık, 5 eylem çağrısı ve 3 kreatif konsept ver. Fayda odaklı, problem odaklı, kanıt odaklı, merak ve aciliyet açılarını karıştır. İddiaları inandırıcı ve uyumlu tut.',
    },
  },
};

// Merge in the AI-generated, full-quality translations (data/fullIdeaTranslations.json).
// These take priority over the hand-written entries above when both exist for the same id.
for (const lang of ['ar', 'tr']) {
  for (const [id, entry] of Object.entries(FULL_AI_TRANSLATIONS[lang] || {})) {
    ITEM_TRANSLATIONS[lang][id] = entry;
  }
}

function titleLabel(item, language) {
  if (ITEM_TRANSLATIONS[language]?.[item.id]?.title) return ITEM_TRANSLATIONS[language][item.id].title;

  const imageTitle = item.title.match(/^Image Prompt: (.+?) in (.+)$/);
  if (imageTitle) {
    const type = typeLabel(imageTitle[1], language);
    const style = STYLE_TRANSLATIONS[language]?.[imageTitle[2].toLowerCase()] || translateLooseText(imageTitle[2], language);
    return language === 'ar' ? `مطالبة صورة: ${type} بأسلوب ${style}` : `Görsel Promptu: ${type} - ${style}`;
  }

  const routedTitle = item.title.match(/^(Video|Marketing) Prompt: (.+?) for (.+)$/);
  if (routedTitle) {
    const label = language === 'ar'
      ? (routedTitle[1] === 'Video' ? 'مطالبة فيديو' : 'مطالبة تسويق')
      : (routedTitle[1] === 'Video' ? 'Video Promptu' : 'Pazarlama Promptu');
    const type = typeLabel(routedTitle[2], language);
    const route = translateLooseText(routedTitle[3], language);
    return language === 'ar' ? `${label}: ${type} لـ ${route}` : `${label}: ${type} - ${route}`;
  }

  return translateTitleText(item.title, language);
}

function useCaseLabel(item, language) {
  if (ITEM_TRANSLATIONS[language]?.[item.id]?.useCase) return ITEM_TRANSLATIONS[language][item.id].useCase;

  return translateLooseText(item.useCase, language);
}

function promptLabel(item, language) {
  if (ITEM_TRANSLATIONS[language]?.[item.id]?.promptText) return ITEM_TRANSLATIONS[language][item.id].promptText;

  const type = typeLabel(item.type, language);
  const style = item.promptText.match(/ using (.+?)\. Preserve/);
  if (style) {
    const localizedStyle = STYLE_TRANSLATIONS[language]?.[style[1]] || (language === 'ar' ? 'أسلوب بصري مناسب' : 'uygun bir görsel stil');
    return language === 'ar'
      ? `أنشئ ${type} لـ [الموضوع/المنتج/الشخص/العلامة] بأسلوب ${localizedStyle}. حافظ على الموضوع الرئيسي والتكوين كما هما. اجعل النتيجة واقعية وحادة ونظيفة وقابلة للاستخدام التجاري. حدد الإضاءة والخلفية وزاوية الكاميرا والملمس والمزاج. تجنب الأيدي المشوهة والنص غير المقروء والشعارات المزيفة والبشرة الملساء بشكل مبالغ فيه والانعكاسات غير الواقعية.`
      : `[konu/ürün/kişi/marka] için ${localizedStyle} stilinde ${type} oluştur. Ana konuyu ve kompozisyonu koru. Sonucu gerçekçi, keskin, temiz ve ticari kullanıma uygun hale getir. Işık, arka plan, kamera açısı, dokular ve ruh halini belirt. Bozuk eller, okunamayan metin, sahte logo, aşırı pürüzsüz cilt ve gerçek dışı yansımalardan kaçın.`;
  }
  if (/^Act as a short-form video strategist\./.test(item.promptText)) {
    return language === 'ar'
      ? `تصرّف كاستراتيجي فيديوهات قصيرة. أنشئ ${type} حول [الموضوع/المنتج]. أضف 10 بدايات قوية، وسيناريو مدته 30 ثانية، وبنية مشهدًا بمشهد، ونصًا على الشاشة، وتعليقًا، ودعوة لاتخاذ إجراء، وفكرة لإعادة استخدام المحتوى على منصة أخرى. اجعل النتيجة مفيدة وآمنة وغير مبالغ فيها.`
      : `Kısa video stratejisti gibi davran. [konu/ürün] hakkında ${type} oluştur. 10 güçlü giriş, 30 saniyelik senaryo, sahne sahne yapı, ekran metni, açıklama, CTA ve başka bir platform için yeniden kullanım fikri ekle. Sonucu faydalı, güvenli ve abartısız tut.`;
  }
  const linkedin = item.promptText.match(/^Act as a senior LinkedIn strategist\. Create a (.+?) for \[topic\] aimed at (.+?)\./i);
  if (linkedin) {
    return language === 'ar'
      ? `تصرّف كخبير استراتيجي في لينكدإن. أنشئ ${type} حول [الموضوع] موجهًا إلى ${cleanAudience(linkedin[2], 'ar')}. أضف بداية قوية، ومخطط منشور أو كاروسيل مختصر، ووجهة نظر واضحة، و3 عناصر مصداقية يمكن تخصيصها، ودعوة لطيفة لاتخاذ إجراء. اجعل النص إنسانيًا ومحددًا وتجنب المبالغة والادعاءات غير الواقعية.`
      : `Kıdemli LinkedIn stratejisti gibi davran. ${cleanAudience(linkedin[2], 'tr')} için [konu] hakkında ${type} oluştur. Güçlü bir giriş, kısa gönderi veya carousel taslağı, net bakış açısı, özelleştirilebilir 3 güven unsuru ve yumuşak CTA ekle. Metni insani, spesifik ve abartısız tut.`;
  }
  if (/^Act as a practical marketing strategist\./.test(item.promptText)) {
    return language === 'ar'
      ? `تصرّف كاستراتيجي تسويق عملي. أنشئ ${type} حول [العرض/المنتج]. أضف الجمهور المستهدف، والوعد الأساسي، ونقاط الألم، وزاوية المحتوى، و5 عناوين مقترحة، ودعوة لاتخاذ إجراء، وخطة اختبار قصيرة. اجعل الادعاءات واقعية وسهلة التخصيص.`
      : `Pratik bir pazarlama stratejisti gibi davran. [teklif/ürün] etrafında ${type} oluştur. Hedef kitle, temel vaat, sorun noktaları, içerik açısı, 5 başlık seçeneği, CTA ve kısa test planı ekle. İddiaları gerçekçi ve kolayca özelleştirilebilir tut.`;
  }
  if (/^Improve the existing Prompt Master website/.test(item.promptText)) {
    return language === 'ar'
      ? `حسّن الموقع الحالي بإضافة أو تطوير ${type}. حافظ على الهوية الداكنة الحالية ومبدّل اللغة وتسجيل الدخول ومولّد النصوص والأوضاع كما هي. لا تعِد تصميم الموقع بالكامل. قدّم بنية المكونات وحقول البيانات وحالات الفراغ وسلوك الهاتف وخطوات تنفيذ آمنة.`
      : `Mevcut Prompt Master web sitesinde ${type} ekle veya geliştir. Koyu görsel kimliği, dil değiştiriciyi, giriş sistemini, prompt oluşturucuyu ve modları koru. Tüm siteyi yeniden tasarlama. Bileşen yapısı, veri alanları, boş durumlar, mobil davranış ve güvenli uygulama adımlarını ver.`;
  }
  if (/^Act as an experienced operator\./.test(item.promptText)) {
    return language === 'ar'
      ? `تصرّف كمسؤول عمليات خبير. ساعدني في ${type} لـ [المشروع/الشركة]. اطرح حتى 5 أسئلة توضيحية فقط عند الحاجة، ثم قدّم خطة منظمة وافتراضات ومخاطر وقائمة تحقق وخطوات تالية. اجعلها عملية لفريق صغير بميزانية محدودة.`
      : `Deneyimli bir operasyon uzmanı gibi davran. [proje/şirket] için ${type} konusunda yardım et. Yalnızca gerekirse en fazla 5 netleştirici soru sor, ardından yapılandırılmış plan, varsayımlar, riskler, kontrol listesi ve sonraki adımları ver. Sınırlı bütçeli küçük bir ekip için pratik tut.`;
  }
  return translateLooseText(item.promptText, language);
}

function buildLocale(language) {
  return Object.fromEntries(IDEA_SUGGESTIONS.map((item) => [item.id, {
    title: titleLabel(item, language),
    category: typeLabel(item.type, language),
    useCase: useCaseLabel(item, language),
    promptText: promptLabel(item, language),
    tags: (Array.isArray(ITEM_TRANSLATIONS[language]?.[item.id]?.tags) && ITEM_TRANSLATIONS[language][item.id].tags.length)
      ? ITEM_TRANSLATIONS[language][item.id].tags
      : translateTags(item.tags || [], language),
  }]));
}

export const IDEA_SUGGESTION_LOCALES = {
  tr: buildLocale('tr'),
  ar: buildLocale('ar'),
};
