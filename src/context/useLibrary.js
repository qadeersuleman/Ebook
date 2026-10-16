import { useContext } from 'react';
import { LibraryContext } from './libraryContextObject.js';

// Use this in any component to read or change favorites, reading status, goal and stats.
export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) throw new Error('useLibrary must be used inside <LibraryProvider>');
  return context;
}
