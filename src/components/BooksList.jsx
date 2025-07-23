import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../redux/booksSlice';
import SortDropdowns from './SortDropdowns';

function sortBooks(books, sortBy, sortOrder) {
  const sorted = [...books].sort((a, b) => {
    let valA = a[sortBy]?.toLowerCase() ?? '';
    let valB = b[sortBy]?.toLowerCase() ?? '';
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}

const BooksList = () => {
  const dispatch = useDispatch();
  const { items, loading, error, sortBy, sortOrder } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const sortedBooks = sortBooks(items, sortBy, sortOrder);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <SortDropdowns />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((book) => (
            <tr key={book.primary_isbn13}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.primary_isbn13}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
