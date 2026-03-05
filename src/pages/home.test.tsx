import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './home';

const mockMovieResults = {
  results: [
    { id: 1, title: 'Película Home', backdrop_path: '/a.jpg', overview: 'Sinopsis', poster_path: '/p.jpg' },
  ],
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(mockMovieResults) })
  ) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

describe('Home', () => {
  test('realiza las peticiones necesarias a la API', async () => {
    renderHome();
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });
  });

  test('llama al endpoint de now_playing', async () => {
    renderHome();
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('now_playing'),
        undefined
      );
    });
  });

  test('llama al endpoint de popular', async () => {
    renderHome();
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('movie/popular'),
        undefined
      );
    });
  });

  test('llama al endpoint de top_rated', async () => {
    renderHome();
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('top_rated'),
        undefined
      );
    });
  });

  test('muestra los títulos de las secciones tras cargar', async () => {
    renderHome();
    await waitFor(() => {
      expect(screen.getByText('Populares')).toBeInTheDocument();
    });
    expect(screen.getByText('Mejor Valoradas')).toBeInTheDocument();
  });
});
