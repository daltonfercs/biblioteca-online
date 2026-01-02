import React from 'react';
import HeroSection from '../components/layout/HeroSection';
import FeaturedBooks from '../components/features/FeaturedBooks';
import Notification from '../components/ui/Notification';

const Home = () => (
  <div className="page-home">
    <HeroSection />
    <div style={{ padding: '2rem' }}>
      <Notification message="¡Nuevos libros añadidos esta semana!" />
    </div>
    <div style={{ padding: '0 2rem' }}>
      <FeaturedBooks />
    </div>
  </div>
);
export default Home;