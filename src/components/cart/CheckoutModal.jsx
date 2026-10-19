import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { formatNumber } from '../../utils/format.js';

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, cart, total, completePurchase } = useCart();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('easypaisa');
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Prevent body scroll only when checkout modal is actively open
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = `ILM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(id);
    setIsSuccess(true);
    completePurchase({ name: name || 'Valued Reader', email, phone, orderId: id });
  };

  const handleFinish = () => {
    setIsSuccess(false);
    closeCheckout();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-heading"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/75 backdrop-blur-md transition-opacity"
        onClick={closeCheckout}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-sand/80 dark:bg-[#161322] dark:text-cream dark:ring-white/10">
        {isSuccess ? (
          /* Order Success State */
          <div className="p-8 text-center sm:p-10">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-md dark:bg-emerald-500/20 dark:text-emerald-400">
              <Icon name="check" className="h-10 w-10" />
            </span>

            <h3 id="checkout-heading" className="mt-5 font-display text-2xl font-black text-ink dark:text-white">
              {t('orderSuccess')}
            </h3>

            <p className="mt-2 text-xs font-bold text-coral">
              Order Reference: #{orderId}
            </p>

            <p className="mt-3 text-xs leading-relaxed text-ink-soft dark:text-cream/75">
              Your digital e-books have been sent to <strong>{email || 'your email'}</strong> and added immediately to your personal shelf.
            </p>

            {/* Quick Action Downloads */}
            <div className="mt-6 rounded-2xl bg-cream/70 p-4 text-left dark:bg-white/5">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-cream/70">
                Ready to Read Instantly:
              </p>
              <ul className="mt-2.5 divide-y divide-sand/40 dark:divide-white/10">
                {cart.slice(0, 3).map((item) => (
                  <li key={item.book.id} className="flex items-center justify-between py-2 text-xs">
                    <span className="font-bold text-ink dark:text-white truncate max-w-xs">{item.book.title}</span>
                    <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                      Download Ready
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <Link
                to="/library"
                onClick={handleFinish}
                className="flex-1 rounded-2xl bg-ilmora py-3 text-xs font-extrabold text-white shadow-ilmora transition-all hover:opacity-95"
              >
                {t('viewInShelf')} &rarr;
              </Link>
              <button
                type="button"
                onClick={handleFinish}
                className="rounded-2xl border border-sand bg-white px-5 py-3 text-xs font-bold text-ink transition-colors hover:bg-sand/30 dark:border-white/10 dark:bg-white/5 dark:text-cream"
              >
                Back to Store
              </button>
            </div>
          </div>
        ) : (
          /* Order Checkout Form */
          <div>
            <div className="flex items-center justify-between border-b border-sand/60 px-6 py-4.5 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-coral/15 text-coral dark:bg-coral/25">
                  <Icon name="creditCard" className="h-4 w-4" />
                </span>
                <h3 id="checkout-heading" className="font-display text-base font-bold text-ink dark:text-white">
                  {t('checkoutTitle')}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeCheckout}
                aria-label="Close checkout"
                className="rounded-full p-1.5 text-ink-soft hover:bg-sand/40 dark:text-cream/80 dark:hover:bg-white/10"
              >
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-7">
              <div className="space-y-4">
                {/* Total Preview Pill */}
                <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-coral/10 to-peach/20 p-4 dark:from-coral/20 dark:to-peach/10">
                  <div>
                    <p className="text-xs font-bold text-ink-soft dark:text-cream/70">Total Amount Due:</p>
                    <p className="font-display text-2xl font-black text-coral">
                      {t('currency')} {formatNumber(total)}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ink shadow-xs dark:bg-white/15 dark:text-white">
                    {cart.length} Digital {cart.length === 1 ? 'Title' : 'Titles'}
                  </span>
                </div>

                {/* Name */}
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-cream/80">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Qadeer Khan"
                    className="w-full rounded-xl border border-sand bg-cream/50 px-4 py-2.5 text-xs font-semibold text-ink focus:border-coral focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-cream"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-cream/80">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="reader@gmail.com"
                    className="w-full rounded-xl border border-sand bg-cream/50 px-4 py-2.5 text-xs font-semibold text-ink focus:border-coral focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-cream"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-cream/80">
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full rounded-xl border border-sand bg-cream/50 px-4 py-2.5 text-xs font-semibold text-ink focus:border-coral focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-cream"
                  />
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-cream/80">
                    {t('paymentMethod')}
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                      { id: 'easypaisa', label: 'EasyPaisa', icon: '📱' },
                      { id: 'jazzcash', label: 'JazzCash', icon: '⚡' },
                      { id: 'card', label: 'Card / Debit', icon: '💳' },
                      { id: 'demo', label: 'Free Trial', icon: '🎁' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 text-center transition-all ${
                          paymentMethod === method.id
                            ? 'border-coral bg-coral/10 text-coral font-bold shadow-xs dark:bg-coral/20'
                            : 'border-sand bg-white text-ink-soft hover:bg-sand/30 dark:border-white/10 dark:bg-white/5 dark:text-cream/70'
                        }`}
                      >
                        <span className="text-lg">{method.icon}</span>
                        <span className="mt-1 text-[11px] font-bold">{method.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-ilmora py-3.5 text-sm font-extrabold text-white shadow-ilmora transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Icon name="shieldCheck" className="h-5 w-5" />
                <span>{t('confirmOrder')}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

