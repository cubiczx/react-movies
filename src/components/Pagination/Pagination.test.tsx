import { render, screen, fireEvent } from '@testing-library/react';
import PaginationMovies from './Pagination';

describe('PaginationMovies', () => {
  test('renderiza la navegación de paginación', () => {
    render(
      <PaginationMovies current={1} total={100} pageSize={20} onChange={jest.fn()} />
    );
    expect(screen.getByRole('navigation', { name: 'paginación' })).toBeInTheDocument();
  });

  test('muestra la página actual seleccionada', () => {
    render(
      <PaginationMovies current={1} total={40} pageSize={20} onChange={jest.fn()} />
    );
    expect(screen.getByTitle('1')).toBeInTheDocument();
  });

  test('llama a onChange al cambiar de página', () => {
    const onChange = jest.fn();
    render(
      <PaginationMovies current={1} total={40} pageSize={20} onChange={onChange} />
    );
    fireEvent.click(screen.getByTitle('2'));
    expect(onChange).toHaveBeenCalledWith(2, 20);
  });

  test('renderiza múltiples páginas cuando hay suficientes resultados', () => {
    render(
      <PaginationMovies current={1} total={40} pageSize={20} onChange={jest.fn()} />
    );
    // Con total=40 y pageSize=20 deben aparecer las páginas 1 y 2
    expect(screen.getByTitle('1')).toBeInTheDocument();
    expect(screen.getByTitle('2')).toBeInTheDocument();
  });
});
