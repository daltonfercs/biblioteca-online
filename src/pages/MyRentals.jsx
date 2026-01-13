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

    {rentals.map(rental => (
  <div key={rental.id} className="rental-card">
    <div className="rental-image">
       {/* Añade .book aquí también */}
      <img src={rental.book?.cover} alt={rental.book?.title} />
      <span className="rental-status active">Activo</span>
    </div>
    <div className="rental-details">
      <h3>{rental.book?.title}</h3>
      <p className="rental-author">{rental.book?.author}</p>
      
      <div className="rental-info">
        <div className="info-item">
          <Calendar size={16} />
          {/* Formatea la fecha que viene del backend */}
          <span>Devolver: {new Date(rental.returnDate).toLocaleDateString()}</span>
        </div>
      </div>

      <button onClick={() => returnBook(rental.id)} className="return-btn">
        Devolver Libro
      </button>
    </div>
  </div>
))}
    /*<div className="page-rentals">
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
    </div>*/
  );
};
export default MyRentals;