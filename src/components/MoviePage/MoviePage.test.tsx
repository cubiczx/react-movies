import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MoviePage from './MoviePage';

const mockMovieList = {
  results: [
    { id: 1, title: 'Película Test', poster_path: '/test.jpg' },
    { id: 2, title: 'Película Test 2', poster_path: '/test2.jpg' },
  ],
  page: 1,
  total_results: 2,
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockMovieList),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderMoviePage = (title: string, endpoint: string) =>
  render(
    <MemoryRouter>
      <MoviePage title={title} endpoint={endpoint} />
    </MemoryRouter>
  );

describe('MoviePage', () => {
  test('muestra el título de la página', async () => {
    renderMoviePage('Películas Populares', 'movie/popular');
    expect(screen.getByText('Películas Populares')).toBeInTheDocument();
  });

  test('muestra el componente Loading mientras carga', () => {
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
    renderMoviePage('Últimos Lanzamientos', 'movie/now_playing');
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('muestra las películas tras cargar', async () => {
    renderMoviePage('Películas Populares', 'movie/popular');
    await waitFor(() => {
      expect(screen.getByText('Película Test')).toBeInTheDocument();
    });
    expect(screen.getByText('Película Test 2')).toBeInTheDocument();
  });

  test('llama al endpoint correcto', async () => {
    renderMoviePage('Populares', 'movie/popular');
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('movie/popular')
      );
    });
  });

  test('renderiza la paginación tras cargar resultados', async () => {
    renderMoviePage('Populares', 'movie/popular');
    await waitFor(() => {
      expect(screen.getByText('Película Test')).toBeInTheDocument();
    });
    expect(screen.getByRole('navigation', { name: 'paginación' })).toBeInTheDocument();
  });
});
