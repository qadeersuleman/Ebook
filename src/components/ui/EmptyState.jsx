import Icon from './Icon.jsx';

export default function EmptyState({ icon = 'book', title, message, action }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-sand/80 bg-white/70 px-6 py-14 text-center shadow-xs dark:border-pk-800 dark:bg-[#0c1a13]">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 shadow-xs dark:bg-gold-500/20 dark:text-gold-400">
        <Icon name={icon} className="h-8 w-8" />
      </span>
      <h2 className="mt-4 font-display text-xl font-bold text-pk-900 dark:text-cream">{title}</h2>
      {message && <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft dark:text-pk-100/70">{message}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
