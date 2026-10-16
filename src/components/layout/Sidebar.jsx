import { Link, NavLink } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import StripeBorder from '../ui/StripeBorder.jsx';
import { NAV_ITEMS } from '../../data/constants.js';
import { useLibrary } from '../../context/useLibrary.js';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function Sidebar({ open, onClose, onOpenSearch }) {
  const { stats } = useLibrary();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink/70 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-pk-900 text-white transition-all duration-300 lg:visible lg:translate-x-0 dark:border-pk-800 dark:bg-[#06140e] ${
          open ? 'visible translate-x-0' : 'invisible -translate-x-full'
        }`}
      >
        <StripeBorder className="h-2" />

        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 pb-3 pt-6">
          <Link to="/" onClick={onClose} className="group block">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500 font-display text-lg font-black text-ink shadow-md transition-transform group-hover:scale-105">
                ک
              </span>
              <div>
                <span className="font-display text-2xl font-extrabold tracking-tight text-gold-400 group-hover:text-gold-300">
                  Kitabistan
                </span>
                <span
                  lang="ur"
                  dir="rtl"
                  className="block font-urdu text-sm font-semibold leading-tight text-pk-100"
                >
                  کتابستان • بزمِ کتب
                </span>
              </div>
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="rounded-xl p-2 text-pk-100 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        {/* Search Bar Button in Sidebar */}
        <div className="px-4 pt-3 pb-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenSearch) onOpenSearch();
            }}
            className="flex w-full items-center justify-between rounded-xl bg-white/10 px-3.5 py-2.5 text-xs text-pk-100 transition-colors hover:bg-white/15 hover:text-white"
          >
            <div className="flex items-center gap-2.5">
              <Icon name="search" className="h-4 w-4 text-gold-400" />
              <span>Search books...</span>
            </div>
            <kbd className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-gold-300">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation Items */}
        <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-4 py-2">
          <ul className="space-y-1.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-gold-500 text-ink shadow-md font-bold'
                        : 'text-pk-100 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon name={item.icon} className="h-5 w-5" />
                        <span>{item.label}</span>
                      </div>
                      {item.to === '/library' && stats.inLibrary > 0 && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                            isActive ? 'bg-ink text-gold-400' : 'bg-white/15 text-pk-100'
                          }`}
                        >
                          {stats.inLibrary}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Goal Card in Sidebar */}
        <div className="m-4 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-inner backdrop-blur-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400">
                <Icon name="flame" className="h-3.5 w-3.5" />
                Yearly Goal
              </span>
              <span className="text-xs font-extrabold text-gold-300">{stats.goalPercent}%</span>
            </div>
            <p className="mt-1.5 text-sm font-medium">
              {stats.finishedThisYear} of {stats.goal} books finished
            </p>
            <div className="mt-2.5">
              <ProgressBar
                value={stats.goalPercent}
                label="Yearly reading goal progress"
                trackClassName="bg-white/20"
                barClassName="bg-gold-400"
              />
            </div>
          </div>

          {/* Day / Night Reading Mode Switcher in Sidebar */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-xl bg-white/5 px-4 py-2.5 text-xs font-semibold text-pk-100 transition-colors hover:bg-white/15 hover:text-white"
          >
            <div className="flex items-center gap-2">
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-4 w-4 text-gold-400" />
              <span>{theme === 'dark' ? 'Noor Mode (Light)' : 'Shab Mode (Night)'}</span>
            </div>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase font-bold text-gold-300">
              {theme === 'dark' ? 'نور' : 'شب'}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
