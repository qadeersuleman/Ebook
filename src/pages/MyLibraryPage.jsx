import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookGrid from '../components/books/BookGrid.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import BookGridSkeleton from '../components/ui/Skeleton.jsx';
import Icon from '../components/ui/Icon.jsx';
import { useLibrary } from '../context/useLibrary.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const TABS = [
  { id: 'all', label: 'All Saved', urdu: 'تمام کتب', empty: 'Your shelf is empty. Star a favorite or purchase an e-book to add it here.' },
  { id: 'favorites', label: 'Wishlist & Favorites', urdu: 'پسندیدہ', empty: 'No wishlist items yet. Tap the heart on any book to save it.' },
  { id: 'reading', label: 'Reading Now', urdu: 'زیرِ مطالعہ', empty: 'You are not reading anything right now. Pick an e-book to start reading.' },
  { id: 'want', label: 'Want to Read', urdu: 'خواہش', empty: 'Nothing on your want-to-read list yet. Browse our store and queue your reads.' },
  { id: 'finished', label: 'Completed Reads', urdu: 'مکمل شدہ', empty: 'No finished books yet. Your completed reads will appear here.' },
];

export default function MyLibraryPage() {
  useDocumentTitle('My Reading Shelf - Ilmora');
  const { books, booksLoading, favorites, entries } = useLibrary();
  const { t, isUrdu } = useLanguage();
  const [tab, setTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const inTab = (book, tabId) => {
    const entry = entries[book.id];
    const isFav = favorites.includes(book.id);
    if (tabId === 'all') return isFav || Boolean(entry);
    if (tabId === 'favorites') return isFav;
    return Boolean(entry) && entry.status === tabId;
  };

  const updatedAt = (book) => (entries[book.id] ? entries[book.id].updatedAt : '');
  const visible = books
    .filter((book) => inTab(book, tab))
    .sort((a, b) => updatedAt(b).localeCompare(updatedAt(a)) || a.title.localeCompare(b.title));

  const activeTab = TABS.find((item) => item.id === tab);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="My Shelf"
        title={isUrdu ? 'میری الماری • ذاتی ذخیرہ کتب' : 'My Reading Shelf & Library'}
        subtitle={
          isUrdu
            ? 'آپ کی خریدی گئی کتب، پسندیدہ فہرست اور مطالعے کی پیشرفت یہاں محفوظ ہے۔'
            : 'Access your purchased digital editions, wishlist favorites, and reading logs in one place.'
        }
      />

      {/* Tabs Bar with View Toggle */}
      <div className="flex flex-col gap-4 border-b border-sand/40 pb-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
        <div role="tablist" aria-label="Library shelves" className="flex flex-wrap gap-2">
          {TABS.map((item) => {
            const count = books.filter((book) => inTab(book, item.id)).length;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                  active
                    ? 'bg-ilmora text-white shadow-ilmora'
                    : 'border border-sand bg-white text-ink-soft hover:border-coral dark:border-white/10 dark:bg-white/5 dark:text-cream'
                }`}
              >
                <span>{item.label}</span>
                <span lang="ur" dir="rtl" className="hidden font-urdu text-xs opacity-90 sm:inline">
                  {item.urdu}
                </span>
                {!booksLoading && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[11px] font-black ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-sand/40 text-ink-soft dark:bg-white/10 dark:text-cream'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* View Switcher: Grid vs List */}
        <div className="flex self-end sm:self-auto items-center gap-1 rounded-2xl border border-sand bg-white p-1 shadow-xs dark:border-white/10 dark:bg-white/5">
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
        <BookGridSkeleton count={4} />
      ) : visible.length > 0 ? (
        <BookGrid books={visible} layout={viewMode} />
      ) : (
        <EmptyState
          icon="library"
          title="Nothing on this shelf"
          message={activeTab.empty}
          action={
            <Link
              to="/explore"
              className="rounded-full bg-ilmora px-6 py-2.5 text-xs font-bold text-white shadow-ilmora"
            >
              Browse Bookstore &rarr;
            </Link>
          }
        />
      )}
    </div>
  );
}
