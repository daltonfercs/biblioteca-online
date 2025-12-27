import React from 'react';
import { useRentals } from '../hooks/useRentals';
import BookList from '../components/features/BookList';
import PageTitle from '../components/ui/PageTitle';

const MyRentals = () => {
  const { rentals } = useRentals();

  return (
    <div className="page-rentals">
      <PageTitle title="Mis Alquileres Activos" />
      <BookList books={rentals} />
    </div>
  );
};
export default MyRentals;