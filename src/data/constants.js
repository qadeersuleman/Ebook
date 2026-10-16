// Shared constants. Change filter lists, labels and cover colours here.

export const STORAGE_KEY = 'kitabistan:v1';

export const LANGUAGES = ['Urdu', 'English', 'Punjabi', 'Sindhi', 'Pashto', 'Balochi', 'Saraiki'];

export const GENRES = [
  'Poetry',
  'Fiction',
  'Short Stories',
  'History',
  'Philosophy',
  'Children',
  'Biography',
  'Travel',
  'Science',
];

// Statuses a reader can give a book. "none" means the book is not tracked.
export const STATUS_OPTIONS = [
  { value: 'none', label: 'Not in my library' },
  { value: 'want', label: 'Want to read' },
  { value: 'reading', label: 'Reading' },
  { value: 'finished', label: 'Finished' },
];

export const STATUS_LABELS = {
  want: 'Want to read',
  reading: 'Reading',
  finished: 'Finished',
};

export const VALID_ENTRY_STATUSES = ['want', 'reading', 'finished'];

export const SORT_OPTIONS = [
  { value: 'title', label: 'Title (A to Z)' },
  { value: 'newest', label: 'Recently added' },
  { value: 'year', label: 'Newest publication' },
  { value: 'short', label: 'Shortest first' },
];

// Cover colour themes (truck-art and Multan-tile inspired). Books pick one with `coverTheme`.
export const COVER_THEMES = [
  { from: '#053b22', to: '#138a55', accent: '#f6a800', text: '#ffffff', badgeText: '#1e1b2e' },
  { from: '#a31b2a', to: '#d62839', accent: '#ffc233', text: '#ffffff', badgeText: '#1e1b2e' },
  { from: '#0f5568', to: '#1b7f99', accent: '#f6a800', text: '#ffffff', badgeText: '#1e1b2e' },
  { from: '#701961', to: '#a3248c', accent: '#ffc233', text: '#ffffff', badgeText: '#1e1b2e' },
  { from: '#f6a800', to: '#ffc233', accent: '#d62839', text: '#1e1b2e', badgeText: '#ffffff' },
  { from: '#1e1b2e', to: '#3b3560', accent: '#f6a800', text: '#ffffff', badgeText: '#1e1b2e' },
];

export const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/explore', label: 'Explore Books', icon: 'compass' },
  { to: '/library', label: 'My Library', icon: 'library' },
  { to: '/dashboard', label: 'Dashboard', icon: 'chart' },
  { to: '/about', label: 'About & Resources', icon: 'info' },
];

// Tailwind class strings must be written in full so Tailwind can find them.
export const TILE_COLORS = [
  'bg-pk-700 text-white',
  'bg-truck-500 text-white',
  'bg-tile-500 text-white',
  'bg-plum-500 text-white',
  'bg-gold-500 text-ink',
];

export const BAR_COLORS = ['bg-pk-500', 'bg-truck-500', 'bg-tile-500', 'bg-plum-500', 'bg-gold-500'];
