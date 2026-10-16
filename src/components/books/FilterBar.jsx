import { useId } from 'react';
import Icon from '../ui/Icon.jsx';
import Button from '../ui/Button.jsx';
import { GENRES, LANGUAGES, SORT_OPTIONS } from '../../data/constants.js';

export default function FilterBar({ values, onChange, onClear, hasFilters }) {
  const searchId = useId();
  const languageId = useId();
  const sortId = useId();

  return (
    <section
      aria-label="Search and filters"
      className="mb-8 rounded-3xl bg-white p-4 ring-1 ring-sand/80 shadow-xs sm:p-6 dark:bg-[#0c1a13] dark:ring-pk-800"
    >
      <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
        {/* Search Input with quick clear */}
        <div>
          <label htmlFor={searchId} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-pk-100">
            Search books
          </label>
          <div className="relative">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/70 dark:text-pk-100/60"
            />
            <input
              id={searchId}
              type="search"
              value={values.q}
              onChange={(event) => onChange('q', event.target.value)}
              placeholder="Title, author, or keyword..."
              className="w-full rounded-2xl border border-sand bg-cream/70 py-2.5 pl-10 pr-9 text-sm text-ink placeholder:text-ink-soft/60 focus:border-pk-600 focus:bg-white focus:outline-none dark:border-pk-800 dark:bg-pk-950 dark:text-cream dark:focus:border-gold-400"
            />
            {values.q && (
              <button
                type="button"
                onClick={() => onChange('q', '')}
                aria-label="Clear search text"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-soft hover:bg-sand/40 dark:text-pk-100 dark:hover:bg-white/10"
              >
                <Icon name="x" className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Language Filter */}
        <div>
          <label htmlFor={languageId} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-pk-100">
            Language
          </label>
          <select
            id={languageId}
            value={values.language}
            onChange={(event) => onChange('language', event.target.value)}
            className="w-full rounded-2xl border border-sand bg-cream/70 px-4 py-2.5 text-sm text-ink focus:border-pk-600 focus:outline-none md:w-44 dark:border-pk-800 dark:bg-pk-950 dark:text-cream dark:focus:border-gold-400"
          >
            <option value="">All languages</option>
            {LANGUAGES.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label htmlFor={sortId} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-pk-100">
            Sort by
          </label>
          <select
            id={sortId}
            value={values.sort}
            onChange={(event) => onChange('sort', event.target.value)}
            className="w-full rounded-2xl border border-sand bg-cream/70 px-4 py-2.5 text-sm text-ink focus:border-pk-600 focus:outline-none md:w-48 dark:border-pk-800 dark:bg-pk-950 dark:text-cream dark:focus:border-gold-400"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Genre Filter Chips with smooth wrap */}
      <fieldset className="mt-5 border-t border-sand/40 pt-4 dark:border-pk-800/80">
        <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-pk-100">
          Genre Filter
        </legend>
        <div className="flex flex-wrap gap-2">
          {['', ...GENRES].map((genre) => {
            const active = values.genre === genre;
            return (
              <button
                key={genre || 'all'}
                type="button"
                aria-pressed={active}
                onClick={() => onChange('genre', genre)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  active
                    ? 'bg-pk-700 text-white shadow-xs dark:bg-gold-500 dark:text-ink'
                    : 'bg-pk-50/80 text-pk-900 hover:bg-pk-100 dark:bg-pk-950 dark:text-pk-100 dark:hover:bg-pk-900'
                }`}
              >
                {genre || 'All genres'}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Clear Filters Indicator */}
      {hasFilters && (
        <div className="mt-4 flex items-center justify-between border-t border-sand/40 pt-3 dark:border-pk-800/80">
          <span className="text-xs font-semibold text-ink-soft dark:text-pk-100/70">
            Active filters applied
          </span>
          <Button variant="ghost" size="sm" onClick={onClear}>
            <Icon name="x" className="h-4 w-4" />
            Reset all filters
          </Button>
        </div>
      )}
    </section>
  );
}
