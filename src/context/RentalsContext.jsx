import React, { createContext, useContext, useState, useEffect } from 'react';

const RentalsContext = createContext();

export const RentalsProvider = ({ children }) => {
  const [rentals, setRentals] = useState([]);

  // Cargar alquileres del localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem('myRentals');
    if (stored) {
      try {
        setRentals(JSON.parse(stored));
      } catch (error) {
        console.error('Error cargando alquileres:', error);
      }
    }
  }, []);

  // Guardar alquileres en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('myRentals', JSON.stringify(rentals));
  }, [rentals]);

  const toggleRental = (book) => {
    const exists = rentals.find(r => r.id === book.id);
    if (exists) {
      // Devolver el libro
      setRentals(rentals.filter(r => r.id !== book.id));
    } else {
      // Alquilar el libro
      const rentalData = {
        ...book,
        rentalDate: new Date().toISOString(),
        rentalId: `rental_${book.id}_${Date.now()}`
      };
      setRentals([...rentals, rentalData]);
    }
  };

  const isRented = (id) => {
    return rentals.some(r => r.id === id);
  };

  const getRentalInfo = (id) => {
    return rentals.find(r => r.id === id);
  };

  const addRentalsFromCart = (cartItems) => {
    const newRentals = cartItems.map(book => ({
      ...book,
      rentalDate: new Date().toISOString(),
      rentalId: `rental_${book.id}_${Date.now()}`
    }));
    setRentals([...rentals, ...newRentals]);
  };

  const value = {
    rentals,
    toggleRental,
    isRented,
    getRentalInfo,
    addRentalsFromCart
  };

  return (
    <RentalsContext.Provider value={value}>
      {children}
    </RentalsContext.Provider>
  );
};

export const useRentals = () => {
  const context = useContext(RentalsContext);
  if (!context) {
    throw new Error('useRentals debe ser usado dentro de RentalsProvider');
  }
  return context;
};
