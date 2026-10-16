import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useLibrary } from '../../context/useLibrary.js';

export default function Navbar({ onOpenSearch }) {
  const { totalItems, openCart, cartBump } = useCart();
  const { isUrdu, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useLibrary();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('navHome') },
    { to: '/explore', label: t('navStore') },
    { to: '/explore?sort=newest', label: t('navBestsellers') },
    { to: '/library', label: t('navLibrary'), badge: favorites.length },
    { to: '/about', label: t('navAbout') },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-sand/60 bg-white/95 backdrop-blur-md transition-colors dark:border-white/10 dark:bg-[#13111e]/95">
      {/* Top Mini Announcement Bar */}
      <div className="bg-gradient-to-r from-coral via-[#FA8469] to-peach px-4 py-2 text-center text-xs font-black text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] uppercase tracking-wider backdrop-blur-xs">Limited Offer</span>
          <span>
            {isUrdu
              ? 'موسمِ بہار کتاب میلہ: کوپن ILMORA20 سے 20 فیصد خصوصی رعایت حاصل کریں!'
              : 'Spring Book Fair: Use code ILMORA20 for 20% OFF your entire digital library!'}
          </span>
          <span className="hidden sm:inline">• ⚡ Instant Downloads</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/Ilmora.png"
              alt="Ilmora Logo"
              className="h-11 w-11 rounded-2xl object-contain shadow-md ring-2 ring-coral/20 transition-transform group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-black tracking-tight text-ink dark:text-white leading-none">
                <span className="text-coral">Il</span>
                <span className="text-peach-dark">mora</span>
              </span>
              <span className="text-[10px] font-black uppercase text-ink-soft dark:text-cream/70 tracking-widest mt-0.5">
                {t('brandTagline')}
              </span>
            </div>
          </Link>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative rounded-2xl px-4 py-2 text-xs font-black transition-all ${
                  isActive
                    ? 'bg-coral/15 text-coral dark:bg-coral/25'
                    : 'text-ink-soft hover:bg-sand/40 hover:text-ink dark:text-cream/80 dark:hover:bg-white/10 dark:hover:text-white'
                }`
              }
            >
              <span>{item.label}</span>
              {Boolean(item.badge) && item.badge > 0 && (
                <span className="ml-1.5 rounded-full bg-coral px-2 py-0.5 text-[10px] font-black text-white">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions: Search, Language, Theme, Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Open search"
            className="flex items-center gap-2 rounded-2xl border border-sand bg-cream/70 px-4 py-2 text-xs font-bold text-ink-soft hover:border-coral dark:border-white/10 dark:bg-white/5 dark:text-cream transition-colors shadow-xs"
          >
            <Icon name="search" className="h-4 w-4 text-coral" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden rounded-lg bg-white px-2 py-0.5 text-[10px] font-mono shadow-xs sm:inline dark:bg-white/10 font-bold">
              ⌘K
            </kbd>
          </button>

          {/* Language Switcher (Eng ⇋ اردو) */}
          <button
            type="button"
            onClick={toggleLanguage}
            title={isUrdu ? 'Switch to English' : 'اردو میں دیکھیں'}
            className="flex items-center gap-1 rounded-2xl border border-sand bg-white px-3.5 py-2 text-xs font-black text-ink shadow-xs transition-transform hover:scale-105 hover:border-coral dark:border-white/10 dark:bg-white/5 dark:text-cream"
          >
            <span>{isUrdu ? '🇵🇰 اردو' : '🇬🇧 Eng'}</span>
          </button>

          {/* Dark / Light Mode Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sand bg-white text-ink shadow-xs transition-transform hover:scale-105 hover:text-coral dark:border-white/10 dark:bg-white/5 dark:text-cream"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-4 w-4 text-peach-dark" />
          </button>

          {/* Shopping Cart Button with Animated Bounce Badge */}
          <button
            type="button"
            onClick={openCart}
            aria-label="Open cart"
            className={`relative flex items-center gap-2 rounded-2xl bg-gradient-to-r from-coral to-peach px-5 py-2.5 text-xs font-black text-white shadow-ilmora transition-all hover:scale-105 active:scale-95 ${
              cartBump ? 'animate-cart-bump' : ''
            }`}
          >
            <Icon name="cart" className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-black text-coral shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-sand bg-white text-ink lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-cream"
          >
            <Icon name={mobileMenuOpen ? 'x' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-sand/60 bg-white px-4 py-4 lg:hidden dark:border-white/10 dark:bg-[#161322]">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold text-ink hover:bg-coral/10 dark:text-cream dark:hover:bg-white/10"
              >
                <span>{item.label}</span>
                {Boolean(item.badge) && item.badge > 0 && (
                  <span className="rounded-full bg-coral px-2 py-0.5 text-[10px] text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

