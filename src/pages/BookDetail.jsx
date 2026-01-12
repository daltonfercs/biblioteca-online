import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';
import { useAuth } from '../context/AuthContext';
import RentalButton from '../components/features/RentalButton';
import PageTitle from '../components/ui/PageTitle';

const BookDetail = () => {
  const { id } = useParams();
  const { getBook } = useBooks();
  const { user } = useAuth();
  const book = getBook(parseInt(id));

  if (!book) return <div>Libro no encontrado</div>;

  return (
    <div className="page-detail">
      <Link to="/catalogo">← Volver</Link>
      <div className="detail-container">
        <img src={book.cover_image || book.cover} alt={book.title} />
        <div>
           <PageTitle title={book.title} />
           <h3>{book.author}</h3>
           <p>{book.description}</p>
           <p>ISBN: {book.isbn}</p>
           <RentalButton book={book} />
           {user && user.email === 'demo@biblioteca.com' && (
             <Link to={`/editar-libro/${book.id}`} style={{
               display: 'inline-block',
               marginTop: 16,
               background: '#1976d2',
               color: 'white',
               padding: '0.5rem 1rem',
               borderRadius: 4,
               textDecoration: 'none',
               fontWeight: 500
             }}>
               Editar
             </Link>
           )}
        </div>
      </div>
    </div>
  );
};
export default BookDetail;