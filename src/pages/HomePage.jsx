import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/home/HeroSlider.jsx';
import BookGrid from '../components/books/BookGrid.jsx';
import Icon from '../components/ui/Icon.jsx';
import BookGridSkeleton from '../components/ui/Skeleton.jsx';
import { GENRES } from '../data/constants.js';
import { useLibrary } from '../context/useLibrary.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const TESTIMONIALS = [
  {
    name: 'Ayesha Siddiqui',
    city: 'Lahore',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    comment: 'The Nastaliq Urdu typography is so clean and enjoyable to read on my iPad. Best digital bookstore in Pakistan!',
    rating: 5,
    book: 'Chandni Sehan',
  },
  {
    name: 'Bilal Farooq',
    city: 'Islamabad',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    comment: 'Instant download through EasyPaisa within 10 seconds. Finally a legitimate platform for regional Pakistani literature.',
    rating: 5,
    book: 'Mountain Diaries',
  },
  {
    name: 'Zainab Memon',
    city: 'Karachi',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    comment: 'The excerpt sample preview helped me choose my next 3 books. Love the warm aesthetic of Ilmora!',
    rating: 5,
    book: 'Voices of the Mehran',
  },
];

export default function HomePage() {
  useDocumentTitle('Ilmora - Premier Pakistani E-Book Store & Digital Library');
  const { books, booksLoading } = useLibrary();
  const { t, isUrdu } = useLanguage();
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Countdown timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 15 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bestsellers = books.filter((b) => b.isBestseller);
  const flashDeals = books.filter((b) => b.discount && b.discount >= 38).slice(0, 4);

  const filteredBooks = selectedGenre === 'All'
    ? books
    : books.filter((b) => b.genre.toLowerCase() === selectedGenre.toLowerCase());

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNewsletterSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="space-y-14 sm:space-y-16">
      {/* -----------------------------------------------------------
          1. HERO CAROUSEL / SLIDER
          ----------------------------------------------------------- */}
      {booksLoading ? (
        <div className="h-96 rounded-3xl bg-sand/40 animate-pulse" />
      ) : (
        <HeroSlider books={books} />
      )}

      {/* -----------------------------------------------------------
          2. FLASH SALE / LIMITED-TIME DEALS WITH LIVE TIMER
          ----------------------------------------------------------- */}
      <section
        aria-labelledby="flash-deals-heading"
        className="relative overflow-hidden rounded-3xl border-2 border-coral/30 bg-gradient-to-r from-coral/15 via-peach/20 to-coral/15 p-6 sm:p-10 shadow-lg dark:border-coral/30 dark:from-coral/20 dark:via-peach/10 dark:to-coral/20"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-coral to-[#FA8469] text-white shadow-md animate-pulse">
              <Icon name="zap" className="h-6 w-6 fill-current" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-coral px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                  Limited Time
                </span>
                <span className="text-xs font-bold text-coral">Save Up to 40%</span>
              </div>
              <h2 id="flash-deals-heading" className="mt-0.5 font-display text-2xl font-black text-ink sm:text-3xl dark:text-white">
                {t('flashSale')}
              </h2>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-ink-soft dark:text-cream/70 mr-1 hidden sm:inline">
              Ends in:
            </span>
            <div className="flex items-center gap-1.5 text-center font-mono font-black">
              <div className="rounded-2xl bg-ink px-3.5 py-2 text-sm text-white shadow-md dark:bg-white dark:text-ink">
                {String(timeLeft.hours).padStart(2, '0')}
                <span className="block text-[8px] font-normal uppercase tracking-wider">Hrs</span>
              </div>
              <span className="text-coral font-bold text-lg">:</span>
              <div className="rounded-2xl bg-ink px-3.5 py-2 text-sm text-white shadow-md dark:bg-white dark:text-ink">
                {String(timeLeft.minutes).padStart(2, '0')}
                <span className="block text-[8px] font-normal uppercase tracking-wider">Min</span>
              </div>
              <span className="text-coral font-bold text-lg">:</span>
              <div className="rounded-2xl bg-gradient-to-br from-coral to-[#FA8469] px-3.5 py-2 text-sm text-white shadow-md">
                {String(timeLeft.seconds).padStart(2, '0')}
                <span className="block text-[8px] font-normal uppercase tracking-wider">Sec</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {booksLoading ? (
            <BookGridSkeleton count={4} />
          ) : (
            <BookGrid books={flashDeals} />
          )}
        </div>
      </section>

      {/* -----------------------------------------------------------
          3. BESTSELLERS & EXPLORE WITH GENRE TABS
          ----------------------------------------------------------- */}
      <section aria-labelledby="store-heading" className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-coral">
              ★ Curated Literary Masterpieces
            </span>
            <h2 id="store-heading" className="mt-1 font-display text-3xl font-black text-ink sm:text-4xl dark:text-white">
              {t('featuredCollection')}
            </h2>
          </div>

          <Link
            to="/explore"
            className="flex items-center gap-1 text-sm font-black text-coral hover:underline"
          >
            <span>{t('exploreAll')}</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Genre Pill Filters */}
        <div className="flex flex-wrap gap-2.5 overflow-x-auto pb-2">
          {['All', ...GENRES].map((genre) => {
            const active = selectedGenre.toLowerCase() === genre.toLowerCase();
            return (
              <button
                key={genre}
                type="button"
                onClick={() => setSelectedGenre(genre)}
                className={`rounded-2xl px-5 py-2.5 text-xs font-black transition-all ${
                  active
                    ? 'bg-gradient-to-r from-coral to-peach text-white shadow-ilmora scale-105'
                    : 'border border-sand bg-white text-ink-soft hover:border-coral hover:text-ink dark:border-white/10 dark:bg-white/5 dark:text-cream'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>

        {booksLoading ? (
          <BookGridSkeleton count={8} />
        ) : (
          <BookGrid books={filteredBooks.slice(0, 8)} />
        )}
      </section>

      {/* -----------------------------------------------------------
          4. PROMO BANNER / AUTHOR SPOTLIGHT
          ----------------------------------------------------------- */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-coral via-[#FA8469] to-peach p-8 text-white shadow-2xl sm:p-12">
        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider backdrop-blur-md">
              💎 Special E-Book Bundle Offer
            </span>
            <h3 className="font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Immerse in Pakistan&apos;s Literary Heritage
            </h3>
            <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-white/95 font-medium">
              Get all 13 digital editions in crystal-clear ePub & PDF formats with lifetime access across all your devices. Compatible with Kindle, iPad, Android, and Mac.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/explore"
                className="rounded-2xl bg-white px-7 py-3.5 text-xs font-black text-coral shadow-xl transition-transform hover:scale-105 active:scale-95"
              >
                Shop Full Collection
              </Link>
              <div className="rounded-2xl bg-black/25 px-4 py-2.5 text-xs font-black text-white backdrop-blur-xs">
                Coupon: <span className="underline tracking-wider">ILMORA20</span> (20% OFF)
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="relative flex -space-x-8">
              {bestsellers.slice(0, 3).map((b, i) => (
                <div
                  key={b.id}
                  className={`h-52 w-36 overflow-hidden rounded-2xl shadow-2xl transition-transform hover:-translate-y-4 ${
                    i === 1 ? 'z-20 scale-110 shadow-black/40 ring-4 ring-white/30' : 'z-10'
                  }`}
                >
                  <img src={b.coverImage} alt={b.title} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          5. WHY PAKISTANI READERS CHOOSE ILMORA (VALUE PILLARS)
          ----------------------------------------------------------- */}
      <section aria-labelledby="why-ilmora-heading" className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-coral">
            🇵🇰 The Digital Reading Revolution
          </span>
          <h2 id="why-ilmora-heading" className="mt-1 font-display text-3xl font-black text-ink sm:text-4xl dark:text-white">
            {isUrdu ? 'علمورا کیوں منتخب کریں؟' : 'Why Pakistani Readers Love Ilmora'}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-3xl border border-sand/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-[#151022]">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/25 dark:text-emerald-400 mb-4 shadow-inner">
              <Icon name="zap" className="h-6 w-6" />
            </span>
            <h4 className="font-display text-base font-black text-ink dark:text-white">
              EasyPaisa & JazzCash
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft dark:text-cream/70">
              No credit card required. Seamless checkout using your local mobile wallet with instant activation.
            </p>
          </div>

          <div className="group rounded-3xl border border-sand/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-[#151022]">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral/15 text-coral dark:bg-coral/25 mb-4 shadow-inner">
              <Icon name="bookOpen" className="h-6 w-6" />
            </span>
            <h4 className="font-display text-base font-black text-ink dark:text-white">
              Nastaliq Urdu Typography
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft dark:text-cream/70">
              Flawless, authentic Urdu script rendering configured for comfortable long-form reading on any device.
            </p>
          </div>

          <div className="group rounded-3xl border border-sand/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-[#151022]">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-peach/30 text-amber-700 dark:bg-peach/20 dark:text-peach mb-4 shadow-inner">
              <Icon name="shieldCheck" className="h-6 w-6" />
            </span>
            <h4 className="font-display text-base font-black text-ink dark:text-white">
              100% DRM-Free Ownership
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft dark:text-cream/70">
              You own your books forever. Read on Kindle, iPad, Android or PC with standard ePub and PDF formats.
            </p>
          </div>

          <div className="group rounded-3xl border border-sand/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-[#151022]">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-600 dark:bg-purple-500/25 dark:text-purple-400 mb-4 shadow-inner">
              <Icon name="sparkles" className="h-6 w-6" />
            </span>
            <h4 className="font-display text-base font-black text-ink dark:text-white">
              Direct Author Royalties
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft dark:text-cream/70">
              Every purchase directly supports Pakistani authors, poets, and heritage preservers across the nation.
            </p>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------
          6. VERIFIED READER TESTIMONIALS & REVIEWS
          ----------------------------------------------------------- */}
      <section aria-labelledby="testimonials-heading" className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-coral">
            ♥ Loved by 15,000+ Readers
          </span>
          <h2 id="testimonials-heading" className="mt-1 font-display text-3xl font-black text-ink sm:text-4xl dark:text-white">
            {t('readerReviews')}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.name}
              className="flex flex-col justify-between rounded-3xl border border-sand/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#151022]"
            >
              <div>
                <div className="flex text-amber-500 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon key={s} name="star" className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm italic leading-relaxed text-ink/85 dark:text-cream/85">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3.5 border-t border-sand/40 pt-4 dark:border-white/10">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="h-11 w-11 rounded-full object-cover shadow-sm ring-2 ring-coral/20"
                />
                <div>
                  <h4 className="text-xs font-black text-ink dark:text-white">{review.name}</h4>
                  <p className="text-[11px] text-ink-soft dark:text-cream/60">
                    {review.city} • Verified Reader of &apos;{review.book}&apos;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
