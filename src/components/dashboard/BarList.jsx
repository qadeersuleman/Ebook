import { BAR_COLORS } from '../../data/constants.js';

export default function BarList({ title, items, emptyText }) {
  const max = Math.max(1, ...items.map((item) => item.value));

  return (
    <section className="rounded-3xl bg-white p-6 shadow-xs ring-1 ring-sand/80 dark:bg-[#0d1a13] dark:ring-pk-800">
      <h2 className="text-lg font-extrabold text-pk-900 dark:text-cream">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-ink-soft dark:text-pk-100/70">{emptyText}</p>
      ) : (
        <ul className="mt-5 space-y-3.5">
          {items.map((item, index) => (
            <li key={item.label}>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-ink dark:text-white">{item.label}</span>
                <span className="text-xs font-semibold text-ink-soft dark:text-pk-100/70">
                  {item.value} {item.value === 1 ? 'book' : 'books'}
                </span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-sand/60 dark:bg-white/10" aria-hidden="true">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${BAR_COLORS[index % BAR_COLORS.length]}`}
                  style={{ width: `${(item.value / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
