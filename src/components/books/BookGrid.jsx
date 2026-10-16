import BookCard from './BookCard.jsx';

// Responsive grid or list used by Explore, My Library, Home and the details page.
export default function BookGrid({ books, layout = 'grid' }) {
  if (layout === 'list') {
    return (
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book.id}>
            <BookCard book={book} layout="list" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 2xl:grid-cols-5">
      {books.map((book) => (
        <li key={book.id}>
          <BookCard book={book} layout="grid" />
        </li>
      ))}
    </ul>
  );
}
