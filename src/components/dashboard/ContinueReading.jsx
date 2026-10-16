import { Link } from 'react-router-dom';
import BookCover from '../books/BookCover.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import Icon from '../ui/Icon.jsx';
import { useLibrary } from '../../context/useLibrary.js';
import { formatNumber, percent } from '../../utils/format.js';

export default function ContinueReading({ books, headingId = 'continue-heading' }) {
  const { getEntry, setPagesRead } = useLibrary();
  if (books.length === 0) return null;

  return (
    <section aria-labelledby={headingId} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 id={headingId} className="text-2xl font-bold text-pk-900 dark:text-white">
          Continue Reading
        </h2>
        <span className="text-xs font-bold uppercase tracking-wider text-pk-700 dark:text-gold-400">
          Active Shelf
        </span>
      </div>

      <ul className="grid gap-4 md:grid-cols-2">
        {books.map((book) => {
          const entry = getEntry(book.id);
          const pagesRead = entry ? entry.pagesRead : 0;
          const pct = percent(pagesRead, book.pages);

          const handleStep = (step) => {
            const next = Math.max(0, Math.min(book.pages, pagesRead + step));
            setPagesRead(book.id, next);
          };

          return (
            <li
              key={book.id}
              className="flex items-center gap-4 rounded-3xl bg-white p-4.5 shadow-xs ring-1 ring-sand/80 transition-all hover:shadow-md dark:bg-[#0d1a13] dark:ring-pk-800"
            >
              <div className="book-perspective w-16 shrink-0 sm:w-20">
                <div className="book-card-3d">
                  <BookCover book={book} size="sm" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="truncate text-base font-bold text-pk-900 dark:text-cream">
                  <Link to={`/book/${book.id}`} className="hover:text-pk-600 dark:hover:text-gold-400">
                    {book.title}
                  </Link>
                </h3>
                <p className="truncate text-xs text-ink-soft dark:text-pk-100/70">
                  {book.author}
                </p>

                <div className="mt-2.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-ink-soft dark:text-pk-100/80 mb-1">
                    <span>{pct}% complete</span>
                    <span>{formatNumber(pagesRead)} / {formatNumber(book.pages)} p.</span>
                  </div>
                  <ProgressBar
                    value={pct}
                    label={`Reading progress for ${book.title}`}
                    barClassName="bg-gold-500"
                  />
                </div>

                {/* Quick Step Buttons */}
                <div className="mt-3 flex items-center justify-between border-t border-sand/30 pt-2 dark:border-pk-800/60">
                  <span className="text-[10px] font-semibold text-ink-soft dark:text-pk-100/60">
                    Quick Log:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleStep(-10)}
                      className="rounded-lg bg-sand/30 px-2 py-0.5 text-xs font-bold text-ink hover:bg-sand/60 dark:bg-white/10 dark:text-cream dark:hover:bg-white/20"
                      title="Rewind 10 pages"
                    >
                      -10
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStep(10)}
                      className="rounded-lg bg-pk-50 px-2 py-0.5 text-xs font-bold text-pk-700 hover:bg-pk-100 dark:bg-pk-900/60 dark:text-gold-400 dark:hover:bg-pk-900"
                      title="Advance 10 pages"
                    >
                      +10
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.dispatchEvent(new CustomEvent('open-book-modal', { detail: book }));
                        }
                      }}
                      className="rounded-lg bg-gold-400/20 px-2 py-0.5 text-xs font-bold text-gold-700 hover:bg-gold-400/30 dark:text-gold-300"
                      title="Read excerpt"
                    >
                      <Icon name="eye" className="h-3.5 w-3.5 inline" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
