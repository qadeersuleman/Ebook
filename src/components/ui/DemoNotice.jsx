// Shown on pages that list books, so nobody mistakes the demo data for real books.
export default function DemoNotice({ className = '' }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border border-gold-400/80 bg-gold-100/90 p-4 text-xs leading-relaxed text-ink shadow-xs sm:text-sm dark:border-gold-500/40 dark:bg-gold-500/10 dark:text-gold-200 ${className}`}
    >
      <span className="shrink-0 rounded-full bg-gold-400 px-2 py-0.5 text-[10px] font-black uppercase text-ink">
        Demo Mode
      </span>
      <p>
        Every book in this local version is a fictional demonstration entry created to showcase Pakistani literature formatting. No external reading or download links appear without verified rights authorization.
      </p>
    </div>
  );
}
