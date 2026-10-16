import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookGrid from '../components/books/BookGrid.jsx';
import FilterBar from '../components/books/FilterBar.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import BookGridSkeleton from '../components/ui/Skeleton.jsx';
import Icon from '../components/ui/Icon.jsx';
import { useLibrary } from '../context/useLibrary.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { filterBooks } from '../utils/filterBooks.js';
import { pluralize } from '../utils/format.js';

export default function ExplorePage() {
  useDocumentTitle('All E-Books Catalog - Ilmora');
  const { books, booksLoading } = useLibrary();
  const { t, isUrdu } = useLanguage();
  const [params, setParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const values = {
    q: params.get('q') || '',
    language: params.get('language') || '',
    genre: params.get('genre') || '',
    sort: params.get('sort') || 'title',
  };
  const hasFilters = Boolean(values.q || values.language || values.genre);

  const handleChange = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && !(key === 'sort' && value === 'title')) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const handleClear = () => {
    const next = new URLSearchParams();
    if (values.sort !== 'title') next.set('sort', values.sort);
    setParams(next, { replace: true });
  };

  const results = useMemo(
    () => filterBooks(books, values),
    [books, values.q, values.language, values.genre, values.sort],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Ilmora Bookstore"
        title={isUrdu ? 'تمام ڈیجیٹل کتب • ای بکس کلیکشن' : 'Explore All Digital E-Books'}
        subtitle={
          isUrdu
            ? 'اردو، انگریزی اور پاکستان کی علاقائی زبانوں میں بہترین کتب فوری ڈاؤن لوڈ اور مطالعے کے لیے دستیاب ہیں۔'
            : 'Browse through our curated collection of fiction, poetry, history, and classics with instant digital download.'
        }
      />

      <FilterBar
        values={values}
        onChange={handleChange}
        onClear={handleClear}
        hasFilters={hasFilters}
      />

      {/* Control Bar: Result count + Grid/List View Toggles */}
      <div className="flex items-center justify-between border-b border-sand/40 pb-4 dark:border-white/10">
        <div className="flex items-center gap-2">
          <p role="status" aria-live="polite" className="text-sm font-bold text-ink dark:text-white">
            {results.length} {pluralize(results.length, 'book', 'books')} found
          </p>
          {hasFilters && (
            <span className="rounded-full bg-coral/15 px-2.5 py-0.5 text-xs font-bold text-coral">
              Filtered
            </span>
          )}
        </div>

        {/* View Switcher: Grid vs List */}
        <div className="flex items-center gap-1 rounded-2xl border border-sand bg-white p-1 shadow-xs dark:border-white/10 dark:bg-white/5">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
            title="Grid view"
            className={`rounded-xl p-1.5 transition-colors ${
              viewMode === 'grid'
                ? 'bg-ilmora text-white shadow-xs'
                : 'text-ink-soft hover:bg-sand/30 dark:text-cream dark:hover:bg-white/10'
            }`}
          >
            <Icon name="grid" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            aria-label="List view"
            title="List view"
            className={`rounded-xl p-1.5 transition-colors ${
              viewMode === 'list'
                ? 'bg-ilmora text-white shadow-xs'
                : 'text-ink-soft hover:bg-sand/30 dark:text-cream dark:hover:bg-white/10'
            }`}
          >
            <Icon name="list" className="h-4 w-4" />
          </button>
        </div>
      </div>

      {booksLoading ? (
        <BookGridSkeleton count={8} />
      ) : (
        <>
          {results.length > 0 ? (
            <BookGrid books={results} layout={viewMode} />
          ) : (
            <EmptyState
              icon="search"
              title="No books match your search"
              message="Try searching for a different keyword or resetting your filters."
              action={
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-full bg-ilmora px-6 py-2.5 text-xs font-bold text-white shadow-ilmora"
                >
                  Clear All Filters
                </button>
              }
            />
          )}
        </>
      )}
    </div>
  );
}
