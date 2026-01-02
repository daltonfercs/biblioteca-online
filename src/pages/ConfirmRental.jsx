import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useRentals } from '../context/RentalsContext';
import { useBooks } from '../context/BooksContext';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/ui/Loading';

const ConfirmRental = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cartItems, clearCart } = useCart();
  const { addRentalsFromCart } = useRentals();
  const { decreaseStock } = useBooks();

  useEffect(() => {
    // Si no está autenticado, redirigir a login
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      navigate('/carrito');
      return;
    }

    // Descontar stock para cada item
    cartItems.forEach(item => {
      decreaseStock(item.id, 1);
    });

    // Agregar los items del carrito a los alquileres
    addRentalsFromCart(cartItems);
    // Limpiar el carrito
    clearCart();
    // Redirigir a mis alquileres después de 2 segundos
    const timer = setTimeout(() => {
      navigate('/mis-alquileres');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '60vh',
      textAlign: 'center'
    }}>
      <Loading />
      <h2 style={{ marginTop: '2rem', color: '#333' }}>Procesando tu alquiler...</h2>
      <p style={{ color: '#666', marginTop: '1rem' }}>Redirigiendo a tus alquileres</p>
    </div>
  );
};

export default ConfirmRental;
