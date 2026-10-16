import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import { getAuthorizedLinks } from '../../utils/links.js';

export default function BookLinks({ book }) {
  const { read, download } = getAuthorizedLinks(book);
  const { rights } = book;

  return (
    <section aria-labelledby="links-heading" className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-sand/80 dark:bg-[#0d1a13] dark:ring-pk-800">
      <h2 id="links-heading" className="text-base font-bold text-pk-900 dark:text-cream">
        Read or Download Edition
      </h2>

      {read || download ? (
        <div className="mt-3 flex flex-wrap gap-3">
          {read && (
            <Button href={read.url} variant="primary">
              <Icon name="external" className="h-4 w-4" />
              {read.label || 'Read Online'}
            </Button>
          )}
          {download && (
            <Button href={download.url} variant="gold">
              <Icon name="download" className="h-4 w-4" />
              {download.label || 'Download'}
              {download.format ? ` (${download.format})` : ''}
            </Button>
          )}
        </div>
      ) : (
        <p className="mt-2 text-xs leading-relaxed text-ink-soft dark:text-pk-100/70">
          No external reading or download link is linked for this title.
          {book.isDemo ? ' This is a fictional demonstration record created for Kitabistan.' : ''}
        </p>
      )}

      <dl className="mt-3.5 grid gap-1 border-t border-sand/40 pt-3 text-[11px] text-ink-soft dark:border-pk-800/60 dark:text-pk-100/70 sm:grid-cols-[auto_1fr] sm:gap-x-4">
        <dt className="font-bold text-ink dark:text-white">Licence</dt>
        <dd>{rights.license}</dd>
        <dt className="font-bold text-ink dark:text-white">Source</dt>
        <dd>{rights.sourceName}</dd>
      </dl>
    </section>
  );
}
