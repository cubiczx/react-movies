import { renderHook, waitFor } from '@testing-library/react';
import useFetch from './useFetch';

const mockData = { id: 1, title: 'Test Movie' };

afterEach(() => {
  jest.clearAllMocks();
});

describe('useFetch', () => {
  test('devuelve loading=true inicialmente', () => {
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
    const { result } = renderHook(() => useFetch('https://api.test/movie'));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  test('devuelve los datos correctamente tras el fetch', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockData) })
    ) as jest.Mock;

    const { result } = renderHook(() => useFetch('https://api.test/movie/1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  test('devuelve error cuando el fetch falla', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock;

    const { result } = renderHook(() => useFetch('https://api.test/fail'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.data).toBe(null);
  });

  test('llama al endpoint pasado como argumento', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({}) })
    ) as jest.Mock;

    const url = 'https://api.test/movie/popular';
    renderHook(() => useFetch(url));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(url, undefined);
    });
  });
});
