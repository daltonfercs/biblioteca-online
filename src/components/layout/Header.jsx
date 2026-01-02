import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">📚</span>
          <span className="header__logo-text">BiblioApp</span>
        </Link>
        <nav className="header__nav">
          <Link to="/" className="header__link">Inicio</Link>
          <Link to="/catalogo" className="header__link">Catálogo</Link>
          {isAuthenticated() && <Link to="/mis-alquileres" className="header__link">Mis Alquileres</Link>}
        </nav>
        <div className="header__actions">
          <Link to="/carrito" className="header__cart-link">
            <span className="header__cart-icon">🛒</span>
            {cartCount > 0 && <span className="header__cart-badge">{cartCount}</span>}
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {isAuthenticated() ? (
              <>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>
                  👤 {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                style={{
                  background: '#1976d2',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}
              >
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;