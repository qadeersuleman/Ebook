// Pure function that turns the saved reader data into numbers for the Dashboard.

function tally(items, key) {
  const counts = {};
  items.forEach(({ book }) => {
    counts[book[key]] = (counts[book[key]] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));
}

export function computeStats(books, state, now = new Date()) {
  const byId = new Map(books.map((book) => [book.id, book]));

  const tracked = Object.entries(state.entries)
    .map(([id, entry]) => ({ book: byId.get(id), entry }))
    .filter((item) => item.book);

  const countStatus = (status) => tracked.filter((item) => item.entry.status === status).length;

  const pagesRead = tracked.reduce(
    (sum, { book, entry }) => sum + (entry.status === 'finished' ? book.pages : entry.pagesRead),
    0,
  );

  const year = now.getFullYear();
  const finishedThisYear = tracked.filter(
    ({ entry }) =>
      entry.status === 'finished' &&
      entry.finishedAt &&
      new Date(entry.finishedAt).getFullYear() === year,
  ).length;

  const started = tracked.filter(
    ({ entry }) => entry.status === 'reading' || entry.status === 'finished',
  );

  const favorites = state.favorites.filter((id) => byId.has(id));
  const libraryIds = new Set([...favorites, ...tracked.map(({ book }) => book.id)]);

  return {
    inLibrary: libraryIds.size,
    favorites: favorites.length,
    want: countStatus('want'),
    reading: countStatus('reading'),
    finished: countStatus('finished'),
    pagesRead,
    finishedThisYear,
    year,
    goal: state.goal,
    goalPercent: Math.min(100, Math.round((finishedThisYear / state.goal) * 100)),
    byGenre: tally(started, 'genre'),
    byLanguage: tally(started, 'language'),
  };
}
