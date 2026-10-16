import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { formatNumber } from '../../utils/format.js';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    total,
    totalItems,
    coupon,
    applyCoupon,
    openCheckout,
  } = useCart();
  const { t, isUrdu } = useLanguage();
  const [couponInput, setCouponInput] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) closeCart();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Prevent background scroll
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-heading"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className={`fixed inset-y-0 flex max-w-full ${
          isUrdu ? 'left-0' : 'right-0'
        }`}
      >
        <div className="flex w-screen max-w-md flex-col bg-white shadow-2xl transition-all dark:bg-[#161322] dark:text-cream">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sand/60 px-6 py-5 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-coral/15 text-coral dark:bg-coral/25">
                <Icon name="cart" className="h-5 w-5" />
              </span>
              <div>
                <h2 id="cart-heading" className="font-display text-lg font-bold text-ink dark:text-white">
                  {t('cartTitle')}
                </h2>
                <span className="text-xs font-semibold text-ink-soft dark:text-cream/70">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCart}
              aria-label="Close cart drawer"
              className="rounded-full p-2 text-ink-soft hover:bg-sand/40 hover:text-ink dark:text-cream/80 dark:hover:bg-white/10"
            >
              <Icon name="x" className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-sand/40 text-coral dark:bg-white/5">
                  <Icon name="cart" className="h-10 w-10 opacity-70" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink dark:text-white">
                  {t('cartEmpty')}
                </h3>
                <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-ink-soft dark:text-cream/70">
                  {t('cartExplorePrompt')}
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-6 rounded-full bg-ilmora px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:opacity-95"
                >
                  {t('exploreAll')} &rarr;
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-sand/40 dark:divide-white/10">
                {cart.map((item) => (
                  <li key={`${item.book.id}-${item.format}`} className="flex gap-4 py-4">
                    {/* Thumbnail Image */}
                    <div className="h-24 w-16 shrink-0 overflow-hidden rounded-xl bg-sand/50 shadow-sm">
                      <img
                        src={item.book.coverImage}
                        alt={item.book.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="truncate text-sm font-bold text-ink dark:text-white">
                            <Link to={`/book/${item.book.id}`} onClick={closeCart} className="hover:text-coral">
                              {item.book.title}
                            </Link>
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.book.id, item.format)}
                            title="Remove item"
                            className="text-ink-soft hover:text-truck-700 dark:text-cream/60 dark:hover:text-coral"
                          >
                            <Icon name="trash" className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="truncate text-xs text-ink-soft dark:text-cream/70">
                          {item.book.author}
                        </p>
                        <span className="mt-1 inline-block rounded-md bg-sand/60 px-2 py-0.5 text-[10px] font-bold text-ink-soft dark:bg-white/10 dark:text-cream/90">
                          Format: {item.format}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        {/* Quantity Stepper */}
                        <div className="flex items-center rounded-lg border border-sand bg-cream/70 p-0.5 dark:border-white/10 dark:bg-white/5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.book.id, -1, item.format)}
                            className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold text-ink-soft hover:bg-white hover:text-ink dark:text-cream/70 dark:hover:bg-white/10"
                            title="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="min-w-6 text-center text-xs font-bold text-ink dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.book.id, 1, item.format)}
                            className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold text-ink-soft hover:bg-white hover:text-ink dark:text-cream/70 dark:hover:bg-white/10"
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-sm font-black text-coral">
                            {t('currency')} {formatNumber(item.book.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="border-t border-sand/60 bg-cream/50 p-6 dark:border-white/10 dark:bg-black/20">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="mb-4 flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Coupon code (e.g. ILMORA20)"
                  className="flex-1 rounded-xl border border-sand bg-white px-3.5 py-2 text-xs text-ink placeholder:text-ink-soft/60 focus:border-coral focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-cream"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-ink px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 dark:bg-white/15 dark:hover:bg-white/25"
                >
                  Apply
                </button>
              </form>

              {coupon && (
                <div className="mb-3 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>Coupon &quot;{coupon}&quot; applied</span>
                  <span>-20% OFF</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-ink-soft dark:text-cream/70">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span>{t('currency')} {formatNumber(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between font-bold text-coral">
                    <span>{t('discount')}</span>
                    <span>- {t('currency')} {formatNumber(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[11px] text-emerald-600 dark:text-emerald-400">
                  <span>Delivery & Downloads</span>
                  <span>Free Instant E-Book</span>
                </div>
                <div className="flex justify-between border-t border-sand/60 pt-2 text-base font-extrabold text-ink dark:border-white/10 dark:text-white">
                  <span>{t('total')}</span>
                  <span className="text-coral">{t('currency')} {formatNumber(total)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                type="button"
                onClick={openCheckout}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-ilmora py-3 text-sm font-extrabold text-white shadow-ilmora transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Icon name="check" className="h-4 w-4" />
                <span>{t('checkout')} ({t('currency')} {formatNumber(total)})</span>
              </button>

              <p className="mt-2.5 text-center text-[10px] text-ink-soft/80 dark:text-cream/50">
                🔒 256-bit Encrypted Checkout • Instant Download on Order Confirmation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

