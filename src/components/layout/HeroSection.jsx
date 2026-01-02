import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="hero">
    <div className="hero__content">
      <h1 className="hero__title">Bienvenido a BiblioApp</h1>
      <p className="hero__subtitle">Descubre miles de libros disponibles para alquilar</p>
      <p className="hero__description">La forma más fácil y económica de acceder a la lectura que amas</p>
      <Link to="/catalogo" className="hero__cta">Explorar Catálogo</Link>
    </div>
  </section>
);
export default HeroSection;