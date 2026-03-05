import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SliderMovies from './SliderMovies';

const mockMoviesData = {
  data: {
    results: [
      { id: 1, title: 'Película Slider A', backdrop_path: '/a.jpg', overview: 'Sinopsis A' },
      { id: 2, title: 'Película Slider B', backdrop_path: '/b.jpg', overview: 'Sinopsis B' },
    ],
  },
  loading: false,
  error: null,
};

const renderSlider = (movies: any = mockMoviesData) =>
  render(
    <MemoryRouter>
      <SliderMovies movies={movies} />
    </MemoryRouter>
  );

describe('SliderMovies', () => {
  test('renderiza los títulos de las películas', () => {
    renderSlider();
    expect(screen.getAllByText('Película Slider A').length).toBeGreaterThan(0);
  });

  test('renderiza las sinopsis', () => {
    renderSlider();
    expect(screen.getAllByText('Sinopsis A').length).toBeGreaterThan(0);
  });

  test('cada slide tiene un enlace al detalle', () => {
    renderSlider();
    const links = screen.getAllByRole('link');
    expect(links.some(l => l.getAttribute('href') === '/movie/1')).toBe(true);
  });

  test('muestra Loading mientras carga', () => {
    renderSlider({ data: null, loading: true, error: null });
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('muestra Error cuando falla la petición', () => {
    // data debe ser no-null para pasar el guard `!data` y llegar al bloque de error
    renderSlider({ data: { results: [] }, loading: false, error: 'Network error' });
    expect(screen.getByText('No se han podido cargar las películas.')).toBeInTheDocument();
  });
});
