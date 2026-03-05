import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
  test('renderiza el contenedor de carga', () => {
    render(<Loading />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('el contenedor tiene el data-testid correcto', () => {
    render(<Loading />);
    const loader = screen.getByTestId('loading');
    expect(loader).toHaveClass('loading');
  });
});
