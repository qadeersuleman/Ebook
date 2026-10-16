import { useCallback, useEffect, useMemo, useState } from 'react';
import { BOOKS } from '../data/books.js';
import { STORAGE_KEY, VALID_ENTRY_STATUSES } from '../data/constants.js';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { computeStats } from '../utils/stats.js';
import { LibraryContext } from './libraryContextObject.js';

const BOOKS_BY_ID = Object.fromEntries(BOOKS.map((book) => [book.id, book]));

const DEFAULT_STATE = { version: 1, favorites: [], entries: {}, goal: 12 };

const asDateString = (value) => (typeof value === 'string' ? value : null);

// Cleans data read from localStorage so bad or old data can never break the app.
function sanitizeState(raw) {
  if (!raw || typeof raw !== 'object') return DEFAULT_STATE;

  const favorites = Array.isArray(raw.favorites)
    ? [...new Set(raw.favorites.filter((id) => typeof id === 'string' && BOOKS_BY_ID[id]))]
    : [];

  const entries = {};
  if (raw.entries && typeof raw.entries === 'object') {
    Object.entries(raw.entries).forEach(([id, entry]) => {
      if (!BOOKS_BY_ID[id] || !entry || !VALID_ENTRY_STATUSES.includes(entry.status)) return;
      const pagesRead = Number.isFinite(entry.pagesRead) ? Math.max(0, Math.floor(entry.pagesRead)) : 0;
      entries[id] = {
        status: entry.status,
        pagesRead: Math.min(pagesRead, BOOKS_BY_ID[id].pages),
        startedAt: asDateString(entry.startedAt),
        finishedAt: asDateString(entry.finishedAt),
        updatedAt: asDateString(entry.updatedAt) || new Date().toISOString(),
      };
    });
  }

  const goal =
    Number.isFinite(raw.goal) && raw.goal >= 1 && raw.goal <= 365 ? Math.floor(raw.goal) : 12;

  return { version: 1, favorites, entries, goal };
}

export function LibraryProvider({ children }) {
  const [state, setState] = useLocalStorage(STORAGE_KEY, DEFAULT_STATE, sanitizeState);

  // Books come from local data, but we load them with a short delay so the
  // loading skeletons are part of the app (and ready for a real API later).
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooks(BOOKS);
      setBooksLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = useCallback(
    (bookId) => {
      if (!BOOKS_BY_ID[bookId]) return;
      setState((prev) => {
        const isFav = prev.favorites.includes(bookId);
        return {
          ...prev,
          favorites: isFav ? prev.favorites.filter((id) => id !== bookId) : [...prev.favorites, bookId],
        };
      });
    },
    [setState],
  );

  const setStatus = useCallback(
    (bookId, status) => {
      const book = BOOKS_BY_ID[bookId];
      if (!book) return;
      setState((prev) => {
        const entries = { ...prev.entries };
        if (status === 'none') {
          delete entries[bookId];
          return { ...prev, entries };
        }
        if (!VALID_ENTRY_STATUSES.includes(status)) return prev;

        const now = new Date().toISOString();
        const old = entries[bookId];
        let pagesRead = old ? old.pagesRead : 0;
        let startedAt = old ? old.startedAt : null;
        let finishedAt = null;

        if (status === 'want') {
          pagesRead = 0;
          startedAt = null;
        } else if (status === 'reading') {
          startedAt = startedAt || now;
          pagesRead = Math.min(pagesRead, book.pages - 1);
        } else if (status === 'finished') {
          startedAt = startedAt || now;
          pagesRead = book.pages;
          finishedAt = old && old.finishedAt ? old.finishedAt : now;
        }

        entries[bookId] = { status, pagesRead, startedAt, finishedAt, updatedAt: now };
        return { ...prev, entries };
      });
    },
    [setState],
  );

  const setPagesRead = useCallback(
    (bookId, value) => {
      const book = BOOKS_BY_ID[bookId];
      if (!book) return;
      const pages = Math.max(0, Math.min(book.pages, Math.floor(Number(value) || 0)));
      setState((prev) => {
        const now = new Date().toISOString();
        const old = prev.entries[bookId];
        const finished = pages >= book.pages;
        return {
          ...prev,
          entries: {
            ...prev.entries,
            [bookId]: {
              status: finished ? 'finished' : 'reading',
              pagesRead: pages,
              startedAt: (old && old.startedAt) || now,
              finishedAt: finished ? (old && old.finishedAt) || now : null,
              updatedAt: now,
            },
          },
        };
      });
    },
    [setState],
  );

  const setGoal = useCallback(
    (value) => {
      const goal = Math.max(1, Math.min(365, Math.floor(Number(value) || 1)));
      setState((prev) => ({ ...prev, goal }));
    },
    [setState],
  );

  const resetAll = useCallback(() => setState(DEFAULT_STATE), [setState]);

  const stats = useMemo(() => computeStats(BOOKS, state), [state]);

  const value = useMemo(
    () => ({
      books,
      booksLoading,
      favorites: state.favorites,
      entries: state.entries,
      stats,
      isFavorite: (bookId) => state.favorites.includes(bookId),
      getEntry: (bookId) => state.entries[bookId] || null,
      toggleFavorite,
      setStatus,
      setPagesRead,
      setGoal,
      resetAll,
    }),
    [books, booksLoading, state, stats, toggleFavorite, setStatus, setPagesRead, setGoal, resetAll],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}
