import React from 'react';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { useRentals } from '../../context/RentalsContext';
import { useBooks } from '../../context/BooksContext';

const RentalButton = ({ book, isRental = false }) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleRental } = useRentals();
  const { increaseStock } = useBooks();
  
  if (isRental) {
    const handleReturnRental = () => {
      increaseStock(book.id, 1);
      toggleRental(book);
    };

    return (
      <Button 
        onClick={handleReturnRental}
        variant="secondary"
      >
        Devolver Alquiler
      </Button>
    );
  }

  // Validar si hay stock disponible
  const hasStock = book.stock > 0;
  const inCart = isInCart(book.id);

  const handleClick = () => {
    if (!hasStock && !inCart) {
      return; // No permitir agregar sin stock
    }
    if (inCart) {
      removeFromCart(book.id);
    } else {
      addToCart(book);
    }
  };

  return (
    <Button 
      onClick={handleClick} 
      variant={inCart ? 'secondary' : 'primary'}
      disabled={!hasStock && !inCart}
      style={{
        opacity: (!hasStock && !inCart) ? 0.6 : 1,
        cursor: (!hasStock && !inCart) ? 'not-allowed' : 'pointer'
      }}
    >
      {!hasStock && !inCart ? 'Sin stock' : (inCart ? 'Quitar del Carrito' : 'Agregar al Carrito')}
    </Button>
  );
};
export default RentalButton;