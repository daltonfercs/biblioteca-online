import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';
import RentalButton from '../components/features/RentalButton';
import PageTitle from '../components/ui/PageTitle';

const BookDetail = () => {
  const { id } = useParams();
  const { getBook } = useBooks();
  const book = getBook(parseInt(id));

  if (!book) return <div>Libro no encontrado</div>;

  return (
    <div className="page-detail">
      <Link to="/catalogo">← Volver</Link>
      <div className="detail-container">
        <img src={book.cover} alt={book.title} />
        <div>
           <PageTitle title={book.title} />
           <h3>{book.author}</h3>
           <p>{book.description}</p>
           <p>ISBN: {book.isbn}</p>
           <RentalButton book={book} />
        </div>
      </div>
    </div>
  );
};
export default BookDetail;