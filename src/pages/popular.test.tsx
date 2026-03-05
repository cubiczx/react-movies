import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Popular from './popular';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve({ results: [], page: 1, total_results: 0 }) })
  ) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Popular', () => {
  test('muestra el título "Películas Populares"', () => {
    render(
      <MemoryRouter>
        <Popular />
      </MemoryRouter>
    );
    expect(screen.getByText('Películas Populares')).toBeInTheDocument();
  });

  test('llama al endpoint movie/popular', async () => {
    render(
      <MemoryRouter>
        <Popular />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('movie/popular')
      );
    });
  });
});
