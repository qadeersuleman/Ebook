// Pure function: takes the book list and the filter values, returns the matching books.

export function filterBooks(books, { q = '', language = '', genre = '', sort = 'title' } = {}) {
  const query = q.trim().toLowerCase();

  const matches = books.filter((book) => {
    if (language && book.language !== language) return false;
    if (genre && book.genre !== genre) return false;
    if (!query) return true;

    const haystack = [
      book.title,
      book.titleUrdu || '',
      book.author,
      book.genre,
      book.language,
      ...(book.tags || []),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });

  const sorted = [...matches];
  if (sort === 'newest') sorted.sort((a, b) => b.addedOn.localeCompare(a.addedOn));
  else if (sort === 'year') sorted.sort((a, b) => b.year - a.year);
  else if (sort === 'short') sorted.sort((a, b) => a.pages - b.pages);
  else sorted.sort((a, b) => a.title.localeCompare(b.title));

  return sorted;
}
