import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRentals } from '../context/RentalsContext';
import { useBooks } from '../context/BooksContext';
import BookList from '../components/features/BookList';
import PageTitle from '../components/ui/PageTitle';
import EmptyState from '../components/ui/EmptyState';

const MyRentals = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { rentalIds } = useRentals();
  const { books } = useBooks();
  const myBooks = books.filter(b => rentalIds.includes(b.id));

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated()) {
    navigate('/login');
    return null;
  }

  return (
    <div className="page-rentals">
      <PageTitle title="Mis Alquileres Activos" />
      {myBooks.length > 0 ? (
        <>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
            Tienes {myBooks.length} libro{myBooks.length !== 1 ? 's' : ''} alquilado{myBooks.length !== 1 ? 's' : ''}
          </p>
          <BookList books={myBooks} isRental={true} />
        </>
      ) : (
        <EmptyState 
          title="No tienes alquileres activos"
          message="Ve al catálogo y alquila un libro para comenzar"
        />
      )}
    </div>
  );
};
export default MyRentals;