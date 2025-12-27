import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="hero">
    <h1 className="hero__title">Bienvenido a tu Biblioteca</h1>
    <p className="hero__subtitle">Alquila libros sin salir de casa</p>
    <Link to="/catalogo" className="hero__cta">Ver Catálogo</Link>
  </section>
);
export default HeroSection;