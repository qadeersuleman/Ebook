import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function Footer() {
  const { t, isUrdu } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#0B0813] text-white transition-colors overflow-hidden">
      {/* Ambient Gradient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#DE7272]/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-[#FFCA88]/15 blur-[120px]"
      />

      {/* -------------------------------------------------------------
          1. TOP VALUE PROPOSITION / STORE PERKS STRIP
          ------------------------------------------------------------- */}
      <div className="relative border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Perk 1 */}
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#DE7272]/20 text-[#DE7272] shadow-inner ring-1 ring-[#DE7272]/30">
              <Icon name="zap" className="h-6 w-6" />
            </span>
            <div>
              <h4 className="text-sm font-black uppercase tracking-wider text-white">
                {t('perk1Title')}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-white/60">
                {t('perk1Desc')}
              </p>
            </div>
          </div>

          {/* Perk 2 */}
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFCA88]/20 text-[#FFCA88] shadow-inner ring-1 ring-[#FFCA88]/30">
              <Icon name="shieldCheck" className="h-6 w-6" />
            </span>
            <div>
              <h4 className="text-sm font-black uppercase tracking-wider text-white">
                {t('perk2Title')}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-white/60">
                {t('perk2Desc')}
              </p>
            </div>
          </div>

          {/* Perk 3 */}
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 shadow-inner ring-1 ring-emerald-500/30">
              <Icon name="bookOpen" className="h-6 w-6" />
            </span>
            <div>
              <h4 className="text-sm font-black uppercase tracking-wider text-white">
                {t('perk3Title')}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-white/60">
                {t('perk3Desc')}
              </p>
            </div>
          </div>

          {/* Perk 4 */}
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400 shadow-inner ring-1 ring-purple-500/30">
              <Icon name="sparkles" className="h-6 w-6" />
            </span>
            <div>
              <h4 className="text-sm font-black uppercase tracking-wider text-white">
                {t('perk4Title')}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-white/60">
                {t('perk4Desc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          2. NEWSLETTER VIP CLUB IN FOOTER
          ------------------------------------------------------------- */}
      <div className="relative border-b border-white/10 bg-gradient-to-r from-[#171126] via-[#100C1B] to-[#171126] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DE7272]/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#DE7272]">
              🎁 Reader Club Special
            </span>
            <h3 className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">
              {isUrdu ? 'نئے ایڈیشنز اور خصوصی رعایت حاصل کریں' : 'Join 15,000+ Pakistani Book Lovers'}
            </h3>
            <p className="mt-1 text-xs text-white/70">
              {isUrdu
                ? 'اپنا ای میل درج کریں اور پہلے آرڈر پر کوپن ILMORA20 سے 20% رعایت پائیں۔'
                : 'Subscribe to receive weekly literary picks and use coupon code ILMORA20 for 20% OFF.'}
            </p>
          </div>

          <div className="w-full max-w-md">
            {subscribed ? (
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center text-xs font-bold text-emerald-300">
                🎉 Welcome to Ilmora VIP! Use code <span className="font-black underline">ILMORA20</span> at checkout.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold text-white placeholder:text-white/40 focus:border-[#DE7272] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-gradient-to-r from-[#DE7272] to-[#FFCA88] px-6 py-3 text-xs font-black text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          3. MAIN FOOTER SITEMAP & BRAND PRESENTATION
          ------------------------------------------------------------- */}
      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column (Spans 2 columns on lg) */}
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src="/Ilmora.png"
                alt="Ilmora Brand Logo"
                className="h-12 w-12 rounded-2xl object-contain shadow-lg ring-2 ring-white/10 transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="font-display text-3xl font-black tracking-tight text-white">
                  <span className="text-[#DE7272]">Il</span>
                  <span className="text-[#FFCA88]">mora</span>
                </span>
                <span className="text-[11px] font-bold text-white/50 tracking-widest uppercase">
                  Digital Bookstore • علمورا
                </span>
              </div>
            </Link>

            <p className="max-w-md text-xs leading-relaxed text-white/70">
              {isUrdu
                ? 'علمورا پاکستان کا جدید ترین ڈیجیٹل کتب خانہ اور ای بکس اسٹور ہے۔ ہمارا مقصد اردو، انگریزی اور علاقائی زبانوں کے نایاب اور شاہکار ادب کو ہر قاری تک آسان اور باوقار انداز میں پہنچانا ہے۔'
                : 'Ilmora is Pakistan\'s premier digital bookstore and literary library, bringing Urdu, English, and regional masterpieces to readers worldwide with instant digital downloads.'}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Community"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/80 transition-colors hover:bg-emerald-500 hover:text-white"
              >
                <span className="text-xs font-bold">WA</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/80 transition-colors hover:bg-[#DE7272] hover:text-white"
              >
                <span className="text-xs font-bold">IG</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter X"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/80 transition-colors hover:bg-sky-500 hover:text-white"
              >
                <span className="text-xs font-bold">X</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/80 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <span className="text-xs font-bold">FB</span>
              </a>
            </div>
          </div>

          {/* Column 1: Explore Genres */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              {isUrdu ? 'اصنافِ ادب' : 'Explore Genres'}
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-white/60">
              <li>
                <Link to="/explore?genre=Fiction" className="transition-colors hover:text-[#DE7272]">
                  Urdu & English Fiction
                </Link>
              </li>
              <li>
                <Link to="/explore?genre=Poetry" className="transition-colors hover:text-[#DE7272]">
                  Poetry & Ghazals (شاعری)
                </Link>
              </li>
              <li>
                <Link to="/explore?genre=Philosophy" className="transition-colors hover:text-[#DE7272]">
                  Sufism & Philosophy
                </Link>
              </li>
              <li>
                <Link to="/explore?genre=History" className="transition-colors hover:text-[#DE7272]">
                  History & Biographies
                </Link>
              </li>
              <li>
                <Link to="/explore?genre=Short+Stories" className="transition-colors hover:text-[#DE7272]">
                  Short Stories (افسانے)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Bookstore Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              {isUrdu ? 'اسٹور اور خدمات' : 'Store & Services'}
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-white/60">
              <li>
                <Link to="/explore" className="transition-colors hover:text-[#FFCA88]">
                  All E-Books Catalog
                </Link>
              </li>
              <li>
                <Link to="/explore?sort=newest" className="transition-colors hover:text-[#FFCA88]">
                  Bestsellers & New Releases
                </Link>
              </li>
              <li>
                <Link to="/library" className="transition-colors hover:text-[#FFCA88]">
                  My Reading Shelf
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-[#FFCA88]">
                  Publish with Ilmora
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-[#FFCA88]">
                  Licensing & Royalties
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support & Trust */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              {isUrdu ? 'مدد اور رہنمائی' : 'Help & Support'}
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-white/60">
              <li>
                <span className="text-white/40 block">Digital Format:</span>
                <span className="text-white/80 font-semibold">ePub & PDF (DRM-Free)</span>
              </li>
              <li className="pt-1">
                <span className="text-white/40 block">Helpline WhatsApp:</span>
                <span className="text-white/80 font-semibold">+92 300 1234567</span>
              </li>
              <li className="pt-1">
                <span className="text-white/40 block">Email:</span>
                <span className="text-white/80 font-semibold">support@ilmora.pk</span>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
                  ● 24/7 Support Online
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* -------------------------------------------------------------
            4. PAYMENT GATEWAY BADGES (PAKISTAN FOCUS)
            ------------------------------------------------------------- */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-white">
                100% Secure Pakistani & Global Payments
              </p>
              <p className="text-[11px] text-white/50">
                Instant digital fulfillment verified by State Bank of Pakistan standards
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-xl bg-[#E21A22] px-3 py-1 text-xs font-black text-white shadow-sm">
                JazzCash
              </span>
              <span className="rounded-xl bg-[#00A859] px-3 py-1 text-xs font-black text-white shadow-sm">
                EasyPaisa
              </span>
              <span className="rounded-xl bg-[#00B4D8] px-3 py-1 text-xs font-black text-white shadow-sm">
                SadaPay
              </span>
              <span className="rounded-xl bg-[#FF6B00] px-3 py-1 text-xs font-black text-white shadow-sm">
                NayaPay
              </span>
              <span className="rounded-xl bg-[#1A1F71] px-3 py-1 text-xs font-black text-white shadow-sm">
                VISA
              </span>
              <span className="rounded-xl bg-[#EB001B] px-3 py-1 text-xs font-black text-white shadow-sm">
                MasterCard
              </span>
              <span className="rounded-xl bg-[#1E3A8A] px-3 py-1 text-xs font-black text-white shadow-sm">
                Raast Pay
              </span>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            5. COPYRIGHT & BOTTOM CREDITS
            ------------------------------------------------------------- */}
        <div className="mt-10 flex flex-col items-center justify-between border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Ilmora (علمورا). All Rights Reserved.</p>
          <p className="mt-2 text-center sm:mt-0">
            Crafted with passion for Urdu & Pakistani Literature 🇵🇰 • Karachi • Lahore • Islamabad
          </p>
        </div>
      </div>
    </footer>
  );
}

