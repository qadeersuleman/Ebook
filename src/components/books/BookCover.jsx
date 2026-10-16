import { COVER_THEMES } from '../../data/constants.js';

// Realistic 3D Hardcover art with spine depth, silk bookmark ribbon, and Mughal ornamental frame.
export default function BookCover({ book, size = 'md' }) {
  const theme = COVER_THEMES[book.coverTheme % COVER_THEMES.length];
  const titleSize = size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-base sm:text-lg';

  return (
    <div
      aria-hidden="true"
      className="book-spine-effect relative aspect-[2/3] w-full select-none overflow-hidden rounded-r-xl rounded-l-md shadow-xl transition-all duration-300"
      style={{
        backgroundImage: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)`,
        color: theme.text,
      }}
    >
      {/* Silk Bookmark Ribbon */}
      <div
        className="absolute -top-0.5 right-6 z-20 h-7 w-3.5 shadow-md"
        style={{
          backgroundColor: theme.accent,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
        }}
      />

      {/* Book Spine Crease & Highlight on Left */}
      <div className="absolute inset-y-0 left-0 z-10 w-3 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />
      <div className="absolute inset-y-0 left-3 z-10 w-[1.5px] bg-white/20 shadow-sm" />
      <div className="absolute inset-y-0 left-3.5 z-10 w-[1px] bg-black/30" />

      {/* Right Book Page Edge Trim */}
      <div className="absolute inset-y-0 right-0 z-10 w-1 bg-gradient-to-l from-black/25 to-transparent" />

      {/* Mughal / Islamic Geometric Pattern Texture */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,.35) 1px, transparent 1px), repeating-linear-gradient(45deg, rgba(255,255,255,.08) 0 2px, transparent 2px 14px)',
          backgroundSize: '16px 16px, auto',
        }}
      />

      {/* Ornate Gold Inset Border with Corner Accents */}
      <div
        className="absolute inset-2.5 rounded-md border"
        style={{ borderColor: `${theme.accent}99` }}
      >
        {/* Tiny decorative corner diamonds */}
        <span
          className="absolute -top-1 -left-1 h-2 w-2 rotate-45"
          style={{ backgroundColor: theme.accent }}
        />
        <span
          className="absolute -top-1 -right-1 h-2 w-2 rotate-45"
          style={{ backgroundColor: theme.accent }}
        />
        <span
          className="absolute -bottom-1 -left-1 h-2 w-2 rotate-45"
          style={{ backgroundColor: theme.accent }}
        />
        <span
          className="absolute -bottom-1 -right-1 h-2 w-2 rotate-45"
          style={{ backgroundColor: theme.accent }}
        />
      </div>

      {/* Front Cover Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-4 pl-6 sm:p-5 sm:pl-7">
        <div className="flex items-start justify-between gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-extrabold tracking-widest uppercase shadow-sm"
            style={{ backgroundColor: theme.accent, color: theme.badgeText }}
          >
            {book.language}
          </span>
          {book.isDemo && (
            <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase text-white/90 backdrop-blur-xs">
              Demo
            </span>
          )}
        </div>

        <div className="my-auto py-2">
          <p className={`font-display font-extrabold tracking-tight leading-tight ${titleSize} drop-shadow-sm`}>
            {book.title}
          </p>
          {book.titleUrdu && (
            <p
              lang="ur"
              dir="rtl"
              className="mt-2 text-right font-urdu text-xl font-bold leading-loose tracking-normal drop-shadow-sm opacity-95"
            >
              {book.titleUrdu}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/20 pt-2.5">
          <p className="truncate text-xs font-medium tracking-wide opacity-95">
            {book.author}
          </p>
          <span className="text-[10px] font-bold opacity-75">{book.year}</span>
        </div>
      </div>

      {/* Bottom Trim Accent Line */}
      <div className="absolute inset-x-0 bottom-0 h-1.5 shadow-xs" style={{ backgroundColor: theme.accent }} />
    </div>
  );
}
