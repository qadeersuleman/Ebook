export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-widest text-truck-600 dark:text-gold-400">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 font-display text-3xl font-extrabold text-pk-900 sm:text-4xl dark:text-cream">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft dark:text-pk-100/80">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </header>
  );
}
