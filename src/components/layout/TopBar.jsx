import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function TopBar({ open, onMenu, onOpenSearch }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="glass-effect sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-pk-800/95 px-4 py-3 text-white shadow-md backdrop-blur-md lg:hidden dark:border-pk-800 dark:bg-[#07150e]/95">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="sidebar"
          className="rounded-xl p-2 transition-colors hover:bg-white/10"
        >
          <Icon name="menu" className="h-5 w-5" />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-extrabold tracking-tight text-gold-400">
            Kitabistan
          </span>
          <span lang="ur" dir="rtl" className="font-urdu text-base font-bold text-pk-100">
            کتابستان
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="Search books"
          className="rounded-xl p-2 transition-colors hover:bg-white/10 text-gold-400"
        >
          <Icon name="search" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="rounded-xl p-2 transition-colors hover:bg-white/10 text-gold-400"
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
