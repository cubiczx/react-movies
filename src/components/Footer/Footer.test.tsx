import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  test('renderiza el texto de copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/React Movies created by/)).toBeInTheDocument();
  });

  test('menciona al autor', () => {
    render(<Footer />);
    expect(screen.getByText(/Xavier Palacín Ayuso/)).toBeInTheDocument();
  });
});
