import { NavLink } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { useLibrary } from '../../context/useLibrary.js';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function BottomNav({ onOpenSearch }) {
  const { stats } = useLibrary();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { to: '/', label: 'Home', icon: 'home', end: true },
    { to: '/explore', label: 'Explore', icon: 'compass' },
    { to: '/library', label: 'Library', icon: 'library', badge: stats.inLibrary },
    { to: '/dashboard', label: 'Stats', icon: 'chart' },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="glass-effect fixed inset-x-0 bottom-0 z-30 border-t border-sand/40 bg-white/90 px-3 py-2 shadow-2xl lg:hidden dark:border-pk-800/80 dark:bg-[#07150e]/95"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center py-1 text-center transition-all ${
                isActive
                  ? 'text-pk-700 dark:text-gold-400'
                  : 'text-ink-soft hover:text-pk-600 dark:text-pk-100/70 dark:hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon name={item.icon} className="h-5 w-5" />
                  {Boolean(item.badge) && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-extrabold text-ink">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[11px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 h-1 w-5 rounded-full bg-pk-600 dark:bg-gold-400" />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Quick Search Button */}
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="Open search dialog"
          className="flex flex-col items-center justify-center py-1 text-ink-soft hover:text-pk-600 dark:text-pk-100/70 dark:hover:text-white"
        >
          <Icon name="search" className="h-5 w-5" />
          <span className="text-[11px] font-medium mt-0.5">Search</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="flex flex-col items-center justify-center py-1 text-ink-soft hover:text-pk-600 dark:text-pk-100/70 dark:hover:text-white"
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-5 w-5 text-gold-500" />
          <span className="text-[11px] font-medium mt-0.5">{theme === 'dark' ? 'Noor' : 'Shab'}</span>
        </button>
      </div>
    </nav>
  );
}

