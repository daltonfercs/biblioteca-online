import { useState, useEffect } from 'react';

export const useRentals = () => {
  const [rentals, setRentals] = useState([]);

  // Cargar al inicio
  useEffect(() => {
    const stored = localStorage.getItem('myRentals');
    if (stored) setRentals(JSON.parse(stored));
  }, []);

  // Guardar cuando cambia
  useEffect(() => {
    localStorage.setItem('myRentals', JSON.stringify(rentals));
  }, [rentals]);

  const toggleRental = (book) => {
    const exists = rentals.find(r => r.id === book.id);
    if (exists) {
      setRentals(rentals.filter(r => r.id !== book.id));
    } else {
      setRentals([...rentals, { ...book, rentalDate: new Date().toISOString() }]);
    }
  };

  const isRented = (id) => rentals.some(r => r.id === id);

  return { rentals, toggleRental, isRented };
};