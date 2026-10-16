import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { formatNumber } from '../../utils/format.js';

// 4 Custom High-Resolution Generated Hero Banners mapped to curated book editions
const SLIDES_CONFIG = [
  {
    bookId: 'demo-001', // Chandni Sehan
    bgImage: '/hero-slide-1.jpg',
    themeTag: 'قومی کتب خانہ • Digital Sanctuary',
    subtitle: 'The Grand Digital Library of Urdu & Pakistani Classics',
  },
  {
    bookId: 'demo-003', // Rang Aur Sur (Poetry & Ghazals)
    bgImage: '/hero-slide-2.jpg',
    themeTag: 'شاعری و ادب • Classical Ghazals',
    subtitle: 'Timeless Poetry, Gold Calligraphy & Kashmiri Chai Vibe',
  },
  {
    bookId: 'demo-002', // Kite Season (Lahore Rooftops)
    bgImage: '/hero-slide-3.jpg',
    themeTag: 'روایتی کہانیاں • Lahore Rooftops',
    subtitle: 'Vibrant Stories of Basant, Youth & Sunset Skies',
  },
  {
    bookId: 'demo-005', // Mountain Diaries (Hunza & Northern Peaks)
    bgImage: '/hero-slide-4.jpg',
    themeTag: 'سفرنامہ • Himalayan Retreat',
    subtitle: 'Serene Digital Reading Wherever Your Journey Takes You',
  },
];

export default function HeroSlider({ books = [] }) {
  const { addToCart } = useCart();
  const { t, isUrdu } = useLanguage();
  const [current, setCurrent] = useState(0);

  // Match slides with actual books from the catalog
  const slides = SLIDES_CONFIG.map((config) => {
    const matchedBook = books.find((b) => b.id === config.bookId) || books[0];
    return {
      ...config,
      book: matchedBook,
    };
  }).filter((item) => Boolean(item.book));

  // Snappy auto-play timer (3.2 seconds for lively, modern pacing)
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [slides.length, current]);

  if (slides.length === 0) return null;
  const activeSlide = slides[current];
  const { book } = activeSlide;

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handleOpenSample = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-book-modal', { detail: book }));
    }
  };

  return (
    <section
      aria-label="Featured e-book hero slider"
      className="relative overflow-hidden rounded-3xl border border-sand/70 bg-[#0B0813] text-white shadow-2xl transition-all"
    >
      {/* -------------------------------------------------------------
          1. FULL-WIDTH BACKGROUND IMAGES WITH SNAPPY 450MS CROSSFADE
          ------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((s, idx) => (
          <div
            key={s.bgImage}
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              current === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={s.bgImage}
              alt={s.subtitle}
              className="h-full w-full object-cover object-center"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Master Contrast Gradients: Ensures 100% legibility over any background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0813] via-[#0B0813]/75 to-[#0B0813]/40 lg:bg-gradient-to-r lg:from-[#0B0813]/95 lg:via-[#0B0813]/85 lg:to-black/30 backdrop-blur-[2px]" />

        {/* Brand Glow Lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#DE7272]/20 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-[#FFCA88]/20 blur-[120px]"
        />
      </div>

      {/* -------------------------------------------------------------
          2. FOREGROUND CONTENT GRID (TEXT + 3D HARDCOVER BOOK)
          ------------------------------------------------------------- */}
      <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.85fr] lg:gap-12">
          {/* Slide Text Content */}
          <div className="space-y-4">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#DE7272] to-[#FFCA88] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-md">
                <Icon name="zap" className="h-3.5 w-3.5 fill-current" />
                <span>★ {activeSlide.themeTag}</span>
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black text-[#FFCA88] backdrop-blur-md">
                {book.genre}
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-extrabold text-white/90 backdrop-blur-md">
                {book.language} Edition
              </span>
            </div>

            {/* Title & Urdu Calligraphy */}
            <div>
              <h2 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md">
                {book.title}
              </h2>
              {book.titleUrdu && (
                <p
                  lang="ur"
                  dir="rtl"
                  className="mt-2.5 font-urdu text-3xl font-black leading-loose text-[#FFCA88] sm:text-4xl drop-shadow-lg"
                >
                  {book.titleUrdu}
                </p>
              )}
              <p className="mt-1.5 text-sm font-semibold text-white/80">
                Author: <span className="font-black text-white">{book.author}</span>
                {book.authorUrdu && (
                  <span className="ml-2 font-urdu text-sm font-bold text-[#DE7272]">
                    ({book.authorUrdu})
                  </span>
                )}
              </p>
            </div>

            {/* Star Rating & Social Proof */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon key={i} name="star" className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="font-black text-sm text-white">{book.rating || '4.9'} / 5.0</span>
              <span className="text-white/70 font-medium">
                • {formatNumber(book.reviewsCount || 310)} verified Pakistani readers
              </span>
            </div>

            {/* Description Excerpt */}
            <p className="line-clamp-3 text-sm leading-relaxed text-white/90 sm:text-base font-normal max-w-xl">
              {book.description}
            </p>

            {/* Specs Strip */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-bold text-white/80">
              <span className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                📄 {book.pages} Pages
              </span>
              <span className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                📱 ePub & PDF Formats
              </span>
              <span className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                ⚡ Instant Download
              </span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-display text-3xl sm:text-4xl font-black text-[#FFCA88] drop-shadow-sm">
                {t('currency')} {formatNumber(book.price)}
              </span>
              {book.originalPrice && (
                <span className="text-lg font-bold text-white/50 line-through">
                  {t('currency')} {formatNumber(book.originalPrice)}
                </span>
              )}
              <span className="rounded-xl bg-emerald-500 px-3 py-1 text-xs font-black text-white shadow-md">
                Save {book.discount}% {t('off')}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                type="button"
                onClick={() => addToCart(book)}
                className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#DE7272] via-[#FA8469] to-[#FFCA88] px-8 py-4 text-sm font-black text-white shadow-ilmora transition-all hover:scale-105 active:scale-95"
              >
                <Icon name="cart" className="h-4 w-4" />
                <span>{t('addToCart')} • Buy Now</span>
              </button>

              <button
                type="button"
                onClick={handleOpenSample}
                className="flex items-center gap-2 rounded-2xl border-2 border-white/20 bg-white/10 px-6 py-3.5 text-sm font-extrabold text-white backdrop-blur-md transition-all hover:border-[#DE7272] hover:bg-white/20 active:scale-95"
              >
                <Icon name="eye" className="h-4 w-4 text-[#FFCA88]" />
                <span>{t('readSample')}</span>
              </button>

              <Link
                to={`/book/${book.id}`}
                className="text-xs font-black text-white hover:text-[#FFCA88] underline underline-offset-4 transition-colors"
              >
                Full Details &rarr;
              </Link>
            </div>
          </div>

          {/* Right: High-Res 3D Hardcover Book Showcase */}
          <div className="flex flex-col items-center justify-center">
            <div className="book-perspective relative w-56 sm:w-64">
              <div className="book-card-3d relative overflow-hidden rounded-2xl shadow-2xl ring-2 ring-white/20">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="aspect-[2/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="eager"
                />

                {/* Silk Gold Bookmark */}
                <div
                  className="absolute top-0 right-6 h-9 w-4 shadow-md"
                  style={{
                    backgroundColor: '#FFCA88',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
                  }}
                />

                {/* Bestseller Stamp */}
                <span className="absolute top-3 left-3 rounded-full bg-[#DE7272] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
                  ★ Bestseller
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            3. SLIDER CONTROLS BAR WITH THUMBNAIL NAVIGATION
            ------------------------------------------------------------- */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Interactive Slide Thumbnail Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {slides.map((item, idx) => (
              <button
                key={item.bgImage}
                type="button"
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`relative overflow-hidden group flex items-center gap-2.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all ${
                  current === idx
                    ? 'border-2 border-[#DE7272] bg-white/20 text-white shadow-lg ring-1 ring-[#DE7272]/50 scale-[1.03]'
                    : 'border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <img
                  src={item.bgImage}
                  alt=""
                  className="h-6 w-10 rounded-lg object-cover ring-1 ring-white/20"
                />
                <span className="hidden sm:inline font-bold">
                  0{idx + 1}. {item.book.title}
                </span>

                {/* Animated progress bar showing time to next slide */}
                {current === idx && (
                  <span
                    key={`bar-${current}`}
                    className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#DE7272] to-[#FFCA88]"
                    style={{
                      animation: 'slideProgress 3.2s linear forwards',
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={isUrdu ? handleNext : handlePrev}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-[#DE7272] hover:border-[#DE7272] active:scale-90"
            >
              <Icon name="chevronLeft" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={isUrdu ? handlePrev : handleNext}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-[#DE7272] hover:border-[#DE7272] active:scale-90"
            >
              <Icon name="chevronRight" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
