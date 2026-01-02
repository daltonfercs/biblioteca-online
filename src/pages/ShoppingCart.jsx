import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import PageTitle from '../components/ui/PageTitle';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="shopping-cart">
        <PageTitle title="Mi Carrito de Alquileres" />
        <EmptyState 
          title="Tu carrito está vacío"
          message="Agrega libros al carrito desde el catálogo para comenzar"
        />
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            onClick={() => navigate('/catalogo')}
            className="button button--primary" 
            style={{ display: 'inline-block' }}
          >
            Ir al Catálogo
          </button>
        </div>
      </div>
    );
  }

  const total = getCartTotal();
  const dailyRate = Math.round(total / 30);

  return (
    <div className="shopping-cart">
      <PageTitle title="Mi Carrito de Alquileres" />
      
      <div className="shopping-cart__container">
        <div className="shopping-cart__items">
          <div className="shopping-cart__header">
            <p className="shopping-cart__count">
              {cartItems.length} libro{cartItems.length !== 1 ? 's' : ''} en el carrito
            </p>
          </div>

          <div className="shopping-cart__list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.cover} alt={item.title} className="cart-item__image" />
                
                <div className="cart-item__info">
                  <h3 className="cart-item__title">{item.title}</h3>
                  <p className="cart-item__author">{item.author}</p>
                  <p className="cart-item__category">{item.category}</p>
                  <div className="cart-item__meta">
                    <span className="cart-item__year">{item.year}</span>
                    <span className="cart-item__pages">{item.pages} págs</span>
                  </div>
                </div>

                <div className="cart-item__pricing">
                  <div className="cart-item__price-box">
                    <p className="cart-item__price-label">Precio de alquiler</p>
                    <p className="cart-item__price">${item.price.toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="cart-item__remove"
                    title="Eliminar del carrito"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="shopping-cart__summary">
          <div className="cart-summary">
            <h2 className="cart-summary__title">Resumen del Carrito</h2>
            
            <div className="cart-summary__section">
              <p className="cart-summary__label">Libros:</p>
              <p className="cart-summary__value">{cartItems.length}</p>
            </div>

            <div className="cart-summary__section">
              <p className="cart-summary__label">Subtotal (30 días):</p>
              <p className="cart-summary__value">${total.toLocaleString()}</p>
            </div>

            <div className="cart-summary__divider"></div>

            <div className="cart-summary__section cart-summary__section--total">
              <p className="cart-summary__label">Total:</p>
              <p className="cart-summary__total">${total.toLocaleString()}</p>
            </div>

            <p className="cart-summary__info">
              📅 Alquiler por 30 días desde la confirmación
            </p>

            <div className="cart-summary__actions">
              <button 
                onClick={clearCart}
                className="button button--secondary"
                style={{ width: '100%' }}
              >
                Vaciar Carrito
              </button>
              <button 
                onClick={() => navigate('/confirmar-alquiler')}
                className="button button--primary"
                style={{ width: '100%' }}
              >
                Confirmar Alquiler
              </button>
            </div>

            <p className="cart-summary__daily">
              💡 Aproximadamente ${dailyRate.toLocaleString()} por día
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ShoppingCart;
