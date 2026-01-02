import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="footer__content">
      <div className="footer__section">
        <h3 className="footer__title">BiblioApp</h3>
        <p className="footer__description">Tu plataforma de alquiler de libros en línea</p>
      </div>
      <div className="footer__section">
        <h4 className="footer__subtitle">Enlaces</h4>
        <ul className="footer__list">
          <li><a href="/" className="footer__link">Inicio</a></li>
          <li><a href="/catalogo" className="footer__link">Catálogo</a></li>
          <li><a href="/mis-alquileres" className="footer__link">Mis Alquileres</a></li>
        </ul>
      </div>
      <div className="footer__section">
        <h4 className="footer__subtitle">Contacto</h4>
        <p className="footer__contact">📧 info@biblioapp.com</p>
        <p className="footer__contact">📱 +57 (1) 2345678</p>
      </div>
    </div>
    <div className="footer__bottom">
      <p className="footer__text">© 2025 BiblioApp. Todos los derechos reservados.</p>
    </div>
  </footer>
);
export default Footer;