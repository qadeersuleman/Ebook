import { useId } from 'react';
import ProgressBar from '../ui/ProgressBar.jsx';
import Icon from '../ui/Icon.jsx';
import { useLibrary } from '../../context/useLibrary.js';
import { formatNumber, percent } from '../../utils/format.js';

export default function ReadingProgress({ book }) {
  const { getEntry, setPagesRead } = useLibrary();
  const inputId = useId();
  const entry = getEntry(book.id);
  if (!entry || entry.status !== 'reading') return null;

  const handleChange = (event) => {
    const raw = event.target.value;
    setPagesRead(book.id, raw === '' ? 0 : raw);
  };

  const handleStep = (step) => {
    const current = entry.pagesRead || 0;
    const next = Math.max(0, Math.min(book.pages, current + step));
    setPagesRead(book.id, next);
  };

  const pct = percent(entry.pagesRead, book.pages);

  return (
    <div className="rounded-2xl bg-white p-4.5 shadow-xs ring-1 ring-sand/80 dark:bg-[#0d1a13] dark:ring-pk-800">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={inputId} className="block text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-pk-100">
          Pages Read (out of {formatNumber(book.pages)})
        </label>
        <span className="text-xs font-black text-gold-600 dark:text-gold-400">
          {pct}% Complete
        </span>
      </div>

      <div className="mt-2.5 flex items-center gap-2">
        <input
          id={inputId}
          type="number"
          inputMode="numeric"
          min={0}
          max={book.pages}
          value={entry.pagesRead}
          onChange={handleChange}
          className="w-24 rounded-xl border border-sand bg-cream/60 px-3 py-1.5 text-sm font-bold text-ink focus:border-pk-600 focus:outline-none dark:border-pk-800 dark:bg-pk-950 dark:text-cream"
        />

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleStep(-10)}
            className="flex h-8 items-center gap-0.5 rounded-xl bg-sand/30 px-2 text-xs font-bold text-ink hover:bg-sand/60 dark:bg-white/10 dark:text-cream dark:hover:bg-white/20"
            title="Minus 10 pages"
          >
            <Icon name="minus" className="h-3.5 w-3.5" />
            <span>10</span>
          </button>
          <button
            type="button"
            onClick={() => handleStep(10)}
            className="flex h-8 items-center gap-0.5 rounded-xl bg-pk-50 px-2 text-xs font-bold text-pk-700 hover:bg-pk-100 dark:bg-pk-900/60 dark:text-gold-400 dark:hover:bg-pk-900"
            title="Plus 10 pages"
          >
            <Icon name="plus" className="h-3.5 w-3.5" />
            <span>10</span>
          </button>
        </div>
      </div>

      <div className="mt-3">
        <ProgressBar
          value={pct}
          label={`Reading progress for ${book.title}`}
          barClassName="bg-gold-500"
        />
        <p className="mt-1.5 text-[11px] text-ink-soft dark:text-pk-100/70">
          Reaching page {book.pages} automatically marks this book as finished.
        </p>
      </div>
    </div>
  );
}
