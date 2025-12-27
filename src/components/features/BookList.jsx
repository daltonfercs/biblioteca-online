import React from 'react';
import BookCard from './BookCard';
import EmptyState from '../ui/EmptyState';

const BookList = ({ books }) => {
  if (books.length === 0) return <EmptyState message="No se encontraron libros." />;
  
  return (
    <div className="book-list">
      {books.map(book => <BookCard key={book.id} book={book} />)}
    </div>
  );
};
export default BookList;