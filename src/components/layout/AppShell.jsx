import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import CartDrawer from '../cart/CartDrawer.jsx';
import CheckoutModal from '../cart/CheckoutModal.jsx';
import QuickSearchModal from '../common/QuickSearchModal.jsx';
import BookModal from '../books/BookModal.jsx';
import Icon from '../ui/Icon.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function AppShell() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeModalBook, setActiveModalBook] = useState(null);
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const { toast } = useCart();
  const { t, isUrdu } = useLanguage();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (mainRef.current) mainRef.current.focus({ preventScroll: true });
  }, [pathname]);

  // Global event listeners
  useEffect(() => {
    const handleOpenBookModal = (e) => {
      if (e.detail) setActiveModalBook(e.detail);
    };
    const handleOpenQuickSearch = () => {
      setSearchOpen(true);
    };

    window.addEventListener('open-book-modal', handleOpenBookModal);
    window.addEventListener('open-quick-search', handleOpenQuickSearch);
    return () => {
      window.removeEventListener('open-book-modal', handleOpenBookModal);
      window.removeEventListener('open-quick-search', handleOpenQuickSearch);
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink transition-colors duration-200 dark:bg-[#121019] dark:text-[#f8f6f0]">
      {/* Toast Notification Notification Banner */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-ink/95 px-5 py-3 text-xs font-bold text-white shadow-2xl backdrop-blur-md animate-bounce sm:text-sm dark:bg-white dark:text-ink"
        >
          <span>{toast.message}</span>
        </div>
      )}

      {/* Modern Global Navbar */}
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Container */}
      <main
        id="main"
        ref={mainRef}
        tabIndex={-1}
        className="mx-auto max-w-7xl px-4 py-8 focus:outline-none sm:px-6 lg:px-8 lg:py-10"
      >
        <Outlet />
      </main>

      {/* Slide-over Shopping Cart */}
      <CartDrawer />

      {/* Instant Checkout Modal */}
      <CheckoutModal />

      {/* Global Book Sample Reader Modal */}
      <BookModal
        book={activeModalBook}
        onClose={() => setActiveModalBook(null)}
      />

      {/* Global Quick Search Modal */}
      <QuickSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectBook={(book) => setActiveModalBook(book)}
      />

      {/* Luxury E-Commerce Footer */}
      <Footer />
    </div>
  );
}
