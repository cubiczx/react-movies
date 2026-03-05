import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieCatalog from './MovieCatalog';

const mockMovies = [
  { id: 1, title: 'Película Uno', poster_path: '/poster1.jpg' },
  { id: 2, title: 'Película Dos', poster_path: '/poster2.jpg' },
  { id: 3, title: 'Película Tres', poster_path: '/poster3.jpg' },
];

const renderCatalog = (movies = mockMovies) =>
  render(
    <MemoryRouter>
      <MovieCatalog movies={movies} />
    </MemoryRouter>
  );

describe('MovieCatalog', () => {
  test('renderiza el número correcto de tarjetas', () => {
    renderCatalog();
    // Filtramos solo <img> reales (excluye <span role="img"> de los iconos SVG)
    const posters = screen.getAllByRole('img').filter(el => el.tagName === 'IMG');
    expect(posters).toHaveLength(mockMovies.length);
  });

  test('muestra el título de cada película', () => {
    renderCatalog();
    mockMovies.forEach(movie => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  test('cada tarjeta tiene un enlace al detalle de la película', () => {
    renderCatalog();
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/movie/1');
    expect(links[1]).toHaveAttribute('href', '/movie/2');
    expect(links[2]).toHaveAttribute('href', '/movie/3');
  });

  test('la imagen usa la URL de TMDB correcta', () => {
    renderCatalog();
    const imgs = screen.getAllByRole('img');
    expect(imgs[0]).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/original/poster1.jpg'
    );
  });

  test('renderiza vacío sin errores cuando no hay películas', () => {
    const { container } = renderCatalog([]);
    expect(container.querySelector('.catalog-container')).toBeInTheDocument();
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });
});
