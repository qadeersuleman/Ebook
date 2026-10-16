const TONES = {
  neutral: 'bg-sand/70 text-ink dark:bg-white/10 dark:text-pk-100',
  green: 'bg-pk-100 text-pk-900 dark:bg-pk-800/60 dark:text-pk-100',
  gold: 'bg-gold-100 text-ink dark:bg-gold-500/20 dark:text-gold-300',
  red: 'bg-truck-100 text-truck-700 dark:bg-truck-900/40 dark:text-truck-300',
  blue: 'bg-tile-100 text-tile-700 dark:bg-tile-900/40 dark:text-tile-300',
  plum: 'bg-plum-100 text-plum-700 dark:bg-plum-900/40 dark:text-plum-300',
};

export default function Badge({ tone = 'neutral', children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
