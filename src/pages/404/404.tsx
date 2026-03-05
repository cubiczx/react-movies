import React from 'react';
import { Link } from 'react-router-dom';
import './404.scss';

export default function NotFound() {
  return (
    <div className="error-404">
      <h1>404 - Not Found</h1>
      <h2>Página no encontrada</h2>
      <Link to="/">
        <h3>Volver al inicio</h3>
      </Link>
    </div>
  );
}