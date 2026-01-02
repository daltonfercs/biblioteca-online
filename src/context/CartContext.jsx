import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Cargar carrito del localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem('rentalCart');
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch (error) {
        console.error('Error cargando carrito:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('rentalCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book) => {
    const exists = cartItems.find(item => item.id === book.id);
    if (!exists) {
      const cartItem = {
        ...book,
        cartId: `cart_${book.id}_${Date.now()}`,
        addedDate: new Date().toISOString()
      };
      setCartItems([...cartItems, cartItem]);
    }
  };

  const removeFromCart = (bookId) => {
    setCartItems(cartItems.filter(item => item.id !== bookId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (bookId) => {
    return cartItems.some(item => item.id === bookId);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
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
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};
