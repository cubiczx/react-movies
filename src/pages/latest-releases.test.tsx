import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LatestReleases from './latest-releases';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve({ results: [], page: 1, total_results: 0 }) })
  ) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('LatestReleases', () => {
  test('muestra el título "Últimos lanzamientos"', () => {
    render(
      <MemoryRouter>
        <LatestReleases />
      </MemoryRouter>
    );
    expect(screen.getByText('Últimos lanzamientos')).toBeInTheDocument();
  });

  test('llama al endpoint now_playing', async () => {
    render(
      <MemoryRouter>
        <LatestReleases />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('now_playing')
      );
    });
  });
});
