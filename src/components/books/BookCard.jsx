import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookCover from './BookCover.jsx';
import Icon from '../ui/Icon.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useLibrary } from '../../context/useLibrary.js';
import { formatNumber } from '../../utils/format.js';

export default function BookCard({ book, layout = 'grid' }) {
  const { addToCart } = useCart();
  const { t, isUrdu } = useLanguage();
  const { isFavorite, toggleFavorite } = useLibrary();
  const [imageError, setImageError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFav = isFavorite(book.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 900);
  };

  const handleQuickPreview = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-book-modal', { detail: book }));
    }
  };

  const handleToggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(book.id);
  };

  // LIST LAYOUT
  if (layout === 'list') {
    return (
      <article className="group relative flex flex-col gap-4 rounded-3xl border border-sand/70 bg-white p-4.5 shadow-xs transition-all hover:shadow-lg sm:flex-row sm:items-center sm:p-5 dark:border-white/10 dark:bg-[#161322]">
        {/* Cover Presentation */}
        <div className="relative h-44 w-32 shrink-0 overflow-hidden rounded-2xl bg-sand/40 shadow-md">
          {!imageError && book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <BookCover book={book} size="sm" />
          )}

          {book.discount && (
            <span className="absolute top-2 left-2 rounded-md bg-coral px-2 py-0.5 text-[10px] font-black text-white shadow-xs">
              {book.discount}% {t('off')}
            </span>
          )}
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-coral/10 px-2 py-0.5 text-[11px] font-bold text-coral dark:bg-coral/20">
              {book.genre}
            </span>
            <span className="rounded-md bg-sand/60 px-2 py-0.5 text-[11px] font-bold text-ink-soft dark:bg-white/10 dark:text-cream">
              {book.language}
            </span>
            {book.isBestseller && (
              <span className="rounded-md bg-peach/40 px-2 py-0.5 text-[11px] font-extrabold text-amber-800 dark:bg-peach/20 dark:text-peach">
                ★ Bestseller
              </span>
            )}
          </div>

          <h3 className="mt-2 text-lg font-bold text-ink dark:text-white">
            <Link to={`/book/${book.id}`} className="hover:text-coral transition-colors">
              {book.title}
            </Link>
          </h3>

          {book.titleUrdu && (
            <p lang="ur" dir="rtl" className="font-urdu text-lg font-bold text-coral/90">
              {book.titleUrdu}
            </p>
          )}

          <p className="text-xs text-ink-soft dark:text-cream/70">
            by <span className="font-bold text-ink dark:text-white">{book.author}</span> • {book.year} • {formatNumber(book.pages)} pages
          </p>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink/80 dark:text-cream/80">
            {book.description}
          </p>

          {/* Star Rating */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs">
            <div className="flex text-amber-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <Icon key={i} name="star" className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-ink dark:text-white">{book.rating || '4.8'}</span>
            <span className="text-[11px] text-ink-soft dark:text-cream/60">
              ({book.reviewsCount || 120} reviews)
            </span>
          </div>
        </div>

        {/* Price & Actions on Right */}
        <div className="flex flex-col items-end justify-between border-t border-sand/40 pt-3 sm:border-t-0 sm:pt-0">
          <div className="text-right">
            <span className="text-xl font-black text-coral">
              {t('currency')} {formatNumber(book.price)}
            </span>
            {book.originalPrice && (
              <p className="text-xs font-semibold text-ink-soft line-through dark:text-cream/50">
                {t('currency')} {formatNumber(book.originalPrice)}
              </p>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleFav}
              aria-label="Wishlist"
              className={`flex h-9 w-9 items-center justify-center rounded-xl border border-sand bg-white transition-all ${
                isFav ? 'text-coral shadow-sm' : 'text-ink-soft hover:text-coral dark:border-white/10 dark:bg-white/5'
              }`}
            >
              <Icon name="heart" className="h-4 w-4" fill={isFav ? 'currentColor' : 'none'} />
            </button>

            <button
              type="button"
              onClick={handleQuickPreview}
              className="rounded-xl border border-sand bg-white px-3 py-2 text-xs font-bold text-ink transition-colors hover:bg-sand/30 dark:border-white/10 dark:bg-white/5 dark:text-cream"
            >
              {t('readSample')}
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 rounded-xl bg-ilmora px-4 py-2 text-xs font-extrabold text-white shadow-ilmora transition-all hover:scale-105 active:scale-95"
            >
              <Icon name="cart" className="h-3.5 w-3.5" />
              <span>{addedAnimation ? 'Added! ✓' : t('addToCart')}</span>
            </button>
          </div>
        </div>
      </article>
    );
  }

  // GRID LAYOUT (DEFAULT)
  return (
    <article className="group relative flex flex-col rounded-3xl border border-sand/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-coral/20 hover:border-coral/40 dark:border-white/10 dark:bg-[#151022] dark:hover:border-coral/50">
      {/* Cover Image Presentation */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-sand/30 shadow-md">
        {!imageError && book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
            loading="lazy"
          />
        ) : (
          <BookCover book={book} size="md" />
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 z-10 flex items-center justify-between pointer-events-none">
          {book.discount ? (
            <span className="rounded-xl bg-gradient-to-r from-coral to-[#FA8469] px-2.5 py-0.5 text-[11px] font-black uppercase text-white shadow-md">
              {book.discount}% {t('off')}
            </span>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={handleToggleFav}
            aria-label="Wishlist"
            className={`pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur-xs transition-transform active:scale-90 dark:bg-black/80 ${
              isFav ? 'text-coral' : 'text-ink-soft hover:text-coral dark:text-cream'
            }`}
          >
            <Icon name="heart" className="h-4 w-4" fill={isFav ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-2 p-3 opacity-95 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
          <button
            type="button"
            onClick={handleQuickPreview}
            className="flex items-center gap-1.5 rounded-xl bg-white/95 px-3 py-1.5 text-xs font-bold text-ink shadow-md backdrop-blur-xs hover:bg-white active:scale-95 transition-all"
          >
            <Icon name="eye" className="h-3.5 w-3.5 text-coral" />
            <span>Sample</span>
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-coral to-peach px-3.5 py-1.5 text-xs font-black text-white shadow-md hover:opacity-95 active:scale-95 transition-all"
          >
            <Icon name="cart" className="h-3.5 w-3.5" />
            <span>{addedAnimation ? 'Added! ✓' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>

      {/* Book Information */}
      <div className="mt-3.5 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-ink-soft dark:text-cream/70 mb-1.5">
            <span className="font-extrabold text-coral uppercase tracking-wider text-[10px]">{book.genre}</span>
            <span className="font-semibold text-[11px]">{book.language}</span>
          </div>

          <h3 className="font-display text-base font-black text-ink dark:text-white line-clamp-1 group-hover:text-coral transition-colors">
            <Link to={`/book/${book.id}`}>{book.title}</Link>
          </h3>

          {book.titleUrdu && (
            <p lang="ur" dir="rtl" className="font-urdu text-base font-bold text-coral/95 line-clamp-1 mt-0.5">
              {book.titleUrdu}
            </p>
          )}

          <p className="mt-1 text-xs font-semibold text-ink-soft dark:text-cream/70 line-clamp-1">
            by {book.author}
          </p>

          {/* Star Rating */}
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <div className="flex text-amber-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <Icon key={i} name="star" className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <span className="font-black text-ink dark:text-white">{book.rating || '4.8'}</span>
            <span className="text-[10px] text-ink-soft dark:text-cream/60">
              ({book.reviewsCount || 120})
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-3.5 flex items-center justify-between border-t border-sand/60 pt-3 dark:border-white/10">
          <div>
            <span className="text-lg font-black text-coral">
              {t('currency')} {formatNumber(book.price)}
            </span>
            {book.originalPrice && (
              <span className="ml-1.5 text-xs font-semibold text-ink-soft/70 line-through dark:text-cream/50">
                {t('currency')} {formatNumber(book.originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            title={t('addToCart')}
            className={`flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-r from-coral to-peach text-white shadow-md transition-all hover:scale-110 active:scale-90 ${
              addedAnimation ? 'scale-125 bg-emerald-600' : ''
            }`}
          >
            <Icon name="cart" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
