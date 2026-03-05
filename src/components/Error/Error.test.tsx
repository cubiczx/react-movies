import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('Error', () => {
  test('muestra el título de error', () => {
    render(<Error />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('muestra el mensaje por defecto', () => {
    render(<Error />);
    expect(screen.getByText('Ha ocurrido un error inesperado.')).toBeInTheDocument();
  });

  test('muestra un mensaje personalizado', () => {
    render(<Error message="No se han podido cargar las películas." />);
    expect(screen.getByText('No se han podido cargar las películas.')).toBeInTheDocument();
  });
});
