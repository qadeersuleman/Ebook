import { useId } from 'react';
import { STATUS_OPTIONS } from '../../data/constants.js';
import { useLibrary } from '../../context/useLibrary.js';

export default function StatusSelect({ book }) {
  const { getEntry, setStatus } = useLibrary();
  const selectId = useId();
  const current = getEntry(book.id);

  return (
    <div>
      <label htmlFor={selectId} className="mb-1 block text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-pk-100">
        Reading Shelf Status
      </label>
      <select
        id={selectId}
        value={current ? current.status : 'none'}
        onChange={(event) => setStatus(book.id, event.target.value)}
        className="w-full rounded-2xl border border-sand bg-white px-4 py-2 text-sm font-semibold text-ink shadow-xs focus:border-pk-600 focus:outline-none sm:w-60 dark:border-pk-800 dark:bg-pk-950 dark:text-cream dark:focus:border-gold-400"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
