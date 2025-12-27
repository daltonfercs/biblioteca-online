import React from 'react';
import Button from '../ui/Button';
import { useRentals } from '../../hooks/useRentals';

const RentalButton = ({ book }) => {
  const { isRented, toggleRental } = useRentals();
  const rented = isRented(book.id);

  return (
    <Button 
      onClick={() => toggleRental(book)} 
      variant={rented ? 'secondary' : 'primary'}
    >
      {rented ? 'Devolver' : 'Alquilar'}
    </Button>
  );
};
export default RentalButton;