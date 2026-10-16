import Icon from '../ui/Icon.jsx';
import { useLibrary } from '../../context/useLibrary.js';

export default function FavoriteButton({ book, showLabel = false }) {
  const { isFavorite, toggleFavorite } = useLibrary();
  const active = isFavorite(book.id);

  const base = 'inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all active:scale-90';
  const look = showLabel
    ? `px-4 py-2 text-xs sm:text-sm ${
        active
          ? 'bg-truck-500 text-white shadow-md hover:bg-truck-700'
          : 'bg-white text-truck-700 ring-1 ring-inset ring-truck-500/40 hover:bg-truck-100 dark:bg-pk-950 dark:text-truck-400 dark:ring-truck-500/50'
      }`
    : `h-8 w-8 shadow-md backdrop-blur-xs ${
        active
          ? 'bg-truck-500 text-white hover:bg-truck-700'
          : 'bg-white/95 text-truck-600 hover:bg-white dark:bg-pk-900/90 dark:text-truck-300'
      }`;

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={
        showLabel
          ? undefined
          : `${active ? 'Remove' : 'Add'} ${book.title} ${active ? 'from' : 'to'} favorites`
      }
      onClick={() => toggleFavorite(book.id)}
      className={`${base} ${look}`}
    >
      <Icon name="heart" className="h-4 w-4" fill={active ? 'currentColor' : 'none'} />
      {showLabel && (active ? 'Favorited' : 'Add to Favorites')}
    </button>
  );
}
