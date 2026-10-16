import { useState } from 'react';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import { useLibrary } from '../context/useLibrary.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function AboutPage() {
  useDocumentTitle('About Ilmora - Mission & Digital Licensing');
  const { resetAll } = useLibrary();
  const { isUrdu } = useLanguage();
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);

  const handleReset = () => {
    resetAll();
    setConfirming(false);
    setDone(true);
  };

  return (
    <div className="max-w-3xl space-y-10">
      <PageHeader
        eyebrow="Ilmora Mission"
        title={isUrdu ? 'علمورا کے بارے میں • ہمارا مشن' : 'About Ilmora (علمورا)'}
        subtitle={
          isUrdu
            ? 'پاکستان کے ادبی ورثے اور علاقائی زبانوں کی ترویج کے لیے وقف ایک پریمیم ڈیجیٹل کتب خانہ۔'
            : 'Dedicated to preserving, celebrating, and digitizing Pakistani literature, poetry, and regional languages for readers everywhere.'
        }
      />

      <section className="space-y-4 rounded-3xl border border-sand/80 bg-white p-6 shadow-xs sm:p-8 dark:border-white/10 dark:bg-[#161322]">
        <div className="flex items-center gap-3">
          <img
            src="/Ilmora.png"
            alt="Ilmora"
            className="h-12 w-12 rounded-2xl object-contain shadow-sm"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div>
            <h2 className="font-display text-xl font-bold text-ink dark:text-white">
              The Ilmora Vision
            </h2>
            <p className="text-xs font-semibold text-coral">
              Knowledge, Literature & Modern Reader Experience
            </p>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-ink/80 dark:text-cream/80 sm:text-sm">
          Ilmora was created with a singular focus: to offer an engaging, visually stunning, and culturally authentic digital bookstore for Urdu, English, Punjabi, Sindhi, Pashto, Balochi, and Saraiki literature. We blend contemporary typography with classic Nastaliq script to make reading seamless on mobile, tablet, and desktop screens.
        </p>
      </section>

      <section className="space-y-3 rounded-3xl border border-sand/80 bg-cream/60 p-6 shadow-xs sm:p-8 dark:border-white/10 dark:bg-white/5">
        <h3 className="text-base font-bold text-ink dark:text-white">
          Digital Delivery & Formats
        </h3>
        <p className="text-xs leading-relaxed text-ink-soft dark:text-cream/70 sm:text-sm">
          Every edition purchased on Ilmora comes in high-quality DRM-friendly formats (standard ePub for Apple Books/Kobo, and universal PDF for computers/tablets), ensuring you have lifetime ownership of your purchased literature without restrictive vendor lock-in.
        </p>
      </section>

      <section className="space-y-4 rounded-3xl border border-sand/80 bg-white p-6 shadow-xs sm:p-8 dark:border-white/10 dark:bg-[#161322]">
        <h3 className="text-base font-bold text-ink dark:text-white">
          In-Browser Data & Privacy Controls
        </h3>
        <p className="text-xs leading-relaxed text-ink-soft dark:text-cream/70 sm:text-sm">
          Your personal cart, reading progress, and wishlist favorites are kept private on your device using browser local storage.
        </p>

        {confirming ? (
          <div role="alertdialog" aria-label="Confirm reset" className="flex flex-wrap items-center gap-3 pt-2">
            <p className="text-xs font-bold text-coral">
              Are you sure? This will clear your saved library shelf, cart, and goals on this device.
            </p>
            <Button variant="danger" size="sm" onClick={handleReset}>
              Yes, Reset Local Data
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setDone(false);
              setConfirming(true);
            }}
          >
            Reset In-Browser Library Data
          </Button>
        )}

        {done && (
          <p role="status" className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            ✓ Your local browser data has been reset to defaults.
          </p>
        )}
      </section>
    </div>
  );
}
