import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import Badge from '../ui/Badge.jsx';
import { useLibrary } from '../../context/useLibrary.js';

export default function QuickSearchModal({ open, onClose, onSelectBook }) {
  const { books } = useLibrary();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) onClose();
        else if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('open-quick-search'));
        }
      } else if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? books.filter((b) => {
        return (
          b.title.toLowerCase().includes(trimmed) ||
          (b.titleUrdu && b.titleUrdu.includes(trimmed)) ||
          b.author.toLowerCase().includes(trimmed) ||
          b.genre.toLowerCase().includes(trimmed) ||
          b.language.toLowerCase().includes(trimmed) ||
          (b.tags && b.tags.some((t) => t.toLowerCase().includes(trimmed)))
        );
      })
    : books.slice(0, 5);

  const handleSelect = (book) => {
    onClose();
    if (onSelectBook) {
      onSelectBook(book);
    } else {
      navigate(`/book/${book.id}`);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick search books"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24"
    >
      <div
        className="fixed inset-0 bg-ink/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-sand/90 transition-all dark:bg-[#0d1a13] dark:ring-pk-800">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-sand/60 px-5 py-4 dark:border-pk-800/80">
          <Icon name="search" className="h-5 w-5 text-gold-500" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books by title, author, genre or language..."
            className="flex-1 bg-transparent text-base text-ink placeholder:text-ink-soft/70 focus:outline-none dark:text-cream dark:placeholder:text-pk-100/50"
          />
          <kbd className="hidden rounded-lg bg-sand/50 px-2 py-1 text-[11px] font-semibold text-ink-soft sm:inline-block dark:bg-white/10 dark:text-pk-100">
            ESC
          </kbd>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="rounded-full p-1 text-ink-soft hover:bg-sand/40 dark:text-pk-100 dark:hover:bg-white/10"
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3">
          <p className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-pk-100/70">
            {trimmed ? `Search Results (${results.length})` : 'Popular in Library'}
          </p>

          {results.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-base font-semibold text-pk-900 dark:text-gold-400">
                No matching books found
              </p>
              <p className="mt-1 text-sm text-ink-soft dark:text-pk-100/70">
                Try searching for &quot;Poetry&quot;, &quot;Urdu&quot;, &quot;Fiction&quot; or an author name.
              </p>
            </div>
          ) : (
            <ul className="space-y-1">
              {results.map((book) => (
                <li key={book.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(book)}
                    className="flex w-full items-center justify-between gap-3 rounded-2xl p-3 text-left transition-colors hover:bg-pk-50 dark:hover:bg-pk-900/60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-pk-800 to-pk-600 font-display text-xs font-bold text-white shadow-xs">
                        {book.title.slice(0, 1)}
                      </div>
                      <div>
                        <p className="font-bold text-pk-900 dark:text-cream">
                          {book.title}
                          {book.titleUrdu && (
                            <span lang="ur" dir="rtl" className="ml-2 font-urdu text-base text-gold-500 font-semibold">
                              ({book.titleUrdu})
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-ink-soft dark:text-pk-100/70">
                          {book.author} • {book.year}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge tone="plum">{book.genre}</Badge>
                      <Badge tone="blue">{book.language}</Badge>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Modal Footer */}
        <div className="flex items-center justify-between border-t border-sand/50 bg-cream/50 px-5 py-3 text-xs text-ink-soft dark:border-pk-800/80 dark:bg-pk-950/70 dark:text-pk-100/70">
          <span>Tip: Press Ctrl + K or Cmd + K anywhere to open search</span>
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate(trimmed ? `/explore?q=${encodeURIComponent(trimmed)}` : '/explore');
            }}
            className="font-bold text-pk-700 hover:underline dark:text-gold-400"
          >
            See all in Explore &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

