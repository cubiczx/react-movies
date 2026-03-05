import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './404';

const renderNotFound = () =>
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

describe('NotFound (404)', () => {
  test('muestra el código 404', () => {
    renderNotFound();
    expect(screen.getByText('404 - Not Found')).toBeInTheDocument();
  });

  test('muestra el texto de página no encontrada', () => {
    renderNotFound();
    expect(screen.getByText('Página no encontrada')).toBeInTheDocument();
  });

  test('tiene un enlace para volver al inicio', () => {
    renderNotFound();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  test('el enlace contiene el texto para volver al inicio', () => {
    renderNotFound();
    expect(screen.getByText('Volver al inicio')).toBeInTheDocument();
  });
});
