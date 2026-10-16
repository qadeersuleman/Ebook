import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookCover from '../components/books/BookCover.jsx';
import BookGrid from '../components/books/BookGrid.jsx';
import ReadingProgress from '../components/books/ReadingProgress.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Icon from '../components/ui/Icon.jsx';
import { useLibrary } from '../context/useLibrary.js';
import { useCart } from '../context/CartContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { formatDate, formatNumber } from '../utils/format.js';

export default function BookDetailsPage() {
  const { bookId } = useParams();
  const { books, booksLoading, getEntry, isFavorite, toggleFavorite } = useLibrary();
  const { addToCart, openCheckout } = useCart();
  const { t } = useLanguage();

  const [copied, setCopied] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('ePub');
  const [imageError, setImageError] = useState(false);

  const book = books.find((item) => item.id === bookId);
  const isFav = book ? isFavorite(book.id) : false;

  useDocumentTitle(book ? `${book.title} - Ilmora` : booksLoading ? 'Loading Book...' : 'Book Not Found');

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpenPreview = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-book-modal', { detail: book }));
    }
  };

  const handleInstantBuy = () => {
    addToCart(book, selectedFormat);
    openCheckout();
  };

  if (booksLoading) {
    return (
      <div role="status" className="animate-pulse space-y-6">
        <span className="sr-only">Loading book details...</span>
        <div className="grid gap-8 md:grid-cols-[320px_1fr]">
          <div className="aspect-[2/3] rounded-3xl bg-sand/80 dark:bg-white/5" />
          <div className="space-y-4">
            <div className="h-10 w-2/3 rounded-xl bg-sand/80 dark:bg-white/5" />
            <div className="h-4 w-1/3 rounded-xl bg-sand/80 dark:bg-white/5" />
            <div className="h-32 w-full rounded-2xl bg-sand/80 dark:bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <EmptyState
        icon="book"
        title="We could not find that book"
        message="The book may not exist or the link was mistyped."
        action={
          <Link to="/explore" className="rounded-full bg-ilmora px-6 py-2.5 text-xs font-bold text-white shadow-md">
            Back to All E-Books
          </Link>
        }
      />
    );
  }

  const entry = getEntry(book.id);
  const related = books.filter((item) => item.genre === book.genre && item.id !== book.id).slice(0, 4);

  return (
    <article className="space-y-12">
      {/* Top Breadcrumb & Share */}
      <div className="flex items-center justify-between">
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-xs font-bold text-coral hover:underline"
        >
          <Icon name="arrowLeft" className="h-4 w-4" />
          <span>Back to E-Books Store</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-sand bg-white px-3.5 py-1.5 text-xs font-bold text-ink transition-colors hover:border-coral dark:border-white/10 dark:bg-white/5 dark:text-cream"
          >
            <Icon name="share" className="h-3.5 w-3.5 text-coral" />
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="grid gap-10 md:grid-cols-[320px_1fr] lg:gap-14">
        {/* Left: Book Cover Presentation */}
        <div>
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-3xl bg-sand/30 shadow-2xl ring-1 ring-black/10">
            {!imageError && book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                onError={() => setImageError(true)}
                className="h-full w-full object-cover"
                loading="eager"
              />
            ) : (
              <BookCover book={book} size="lg" />
            )}

            {book.discount && (
              <span className="absolute top-4 left-4 rounded-xl bg-coral px-3 py-1 text-xs font-black uppercase text-white shadow-md">
                {book.discount}% {t('off')}
              </span>
            )}

            <button
              type="button"
              onClick={() => toggleFavorite(book.id)}
              aria-label="Wishlist"
              className={`absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-xs transition-transform active:scale-90 dark:bg-black/70 ${
                isFav ? 'text-coral' : 'text-ink-soft hover:text-coral dark:text-cream'
              }`}
            >
              <Icon name="heart" className="h-4 w-4" fill={isFav ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleOpenPreview}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-sand bg-white py-3 text-xs font-bold text-ink shadow-xs transition-colors hover:bg-sand/30 dark:border-white/10 dark:bg-white/5 dark:text-cream"
            >
              <Icon name="bookOpen" className="h-4 w-4 text-coral" />
              <span>Read Sample Excerpt</span>
            </button>
          </div>
        </div>

        {/* Right: Book Details & Purchase Card */}
        <div className="space-y-6">
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-coral/15 px-2.5 py-0.5 text-xs font-bold text-coral">
                {book.genre}
              </span>
              <span className="rounded-md bg-sand/60 px-2.5 py-0.5 text-xs font-bold text-ink-soft dark:bg-white/10 dark:text-cream">
                {book.language}
              </span>
              {book.isBestseller && (
                <span className="rounded-md bg-peach/40 px-2.5 py-0.5 text-xs font-extrabold text-amber-800 dark:bg-peach/20 dark:text-peach">
                  ★ Bestseller Edition
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl font-black text-ink sm:text-4xl lg:text-5xl dark:text-white">
              {book.title}
            </h1>

            {book.titleUrdu && (
              <p lang="ur" dir="rtl" className="font-urdu text-2xl font-bold leading-loose text-coral sm:text-3xl">
                {book.titleUrdu}
              </p>
            )}

            <p className="text-sm font-semibold text-ink-soft dark:text-cream/80">
              by <span className="font-bold text-ink dark:text-white">{book.author}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon key={i} name="star" className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="font-black text-ink dark:text-white">{book.rating || '4.9'}</span>
              <span className="text-ink-soft dark:text-cream/60">
                ({book.reviewsCount || 240} verified ratings)
              </span>
            </div>
          </header>

          {/* Pricing Box */}
          <div className="rounded-3xl border border-sand/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#161322]">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-black text-coral sm:text-4xl">
                {t('currency')} {formatNumber(book.price)}
              </span>
              {book.originalPrice && (
                <span className="text-base font-semibold text-ink-soft line-through dark:text-cream/50">
                  {t('currency')} {formatNumber(book.originalPrice)}
                </span>
              )}
              <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                Save {book.discount}%
              </span>
            </div>

            <p className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              ✓ In Stock • Instant Digital Delivery to your device upon purchase
            </p>

            {/* Format Picker */}
            <div className="mt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-cream/70">
                Select Format:
              </span>
              <div className="mt-2 flex gap-2">
                {['ePub (Apple / Kobo)', 'PDF (Universal)', 'MOBI (Kindle)'].map((fmt) => {
                  const val = fmt.split(' ')[0];
                  const active = selectedFormat === val;
                  return (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSelectedFormat(val)}
                      className={`flex-1 rounded-xl border p-2.5 text-center text-xs font-bold transition-all ${
                        active
                          ? 'border-coral bg-coral/10 text-coral shadow-xs dark:bg-coral/20'
                          : 'border-sand bg-cream/40 text-ink-soft hover:bg-sand/30 dark:border-white/10 dark:bg-white/5 dark:text-cream'
                      }`}
                    >
                      {fmt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Purchase CTA Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => addToCart(book, selectedFormat)}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-ilmora py-3.5 text-xs font-extrabold text-white shadow-ilmora transition-all hover:scale-[1.02] active:scale-95"
              >
                <Icon name="cart" className="h-4 w-4" />
                <span>{t('addToCart')}</span>
              </button>

              <button
                type="button"
                onClick={handleInstantBuy}
                className="flex items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-3.5 text-xs font-extrabold text-white transition-opacity hover:opacity-90 dark:bg-white/20 dark:text-white"
              >
                <Icon name="creditCard" className="h-4 w-4 text-peach" />
                <span>Instant Buy Now</span>
              </button>
            </div>
          </div>

          {/* Quick Specs */}
          <dl className="grid grid-cols-3 gap-3 rounded-2xl border border-sand/70 bg-white p-4 text-center dark:border-white/10 dark:bg-[#161322]">
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-soft dark:text-cream/70">
                Pages
              </dt>
              <dd className="mt-0.5 text-base font-black text-ink dark:text-white">
                {formatNumber(book.pages)}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-soft dark:text-cream/70">
                Published
              </dt>
              <dd className="mt-0.5 text-base font-black text-ink dark:text-white">
                {book.year}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-soft dark:text-cream/70">
                Added
              </dt>
              <dd className="mt-0.5 text-base font-black text-ink dark:text-white">
                {formatDate(book.addedOn)}
              </dd>
            </div>
          </dl>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-display text-base font-bold text-ink dark:text-white">
              Synopsis & Overview
            </h3>
            <p className="text-xs leading-relaxed text-ink/80 dark:text-cream/80 sm:text-sm">
              {book.description}
            </p>
          </div>

          {/* Reading Tracker for Shelf Owners */}
          {entry && (
            <div className="rounded-2xl border border-coral/30 bg-coral/5 p-4 dark:border-coral/20 dark:bg-coral/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-coral">
                Your Reading Progress
              </h4>
              <div className="mt-2">
                <ReadingProgress book={book} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Books */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-sand/60 pt-10 dark:border-white/10">
          <div className="mb-6 flex items-center justify-between">
            <h2 id="related-heading" className="font-display text-2xl font-black text-ink dark:text-white">
              More in {book.genre}
            </h2>
            <Link to={`/explore?genre=${encodeURIComponent(book.genre)}`} className="text-xs font-bold text-coral hover:underline">
              View All {book.genre} &rarr;
            </Link>
          </div>
          <BookGrid books={related} />
        </section>
      )}
    </article>
  );
}
