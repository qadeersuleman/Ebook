import { useEffect } from 'react';

// Sets the browser tab title so screen-reader and browser-history users know where they are.
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Kitabistan` : 'Kitabistan';
  }, [title]);
}
