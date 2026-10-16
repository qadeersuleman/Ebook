// Safety gate for reading and download links.
// A link is only returned when the book is marked as authorized AND the URL is https.

function safeLink(link) {
  if (!link || typeof link.url !== 'string') return null;
  try {
    const url = new URL(link.url);
    return url.protocol === 'https:' ? link : null;
  } catch {
    return null;
  }
}

export function getAuthorizedLinks(book) {
  if (!book || !book.rights || book.rights.authorized !== true) {
    return { read: null, download: null };
  }
  return {
    read: safeLink(book.links && book.links.read),
    download: safeLink(book.links && book.links.download),
  };
}
