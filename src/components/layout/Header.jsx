import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="header__container">
      <Link to="/" className="header__logo">📚 BiblioApp</Link>
      <nav className="header__nav">
        <Link to="/" className="header__link">Inicio</Link>
        <Link to="/catalogo" className="header__link">Catálogo</Link>
        <Link to="/mis-alquileres" className="header__link">Mis Alquileres</Link>
      </nav>
    </div>
  </header>
);
export default Header;