import { useEffect, useState } from 'react';

// Works like useState, but the value is saved in localStorage.
// `sanitize` cleans whatever was stored, so corrupted data never crashes the app.
export default function useLocalStorage(key, initialValue, sanitize = (value) => value) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? sanitize(JSON.parse(raw)) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be full or blocked (private mode). The app still works without saving.
    }
  }, [key, value]);

  return [value, setValue];
}
