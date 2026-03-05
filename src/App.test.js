import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MenuTop from './components/MenuTop';
import App from './App';

// SVG y react-player mapeados globalmente por moduleNameMapper

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ results: [], page: 1, total_results: 0 }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderMenuTop = () =>
  render(
    <MemoryRouter>
      <MenuTop />
    </MemoryRouter>
  );

describe('MenuTop', () => {
  test('renderiza el enlace de Inicio', () => {
    renderMenuTop();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
  });

  test('renderiza el enlace de Últimos Lanzamientos', () => {
    renderMenuTop();
    expect(screen.getByText('Últimos Lanzamientos')).toBeInTheDocument();
  });

  test('renderiza el enlace de Populares', () => {
    renderMenuTop();
    expect(screen.getByText('Populares')).toBeInTheDocument();
  });

  test('renderiza el enlace de Buscar', () => {
    renderMenuTop();
    expect(screen.getByText('Buscar')).toBeInTheDocument();
  });
});

describe('App', () => {
  test('renderiza el menú superior con los enlaces de navegación', () => {
    render(<App />);
    // Los enlaces del menú se renderizan inmediatamente
    expect(screen.getAllByText('Inicio').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Populares').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Buscar').length).toBeGreaterThan(0);
  });

  test('renderiza el contenido de Home en la ruta /', async () => {
    render(<App />);
    // MovieList muestra el título sólo tras completar el fetch
    await waitFor(() => {
      expect(screen.getByText('Mejor Valoradas')).toBeInTheDocument();
    });
  });
});

