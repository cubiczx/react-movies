import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieList from './MovieList';

const mockMoviesData = {
  data: {
    results: [
      { id: 1, title: 'Película A', poster_path: '/a.jpg' },
      { id: 2, title: 'Película B', poster_path: '/b.jpg' },
    ],
  },
  loading: false,
  error: null,
};

const renderMovieList = (movies: any = mockMoviesData, title = 'Populares') =>
  render(
    <MemoryRouter>
      <MovieList movies={movies} title={title} />
    </MemoryRouter>
  );

describe('MovieList', () => {
  test('renderiza el título de la lista', () => {
    renderMovieList();
    expect(screen.getByText('Populares')).toBeInTheDocument();
  });

  test('muestra todas las películas', () => {
    renderMovieList();
    expect(screen.getByText('Película A')).toBeInTheDocument();
    expect(screen.getByText('Película B')).toBeInTheDocument();
  });

  test('cada película tiene enlace al detalle', () => {
    renderMovieList();
    const links = screen.getAllByRole('link');
    expect(links.some(l => l.getAttribute('href') === '/movie/1')).toBe(true);
    expect(links.some(l => l.getAttribute('href') === '/movie/2')).toBe(true);
  });

  test('muestra Loading mientras carga', () => {
    renderMovieList({ data: null, loading: true, error: null });
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('muestra Error cuando falla la petición', () => {
    // data debe ser no-null para pasar el guard `!data` y llegar al bloque de error
    renderMovieList({ data: { results: [] }, loading: false, error: 'Network error' });
    expect(screen.getByText('No se han podido cargar las películas.')).toBeInTheDocument();
  });
});
