import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="page-404">
    <h1>404 - Página no encontrada</h1>
    <Link to="/">Ir al inicio</Link>
  </div>
);
export default NotFound;