import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext(null);

const TRANSLATIONS = {
  en: {
    brandTagline: 'World of Literature & E-Books',
    navHome: 'Home',
    navStore: 'All E-Books',
    navBestsellers: 'Bestsellers',
    navDeals: 'Flash Deals',
    navLibrary: 'My Shelf',
    navAbout: 'About Ilmora',
    searchPlaceholder: 'Search 1,000+ e-books, authors, genres...',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    readSample: 'Read Sample',
    addedToCart: 'Added to Cart',
    quickPreview: 'Preview',
    inStock: 'Instant Digital Delivery',
    off: 'OFF',
    currency: 'Rs.',
    cartTitle: 'Shopping Cart',
    cartEmpty: 'Your shopping cart is empty.',
    cartExplorePrompt: 'Explore trending titles and add them to your shelf.',
    subtotal: 'Subtotal',
    discount: 'Discount',
    total: 'Total',
    checkout: 'Proceed to Checkout',
    checkoutTitle: 'Complete Your Order',
    name: 'Full Name',
    email: 'Email (Download link will be sent here)',
    phone: 'WhatsApp / Phone Number',
    paymentMethod: 'Select Payment Method',
    confirmOrder: 'Confirm & Download Instantly',
    orderSuccess: 'Mubarak! Order confirmed successfully.',
    viewInShelf: 'View in My Shelf',
    flashSale: 'Flash Sale • Ends in',
    featuredCollection: 'Curated Bestsellers',
    exploreAll: 'View All Books',
    browseByGenre: 'Browse by Genre',
    readerReviews: 'Verified Reader Reviews',
    newsletterTitle: 'Join the Ilmora Readers Circle',
    newsletterSubtitle: 'Get 20% off your first e-book with code ILMORA20, plus weekly literary recommendations.',
    subscribe: 'Subscribe',
    perk1Title: 'Instant E-Book Delivery',
    perk1Desc: 'Read on phone, Kindle, iPad or PC immediately',
    perk2Title: 'Secure Local Payments',
    perk2Desc: 'EasyPaisa, JazzCash, debit cards accepted',
    perk3Title: '100% Genuine Editions',
    perk3Desc: 'Authorized digital formats and high quality typography',
    perk4Title: '24/7 Reader Support',
    perk4Desc: 'Friendly reading assistance anytime',
  },
  ur: {
    brandTagline: 'علم و ادب کا ڈیجیٹل کتب خانہ',
    navHome: 'ہوم',
    navStore: 'تمام کتب',
    navBestsellers: 'بہترین کتب',
    navDeals: 'خصوصی رعایت',
    navLibrary: 'میری الماری',
    navAbout: 'ہمارے متعلق',
    searchPlaceholder: 'کتب، مصنفین، یا موضوعات تلاش کریں...',
    addToCart: 'ٹوکری میں شامل کریں',
    buyNow: 'ابھی خریدیں',
    readSample: 'نمونہ پڑھیں',
    addedToCart: 'ٹوکری میں شامل ہو گیا',
    quickPreview: 'جھلک دیکھیں',
    inStock: 'فوری ڈیجیٹل فراہمی',
    off: 'رعایت',
    currency: 'روپے',
    cartTitle: 'خریداری کی ٹوکری',
    cartEmpty: 'آپ کی ٹوکری ابھی خالی ہے۔',
    cartExplorePrompt: 'پسندیدہ کتب منتخب کریں اور اپنی ٹوکری میں شامل کریں۔',
    subtotal: 'میزان',
    discount: 'رعایت',
    total: 'کل رقم',
    checkout: 'آرڈر مکمل کریں',
    checkoutTitle: 'اپنا آرڈر مکمل کریں',
    name: 'پورا نام',
    email: 'ای میل (ڈاؤن لوڈ لنک یہاں بھیجا جائے گا)',
    phone: 'واٹس ایپ / فون نمبر',
    paymentMethod: 'ادائیگی کا طریقہ منتخب کریں',
    confirmOrder: 'تصدیق کریں اور فوری حاصل کریں',
    orderSuccess: 'مبارک ہو! آپ کا آرڈر کامیابی سے مکمل ہو گیا۔',
    viewInShelf: 'میری الماری میں دیکھیں',
    flashSale: 'خصوصی رعایت • ختم ہونے میں باقی',
    featuredCollection: 'منتخب اور مقبول ترین کتب',
    exploreAll: 'تمام کتب دیکھیں',
    browseByGenre: 'اصناف کے لحاظ سے تلاش',
    readerReviews: 'قارئین کے تاثرات',
    newsletterTitle: 'علمورا ریڈرز سرکل میں شامل ہوں',
    newsletterSubtitle: 'کوپن کوڈ ILMORA20 کے ساتھ 20 فیصد رعایت حاصل کریں۔',
    subscribe: 'شامل ہوں',
    perk1Title: 'فوری ڈیجیٹل ترسیل',
    perk1Desc: 'موبائل، ٹیبلٹ اور کنڈل پر فوراً مطالعہ شروع کریں',
    perk2Title: 'محفوظ ادائیگی کے ذرائع',
    perk2Desc: 'ایزی پیسہ، جاز کیش اور کارڈز کے ذریعے ادائیگی',
    perk3Title: 'مستند اور اعلیٰ طباعت',
    perk3Desc: 'باقاعدہ لائسنس یافتہ کتب اور نستعلیق فونٹ',
    perk4Title: 'ہمہ وقت رہنمائی',
    perk4Desc: 'قارئین کے لیے 24 گھنٹے مدد دستیاب',
  },
};

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('ilmora:lang');
    return saved === 'ur' || saved === 'en' ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('ilmora:lang', locale);
    const root = document.documentElement;
    if (locale === 'ur') {
      root.setAttribute('dir', 'rtl');
      root.setAttribute('lang', 'ur');
    } else {
      root.setAttribute('dir', 'ltr');
      root.setAttribute('lang', 'en');
    }
  }, [locale]);

  const toggleLanguage = () => {
    setLocale((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  const t = (key, fallback = '') => {
    return TRANSLATIONS[locale]?.[key] || TRANSLATIONS.en[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, isUrdu: locale === 'ur', toggleLanguage, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

