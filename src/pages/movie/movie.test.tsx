import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Movie from './movie';

// react-player está mockeado globalmente via moduleNameMapper

const mockMovieDetail = {
  id: 1,
  title: 'Batman Begins',
  backdrop_path: '/backdrop.jpg',
  poster_path: '/poster.jpg',
  releaseDate: '2005-06-15',
  overview: 'El origen de Batman.',
  genres: [
    { id: 28, name: 'Acción' },
    { id: 18, name: 'Drama' },
  ],
  videos: { results: [] },
};

const mockMovieWithTrailer = {
  ...mockMovieDetail,
  videos: {
    results: [{ type: 'Trailer', key: 'abc123', site: 'YouTube' }],
  },
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(mockMovieDetail) })
  ) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderMovie = (id = '1') =>
  render(
    <MemoryRouter initialEntries={[`/movie/${id}`]}>
      <Routes>
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </MemoryRouter>
  );

describe('Movie', () => {
  test('muestra el componente Loading mientras carga', () => {
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
    renderMovie();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('muestra el título de la película tras cargar', async () => {
    renderMovie();
    await waitFor(() => {
      expect(screen.getByText('Batman Begins')).toBeInTheDocument();
    });
  });

  test('muestra la sinopsis de la película', async () => {
    renderMovie();
    await waitFor(() => {
      expect(screen.getByText('El origen de Batman.')).toBeInTheDocument();
    });
  });

  test('muestra los géneros de la película', async () => {
    renderMovie();
    await waitFor(() => {
      expect(screen.getByText('Acción')).toBeInTheDocument();
    });
    expect(screen.getByText('Drama')).toBeInTheDocument();
  });

  test('muestra el botón de tráiler cuando hay vídeo disponible', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockMovieWithTrailer) })
    ) as jest.Mock;
    renderMovie();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /ver trailer/i })).toBeInTheDocument();
    });
  });

  test('no muestra el botón de tráiler cuando no hay vídeo', async () => {
    renderMovie();
    await waitFor(() => {
      expect(screen.getByText('Batman Begins')).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: /ver trailer/i })).not.toBeInTheDocument();
  });

  test('llama al endpoint correcto con el id de la película', async () => {
    renderMovie('42');
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/movie/42'),
        undefined
      );
    });
  });
});
