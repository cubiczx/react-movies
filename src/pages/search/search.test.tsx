import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Search from './search';

jest.useFakeTimers();

const mockSearchResults = {
  results: [
    { id: 10, title: 'Batman Begins', poster_path: '/batman.jpg' },
    { id: 11, title: 'The Dark Knight', poster_path: '/dark.jpg' },
  ],
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockSearchResults),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

const renderSearch = (initialSearch = '') =>
  render(
    <MemoryRouter initialEntries={[`/search${initialSearch ? `?q=${initialSearch}` : ''}`]}>
      <Routes>
        <Route path="/search" element={<Search />} />
      </Routes>
    </MemoryRouter>
  );

describe('Search', () => {
  test('renderiza el título y el input de búsqueda', () => {
    renderSearch();
    expect(screen.getByText('Busca películas')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar películas')).toBeInTheDocument();
  });

  test('el input refleja el valor que escribe el usuario', () => {
    renderSearch();
    const input = screen.getByPlaceholderText('Buscar películas');
    fireEvent.change(input, { target: { value: 'batman' } });
    expect(input).toHaveValue('batman');
  });

  test('no muestra resultados inicialmente sin query', () => {
    renderSearch();
    expect(screen.queryByText('Batman Begins')).not.toBeInTheDocument();
  });

  test('lanza fetch con debounce al escribir', async () => {
    renderSearch();
    const input = screen.getByPlaceholderText('Buscar películas');
    fireEvent.change(input, { target: { value: 'batman' } });

    // Antes del debounce no debe haberse llamado con el nuevo valor
    expect(global.fetch).not.toHaveBeenCalledWith(
      expect.stringContaining('batman')
    );

    // Avanzamos el timer del debounce
    act(() => jest.advanceTimersByTime(300));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('batman')
      );
    });
  });

  test('muestra los resultados tras búsqueda con query en URL', async () => {
    renderSearch('batman');
    await waitFor(() => {
      expect(screen.getByText('Batman Begins')).toBeInTheDocument();
    });
    expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
  });

  test('el input se inicializa con el valor del query param q', () => {
    renderSearch('batman');
    const input = screen.getByPlaceholderText('Buscar películas');
    expect(input).toHaveValue('batman');
  });
});
