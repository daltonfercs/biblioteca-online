import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRentals } from '../context/RentalsContext';
import BookList from '../components/features/BookList';
import PageTitle from '../components/ui/PageTitle';
import EmptyState from '../components/ui/EmptyState';

const MyRentals = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { rentals } = useRentals();

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated()) {
    navigate('/login');
    return null;
  }

  return (
    <div className="page-rentals">
      <PageTitle title="Mis Alquileres Activos" />
      {rentals.length > 0 ? (
        <>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
            Tienes {rentals.length} libro{rentals.length !== 1 ? 's' : ''} alquilado{rentals.length !== 1 ? 's' : ''}
          </p>
          <BookList books={rentals} isRental={true} />
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