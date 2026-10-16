import BarList from '../components/dashboard/BarList.jsx';
import ContinueReading from '../components/dashboard/ContinueReading.jsx';
import GoalCard from '../components/dashboard/GoalCard.jsx';
import StatCard from '../components/dashboard/StatCard.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Icon from '../components/ui/Icon.jsx';
import { useLibrary } from '../context/useLibrary.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { formatNumber } from '../utils/format.js';

export default function DashboardPage() {
  useDocumentTitle('Reader Dashboard - Kitabistan');
  const { books, booksLoading, stats, getEntry } = useLibrary();

  if (booksLoading) {
    return (
      <div role="status" className="animate-pulse space-y-6">
        <span className="sr-only">Loading your dashboard...</span>
        <div className="h-10 w-64 rounded-xl bg-sand dark:bg-pk-900" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="h-28 rounded-3xl bg-sand/80 dark:bg-pk-900" />
          ))}
        </div>
      </div>
    );
  }

  const readingNow = books.filter((book) => {
    const entry = getEntry(book.id);
    return entry && entry.status === 'reading';
  });
  const hasActivity = stats.inLibrary > 0;

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Reader Dashboard"
        title="السلام علیکم، قاری • Assalam-o-Alaikum, Reader"
        subtitle="A private overview of your reading life, milestones and literary habits saved securely on this device."
      />

      {!hasActivity ? (
        <EmptyState
          icon="chart"
          title="Your reader dashboard is ready to begin"
          message="Mark any book as reading, finished, or favorite to see your personal reading analytics here."
          action={<Button to="/explore" variant="gold">Find a Book to Start</Button>}
        />
      ) : (
        <>
          {/* Top 4 Stat Cards */}
          <section aria-label="Reading statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon="library" label="Books in My Library" value={stats.inLibrary} />
            <StatCard icon="book" label="Currently Reading" value={stats.reading} tone="bg-gold-100 text-gold-700 dark:bg-gold-500/20 dark:text-gold-400" />
            <StatCard icon="check" label="Finished Reads" value={stats.finished} tone="bg-tile-100 text-tile-700 dark:bg-tile-500/20 dark:text-tile-300" />
            <StatCard icon="heart" label="Favorite Titles" value={stats.favorites} tone="bg-truck-100 text-truck-700 dark:bg-truck-500/20 dark:text-truck-300" />
          </section>

          {/* Goal & Milestone Overview */}
          <div className="grid gap-6 lg:grid-cols-3">
            <GoalCard />

            <div className="rounded-3xl bg-white p-6 shadow-xs ring-1 ring-sand/80 dark:bg-[#0d1a13] dark:ring-pk-800">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-ink-soft dark:text-pk-100">
                  Total Pages Read
                </h2>
                <Icon name="bookOpen" className="h-5 w-5 text-plum-500" />
              </div>
              <p className="mt-3 text-4xl font-extrabold tracking-tight text-plum-600 dark:text-plum-400">
                {formatNumber(stats.pagesRead)}
              </p>
              <p className="mt-1 text-xs text-ink-soft dark:text-pk-100/70">
                accumulated across finished and current books
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xs ring-1 ring-sand/80 dark:bg-[#0d1a13] dark:ring-pk-800">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-ink-soft dark:text-pk-100">
                  Waiting on Shelf
                </h2>
                <Icon name="bookmark" className="h-5 w-5 text-tile-500" />
              </div>
              <p className="mt-3 text-4xl font-extrabold tracking-tight text-tile-600 dark:text-tile-400">
                {stats.want}
              </p>
              <p className="mt-1 text-xs text-ink-soft dark:text-pk-100/70">
                books queued in your want-to-read list
              </p>
            </div>
          </div>

          {/* Active Reading Shelf */}
          <ContinueReading books={readingNow} headingId="dash-continue-heading" />

          {/* Reading Breakdown by Genre and Language */}
          <div className="grid gap-6 md:grid-cols-2">
            <BarList
              title="Reading by Genre"
              items={stats.byGenre}
              emptyText="Start or finish a book to reveal your reading genres."
            />
            <BarList
              title="Reading by Language"
              items={stats.byLanguage}
              emptyText="Read across languages to reveal your linguistic journey."
            />
          </div>
        </>
      )}
    </div>
  );
}
