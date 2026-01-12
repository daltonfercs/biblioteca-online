import React, { createContext, useContext, useState, useEffect } from 'react';

const RentalsContext = createContext();

export const RentalsProvider = ({ children }) => {
  const [rentalIds, setRentalIds] = useState([]);

  // Cargar alquileres del localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem('myRentalIds');
    if (stored) {
      try {
        setRentalIds(JSON.parse(stored));
      } catch (error) {
        console.error('Error cargando alquileres:', error);
      }
    }
  }, []);

  // Guardar alquileres en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('myRentalIds', JSON.stringify(rentalIds));
  }, [rentalIds]);

  const toggleRental = (book) => {
    const exists = rentalIds.includes(book.id);
    if (exists) {
      // Devolver el libro
      setRentalIds(rentalIds.filter(id => id !== book.id));
    } else {
      // Alquilar el libro
      setRentalIds([...rentalIds, book.id]);
    }
  };

  const isRented = (id) => {
    return rentalIds.includes(id);
  };

  // Ya no se necesita getRentalInfo

  const addRentalsFromCart = (cartItems) => {
    const newIds = cartItems.map(book => book.id);
    setRentalIds([...new Set([...rentalIds, ...newIds])]);
  };

  const value = {
    rentalIds,
    toggleRental,
    isRented,
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
