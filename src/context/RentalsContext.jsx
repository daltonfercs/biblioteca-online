import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config/api';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext'; // Importamos para limpiar el carrito al comprar

const RentalsContext = createContext();

export const RentalsProvider = ({ children }) => {
  const [rentals, setRentals] = useState([]);
  const { user } = useAuth();
  const { clearCart } = useCart(); // Hook para limpiar carrito visualmente

  // Cargar rentas activas al iniciar
  useEffect(() => {
    if (user && user.id) {
      fetchActiveRentals();
    } else {
      setRentals([]);
    }
  }, [user]);

  const fetchActiveRentals = async () => {
    try {
      const response = await fetch(`${API_URL}/rentals/user/${user.id}/active`);
      if (response.ok) {
        const data = await response.json();
        setRentals(data);
      }
    } catch (error) {
      console.error('Error cargando rentas:', error);
    }
  };

  // CHECKOUT: Convierte el carrito en rentas reales
  const checkoutRentals = async () => {
    if (!user) return false;

    try {
      // Llamamos al endpoint "magico" que hace todo el trabajo en Java
      const response = await fetch(`${API_URL}/rentals/checkout?userId=${user.id}`, {
        method: 'POST'
      });

      if (response.ok) {
        const newRentals = await response.json();
        setRentals(prev => [...prev, ...newRentals]); // Añadimos lo nuevo a la lista visual
        clearCart(); // Vaciamos el carrito
        return true; // Avisamos que fue un éxito
      }
      return false;
    } catch (error) {
      console.error('Error en checkout:', error);
      return false;
    }
  };

  const returnBook = async (rentalId) => {
    // Actualización optimista
    setRentals(prev => prev.filter(r => r.id !== rentalId));

    try {
      await fetch(`${API_URL}/rentals/${rentalId}/return`, {
        method: 'PUT'
      });
    } catch (error) {
      console.error('Error devolviendo libro:', error);
      fetchActiveRentals(); // Si falla, recargamos
    }
  };

  const isRented = (bookId) => {
    // Verificamos si el libro está en la lista de rentas activas
    return rentals.some(r => r.book && r.book.id === bookId);
  };

  const value = {
    rentals,
    checkoutRentals, // Usar esta función en tu botón de Confirmar
    returnBook,
    isRented,
    fetchActiveRentals
  };

  return (
    <RentalsContext.Provider value={value}>
      {children}
    </RentalsContext.Provider>
  );
};

export const useRentals = () => {
  const context = useContext(RentalsContext);
  if (!context) throw new Error('useRentals debe ser usado dentro de RentalsProvider');
  return context;
};