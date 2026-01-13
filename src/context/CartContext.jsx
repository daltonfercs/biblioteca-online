import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth(); // Necesitamos saber quién es el usuario

  // 1. CARGAR CARRITO (Reemplaza al useEffect de localStorage)
  useEffect(() => {
    if (user && user.id) {
      fetchCart();
    } else {
      setCartItems([]); // Si no hay usuario, carrito vacío
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_URL}/cart/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      }
    } catch (error) {
      console.error('Error cargando carrito:', error);
    }
  };

  // 2. AGREGAR (Conectado a Java)
  const addToCart = async (book) => {
    if (!user) return alert("Por favor, inicia sesión para alquilar.");

    // Validación rápida local para feedback inmediato
    if (isInCart(book.id)) return;

    try {
      const response = await fetch(`${API_URL}/cart/${user.id}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: book.id,
          quantity: 1,
          rentalDays: 7 // Por defecto 7 días
        })
      });

      if (response.ok) {
        // Recargamos el carrito del servidor para tener los datos reales (IDs, precios)
        fetchCart();
      }
    } catch (error) {
      console.error('Error agregando al carrito:', error);
    }
  };

  // 3. ELIMINAR (Conectado a Java)
  const removeFromCart = async (bookId) => {
    if (!user) return;
    
    // Actualización optimista (borramos visualmente primero para que se sienta rápido)
    setCartItems(prev => prev.filter(item => item.book.id !== bookId));

    try {
      await fetch(`${API_URL}/cart/${user.id}/items/${bookId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error eliminando del carrito:', error);
      fetchCart(); // Si falla, recargamos para revertir el cambio visual
    }
  };

  const clearCart = async () => {
    if (!user) return;
    setCartItems([]);
    try {
      await fetch(`${API_URL}/cart/${user.id}`, { method: 'DELETE' });
    } catch (error) { console.error(error); }
  };

  // VALIDACIONES (Adaptadas a la estructura de Java que envuelve el libro en 'item.book')
  const isInCart = (bookId) => {
    // El backend devuelve objetos { id: 1, book: { id: 5, ... } }
    // Así que buscamos por item.book.id
    return cartItems.some(item => item.book && item.book.id === bookId);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
        // Cálculo seguro del precio
        const price = item.book ? item.book.price : 0;
        return total + (price * (item.rentalDays || 1));
    }, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    getCartTotal,
    cartCount: cartItems.length
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe ser usado dentro de CartProvider');
  return context;
};