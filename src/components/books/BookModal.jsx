import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookCover from './BookCover.jsx';
import FavoriteButton from './FavoriteButton.jsx';
import StatusSelect from './StatusSelect.jsx';
import ReadingProgress from './ReadingProgress.jsx';
import Badge from '../ui/Badge.jsx';
import Icon from '../ui/Icon.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { formatNumber } from '../../utils/format.js';

export default function BookModal({ book, onClose }) {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [fontSize, setFontSize] = useState('md'); // 'sm' | 'md' | 'lg'
  const [readerTheme, setReaderTheme] = useState('parchment'); // 'parchment' | 'sepia' | 'midnight'
  const [added, setAdded] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!book) return null;

  const handleAddToCart = () => {
    addToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const fontClasses = {
    sm: 'text-base leading-relaxed',
    md: 'text-lg leading-loose',
    lg: 'text-xl leading-loose',
  }[fontSize];

  const themeClasses = {
    parchment: 'bg-[#fffaf0] text-[#2c2217] border-sand/80',
    sepia: 'bg-[#f4ebd0] text-[#3e2c14] border-[#e2d0a4]',
    midnight: 'bg-[#151221] text-[#f0eef7] border-white/10',
  }[readerTheme];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-sand/80 transition-all dark:bg-[#161322] dark:ring-white/10">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-sand/50 px-5 py-3.5 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-coral/15 text-coral dark:bg-coral/25">
              <Icon name="bookOpen" className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-cream/80">
              Ilmora Digital Reader & Sample Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FavoriteButton book={book} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded-full p-2 text-ink-soft hover:bg-sand/40 hover:text-ink dark:text-cream/80 dark:hover:bg-white/10"
            >
              <Icon name="x" className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          <div className="grid gap-6 sm:grid-cols-[180px_1fr] md:gap-8">
            {/* Book Cover */}
            <div className="mx-auto w-36 sm:w-full overflow-hidden rounded-2xl shadow-lg aspect-[2/3]">
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>

            {/* Book Details */}
            <div className="space-y-3.5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="plum">{book.genre}</Badge>
                  <Badge tone="blue">{book.language}</Badge>
                  {book.discount && (
                    <span className="rounded-md bg-coral px-2 py-0.5 text-[10px] font-black text-white">
                      {book.discount}% {t('off')}
                    </span>
                  )}
                </div>

                <h2
                  id="modal-title"
                  className="mt-2 font-display text-2xl font-black text-ink sm:text-3xl dark:text-white"
                >
                  {book.title}
                </h2>

                {book.titleUrdu && (
                  <p
                    lang="ur"
                    dir="rtl"
                    className="mt-1 font-urdu text-2xl font-bold leading-loose text-coral"
                  >
                    {book.titleUrdu}
                  </p>
                )}

                <p className="text-xs font-semibold text-ink-soft dark:text-cream/70">
                  by <span className="font-bold text-ink dark:text-white">{book.author}</span> • {book.year} • {formatNumber(book.pages)} pages
                </p>

                {/* Price Pill */}
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-coral">
                    {t('currency')} {formatNumber(book.price)}
                  </span>
                  {book.originalPrice && (
                    <span className="text-xs text-ink-soft line-through dark:text-cream/50">
                      {t('currency')} {formatNumber(book.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs leading-relaxed text-ink/80 dark:text-cream/80">
                {book.description}
              </p>

              {/* Shelf Controls */}
              <div className="rounded-2xl border border-sand/70 bg-cream/50 p-3.5 dark:border-white/10 dark:bg-white/5">
                <StatusSelect book={book} />
                <div className="mt-2.5">
                  <ReadingProgress book={book} />
                </div>
              </div>
            </div>
          </div>

          {/* Excerpt Reader Section with Theme / Font Controls */}
          {book.excerpt && (
            <div className="mt-8 border-t border-sand/50 pt-6 dark:border-white/10">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Icon name="quote" className="h-5 w-5 text-coral" />
                  <h3 className="font-display text-base font-bold text-ink dark:text-white">
                    Sample Excerpt Reading Mode
                  </h3>
                </div>

                {/* Reader Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Font Size Stepper */}
                  <div className="flex items-center rounded-xl bg-sand/40 p-1 dark:bg-white/10">
                    <button
                      type="button"
                      onClick={() => setFontSize('sm')}
                      className={`rounded-lg px-2 py-1 text-xs font-bold ${
                        fontSize === 'sm' ? 'bg-white shadow-xs dark:bg-white/20 dark:text-white' : 'text-ink-soft dark:text-cream'
                      }`}
                      title="Small font"
                    >
                      A-
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSize('md')}
                      className={`rounded-lg px-2 py-1 text-xs font-bold ${
                        fontSize === 'md' ? 'bg-white shadow-xs dark:bg-white/20 dark:text-white' : 'text-ink-soft dark:text-cream'
                      }`}
                      title="Medium font"
                    >
                      A
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSize('lg')}
                      className={`rounded-lg px-2 py-1 text-xs font-bold ${
                        fontSize === 'lg' ? 'bg-white shadow-xs dark:bg-white/20 dark:text-white' : 'text-ink-soft dark:text-cream'
                      }`}
                      title="Large font"
                    >
                      A+
                    </button>
                  </div>

                  {/* Theme Switcher */}
                  <div className="flex items-center rounded-xl bg-sand/40 p-1 dark:bg-white/10">
                    <button
                      type="button"
                      onClick={() => setReaderTheme('parchment')}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                        readerTheme === 'parchment'
                          ? 'bg-white shadow-xs dark:bg-white/20 dark:text-white'
                          : 'text-ink-soft dark:text-cream'
                      }`}
                    >
                      Parchment
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderTheme('sepia')}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                        readerTheme === 'sepia'
                          ? 'bg-[#edd8af] text-[#3e2c14] shadow-xs'
                          : 'text-ink-soft dark:text-cream'
                      }`}
                    >
                      Sepia
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderTheme('midnight')}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                        readerTheme === 'midnight'
                          ? 'bg-ink text-white shadow-xs'
                          : 'text-ink-soft dark:text-cream'
                      }`}
                    >
                      Night
                    </button>
                  </div>
                </div>
              </div>

              {/* Reader Excerpt Box */}
              <div className={`rounded-2xl border p-5 shadow-inner sm:p-6 transition-colors ${themeClasses}`}>
                <p className={`font-display italic ${fontClasses}`}>
                  &ldquo;{book.excerpt}&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-sand/50 bg-cream/50 px-6 py-4 dark:border-white/10 dark:bg-black/20">
          <Link
            to={`/book/${book.id}`}
            onClick={onClose}
            className="text-xs font-bold text-coral hover:underline"
          >
            Full Book Details &rarr;
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 rounded-full bg-ilmora px-5 py-2.5 text-xs font-extrabold text-white shadow-ilmora transition-all hover:scale-105 active:scale-95"
            >
              <Icon name="cart" className="h-4 w-4" />
              <span>
                {added ? 'Added to Cart! ✓' : `${t('addToCart')} (${t('currency')} ${formatNumber(book.price)})`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
