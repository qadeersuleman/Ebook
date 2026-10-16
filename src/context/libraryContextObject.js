import { createContext } from 'react';

// The empty context "box". LibraryProvider fills it, useLibrary reads it.
export const LibraryContext = createContext(null);
