import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useRentals } from '../context/RentalsContext';
import { useBooks } from '../context/BooksContext';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/ui/Loading';

const ConfirmRental = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const { addRentalsFromCart } = useRentals();
  const { rentBook } = useBooks();

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

    // Descontar stock y registrar alquiler en backend para cada item
    const processRentals = async () => {
      for (const item of cartItems) {
        // Descontar stock
        await rentBook(item.id);
        // Registrar alquiler en backend
        if (user && user.id) {
          await fetch(`http://localhost:8082/api/rentals?userId=${user.id}&bookId=${item.id}&quantity=${item.quantity || 1}`, {
            method: 'POST'
          });
        }
      }
      // Agregar los items del carrito a los alquileres locales
      addRentalsFromCart(cartItems);
      // Limpiar el carrito
      clearCart();
      // Redirigir a mis alquileres después de 2 segundos
      setTimeout(() => {
        navigate('/mis-alquileres');
      }, 2000);
    };
    processRentals();
    // No se necesita limpiar timer porque no hay clearTimeout
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
